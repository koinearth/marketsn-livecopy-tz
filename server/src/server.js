const express = require("express");
const helmet = require("helmet");
const http = require("http");
const compression = require("compression");

const { config } = require("./config");
const { logger } = require("./logger");
const livecopyGroupRoutes = require("./routes/livecopy-group");
const statusRoutes = require("./routes/status");

/**
 * Services initialization and
 * starts monitoring pending transactions for status updates
 */
const { TezosRPC } = require("./services/tezos-rpc");
const { initializeRelayers } = require("./services/relayer");
const { initializeLiveCopyGroupFactory } = require("./services/livecopy-group");
const { TransactionMonitor } = require("./services/relayer/transactionMonitor");
const { startTransactionMonitor } = require("./cron");

async function initialize() {
  const rpc = new TezosRPC(
    config.rpc,
    config.networkId,
    config.conseilServer,
    config.FEE_PRIORITY
  );

  logger.info("initializing relayers ...");
  const relayer = await initializeRelayers(rpc, config.relayerSecretKeys);

  logger.info("initializing livecopy ...");
  const livecopyGroupFactory = await initializeLiveCopyGroupFactory(
    rpc,
    config.contractAddresses.groupFactoryAddress,
    relayer
  );

  const transactionMonitor = new TransactionMonitor(rpc, config.conseilServer);
  startTransactionMonitor(transactionMonitor);

  return {
    livecopyGroupFactory,
  };
}

/**
 * Creates an express HTTP server
 * Adds required middleware to express server
 */
async function createHttpServer() {
  const app = express();
  app.use(compression());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, PUT, OPTIONS, DELETE, GET"
    );

    // TODO: Fix cors settings
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  // Initialize services
  const { livecopyGroupFactory } = await initialize();
  // Set `livecopyGroupFactory` instance to be available in the controllers
  app.set("livecopyGroupFactory", livecopyGroupFactory);

  app.use("/livecopyadmin", livecopyGroupRoutes);
  app.use("/status", statusRoutes);

  const server = http.createServer(app);
  return server;
}

module.exports = {
  createHttpServer,
  initialize,
};
