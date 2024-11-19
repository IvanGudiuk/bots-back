const { User } = require("../../models/pumpModel.js");
const { Customer } = require("../../models/openInterestModel.js");
const { Account } = require("../../models/orderbookModel.js");
const { Volume } = require("../../models/volumesModel.js");

require("dotenv").config();

const check = async (req, res) => {
  const { id: chatId } = req.params;

  const user = await User.findOne({ chatId });
  const customer = await Customer.findOne({ chatId });
  const account = await Account.findOne({ chatId });
  const volume = await Volume.findOne({ chatId });

  let bots = [];

  if (user) {
    bots.push("pump");
  }
  if (customer) {
    bots.push("openInterest");
  }
  if (account) {
    bots.push("orderbook");
  }
  if (volume) {
    bots.push("volumes");
  }

  res.status(200).json({ bots });
};

module.exports = { check };
