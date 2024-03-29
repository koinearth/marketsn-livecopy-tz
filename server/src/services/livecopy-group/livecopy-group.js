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
    if (whitelistedAddresses.Addresses.indexOf(signerAddress) > -1) {
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

    let data = {};
    data.Addresses = storageList.whiteListedAddresses.map((whitelistAddrHex) =>
      TezosMessageUtils.readPublicKey(
        TezosMessageUtils.readPackedData(whitelistAddrHex, "bytes")
      )
    );

    data.aliasNames = [];
    const { signerAddressAlias } = storageList;
    for (const whitelistAddr of storageList.whiteListedAddresses) {
      data.aliasNames.push(signerAddressAlias.get(whitelistAddr));
    }
    return data;
  }

  /**
   * Return the id corresponding to a string tokenSymbol
   * @param {string} tokenSymbol
   *
   * @returns {string}
   */
  async getTokenId(tokenSymbol) {
    const { tokensIssued } = await this.groupContract.storage();

    const tokenId = await tokensIssued.get(tokenSymbol);
    if (tokenId === null || tokenId === undefined) {
      throw new ValidationError("TokenId not found");
    }

    return tokenId.toString();
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
    documentcid,
    documentHash,
    issuedToAlias,
    signerPublicKey,
    signature
  ) {
    // Validate signer pub key
    const isValid = validatePublicKey(signerPublicKey);
    if (!isValid) {
      throw new ValidationError("Invalid signer public key");
    }

    // Validate toAlias whitelisted or not
    const toAddress = await this.getAddressOfAlias(issuedToAlias);
    if (!toAddress) {
      throw new ValidationError("To address not whitelisted");
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
      documentcid,
      documentHash,
      signature,
      signerPublicKey,
      issuedToAlias,
      tokenId,
    );
    const transferParams = issueCertificateMethod.toTransferParams();
    const transactionHash = await this.relayer.sendContractInvocation(
      transferParams
    );
    return {
      transactionHash,
    };
  }

  async updateCertificate(
    tokenId,
    documentcid,
    documentHash,
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

    const updateCertificateMethod = this.groupContract.methods["updateCert"](
      documentcid,
      documentHash,
      signature,
      signerPublicKey,
      tokenId,
    );
    const transferParams = updateCertificateMethod.toTransferParams();
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

  async getAddressOfAlias(alias) {
    const storageList = await this.groupContract.storage();
    const { signerAddress } = storageList;
    return signerAddress.get(alias);
  }
}

module.exports = { LiveCopyGroup };
