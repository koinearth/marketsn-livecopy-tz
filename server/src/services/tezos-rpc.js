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
    const fee = await this.estimateFees();
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
  async estimateFees() {
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
   * Dry run a contract invocation txn
   *
   * @param {string} secretKey
   * @param {TransferParams} transferParams
   */
  async testContractInvocation(secretKey, transferParams) {
    try {
      const dummyFee = 90000;

      const { to, amount, parameter } = transferParams;
      // 1. Setup in memory signer
      const { keystore } = await this._setupSigner(secretKey);
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
        dummyFee,
        MAX_STORAGE_LIMIT_IN_BYTES,
        MAX_GAS_LIMIT,
        parameter.entrypoint,
        JSON.stringify(parameter.value),
        TezosParameterFormat.Micheline
      );

      return {
        error: null,
        gasCost: gas,
        storageCost: Math.ceil(storageCost * 4),
      };
    } catch (error) {
      logger.error(JSON.stringify(error));
      if (error.response) {
        const errorMessage = this._parseRpcError(error);
        return {
          error: errorMessage,
        };
      }
      return { error };
    }
  }

  // Try parsing RPC errs for contract logic throws(`script_rejected`) and gas exhaustions
  // If err. can't be interpreted, return back as is
  _parseRpcError(error) {
    try {
      const response = JSON.parse(error.response.replace(/\'/, ""));

      // script_rejected are in response.contents
      if (response.contents && Array.isArray(response.contents)) {
        let errMessages = response.contents[0].metadata.operation_result.errors;

        if (!errMessages || errMessages.length === 0) {
          return error;
        }

        errMessages = errMessages.filter((err) =>
          err.id.includes("script_rejected")
        );
        // Concat all err. messages using `reduce`
        return errMessages.reduce(function (prevAggregatedVal, curr) {
          return prevAggregatedVal + curr.with.string;
        }, "");
      }

      // Handle gas exhaustions err. messages
      if (response) {
        return response.reduce(function (prevAggregatedVal, curr) {
          return prevAggregatedVal + curr.msg;
        }, "");
      }

      return error;
    } catch (error) {
      return error;
    }
  }
}

module.exports = { TezosRPC };
