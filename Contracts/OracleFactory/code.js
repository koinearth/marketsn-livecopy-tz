export default [
  {
    "prim": "storage",
    "args": [
      {
        "prim": "pair",
        "args": [
          {
            "prim": "pair",
            "args": [
              { "prim": "address", "annots": [ "%NFTAddress" ] },
              { "prim": "big_map", "args": [ { "prim": "string" }, { "prim": "address" } ], "annots": [ "%OracleList" ] }
            ]
          },
          { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%factoryAdmin" ] }, { "prim": "key", "annots": [ "%factoryAdminPublicKey" ] } ] }
        ]
      }
    ]
  },
  {
    "prim": "parameter",
    "args": [
      {
        "prim": "or",
        "args": [
          {
            "prim": "pair",
            "args": [
              {
                "prim": "pair",
                "args": [
                  { "prim": "signature", "annots": [ "%_factoryAdminSignature" ] },
                  { "prim": "pair", "args": [ { "prim": "timestamp", "annots": [ "%_timestamp" ] }, { "prim": "address", "annots": [ "%adminAddress" ] } ] }
                ]
              },
              {
                "prim": "pair",
                "args": [
                  { "prim": "key", "annots": [ "%admin_pk" ] },
                  { "prim": "pair", "args": [ { "prim": "string", "annots": [ "%groupId" ] }, { "prim": "nat", "annots": [ "%minSignerRequire" ] } ] }
                ]
              }
            ],
            "annots": [ "%create" ]
          },
          { "prim": "address", "annots": [ "%setNFTAddres" ] }
        ]
      }
    ]
  },
  {
    "prim": "code",
    "args": [
      [
        { "prim": "DUP" },
        { "prim": "CDR" },
        { "prim": "SWAP" },
        { "prim": "CAR" },
        {
          "prim": "IF_LEFT",
          "args": [
            [
              { "prim": "SWAP" },
              { "prim": "DUP" },
              { "prim": "DUG", "args": [ { "int": "2" } ] },
              { "prim": "CAR" },
              { "prim": "CDR" },
              { "prim": "SWAP" },
              { "prim": "DUP" },
              { "prim": "DUG", "args": [ { "int": "2" } ] },
              { "prim": "CDR" },
              { "prim": "CDR" },
              { "prim": "CAR" },
              { "prim": "MEM" },
              { "prim": "IF", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "group id exist" } ] }, { "prim": "FAILWITH" } ], [] ] },
              { "prim": "DUP" },
              { "prim": "CAR" },
              { "prim": "CDR" },
              { "prim": "CAR" },
              { "prim": "SWAP" },
              { "prim": "DUP" },
              { "prim": "DUG", "args": [ { "int": "2" } ] },
              { "prim": "CDR" },
              { "prim": "CDR" },
              { "prim": "CDR" },
              { "prim": "PAIR", "annots": [ "%minSignerRequire", "%timestamp" ] },
              { "prim": "SWAP" },
              { "prim": "DUP" },
              { "prim": "CDR" },
              { "prim": "CDR" },
              { "prim": "CAR" },
              { "prim": "SWAP" },
              { "prim": "DUP" },
              { "prim": "DUG", "args": [ { "int": "3" } ] },
              { "prim": "CDR" },
              { "prim": "CAR" },
              { "prim": "PAIR", "annots": [ "%admin_pk", "%groupId" ] },
              { "prim": "PAIR" },
              { "prim": "PACK" },
              { "prim": "BLAKE2B" },
              { "prim": "SWAP" },
              { "prim": "DUP" },
              { "prim": "DUG", "args": [ { "int": "2" } ] },
              { "prim": "CAR" },
              { "prim": "CAR" },
              { "prim": "DIG", "args": [ { "int": "3" } ] },
              { "prim": "DUP" },
              { "prim": "DUG", "args": [ { "int": "4" } ] },
              { "prim": "CDR" },
              { "prim": "CDR" },
              { "prim": "CHECK_SIGNATURE" },
              { "prim": "IF", "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "verify hash: Invalid signature" } ] }, { "prim": "FAILWITH" } ] ] },
              {
                "prim": "PUSH",
                "args": [
                  {
                    "prim": "pair",
                    "args": [
                      {
                        "prim": "pair",
                        "args": [
                          {
                            "prim": "map",
                            "args": [
                              { "prim": "string" },
                              { "prim": "map", "args": [ { "prim": "bytes" }, { "prim": "map", "args": [ { "prim": "bytes" }, { "prim": "bool" } ] } ] }
                            ],
                            "annots": [ "%tokenAuthSings" ]
                          },
                          {
                            "prim": "pair",
                            "args": [
                              {
                                "prim": "map",
                                "args": [
                                  { "prim": "string" },
                                  {
                                    "prim": "map",
                                    "args": [
                                      { "prim": "bytes" },
                                      {
                                        "prim": "pair",
                                        "args": [
                                          {
                                            "prim": "pair",
                                            "args": [
                                              {
                                                "prim": "pair",
                                                "args": [
                                                  { "prim": "bytes", "annots": [ "%_hash" ] },
                                                  {
                                                    "prim": "pair",
                                                    "args": [
                                                      { "prim": "string", "annots": [ "%assetType" ] },
                                                      { "prim": "set", "args": [ { "prim": "bytes" } ], "annots": [ "%authorities" ] }
                                                    ]
                                                  }
                                                ]
                                              },
                                              {
                                                "prim": "pair",
                                                "args": [
                                                  { "prim": "set", "args": [ { "prim": "string" } ], "annots": [ "%authoritiesAlias" ] },
                                                  {
                                                    "prim": "pair",
                                                    "args": [ { "prim": "string", "annots": [ "%groupId" ] }, { "prim": "timestamp", "annots": [ "%issueDateTime" ] } ]
                                                  }
                                                ]
                                              }
                                            ]
                                          },
                                          {
                                            "prim": "pair",
                                            "args": [
                                              {
                                                "prim": "pair",
                                                "args": [
                                                  { "prim": "address", "annots": [ "%oracleContract" ] },
                                                  {
                                                    "prim": "pair",
                                                    "args": [
                                                      { "prim": "set", "args": [ { "prim": "bytes" } ], "annots": [ "%signatures_hashed" ] },
                                                      { "prim": "string", "annots": [ "%state" ] }
                                                    ]
                                                  }
                                                ]
                                              },
                                              {
                                                "prim": "pair",
                                                "args": [
                                                  { "prim": "address", "annots": [ "%to" ] },
                                                  { "prim": "pair", "args": [ { "prim": "string", "annots": [ "%toAlias" ] }, { "prim": "string", "annots": [ "%url" ] } ] }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ],
                                "annots": [ "%tokenData" ]
                              },
                              {
                                "prim": "map",
                                "args": [ { "prim": "string" }, { "prim": "map", "args": [ { "prim": "bytes" }, { "prim": "nat" } ] } ],
                                "annots": [ "%tokenStatus" ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "prim": "pair",
                        "args": [
                          {
                            "prim": "pair",
                            "args": [
                              { "prim": "map", "args": [ { "prim": "string" }, { "prim": "nat" } ], "annots": [ "%tokensIssued" ] },
                              {
                                "prim": "map",
                                "args": [ { "prim": "string" }, { "prim": "map", "args": [ { "prim": "bytes" }, { "prim": "address" } ] } ],
                                "annots": [ "%tokerOwner" ]
                              }
                            ]
                          },
                          {
                            "prim": "pair",
                            "args": [
                              { "prim": "set", "args": [ { "prim": "bytes" } ], "annots": [ "%whiteListedAddresses" ] },
                              { "prim": "set", "args": [ { "prim": "bytes" } ], "annots": [ "%whitelist_msg_hashed" ] }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "prim": "Pair",
                    "args": [
                      { "prim": "Pair", "args": [ [], { "prim": "Pair", "args": [ [], [] ] } ] },
                      { "prim": "Pair", "args": [ { "prim": "Pair", "args": [ [], [] ] }, { "prim": "Pair", "args": [ [], [] ] } ] }
                    ]
                  }
                ]
              },
              {
                "prim": "PUSH",
                "args": [
                  {
                    "prim": "pair",
                    "args": [
                      { "prim": "map", "args": [ { "prim": "string" }, { "prim": "address" } ], "annots": [ "%signerAddress" ] },
                      { "prim": "map", "args": [ { "prim": "bytes" }, { "prim": "string" } ], "annots": [ "%signerAddressAlias" ] }
                    ]
                  },
                  { "prim": "Pair", "args": [ [], [] ] }
                ]
              },
              { "prim": "DIG", "args": [ { "int": "2" } ] },
              { "prim": "DUP" },
              { "prim": "CDR" },
              { "prim": "CDR" },
              { "prim": "CDR" },
              { "prim": "SWAP" },
              { "prim": "DUP" },
              { "prim": "DUG", "args": [ { "int": "4" } ] },
              { "prim": "CDR" },
              { "prim": "CDR" },
              { "prim": "CAR" },
              { "prim": "PAIR", "annots": [ "%groupId", "%minSignerRequired" ] },
              { "prim": "PAIR" },
              { "prim": "DIG", "args": [ { "int": "2" } ] },
              { "prim": "DUP" },
              { "prim": "CDR" },
              { "prim": "CAR" },
              { "prim": "SWAP" },
              { "prim": "DUP" },
              { "prim": "DUG", "args": [ { "int": "4" } ] },
              { "prim": "CAR" },
              { "prim": "CDR" },
              { "prim": "CDR" },
              { "prim": "PAIR", "annots": [ "%adminAddress", "%adminPublicKey" ] },
              { "prim": "DIG", "args": [ { "int": "4" } ] },
              { "prim": "DUP" },
              { "prim": "DUG", "args": [ { "int": "5" } ] },
              { "prim": "CAR" },
              { "prim": "CAR" },
              { "prim": "PAIR", "annots": [ "%NFTAddress" ] },
              { "prim": "PAIR" },
              { "prim": "PAIR" },
              { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] },
              { "prim": "NONE", "args": [ { "prim": "key_hash" } ] },
              {
                "prim": "CREATE_CONTRACT",
                "args": [
                  [
                    {
                      "prim": "parameter",
                      "args": [
                        {
                          "prim": "or",
                          "args": [
                            {
                              "prim": "or",
                              "args": [
                                {
                                  "prim": "pair",
                                  "args": [
                                    { "prim": "pair", "args": [ { "prim": "string", "annots": [ "%_alias" ] }, { "prim": "timestamp", "annots": [ "%_timestamp" ] } ] },
                                    {
                                      "prim": "pair",
                                      "args": [
                                        { "prim": "address", "annots": [ "%address" ] },
                                        {
                                          "prim": "pair",
                                          "args": [ { "prim": "signature", "annots": [ "%adminSignature" ] }, { "prim": "key", "annots": [ "%pubKeyToBeWhitelisted" ] } ]
                                        }
                                      ]
                                    }
                                  ],
                                  "annots": [ "%insertWhitelistedAddress" ]
                                },
                                {
                                  "prim": "pair",
                                  "args": [
                                    {
                                      "prim": "pair",
                                      "args": [
                                        { "prim": "pair", "args": [ { "prim": "string", "annots": [ "%_assetType" ] }, { "prim": "bytes", "annots": [ "%_hash" ] } ] },
                                        { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%_publicSignerHash" ] }, { "prim": "signature", "annots": [ "%_sigS" ] } ] }
                                      ]
                                    },
                                    {
                                      "prim": "pair",
                                      "args": [
                                        { "prim": "pair", "args": [ { "prim": "key", "annots": [ "%_signerPublicKey" ] }, { "prim": "string", "annots": [ "%_state" ] } ] },
                                        {
                                          "prim": "pair",
                                          "args": [
                                            { "prim": "string", "annots": [ "%_toAlias" ] },
                                            { "prim": "pair", "args": [ { "prim": "string", "annots": [ "%_tokenSymbol" ] }, { "prim": "string", "annots": [ "%_url" ] } ] }
                                          ]
                                        }
                                      ]
                                    }
                                  ],
                                  "annots": [ "%issueCert" ]
                                }
                              ]
                            },
                            {
                              "prim": "or",
                              "args": [
                                {
                                  "prim": "pair",
                                  "args": [ { "prim": "address", "annots": [ "%adminAddress" ] }, { "prim": "key", "annots": [ "%admin_pk" ] } ],
                                  "annots": [ "%setAdmin" ]
                                },
                                {
                                  "prim": "pair",
                                  "args": [ { "prim": "nat", "annots": [ "%tokenId" ] }, { "prim": "string", "annots": [ "%tokenSymbol" ] } ],
                                  "annots": [ "%updateTokenId" ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "prim": "storage",
                      "args": [
                        {
                          "prim": "pair",
                          "args": [
                            {
                              "prim": "pair",
                              "args": [
                                {
                                  "prim": "pair",
                                  "args": [
                                    { "prim": "address", "annots": [ "%NFTAddress" ] },
                                    { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%adminAddress" ] }, { "prim": "key", "annots": [ "%adminPublicKey" ] } ] }
                                  ]
                                },
                                {
                                  "prim": "pair",
                                  "args": [
                                    { "prim": "pair", "args": [ { "prim": "string", "annots": [ "%groupId" ] }, { "prim": "nat", "annots": [ "%minSignerRequired" ] } ] },
                                    {
                                      "prim": "pair",
                                      "args": [
                                        { "prim": "map", "args": [ { "prim": "string" }, { "prim": "address" } ], "annots": [ "%signerAddress" ] },
                                        { "prim": "map", "args": [ { "prim": "bytes" }, { "prim": "string" } ], "annots": [ "%signerAddressAlias" ] }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              "prim": "pair",
                              "args": [
                                {
                                  "prim": "pair",
                                  "args": [
                                    {
                                      "prim": "map",
                                      "args": [
                                        { "prim": "string" },
                                        { "prim": "map", "args": [ { "prim": "bytes" }, { "prim": "map", "args": [ { "prim": "bytes" }, { "prim": "bool" } ] } ] }
                                      ],
                                      "annots": [ "%tokenAuthSings" ]
                                    },
                                    {
                                      "prim": "pair",
                                      "args": [
                                        {
                                          "prim": "map",
                                          "args": [
                                            { "prim": "string" },
                                            {
                                              "prim": "map",
                                              "args": [
                                                { "prim": "bytes" },
                                                {
                                                  "prim": "pair",
                                                  "args": [
                                                    {
                                                      "prim": "pair",
                                                      "args": [
                                                        {
                                                          "prim": "pair",
                                                          "args": [
                                                            { "prim": "bytes", "annots": [ "%_hash" ] },
                                                            {
                                                              "prim": "pair",
                                                              "args": [
                                                                { "prim": "string", "annots": [ "%assetType" ] },
                                                                { "prim": "set", "args": [ { "prim": "bytes" } ], "annots": [ "%authorities" ] }
                                                              ]
                                                            }
                                                          ]
                                                        },
                                                        {
                                                          "prim": "pair",
                                                          "args": [
                                                            { "prim": "set", "args": [ { "prim": "string" } ], "annots": [ "%authoritiesAlias" ] },
                                                            {
                                                              "prim": "pair",
                                                              "args": [ { "prim": "string", "annots": [ "%groupId" ] }, { "prim": "timestamp", "annots": [ "%issueDateTime" ] } ]
                                                            }
                                                          ]
                                                        }
                                                      ]
                                                    },
                                                    {
                                                      "prim": "pair",
                                                      "args": [
                                                        {
                                                          "prim": "pair",
                                                          "args": [
                                                            { "prim": "address", "annots": [ "%oracleContract" ] },
                                                            {
                                                              "prim": "pair",
                                                              "args": [
                                                                { "prim": "set", "args": [ { "prim": "bytes" } ], "annots": [ "%signatures_hashed" ] },
                                                                { "prim": "string", "annots": [ "%state" ] }
                                                              ]
                                                            }
                                                          ]
                                                        },
                                                        {
                                                          "prim": "pair",
                                                          "args": [
                                                            { "prim": "address", "annots": [ "%to" ] },
                                                            {
                                                              "prim": "pair",
                                                              "args": [ { "prim": "string", "annots": [ "%toAlias" ] }, { "prim": "string", "annots": [ "%url" ] } ]
                                                            }
                                                          ]
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                }
                                              ]
                                            }
                                          ],
                                          "annots": [ "%tokenData" ]
                                        },
                                        {
                                          "prim": "map",
                                          "args": [ { "prim": "string" }, { "prim": "map", "args": [ { "prim": "bytes" }, { "prim": "nat" } ] } ],
                                          "annots": [ "%tokenStatus" ]
                                        }
                                      ]
                                    }
                                  ]
                                },
                                {
                                  "prim": "pair",
                                  "args": [
                                    {
                                      "prim": "pair",
                                      "args": [
                                        { "prim": "map", "args": [ { "prim": "string" }, { "prim": "nat" } ], "annots": [ "%tokensIssued" ] },
                                        {
                                          "prim": "map",
                                          "args": [ { "prim": "string" }, { "prim": "map", "args": [ { "prim": "bytes" }, { "prim": "address" } ] } ],
                                          "annots": [ "%tokerOwner" ]
                                        }
                                      ]
                                    },
                                    {
                                      "prim": "pair",
                                      "args": [
                                        { "prim": "set", "args": [ { "prim": "bytes" } ], "annots": [ "%whiteListedAddresses" ] },
                                        { "prim": "set", "args": [ { "prim": "bytes" } ], "annots": [ "%whitelist_msg_hashed" ] }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "prim": "code",
                      "args": [
                        [
                          { "prim": "DUP" },
                          { "prim": "CDR" },
                          { "prim": "SWAP" },
                          { "prim": "CAR" },
                          {
                            "prim": "IF_LEFT",
                            "args": [
                              [
                                {
                                  "prim": "IF_LEFT",
                                  "args": [
                                    [
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "PACK" },
                                      { "prim": "MEM" },
                                      {
                                        "prim": "IF",
                                        "args": [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Already whitelisted" } ] }, { "prim": "FAILWITH" } ], [] ]
                                      },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "3" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "PAIR", "annots": [ "%pubKeyToBeWhitelisted", "%timestamp" ] },
                                      { "prim": "DIG", "args": [ { "int": "2" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "4" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "PAIR", "annots": [ "%address", "%alias" ] },
                                      { "prim": "PAIR" },
                                      { "prim": "PACK" },
                                      { "prim": "BLAKE2B" },
                                      { "prim": "MEM" },
                                      {
                                        "prim": "IF",
                                        "args": [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "signature already exist" } ] }, { "prim": "FAILWITH" } ], [] ]
                                      },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "PAIR", "annots": [ "%pubKeyToBeWhitelisted", "%timestamp" ] },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "3" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "PAIR", "annots": [ "%address", "%alias" ] },
                                      { "prim": "PAIR" },
                                      { "prim": "PACK" },
                                      { "prim": "BLAKE2B" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "DIG", "args": [ { "int": "3" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "4" } ] },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CHECK_SIGNATURE" },
                                      {
                                        "prim": "IF",
                                        "args": [
                                          [],
                                          [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "verify hash: Invalid signature" } ] }, { "prim": "FAILWITH" } ]
                                        ]
                                      },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CAR" },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CDR" },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CDR" },
                                      { "prim": "DUP" },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CAR" },
                                      { "prim": "DIG", "args": [ { "int": "5" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "7" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "SOME" },
                                      { "prim": "SWAP" },
                                      { "prim": "UPDATE" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "PAIR" },
                                      { "prim": "DUP" },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CAR" },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CDR" },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CDR" },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CDR" },
                                      { "prim": "DIG", "args": [ { "int": "5" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "6" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "PACK" },
                                      { "prim": "DIG", "args": [ { "int": "6" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "7" } ] },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "SOME" },
                                      { "prim": "SWAP" },
                                      { "prim": "UPDATE" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "PAIR" },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CDR" },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CDR" },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CDR" },
                                      { "prim": "DUP" },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CAR" },
                                      { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] },
                                      { "prim": "DIG", "args": [ { "int": "6" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "7" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "PACK" },
                                      { "prim": "UPDATE" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CDR" },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CDR" },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CDR" },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CDR" },
                                      { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] },
                                      { "prim": "DIG", "args": [ { "int": "6" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "8" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "PAIR", "annots": [ "%pubKeyToBeWhitelisted", "%timestamp" ] },
                                      { "prim": "DIG", "args": [ { "int": "7" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "PAIR", "annots": [ "%address", "%alias" ] },
                                      { "prim": "PAIR" },
                                      { "prim": "PACK" },
                                      { "prim": "BLAKE2B" },
                                      { "prim": "UPDATE" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "NIL", "args": [ { "prim": "operation" } ] }
                                    ],
                                    [
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "PACK" },
                                      { "prim": "MEM" },
                                      {
                                        "prim": "IF",
                                        "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "signer not whitelisted" } ] }, { "prim": "FAILWITH" } ] ]
                                      },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "3" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "CHECK_SIGNATURE" },
                                      {
                                        "prim": "IF",
                                        "args": [
                                          [],
                                          [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "verify hash: Invalid Signature" } ] }, { "prim": "FAILWITH" } ]
                                        ]
                                      },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "CAR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "MEM" },
                                      {
                                        "prim": "IF",
                                        "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "No to address found" } ] }, { "prim": "FAILWITH" } ] ]
                                      },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "MEM" },
                                      {
                                        "prim": "IF",
                                        "args": [
                                          [
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "135" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "MEM" }
                                          ],
                                          [ { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "False" } ] } ]
                                        ]
                                      },
                                      {
                                        "prim": "IF",
                                        "args": [
                                          [
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "129" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "DIG", "args": [ { "int": "2" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "3" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "DIG", "args": [ { "int": "2" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "3" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "136" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "DIG", "args": [ { "int": "2" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "3" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "136" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "COMPARE" },
                                            { "prim": "EQ" },
                                            {
                                              "prim": "IF",
                                              "args": [
                                                [],
                                                [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Ambiguity in to address" } ] }, { "prim": "FAILWITH" } ]
                                              ]
                                            }
                                          ],
                                          [
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CDR" },
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CDR" },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CDR" },
                                            { "prim": "DIG", "args": [ { "int": "5" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "6" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "EMPTY_MAP", "args": [ { "prim": "bytes" }, { "prim": "address" } ] },
                                            { "prim": "DIG", "args": [ { "int": "8" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "DIG", "args": [ { "int": "8" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "9" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "129" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "SOME" },
                                            { "prim": "DIG", "args": [ { "int": "8" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "9" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "UPDATE" },
                                            { "prim": "SOME" },
                                            { "prim": "SWAP" },
                                            { "prim": "UPDATE" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" }
                                          ]
                                        ]
                                      },
                                      { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "0" } ] },
                                      { "prim": "DIG", "args": [ { "int": "2" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "3" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "DIG", "args": [ { "int": "2" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "3" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "MEM" },
                                      {
                                        "prim": "IF",
                                        "args": [
                                          [
                                            { "prim": "DIG", "args": [ { "int": "2" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "3" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "DIG", "args": [ { "int": "2" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "3" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "144" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "DIG", "args": [ { "int": "2" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "3" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "MEM" }
                                          ],
                                          [ { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "False" } ] } ]
                                        ]
                                      },
                                      {
                                        "prim": "IF",
                                        "args": [
                                          [
                                            { "prim": "DROP" },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "145" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "145" } ] }, { "prim": "FAILWITH" } ], [] ] }
                                          ],
                                          []
                                        ]
                                      },
                                      { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
                                      { "prim": "COMPARE" },
                                      { "prim": "EQ" },
                                      {
                                        "prim": "IF",
                                        "args": [
                                          [
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "MEM" },
                                            {
                                              "prim": "IF",
                                              "args": [
                                                [
                                                  { "prim": "SWAP" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                                  { "prim": "CDR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "GET" },
                                                  {
                                                    "prim": "IF_NONE",
                                                    "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "151" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                  },
                                                  { "prim": "SWAP" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                                  { "prim": "CAR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "MEM" }
                                                ],
                                                [ { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "False" } ] } ]
                                              ]
                                            },
                                            {
                                              "prim": "IF",
                                              "args": [
                                                [
                                                  { "prim": "SWAP" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                                  { "prim": "CDR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "GET" },
                                                  {
                                                    "prim": "IF_NONE",
                                                    "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "151" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                  },
                                                  { "prim": "SWAP" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                                  { "prim": "CAR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "GET" },
                                                  {
                                                    "prim": "IF_NONE",
                                                    "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "151" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                  },
                                                  { "prim": "SWAP" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "PACK" },
                                                  { "prim": "MEM" }
                                                ],
                                                [ { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "False" } ] } ]
                                              ]
                                            },
                                            {
                                              "prim": "IF",
                                              "args": [
                                                [
                                                  { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "False" } ] },
                                                  { "prim": "DIG", "args": [ { "int": "2" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "3" } ] },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "DIG", "args": [ { "int": "2" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "3" } ] },
                                                  { "prim": "CDR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "GET" },
                                                  {
                                                    "prim": "IF_NONE",
                                                    "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "153" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                  },
                                                  { "prim": "DIG", "args": [ { "int": "2" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "3" } ] },
                                                  { "prim": "CAR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "GET" },
                                                  {
                                                    "prim": "IF_NONE",
                                                    "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "153" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                  },
                                                  { "prim": "DIG", "args": [ { "int": "2" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "3" } ] },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "PACK" },
                                                  { "prim": "GET" },
                                                  {
                                                    "prim": "IF_NONE",
                                                    "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "153" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                  },
                                                  { "prim": "COMPARE" },
                                                  { "prim": "EQ" },
                                                  {
                                                    "prim": "IF",
                                                    "args": [
                                                      [],
                                                      [
                                                        {
                                                          "prim": "PUSH",
                                                          "args": [
                                                            { "prim": "string" },
                                                            {
                                                              "string":
                                                                "WrongCondition: self.data.tokenAuthSings[params._tokenSymbol][params._hash][sp.pack(params._signerPublicKey)] == False"
                                                            }
                                                          ]
                                                        },
                                                        { "prim": "FAILWITH" }
                                                      ]
                                                    ]
                                                  }
                                                ],
                                                []
                                              ]
                                            },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "DIG", "args": [ { "int": "2" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "3" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "DIG", "args": [ { "int": "2" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "3" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "155" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "DIG", "args": [ { "int": "2" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "3" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "155" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "COMPARE" },
                                            { "prim": "EQ" },
                                            {
                                              "prim": "IF",
                                              "args": [
                                                [],
                                                [
                                                  {
                                                    "prim": "PUSH",
                                                    "args": [
                                                      { "prim": "string" },
                                                      { "string": "WrongCondition: self.data.tokenData[params._tokenSymbol][params._hash].state == params._state" }
                                                    ]
                                                  },
                                                  { "prim": "FAILWITH" }
                                                ]
                                              ]
                                            },
                                            { "prim": "SELF" },
                                            { "prim": "ADDRESS" },
                                            { "prim": "DIG", "args": [ { "int": "2" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "3" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "DIG", "args": [ { "int": "2" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "3" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "156" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "DIG", "args": [ { "int": "2" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "3" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "156" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "COMPARE" },
                                            { "prim": "EQ" },
                                            {
                                              "prim": "IF",
                                              "args": [
                                                [],
                                                [
                                                  {
                                                    "prim": "PUSH",
                                                    "args": [
                                                      { "prim": "string" },
                                                      { "string": "WrongCondition: self.data.tokenData[params._tokenSymbol][params._hash].oracleContract == sp.self_address" }
                                                    ]
                                                  },
                                                  { "prim": "FAILWITH" }
                                                ]
                                              ]
                                            },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CDR" },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CDR" },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "DUP" },
                                            { "prim": "DIG", "args": [ { "int": "6" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "7" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "158" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "DUP" },
                                            { "prim": "DIG", "args": [ { "int": "8" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "9" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "158" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CDR" },
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CDR" },
                                            { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] },
                                            { "prim": "DIG", "args": [ { "int": "14" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "15" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "PACK" },
                                            { "prim": "UPDATE" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "PAIR" },
                                            { "prim": "PAIR" },
                                            { "prim": "SOME" },
                                            { "prim": "SWAP" },
                                            { "prim": "UPDATE" },
                                            { "prim": "SOME" },
                                            { "prim": "SWAP" },
                                            { "prim": "UPDATE" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CDR" },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CDR" },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "DUP" },
                                            { "prim": "DIG", "args": [ { "int": "6" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "7" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "160" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "DUP" },
                                            { "prim": "DIG", "args": [ { "int": "8" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "9" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "160" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CDR" },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] },
                                            { "prim": "DIG", "args": [ { "int": "14" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "DIG", "args": [ { "int": "14" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "15" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "PACK" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "160" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "UPDATE" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "PAIR" },
                                            { "prim": "SOME" },
                                            { "prim": "SWAP" },
                                            { "prim": "UPDATE" },
                                            { "prim": "SOME" },
                                            { "prim": "SWAP" },
                                            { "prim": "UPDATE" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CDR" },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "DUP" },
                                            { "prim": "DIG", "args": [ { "int": "5" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "6" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "162" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "DUP" },
                                            { "prim": "DIG", "args": [ { "int": "7" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "8" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "162" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "DIG", "args": [ { "int": "8" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "9" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "PACK" },
                                            {
                                              "prim": "PUSH",
                                              "args": [ { "prim": "option", "args": [ { "prim": "bool" } ] }, { "prim": "Some", "args": [ { "prim": "True" } ] } ]
                                            },
                                            { "prim": "SWAP" },
                                            { "prim": "UPDATE" },
                                            { "prim": "SOME" },
                                            { "prim": "SWAP" },
                                            { "prim": "UPDATE" },
                                            { "prim": "SOME" },
                                            { "prim": "SWAP" },
                                            { "prim": "UPDATE" },
                                            { "prim": "PAIR" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CDR" },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CDR" },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "DUP" },
                                            { "prim": "DIG", "args": [ { "int": "6" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "7" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "165" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "DUP" },
                                            { "prim": "DIG", "args": [ { "int": "8" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "9" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "165" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CDR" },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CDR" },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] },
                                            { "prim": "DIG", "args": [ { "int": "14" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "15" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "PACK" },
                                            { "prim": "UPDATE" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "SOME" },
                                            { "prim": "SWAP" },
                                            { "prim": "UPDATE" },
                                            { "prim": "SOME" },
                                            { "prim": "SWAP" },
                                            { "prim": "UPDATE" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" }
                                          ],
                                          [
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "MEM" },
                                            {
                                              "prim": "IF",
                                              "args": [
                                                [
                                                  { "prim": "SWAP" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                                  { "prim": "CDR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "GET" },
                                                  {
                                                    "prim": "IF_NONE",
                                                    "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "169" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                  },
                                                  { "prim": "SWAP" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                                  { "prim": "CAR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "MEM" }
                                                ],
                                                [ { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "False" } ] } ]
                                              ]
                                            },
                                            {
                                              "prim": "IF",
                                              "args": [
                                                [
                                                  { "prim": "SWAP" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                                  { "prim": "CDR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "GET" },
                                                  {
                                                    "prim": "IF_NONE",
                                                    "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "169" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                  },
                                                  { "prim": "SWAP" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                                  { "prim": "CAR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "GET" },
                                                  {
                                                    "prim": "IF_NONE",
                                                    "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "169" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                  },
                                                  { "prim": "SWAP" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "PACK" },
                                                  { "prim": "MEM" }
                                                ],
                                                [ { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "False" } ] } ]
                                              ]
                                            },
                                            {
                                              "prim": "IF",
                                              "args": [
                                                [
                                                  { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "False" } ] },
                                                  { "prim": "DIG", "args": [ { "int": "2" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "3" } ] },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "DIG", "args": [ { "int": "2" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "3" } ] },
                                                  { "prim": "CDR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "GET" },
                                                  {
                                                    "prim": "IF_NONE",
                                                    "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "170" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                  },
                                                  { "prim": "DIG", "args": [ { "int": "2" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "3" } ] },
                                                  { "prim": "CAR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "GET" },
                                                  {
                                                    "prim": "IF_NONE",
                                                    "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "170" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                  },
                                                  { "prim": "DIG", "args": [ { "int": "2" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "3" } ] },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "PACK" },
                                                  { "prim": "GET" },
                                                  {
                                                    "prim": "IF_NONE",
                                                    "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "170" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                  },
                                                  { "prim": "COMPARE" },
                                                  { "prim": "EQ" },
                                                  {
                                                    "prim": "IF",
                                                    "args": [
                                                      [],
                                                      [
                                                        {
                                                          "prim": "PUSH",
                                                          "args": [
                                                            { "prim": "string" },
                                                            {
                                                              "string":
                                                                "WrongCondition: self.data.tokenAuthSings[params._tokenSymbol][params._hash][sp.pack(params._signerPublicKey)] == False"
                                                            }
                                                          ]
                                                        },
                                                        { "prim": "FAILWITH" }
                                                      ]
                                                    ]
                                                  }
                                                ],
                                                []
                                              ]
                                            },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CDR" },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CDR" },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "DIG", "args": [ { "int": "5" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "6" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            {
                                              "prim": "EMPTY_MAP",
                                              "args": [
                                                { "prim": "bytes" },
                                                {
                                                  "prim": "pair",
                                                  "args": [
                                                    {
                                                      "prim": "pair",
                                                      "args": [
                                                        {
                                                          "prim": "pair",
                                                          "args": [
                                                            { "prim": "bytes", "annots": [ "%_hash" ] },
                                                            {
                                                              "prim": "pair",
                                                              "args": [
                                                                { "prim": "string", "annots": [ "%assetType" ] },
                                                                { "prim": "set", "args": [ { "prim": "bytes" } ], "annots": [ "%authorities" ] }
                                                              ]
                                                            }
                                                          ]
                                                        },
                                                        {
                                                          "prim": "pair",
                                                          "args": [
                                                            { "prim": "set", "args": [ { "prim": "string" } ], "annots": [ "%authoritiesAlias" ] },
                                                            {
                                                              "prim": "pair",
                                                              "args": [ { "prim": "string", "annots": [ "%groupId" ] }, { "prim": "timestamp", "annots": [ "%issueDateTime" ] } ]
                                                            }
                                                          ]
                                                        }
                                                      ]
                                                    },
                                                    {
                                                      "prim": "pair",
                                                      "args": [
                                                        {
                                                          "prim": "pair",
                                                          "args": [
                                                            { "prim": "address", "annots": [ "%oracleContract" ] },
                                                            {
                                                              "prim": "pair",
                                                              "args": [
                                                                { "prim": "set", "args": [ { "prim": "bytes" } ], "annots": [ "%signatures_hashed" ] },
                                                                { "prim": "string", "annots": [ "%state" ] }
                                                              ]
                                                            }
                                                          ]
                                                        },
                                                        {
                                                          "prim": "pair",
                                                          "args": [
                                                            { "prim": "address", "annots": [ "%to" ] },
                                                            {
                                                              "prim": "pair",
                                                              "args": [ { "prim": "string", "annots": [ "%toAlias" ] }, { "prim": "string", "annots": [ "%url" ] } ]
                                                            }
                                                          ]
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                }
                                              ]
                                            },
                                            { "prim": "DIG", "args": [ { "int": "7" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "9" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "PAIR", "annots": [ "%toAlias", "%url" ] },
                                            { "prim": "DIG", "args": [ { "int": "9" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "10" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "DIG", "args": [ { "int": "9" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "10" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "129" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "PAIR", "annots": [ "%to" ] },
                                            { "prim": "DIG", "args": [ { "int": "8" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "9" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "EMPTY_SET", "args": [ { "prim": "bytes" } ] },
                                            { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] },
                                            { "prim": "DIG", "args": [ { "int": "11" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "12" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "PACK" },
                                            { "prim": "UPDATE" },
                                            { "prim": "PAIR", "annots": [ "%signatures_hashed", "%state" ] },
                                            { "prim": "SELF" },
                                            { "prim": "ADDRESS" },
                                            { "prim": "PAIR", "annots": [ "%oracleContract" ] },
                                            { "prim": "PAIR" },
                                            { "prim": "NOW" },
                                            { "prim": "DIG", "args": [ { "int": "10" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "11" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "PAIR", "annots": [ "%groupId", "%issueDateTime" ] },
                                            { "prim": "EMPTY_SET", "args": [ { "prim": "string" } ] },
                                            { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] },
                                            { "prim": "DIG", "args": [ { "int": "12" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "DIG", "args": [ { "int": "12" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "13" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "PACK" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "172" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "UPDATE" },
                                            { "prim": "PAIR", "annots": [ "%authoritiesAlias" ] },
                                            { "prim": "EMPTY_SET", "args": [ { "prim": "bytes" } ] },
                                            { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] },
                                            { "prim": "DIG", "args": [ { "int": "11" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "12" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "PACK" },
                                            { "prim": "UPDATE" },
                                            { "prim": "DIG", "args": [ { "int": "10" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "11" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "PAIR", "annots": [ "%assetType", "%authorities" ] },
                                            { "prim": "DIG", "args": [ { "int": "10" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "11" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "PAIR", "annots": [ "%_hash" ] },
                                            { "prim": "PAIR" },
                                            { "prim": "PAIR" },
                                            { "prim": "SOME" },
                                            { "prim": "DIG", "args": [ { "int": "8" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "9" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "UPDATE" },
                                            { "prim": "SOME" },
                                            { "prim": "SWAP" },
                                            { "prim": "UPDATE" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CDR" },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "DIG", "args": [ { "int": "4" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "5" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "EMPTY_MAP", "args": [ { "prim": "bytes" }, { "prim": "map", "args": [ { "prim": "bytes" }, { "prim": "bool" } ] } ] },
                                            { "prim": "EMPTY_MAP", "args": [ { "prim": "bytes" }, { "prim": "bool" } ] },
                                            {
                                              "prim": "PUSH",
                                              "args": [ { "prim": "option", "args": [ { "prim": "bool" } ] }, { "prim": "Some", "args": [ { "prim": "True" } ] } ]
                                            },
                                            { "prim": "DIG", "args": [ { "int": "8" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "9" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "PACK" },
                                            { "prim": "UPDATE" },
                                            { "prim": "SOME" },
                                            { "prim": "DIG", "args": [ { "int": "7" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "8" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "UPDATE" },
                                            { "prim": "SOME" },
                                            { "prim": "SWAP" },
                                            { "prim": "UPDATE" },
                                            { "prim": "PAIR" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CDR" },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CDR" },
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CDR" },
                                            { "prim": "DIG", "args": [ { "int": "5" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "6" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "EMPTY_MAP", "args": [ { "prim": "bytes" }, { "prim": "nat" } ] },
                                            { "prim": "PUSH", "args": [ { "prim": "option", "args": [ { "prim": "nat" } ] }, { "prim": "Some", "args": [ { "int": "1" } ] } ] },
                                            { "prim": "DIG", "args": [ { "int": "8" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "9" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "UPDATE" },
                                            { "prim": "SOME" },
                                            { "prim": "SWAP" },
                                            { "prim": "UPDATE" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" }
                                          ]
                                        ]
                                      },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "MEM" },
                                      {
                                        "prim": "IF",
                                        "args": [
                                          [
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "194" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "MEM" }
                                          ],
                                          [ { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "False" } ] } ]
                                        ]
                                      },
                                      {
                                        "prim": "IF",
                                        "args": [
                                          [
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "3" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "DIG", "args": [ { "int": "2" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "3" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "195" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "DIG", "args": [ { "int": "2" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "3" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "195" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "SIZE" },
                                            { "prim": "COMPARE" },
                                            { "prim": "EQ" },
                                            {
                                              "prim": "IF",
                                              "args": [
                                                [
                                                  { "prim": "SWAP" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                                  { "prim": "CDR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                                  { "prim": "CDR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "MEM" },
                                                  {
                                                    "prim": "IF",
                                                    "args": [
                                                      [
                                                        { "prim": "NIL", "args": [ { "prim": "operation" } ] },
                                                        { "prim": "DIG", "args": [ { "int": "2" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "3" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        {
                                                          "prim": "CONTRACT",
                                                          "args": [
                                                            {
                                                              "prim": "pair",
                                                              "args": [
                                                                {
                                                                  "prim": "pair",
                                                                  "args": [
                                                                    {
                                                                      "prim": "pair",
                                                                      "args": [
                                                                        { "prim": "bytes", "annots": [ "%_hash" ] },
                                                                        {
                                                                          "prim": "pair",
                                                                          "args": [ { "prim": "address", "annots": [ "%address" ] }, { "prim": "nat", "annots": [ "%amount" ] } ]
                                                                        }
                                                                      ]
                                                                    },
                                                                    {
                                                                      "prim": "pair",
                                                                      "args": [
                                                                        {
                                                                          "prim": "pair",
                                                                          "args": [
                                                                            { "prim": "string", "annots": [ "%assetType" ] },
                                                                            { "prim": "set", "args": [ { "prim": "bytes" } ], "annots": [ "%authorities" ] }
                                                                          ]
                                                                        },
                                                                        {
                                                                          "prim": "pair",
                                                                          "args": [
                                                                            { "prim": "set", "args": [ { "prim": "string" } ], "annots": [ "%authoritiesAlias" ] },
                                                                            { "prim": "string", "annots": [ "%groupId" ] }
                                                                          ]
                                                                        }
                                                                      ]
                                                                    }
                                                                  ]
                                                                },
                                                                {
                                                                  "prim": "pair",
                                                                  "args": [
                                                                    {
                                                                      "prim": "pair",
                                                                      "args": [
                                                                        {
                                                                          "prim": "pair",
                                                                          "args": [
                                                                            { "prim": "timestamp", "annots": [ "%issueDateTime" ] },
                                                                            { "prim": "address", "annots": [ "%oracleContract" ] }
                                                                          ]
                                                                        },
                                                                        {
                                                                          "prim": "pair",
                                                                          "args": [
                                                                            { "prim": "set", "args": [ { "prim": "bytes" } ], "annots": [ "%signatures_hashed" ] },
                                                                            { "prim": "string", "annots": [ "%state" ] }
                                                                          ]
                                                                        }
                                                                      ]
                                                                    },
                                                                    {
                                                                      "prim": "pair",
                                                                      "args": [
                                                                        {
                                                                          "prim": "pair",
                                                                          "args": [ { "prim": "address", "annots": [ "%to" ] }, { "prim": "string", "annots": [ "%toAlias" ] } ]
                                                                        },
                                                                        {
                                                                          "prim": "pair",
                                                                          "args": [ { "prim": "nat", "annots": [ "%tokenId" ] }, { "prim": "string", "annots": [ "%url" ] } ]
                                                                        }
                                                                      ]
                                                                    }
                                                                  ]
                                                                }
                                                              ]
                                                            }
                                                          ],
                                                          "annots": [ "%update" ]
                                                        },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "208" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] },
                                                        { "prim": "DIG", "args": [ { "int": "4" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "5" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "4" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "5" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "4" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "5" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "199" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "PAIR", "annots": [ "%tokenId", "%url" ] },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "PAIR", "annots": [ "%to", "%toAlias" ] },
                                                        { "prim": "PAIR" },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "PAIR", "annots": [ "%signatures_hashed", "%state" ] },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "PAIR", "annots": [ "%issueDateTime", "%oracleContract" ] },
                                                        { "prim": "PAIR" },
                                                        { "prim": "PAIR" },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "PAIR", "annots": [ "%authoritiesAlias", "%groupId" ] },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "PAIR", "annots": [ "%assetType", "%authorities" ] },
                                                        { "prim": "PAIR" },
                                                        { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "PAIR", "annots": [ "%address", "%amount" ] },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "227" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "PAIR", "annots": [ "%_hash" ] },
                                                        { "prim": "PAIR" },
                                                        { "prim": "PAIR" },
                                                        { "prim": "TRANSFER_TOKENS" },
                                                        { "prim": "CONS" }
                                                      ],
                                                      [
                                                        { "prim": "NIL", "args": [ { "prim": "operation" } ] },
                                                        { "prim": "DIG", "args": [ { "int": "2" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "3" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        {
                                                          "prim": "CONTRACT",
                                                          "args": [
                                                            {
                                                              "prim": "pair",
                                                              "args": [
                                                                {
                                                                  "prim": "pair",
                                                                  "args": [
                                                                    {
                                                                      "prim": "pair",
                                                                      "args": [
                                                                        { "prim": "bytes", "annots": [ "%_hash" ] },
                                                                        {
                                                                          "prim": "pair",
                                                                          "args": [ { "prim": "address", "annots": [ "%address" ] }, { "prim": "nat", "annots": [ "%amount" ] } ]
                                                                        }
                                                                      ]
                                                                    },
                                                                    {
                                                                      "prim": "pair",
                                                                      "args": [
                                                                        {
                                                                          "prim": "pair",
                                                                          "args": [
                                                                            { "prim": "string", "annots": [ "%assetType" ] },
                                                                            { "prim": "set", "args": [ { "prim": "bytes" } ], "annots": [ "%authorities" ] }
                                                                          ]
                                                                        },
                                                                        {
                                                                          "prim": "pair",
                                                                          "args": [
                                                                            { "prim": "set", "args": [ { "prim": "string" } ], "annots": [ "%authoritiesAlias" ] },
                                                                            { "prim": "string", "annots": [ "%groupId" ] }
                                                                          ]
                                                                        }
                                                                      ]
                                                                    }
                                                                  ]
                                                                },
                                                                {
                                                                  "prim": "pair",
                                                                  "args": [
                                                                    {
                                                                      "prim": "pair",
                                                                      "args": [
                                                                        {
                                                                          "prim": "pair",
                                                                          "args": [
                                                                            { "prim": "timestamp", "annots": [ "%issueDateTime" ] },
                                                                            { "prim": "address", "annots": [ "%oracleContract" ] }
                                                                          ]
                                                                        },
                                                                        {
                                                                          "prim": "pair",
                                                                          "args": [
                                                                            { "prim": "set", "args": [ { "prim": "bytes" } ], "annots": [ "%signatures_hashed" ] },
                                                                            { "prim": "string", "annots": [ "%state" ] }
                                                                          ]
                                                                        }
                                                                      ]
                                                                    },
                                                                    {
                                                                      "prim": "pair",
                                                                      "args": [
                                                                        {
                                                                          "prim": "pair",
                                                                          "args": [ { "prim": "string", "annots": [ "%symbol" ] }, { "prim": "address", "annots": [ "%to" ] } ]
                                                                        },
                                                                        {
                                                                          "prim": "pair",
                                                                          "args": [ { "prim": "string", "annots": [ "%toAlias" ] }, { "prim": "string", "annots": [ "%url" ] } ]
                                                                        }
                                                                      ]
                                                                    }
                                                                  ]
                                                                }
                                                              ]
                                                            }
                                                          ],
                                                          "annots": [ "%mint" ]
                                                        },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "247" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] },
                                                        { "prim": "DIG", "args": [ { "int": "4" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "5" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "4" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "5" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "4" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "5" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "PAIR", "annots": [ "%toAlias", "%url" ] },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "PAIR", "annots": [ "%symbol", "%to" ] },
                                                        { "prim": "PAIR" },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "PAIR", "annots": [ "%signatures_hashed", "%state" ] },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "PAIR", "annots": [ "%issueDateTime", "%oracleContract" ] },
                                                        { "prim": "PAIR" },
                                                        { "prim": "PAIR" },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "PAIR", "annots": [ "%authoritiesAlias", "%groupId" ] },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "PAIR", "annots": [ "%assetType", "%authorities" ] },
                                                        { "prim": "PAIR" },
                                                        { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "PAIR", "annots": [ "%address", "%amount" ] },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "266" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                        },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "PAIR", "annots": [ "%_hash" ] },
                                                        { "prim": "PAIR" },
                                                        { "prim": "PAIR" },
                                                        { "prim": "TRANSFER_TOKENS" },
                                                        { "prim": "CONS" }
                                                      ]
                                                    ]
                                                  },
                                                  { "prim": "DIG", "args": [ { "int": "2" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "CAR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "CDR" },
                                                  { "prim": "DUP" },
                                                  { "prim": "CDR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "CAR" },
                                                  { "prim": "DUP" },
                                                  { "prim": "CAR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "CDR" },
                                                  { "prim": "DUP" },
                                                  { "prim": "CAR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "CDR" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                  { "prim": "CDR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                                  { "prim": "GET" },
                                                  {
                                                    "prim": "IF_NONE",
                                                    "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "204" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                  },
                                                  { "prim": "DIG", "args": [ { "int": "8" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "9" } ] },
                                                  { "prim": "CAR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "CDR" },
                                                  {
                                                    "prim": "PUSH",
                                                    "args": [ { "prim": "option", "args": [ { "prim": "nat" } ] }, { "prim": "Some", "args": [ { "int": "2" } ] } ]
                                                  },
                                                  { "prim": "SWAP" },
                                                  { "prim": "UPDATE" },
                                                  { "prim": "SOME" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "UPDATE" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "DUP" },
                                                  { "prim": "CAR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "CDR" },
                                                  { "prim": "DUP" },
                                                  { "prim": "CDR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "CAR" },
                                                  { "prim": "DUP" },
                                                  { "prim": "CAR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "CDR" },
                                                  { "prim": "DUP" },
                                                  { "prim": "CDR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "CAR" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                  { "prim": "CDR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                                  { "prim": "GET" },
                                                  {
                                                    "prim": "IF_NONE",
                                                    "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "205" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                  },
                                                  {
                                                    "prim": "NONE",
                                                    "args": [
                                                      {
                                                        "prim": "pair",
                                                        "args": [
                                                          {
                                                            "prim": "pair",
                                                            "args": [
                                                              {
                                                                "prim": "pair",
                                                                "args": [
                                                                  { "prim": "bytes", "annots": [ "%_hash" ] },
                                                                  {
                                                                    "prim": "pair",
                                                                    "args": [
                                                                      { "prim": "string", "annots": [ "%assetType" ] },
                                                                      { "prim": "set", "args": [ { "prim": "bytes" } ], "annots": [ "%authorities" ] }
                                                                    ]
                                                                  }
                                                                ]
                                                              },
                                                              {
                                                                "prim": "pair",
                                                                "args": [
                                                                  { "prim": "set", "args": [ { "prim": "string" } ], "annots": [ "%authoritiesAlias" ] },
                                                                  {
                                                                    "prim": "pair",
                                                                    "args": [
                                                                      { "prim": "string", "annots": [ "%groupId" ] },
                                                                      { "prim": "timestamp", "annots": [ "%issueDateTime" ] }
                                                                    ]
                                                                  }
                                                                ]
                                                              }
                                                            ]
                                                          },
                                                          {
                                                            "prim": "pair",
                                                            "args": [
                                                              {
                                                                "prim": "pair",
                                                                "args": [
                                                                  { "prim": "address", "annots": [ "%oracleContract" ] },
                                                                  {
                                                                    "prim": "pair",
                                                                    "args": [
                                                                      { "prim": "set", "args": [ { "prim": "bytes" } ], "annots": [ "%signatures_hashed" ] },
                                                                      { "prim": "string", "annots": [ "%state" ] }
                                                                    ]
                                                                  }
                                                                ]
                                                              },
                                                              {
                                                                "prim": "pair",
                                                                "args": [
                                                                  { "prim": "address", "annots": [ "%to" ] },
                                                                  {
                                                                    "prim": "pair",
                                                                    "args": [ { "prim": "string", "annots": [ "%toAlias" ] }, { "prim": "string", "annots": [ "%url" ] } ]
                                                                  }
                                                                ]
                                                              }
                                                            ]
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  { "prim": "DIG", "args": [ { "int": "9" } ] },
                                                  { "prim": "CAR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "UPDATE" },
                                                  { "prim": "SOME" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "UPDATE" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "SWAP" }
                                                ],
                                                [ { "prim": "DROP" }, { "prim": "NIL", "args": [ { "prim": "operation" } ] } ]
                                              ]
                                            }
                                          ],
                                          [ { "prim": "DROP" }, { "prim": "NIL", "args": [ { "prim": "operation" } ] } ]
                                        ]
                                      }
                                    ]
                                  ]
                                }
                              ],
                              [
                                {
                                  "prim": "IF_LEFT",
                                  "args": [
                                    [
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "SENDER" },
                                      { "prim": "COMPARE" },
                                      { "prim": "EQ" },
                                      {
                                        "prim": "IF",
                                        "args": [
                                          [],
                                          [
                                            { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "WrongCondition: sp.sender == self.data.adminAddress" } ] },
                                            { "prim": "FAILWITH" }
                                          ]
                                        ]
                                      },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CAR" },
                                      { "prim": "DUP" },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CAR" },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "DIG", "args": [ { "int": "4" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "5" } ] },
                                      { "prim": "CAR" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "PAIR" },
                                      { "prim": "PAIR" },
                                      { "prim": "DUP" },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CAR" },
                                      { "prim": "DUP" },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CAR" },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "DIG", "args": [ { "int": "4" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "PAIR" },
                                      { "prim": "PAIR" }
                                    ],
                                    [
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "SENDER" },
                                      { "prim": "COMPARE" },
                                      { "prim": "EQ" },
                                      {
                                        "prim": "IF",
                                        "args": [
                                          [],
                                          [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Only NFTContract can update tokenId" } ] }, { "prim": "FAILWITH" } ]
                                        ]
                                      },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CDR" },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CDR" },
                                      { "prim": "DUP" },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CAR" },
                                      { "prim": "DUP" },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CAR" },
                                      { "prim": "DIG", "args": [ { "int": "5" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CAR" },
                                      { "prim": "SOME" },
                                      { "prim": "SWAP" },
                                      { "prim": "UPDATE" },
                                      { "prim": "PAIR" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" }
                                    ]
                                  ]
                                },
                                { "prim": "NIL", "args": [ { "prim": "operation" } ] }
                              ]
                            ]
                          },
                          { "prim": "PAIR" }
                        ]
                      ]
                    }
                  ]
                ]
              },
              { "prim": "PAIR" },
              { "prim": "DUP" },
              { "prim": "CAR" },
              { "prim": "NIL", "args": [ { "prim": "operation" } ] },
              { "prim": "SWAP" },
              { "prim": "CONS" },
              { "prim": "DIG", "args": [ { "int": "3" } ] },
              { "prim": "DUP" },
              { "prim": "CDR" },
              { "prim": "SWAP" },
              { "prim": "CAR" },
              { "prim": "DUP" },
              { "prim": "CAR" },
              { "prim": "SWAP" },
              { "prim": "CDR" },
              { "prim": "DIG", "args": [ { "int": "5" } ] },
              { "prim": "CDR" },
              { "prim": "CDR" },
              { "prim": "CAR" },
              { "prim": "DIG", "args": [ { "int": "5" } ] },
              { "prim": "DUP" },
              { "prim": "DUG", "args": [ { "int": "6" } ] },
              { "prim": "CDR" },
              { "prim": "SOME" },
              { "prim": "SWAP" },
              { "prim": "UPDATE" },
              { "prim": "SWAP" },
              { "prim": "PAIR" },
              { "prim": "PAIR" },
              { "prim": "DUP" },
              { "prim": "DUG", "args": [ { "int": "3" } ] },
              { "prim": "CAR" },
              { "prim": "CAR" },
              { "prim": "CONTRACT", "args": [ { "prim": "address" } ], "annots": [ "%addAccountToWhitelist" ] },
              { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "355" } ] }, { "prim": "FAILWITH" } ], [] ] },
              { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] },
              { "prim": "DIG", "args": [ { "int": "3" } ] },
              { "prim": "CDR" },
              { "prim": "TRANSFER_TOKENS" },
              { "prim": "CONS" }
            ],
            [
              { "prim": "SENDER" },
              { "prim": "DIG", "args": [ { "int": "2" } ] },
              { "prim": "DUP" },
              { "prim": "DUG", "args": [ { "int": "3" } ] },
              { "prim": "CDR" },
              { "prim": "CAR" },
              { "prim": "COMPARE" },
              { "prim": "EQ" },
              {
                "prim": "IF",
                "args": [
                  [],
                  [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "WrongCondition: self.data.factoryAdmin == sp.sender" } ] }, { "prim": "FAILWITH" } ]
                ]
              },
              { "prim": "SWAP" },
              { "prim": "DUP" },
              { "prim": "CDR" },
              { "prim": "SWAP" },
              { "prim": "CAR" },
              { "prim": "CDR" },
              { "prim": "DIG", "args": [ { "int": "2" } ] },
              { "prim": "PAIR" },
              { "prim": "PAIR" },
              { "prim": "NIL", "args": [ { "prim": "operation" } ] }
            ]
          ]
        },
        { "prim": "NIL", "args": [ { "prim": "operation" } ] },
        { "prim": "SWAP" },
        { "prim": "ITER", "args": [ [ { "prim": "CONS" } ] ] },
        { "prim": "PAIR" }
      ]
    ]
  }
]