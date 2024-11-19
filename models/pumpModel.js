const { model } = require("mongoose");
const { testSchema } = require("../schemas/pumpSchema.js");

const User = model("users", testSchema);

module.exports = {
  User,
};
