const express = require("express");
const ctrl = require("../controllers/users");
const ctrlWrapper = require("../ctrlWrapper.js");

const router = express.Router();

router.get("/:id", ctrlWrapper(ctrl.check));

module.exports = router;
