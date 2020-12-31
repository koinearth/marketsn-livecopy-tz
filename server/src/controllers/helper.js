const { logger } = require("../logger");
const { ValidationError, TransactionError } = require("../errors");

// Generic error handler for HTTP requests
function handleError(err, res) {
  // Handle validation errs.
  if (err instanceof ValidationError) {
    logger.error(`Validation Err: ${err.message}`);
    return sendBadRequestErrMessage(res, err.message);
  }

  // Handle txn related errs
  if (err instanceof TransactionError) {
    logger.error(`Transaction Err: ${JSON.stringify(err.message)}`);
    return res.status(420).send({
      status: "error",
      code: "420",
      message: err.message,
      data: "",
    });
  }

  // All other err. messages are logged but not sent back to client
  logger.error(`Error: ${JSON.stringify(err)}`);
  let responseText = {
    status: "error",
    code: "422",
    message: "Unknown error",
    data: "",
  };
  return res.status(422).send(responseText);
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
