const {
  SoftSigner,
  KeyStoreUtils,
  CryptoUtils,
} = require("conseiljs-softsigner");
const { TezosMessageUtils } = require("conseiljs");

/**
 * Given a hex. message, hash the message and
 * verify if the signature matches against the pubkey for the above hash
 *
 * @param {string} signature - Ed25519 signature
 * @param {string} message - Hex message signed
 * @param {string} publicKey - Ed25519 pubkey
 */
async function verifySignature(signature, message, publicKey) {
  const messageBytes = TezosMessageUtils.simpleHash(hex2buf(message), 32);
  const sig = TezosMessageUtils.writeSignatureWithHint(signature, "edsig");
  const pk = TezosMessageUtils.writeKeyWithHint(publicKey, "edpk");
  return CryptoUtils.checkSignature(sig, messageBytes, pk);
}

/**
 * Sign a message using the secretKey
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

  const isHex = isHexString(message);
  if (isHex) {
    const messageSig = await signer.signOperation(hex2buf(message));
    return TezosMessageUtils.readSignatureWithHint(messageSig, "edsig");
  }

  return signer.signText(message);
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
  for (let i = 0; i < hex.length; i += 2) {
    arr.push(parseInt(hex.slice(i, i + 2), 16));
  }
  return new Uint8Array(arr);
};

/**
 * Validate a public key
 *
 * There is no inbuilt pub key validation
 * Therfore,
 * - Try converting pubkey to address
 * - On err, return false
 * @param {string} pubKey
 */
function validatePublicKey(pubKey) {
  try {
    const publicKeyBuf = TezosMessageUtils.writeKeyWithHint(pubKey, "edpk");
    TezosMessageUtils.computeKeyHash(publicKeyBuf);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  verifySignature,
  sign,
  createBlake2bhash,
  getAccountInfo,
  hex2buf,
  validatePublicKey,
};
