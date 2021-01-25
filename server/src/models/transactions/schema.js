const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  transactionHash: {
    type: String,
  },
  networkId: { type: String },
  relayerAddress: {
    type: String,
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
  },
  blockHashAtBroadcast: {
    type: String,
  },
});

transactionSchema.set("timestamps", true);
const transactionsModel = mongoose.model("transactions", transactionSchema);

module.exports = { transactionsModel };
