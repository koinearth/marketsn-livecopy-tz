"use strict";

const { logger } = require("../../logger");
const { handleError, sendBadRequestErrMessage } = require("../helper");

// Issue an NFT corr. to a group
const issueCert = async function (req, res) {
  try {
    const livecopyGroupFactory = req.app.get("livecopyGroupFactory");
    const {
      GroupId,
      TokenOwner,
      TokenId,
      Hash,
      SignerPublicKey,
      Signature,
      State,
      AssetType,
      URL,
    } = req.body;

    // GroupId validations
    if (!GroupId) {
      return sendBadRequestErrMessage(
        res,
        "Missing parameter GroupId in request"
      );
    }
    if (typeof GroupId !== "string") {
      return sendBadRequestErrMessage(res, "GroupId should be a valid string");
    }

    // TokenOwner validations
    if (!TokenOwner) {
      return sendBadRequestErrMessage(
        res,
        "Missing parameter TokenOwner in request"
      );
    }
    if (typeof TokenOwner !== "string") {
      return sendBadRequestErrMessage(
        res,
        "TokenOwner should be a valid string"
      );
    }

    // TokenId validations
    if (!TokenId) {
      return sendBadRequestErrMessage(
        res,
        "Missing parameter TokenId in request"
      );
    }
    if (typeof TokenId !== "string") {
      return sendBadRequestErrMessage(res, "TokenId should be a valid string");
    }

    // Hash validations
    if (!Hash) {
      return sendBadRequestErrMessage(res, "Missing parameter Hash in request");
    }
    if (typeof Hash !== "string") {
      return sendBadRequestErrMessage(res, "Hash should be a valid string");
    }

    // SignerPublicKey validations
    if (!SignerPublicKey) {
      return sendBadRequestErrMessage(
        res,
        "Missing parameter SignerPublicKey in request"
      );
    }
    if (typeof SignerPublicKey !== "string") {
      return sendBadRequestErrMessage(
        res,
        "SignerPublicKey should be a valid string"
      );
    }

    // Signature validations
    if (!Signature) {
      return sendBadRequestErrMessage(
        res,
        "Missing parameter Signature in request"
      );
    }
    if (typeof Signature !== "string") {
      return sendBadRequestErrMessage(
        res,
        "Signature should be a valid string"
      );
    }

    // State validations
    if (!State) {
      return sendBadRequestErrMessage(
        res,
        "Missing parameter State in request"
      );
    }
    if (typeof State !== "string") {
      return sendBadRequestErrMessage(res, "State should be a valid string");
    }

    // AssetType validations
    if (!AssetType) {
      return sendBadRequestErrMessage(
        res,
        "Missing parameter AssetType in request"
      );
    }
    if (typeof AssetType !== "string") {
      return sendBadRequestErrMessage(
        res,
        "AssetType should be a valid string"
      );
    }

    // URL validations
    if (!URL) {
      return sendBadRequestErrMessage(res, "Missing parameter URL in request");
    }
    if (typeof URL !== "string") {
      return sendBadRequestErrMessage(res, "URL should be a valid string");
    }

    const livecopyGroup = await livecopyGroupFactory.getGroupInstance(GroupId);
    const { transactionHash } = await livecopyGroup.issueCertificate(
      TokenId,
      AssetType,
      URL,
      Hash,
      TokenOwner,
      State,
      SignerPublicKey,
      Signature
    );

    logger.info("Issue cert operation id:", transactionHash);
    return res.status(200).send({
      status: "success",
      code: 200,
      message: "Successfully submitted the transaction",
      data: { transactionHash },
    });
  } catch (err) {
    return handleError(err, res);
  }
};

// Get details of nft from smart contract
const getCert = async function (req, res) {
  try {
    let { TokenId, TokenSymbol, GroupId } = req.query;

    if (!TokenId && !TokenSymbol && !GroupId) {
      return sendBadRequestErrMessage(
        res,
        "Should provide either of TokenId or (TokenSymbol and GroupId)"
      );
    }

    // TokenId null
    // 1. Retrieve the tokenId using groupId and symbol
    // 2. Fetch the details using the tokenId
    if (!TokenId) {
      if (!TokenSymbol) {
        return sendBadRequestErrMessage(
          res,
          "Missing parameter TokenSymbol in request"
        );
      }

      if (!GroupId) {
        return sendBadRequestErrMessage(
          res,
          "Missing parameter GroupId in request"
        );
      }
      const livecopyGroupFactory = req.app.get("livecopyGroupFactory");
      const livecopyGroup = await livecopyGroupFactory.getGroupInstance(
        GroupId
      );
      TokenId = await livecopyGroup.getTokenId(TokenSymbol);
    }

    // Retrieve details using TokenId
    const livecopyNft = req.app.get("livecopyNft");
    const tokenDetails = await livecopyNft.getTokenData(TokenId);
    return res.status(200).send({
      status: "success",
      code: 200,
      message: "Successfully queried the smart contract",
      data: tokenDetails,
    });
  } catch (err) {
    return handleError(err, res);
  }
};

exports.issueCert = issueCert;
exports.getCert = getCert;
