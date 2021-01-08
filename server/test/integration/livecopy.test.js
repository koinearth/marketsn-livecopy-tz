const supertest = require("supertest");
const { expect } = require("chai");
const faker = require("faker");

const { createExpressApp } = require("../../src/server");
const mongo = require("../../src/db");
const { sign, createBlake2bhash } = require("../../src/utils");
const { generateKeyPair } = require("../helpers/keypair");
const {
  packDataForGroupCreation,
  packDataForWhitelistAddressUpdation,
  packString,
} = require("../helpers/packDataHelper");
const {
  assertBadRequestErrorMessage,
} = require("../helpers/responseAssertions");

let testSuite;

describe("Livecopy integration test", () => {
  const livecopyAdminSecretKey =
      "edskRqFp3Z9AqoKrMNFb9bnWNwEsRzbjqjBhzmFMLF9UqB6VBmw7F8ppTiXaAnHtysmi6xFxoHf6rMUz6Y1ipiDz2EgwZQv3pa",
    livecopyAdminPublicKey =
      "edpktzrjdb1tx6dQecQGZL6CwhujWg1D2CXfXWBriqtJSA6kvqMwA2",
    groupId = faker.company.companyName(),
    minSignaturesReqd = 1,
    tokenId = faker.random.number();

  let mongoConnection;
  let groupAdminAddress, groupAdminPublicKey, groupAdminSecretKey;
  let signerAddress,
    signerPublicKey,
    signerSecretKey,
    signerAlias = faker.name.firstName();
  let tokenRecepientAddress,
    tokenRecepientPublicKey,
    tokenRecepientSecretKey,
    tokenRecepientAlias = faker.name.firstName();
  let groupInstanceAddress;

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

  /**
   * -----------------------------------------------------------------
   * -----------------------------------------------------------------
   *                  REQUEST GROUP CREATION TEST CASES
   * -----------------------------------------------------------------
   */
  describe("request group creation test cases", function () {
    let groupCreationRequest;

    before(() => {
      groupCreationRequest = {
        GroupId: groupId,
        Policy: minSignaturesReqd,
        AdminPublicKey: groupAdminPublicKey,
      };
    });

    it("should request group creation with status 200", async function () {
      const res = await testSuite
        .post("/livecopyadmin/group/request")
        .send(groupCreationRequest)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res).to.have.property("body");
      expect(res.body).to.have.property("code", 200);
      expect(res.body).to.have.property("status", "success");
    });

    it("should throw error if min signatures is less than 1", async function () {
      let requestWithInvalidPolicy = Object.assign({}, groupCreationRequest);
      requestWithInvalidPolicy.Policy = 0;

      const res = await testSuite
        .post("/livecopyadmin/group/request")
        .send(requestWithInvalidPolicy)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400);

      assertBadRequestErrorMessage(
        res,
        "minimum signatures should be atleast 1"
      );
    });

    it("should throw error on invalid publickey", async function () {
      let requestWithInvalidPubKey = Object.assign({}, groupCreationRequest);
      requestWithInvalidPubKey.AdminPublicKey = faker.random.hexaDecimal(32);

      const res = await testSuite
        .post("/livecopyadmin/group/request")
        .send(requestWithInvalidPubKey)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400);

      assertBadRequestErrorMessage(res, "Invalid admin public key");
    });
  });

  /**
   * -----------------------------------------------------------------
   * -----------------------------------------------------------------
   *                    GROUP CREATION TEST CASES
   * -----------------------------------------------------------------
   */
  describe("group creation with livecopy admin signature", function () {
    let adminGroupCreationRequest;

    before(async () => {
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

      adminGroupCreationRequest = {
        GroupId: groupId,
        Policy: minSignaturesReqd,
        AdminPublicKey: groupAdminPublicKey,
        Timestamp: timestamp,
        LivecopyAdminSignature: livecopyAdminSignature,
      };
    });

    it("should create group with status 200", async function () {
      const res = await testSuite
        .post("/livecopyadmin/group")
        .send(adminGroupCreationRequest)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res).to.have.property("body");
      expect(res.body).to.have.property("code", 200);
      expect(res.body).to.have.property("status", "success");
      expect(res.body).to.have.property("data");
      expect(res.body.data).to.have.property("transactionHash");
      expect(res.body.data.transactionHash).to.be.a("string");

      await waitForRequestToBeProcessed(
        testSuite,
        res.body.data.transactionHash
      );
    });

    it("should throw error on re-submitting the group creation request", async function () {
      const res = await testSuite
        .post("/livecopyadmin/group")
        .send(adminGroupCreationRequest)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400);

      assertBadRequestErrorMessage(res, "groupId already exists");
    });

    it("should throw error on invalid admin signature", async function () {
      const timestamp = Date.now();
      const groupId = faker.company.companyName();
      const livecopyAdminSignature = faker.random.hexaDecimal(32);

      const requestWithInvalidAdminSignature = {
        GroupId: groupId,
        Policy: minSignaturesReqd,
        AdminPublicKey: groupAdminPublicKey,
        Timestamp: timestamp,
        LivecopyAdminSignature: livecopyAdminSignature,
      };

      const res = await testSuite
        .post("/livecopyadmin/group")
        .send(requestWithInvalidAdminSignature)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400);

      assertBadRequestErrorMessage(res, "Invalid livecopy admin signature");
    });
  });

  /**
   * -----------------------------------------------------------------
   * -----------------------------------------------------------------
   *                    GET GROUP ADDRESS TEST CASES
   * -----------------------------------------------------------------
   */
  describe("fetch group address test cases", function () {
    it("should get group address with status 200", async function () {
      const res = await testSuite
        .get(`/livecopyadmin/group/${groupId}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res).to.have.property("body");
      expect(res.body).to.have.property("code", 200);
      expect(res.body).to.have.property("status", "success");
      expect(res.body).to.have.property("data");
      expect(res.body.data).to.be.a("string");

      groupInstanceAddress = res.body.data;
    });

    it("should throw error on GET group address with invalid groupId", async function () {
      const invalidGroupId = faker.company.companyName();

      const res = await testSuite
        .get(`/livecopyadmin/group/${invalidGroupId}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/);

      expect(res).to.have.property("body");
      expect(res.body).to.have.property("status", "error");
      expect(res.body).to.have.property("code", 422);
      expect(res.body).to.have.property(
        "message",
        "GroupId not found in the smart contract"
      );
    });
  });

  /**
   * -----------------------------------------------------------------
   * -----------------------------------------------------------------
   *                    ADD SIGNER ACCT TEST CASES
   * -----------------------------------------------------------------
   */
  describe("add whitelisted account test cases", function () {
    let whitelistSignerRequest;

    before(async () => {
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

      whitelistSignerRequest = {
        GroupId: groupId,
        SignerAccount: signerPublicKey,
        SignerName: signerAlias,
        AdminSignature: groupAdminSignature,
        AdminPublicKey: groupAdminPublicKey,
        Timestamp: timestamp,
      };
    });

    it("should add signer to the group with status 200", async function () {
      const res = await testSuite
        .post(`/livecopyadmin/group/signer`)
        .send(whitelistSignerRequest)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res).to.have.property("body");
      expect(res.body).to.have.property("code", 200);
      expect(res.body).to.have.property("status", "success");
      expect(res.body).to.have.property("data");
      expect(res.body.data).to.have.property("transactionHash");
      expect(res.body.data.transactionHash).to.be.a("string");

      await waitForRequestToBeProcessed(
        testSuite,
        res.body.data.transactionHash
      );
    });

    it("should throw error on invalid admin signature", async function () {
      const timestamp = Date.now();
      const groupAdminSignature = faker.random.hexaDecimal(32);

      const requestWithInvalidAdminSignature = {
        GroupId: groupId,
        SignerAccount: signerPublicKey,
        SignerName: signerAlias,
        AdminSignature: groupAdminSignature,
        AdminPublicKey: groupAdminPublicKey,
        Timestamp: timestamp,
      };

      const res = await testSuite
        .post(`/livecopyadmin/group/signer`)
        .send(requestWithInvalidAdminSignature)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400);

      assertBadRequestErrorMessage(res, "Invalid group admin signature");
    });
  });

  /**
   * -----------------------------------------------------------------
   * -----------------------------------------------------------------
   *                    FETCH WHITELISTED ACCT TEST CASES
   * -----------------------------------------------------------------
   */
  describe("fetch whitelisted account test cases", function () {
    it("should get whitelisted addresses with status 200", async function () {
      const res = await testSuite
        .get(`/livecopyadmin/group/${groupId}/whitelisted-addresses`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res).to.have.property("body");
      expect(res.body).to.have.property("code", 200);
      expect(res.body).to.have.property("status", "success");
      expect(res.body).to.have.property("data");
      expect(res.body.data).to.be.an("array");
      expect(res.body.data).to.include(signerPublicKey);
    });

    it("should throw error on invalid groupId", async function () {
      const invalidGroupId = faker.company.companyName();

      const res = await testSuite
        .get(`/livecopyadmin/group/${invalidGroupId}/whitelisted-addresses`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400);

      assertBadRequestErrorMessage(res, "GroupId not found");
    });
  });

  /**
   * -----------------------------------------------------------------
   * -----------------------------------------------------------------
   *                    FETCH ALL GROUP INSTANCES TEST CASES
   * -----------------------------------------------------------------
   */
  describe("fetch all group instances test cases", function () {
    it("should get all group instances created from factory with status 200", async function () {
      const res = await testSuite
        .get(`/livecopyadmin/groups`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res).to.have.property("body");
      expect(res.body).to.have.property("code", 200);
      expect(res.body).to.have.property("status", "success");
      expect(res.body).to.have.property("data");
      expect(res.body.data).to.have.property("groups");
      expect(res.body.data.groups).to.be.an("array");
    });
  });

  /**
   * -----------------------------------------------------------------
   * -----------------------------------------------------------------
   *                    WHITELIST TOKEN RECEIVER TEST CASES
   * -----------------------------------------------------------------
   */
  describe("whitelist token receiver", function () {
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
      expect(res.body).to.have.property("code", 200);
      expect(res.body).to.have.property("status", "success");
      expect(res.body).to.have.property("data");
      expect(res.body.data).to.have.property("transactionHash");
      expect(res.body.data.transactionHash).to.be.a("string");

      await waitForRequestToBeProcessed(
        testSuite,
        res.body.data.transactionHash
      );
    });
  });

  /**
   * -----------------------------------------------------------------
   * -----------------------------------------------------------------
   *                    ISSUE NFT TEST CASES
   * -----------------------------------------------------------------
   */
  describe("issue nft", function () {
    let issueTokenRequest;

    const hash =
      "3b533dfcc9944a2d3b8b641bc6c8cd04365cac556d476fe2e8854ea521120de6";
    const assetType = "invoice";
    const assetUrl = "http://marketsn.com/asset/IOC";
    const tokenState = "CREATED";

    before(async () => {
      // Create whitelisted acct. signature
      const signature = await sign(packString(hash), signerSecretKey);

      issueTokenRequest = {
        GroupId: groupId,
        TokenOwner: tokenRecepientAlias,
        TokenId: tokenId,
        Hash: packString(hash),
        SignerPublicKey: signerPublicKey,
        Signature: signature,
        State: tokenState,
        AssetType: assetType,
        URL: assetUrl,
      };
    });

    it("should issue nft to the group with status 200", async function () {
      const res = await testSuite
        .post(`/livecopycert`)
        .send(issueTokenRequest)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res).to.have.property("body");
      expect(res.body).to.have.property("code", 200);
      expect(res.body).to.have.property("status", "success");
      expect(res.body).to.have.property("data");
      expect(res.body.data).to.have.property("transactionHash");
      expect(res.body.data.transactionHash).to.be.a("string");

      await waitForRequestToBeProcessed(
        testSuite,
        res.body.data.transactionHash
      );
    });

    it("should throw error on invalid signature", async function () {
      const tokenId = faker.random.number();
      const signature = faker.random.hexaDecimal(32);

      const requestWithInvalidSignature = {
        GroupId: groupId,
        TokenOwner: tokenRecepientAlias,
        TokenId: tokenId,
        Hash: packString(hash),
        SignerPublicKey: signerPublicKey,
        Signature: signature,
        State: tokenState,
        AssetType: assetType,
        URL: assetUrl,
      };

      const res = await testSuite
        .post(`/livecopycert`)
        .send(requestWithInvalidSignature)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400);

      assertBadRequestErrorMessage(res, "Invalid signature");
    });
  });

  /**
   * -----------------------------------------------------------------
   * -----------------------------------------------------------------
   *                    FETCH NFT DETAILS TEST CASES
   * -----------------------------------------------------------------
   */
  describe("fetch nft details test cases", function () {
    it("should get nft details with status 200", async function () {
      const res = await testSuite
        .get(`/livecopycert/?TokenId=${tokenId}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res).to.have.property("body");
      expect(res.body).to.have.property("data");
      const {
        ownerOrgId,
        ownerAddr,
        oracleContract,
        groupId: groupIdFromApi,
        assetType,
        state,
        hash,
        url,
        issueDateTime,
        signerPublicKeys,
        signatures,
      } = res.body.data;
      expect(ownerOrgId).to.be.equals(groupId);
      expect(ownerAddr).to.be.equals(tokenRecepientAddress);
      expect(oracleContract).to.be.equals(groupInstanceAddress);
      expect(groupIdFromApi).to.be.equals(groupId);
      expect(assetType).to.be.equals("invoice");
      expect(state).to.be.equals("CREATED");
      expect(hash).to.be.a("string");
      expect(url).to.be.a("string");
      expect(signerPublicKeys).to.be.an("array");
      expect(signatures).to.be.an("array");

      const issueDate = new Date(issueDateTime);
      expect(issueDate instanceof Date).to.be.true;
    });
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
