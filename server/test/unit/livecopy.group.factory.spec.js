const { expect } = require("chai");
const { initialize } = require("../../src/server");
const { generateKeyPair } = require("../helpers/keypair");
const sinon = require("sinon");

describe("Livecopy Group Factory", () => {
  let livecopyGroupFactory;

  before(async () => {
    const res = await initialize();
    livecopyGroupFactory = res.livecopyGroupFactory;
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should create group instance", async () => {
    const {
      address: adminAddress,
      publicKey: adminPublicKey,
    } = await generateKeyPair();

    // Stub the actual contract invocation
    // Instead matching the parameters should be sufficient
    const invokeContractStub = sinon.stub(
      livecopyGroupFactory.relayer,
      "sendContractInvocation"
    );
    await livecopyGroupFactory.createGroup("dummyGroupId", adminPublicKey, 2);
    const entrypointData = {
      entrypoint: "create",
      value: {
        prim: "Pair",
        args: [
          { string: adminAddress },
          { prim: "Pair", args: [{ string: "dummyGroupId" }, { int: "2" }] },
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
    const groupInstanceAddress = await livecopyGroupFactory.getGroupAddress(
      "dummyGroupId"
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
