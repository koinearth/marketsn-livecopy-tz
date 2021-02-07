import { InMemorySigner } from "@taquito/signer";
import { TezosToolkit } from "@taquito/taquito";

const { originateOracleFactory } = require("./originateOralceFactory");
const { originateNFT } = require("./originateNFT");
const conf = require("../conf/conf").default;
const fs = require("fs");
const path = require("path");

const Tezos = new TezosToolkit(conf.rpc);

Tezos.setSignerProvider(new InMemorySigner(conf.adminSecretKey));

// Update the conf.js with oracle factory addr
function updateConfWithOracleFactoryAddress(factoryAddress) {
  conf.OracleFactoryAddress = factoryAddress;
  writeConfig(conf);
}

function updateConfWithNftAddress(nftAddress) {
  conf.NFTAddress = nftAddress;
  writeConfig(conf);
}

function writeConfig(data) {
  const filePath = path.join(__dirname, "..", "conf", "conf.js");
  const fileData = `
  // Update only the rpc, adminAddress, adminPublicKey, adminSecretKey
  // NFTAddress, OracleFactoryAddress are taken care by deploy script
  export default ${JSON.stringify(conf, null, 2)}
  `;
  fs.writeFileSync(filePath, fileData);
}

// Update oracle factory with the NFT address
async function updateFactory(factoryAddress, nftAddress) {
  const contractProvider = Tezos.contract;
  const groupFactoryContract = await contractProvider.at(factoryAddress);
  const { operationResults } = await groupFactoryContract.methods[
    "setNFTAddres"
  ](nftAddress).send();
}

async function deploy() {
  const factoryAddress = await originateOracleFactory();
  if (!factoryAddress) return;
  updateConfWithOracleFactoryAddress(factoryAddress);

  const nftAddress = await originateNFT();
  if (!nftAddress) return;
  updateConfWithNftAddress(nftAddress);

  console.log("Updating factory contract with the NFT address ...");
  await updateFactory(factoryAddress, nftAddress);

  console.log("Contracts deployed successfully!!!");
  console.log(`NFTAddress: ${nftAddress}`);
  console.log(`FactoryAddress: ${factoryAddress}`);
}

deploy();
