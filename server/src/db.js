const mongoose = require("mongoose");
const { config } = require("./config");

const { DB_CONFIG } = config;
const MONGO_USERNAME = DB_CONFIG.username;
const MONGO_PASSWORD = DB_CONFIG.password;
const MONGO_HOSTNAME = DB_CONFIG.host;
const MONGO_PORT = DB_CONFIG.port;
const MONGO_DB = DB_CONFIG.dbName;

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

// MongoDB connect
async function connect() {
  return mongoose.connect(url, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// MongoDB close connection
async function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };
