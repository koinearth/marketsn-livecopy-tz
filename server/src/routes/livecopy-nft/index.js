const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/livecopy-nft");

const { issueCert, getCert } = controllers;

router.post("/", issueCert);
router.get("/", getCert);

module.exports = router;
