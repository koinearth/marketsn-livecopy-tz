const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/livecopy-nft");

const { issueCert, getCert, updateCert } = controllers;

router.post("/", issueCert);
router.patch("/", updateCert);
router.get("/", getCert);

module.exports = router;
