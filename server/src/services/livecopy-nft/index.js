const { ContractAbstraction } = require("@taquito/taquito");
const { TezosRPC } = require("../tezos-rpc");
const { logger } = require("../../logger");

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
   * Returns token data from a groupId
   * @param {string} groupId
   *
   * @returns {string}
   */
  async getTokenData(groupId) {
    const storageList = await this.nftContract.storage();
    const { OracleList } = storageList;
    return OracleList.get(groupId);
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
