const { TezosRPC } = require("../tezos-rpc");
const { logger } = require("../../logger");
const { transactionsModel } = require("../../models/transactions/schema");
const { MAX_BLOCKS_TO_WAIT_FOR } = require("../../constants");

class TransactionMonitor {
  /**
   * @param {TezosRPC} tezosRpc
   */
  constructor(tezosRpc, conseilServerInfo) {
    this.tezosRpc = tezosRpc;
    this.conseilServerInfo = conseilServerInfo;
    this.inProgress = false;
  }

  /**
   * Start monitoring
   */
  async start() {
    // Get all pending transactions from db
    const pendingTransactions = await transactionsModel
      .find(
        { status: "pending" },
        {
          transactionHash: 1,
          blockLevelAtBroadcast: 1,
          blockHashAtBroadcast: 1,
        }
      )
      .sort({ blockLevelAtBroadcast: "asc" });
    if (!pendingTransactions || pendingTransactions.length === 0) return;

    // Extract the transaction hashes
    const pendingTransactionHashes = pendingTransactions.map(
      (each) => each.transactionHash
    );

    // Start from the lowest known block level
    // Get all txn hashes from `last known block` to `latest`
    // See if any of the pending txn hashes got confirmed or failed
    const lastKnownBlockLevel = pendingTransactions[0].blockLevelAtBroadcast;
    const lastKnownBlockHash = pendingTransactions[0].blockHashAtBroadcast;
    const {
      error,
      confirmedTransactions,
      failedTransactions,
      latestBlockLevel,
    } = await this._updateTransactionStatus(
      pendingTransactionHashes,
      lastKnownBlockLevel,
      lastKnownBlockHash
    );
    if (error) return;

    // Update confirmed transactions status
    if (confirmedTransactions.length > 0) {
      await transactionsModel.updateMany(
        { transactionHash: confirmedTransactions },
        { $set: { status: "success" } }
      );
    }

    // Update failed transactions status
    if (failedTransactions.length > 0) {
      await transactionsModel.updateMany(
        { transactionHash: confirmedTransactions },
        { $set: { status: "failed" } }
      );
    }

    // Check for skipped transactions
    // Transactions omitted directly from mempool
    const skippedTransactions = [];
    for (const each of pendingTransactions) {
      if (
        latestBlockLevel - each.blockLevelAtBroadcast >
        MAX_BLOCKS_TO_WAIT_FOR
      ) {
        skippedTransactions.push(each.transactionHash);
      }
    }
    await transactionsModel.updateMany(
      { transactionHash: skippedTransactions },
      { $set: { status: "failed" } }
    );
  }

  async _updateTransactionStatus(
    pendingTransactionHashes,
    fromBlockLevel,
    fromBlockHash
  ) {
    try {
      if (this.inProgress) {
        return {
          error: "already running",
        };
      }

      // Get all the blocks after last known hash
      this.inProgress = true;
      const { level, operations } = await this.tezosRpc.getBlocksAfter(
        fromBlockHash
      );

      logger.info(
        `Fetched blocks from level: ${fromBlockLevel} to level: ${level}`
      );
      const confirmedTransactions = [];
      const failedTransactions = [];

      // Search for confimed, failed transactions
      // Transaction is marked confirmed if status is `applied`
      // Failed otherwise
      for (const op of operations) {
        if (pendingTransactionHashes.indexOf(op.hash) > -1) {
          if (op.status === "applied") {
            logger.info(`Transaction with hash ${op.hash} confirmed`);
            confirmedTransactions.push(op.hash);
          } else {
            failedTransactions.push(op.hash);
          }
        }
      }

      this.inProgress = false;

      return {
        error: null,
        confirmedTransactions,
        failedTransactions,
        latestBlockLevel: level,
      };
    } catch (error) {
      logger.error(JSON.stringify(error));
      this.inProgress = false;
      return { error };
    }
  }
}

module.exports = { TransactionMonitor };
