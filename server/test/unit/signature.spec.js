const { expect } = require("chai");

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
    const messageToSign = "KoineArth Marketsn";
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
    const messageToSign = "KoineArth Marketsn";
    const signature =
      "edsigtvDZNLcik89HMe8NMUxLn2ZEvrzcBo5GrtgPtLMGJDq6dUJGpf59YNMVLDeYxQT7ordwZDts46RkFQL4ys8GgGAz8b2WWf";
    const publicKey = "edpkvQdiGuxYTsVj1AP39BeAtwNgZoReM57YZFLhH6TVrdZA2kaddK";

    const isVerified = await verifySignature(
      signature,
      messageToSign,
      publicKey
    );
    expect(isVerified).to.be.true;
  });
});
