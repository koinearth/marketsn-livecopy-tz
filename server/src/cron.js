const Cron = require("cron");
const { TransactionMonitor } = require("./services/relayer/transactionMonitor");

/**
 * Monitor status of pending transactions each minute
 *
 * @param {TransactionMonitor} txnMonitor
 */
function startTransactionMonitor(txnMonitor) {
  new Cron.CronJob(
    "* * * * *",
    txnMonitor.start.bind(txnMonitor),
    null,
    true,
    "America/Los_Angeles"
  );
}

module.exports = { startTransactionMonitor };
