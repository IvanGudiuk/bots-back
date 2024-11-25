const { Schema } = require("mongoose");

const volumeSchema = new Schema(
  {
    chatId: { type: Number, default: null, unique: true },
    name: {
      type: String,
      required: true,
    },
    selectedValue: {
      type: String,
      default: null,
    },
    grow: { type: Number, default: 300 },
    timeframe: { type: Number, default: 15 },
    informed: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: true,
    },
    newExpireTime: {
      type: Date,
      default: Date.now(), // 24 hours from now
    },
    expireTime: {
      type: Date,
      default: Date.now(), // 24 hours from now
    },
  },
  { versionKey: false, timestamps: false }
);

module.exports = {
  volumeSchema,
};
