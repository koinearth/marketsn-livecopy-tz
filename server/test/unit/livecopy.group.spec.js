const { expect } = require("chai");
const { initialize } = require("../../src/server");
const { generateKeyPair } = require("../helpers/keypair");
const sinon = require("sinon");
const { sign, createBlake2bhash } = require("../../src/utils");
const {
  packDataForWhitelistAddressUpdation,
} = require("../helpers/packDataHelper");

describe("Livecopy Group", () => {
  let livecopyGroup, adminSecretKey;

  before(async () => {
    const res = await initialize();
    const livecopyGroupFactory = res.livecopyGroupFactory;
    const livecopyGroupInstanceRes = await livecopyGroupFactory.getGroupInstance(
      "dummyGroupId"
    );
    if (livecopyGroupInstanceRes.error) throw livecopyGroupInstanceRes.error;

    livecopyGroup = livecopyGroupInstanceRes.livecopyGroup;
    adminSecretKey =
      "edskRqFp3Z9AqoKrMNFb9bnWNwEsRzbjqjBhzmFMLF9UqB6VBmw7F8ppTiXaAnHtysmi6xFxoHf6rMUz6Y1ipiDz2EgwZQv3pa";
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should get whitelisted addresses", async () => {
    const whitelistedAddresses = await livecopyGroup.getWhitelistedAddresses();
    expect(whitelistedAddresses).to.be.an("array");
  });

  it("should set admin address", async () => {
    const {
      address: newAdmin,
      publicKey: newAdminPublicKey,
      secretKey: newAdminSecretKey,
    } = await generateKeyPair();

    const invokeContractStub = sinon.stub(
      livecopyGroup.relayer,
      "sendContractInvocation"
    );
    await livecopyGroup.setAdmin(newAdmin, newAdminPublicKey);
    const entrypointData = {
      entrypoint: "setAdmin",
      value: {
        args: [{ string: newAdmin }, { string: newAdminPublicKey }],
        prim: "Pair",
      },
    };
    sinon.assert.calledWith(
      invokeContractStub,
      sinon.match({ parameter: entrypointData })
    );
  });

  it("should add signer address", async () => {
    const {
      publicKey: signerPublicKey,
      address: signerAddress,
    } = await generateKeyPair();
    const signerAlias = "alice";
    const timestamp = 0;

    // Create admin signature
    const message = packDataForWhitelistAddressUpdation(
      signerAddress,
      signerPublicKey,
      signerAlias,
      timestamp
    );
    const adminSignature = await sign(
      "0x" + createBlake2bhash(message, true),
      adminSecretKey
    );

    const invokeContractStub = sinon.stub(
      livecopyGroup.relayer,
      "sendContractInvocation"
    );
    await livecopyGroup.addWhitelistedAddress(
      signerPublicKey,
      signerAlias,
      adminSignature,
      timestamp
    );
    const entrypointData = {
      entrypoint: "insertWhitelistedAddress",
      value: {
        prim: "Pair",
        args: [
          {
            prim: "Pair",
            args: [{ string: signerAlias }, { string: timestamp.toString() }],
          },
          {
            prim: "Pair",
            args: [
              { string: signerAddress },
              {
                prim: "Pair",
                args: [
                  {
                    string: adminSignature,
                  },
                  {
                    string: signerPublicKey,
                  },
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
