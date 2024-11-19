const { Schema } = require("mongoose");

const acountSchema = new Schema(
  {
    chatId: { type: Number, default: null, unique: true },
    name: {
      type: String,
      required: true,
    },
    volume: { type: Number, default: 1000000 },
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
  acountSchema,
};
