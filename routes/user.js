const express = require("express");
const ctrl = require("../controllers/users");
const ctrlWrapper = require("../ctrlWrapper.js");
const validateBody = require("../middlewares/validatebody");
const { newPaymentSchema } = require("../schemas/accountSchema");

const router = express.Router();

router.get("/:id", ctrlWrapper(ctrl.check));

router.post(
  "/payment",
  validateBody(newPaymentSchema),
  ctrlWrapper(ctrl.payment)
);

router.post("/postback", ctrlWrapper(ctrl.postback));

module.exports = router;
