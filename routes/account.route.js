const express = require("express");
const { fundAccount, transferFund, withdraw } = require("../controllers/account.controller")
const { verifyToken } = require("../util/verify")
const { depositValidation, transferValidation } = require("../validations/account/account.validation")
const router = express.Router();

router.patch("/deposit", [depositValidation, verifyToken], fundAccount);
router.patch("/transfer", [transferValidation, verifyToken], transferFund);
router.patch("/withdraw", [depositValidation, verifyToken], withdraw);

module.exports = router