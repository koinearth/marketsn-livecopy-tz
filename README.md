# marketsn-livecopy-tz

## Background
Marketsn aims to reduce the supply chain delays, lack of operational visibility through the use of Blockchain. Each of the provenance documents involved throughout the lifecycle are represented as NFTs.

This repo holds the codebase for tracking the ownership of livecopy NFTs and thereby establish a full history of the supplychain lifecycle.

[Livecopy NFT Tracking](https://dev.marketsn.com/tracking) provides a simplistic UI to present the tracking data(NFT history) in a visually appealing manner. However, the same can be verified by any third party with a tokenID of the NFT independently, through the tezos smart contracts.

## Features
Though LiveCopy is part of the MarketsN solution, it is an independent solution that enables minting and transferring Business NFTs on Tezos. LiveCopy have some unique enhancements over standard FA2 Contract 

- NFTs can be minted, updated, or transferred LiveCopy stores the history of business NFT throughout its lifecycle. 
- Right to mint NFT is decentralized. NFTs cannot be minted unilaterally by anyone. Minting, Updating & Transfering requires proof from multiple whitelisted accounts in the business network.


## Terminology

`Oracle` -  Each business network in the supplychain is represented as a separate entity named Oracle. For e.g., this may typically consists of buyers. sellers, manufacturers and shippers.

`Oracle Factory` - Facilitates the creation of such oracles by parties with required access controls.

`NFT Contract` - Holds the metadata for the supplychain tracking, ownership and the total no of livecopy NFTs being tracked currently.

Since the NFTs are core of the tracking, it is necessary to secure the creation and transfer of NFTs using multi-party authorizations. For this, each group oracle is configured with all the parties involved in the supplychain network. Only after reaching a minimum threshold no. of authorizations, creation of a new NFT or transfer of existing livecopy NFT is carried out via group oracle smart contract.

## 1. Contracts

- Oracle
- Oracle Factory
- NFT Address (FA2)

Contract Codes can be found [here](https://github.com/koinearth/marketsn-livecopy-tz/tree/main/Contracts)

In order to deploy, you can run `Yarn`

```sh
  node --require @babel/register ./originateScripts/index.js
```

## 2. API Server

### Pre requisites

The repo can be setup locally either by manually installing the necessary dependencies or via docker. It is recommended to use `docker` as that simplifies the effort.

However, if one chooses to manually setup the livecopy server, the following are necessary, before proceeding further:

- [NodeJS v10+](https://nodejs.org/en/download/package-manager/)
- [MongoDB](https://docs.mongodb.com/manual/installation/)

### Instructions

- Cloning the repo and installing dependencies

```sh
    # Clone the repo
    git clone https://github.com/koinearth/marketsn-livecopy-tz

    # Install server-side dependencies
    cd marketsn-livecopy-tz/server
    npm install
```

- Bootstrapping server using `NPM` script

  Setup the `.env file` from the example file provided

```sh
    npm start
```

- Bootstrapping server using `docker`

  Setup the `.env file`, next run:

```sh
    # Build
    docker-compose build

    # Start command
    docker-compose up -d

    # Stop command
    docker-compose down
```

Integration tests can be run using:

```sh
  npm run test:integration
```

### Details about the code in brief
- The API Server has a [relayer module](./server/src/services/relayer) which handles the batching of tz account transactions, handling the gas/storage limits per batch, prepare/sign and injecting the batch operations, as well as determining the confirmations of the broadcasted transactions.
- [Livecopy group module](./server/src/services/livecopy-group) handles the creation of group, fetching the existing groups, updating the whitelisted signers and a process to craft NFTs per group oracle. Group creation can only be done via livecopy admin. However, a request for the creation of the group can be placed and then the livecopy admin is notified via SMTP mail server. The env vars `SUPPORT_EMAIL_ID`, `ADMIN_EMAILS` are related to this.

More info on how to configure smtp can be found [here](https://support.google.com/mail/answer/7126229?hl=en)
- [Livecopy NFTs](./server/src/services/livecopy-nft) handles the code corresponding to the tracking of NFTs

## API Documentation

- [API Specs](server/docs/index.md)

## License

The MarketsN Tezos LiveCopy is available under the [GPL-3.0 License](https://github.com/koinearth/marketsn-livecopy-tz/blob/main/LICENSE) License. Check out the license file for more information.

## Disclaimer
This software is at Beta stage. It is currently experimental and still under development. Many features are not fully tested/implemented yet. This version uses Tezos Delphinet (!)
