const { Schema } = require("mongoose");

const customerSchema = new Schema(
  {
    chatId: { type: Number, default: null, unique: true },
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
    expireTime: {
      type: Date,
      default: Date.now(), // 24 hours from now
    },
  },
  { versionKey: false, timestamps: false }
);

module.exports = {
  customerSchema,
};
