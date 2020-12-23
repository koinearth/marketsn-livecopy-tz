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
  packString,
} = require("../helpers/packDataHelper");

let testSuite;

describe("Livecopy integration test", () => {
  const livecopyAdminSecretKey =
      "edskRqFp3Z9AqoKrMNFb9bnWNwEsRzbjqjBhzmFMLF9UqB6VBmw7F8ppTiXaAnHtysmi6xFxoHf6rMUz6Y1ipiDz2EgwZQv3pa",
    livecopyAdminPublicKey =
      "edpktzrjdb1tx6dQecQGZL6CwhujWg1D2CXfXWBriqtJSA6kvqMwA2",
    groupId = crypto.randomBytes(10).toString("hex"),
    minSignaturesReqd = 1,
    // Using timestamp as a non-conflicting number for tokenId
    tokenId = Date.now();

  let mongoConnection;
  let groupAdminAddress, groupAdminPublicKey, groupAdminSecretKey;
  let signerAddress,
    signerPublicKey,
    signerSecretKey,
    signerAlias = crypto.randomBytes(10).toString("hex");
  let tokenRecepientAddress,
    tokenRecepientPublicKey,
    tokenRecepientSecretKey,
    tokenRecepientAlias = crypto.randomBytes(10).toString("hex");

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

    // Token recepient keypair
    const tokenRecepientKp = await generateKeyPair();
    tokenRecepientAddress = tokenRecepientKp.address;
    tokenRecepientPublicKey = tokenRecepientKp.publicKey;
    tokenRecepientSecretKey = tokenRecepientKp.secretKey;
  });

  after(async () => {
    mongoConnection.models.transactions.collection.drop();
    await mongo.close();
  });

  it("should request group creation with status 200", async function () {
    // Request livecopy group creation
    const res = await testSuite
      .post("/livecopyadmin/group/request")
      .send({
        GroupId: groupId,
        Policy: minSignaturesReqd,
        AdminPublicKey: groupAdminPublicKey,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res).to.have.property("body");
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
      createBlake2bhash(message),
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
      createBlake2bhash(message),
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
    expect(res.body.data).to.include(signerPublicKey);
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

  it("should whitelist token receiver in the group with status 200", async function () {
    // Create group admin signature
    const timestamp = Date.now();
    const message = packDataForWhitelistAddressUpdation(
      tokenRecepientAddress,
      tokenRecepientPublicKey,
      tokenRecepientAlias,
      timestamp
    );
    const groupAdminSignature = await sign(
      createBlake2bhash(message),
      groupAdminSecretKey
    );

    const res = await testSuite
      .post(`/livecopyadmin/group/signer`)
      .send({
        GroupId: groupId,
        SignerAccount: tokenRecepientPublicKey,
        SignerName: tokenRecepientAlias,
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

  it("should issue nft to the group with status 200", async function () {
    // Create whitelisted acct. signature
    const hash =
      "3b533dfcc9944a2d3b8b641bc6c8cd04365cac556d476fe2e8854ea521120de6";
    const assetType = "invoice";
    const assetUrl = "http://marketsn.com/asset/IOC";
    const tokenState = "CREATED";
    const signature = await sign(packString(hash), signerSecretKey);

    const res = await testSuite
      .post(`/livecopycert`)
      .send({
        GroupId: groupId,
        TokenOwner: tokenRecepientAlias,
        TokenId: tokenId,
        Hash: packString(hash),
        SignerPublicKey: signerPublicKey,
        Signature: signature,
        State: tokenState,
        AssetType: assetType,
        URL: assetUrl,
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
});

/**
 * Helpers
 */

async function waitForRequestToBeProcessed(server, transactionHash) {
  let MAX_RETRIES = 20;
  while (MAX_RETRIES--) {
    try {
      await checkRequestStatus(server, transactionHash);
    } catch (error) {
      await sleep(10000);
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
