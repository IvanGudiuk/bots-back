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
    expireTime: {
      type: Date,
      default: () => new Date(Date.now() + 72 * 60 * 60 * 1000),
    },
  },
  { versionKey: false, timestamps: false }
);

module.exports = {
  volumeSchema,
};
