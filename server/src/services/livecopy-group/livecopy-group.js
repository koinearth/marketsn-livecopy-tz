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
   * @param {string} adminPublicKey
   *
   * @returns {Promise<{error: Error, transactionHash: string}>}
   */
  async setAdmin(adminAddress, adminPublicKey) {
    try {
      const setAdminMethod = this.groupContract.methods["setAdmin"](
        adminAddress,
        adminPublicKey
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
      logger.error(JSON.stringify(error.message));
      if (error instanceof TezosOperationError) {
        logger.error("Operation error");
      }

      return {
        error: error.message,
      };
    }
  }

  /**
   * Add signer account for whitelisting to a group instance
   * This method requires signature from admin public key
   *
   * @param {string} signerPublicKey
   * @param {string} signerAlias
   * @param {string} adminSignature
   * @param {number} timestamp
   *
   * @returns {Promise<{error: Error, transactionHash: string}>}
   */
  async addWhitelistedAddress(
    signerPublicKey,
    signerAlias,
    adminSignature,
    timestamp
  ) {
    try {
      const signerPublicKeyBuf = TezosMessageUtils.writeKeyWithHint(
        signerPublicKey,
        "edpk"
      );
      const signerAddress = TezosMessageUtils.computeKeyHash(
        signerPublicKeyBuf
      );
      const addWhitelistedAddressMethod = this.groupContract.methods[
        "insertWhitelistedAddress"
      ](
        signerAlias,
        timestamp.toString(),
        signerAddress,
        adminSignature,
        signerPublicKey
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
      logger.error(JSON.stringify(error.message));
      if (error instanceof TezosOperationError) {
        logger.error("Operation error");
      }

      return {
        error: error.message,
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

  /**
   * Issue an NFT Cert
   *
   * @param {number} tokenId
   * @param {string} assetType
   * @param {string} documentUrl
   * @param {string} documentHash
   * @param {string} issuedToAlias
   * @param {string} signerAddress
   * @param {string} signerPublicKey
   * @param {string} signature
   */
  async issueCertificate(
    tokenId,
    assetType,
    documentUrl,
    documentHash,
    issuedToAlias,
    state,
    signerPublicKey,
    signature
  ) {
    try {
      const signerPublicKeyBuf = TezosMessageUtils.writeKeyWithHint(
        signerPublicKey,
        "edpk"
      );
      const signerAddress = TezosMessageUtils.computeKeyHash(
        signerPublicKeyBuf
      );
      const issueCertificateMethod = this.groupContract.methods["issueCert"](
        assetType,
        documentHash,
        signerPublicKey,
        signature,
        signerAddress,
        state,
        issuedToAlias,
        documentUrl,
        tokenId
      );
      const transferParams = issueCertificateMethod.toTransferParams();
      const transactionHash = await this.relayer.sendContractInvocation(
        transferParams
      );
      return {
        error: null,
        transactionHash,
      };
    } catch (error) {
      console.log(error);
      logger.error(JSON.stringify(error.message));
      if (error instanceof TezosOperationError) {
        logger.error("Operation error");
      }

      return {
        error: error.message,
      };
    }
  }
}

module.exports = { LiveCopyGroup };
