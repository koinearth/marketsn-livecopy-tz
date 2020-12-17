const { TezosMessageUtils } = require("conseiljs");

function packDataForGroupCreation(
  groupId,
  groupAdminPublicKey,
  minSignaturesReqd,
  timestamp
) {
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

  return message;
}

function packDataForWhitelistAddressUpdation(
  signerAddress,
  signerPublicKey,
  signerAlias,
  timestamp
) {
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
  return message;
}

exports.packDataForGroupCreation = packDataForGroupCreation;
exports.packDataForWhitelistAddressUpdation = packDataForWhitelistAddressUpdation;
