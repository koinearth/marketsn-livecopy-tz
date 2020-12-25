const fetch = require("node-fetch");
const log = require("loglevel");
const { TezosToolkit, OpKind } = require("@taquito/taquito");
const {
  TezosMessageUtils,
  TezosConseilClient,
  OperationKindType,
  registerLogger,
  registerFetch,
  TezosNodeReader,
  TezosNodeWriter,
  TezosParameterFormat,
} = require("conseiljs");
const { SoftSigner, KeyStoreUtils } = require("conseiljs-softsigner");

const { logger } = require("../logger");
const {
  MAX_GAS_LIMIT,
  MAX_STORAGE_LIMIT_IN_BYTES,
  DEFAULT_OFFSET_FOR_TXN,
  MAX_BLOCKS_TO_WAIT_FOR,
} = require("../constants");

// Configure conseiljs before being able to use
const conseilLogger = log.getLogger("conseiljs");
// Loglevel is set to silent as conseiljs is logging
// not so useful messages(150 lines each) on each txn request
conseilLogger.setLevel("silent", false);
registerLogger(conseilLogger);
registerFetch(fetch);

class TezosRPC {
  constructor(rpcURL, networkId, conseilServer, feePriority, noOfConfs = 1) {
    this.rpcURL = rpcURL;
    this.networkId = networkId;
    this.tezos = new TezosToolkit(rpcURL);
    this.conseilServer = conseilServer;
    this.feePriority = feePriority;
    this.defaultConfirmations = noOfConfs;
  }

  /**
   * Setup an in-memory signer
   * @param {string} key - Key `edsk...`
   */
  async _setupSigner(key) {
    const secretKeyBuf = TezosMessageUtils.writeKeyWithHint(key, "edsk");
    const [keystore, signer] = await Promise.all([
      KeyStoreUtils.restoreIdentityFromSecretKey(key),
      SoftSigner.createSigner(secretKeyBuf, 60),
    ]);
    return {
      signer,
      keystore,
    };
  }

  /**
   * Deploy a contract from code
   * @param {string} code - Micheline/Michelson code
   * @param {string} initData - Constructor data in encoded form
   * @param {string} balance - XTZ to be sent to the contract, if any
   */
  async deployContract(secretKey, code, initData, balance = "0") {
    await this._setupSigner(secretKey);
    const fee = await this._estimateFees();
    const op = await this.tezos.contract.originate({
      balance,
      code,
      init: initData,
      fee,
    });
    logger.info(`Transaction hash: ${op.hash}`);

    await op.confirmation(this.defaultConfirmations);
    logger.info(`Contract deployed at: ${op.contractAddress}`);

    return op.contract();
  }

  /**
   * Get a contract instance deployed at KT1 address
   * @param {string} address - Contract address
   */
  async getContractInstance(address) {
    const contractProvider = this.tezos.contract;
    return contractProvider.at(address);
  }

  async getOperation(opHash) {
    return TezosConseilClient.getOperation(
      this.conseilServer,
      this.conseilServer.network,
      opHash
    );
  }

  /**
   * Get all entries of a big_map from a contract
   * This uses ConseilJS indexer to read big-map_data
   *
   * @param {string} address
   */
  async readBigMap(address) {
    const mapdata = await TezosConseilClient.getBigMapData(
      this.conseilServer,
      address
    );
    const { maps } = mapdata;

    let data = [];
    for (const each of maps) {
      data = data.concat(each.content);
    }
    return data;
  }

  /**
   * Estimate fees of the network
   *
   * @returns {number}
   */
  async _estimateFees() {
    const feeStatistics = await TezosConseilClient.getFeeStatistics(
      this.conseilServer,
      this.conseilServer.network,
      OperationKindType.Origination
    );

    return Number(feeStatistics[0][this.feePriority]);
  }

  /**
   * Get the details of latest block
   *
   * @returns {Promise<{level: number, blockHash: string, operations: {hash: string, status: string}[]}>}
   */
  async getLatestBlock() {
    const latestBlock = await this.tezos.rpc.getBlock();

    const operations = [];
    for (const operationEntries of latestBlock.operations) {
      operationEntries.forEach((entry) => {
        switch (entry) {
          case entry.contents[0].kind === OpKind.TRANSACTION:
            operations.push({
              hash: entry.hash,
              status: entry.contents[0].metadata.operation_result.status,
            });
            break;
        }
      });
    }
    return {
      level: latestBlock.header.level,
      blockHash: latestBlock.hash,
      operations,
      predecessor: latestBlock.header.predecessor,
    };
  }

  /**
   * Get the details of a block from hash
   * @param {string} hash
   * @returns {Promise<{level: number, blockHash: string, operations: {hash: string, status: string}[]}>}
   */
  async getBlock(hash) {
    const block = await this.tezos.rpc.getBlock({
      block: hash,
    });

    const operations = [];
    for (const operationEntries of block.operations) {
      operationEntries.forEach((entry) => {
        if (entry.contents[0].kind === OpKind.TRANSACTION) {
          operations.push({
            hash: entry.hash,
            status: entry.contents[0].metadata.operation_result.status,
          });
        }
      });
    }
    return {
      level: block.header.level,
      blockHash: block.hash,
      operations,
      predecessor: block.header.predecessor,
    };
  }

  /**
   * Get block data after a particular hash to latest
   * @param {string} lastSeenHash
   * @param {number} lastSeenBlockLevel
   */
  async getBlocksAfter(lastSeenHash, lastSeenBlockLevel) {
    const {
      level: latestBlockLevel,
      blockHash,
      operations,
      predecessor,
    } = await this.getLatestBlock();
    if (latestBlockLevel <= lastSeenBlockLevel) {
      return { error: "No blocks mined yet" };
    }

    if (!lastSeenHash || predecessor === lastSeenHash) {
      return { error: null, level: latestBlockLevel, blockHash, operations };
    }

    let totalOperations = operations;
    let currBlockPredecessor = predecessor;

    // TODO: Check this
    while (currBlockPredecessor !== lastSeenHash) {
      const { operations, predecessor, level } = await this.getBlock(
        currBlockPredecessor
      );
      totalOperations = totalOperations.concat(operations);
      logger.debug(
        `Transactions: ${JSON.stringify(operations)}, Block: ${level}`
      );
      currBlockPredecessor = predecessor;
    }

    return {
      error: null,
      level: latestBlockLevel,
      blockHash,
      operations: totalOperations,
    };
  }

  /**
   * Get balance of a tezos address
   * @param {string} address
   *
   * @returns {BigNumber}
   */
  async getBalance(address) {
    return this.tezos.tz.getBalance(address);
  }

  /**
   * Check if an account is activated on Tezos blockchain
   * @param {string} address
   *
   * @returns {boolean}
   */
  async isAccountRevealed(address) {
    return TezosNodeReader.isManagerKeyRevealedForAccount(this.rpcURL, address);
  }

  /**
   * Send a contract invocation txn from a secretKey
   *
   * @param {string} secretKey
   * @param {TransferParams} transferParams
   */
  async invokeContract(secretKey, transferParams) {
    try {
      const [fee, { level, blockHash }] = await Promise.all([
        this._estimateFees(),
        this.getLatestBlock(),
      ]);

      const { to, amount, parameter } = transferParams;
      // 1. Setup in memory signer
      const { signer, keystore } = await this._setupSigner(secretKey);
      // 2. Estimate gas, storage costs
      const {
        gas,
        storageCost,
      } = await TezosNodeWriter.testContractInvocationOperation(
        this.rpcURL,
        this.networkId,
        keystore,
        to,
        amount,
        fee,
        MAX_STORAGE_LIMIT_IN_BYTES,
        MAX_GAS_LIMIT,
        parameter.entrypoint,
        JSON.stringify(parameter.value),
        TezosParameterFormat.Micheline
      );
      // 3. Get counter for acct.
      let counter = await TezosNodeReader.getCounterForAccount(
        this.rpcURL,
        keystore.publicKeyHash
      );
      counter = counter + 1;
      // 4. Construct contract op. with counter, gascost, storagecost and contract params
      const transaction = TezosNodeWriter.constructContractInvocationOperation(
        keystore.publicKeyHash,
        counter,
        to,
        amount,
        fee,
        // Storage Cost is somehow inaccurate always
        // This is a temp. fix to offset the incorrectness
        Math.ceil(storageCost * 5),
        gas,
        parameter.entrypoint,
        JSON.stringify(parameter.value),
        TezosParameterFormat.Micheline
      );
      // 5. Send the operation
      //
      // NOTE:
      // As Tezos doesnt have a replace by fee feature, set the max blocks to wait for
      // After the specified number, txn cannot be included
      const { operationGroupID } = await TezosNodeWriter.sendOperation(
        this.rpcURL,
        [transaction],
        signer,
        DEFAULT_OFFSET_FOR_TXN - MAX_BLOCKS_TO_WAIT_FOR
      );

      // 6. Extract operation hash
      const operationHash = operationGroupID
        .replace(/\"/g, "")
        .replace(/\n/, "");
      logger.info(`Transaction hash: ${operationHash}`);
      return {
        error: null,
        operationHash,
        level,
        blockHash,
      };
    } catch (error) {
      return { error };
    }
  }
}

module.exports = { TezosRPC };
