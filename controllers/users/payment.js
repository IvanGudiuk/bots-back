const { User } = require("../../models/pumpModel.js");
const { Customer } = require("../../models/openInterestModel.js");
const { Account } = require("../../models/orderbookModel.js");
const { Volume } = require("../../models/volumesModel.js");
const axios = require("axios");
const getPlanAmount = require("../../helpers");
require("dotenv").config();

const { APIKEY, SHOPID, BASEURL } = process.env;

const payment = async (req, res) => {
  const { userId, monthes, bots, sum } = req.body;

  const headers = {
    Authorization: `Token ${APIKEY}`,
    "Content-Type": "application/json",
  };

  const body = {
    sum,
    shop_id: SHOPID,
    currency: "USD",
  };

  try {
    const response = await axios.post(BASEURL, body, { headers });

    // Assuming `response.data` contains the result
    const { status, result } = response.data;

    if (status === "success") {
      const uuid = result.uuid.startsWith("INV-")
        ? result.uuid.substring(4)
        : result.uuid;
      if (bots.includes("pump")) {
        await User.findByIdAndUpdate(
          { _id: userId },
          { paymentId: uuid, monthes }
        );
        if (bots.includes("openInterest")) {
          await Customer.findByIdAndUpdate(
            { _id: userId },
            { paymentId: uuid, monthes }
          );
          if (bots.includes("orderbook")) {
            await Account.findByIdAndUpdate(
              { _id: userId },
              { paymentId: uuid, monthes }
            );
            if (bots.includes("volumes")) {
              await Volume.findByIdAndUpdate(
                { _id: userId },
                { paymentId: uuid, monthes }
              );
        res.status(200).json({ link: result.link });
      }
    } else {
      // Handle unexpected status
      res
        .status(400)
        .json({ message: "Payment failed", error: result.message });
    }
  } catch (error) {
    // Handle Axios error
    res
      .status(500)
      .json({ message: "Payment request failed", error: error.message });
  }
};

module.exports = { payment };
