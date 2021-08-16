"use strict";

const { logger } = require("../../logger");
const { handleError, sendBadRequestErrMessage } = require("../helper");
const ipfsAPI = require('ipfs-api')
const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https'})

const adddata = async({content}) => {
  const file = {content :Buffer.from(content)};
  const dataadded = await ipfs.add(file);
  return dataadded[0].hash;

}
// Issue an NFT corr. to a group
const issueCert = async function (req, res) {
  try {
    req.body.Data["PreviousCID"] = "";
    let content = JSON.stringify(req.body.Data) 
    let CID =  await adddata({"content":content})
    const livecopyGroupFactory = req.app.get("livecopyGroupFactory");
    const {
      GroupId,
      TokenOwner,
      TokenId,
      Hash,
      SignerPublicKey,
      Signature,
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

    // URL validations
    if (!CID) {
      return sendBadRequestErrMessage(res, "Missing parameter CID in request");
    }
    if (typeof CID !== "string") {
      return sendBadRequestErrMessage(res, "CID should be a valid string");
    }

    const livecopyGroup = await livecopyGroupFactory.getGroupInstance(GroupId);

    const { transactionHash } = await livecopyGroup.issueCertificate(
      TokenId,
      CID,
      Hash,
      TokenOwner,
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

const getCertforIPFS = async function (req,res,TokenSymbol, GroupId) {
  try {
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
    let TokenId = await livecopyGroup.getTokenId(TokenSymbol);
    // Retrieve details using TokenId
    const livecopyNft = req.app.get("livecopyNft");
    const tokenDetails = await livecopyNft.getTokenData(TokenId);
    return tokenDetails
  } catch (err) {
      console.log(err)
      if(err.reason == undefined)
      {
        return null;
      }
    return handleError(err, res);
  }
};
// Update an NFT corr. to a group
const updateCert = async function (req, res) {
  try {
    const livecopyGroupFactory = req.app.get("livecopyGroupFactory");
    const {
      GroupId,
      TokenId,
      Hash,
      SignerPublicKey,
      Signature,
    } = req.body;

    let previousCID = await getCertforIPFS(req, res, TokenId, GroupId);
    let publicData = req.body.Data;
    publicData["PreviousCID"] = previousCID["cid"];
    let content = JSON.stringify(publicData) 
    let CID =  await adddata({"content":content})
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

    // URL validations
    if (!CID) {
      return sendBadRequestErrMessage(res, "Missing parameter CID in request");
    }
    if (typeof CID !== "string") {
      return sendBadRequestErrMessage(res, "CID should be a valid string");
    }

    const livecopyGroup = await livecopyGroupFactory.getGroupInstance(GroupId);
    const { transactionHash } = await livecopyGroup.updateCertificate(
      TokenId,
      CID,
      Hash,
      SignerPublicKey,
      Signature
    );

    logger.info("Update cert operation id:", transactionHash);
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

const issueOrUpdateCert = async function (req, res) {
  // Check if Token Already exists
  const {
    GroupId,
    TokenId
  } = req.body;
  try {
    const livecopyGroupFactory = req.app.get("livecopyGroupFactory");
    const livecopyGroup = await livecopyGroupFactory.getGroupInstance(
        GroupId
      );
    await livecopyGroup.getTokenId(TokenId);
    updateCert(req, res);
  } catch (err) {
    console.log(err)
    issueCert(req, res);
  }
}

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
    let tokenDetails = await livecopyNft.getTokenData(TokenId);
    let previousCID = ""
    if(tokenDetails["cid"] != "") {
      let file = await ipfs.files.get(tokenDetails["cid"])
      let data = JSON.parse(file[0].content.toString())
      tokenDetails["data"] = data
      previousCID = data.PreviousCID
    }
    tokenDetails["data"]["history"] = []
    while (previousCID != "" & previousCID != undefined) {
      let file = await ipfs.files.get(previousCID)
      let data = JSON.parse(file[0].content.toString())
      tokenDetails["data"]["history"].push(data)
      previousCID = data.PreviousCID
    }
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
exports.updateCert = updateCert;
exports.getCert = getCert;
exports.issueOrUpdateCert = issueOrUpdateCert