const express = require("express");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();
const { login, register } = require("../controllers/auth");
router.post("/register", register);
router.post("/login", login);

module.exports = router;
