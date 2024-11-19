const { model } = require("mongoose");
const { volumeSchema } = require("../schemas/volumesSchema");

const Volume = model("volumes", volumeSchema);

module.exports = {
  Volume,
};
