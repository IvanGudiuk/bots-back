const { model } = require("mongoose");
const { acountSchema } = require("../schemas/accountSchema");

const Account = model("accounts", acountSchema);

module.exports = {
  Account,
};
