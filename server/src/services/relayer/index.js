const { TezosRPC } = require("../tezos-rpc");
const { getAccountInfo } = require("../../utils");
const { transactionsModel } = require("../../models/transactions/schema");
const { config } = require("../../config");
const { logger } = require("../../logger");
const { TransactionError } = require("../../errors");

class Relayer {
  /**
   * Relayers for sending signed transactions of a different user
   * @param {TezosRPC} tezosRpc
   * @param {Object} relayerAccounts
   */
  constructor(tezosRpc, relayerAccounts) {
    this.tezosRpc = tezosRpc;
    this.availableAccounts = relayerAccounts;
  }

  _chooseRelayer() {
    if (this.availableAccounts.length === 0) return;

    return this.availableAccounts.shift();
  }

  _addBackRelayer(account) {
    if (this.availableAccounts.indexOf(account) > -1) {
      logger.log("Relayer already present in queue");
      return;
    }

    this.availableAccounts.push(account);
  }

  /**
   * Send contract invocation through api account
   *
   * - Try fetching an available api account
   * - Remove that from the queue while submitting a transaction
   * - Add back the account before exiting fn.,
   *   on either successful txn submission or any error
   * @param {Object} transferParams
   */
  async sendContractInvocation(transferParams) {
    const relayer = this._chooseRelayer();
    if (!relayer) {
      throw new Error(
        "No proxy account available for executing transaction;" +
          "All are currently busy carrying out transactions"
      );
    }

    const {
      error,
      operationHash,
      level,
      blockHash,
    } = await this.tezosRpc.invokeContract(relayer.secretKey, transferParams);

    // Errored, throw back err, add relayer as available and return
    if (error || !operationHash) {
      this._addBackRelayer(relayer);
      throw new TransactionError(error);
    }

    // Success, save txn details to db with status as pending
    const transaction = new transactionsModel({
      transactionHash: operationHash,
      relayerAddress: relayer.address,
      networkId: config.networkId,
      blockLevelAtBroadcast: level,
      blockHashAtBroadcast: blockHash,
      status: "pending",
    });
    transaction.save();

    this._addBackRelayer(relayer);
    return operationHash;
  }
}

/**
 * Initialize relayers class
 * @param {TezosRPC} tezosRpc
 * @param {string[]} privateKeys
 *
 * @returns {Promise<Relayer>}
 */
async function initializeRelayers(tezosRpc, privateKeys) {
  const accounts = [];
  for (const key of privateKeys) {
    const accountInfo = await getAccountInfo(key);
    const isRevealed = tezosRpc.isAccountRevealed(accountInfo.address);
    if (!isRevealed) continue;

    accounts.push(accountInfo);
  }

  return new Relayer(tezosRpc, accounts);
}

module.exports = { initializeRelayers, Relayer };