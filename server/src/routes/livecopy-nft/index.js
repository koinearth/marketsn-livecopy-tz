const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/livecopy-nft");

const { issueCert, getCert, updateCert, issueOrUpdateCert } = controllers;

router.post("/", issueOrUpdateCert)
router.post("/mint", issueCert);
router.patch("/update", updateCert);
router.get("/", getCert);

module.exports = router;

