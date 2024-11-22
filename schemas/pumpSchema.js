const { Schema } = require("mongoose");

const testSchema = new Schema(
  {
    chatId: { type: Number, default: null, unique: true },
    name: { type: String, required: true },
    dumpPercent: { type: Number, default: 5 },
    dumpPeriod: { type: Number, default: 30 },
    pumpPercent: { type: Number, default: 5 },
    pumpPeriod: { type: Number, default: 30 },
    selectedValue: { type: String, default: null },
    signals: { type: Array, default: [] },
    informed: { type: Boolean, default: false },
    paid: { type: Boolean, default: true },
    paymentId: {type: String, default: ''},
    monthes: {type: Number, default: 0},
    expireTime: {
      type: Date,
      default: () => new Date(Date.now() + 72 * 60 * 60 * 1000), // 24 hours from now
    },
  },
  { versionKey: false, timestamps: false }
);

module.exports = { testSchema };
