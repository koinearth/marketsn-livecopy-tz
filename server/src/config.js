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
      nftAddress: "",
    },
    networkId: "NetXdQprcVkpaWU",
  },
  delphinet: {
    rpc: "https://delphinet-tezos.giganode.io",
    noOfConfirmations: 1,
    conseilServer: {
      url: "https://conseil-dev.cryptonomic-infra.tech",
      apiKey: "galleon",
      network: "delphinet",
    },
    contractAddresses: {
      groupFactoryAddress: "KT18kr5MY1tKpvU3H7dS5PSFknJb8LJtR6AS",
      nftAddress: "KT1UAQJ6XauawJvZdCvW6XvGnkraPZh3kjWa",
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

  // Used for notifying livecopy grp creation requests
  supportEmailId: process.env.SUPPORT_EMAIL_ID,
  supportEmailPassword: process.env.SUPPORT_EMAIL_PASSWORD,

  // Admin emails will receive the nofication on livecopy grp creation requests
  adminEmails: process.env.ADMIN_EMAILS.split(" "),
};

module.exports = { config };
