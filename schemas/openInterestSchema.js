const { Schema } = require("mongoose");

const customerSchema = new Schema(
  {
    chatId: { type: Number, default: null },
    name: {
      type: String,
      required: true,
    },
    percent: { type: Number, default: 5 },
    period: { type: Number, default: 30 },
    turnover: { type: Number, default: 1 },
    signals: { type: Object, default: {} },
    selectedValue: {
      type: String,
      default: null,
    },
    informed: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: true,
    },
    paymentId: { type: String, default: "" },
    monthes: { type: Number, default: 0 },
    newExpireTime: {
      type: Date,
      default: () => new Date(Date.now() - 5 * 1000),
    },
    expireTime: {
      type: Date,
      default: () => new Date(Date.now()),
      // default: () => new Date(Date.now() + 72 * 60 * 60 * 1000),
    },
  },
  { versionKey: false, timestamps: false }
);

module.exports = {
  customerSchema,
};
