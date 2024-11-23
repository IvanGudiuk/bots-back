const jwt = require("jsonwebtoken");
const { User } = require("../../models/pumpModel.js");
const { Customer } = require("../../models/openInterestModel.js");
const { Account } = require("../../models/orderbookModel.js");
const { Volume } = require("../../models/volumesModel.js");
require("dotenv").config();

const { SECRETKEY } = process.env;

const postback = async (req, res) => {
  const { token } = req.body;
  const { id } = jwt.verify(token, SECRETKEY);
  console.log("token", token);
  console.log("id", id);
  if (id) {
    const user = await User.findOne({ paymentId: id });
    const customer = await Customer.findOne({ paymentId: id });
    const account = await Account.findOne({ paymentId: id });
    const volume = await Volume.findOne({ paymentId: id });
    if (user && user?.monthes > 0) {
      const expireTime = new Date(
        Date.now() + Number(user.monthes) * 30 * 24 * 60 * 60 * 1000
      );
      await User.findByIdAndUpdate(user._id, {
        expireTime,
        paid: true,
        informed: true,
        selectedValue: "paid",
        paymentId: "",
        monthes: 0,
      });
    }

    if (account && account?.monthes > 0) {
      const expireTime = new Date(
        Date.now() + Number(account.monthes) * 30 * 24 * 60 * 60 * 1000
      );
      console.log("expireTime", expireTime);
      await Account.findByIdAndUpdate(account._id, {
        expireTime,
        paid: true,
        informed: true,
        selectedValue: "paid",
        paymentId: "",
        monthes: 0,
      });
    }

    if (customer && customer?.monthes > 0) {
      console.log("customer", customer);
      console.log("customer.monthes", customer.monthes);
      const expireTime = new Date(
        Date.now() + Number(customer.monthes) * 30 * 24 * 60 * 60 * 1000
      );
      await Customer.findByIdAndUpdate(customer._id, {
        expireTime,
        paid: true,
        informed: true,
        selectedValue: "paid",
        paymentId: "",
        monthes: 0,
      });
    }

    if (volume && volume?.monthes > 0) {
      const expireTime = new Date(
        Date.now() + Number(volume.monthes) * 30 * 24 * 60 * 60 * 1000
      );
      await Volume.findByIdAndUpdate(volume._id, {
        expireTime,
        paid: true,
        informed: true,
        selectedValue: "paid",
        paymentId: "",
        monthes: 0,
      });
    }
  }
  res.status(200).json({ message: "received" });
};

module.exports = { postback };
