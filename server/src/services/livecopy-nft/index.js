const { ContractAbstraction } = require("@taquito/taquito");
const { TezosRPC } = require("../tezos-rpc");
const { logger } = require("../../logger");
const { TezosMessageUtils } = require("conseiljs");
const { hex2buf } = require("../../utils");

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
    let {
      _hash,
      assetType,
      authorities,
      groupId,
      issueDateTime,
      oracleContract,
      signatures_hashed,
      state,
      to,
      toAlias,
      url,
    } = await tokenData.get(tokenId);

    // Convert from bytes to respective formats
    _hash = "0x" + TezosMessageUtils.readPackedData(_hash, "bytes");
    authorities = authorities.map((authority) =>
      TezosMessageUtils.readPublicKey(
        TezosMessageUtils.readPackedData(authority, "bytes")
      )
    );
    signatures_hashed = signatures_hashed.map((signatureBytes) =>
      TezosMessageUtils.readSignatureWithHint(
        hex2buf(TezosMessageUtils.readPackedData(signatureBytes, "bytes")),
        "edsig"
      )
    );

    return {
      ownerOrgId: groupId,
      ownerAddr: to,
      oracleContract,
      groupId,
      assetType,
      state,
      hash: _hash,
      url,
      issueDateTime,
      signerPublicKeys: authorities,
      signatures: signatures_hashed,
    };
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
