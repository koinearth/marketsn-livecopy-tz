import smartpy as sp

class TokenData:
    def data_type():
        return sp.TRecord(
            oracleContract = sp.TAddress,
            groupId = sp.TString,
            to = sp.TAddress,
            toAlias = sp.TString,
            assetType = sp.TString,
            state = sp.TString,
            _hash  = sp.TBytes,
            issueDateTime = sp.TTimestamp,
            url = sp.TString,
            authoritiesAlias = sp.TSet(t = sp.TString),
            authorities = sp.TSet(t = sp.TKey),
            signatures_hashed = sp.TSet(t = sp.TBytes)
            )

class Oracle(sp.Contract):
    def __init__(self, NFTAddress, minSignerRequired, adminAddress, groupId, admin_pk):
        self.init(NFTAddress=NFTAddress,
                  minSignerRequired=minSignerRequired,
                  adminAddress=adminAddress,
                  adminPublicKey = admin_pk,
                  groupId=groupId,
                  whiteListedAddresses=sp.set(t=sp.TKey),
                  signerAddress=sp.map(tkey=sp.TString, tvalue=sp.TAddress),
                  signerAddressAlias=sp.map(tkey=sp.TKey, tvalue=sp.TString),
                  whitelist_msg_hashed = sp.set(t = sp.TBytes),
                  tokenData=sp.map(
                      tkey=sp.TNat,
                      tvalue=sp.TMap(
                          k=sp.TBytes, v= TokenData.data_type()
                      )
                  ),
                  tokenStatus=sp.map(tkey=sp.TNat, tvalue=sp.TMap(k=sp.TBytes, v=sp.TNat)),
                  tokerOwner=sp.map(tkey=sp.TNat, tvalue=sp.TMap(k=sp.TBytes, v=sp.TAddress)),
                  tokenAuthSings=sp.map(tkey=sp.TNat,
                                        tvalue=sp.TMap(
                                            k=sp.TBytes,
                                            v=sp.TMap(k=sp.TKey, v=sp.TBool)
                                        ))
                  )

    #change admin
    @sp.entry_point
    def setAdmin(self, params):
        adminAddress = params.adminAddress
        admin_pk = params.admin_pk
        sp.verify(sp.sender == self.data.adminAddress)
        self.data.adminAddress = adminAddress
        self.data.adminPublicKey = admin_pk

    @sp.entry_point
    def insertWhitelistedAddress(self, params):
        _address = params.address
        _pubKeyToBeWhitelisted = params.pubKeyToBeWhitelisted
        _alias = params.alias
        _timestamp = params._timestamp
        _adminSignature = params.adminSignature
        
        sp.verify(~self._isWhitelisted(_pubKeyToBeWhitelisted), "Already whitelisted")
        
        _contstructed_message = sp.blake2b(
            sp.pack(
                sp.record(
                    address = _address,
                    pubKeyToBeWhitelisted = _pubKeyToBeWhitelisted,
                    alias = _alias,
                    timestamp = _timestamp
                    )
                )
            )
         
        sp.verify(~self.data.whitelist_msg_hashed.contains(_contstructed_message), "signature already exist")
        sp.verify(sp.check_signature(self.data.adminPublicKey, _adminSignature, _contstructed_message),
                  "verify hash: Invalid signature")
        self.data.signerAddress[_alias] = _address
        self.data.signerAddressAlias[_pubKeyToBeWhitelisted] = _alias
        
        self.data.whiteListedAddresses.add(_pubKeyToBeWhitelisted)
        self.data.whitelist_msg_hashed.add(_contstructed_message)

    @sp.entry_point
    def issueCert(self,params):
        _tokenId = params.tokenId
        _hash = params._hash
        _toAlias = params._toAlias
        _assetType = params._assetType
        _state = params._state
        _url = params._url
        _signerPublicKey = params._signerPublicKey
        _publicSignerHash = params._publicSignerHash
        _sigS = params._sigS

        sp.verify(self._isWhitelisted(_publicSignerHash))
        sp.verify(sp.check_signature(_publicSignerHash, _sigS,_hash),"verify hash: Invalid Signature")

        sp.if self.data.signerAddress.contains(_toAlias):
            _to = self.data.signerAddress[_toAlias]
        sp.else:
            sp.failwith("No to address found")

        sp.if self.data.tokerOwner.contains(_tokenId) & self.data.tokerOwner[_tokenId].contains(_hash):
            sp.verify(self.data.tokerOwner[_tokenId][_hash] == _to,"Ambiguity in to address")
        sp.else:
            self.data.tokerOwner[_tokenId] = sp.map({_hash : _to})

        _status = sp.local("_status", 0)

        sp.if self.data.tokenStatus.contains(_tokenId) & self.data.tokenStatus[_tokenId].contains(_hash):
            _status.value = self.data.tokenStatus[_tokenId][_hash]

        sp.if _status.value == 2:
            sp.failwith("Already minted")
        sp.if _status.value == 1:
            sp.if self.data.tokenAuthSings.contains(_tokenId) & self.data.tokenAuthSings[_tokenId].contains(_hash) & self.data.tokenAuthSings[_tokenId][_hash].contains(_publicSignerHash):
                sp.verify(self.data.tokenAuthSings[_tokenId][_hash][_publicSignerHash] == False)
            sp.verify(self.data.tokenData[_tokenId][_hash].state == _state)
            sp.verify(self.data.tokenData[_tokenId][_hash].oracleContract == sp.self_address)
            self.data.tokenData[_tokenId][_hash].authorities.add(_publicSignerHash)
            self.data.tokenData[_tokenId][_hash].authoritiesAlias.add(self.data.signerAddressAlias[_publicSignerHash])
            self.data.tokenAuthSings[_tokenId][_hash][_publicSignerHash] = True

            self.data.tokenData[_tokenId][_hash].signatures_hashed.add(sp.pack(_sigS))

        sp.else:
            sp.if self.data.tokenAuthSings.contains(_tokenId) & self.data.tokenAuthSings[_tokenId].contains(_hash) & self.data.tokenAuthSings[_tokenId][_hash].contains(_publicSignerHash):
                sp.verify(self.data.tokenAuthSings[_tokenId][_hash][_publicSignerHash] == False)
            self.data.tokenData[_tokenId] = sp.map(
                {_hash: sp.record(oracleContract = sp.self_address,
                                  groupId = self.data.groupId, 
                                  to = _to, toAlias = _toAlias,
                                  assetType = _assetType,
                                  state = _state,
                                  _hash = _hash,
                                  issueDateTime = sp.now,
                                  url = _url,
                                  authoritiesAlias = sp.set([
                                      self.data.signerAddressAlias[_publicSignerHash]
                                      ]),
                                  authorities = sp.set([_publicSignerHash]),
                                  signatures_hashed = sp.set([sp.pack(_sigS)]))
                 })
            self.data.tokenAuthSings[_tokenId] = sp.map({_hash : sp.map({_publicSignerHash : True})})
            self.data.tokenStatus[_tokenId] = sp.map({_hash : 1})


        sp.if self.data.tokenData.contains(_tokenId) & self.data.tokenData[_tokenId].contains(_hash):
            sp.if sp.len(self.data.tokenData[_tokenId][_hash].authorities) == self.data.minSignerRequired:
                c = sp.contract(sp.TRecord(symbol = sp.TString,
                                           amount = sp.TNat,
                                           address = sp.TAddress,
                                           token_id = sp.TNat,
                                           oracleContract = sp.TAddress,
                                           groupId = sp.TString,
                                           to = sp.TAddress,
                                           toAlias = sp.TString,
                                           assetType = sp.TString,
                                           state = sp.TString,
                                           _hash = sp.TBytes,
                                           issueDateTime = sp.TTimestamp,
                                           url = sp.TString,
                                           authoritiesAlias = sp.TSet(t = sp.TString),
                                           authorities = sp.TSet(t = sp.TKey),
                                           signatures_hashed = sp.TSet(t = sp.TBytes)),
                                           address = self.data.NFTAddress,entry_point = "mint"
                                ).open_some()
                content = sp.record(
                    symbol = "NFT",
                    amount = 1,
                    address = self.data.tokerOwner[_tokenId][_hash],
                    token_id = _tokenId,
                    oracleContract = self.data.tokenData[_tokenId][_hash].oracleContract,
                    groupId = self.data.tokenData[_tokenId][_hash].groupId,
                    to = self.data.tokenData[_tokenId][_hash].to,
                    toAlias = self.data.tokenData[_tokenId][_hash].toAlias, 
                    assetType = self.data.tokenData[_tokenId][_hash].assetType, 
                    state = self.data.tokenData[_tokenId][_hash].state,
                    _hash  = self.data.tokenData[_tokenId][_hash]._hash, 
                    issueDateTime = self.data.tokenData[_tokenId][_hash].issueDateTime,
                    url = self.data.tokenData[_tokenId][_hash].url, 
                    authoritiesAlias= self.data.tokenData[_tokenId][_hash].authoritiesAlias,
                    authorities = self.data.tokenData[_tokenId][_hash].authorities,
                    signatures_hashed = self.data.tokenData[_tokenId][_hash].signatures_hashed
                    )
                sp.transfer(content,sp.mutez(0),c)
                self.data.tokenStatus[_tokenId][_hash] = 2
                del self.data.tokenData[_tokenId][_hash]
                
    # Utils
    def _isWhitelisted(self, publicKey):
        return self.data.whiteListedAddresses.contains(publicKey)

    def _onlyAdmin(self, address):
        return address == self.data.adminAddress


@sp.add_test(name="Create")
def test():
    scenario = sp.test_scenario()
    scenario.h1("Create Oracle")

    admin = sp.test_account("Administrator")
    alice = sp.test_account("Alice")
    bob = sp.test_account("Robert")

    scenario.h1("Accounts")
    scenario.show([admin, alice, bob])

    sampleNftAddress = sp.address("KT1Q4jEteeKTsU2itpXithzD3evidxnUxi5C")

    c1 = Oracle(
        NFTAddress=sampleNftAddress,
        minSignerRequired=2,
        adminAddress=admin.address,
        groupId="testing123", 
        admin_pk = sp.key("edpktzrjdb1tx6dQecQGZL6CwhujWg1D2CXfXWBriqtJSA6kvqMwA2")
        )
    scenario += c1
    scenario.p("Change Admin")
    scenario += c1.setAdmin(sp.record(adminAddress= admin.address, admin_pk =sp.key("edpktzrjdb1tx6dQecQGZL6CwhujWg1D2CXfXWBriqtJSA6kvqMwA2"))).run(sender = admin)
    scenario.p("insert into whitelist")
    
    message_to_sign = sp.blake2b(sp.pack(sp.record(address = alice.address, pubKeyToBeWhitelisted = sp.key("edpkuvNy6TuQ2z8o9wnoaTtTXkzQk7nhegCHfxBc4ecsd4qG71KYNG"),alias = "alice" ,timestamp = sp.timestamp(0))))
    testsig = sp.make_signature(admin.secret_key, message_to_sign, message_format='Raw')
    	
    scenario += c1.insertWhitelistedAddress(
        address = alice.address,
        pubKeyToBeWhitelisted=sp.key("edpkuvNy6TuQ2z8o9wnoaTtTXkzQk7nhegCHfxBc4ecsd4qG71KYNG"),
        adminSignature=testsig,
        alias="alice",
        _timestamp = sp.timestamp(0)
    ).run(sender=admin)
    message_to_sign = sp.blake2b(sp.pack(sp.record(address = admin.address, pubKeyToBeWhitelisted = sp.key("edpktzrjdb1tx6dQecQGZL6CwhujWg1D2CXfXWBriqtJSA6kvqMwA2"),alias = "admin" ,timestamp = sp.timestamp(0))))
    testsig = sp.make_signature(admin.secret_key, message_to_sign, message_format='Raw')
    scenario += c1.insertWhitelistedAddress(
        address = admin.address, 
        pubKeyToBeWhitelisted=sp.key("edpktzrjdb1tx6dQecQGZL6CwhujWg1D2CXfXWBriqtJSA6kvqMwA2"),
        adminSignature=testsig,
        alias="admin",
        _timestamp = sp.timestamp(0)
    ).run(sender=admin)
    scenario.p("issuing cert")
    message_for_issue_cert = sp.pack("I am the signer")
    issueCert_sig = sp.make_signature(admin.secret_key,message_for_issue_cert , message_format='Raw')
    scenario += c1.issueCert(
        tokenId = 2,
        _hash=sp.pack("I am the signer"),
        _toAlias = "alice",
        _signerPublicKey=admin.address,
        _publicSignerHash=sp.key("edpktzrjdb1tx6dQecQGZL6CwhujWg1D2CXfXWBriqtJSA6kvqMwA2"),
        _sigS=issueCert_sig,
        _assetType = "card",
        _state = "new",
        _url = "https://mco.com"
        ).run(sender = admin)
    aliceSig = sp.make_signature(alice.secret_key, sp.pack("I am the signer"), message_format='Raw')
    bobSig = sp.make_signature(bob.secret_key, sp.pack("I am the signer"), message_format='Raw')
    scenario.p("Tries to sign without whitelist")
    scenario += c1.issueCert(
        tokenId = 2,
        _hash=sp.pack("I am the signer"),
        _toAlias = "alice",
        _signerPublicKey=bob.address,
        _publicSignerHash=sp.key("edpkvThfdv8Efh1MuqSTUk5EnUFCTjqN6kXDCNXpQ8udN3cKRhNDr2"),
        _sigS=issueCert_sig,
        _assetType = "card",
        _state = "new",
        _url = "https://mco.com"
        ).run(valid=False, sender = admin)
    scenario.p("Second signature")
    scenario += c1.issueCert(
        tokenId = 2,
        _hash=sp.pack("I am the signer"),
        _toAlias = "alice",
        _signerPublicKey=alice.address,
        _publicSignerHash=sp.key("edpkuvNy6TuQ2z8o9wnoaTtTXkzQk7nhegCHfxBc4ecsd4qG71KYNG"),
        _sigS=aliceSig,
        _assetType = "card",
        _state = "new",
        _url = "https://mco.com"
        ).run(sender = admin)
    scenario.p("Add bob to whitelist")
    message_to_sign = sp.blake2b(sp.pack(sp.record(address = bob.address, pubKeyToBeWhitelisted = sp.key("edpkvThfdv8Efh1MuqSTUk5EnUFCTjqN6kXDCNXpQ8udN3cKRhNDr2"),alias = "bob" ,timestamp = sp.timestamp(0))))
    testsig = sp.make_signature(admin.secret_key, message_to_sign, message_format='Raw')
    scenario += c1.insertWhitelistedAddress(
        address = bob.address,
        pubKeyToBeWhitelisted=sp.key("edpkvThfdv8Efh1MuqSTUk5EnUFCTjqN6kXDCNXpQ8udN3cKRhNDr2"),
        adminSignature=testsig,
        alias="bob",
        _timestamp = sp.timestamp(0)
    ).run(sender=admin)
    scenario.p("Bob tries to add his signature to tokenId already minted")
    scenario += c1.issueCert(
        tokenId = 2,
        _hash=sp.pack("I am the signer"),
        _toAlias = "alice",
        _signerPublicKey=bob.address,
        _publicSignerHash=sp.key("edpkvThfdv8Efh1MuqSTUk5EnUFCTjqN6kXDCNXpQ8udN3cKRhNDr2"),
        _sigS=bobSig,
        _assetType = "card",
        _state = "new",
        _url = "https://mco.com"
        ).run(valid = False,sender = admin)
