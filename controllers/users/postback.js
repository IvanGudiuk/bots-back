const jwt = require("jsonwebtoken");
const { User } = require("../../models/pumpModel.js");
const { Customer } = require("../../models/openInterestModel.js");
const { Account } = require("../../models/orderbookModel.js");
const { Volume } = require("../../models/volumesModel.js");
const { Subscribe } = require("../../models/subscribeModel.js");
require("dotenv").config();

const { SECRETKEY } = process.env;

const postback = async (req, res) => {
  const { token } = req.body;
  const { id } = jwt.verify(token, SECRETKEY);
  console.log("token", token);
  console.log("id", id, typeof id);
  if (id) {
    const subscriber = await Subscribe.findOne({ paymentId: id });
    console.log("subscriber", subscriber);
    if (subscriber && Number(subscriber?.monthes) > 0) {
      const newExpireTime = new Date(
        Date.now() + Number(subscriber.monthes) * 30 * 24 * 60 * 60 * 1000
      );
      // console.log("expireTime", expireTime);

      if (subscriber.pump) {
        await User.findOneAndUpdate(
          { chatId: subscriber.chatId },
          { newExpireTime }
        );
      }

      if (subscriber.openinterest) {
        const customer = await Customer.findOneAndUpdate(
          { chatId: subscriber.chatId },
          { newExpireTime },
          { new: true }
        );

        console.log("customer", customer);
      }

      if (subscriber.orderbook) {
        await Account.findOneAndUpdate(
          { chatId: subscriber.chatId },
          { newExpireTime }
        );
      }

      if (subscriber.volumes) {
        await Volume.findOneAndUpdate(
          { chatId: subscriber.chatId },
          { newExpireTime }
        );
      }

      await Subscribe.findByIdAndUpdate(
        { _id: subscriber._id },
        {
          paymentId: "",
          pump: false,
          openinterest: false,
          orderbook: false,
          volumes: false,
        }
      );
    }
  }
  res.status(200).json({ message: "received" });
};

module.exports = { postback };
