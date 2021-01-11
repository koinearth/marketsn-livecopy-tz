# marketsn-livecopy-tz

## 1. Contracts

- Oracle
- Oracle Factory
- NFT Address (FA2)

Contract Codes can be found [here](https://github.com/vinnyson/koinearth-smartcontract/tree/main/Contracts)

In order to deploy, you can run `Yarn`

- node --require @babel/register .\originateScripts\originateOracle.js
- node --require @babel/register .\originateScripts\originateOralceFactory.js
- node --require @babel/register .\originateScripts\originateNFT.js

## 2. API Server

### Instructions

- Installing dependencies

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

### API Documentation

- [API Specs](server/docs/index.md)
