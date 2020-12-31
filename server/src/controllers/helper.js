const { logger } = require("../logger");
const { ValidationError, TransactionError } = require("../errors");

// Generic error handler for HTTP requests
function handleError(err, res) {
  // Handle validation errs.
  if (err instanceof ValidationError) {
    return sendBadRequestErrMessage(res, err.message);
  }

  // Handle txn related errs
  if (err instanceof TransactionError) {
    logger.error(err);
    return res.status(420).send({
      status: "error",
      code: "420",
      message: err.message,
      data: "",
    });
  }

  // Any other
  if (err.reason === undefined) {
    logger.error(err);
    logger.error(JSON.stringify(err));
    let responseText = {
      status: "error",
      code: "422",
      message: err.reason,
      data: "",
    };
    return res.status(422).send(responseText);
  } else {
    logger.error(err.reason);
    let responseText = {
      status: "error",
      code: "422",
      message: err.reason,
      data: "",
    };
    return res.status(422).send(responseText);
  }
}

function sendBadRequestErrMessage(res, message) {
  return res.status(400).send({
    status: "error",
    code: "400",
    message,
    data: "",
  });
}

exports.handleError = handleError;
exports.sendBadRequestErrMessage = sendBadRequestErrMessage;
