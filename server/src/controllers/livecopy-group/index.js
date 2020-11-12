"use strict";

const { logger } = require("../../logger");
const {
  handleError,
  FAILED_TXN_RESPONSE,
  sendBadRequestErrMessage,
} = require("../helper");

// Create a group from factory contract
// TODO: Add `livecopy admin` signature validation
const createGroup = async function (req, res) {
  try {
    const livecopyGroupFactory = req.app.get("livecopyGroupFactory");
    const { AdminPublicKey, Policy, GroupId } = req.body;
    // AdminPublicKey validations
    if (!AdminPublicKey) {
      return sendBadRequestErrMessage(
        res,
        "Missing parameter AdminPublicKey in request"
      );
    }
    if (typeof AdminPublicKey !== "string") {
      return sendBadRequestErrMessage(
        res,
        "AdminPublicKey should be a valid string"
      );
    }

    // Policy validations
    if (!Policy) {
      return sendBadRequestErrMessage(
        res,
        "Missing parameter Policy in request"
      );
    }
    if (typeof Policy !== "number") {
      return sendBadRequestErrMessage(res, "Policy should be a valid number");
    }

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

    const { error, transactionHash } = await livecopyGroupFactory.createGroup(
      GroupId,
      AdminPublicKey,
      Policy
    );
    if (error) {
      logger.error(error);
      return res.status(420).send(FAILED_TXN_RESPONSE);
    }

    logger.info("Group instance creation txn hash:", transactionHash);
    return res.status(200).send({
      status: "success",
      code: "200",
      message: "Successfully submitted the transaction",
      data: { transactionHash },
    });
  } catch (err) {
    return handleError(err, res);
  }
};

// Get a group address from a groupId
const getGroupAddress = async function (req, res) {
  try {
    const livecopyGroupFactory = req.app.get("livecopyGroupFactory");
    const { groupId } = req.params;
    const groupAddress = await livecopyGroupFactory.getGroupAddress(groupId);
    if (!groupAddress) {
      return res.status(422).send({
        status: "error",
        code: "422",
        message: "GroupId not found in the smart contract",
        data: "",
      });
    }
    return res.status(200).send({
      status: "success",
      code: "200",
      message: "Successfully queried the smart contract",
      data: groupAddress,
    });
  } catch (err) {
    return handleError(err, res);
  }
};

// List all the groups created from factory
const listAllGroups = async function (req, res) {
  try {
    const livecopyGroupFactory = req.app.get("livecopyGroupFactory");
    const groups = await livecopyGroupFactory.listAllGroups();
    return res.status(200).send({
      status: "success",
      code: "200",
      message: "Successfully queried the smart contract",
      data: {
        groups,
      },
    });
  } catch (err) {
    return handleError(err, res);
  }
};

// Add whitelisted account to the group instance contract
// TODO: Add signature validation
const addSignerToGroup = async function (req, res) {
  try {
    const livecopyGroupFactory = req.app.get("livecopyGroupFactory");
    const {
      GroupId,
      SignerAccount,
      SignerName,
      AdminSignature,
      AdminPublicKey,
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

    // SignerAccount validations
    if (!SignerAccount) {
      return sendBadRequestErrMessage(
        res,
        "Missing parameter SignerAccount in request"
      );
    }
    if (typeof SignerAccount !== "string") {
      return sendBadRequestErrMessage(
        res,
        "SignerAccount should be a valid string"
      );
    }

    // SignerName validations
    if (!SignerName) {
      return sendBadRequestErrMessage(
        res,
        "Missing parameter SignerName in request"
      );
    }
    if (typeof SignerName !== "string") {
      return sendBadRequestErrMessage(
        res,
        "SignerName should be a valid string"
      );
    }

    // AdminSignature validations
    if (!AdminSignature) {
      return sendBadRequestErrMessage(
        res,
        "Missing parameter AdminSignature in request"
      );
    }
    if (typeof AdminSignature !== "string") {
      return sendBadRequestErrMessage(
        res,
        "AdminSignature should be a valid string"
      );
    }

    // AdminPublicKey validations
    if (!AdminPublicKey) {
      return sendBadRequestErrMessage(
        res,
        "Missing parameter AdminPublicKey in request"
      );
    }
    if (typeof AdminPublicKey !== "string") {
      return sendBadRequestErrMessage(
        res,
        "AdminPublicKey should be a valid string"
      );
    }

    const groupInstanceRes = await livecopyGroupFactory.getGroupInstance(
      GroupId
    );
    if (groupInstanceRes.error) {
      return res.status(200).send({
        status: "error",
        code: 420,
        message: "failed to submit the transaction; groupId doesn't exists",
        data: "",
      });
    }

    const livecopyGroup = groupInstanceRes.livecopyGroup;
    const {
      error,
      transactionHash,
    } = await livecopyGroup.addWhitelistedAddress(
      SignerAccount,
      SignerName,
      AdminPublicKey,
      AdminSignature
    );
    if (error) {
      logger.error(error);
      return res.status(420).send(FAILED_TXN_RESPONSE);
    }

    logger.info("Group instance creation txn hash:", transactionHash);
    return res.status(200).send({
      status: "success",
      code: "200",
      message: "Successfully submitted the transaction",
      data: { transactionHash },
    });
  } catch (err) {
    return handleError(err, res);
  }
};

// List whitelisted address of a group instance
const listWhitelistedAddresses = async function (req, res) {
  try {
    const livecopyGroupFactory = req.app.get("livecopyGroupFactory");
    const { groupId } = req.params;
    const {
      error,
      livecopyGroup,
    } = await livecopyGroupFactory.getGroupInstance(groupId);
    if (error) {
      return res.status(420).send({
        status: "error",
        code: 420,
        message: "failed to query the contract; groupId doesn't exists",
        data: "",
      });
    }

    const whiteListedAddresses = await livecopyGroup.getWhitelistedAddresses();
    return res.status(200).send({
      status: "success",
      code: "200",
      message: "Successfully queried the smart contract",
      data: whiteListedAddresses,
    });
  } catch (err) {
    return handleError(err, res);
  }
};

exports.createGroup = createGroup;
exports.getGroupAddress = getGroupAddress;
exports.listAllGroups = listAllGroups;
exports.addSignerToGroup = addSignerToGroup;
exports.listWhitelistedAddresses = listWhitelistedAddresses;
