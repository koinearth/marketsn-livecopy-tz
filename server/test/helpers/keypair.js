const { CryptoUtils, KeyStoreUtils } = require("conseiljs-softsigner");
const { TezosMessageUtils } = require("conseiljs");
const bip39 = require("bip39");

async function generateKeyPair() {
  // Generates 24 words mnemonic
  // Optionally, specify the strength to reduce the no of words
  const mnemonic = KeyStoreUtils.generateMnemonic();
  const seedBuf = await bip39.mnemonicToSeed(mnemonic, "");
  const seed = seedBuf.slice(0, 32);
  const keypair = await CryptoUtils.generateKeys(seed);

  // Gives a tz1 address
  const publicKeyHash = TezosMessageUtils.computeKeyHash(keypair.publicKey);
  const secretKey = TezosMessageUtils.readKeyWithHint(
    keypair.secretKey,
    "edsk"
  );
  const publicKey = TezosMessageUtils.readKeyWithHint(
    keypair.publicKey,
    "edpk"
  );

  return {
    secretKey,
    publicKey,
    address: publicKeyHash,
  };
}

module.exports = { generateKeyPair };
