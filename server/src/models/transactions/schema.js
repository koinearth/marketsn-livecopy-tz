const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  transactionHash: {
    type: String,
    required: true,
    createIndex: { unique: true },
  },
  networkId: { type: String },
  relayerAddress: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "failed", "success"],
    default: "pending",
  },
  // Level at which the transaction was added to mempool
  // Helps in determining if the transaction is `lost` or `skipped`
  blockLevelAtBroadcast: {
    type: Number,
    required: true,
  },
  blockHashAtBroadcast: {
    type: String,
    required: true,
  },
});

transactionSchema.set("timestamps", true);
const transactionsModel = mongoose.model("transactions", transactionSchema);

module.exports = { transactionsModel };
