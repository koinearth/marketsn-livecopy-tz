const { SoftSigner, KeyStoreUtils } = require("conseiljs-softsigner");
const { TezosMessageUtils } = require("conseiljs");
const { InMemorySigner } = require("@taquito/signer");

/**
 * Given a string message, hash the message and
 * verify if the signature matches against the pubkey for the above hash
 *
 * @param {string} signature - Ed25519 signature
 * @param {string} message - String message signed
 * @param {string} publicKey - Ed25519 pubkey
 */
async function verifySignature(signature, message, publicKey) {
  return KeyStoreUtils.checkTextSignature(signature, message, publicKey, false);
}

/**
 * Sign a string message using the secretKey
 *
 * @param {string} message - Message to be signed
 * @param {string} secretKey - Secret Key to be used for signing
 */
async function sign(message, secretKey) {
  const signeer = new InMemorySigner(secretKey);
  const sig = await signeer.sign(message);
  return sig.prefixSig;
}

/**
 * Creates a blakeb-256 bit hash(Tezos hash function by default)
 *
 * @param {string} message - Message to be hashed
 */
function createBlake2bhash(message) {
  const isHex = isHexString(message);
  if (isHex) {
    return TezosMessageUtils.simpleHash(
      Buffer.from(message, "hex"),
      32
    ).toString("hex");
  }

  return TezosMessageUtils.simpleHash(
    Buffer.from(message, "utf8"),
    32
  ).toString("hex");
}

/**
 * Get account info of a given secret key
 * @param {string} secretKey
 */
async function getAccountInfo(secretKey) {
  const res = await KeyStoreUtils.restoreIdentityFromSecretKey(secretKey);

  return {
    secretKey,
    publicKey: res.publicKey,
    address: res.publicKeyHash,
  };
}

function isHexString(message) {
  const hexRegex = new RegExp(/^[0-9a-fA-F]+$/);

  if (message.startsWith("0x")) {
    message = message.split("0x")[1];
  }

  return hexRegex.test(message);
}

const hex2buf = (hex) => {
  if (hex.startsWith("0x")) {
    hex = hex.split("0x")[1];
  }
  const arr = [];
  for (let i = 0; i < hex.length; i++) {
    arr.push(parseInt(hex[i], 16));
  }
  return new Uint8Array(arr);
};

module.exports = {
  verifySignature,
  sign,
  createBlake2bhash,
  getAccountInfo,
};
