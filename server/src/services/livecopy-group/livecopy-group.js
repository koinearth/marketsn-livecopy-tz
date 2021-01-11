const { ContractAbstraction } = require("@taquito/taquito");
const { TezosMessageUtils } = require("conseiljs");
const { TezosRPC } = require("../tezos-rpc");
const { Relayer } = require("../relayer");
const { ValidationError } = require("../../errors");
const { validatePublicKey } = require("../../utils");
const {
  verifyWhitelistAddressUpdationSignature,
  verifyTokenIssuanceSignature,
} = require("../signatureVerifier");

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
    const setAdminMethod = this.groupContract.methods["setAdmin"](
      adminAddress,
      adminPublicKey
    );
    const transferParams = setAdminMethod.toTransferParams();
    const transactionHash = await this.relayer.sendContractInvocation(
      transferParams
    );
    return {
      transactionHash,
    };
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
    // Validate signer pub key
    const isValid = validatePublicKey(signerPublicKey);
    if (!isValid) {
      throw new ValidationError("Invalid signer public key");
    }

    const signerPublicKeyBuf = TezosMessageUtils.writeKeyWithHint(
      signerPublicKey,
      "edpk"
    );
    const signerAddress = TezosMessageUtils.computeKeyHash(signerPublicKeyBuf);

    const whitelistedAddresses = await this.getWhitelistedAddresses();
    if (whitelistedAddresses.indexOf(signerAddress) > -1) {
      throw new ValidationError("Signer address already whitelisted");
    }

    // Validate admin signature
    const groupAdminPublicKey = await this.getGroupAdminPubKey();
    const sigVerified = await verifyWhitelistAddressUpdationSignature(
      signerAddress,
      signerPublicKey,
      signerAlias,
      timestamp,
      groupAdminPublicKey,
      adminSignature
    );
    if (!sigVerified) {
      throw new ValidationError("Invalid group admin signature");
    }

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
      transactionHash,
    };
  }

  /**
   * Returns whitelisted signer addresses of a group instance
   *
   * @returns {Promise<string[]>}
   */
  async getWhitelistedAddresses() {
    const storageList = await this.groupContract.storage();

    return storageList.whiteListedAddresses.map((whitelistAddrHex) =>
      TezosMessageUtils.readPublicKey(
        TezosMessageUtils.readPackedData(whitelistAddrHex, "bytes")
      )
    );
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
    // Validate signer pub key
    const isValid = validatePublicKey(signerPublicKey);
    if (!isValid) {
      throw new ValidationError("Invalid signer public key");
    }

    const signerPublicKeyBuf = TezosMessageUtils.writeKeyWithHint(
      signerPublicKey,
      "edpk"
    );
    const signerAddress = TezosMessageUtils.computeKeyHash(signerPublicKeyBuf);

    // Validate signature
    const sigVerified = await verifyTokenIssuanceSignature(
      documentHash,
      signerPublicKey,
      signature
    );
    if (!sigVerified) {
      throw new ValidationError("Invalid signature");
    }

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
      transactionHash,
    };
  }

  async getGroupAdminPubKey() {
    const storageList = await this.groupContract.storage();
    return storageList.adminPublicKey;
  }
}

module.exports = { LiveCopyGroup };
