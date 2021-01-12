const { ContractAbstraction } = require("@taquito/taquito");
const { TezosRPC } = require("../tezos-rpc");
const { TezosMessageUtils } = require("conseiljs");
const { hex2buf } = require("../../utils");
const { verifyTokenIssuanceSignature } = require("../signatureVerifier");
const { ValidationError } = require("../../errors");

class LiveCopyNft {
  /**
   * @param {ContractAbstraction} nftContract
   * @param {TezosRPC} tezosRpc
   */
  constructor(nftContract, tezosRpc) {
    this.nftContract = nftContract;
    this.tezosRpc = tezosRpc;
  }

  /**
   * Returns token data from a tokenId
   * @param {string} tokenId
   *
   * @returns {object}
   */
  async getTokenData(tokenId) {
    const { tokenData } = await this.nftContract.storage();
    const tokenDataList = await tokenData.get(tokenId);

    if (!tokenDataList) {
      throw new ValidationError("TokenId not found");
    }

    const history = [];
    for (const tokenData of tokenDataList) {
      let {
        _hash,
        authorities,
        issueDateTime,
        oracleContract,
        signatures_hashed,
        state,
        url,
      } = tokenData;

      // Get authority aliases corr. to authorities from contract
      const groupOracleContract = await this.tezosRpc.getContractInstance(
        oracleContract
      );
      const { signerAddressAlias } = await groupOracleContract.storage();
      const authoritiesAliases = authorities.map((authority) =>
        signerAddressAlias.get(authority)
      );

      // Convert signatures from bytes to readable `edsig` format
      const signatures = signatures_hashed.map((signatureBytes) =>
        TezosMessageUtils.readSignatureWithHint(
          hex2buf(TezosMessageUtils.readPackedData(signatureBytes, "bytes")),
          "edsig"
        )
      );

      // Convert from bytes to pub key
      authorities = authorities.map((authority) =>
        TezosMessageUtils.readPublicKey(
          TezosMessageUtils.readPackedData(authority, "bytes")
        )
      );

      // Construct signature mapping
      const signature_mapping = await this._constructSignatureMapping(
        _hash,
        authorities,
        authoritiesAliases,
        signatures
      );

      // Convert from bytes to respective formats
      _hash = "0x" + TezosMessageUtils.readPackedData(_hash, "bytes");

      history.push({
        state,
        hash: _hash,
        url,
        issueDateTime: issueDateTime,
        signatures: signature_mapping,
      });
    }

    return {
      ownerAddr: tokenDataList[0].to,
      ownerOrgId: tokenDataList[0].toAlias,
      ownerOrgName: tokenDataList[0].toAlias,
      oracleContract: tokenDataList[0].oracleContract,
      groupId: tokenDataList[0].groupId,
      assetType: tokenDataList[0].assetType,
      history,
    };
  }

  // Map signatures to signer public keys and aliases
  // 1. Loop through all signatures
  // 2. Verify the signature publickey and update mapping
  async _constructSignatureMapping(
    docHash,
    authorities,
    authoritiesAliases,
    signatures
  ) {
    const signatureMapping = {};

    for (const sig of signatures) {
      for (let i = 0; i < authorities.length; i++) {
        const sigVerified = await verifyTokenIssuanceSignature(
          docHash,
          authorities[i],
          sig
        );
        if (sigVerified) {
          const alias = authoritiesAliases[i];
          signatureMapping[alias] = sig;
        }
      }
    }

    return signatureMapping;
  }
}

/**
 * Intialize livecopy nft contract
 *
 * @param {TezosRPC} tezosRpc
 * @param {string} nftAddress
 *
 * @returns {Promise<LiveCopyGroupFactory>}
 */
async function initializeLiveCopyNft(tezosRpc, nftAddress) {
  const groupFactoryContract = await tezosRpc.getContractInstance(nftAddress);

  return new LiveCopyNft(groupFactoryContract, tezosRpc);
}

module.exports = { initializeLiveCopyNft };
