const { User } = require("../../models/users.js");
const axios = require("axios");
const getPlanAmount = require("../../helpers");
require("dotenv").config();

const { APIKEY, SHOPID, BASEURL } = process.env;

const check = async (req, res) => {
  const { _id } = req.user;
  const { amount, name } = req.body;

  const headers = {
    Authorization: `Token ${APIKEY}`,
    "Content-Type": "application/json",
  };

  const body = {
    amount,
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
      await User.findByIdAndUpdate(_id, { paymentId: uuid, plan: name });
      res.status(200).json({ link: result.link });
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
