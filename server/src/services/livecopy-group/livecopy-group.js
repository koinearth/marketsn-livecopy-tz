const {
  ContractAbstraction,
  TezosOperationError,
} = require("@taquito/taquito");
const { TezosMessageUtils } = require("conseiljs");
const { TezosRPC } = require("../tezos-rpc");
const { Relayer } = require("../relayer");
const { logger } = require("../../logger");

class LiveCopyGroup {
  /**
   * @param {ContractAbstraction} groupContract
   * @param {Relayer} relayer
   * @param {TezosRPC} tezosRpc
   */
  constructor(groupContract, relayer, tezosRpc) {
    this.groupContract = groupContract;
    this.relayer = relayer;
    this.tezosRpc = tezosRpc;
  }

  /**
   * Update an admin address for a group contract
   * @param {string} adminAddress
   *
   * @returns {Promise<{error: Error, transactionHash: string}>}
   */
  async setAdmin(adminAddress) {
    try {
      const setAdminMethod = this.groupContract.methods["setAdmin"](
        adminAddress
      );
      const transferParams = setAdminMethod.toTransferParams();
      const transactionHash = await this.relayer.sendContractInvocation(
        transferParams
      );
      return {
        error: null,
        transactionHash,
      };
    } catch (error) {
      logger.error(JSON.stringify(error));
      if (error instanceof TezosOperationError) {
        logger.error("Operation error");
      }

      return {
        error: error.name,
      };
    }
  }

  /**
   * Add signer account for whitelisting to a group instance
   * This method requires signature from admin public key
   *
   * @param {string} signerPublicKey
   * @param {string} signerAlias
   * @param {string} adminPublicKey
   * @param {string} adminSignature
   *
   * @returns {Promise<{error: Error, transactionHash: string}>}
   */
  async addWhitelistedAddress(
    signerPublicKey,
    signerAlias,
    adminPublicKey,
    adminSignature
  ) {
    try {
      const adminAddress = TezosMessageUtils.computeKeyHash(adminPublicKey);
      const addWhitelistedAddressMethod = this.groupContract.methods[
        "insertWhitelistedAddress"
      ](
        adminAddress,
        signerAlias,
        signerPublicKey,
        adminSignature,
        adminAddress
      );
      const transferParams = addWhitelistedAddressMethod.toTransferParams();
      const transactionHash = await this.relayer.sendContractInvocation(
        transferParams
      );
      return {
        error: null,
        transactionHash,
      };
    } catch (error) {
      logger.error(JSON.stringify(error));
      if (error instanceof TezosOperationError) {
        logger.error("Operation error");
      }

      return {
        error: error.name,
      };
    }
  }

  /**
   * Returns whitelisted signer addresses of a group instance
   *
   * @returns {string[]}
   */
  async getWhitelistedAddresses() {
    const storageList = await this.groupContract.storage();
    return storageList.whiteListedAddresses;
  }
}

module.exports = { LiveCopyGroup };
