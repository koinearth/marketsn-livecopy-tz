const { expect } = require("chai");
const { initialize } = require("../../src/server");
const { generateKeyPair } = require("../helpers/keypair");
const sinon = require("sinon");
const { sign } = require("../../src/utils");

describe("Livecopy Group", () => {
  let livecopyGroup, newAdmin, newAdminPublicKey, newAdminSecretKey;

  before(async () => {
    const res = await initialize();
    const livecopyGroupFactory = res.livecopyGroupFactory;
    const livecopyGroupInstanceRes = await livecopyGroupFactory.getGroupInstance(
      "dummyGroupId"
    );
    if (livecopyGroupInstanceRes.error) throw livecopyGroupInstanceRes.error;

    livecopyGroup = livecopyGroupInstanceRes.livecopyGroup;
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should get whitelisted addresses", async () => {
    const whitelistedAddresses = await livecopyGroup.getWhitelistedAddresses();
    expect(whitelistedAddresses).to.be.an("array");
  });

  it("should set admin address", async () => {
    const { address, publicKey, secretKey } = await generateKeyPair();
    newAdmin = address;
    newAdminPublicKey = publicKey;
    newAdminSecretKey = secretKey;

    const invokeContractStub = sinon.stub(
      livecopyGroup.relayer,
      "sendContractInvocation"
    );
    await livecopyGroup.setAdmin(newAdmin);
    const entrypointData = {
      entrypoint: "setAdmin",
      value: { string: newAdmin },
    };
    sinon.assert.calledWith(
      invokeContractStub,
      sinon.match({ parameter: entrypointData })
    );
  });

  it("should add signer address", async () => {
    const { publicKey: signerPublicKey } = await generateKeyPair();
    const signerAlias = "signerAlias";

    // TODO: This needs to be fixed in smart contract
    const signature = await sign("I am the signer", newAdminSecretKey);
    const invokeContractStub = sinon.stub(
      livecopyGroup.relayer,
      "sendContractInvocation"
    );
    await livecopyGroup.addWhitelistedAddress(
      signerPublicKey,
      signerAlias,
      newAdminPublicKey,
      signature
    );
    const entrypointData = {
      entrypoint: "insertWhitelistedAddress",
      value: {
        prim: "Pair",
        args: [
          {
            prim: "Pair",
            args: [{ string: newAdmin }, { string: signerAlias }],
          },
          {
            prim: "Pair",
            args: [
              {
                string: signerPublicKey,
              },
              {
                prim: "Pair",
                args: [
                  {
                    string: signature,
                  },
                  { string: newAdmin },
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
});
