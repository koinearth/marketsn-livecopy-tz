const dotenv = require("dotenv");
dotenv.config();

// Database config
const DB_CONFIG = {
  username: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
};

// Network specific config
// This might need to be changed frequently
// whenever Tezos deprecates existing testnet
const NETWORK_CONFIG = {
  mainnet: {
    rpc: "https://api.tez.ie/rpc/mainnet",
    noOfConfirmations: 1,
    conseilServer: {
      url: "https://conseil-prod.cryptonomic-infra.tech",
      apiKey: "galleon",
      network: "mainnet",
    },
    contractAddresses: {
      groupFactoryAddress: "",
    },
    networkId: "NetXdQprcVkpaWU",
  },
  delphinet: {
    rpc: "https://delphinet.smartpy.io",
    noOfConfirmations: 1,
    conseilServer: {
      url: "https://conseil-dev.cryptonomic-infra.tech",
      apiKey: "galleon",
      network: "delphinet",
    },
    contractAddresses: {
      groupFactoryAddress: "KT1FbRDTAkbv3HGEgLvzMLGgqPTp8D2fQh72",
    },
    networkId: "NetXm8tYqnMWky1",
  },
};

// Set the default network to latest testnet, by default
const NETWORK = process.env.NETWORK || "delphinet";
const relayerSecretKeys = process.env.RELAYER_SECRET_KEYS
  ? process.env.RELAYER_SECRET_KEYS.split(" ")
  : [];

const config = {
  PORT: process.env.PORT || 3000,

  rpc: NETWORK_CONFIG[NETWORK].rpc,
  networkId: NETWORK_CONFIG[NETWORK].networkId,
  noOfConfirmations: NETWORK_CONFIG[NETWORK].noOfConfirmations,
  conseilServer: NETWORK_CONFIG[NETWORK].conseilServer,
  contractAddresses: NETWORK_CONFIG[NETWORK].contractAddresses,

  relayerSecretKeys,

  // Fee priority helps in deciding gasPrices and txnFees
  // Possible values: `low`, `medium`, `high`
  FEE_PRIORITY: process.env.FEE_PRIORITY || "high",

  DB_CONFIG,
};

module.exports = { config };
