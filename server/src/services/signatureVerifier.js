const { TezosMessageUtils } = require("conseiljs");
const { verifySignature, createBlake2bhash } = require("../utils");

async function verifyGroupCreationSignature(
  groupId,
  groupAdminPublicKey,
  minSignaturesReqd,
  timestamp,
  livecopyAdminPublicKey,
  livecopyAdminSignature
) {
  try {
    const groupAdminPubKeyBytes = TezosMessageUtils.writePublicKey(
      groupAdminPublicKey
    );
    const message = TezosMessageUtils.writePackedData(
      `{
          "prim": "Pair",
          "args": [
            { "prim": "Pair", "args": [ { "bytes": "${groupAdminPubKeyBytes}" }, { "string": "${groupId}" } ] },
            { "prim": "Pair", "args": [ { "int": "${minSignaturesReqd}" }, { "int": "${timestamp}" } ] }
          ]
      }`,
      ``
    );

    const verified = await verifySignature(
      livecopyAdminSignature,
      createBlake2bhash(message),
      livecopyAdminPublicKey
    );
    return verified;
  } catch (error) {
    return false;
  }
}

async function verifyWhitelistAddressUpdationSignature(
  signerAddress,
  signerPublicKey,
  signerAlias,
  timestamp,
  groupAdminPublicKey,
  groupAdminSignature
) {
  try {
    const addressBytes = TezosMessageUtils.writeAddress(signerAddress);
    const pubKeyBytes = TezosMessageUtils.writePublicKey(signerPublicKey);
    const message = TezosMessageUtils.writePackedData(
      `{
        "prim": "Pair",
        "args": [
          { "prim": "Pair", "args": [ { "bytes": "${addressBytes}" }, { "string": "${signerAlias}" } ] },
          { "prim": "Pair", "args": [ { "bytes": "${pubKeyBytes}" }, { "int": "${timestamp}" } ] }
        ]
    }`,
      ``
    );
    const verified = await verifySignature(
      groupAdminSignature,
      createBlake2bhash(message),
      groupAdminPublicKey
    );
    return verified;
  } catch (error) {
    return false;
  }
}

async function verifyTokenIssuanceSignature(
  documentHash,
  signerPublicKey,
  signature
) {
  try {
    const verified = await verifySignature(
      signature,
      documentHash,
      signerPublicKey
    );
    return verified;
  } catch (error) {
    return false;
  }
}

module.exports = {
  verifyGroupCreationSignature,
  verifyWhitelistAddressUpdationSignature,
  verifyTokenIssuanceSignature,
};
