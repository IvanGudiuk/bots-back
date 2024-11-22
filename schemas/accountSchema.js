const { Schema } = require("mongoose");
const Joi = require("joi");

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
    paymentId: { type: String, default: "" },
    monthes: { type: Number, default: 0 },
    expireTime: {
      type: Date,
      default: () => new Date(Date.now() + 72 * 60 * 60 * 1000), // 24 hours from now
    },
  },
  { versionKey: false, timestamps: false }
);

const newPaymentSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.base": "userId must be a string",
    "any.required": "userId is required",
  }),
  monthes: Joi.number().required().messages({
    "number.base": "monthes must be a number",
    "any.required": "monthes is required",
  }),
  sum: Joi.number().required().messages({
    "number.base": "sum must be a number",
    "any.required": "sum is required",
  }),
  bots: Joi.array()
    .items(Joi.string().valid("openinterest", "volume", "trend"))
    .required()
    .messages({
      "array.includes": "Invalid bot name provided",
      "any.required": "bots is required",
    }),
});

module.exports = {
  acountSchema,
  newPaymentSchema,
};
