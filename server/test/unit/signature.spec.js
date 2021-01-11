const { expect } = require("chai");
const faker = require("faker");

const { createBlake2bhash, sign, verifySignature } = require("../../src/utils");
const { generateKeyPair } = require("../helpers/keypair");

describe("signature", () => {
  let secretKey, publicKey, address;

  before(async () => {
    const res = await generateKeyPair();
    secretKey = res.secretKey;
    publicKey = res.publicKey;
    address = res.address;
  });

  it("should generate signature", async () => {
    const messageToSign = faker.random.hexaDecimal(32);
    const signature = await sign(messageToSign, secretKey);
    expect(signature).to.be.not.null;
  });

  it("should create blake2b-256 hash", () => {
    const messageToSign = "KoineArth Marketsn Sample Message";
    const hash = createBlake2bhash(messageToSign);
    expect(hash).to.be.not.null;
    expect(hash).to.be.equals(
      "a15c5eff4da56c49a8d5a0bd5421c8b83d87a680dbaf86927efb38967429f014"
    );
  });

  it("should verify signature", async () => {
    const messageToSign = "0x2c18eEfeCaecd45b67281d526737E0AE";
    const signature =
      "edsigtsDgag7xEUfQC4tuPhJMZkZ6JndgXzzh7CJJ6yCvj276z2ZzxhgELmcTvCMhgxdaYhBRdH2MQbCCpUaztaM96HatFkANE9";
    const publicKey = "edpkurmAsQcGc8XL9FurfVskXoNFb7W5XCnAfSEtosbLa6mCXua2ib";

    const isVerified = await verifySignature(
      signature,
      messageToSign,
      publicKey
    );
    expect(isVerified).to.be.true;
  });
});
