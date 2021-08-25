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
    blockTimeInMs: 60000,
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
      groupFactoryAddress: "KT1SP3xJGpCXbp8fjLJQyDDiQML1wiLi6TnW",
      nftAddress: "KT1EDsJBAJC5QGXwez5TbGeC8XgdFjAkTFba",
    },
    networkId: "NetXm8tYqnMWky1",
    blockTimeInMs: 30000,
  },
  edonet: {
    rpc: "https://edonet.smartpy.io",
    noOfConfirmations: 1,
    conseilServer: {
      url: "https://conseil-edo.cryptonomic-infra.tech",
      apiKey: "4d70ca8e-5c05-483a-8baf-3b419d0dd5ed",
      network: "edonet",
    },
    contractAddresses: {
      groupFactoryAddress: "KT1VbKGXcLemQxr1oYJEooQb79PnzSbEwhNC",
      nftAddress: "KT1VXzbsmSbyxiFTQ9YsCX7crXGX3HHdgy93",
    },
    networkId: "NetXSgo1ZT2DRUG",
    blockTimeInMs: 30000,
  },
  florencenet: {
    rpc: "https://florencenet.smartpy.io",
    noOfConfirmations: 1,
    conseilServer: {
      url: "https://conseil-florence.cryptonomic-infra.tech",
      apiKey: "4d70ca8e-5c05-483a-8baf-3b419d0dd5ed",
      network: "florence",
    },
    contractAddresses: {
      groupFactoryAddress: "KT1K9taHGJDDkHkiX2tVSdjRj13oue8Hgcqr",
      nftAddress: "KT1NEMVQzMZwTbUEfb8ZFkEBwEo7mwmmDiVJ",
    },
    networkId: "NetXxkAx4woPLyu",
    blockTimeInMs: 30000,
  },
  granadanet: {
    rpc: "https://granadanet.smartpy.io/",
    noOfConfirmations: 1,
    conseilServer: {
      url: "https://conseil-granada.cryptonomic-infra.tech",
      apiKey: "4d70ca8e-5c05-483a-8baf-3b419d0dd5ed",
      network: "granada",
    },
    contractAddresses: {
      groupFactoryAddress: "KT1EGH5whbtC3tPJWFak78sSihtjm8apJXcZ",
      nftAddress: "KT1ARw7C2X2st1R3p58znuzh13WqFrkbbXo6",
    },
    networkId: "NetXz969SFaFn8k",
    blockTimeInMs: 30000,
  },
};

// Set the default network to latest testnet, by default
const NETWORK = process.env.NETWORK || "edonet";
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
  blockTimeInMs: NETWORK_CONFIG[NETWORK].blockTimeInMs,

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
