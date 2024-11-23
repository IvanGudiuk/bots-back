const { model } = require("mongoose");
const { subscribeSchema } = require("../schemas/subscribeSchema");

const Subscribe = model("subscribes", subscribeSchema);

module.exports = {
  Subscribe,
};
