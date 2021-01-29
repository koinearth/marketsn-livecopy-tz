const { Types } = require("mongoose");
const { transactionsModel } = require("../../models/transactions/schema");
const { handleError, sendBadRequestErrMessage } = require("../helper");

// Given a transaction hash, report back the status
// status can be `success`, `pending`, `failed`
const transactionStatus = async function (req, res) {
  try {
    const { transactionHash } = req.query;
    if (!transactionHash) {
      return sendBadRequestErrMessage(
        res,
        "Missing parameter transactionHash in request"
      );
    }

    const txnRecord = await transactionsModel.findOne(
      { _id: Types.ObjectId(transactionHash) },
      { status: 1, error: 1 }
    );
    if (!txnRecord) {
      return res.status(420).send({
        status: "error",
        code: 420,
        message: "failed to query the transaction status",
        data: "",
      });
    }

    return res.status(200).send({
      status: "success",
      code: "200",
      message: "Successfully queried the transaction status",
      data: {
        status: txnRecord.status,
        error: txnRecord.error,
      },
    });
  } catch (err) {
    return handleError(err, res);
  }
};

exports.transactionStatus = transactionStatus;
