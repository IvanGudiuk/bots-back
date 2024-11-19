const { model } = require("mongoose");
const { customerSchema } = require("../schemas/openInterestSchema");

const Customer = model("customers", customerSchema);

module.exports = {
  Customer,
};
