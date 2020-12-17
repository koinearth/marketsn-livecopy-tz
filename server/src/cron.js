const Cron = require("cron");
const { TransactionMonitor } = require("./services/relayer/transactionMonitor");

/**
 * Monitor status of pending transactions every 30 secs
 *
 * @param {TransactionMonitor} txnMonitor
 */
function startTransactionMonitor(txnMonitor) {
  new Cron.CronJob(
    "*/30 * * * * *",
    txnMonitor.start.bind(txnMonitor),
    null,
    true,
    "America/Los_Angeles"
  );
}

module.exports = { startTransactionMonitor };
