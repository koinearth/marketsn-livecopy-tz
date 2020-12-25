const {
  ContractAbstraction,
  TezosOperationError,
} = require("@taquito/taquito");
const { TezosMessageUtils } = require("conseiljs");
const { TezosRPC } = require("../tezos-rpc");
const { Relayer } = require("../relayer");
const { logger } = require("../../logger");
const { sendEmail } = require("./mailer");
const { LiveCopyGroup } = require("./livecopy-group");

class LiveCopyGroupFactory {
  /**
   * @param {ContractAbstraction} groupFactoryContract
   * @param {Relayer} relayer
   * @param {TezosRPC} tezosRpc
   */
  constructor(groupFactoryContract, relayer, tezosRpc) {
    this.groupFactoryContract = groupFactoryContract;
    this.relayer = relayer;
    this.tezosRpc = tezosRpc;
  }

  /**
   * Request a group creation from oracle factory
   *
   * @param {string} groupId
   * @param {string} adminPublicKey
   * @param {number} minSignaturesReqd
   *
   * @returns {Promise<{error: Error}>}
   */
  async requestGroupCreation(groupId, adminPublicKey, minSignaturesReqd) {
    try {
      const adminPublicKeyBuf = TezosMessageUtils.writeKeyWithHint(
        adminPublicKey,
        "edpk"
      );
      TezosMessageUtils.computeKeyHash(adminPublicKeyBuf);
      const groupAddress = await this.getGroupAddress(groupId);
      if (groupAddress) {
        return {
          error: "groupId already exists",
        };
      }

      if (minSignaturesReqd <= 0) {
        return {
          error: "minimum signatures should be atleast 1",
        };
      }

      await sendEmail(groupId, adminPublicKey, minSignaturesReqd);

      return {
        error: null,
      };
    } catch (error) {
      logger.error(error.message);
      if (error instanceof TezosOperationError) {
        logger.error("Operation error");
      }

      return {
        error: error.message,
      };
    }
  }

  /**
   * Create a group from oracle factory
   *
   * @param {string} groupId
   * @param {string} adminPublicKey
   * @param {number} minSignaturesReqd
   * @param {number} timeStamp
   * @param {string} livecopyAdminSignature
   *
   * @returns {Promise<{error: Error, transactionHash: string}>}
   */
  async createGroup(
    groupId,
    adminPublicKey,
    minSignaturesReqd,
    timeStamp,
    livecopyAdminSignature
  ) {
    try {
      const adminPublicKeyBuf = TezosMessageUtils.writeKeyWithHint(
        adminPublicKey,
        "edpk"
      );
      const adminAddress = TezosMessageUtils.computeKeyHash(adminPublicKeyBuf);
      const createMethod = this.groupFactoryContract.methods["create"](
        livecopyAdminSignature,
        timeStamp.toString(),
        adminAddress,
        adminPublicKey,
        groupId,
        minSignaturesReqd
      );
      const transferParams = createMethod.toTransferParams();
      const transactionHash = await this.relayer.sendContractInvocation(
        transferParams
      );
      return {
        error: null,
        transactionHash,
      };
    } catch (error) {
      logger.error(error.message);
      if (error instanceof TezosOperationError) {
        logger.error("Operation error");
      }

      return {
        error: error.message,
      };
    }
  }

  /**
   * Set an NFT Address for a livecopy factory
   * @param {string} nftAddress
   *
   * @returns {Promise<{error: Error, transactionHash: string}>}
   */
  async setNftAddress(nftAddress) {
    try {
      const setNftMethod = this.groupFactoryContract.methods["setNFTAddres"](
        nftAddress
      );
      const transferParams = setNftMethod.toTransferParams();
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
   * Return a list of all livecopy group addresses created from factory
   *
   * @returns {Promise<{[key: string]: string}[]>} Array of livecopygroup addresses
   */
  async listAllGroups() {
    const groupAddresses = await this.tezosRpc.readBigMap(
      this.groupFactoryContract.address
    );

    const formatedArray = [];
    for (let { key, value } of groupAddresses) {
      key = key.replace(/\\\"/g, "").replace(/\"/g, "").replace(/\n/, "");
      value = value.replace(/\"/g, "").replace(/\n/, "");
      formatedArray.push({
        id: key,
        address: TezosMessageUtils.readAddress(value.split("0x")[1]),
      });
    }
    return formatedArray;
  }

  /**
   * Returns a group address from a groupId
   * @param {string} groupId
   *
   * @returns {Promise<string>}
   */
  async getGroupAddress(groupId) {
    const storageList = await this.groupFactoryContract.storage();
    const { OracleList } = storageList;
    return OracleList.get(groupId);
  }

  /**
   * Returns a livecopy group instance from a groupId
   * @param {string} groupId
   *
   * @returns {Promise<{error: null|string; livecopyGroup?: LiveCopyGroup}>}
   */
  async getGroupInstance(groupId) {
    const groupAddress = await this.getGroupAddress(groupId);
    if (!groupAddress) {
      return {
        error: "GroupId not found",
      };
    }

    const groupContract = await this.tezosRpc.getContractInstance(groupAddress);
    const livecopyGroup = new LiveCopyGroup(
      groupContract,
      this.relayer,
      this.tezosRpc
    );
    return {
      error: null,
      livecopyGroup,
    };
  }
}

/**
 * Intialize livecopy group
 *
 * @param {TezosRPC} tezosRpc
 * @param {string} groupFactoryAddress
 * @param {Relayer} relayer
 *
 * @returns {Promise<LiveCopyGroupFactory>}
 */
async function initializeLiveCopyGroupFactory(
  tezosRpc,
  groupFactoryAddress,
  relayer
) {
  const groupFactoryContract = await tezosRpc.getContractInstance(
    groupFactoryAddress
  );

  return new LiveCopyGroupFactory(groupFactoryContract, relayer, tezosRpc);
}

module.exports = { initializeLiveCopyGroupFactory };
