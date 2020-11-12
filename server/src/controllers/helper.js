const { logger } = require("../logger");

// Response for all failed transactions
const FAILED_TXN_RESPONSE = {
  status: "error",
  code: 420,
  message: "failed to submit the transaction",
  data: "",
};

// Generic error handler for HTTP requests
function handleError(err, res) {
  if (err.reason === undefined) {
    console.log(err)
    logger.error(JSON.stringify(err));
    let responseText = {
      status: "error",
      code: 422,
      message: err.reason,
      data: "",
    };
    return res.status(422).send(responseText);
  } else {
    logger.error(err.reason);
    let responseText = {
      status: "error",
      code: 422,
      message: err.reason,
      data: "",
    };
    return res.status(422).send(responseText);
  }
}

function sendBadRequestErrMessage(res, message) {
  return res.status(400).send({
    status: "error",
    code: "404",
    message,
    data: "",
  });
}

exports.handleError = handleError;
exports.FAILED_TXN_RESPONSE = FAILED_TXN_RESPONSE;
exports.sendBadRequestErrMessage = sendBadRequestErrMessage;
