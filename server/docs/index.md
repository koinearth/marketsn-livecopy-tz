# LiveCopy Server APIs

LiveCopy Server APIs

# Public APIs

- `GET` Fetch group address
- `GET` List all groups
- `GET` Fetch whitelisted signers of a group
- `GET` Fetch live copy NFT/cert details

# Private APIs

- `POST` Request group creation
- `POST` Create group
- `PUT` Add signers to group
- `DELETE` Delete signers from a group
- `POST` Create a LiveCopy NFT

## Indices

- [LiveCopy - Group related APIs](#livecopy---group-related-apis)

  - [Request group creation](#0-request-group-creation)
  - [Create Group](#1-create-group)
  - [Add Signer to Group](#2-add-signer-to-group)
  - [Delete Signer from Group](#3-delete-signer-from-group)
  - [Get Group Addr](#4-get-group-addr)
  - [List all Groups of LiveCopy](#5-list-all-groups-of-livecopy)
  - [View whitelisted accounts if a group](#6-view-whitelisted-accounts-if-a-group)

- [LiveCopy - NFT](#livecopy---nft)

  - [Issue NFT/Cert](#1-issue-nftcert)
  - [Get Cert](#2-get-cert)

- [LiveCopy Transaction Status](#livecopy---transaction-status)

  - [Check status of LiveCopy transaction](#1-transaction-status)

---

## LiveCopy - Group related APIs

APIs related to group creation, add/remove signers to the group

### 0. Request group creation

Submit a request for group creation to `livecopyadmin`

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://127.0.0.1/livecopyadmin/group/request
```

**_Body:_**

```js
{
    "GroupId": "lackadaisical-degree-twist-ewgt5",
    "Policy": 2,
    "AdminPublicKey": "edpkvQdiGuxYTsVj1AP39BeAtwNgZoReM57YZFLhH6TVrdZA2kaddK"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Create Group - 200 OK

**_Body:_**

```js
{
    "GroupId": "lackadaisical-degree-twist-ewgt5",
    "Policy": 2,
    "AdminPublicKey": "edpkvQdiGuxYTsVj1AP39BeAtwNgZoReM57YZFLhH6TVrdZA2kaddK"
}
```

##### I. Example Response: Create Group - 200 OK

```js
{
    "status": "success",
    "code": "200",
    "message": "Successfully submitted the request for group creation",
    "data": ""
}
```

**_Status Code:_** 200

<br>

##### II. Example Request: Create Group - 400 Bad Request

**_Body:_**

```js
{
    "Policy": 2,
    "AdminPublicKey": "edpkvQdiGuxYTsVj1AP39BeAtwNgZoReM57YZFLhH6TVrdZA2kaddK"
}
```

##### II. Example Response: Create Group - 400 Bad Request

```js
{
    "status": "error",
    "code": 400,
    "message": "Missing parameter GroupId"
}
```

**_Status Code:_** 400

<br>

### 1. Create Group

Creates a Group using the `LiveCopyAdmin` public key

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://127.0.0.1/livecopyadmin/group
```

**_Body:_**

```js
{
    "GroupId": "lackadaisical-degree-twist-ewgt5",
    "Policy": 2,
    "AdminPublicKey": "edpkvQdiGuxYTsVj1AP39BeAtwNgZoReM57YZFLhH6TVrdZA2kaddK",
    "LivecopyAdminSignature": "edsigu4u1bDwyxw7SvCXRLNhR2getKrqrHCg5uyod6JkCbUMnkdnDRHajQhVHKbSKE2h2Y8VXBnd8hBCQdHBjwi832NrwwKL6Sg",
    "Timestamp": 1546475
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Create Group - 200 OK

**_Body:_**

```js
{
    "GroupId": "lackadaisical-degree-twist-ewgt5",
    "Policy": 2,
    "AdminPublicKey": "edpkvQdiGuxYTsVj1AP39BeAtwNgZoReM57YZFLhH6TVrdZA2kaddK",
    "LivecopyAdminSignature": "edsigu4u1bDwyxw7SvCXRLNhR2getKrqrHCg5uyod6JkCbUMnkdnDRHajQhVHKbSKE2h2Y8VXBnd8hBCQdHBjwi832NrwwKL6Sg",
    "Timestamp": 1546475
}
```

##### I. Example Response: Create Group - 200 OK

```js
{
    "status": "success",
    "code": "200",
    "message": "Successfully submitted the transaction",
    "data": {
        "transactionHash": "oo2wgxHKESVJSdxYPQArgE9EK2crtpj47BYj3RoNBrGsxc1Rpfm"
    }
}
```

**_Status Code:_** 200

<br>

##### II. Example Request: Create Group - 400 Bad Request

**_Body:_**

```js
{
    "Policy": 2,
    "AdminPublicKey": "edpkvQdiGuxYTsVj1AP39BeAtwNgZoReM57YZFLhH6TVrdZA2kaddK",
    "LivecopyAdminSignature": "edsigu4u1bDwyxw7SvCXRLNhR2getKrqrHCg5uyod6JkCbUMnkdnDRHajQhVHKbSKE2h2Y8VXBnd8hBCQdHBjwi832NrwwKL6Sg",
    "Timestamp": 1546475
}
```

##### II. Example Response: Create Group - 400 Bad Request

```js
{
    "status": "error",
    "code": 400,
    "message": "Missing parameter GroupId"
}
```

**_Status Code:_** 400

<br>

### 2. Add Signer to Group

`GroupAdmin` adds a signer to the group oracle

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://127.0.0.1/livecopyadmin/group/signer
```

**_Body:_**

```js
{
    "GroupId": "mychannel",
    "SignerAccount": "edpkvQdiGuxYTsVj1AP39BeAtwNgZoReM57YZFLhH6TVrdZA2kaddK",
    "SignerName": "DEOW1",
    "AdminSignature": "edsigu4u1bDwyxw7SvCXRLNhR2getKrqrHCg5uyod6JkCbUMnkdnDRHajQhVHKbSKE2h2Y8VXBnd8hBCQdHBjwi832NrwwKL6Sg",
    "AdminPublicKey": "edpkvQdiGuxYTsVj1AP39BeAtwNgZoReM57YZFLhH6TVrdZA2kaddK",
    "Timestamp": 126565
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Add Signer to Group - 200 OK

**_Body:_**

```js
{
    "GroupId": "mychannel",
    "SignerAccount": "edpkvQdiGuxYTsVj1AP39BeAtwNgZoReM57YZFLhH6TVrdZA2kaddK",
    "SignerName": "DEOW1",
    "AdminSignature": "edsigu4u1bDwyxw7SvCXRLNhR2getKrqrHCg5uyod6JkCbUMnkdnDRHajQhVHKbSKE2h2Y8VXBnd8hBCQdHBjwi832NrwwKL6Sg",
    "AdminPublicKey": "edpkvQdiGuxYTsVj1AP39BeAtwNgZoReM57YZFLhH6TVrdZA2kaddK",
    "Timestamp": 126565
}
```

##### I. Example Response: Add Signer to Group - 200 OK

```js
{
    "status": "success",
    "code": "200",
    "message": "Successfully submitted the transaction",
    "data": {
        "transactionHash": "oo2wgxHKESVJSdxYPQArgE9EK2crtpj47BYj3RoNBrGsxc1Rpfm"
    }
}
```

**_Status Code:_** 200

<br>

### 3. Delete Signer from Group

`GroupAdmin` removes a signer from the group oracle

SHOULD THIS BE DELETE OR PUT

**_Endpoint:_**

```bash
Method: DELETE
Type: RAW
URL: http://127.0.0.1/livecopyadmin/group/signer
```

**_Body:_**

```js
{
    "GroupId": "mychannel",
    "SignerAccount": "edpkvQdiGuxYTsVj1AP39BeAtwNgZoReM57YZFLhH6TVrdZA2kaddK",
    "SignerName": "DEOW1",
    "AdminSignature": "edsigu4u1bDwyxw7SvCXRLNhR2getKrqrHCg5uyod6JkCbUMnkdnDRHajQhVHKbSKE2h2Y8VXBnd8hBCQdHBjwi832NrwwKL6Sg",
    "AdminPublicKey": "edpkvQdiGuxYTsVj1AP39BeAtwNgZoReM57YZFLhH6TVrdZA2kaddK",
    "Timestamp": 126565
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Delete Signer from Group - 200 OK

**_Body:_**

```js
{
    "GroupId": "mychannel",
    "SignerAccount": "edpkvQdiGuxYTsVj1AP39BeAtwNgZoReM57YZFLhH6TVrdZA2kaddK",
    "SignerName": "DEOW1",
    "AdminSignature": "edsigu4u1bDwyxw7SvCXRLNhR2getKrqrHCg5uyod6JkCbUMnkdnDRHajQhVHKbSKE2h2Y8VXBnd8hBCQdHBjwi832NrwwKL6Sg",
    "AdminPublicKey": "edpkvQdiGuxYTsVj1AP39BeAtwNgZoReM57YZFLhH6TVrdZA2kaddK",
    "Timestamp": 126565
}
```

##### I. Example Response: Delete Signer from Group - 200 OK

```js
{
    "status": "success",
    "code": "200",
    "message": "Successfully submitted the transaction",
    "data": {
        "transactionHash": "oo2wgxHKESVJSdxYPQArgE9EK2crtpj47BYj3RoNBrGsxc1Rpfm"
    }
}
```

**_Status Code:_** 200

<br>

### 4. Get Group Addr

Get a group oracle address for a `GroupId`

**_Endpoint:_**

```bash
Method: GET
Type:
URL: http://127.0.0.1/livecopyadmin/group/:GroupId
```

**_URL variables:_**

| Key     | Value | Description |
| ------- | ----- | ----------- |
| GroupId |       |             |

**_More example Requests/Responses:_**

##### I. Example Request: Get Group Address - 200 OK

**_Query:_**

| Key     | Value | Description |
| ------- | ----- | ----------- |
| GroupId |       |             |

##### I. Example Response: Get Group Address - 200 OK

```js
{
    "status": "success",
    "code": 200,
    "message": "Successfully queried smart contract",
    "data": "<Addr.>"
}
```

**_Status Code:_** 200

<br>

### 5. List all Groups of LiveCopy

List all groups created from the `group factory`

**_Endpoint:_**

```bash
Method: GET
Type:
URL: http://127.0.0.1/livecopyadmin/groups
```

**_More example Requests/Responses:_**

##### I. Example Request: List all Groups of LiveCopy - 200 OK

##### I. Example Response: List all Groups of LiveCopy - 200 OK

```js
{
    "status": "success",
    "code": 200,
    "message": "Successfully queried smart contract",
    "data": {
        "groups": [{
            "id": "dummyGroupId",
            "address": "KT123..."
        }]
    }
}
```

**_Status Code:_** 200

<br>

### 6. View whitelisted accounts if a group

Fetch all signer accounts of a `GroupId`

**_Endpoint:_**

```bash
Method: GET
Type:
URL: http://127.0.0.1/livecopyadmin/group/:GroupId/whitelisted-addresses
```

**_URL variables:_**

| Key     | Value | Description |
| ------- | ----- | ----------- |
| GroupId |       |             |

**_More example Requests/Responses:_**

##### I. Example Request: View whitelisted accounts if a group - 200 OK

**_Query:_**

| Key     | Value | Description |
| ------- | ----- | ----------- |
| GroupId |       |             |

##### I. Example Response: View whitelisted accounts if a group - 200 OK

```js
{
    "status": "success",
    "code": 200,
    "message": "Successfully queried smart contract",
    "data": [
        "<signer-addr-1>",
        "<signer-addr-2>"
    ]
}
```

**_Status Code:_** 200

<br>

## LiveCopy - NFT

### 1. Issue NFT/Cert

Create a LiveCopy NFT with the necessary autorization from signers

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://127.0.0.1/livecopycert/
```

**_Body:_**

```js
{
    "GroupId": "multichain-test",
    "TokenOwner": "DESU1",
    "TokenId": "INV002",
    "Hash": "0x3b533dfcc9944a2d3b8b641bc6c8cd04365cac556d476fe2e8854ea521120de6",
    "SignerPublicKey": "edpkvQdiGuxYTsVj1AP39BeAtwNgZoReM57YZFLhH6TVrdZA2kaddK",
    "Signature": "edsigtcgitRmGtKMWmLKtLmXAumXskWyaRiLcnccNwAWb7DrWwjfp2TDJdrfLDozfCtkfX8Bd9CvUePi8rUD6aCU1qGemRAYpPm",
    "State": "CREATED",
    "AssetType": "INVOICE",
    "URL": "https://drive.google.com/file/d/1-2T0T_Zz4V3U7snIv8aml0ZaTc3ldH39/view?usp=sharing"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Issue NFT/Cert - 200 OK

**_Body:_**

```js
{
    "GroupId": "multichain-test",
    "TokenOwner": "DESU1",
    "TokenId": "INV002",
    "Hash": "0x3b533dfcc9944a2d3b8b641bc6c8cd04365cac556d476fe2e8854ea521120de6",
    "SignerPublicKey": "edpkvQdiGuxYTsVj1AP39BeAtwNgZoReM57YZFLhH6TVrdZA2kaddK",
    "Signature": "edsigtcgitRmGtKMWmLKtLmXAumXskWyaRiLcnccNwAWb7DrWwjfp2TDJdrfLDozfCtkfX8Bd9CvUePi8rUD6aCU1qGemRAYpPm",
    "State": "CREATED",
    "AssetType": "INVOICE",
    "URL": "https://drive.google.com/file/d/1-2T0T_Zz4V3U7snIv8aml0ZaTc3ldH39/view?usp=sharing"
}
```

##### I. Example Response: Issue NFT/Cert - 200 OK

```js
{
    "status": "success",
    "code": "200",
    "message": "Successfully submitted the transaction",
    "data": {
        "transactionHash": "oo2wgxHKESVJSdxYPQArgE9EK2crtpj47BYj3RoNBrGsxc1Rpfm"
    }
}
```

**_Status Code:_** 200

<br>

### 2. Get Cert

View details of an LiveCopy NFT issued on Blockchain

**_Endpoint:_**

```bash
Method: GET
Type:
URL: http://127.0.0.1/livecopycert/
```

**_Query params:_**

| Key     | Value  | Description |
| ------- | ------ | ----------- |
| TokenId | INV002 |             |

**_More example Requests/Responses:_**

##### I. Example Request: Get Cert - 200 OK

**_Query:_**

| Key     | Value  | Description |
| ------- | ------ | ----------- |
| TokenId | INV002 |             |

##### I. Example Response: Get Cert - 200 OK

```js
{
    "status": "success",
    "code": "200",
    "message": "Successfully queried the smart contract",
    "data": {
        "ownerOrgId": "a0580b3ef10fb19aed20",
        "ownerAddr": "tz1ZjRw4kN84oVvHZ31mTiTvCNR1JCXzKPbK",
        "oracleContract": "KT1EuiwmKRnBQhWBPgb7c42K9vpSeQbMYGzD",
        "groupId": "a0580b3ef10fb19aed20",
        "assetType": "invoice",
        "state": "CREATED",
        "hash": "0x3b533dfcc9944a2d3b8b641bc6c8cd04365cac556d476fe2e8854ea521120de6",
        "url": "http://marketsn.com/asset/IOC",
        "issueDateTime": "2020-12-23T12:54:23.000Z",
        "signerPublicKeys": [
            "edpkvVm7sz3JKF3jctTFnRr4U36MMsHvGyUSRmu1TcbaiN5joh9KUW"
        ],
        "signatures": [
            "edsigtu1CUAyXBatKYrJD9tcPBjMVmkZ3YYjfKZ7QuYunEF68yqVf9L9eM1KvwzSSh2r1JsLPUNuwJbkjc1VfKfL3XTMZSk4kd3"
        ]
    }
}
```

**_Status Code:_** 200

<br>

## LiveCopy - Transaction Status

APIs related to group creation, add/remove signers to the group

### 1. Transaction status

Get status of a livecopy transaction. Possible states: - `success` - `failed` - `pending`

**_Endpoint:_**

```bash
Method: GET
Type:
URL: http://127.0.0.1/status/
```

**_Query params:_**

| Key             | Value                                               | Description |
| --------------- | --------------------------------------------------- | ----------- |
| transactionHash | ooyE9q88Un1e7KNQiZfqH2hL9uqkc7sdq525pdwvFuLFEH5i8oh |             |

**_More example Requests/Responses:_**

##### I. Example Response: Get transaction status - 200 OK

```js
{
    "status": "success",
    "code": "200",
    "message": "Successfully queried the transaction status",
    "data": {
        "status": "pending"
    }
}
```

**_Status Code:_** 200

<br>

---

[Back to top](#livecopy-server-apis)
