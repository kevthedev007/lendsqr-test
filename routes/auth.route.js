const express = require("express");
const { register, addAccount, login } = require("../controllers/auth.controller")
const { verifyToken } = require("../util/verify")
const { registerValidation, loginValidation } = require("../validations/user/user.validation")
const { accountValidation } = require("../validations/account/account.validation")
const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/add-account", [accountValidation, verifyToken], addAccount);
router.post("/login", loginValidation, login);

module.exports = router