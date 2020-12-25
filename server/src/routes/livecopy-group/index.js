const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/livecopy-group");

const {
  requestGroup,
  createGroup,
  getGroupAddress,
  listAllGroups,
  addSignerToGroup,
  listWhitelistedAddresses,
} = controllers;

router.post("/group/request", requestGroup);
router.post("/group", createGroup);
router.get("/group/:groupId", getGroupAddress);
router.post("/group/signer", addSignerToGroup);
router.get("/group/:groupId/whitelisted-addresses", listWhitelistedAddresses);

router.get("/groups", listAllGroups);

module.exports = router;
