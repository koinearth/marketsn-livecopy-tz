import smartpy as sp


class LiteOracle(sp.Contract):
    def __init__(self):
        self.init_type(
            sp.TRecord(
                NFTAddress=sp.TAddress,
                adminAddress=sp.TAddress,
                adminPublicKey=sp.TKey,
                groupId=sp.TString,
                whiteListedAddresses=sp.TSet(t=sp.TBytes),
                whitelist_msg_hashed=sp.TSet(t=sp.TBytes),
                signerAddress=sp.TMap(k=sp.TString, v=sp.TAddress),
                signerAddressAlias=sp.TMap(k=sp.TBytes, v=sp.TString),
                tokerOwner=sp.TMap(k=sp.TString, v=sp.TMap(
                    k=sp.TBytes, v=sp.TAddress)),
                tokensIssued=sp.TMap(k=sp.TString, v=sp.TNat),
            )
        )

    # change admin
    @sp.entry_point
    def setAdmin(self, params):
        sp.set_type(params.adminAddress, sp.TAddress)
        sp.set_type(params.admin_pk, sp.TKey)

        adminAddress = params.adminAddress
        admin_pk = params.admin_pk
        sp.verify(sp.sender == self.data.adminAddress)
        self.data.adminAddress = adminAddress
        self.data.adminPublicKey = admin_pk

    @sp.entry_point
    def insertWhitelistedAddress(self, params):
        sp.set_type(params.address, sp.TAddress)
        sp.set_type(params.pubKeyToBeWhitelisted, sp.TKey)
        sp.set_type(params._alias, sp.TString)
        sp.set_type(params._timestamp, sp.TTimestamp)
        sp.set_type(params.adminSignature, sp.TSignature)

        _address = params.address
        _pubKeyToBeWhitelisted = params.pubKeyToBeWhitelisted
        _alias = params._alias
        _timestamp = params._timestamp
        _adminSignature = params.adminSignature

        _hashedPubKey = sp.pack(_pubKeyToBeWhitelisted)

        sp.verify(~self._isWhitelisted(
            _pubKeyToBeWhitelisted), "Already whitelisted")

        _contstructed_message = sp.blake2b(
            sp.pack(
                sp.record(
                    address=_address,
                    pubKeyToBeWhitelisted=_pubKeyToBeWhitelisted,
                    alias=_alias,
                    timestamp=_timestamp
                )
            )
        )

        sp.verify(~self.data.whitelist_msg_hashed.contains(
            _contstructed_message), "signature already exist")
        sp.verify(sp.check_signature(self.data.adminPublicKey, _adminSignature,
                                     _contstructed_message), "verify hash: Invalid signature")
        self.data.signerAddress[_alias] = _address
        self.data.signerAddressAlias[_hashedPubKey] = _alias

        self.data.whiteListedAddresses.add(_hashedPubKey)
        self.data.whitelist_msg_hashed.add(_contstructed_message)

    @sp.entry_point
    def issueCert(self, params):
        sp.set_type(params._tokenSymbol, sp.TString)
        sp.set_type(params._hash, sp.TBytes)
        sp.set_type(params._toAlias, sp.TString)
        sp.set_type(params._publicSignerHash, sp.TAddress)
        sp.set_type(params._signerPublicKey, sp.TKey)
        sp.set_type(params._sigS, sp.TSignature)

        _tokenSymbol = params._tokenSymbol
        _hash = params._hash
        _toAlias = params._toAlias
        _publicSignerHash = params._publicSignerHash
        _signerPublicKey = params._signerPublicKey
        _sigS = params._sigS

        # Check signature
        sp.verify(self._isWhitelisted(_signerPublicKey),
                  "signer not whitelisted")
        sp.verify(sp.check_signature(_signerPublicKey, _sigS, _hash),
                  "verify hash: Invalid Signature")

        # Check to address of alias
        sp.if self.data.signerAddress.contains(_toAlias):
            _to = self.data.signerAddress[_toAlias]
        sp.else:
            sp.failwith("No to address found")

        # Cannot overwrite tokenOwner to an already issued tokenSymbol, hash
        # Append only
        sp.if self.data.tokerOwner.contains(_tokenSymbol) & self.data.tokerOwner[_tokenSymbol].contains(_hash):
            sp.verify(self.data.tokerOwner[_tokenSymbol]
                      [_hash] == _to, "Ambiguity in to address")
        sp.else:
            self.data.tokerOwner[_tokenSymbol] = sp.map({_hash: _to})

        # Decide whether to mint or update
        sp.if self.data.tokensIssued.contains(_tokenSymbol):
            tokenId = self.data.tokensIssued[_tokenSymbol]
            self._updateNFT(_tokenSymbol, tokenId, _hash)
        sp.else:
            self._mintNFT(_tokenSymbol, _hash)

    def _updateNFT(self, _tokenSymbol, _tokenId, _hash):
        c = sp.contract(sp.TRecord(tokenId=sp.TNat,
                                   amount=sp.TNat,
                                   address=sp.TAddress,
                                   _hash=sp.TBytes,
                                   metadata=sp.TMap(sp.TString, sp.TBytes)),
                        address=self.data.NFTAddress, entry_point="update"
                        ).open_some()
        content = sp.record(
            tokenId=_tokenId,
            amount=1,
            address=self.data.tokerOwner[_tokenSymbol][_hash],
            _hash=_hash,
            metadata={"oracle": sp.pack(sp.self_address), "assetId": sp.pack(
                _tokenSymbol), "cid": _hash},
        )
        sp.transfer(content, sp.mutez(0), c)

    def _mintNFT(self, _tokenSymbol, _hash):
        c = sp.contract(sp.TRecord(
            amount=sp.TNat,
            address=sp.TAddress,
            oracleContract=sp.TAddress,
            tokenSymbol=sp.TString,
            _hash=sp.TBytes,
            metadata=sp.TMap(sp.TString, sp.TBytes)),
            address=self.data.NFTAddress, entry_point="mint"
        ).open_some()
        content = sp.record(
            amount=1,
            address=self.data.tokerOwner[_tokenSymbol][_hash],
            oracleContract=sp.self_address,
            tokenSymbol=_tokenSymbol,
            _hash=_hash,
            metadata={"oracle": sp.pack(sp.self_address), "assetId": sp.pack(
                _tokenSymbol), "cid": _hash},
        )
        sp.transfer(content, sp.mutez(0), c)

    @sp.entry_point
    def updateTokenId(self, tokenSymbol, tokenId):
        sp.verify(sp.sender == self.data.NFTAddress,
                  "Only NFTContract can update tokenId")
        self.data.tokensIssued[tokenSymbol] = tokenId

    # Utils
    def _isWhitelisted(self, publicKey):
        sp.set_type(publicKey, sp.TKey)
        return self.data.whiteListedAddresses.contains(sp.pack(publicKey))

    def _onlyAdmin(self, address):
        return address == self.data.adminAddress


class OracleFactory(sp.Contract):
    def __init__(self, NFTAddress, factoryAdmin, factoryAdminPublicKey):
        self.oracle = LiteOracle()
        self.init(OracleList=sp.big_map(tkey=sp.TString, tvalue=sp.TAddress),
                  NFTAddress=NFTAddress,
                  factoryAdmin=factoryAdmin,
                  factoryAdminPublicKey=factoryAdminPublicKey
                  )

    @sp.entry_point
    def setNFTAddres(self, params):
        sp.verify(self.data.factoryAdmin == sp.sender)
        self.data.NFTAddress = params

    @sp.entry_point
    def create(self, params):
        _minSignerRequire = params.minSignerRequire
        _groupId = params.groupId
        _admin_pk = params.admin_pk
        _adminAddress = params.adminAddress
        _timestamp = params._timestamp
        _factoryAdminSignature = params._factoryAdminSignature

        _contstructed_message = sp.blake2b(
            sp.pack(
                sp.record(
                    minSignerRequire=_minSignerRequire,
                    groupId=_groupId,
                    admin_pk=_admin_pk,
                    timestamp=_timestamp
                )
            )
        )
        sp.verify(~self.data.OracleList.contains(_groupId), "group id exist")
        # checkSignature
        sp.verify(sp.check_signature(self.data.factoryAdminPublicKey,
                                     _factoryAdminSignature,
                                     _contstructed_message), "verify hash: Invalid signature")

        c = sp.create_contract(storage=sp.record(NFTAddress=self.data.NFTAddress,
                                                 adminAddress=_adminAddress,
                                                 adminPublicKey=_admin_pk,
                                                 groupId=_groupId,
                                                 whiteListedAddresses=sp.set(),
                                                 signerAddress=sp.map(),
                                                 signerAddressAlias=sp.map(),
                                                 whitelist_msg_hashed=sp.set(),
                                                 tokensIssued=sp.map(),
                                                 tokerOwner=sp.map(),
                                                 ), contract=self.oracle)
        self.data.OracleList[_groupId] = c
        # # call addWhitelistedbySign of NFT address
        dest = sp.contract(sp.TAddress,
                           self.data.NFTAddress,
                           entry_point="addAccountToWhitelist").open_some()
        sp.transfer(c,
                    sp.mutez(0),
                    dest
                    )

    def _getOracleAddress(self, params):
        sp.verify(self.data.OracleList.contains(params), "INVALID_GROUP_ID")


@sp.add_test(name="Create")
def test():
    scenario = sp.test_scenario()
    scenario.h1("Create Contract")
    admin = sp.test_account("Administrator")

    scenario.h1("Accounts")
    scenario.show([admin])

    c1 = OracleFactory(NFTAddress=sp.address("KT1Cc4wMj9tdQfWz7u61SZ8drHRz8BqhX8tU"),
                       factoryAdmin=sp.address(
                           "tz1hdQscorfqMzFqYxnrApuS5i6QSTuoAp3w"),
                       factoryAdminPublicKey=admin.public_key)
    scenario += c1

    _contstructed_message = sp.blake2b(
        sp.pack(
            sp.record(
                minSignerRequire=2,
                groupId="testing123",
                admin_pk=admin.public_key,
                timestamp=sp.timestamp(0)
            )
        )
    )
    _packedData = sp.record(
        minSignerRequire=2,
        groupId="testing123",
        admin_pk=admin.public_key,
        timestamp=sp.timestamp(0)
    )

    scenario.show(_packedData)

    _factoryAdminSignature = sp.make_signature(
        admin.secret_key, _contstructed_message, message_format='Raw')
    scenario += c1.create(sp.record(minSignerRequire=2,
                                    groupId="testing123",
                                    admin_pk=admin.public_key,
                                    adminAddress=admin.address,
                                    _timestamp=sp.timestamp(0),
                                    _factoryAdminSignature=_factoryAdminSignature
                                    )
                          ).run(sender=admin)
