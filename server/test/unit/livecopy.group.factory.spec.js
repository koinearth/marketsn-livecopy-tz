const { expect } = require("chai");
const sinon = require("sinon");
const faker = require("faker");

const { initialize } = require("../../src/server");
const { generateKeyPair } = require("../helpers/keypair");
const { packDataForGroupCreation } = require("../helpers/packDataHelper");
const { sign, createBlake2bhash } = require("../../src/utils");

describe("Livecopy Group Factory", () => {
  let livecopyGroupFactory;
  const livecopyAdminSecretKey =
      "edskRqFp3Z9AqoKrMNFb9bnWNwEsRzbjqjBhzmFMLF9UqB6VBmw7F8ppTiXaAnHtysmi6xFxoHf6rMUz6Y1ipiDz2EgwZQv3pa",
    livecopyAdminPublicKey =
      "edpktzrjdb1tx6dQecQGZL6CwhujWg1D2CXfXWBriqtJSA6kvqMwA2";

  before(async () => {
    const res = await initialize();
    livecopyGroupFactory = res.livecopyGroupFactory;
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should create group instance", async () => {
    const {
      address: groupAdminAddress,
      publicKey: groupAdminPublicKey,
    } = await generateKeyPair();

    const minSignaturesReqd = 2;
    const timestamp = Date.now();
    const groupId = faker.company.companyName();

    // Create admin signature
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

    // Stub the actual contract invocation
    // Instead matching the parameters should be sufficient
    const invokeContractStub = sinon.stub(
      livecopyGroupFactory.relayer,
      "sendContractInvocation"
    );
    await livecopyGroupFactory.createGroup(
      groupId,
      groupAdminPublicKey,
      minSignaturesReqd,
      timestamp,
      livecopyAdminSignature
    );
    const entrypointData = {
      entrypoint: "create",
      value: {
        prim: "Pair",
        args: [
          {
            prim: "Pair",
            args: [
              {
                string: livecopyAdminSignature,
              },
              {
                prim: "Pair",
                args: [
                  { string: timestamp.toString() },
                  { string: groupAdminAddress },
                ],
              },
            ],
          },
          {
            prim: "Pair",
            args: [
              {
                string: groupAdminPublicKey,
              },
              {
                prim: "Pair",
                args: [
                  { string: groupId },
                  { int: minSignaturesReqd.toString() },
                ],
              },
            ],
          },
        ],
      },
    };
    sinon.assert.calledWith(
      invokeContractStub,
      sinon.match({ parameter: entrypointData })
    );
  });

  it("should list all groups", async () => {
    const groupInstanceAddresses = await livecopyGroupFactory.listAllGroups();
    expect(groupInstanceAddresses).to.be.an("array");
  });

  it("should get a group instance address", async () => {
    const groupId = "dummyGroupId";
    const groupInstanceAddress = await livecopyGroupFactory.getGroupAddress(
      groupId
    );
    expect(groupInstanceAddress).to.be.a("string");
  });

  it("should set nft address", async () => {
    const dummyNftAddress = "KT1UHsH1mgTK8SaQG4a5GBPv4rM3VHEpdYJs";
    const invokeContractStub = sinon.stub(
      livecopyGroupFactory.relayer,
      "sendContractInvocation"
    );
    await livecopyGroupFactory.setNftAddress(dummyNftAddress);
    const entrypointData = {
      entrypoint: "setNFTAddres",
      value: { string: dummyNftAddress },
    };
    sinon.assert.calledWith(
      invokeContractStub,
      sinon.match({ parameter: entrypointData })
    );
  });
});
