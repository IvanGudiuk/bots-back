const { User } = require("../../models/pumpModel.js");
const { Customer } = require("../../models/openInterestModel.js");
const { Account } = require("../../models/orderbookModel.js");
const { Volume } = require("../../models/volumesModel.js");
const axios = require("axios");
require("dotenv").config();

const { APIKEY, SHOPID, BASEURL } = process.env;

const payment = async (req, res) => {
  const { userId, monthes, bots, sum } = req.body;
  // console.log("request body:", userId, monthes, bots, sum);
  const headers = {
    Authorization: `Token ${APIKEY}`,
    "Content-Type": "application/json",
  };

  const body = {
    amount: sum,
    shop_id: SHOPID,
    currency: "USD",
  };

  const response = await axios.post(BASEURL, body, { headers });
  // Assuming `response.data` contains the result
  const { status, result } = response.data;

  if (status === "success") {
    const uuid = result.uuid.startsWith("INV-")
      ? result.uuid.substring(4)
      : result.uuid;
    if (bots.includes("pump")) {
      await User.updateOne(
        { chatId: Number(userId) }, // Filter
        { $set: { paymentId: uuid, monthes: Number(monthes) } } // Update
      );
    }
    if (bots.includes("openinterest")) {
      console.log("bots", bots);
      console.log("userId", userId);
      await Customer.findOneAndUpdate(
        { chatId: Number(userId) },
        { paymentId: uuid, monthes: Number(monthes) }
      );
    }
    if (bots.includes("orderbook")) {
      await Account.findOneAndUpdate(
        { chatId: Number(userId) },
        { paymentId: uuid, monthes: Number(monthes) }
      );
    }
    if (bots.includes("volumes")) {
      await Volume.findOneAndUpdate(
        { chatId: Number(userId) },
        { paymentId: uuid, monthes: Number(monthes) }
      );
    }
    res.status(200).json({ link: result.link });
  } else {
    // Handle unexpected status
    res.status(400).json({ message: "Payment failed", error: result.message });
  }
};

module.exports = { payment };
