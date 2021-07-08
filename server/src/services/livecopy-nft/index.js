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
   * @param {number} tokenId
   *
   * @returns {object}
   */
  async getTokenData(tokenId) {
    const { token_metadata } = await this.nftContract.storage();
    const tokenData = await token_metadata.get(tokenId);

    if (!tokenData) {
      throw new ValidationError("TokenId not found");
    }

    let cid = await tokenData.token_info.get("cid")
    cid = await TezosMessageUtils.readPackedData(cid,"string")
    let assetId = await tokenData.token_info.get("assetId")
    assetId = await TezosMessageUtils.readPackedData(assetId,"string")
    return {
      assetId,
      tokenId,
      cid
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
