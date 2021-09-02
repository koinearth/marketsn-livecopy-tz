const mongoose = require("mongoose");
const { config } = require("./config");

const { DB_CONFIG } = config;
const MONGO_CS = DB_CONFIG.connectionString;

const url = MONGO_CS;

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
