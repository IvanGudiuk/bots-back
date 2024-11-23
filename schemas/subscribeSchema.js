const { Schema } = require("mongoose");

const subscribeSchema = new Schema(
  {
    chatId: { type: Number, default: null, unique: true },
    paymentId: { type: String, default: "" },
    monthes: { type: Number, default: 0 },
    pump: { type: Boolean, default: false },
    openinterest: { type: Boolean, default: false },
    orderbook: { type: Boolean, default: false },
    volumes: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: false }
);

module.exports = {
  subscribeSchema,
};
