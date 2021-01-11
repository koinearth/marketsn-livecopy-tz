const { expect } = require("chai");

function assertBadRequestErrorMessage(res, expectedErrMsg) {
  expect(res).to.have.property("body");
  expect(res.body).to.have.property("status", "error");
  expect(res.body).to.have.property("code", 400);
  expect(res.body).to.have.property("message", expectedErrMsg);
}

module.exports = {
  assertBadRequestErrorMessage,
};
