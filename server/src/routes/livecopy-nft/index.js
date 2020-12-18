const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/livecopy-nft");

const { issueCert } = controllers;

router.post("/", issueCert);

module.exports = router;
