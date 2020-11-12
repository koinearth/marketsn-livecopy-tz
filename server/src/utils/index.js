const { SoftSigner, KeyStoreUtils } = require("conseiljs-softsigner");
const { TezosMessageUtils } = require("conseiljs");

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
  const unlockSecretKeyForever = -1;
  // const unlockSecretKeyFor60secs = 60;

  const secretKeyBuf = TezosMessageUtils.writeKeyWithHint(secretKey, "edsk");

  const signer = await SoftSigner.createSigner(
    secretKeyBuf,
    unlockSecretKeyForever
  );
  return signer.signText(message);
}

/**
 * Creates a blakeb-256 bit hash(Tezos hash function by default)
 *
 * @param {string} message - Message to be hashed
 */
function createBlake2bhash(message) {
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

module.exports = {
  verifySignature,
  sign,
  createBlake2bhash,
  getAccountInfo,
};
