const supertest = require("supertest");
const crypto = require("crypto");
const { expect } = require("chai");

const { createExpressApp } = require("../../src/server");
const mongo = require("../../src/db");
const { sign, createBlake2bhash } = require("../../src/utils");
const { generateKeyPair } = require("../helpers/keypair");
const {
  packDataForGroupCreation,
  packDataForWhitelistAddressUpdation,
} = require("../helpers/packDataHelper");

let testSuite;

describe("Livecopy integration test", () => {
  const livecopyAdminSecretKey =
      "edskRqFp3Z9AqoKrMNFb9bnWNwEsRzbjqjBhzmFMLF9UqB6VBmw7F8ppTiXaAnHtysmi6xFxoHf6rMUz6Y1ipiDz2EgwZQv3pa",
    livecopyAdminPublicKey =
      "edpktzrjdb1tx6dQecQGZL6CwhujWg1D2CXfXWBriqtJSA6kvqMwA2",
    groupId = crypto.randomBytes(10).toString("hex"),
    minSignaturesReqd = 1;

  let mongoConnection;
  let groupAdminAddress, groupAdminPublicKey, groupAdminSecretKey;
  let signerAddress,
    signerPublicKey,
    signerSecretKey,
    signerAlias = crypto.randomBytes(10).toString("hex");

  before(async () => {
    const app = await createExpressApp();
    testSuite = supertest.agent(app);

    // Drop collection - start clean
    mongoConnection = await mongo.connect();
    mongoConnection.models.transactions.collection.drop();

    // Generate group admin keypair
    const groupAdminKp = await generateKeyPair();
    groupAdminPublicKey = groupAdminKp.publicKey;
    groupAdminAddress = groupAdminKp.address;
    groupAdminSecretKey = groupAdminKp.secretKey;

    // Signer keypair
    const signerKp = await generateKeyPair();
    signerAddress = signerKp.address;
    signerPublicKey = signerKp.publicKey;
    signerSecretKey = signerKp.secretKey;
  });

  after(async () => {
    mongoConnection.models.transactions.collection.drop();
    await mongo.close();
  });

  it("should create group with status 200", async function () {
    // Create livecopy admin signature
    const timestamp = Date.now();
    const message = packDataForGroupCreation(
      groupId,
      groupAdminPublicKey,
      minSignaturesReqd,
      timestamp
    );
    const livecopyAdminSignature = await sign(
      "0x" + createBlake2bhash(message, true),
      livecopyAdminSecretKey
    );

    const res = await testSuite
      .post("/livecopyadmin/group")
      .send({
        GroupId: groupId,
        Policy: minSignaturesReqd,
        AdminPublicKey: groupAdminPublicKey,
        Timestamp: timestamp,
        LivecopyAdminSignature: livecopyAdminSignature,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res).to.have.property("body");
    expect(res.body).to.have.property("data");
    expect(res.body.data).to.have.property("transactionHash");
    expect(res.body.data.transactionHash).to.be.a("string");

    await waitForRequestToBeProcessed(testSuite, res.body.data.transactionHash);
  });

  it("should get group address with status 200", async function () {
    const res = await testSuite
      .get(`/livecopyadmin/group/${groupId}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res).to.have.property("body");
    expect(res.body).to.have.property("data");
    expect(res.body.data).to.be.a("string");
  });

  it("should add signer to the group with status 200", async function () {
    // Create group admin signature
    const timestamp = Date.now();
    const message = packDataForWhitelistAddressUpdation(
      signerAddress,
      signerPublicKey,
      signerAlias,
      timestamp
    );
    const groupAdminSignature = await sign(
      "0x" + createBlake2bhash(message, true),
      groupAdminSecretKey
    );

    const res = await testSuite
      .post(`/livecopyadmin/group/signer`)
      .send({
        GroupId: groupId,
        SignerAccount: signerPublicKey,
        SignerName: signerAlias,
        AdminSignature: groupAdminSignature,
        AdminPublicKey: groupAdminPublicKey,
        Timestamp: timestamp,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res).to.have.property("body");
    expect(res.body).to.have.property("data");
    expect(res.body.data).to.have.property("transactionHash");
    expect(res.body.data.transactionHash).to.be.a("string");

    await waitForRequestToBeProcessed(testSuite, res.body.data.transactionHash);
  });

  it("should get whitelisted addresses with status 200", async function () {
    const res = await testSuite
      .get(`/livecopyadmin/group/${groupId}/whitelisted-addresses`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res).to.have.property("body");
    expect(res.body).to.have.property("data");
    expect(res.body.data).to.be.an("array");
  });

  it("should get all group instances created from factory with status 200", async function () {
    const res = await testSuite
      .get(`/livecopyadmin/groups`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res).to.have.property("body");
    expect(res.body).to.have.property("data");
    expect(res.body.data).to.have.property("groups");
    expect(res.body.data.groups).to.be.an("array");
  });
});

/**
 * Helpers
 */

async function waitForRequestToBeProcessed(server, transactionHash) {
  let MAX_RETRIES = 10;
  while (MAX_RETRIES--) {
    try {
      await checkRequestStatus(server, transactionHash);
    } catch (error) {
      await sleep(30000);
    }
  }
}

async function checkRequestStatus(server, transactionHash) {
  const response = await server.get(
    `/status?transactionHash=${transactionHash}`
  );
  if (response.status !== 200) {
    throw new Error("Error occurred while querying for request status");
  }

  if (response.status === 200 && response.body.data.status === "pending") {
    throw new Error("Request not yet processed");
  } else {
    return response.body;
  }
}

async function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}
