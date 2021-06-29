const { sign, createBlake2bhash } = require("./utils");
const {
  packDataForGroupCreation,
  packDataForWhitelistAddressUpdation,
  packString,
} = require("../test/helpers/packDataHelper");
const signMsg = async function () {
  const timestamp = Date.now();
  const groupId = "myfirstgroup1";
  const groupAdminPublicKey =
    "edpktwYWtV5tG77tbSJjxVGxhmPXYwKXc11wwDn8fsXdsnh9y5F4q2";
  const minSignaturesReqd = "2";
  const livecopyAdminSecretKey =
      "edskRr8dPoqwy3qaRzPH1qYqpXf23oEsmQ93sPNzdAo1ZjUqSmFDz8j8PiZuHyiUKxaeTCoBEmagB2HDYXT1nUFDPwyJXTrGHq";
    livecopyAdminPublicKey =
      "edpktzrjdb1tx6dQecQGZL6CwhujWg1D2CXfXWBriqtJSA6kvqMwA2";
  const signerAddress = "tz1UXVyJtN9sTGVc6uKssF4WeA2V3pwRuKRj";
  const signerPublicKey =
    "edpktmnkzfi3NDT1fEhBabQgSEuCismHEtgEh3P6c8t7awVvXN1rX1";
  const signerAlias = "supplier1";
  const message = packDataForGroupCreation(
    groupId,
    groupAdminPublicKey,
    minSignaturesReqd,
    timestamp
  );
  //console.log(signerAddress);
  // console.log(signerPublicKey);
  // console.log(minSignaturesReqd);
  // console.log(timestamp);
  // console.log(message);
  const message2 = packDataForWhitelistAddressUpdation(
    signerAddress,
    signerPublicKey,
    signerAlias,
    timestamp
  );
  const livecopyAdminSignature = await sign(
    createBlake2bhash(message),
    livecopyAdminSecretKey
  );
  console.log(createBlake2bhash(message2));
  console.log(timestamp);
  console.log(livecopyAdminSignature);
};
signMsg();