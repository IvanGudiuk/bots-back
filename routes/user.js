const express = require("express");
const multer = require("multer");
const ctrl = require("../controllers/users");
const ctrlWrapper = require("../ctrlWrapper.js");
const validateBody = require("../middlewares/validatebody");
const { newPaymentSchema } = require("../schemas/accountSchema");

const router = express.Router();

const upload = multer();

router.get("/:id", ctrlWrapper(ctrl.check));

router.post(
  "/payment",
  upload.none(),
  validateBody(newPaymentSchema),
  ctrlWrapper(ctrl.payment)
);

router.post("/postback", ctrlWrapper(ctrl.postback));

module.exports = router;
