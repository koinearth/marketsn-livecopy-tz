const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/status");

const { transactionStatus } = controllers;

router.get("/", transactionStatus);

module.exports = router;
