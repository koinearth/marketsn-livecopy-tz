const express = require("express");
const helmet = require("helmet");
const compression = require("compression");

const { config } = require("./config");
const { logger } = require("./logger");
const livecopyGroupRoutes = require("./routes/livecopy-group");
const statusRoutes = require("./routes/status");
const livecopyCertRoutes = require("./routes/livecopy-nft");

/**
 * Services initialization and
 * starts monitoring pending transactions for status updates
 */
const { TezosRPC } = require("./services/tezos-rpc");
const { initializeRelayers } = require("./services/relayer");
const { initializeLiveCopyGroupFactory } = require("./services/livecopy-group");
const { initializeLiveCopyNft } = require("./services/livecopy-nft");

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(config.pinataAPIKey, config.pinataAPIPass);

async function initialize() {

  logger.info("initializing connection to " + config.rpc + " ...")
  const rpc = new TezosRPC(
    config.rpc,
    config.networkId,
    config.conseilServer,
    config.FEE_PRIORITY
  );

  logger.info("initializing relayers ...");
  const relayer = await initializeRelayers(
    rpc,
    config.relayerSecretKeys,
    config.blockTimeInMs
  );

  logger.info("initializing livecopy ...");
  const livecopyGroupFactory = await initializeLiveCopyGroupFactory(
    rpc,
    config.contractAddresses.groupFactoryAddress,
    relayer
  );

  const livecopyNft = await initializeLiveCopyNft(
    rpc,
    config.contractAddresses.nftAddress,
    relayer
  );
  
  logger.info("initializing pinning service ...");
  await pinata.testAuthentication().then((result) => {
    //handle successful authentication here
    //console.log(result);
  }).catch((err) => {
      //handle error here
      console.log(err);
  });

  return {
    livecopyGroupFactory,
    livecopyNft,
  };
}

/**
 * Creates an express app
 * Adds required middleware to app
 */
async function createExpressApp() {
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
  const { livecopyGroupFactory, livecopyNft } = await initialize();
  // Set `livecopyGroupFactory` instance to be available in the controllers
  app.set("livecopyGroupFactory", livecopyGroupFactory);
  app.set("livecopyNft", livecopyNft);

  app.use("/livecopyadmin", livecopyGroupRoutes);
  app.use("/status", statusRoutes);
  app.use("/livecopycert", livecopyCertRoutes);
  return app;
}

module.exports = {
  createExpressApp,
  initialize,
};
