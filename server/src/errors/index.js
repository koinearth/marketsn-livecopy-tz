// All validation errs. can be safely sent back to user
class ValidationError extends Error {
  get name() {
    return this.constructor.name;
  }
}

// Any errs. during txn brodcast
class TransactionError extends Error {
  get name() {
    return this.constructor.name;
  }
}

module.exports = {
  ValidationError,
  TransactionError,
};
