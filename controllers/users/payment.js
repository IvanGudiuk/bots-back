const { User } = require("../../models/pumpModel.js");
const { Customer } = require("../../models/openInterestModel.js");
const { Account } = require("../../models/orderbookModel.js");
const { Volume } = require("../../models/volumesModel.js");
const { Subscribe } = require("../../models/subscribeModel.js");
const RequestError = require("../../helpers/RequestError");
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

  try {
    const response = await axios.post(BASEURL, body, { headers });
    // Assuming `response.data` contains the result
    const { status, result } = response.data;

    if (status === "success") {
      const uuid = result.uuid.startsWith("INV-")
        ? result.uuid.substring(4)
        : result.uuid;
      let updateParams = { paymentId: uuid, monthes: Number(monthes) };
      if (bots.includes("pump")) {
        updateParams.pump = true;
      }
      if (bots.includes("openinterest")) {
        updateParams.openinterest = true;
      }
      if (bots.includes("orderbook")) {
        updateParams.orderbook = true;
      }
      if (bots.includes("volumes")) {
        updateParams.volumes = true;
      }

      const subscribe = await Subscribe.findOneAndUpdate(
        { chatId: userId }, // Search criteria
        { $set: updateParams }, // Update fields
        { upsert: true, new: true } // Create if not found, return the updated document
      );

      console.log("subscribe", subscribe);

      res.status(200).json({ link: result.link });
    } else {
      // Handle unexpected status
      res
        .status(400)
        .json({ message: "Payment failed", error: result.message });
    }
  } catch (error) {
    RequestError(error);
  }
};

module.exports = { payment };
