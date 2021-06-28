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
                  { "prim": "pair", "args": [ { "prim": "string", "annots": [ "%groupId" ] }, { "prim": "int", "annots": [ "%minSignerRequire" ] } ] }
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
        {
          "prim": "CAST",
          "args": [
            {
              "prim": "pair",
              "args": [
                {
                  "prim": "or",
                  "args": [
                    {
                      "prim": "pair",
                      "args": [
                        { "prim": "pair", "args": [ { "prim": "signature" }, { "prim": "pair", "args": [ { "prim": "timestamp" }, { "prim": "address" } ] } ] },
                        { "prim": "pair", "args": [ { "prim": "key" }, { "prim": "pair", "args": [ { "prim": "string" }, { "prim": "int" } ] } ] }
                      ]
                    },
                    { "prim": "address" }
                  ]
                },
                {
                  "prim": "pair",
                  "args": [
                    { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "big_map", "args": [ { "prim": "string" }, { "prim": "address" } ] } ] },
                    { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "key" } ] }
                  ]
                }
              ]
            }
          ]
        },
        { "prim": "UNPAIR" },
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
              { "prim": "GET", "args": [ { "int": "5" } ] },
              { "prim": "MEM" },
              { "prim": "IF", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "group id exist" } ] }, { "prim": "FAILWITH" } ], [] ] },
              { "prim": "DUP" },
              { "prim": "CAR" },
              { "prim": "GET", "args": [ { "int": "3" } ] },
              { "prim": "SWAP" },
              { "prim": "DUP" },
              { "prim": "DUG", "args": [ { "int": "2" } ] },
              { "prim": "GET", "args": [ { "int": "6" } ] },
              { "prim": "PAIR" },
              { "prim": "SWAP" },
              { "prim": "DUP" },
              { "prim": "GET", "args": [ { "int": "5" } ] },
              { "prim": "SWAP" },
              { "prim": "DUP" },
              { "prim": "DUG", "args": [ { "int": "3" } ] },
              { "prim": "GET", "args": [ { "int": "3" } ] },
              { "prim": "PAIR" },
              { "prim": "PAIR" },
              { "prim": "PACK" },
              { "prim": "BLAKE2B" },
              { "prim": "SWAP" },
              { "prim": "DUP" },
              { "prim": "DUG", "args": [ { "int": "2" } ] },
              { "prim": "CAR" },
              { "prim": "CAR" },
              { "prim": "DUP", "args": [ { "int": "4" } ] },
              { "prim": "GET", "args": [ { "int": "4" } ] },
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
                          { "prim": "map", "args": [ { "prim": "bytes" }, { "prim": "string" } ] },
                          { "prim": "map", "args": [ { "prim": "string" }, { "prim": "nat" } ] }
                        ]
                      },
                      {
                        "prim": "pair",
                        "args": [
                          { "prim": "map", "args": [ { "prim": "string" }, { "prim": "map", "args": [ { "prim": "bytes" }, { "prim": "address" } ] } ] },
                          { "prim": "pair", "args": [ { "prim": "set", "args": [ { "prim": "bytes" } ] }, { "prim": "set", "args": [ { "prim": "bytes" } ] } ] }
                        ]
                      }
                    ]
                  },
                  { "prim": "Pair", "args": [ { "prim": "Pair", "args": [ [], [] ] }, { "prim": "Pair", "args": [ [], { "prim": "Pair", "args": [ [], [] ] } ] } ] }
                ]
              },
              { "prim": "EMPTY_MAP", "args": [ { "prim": "string" }, { "prim": "address" } ] },
              { "prim": "DUP", "args": [ { "int": "3" } ] },
              { "prim": "GET", "args": [ { "int": "5" } ] },
              { "prim": "PAIR" },
              { "prim": "DUP", "args": [ { "int": "3" } ] },
              { "prim": "GET", "args": [ { "int": "3" } ] },
              { "prim": "PAIR" },
              { "prim": "DUP", "args": [ { "int": "3" } ] },
              { "prim": "CAR" },
              { "prim": "GET", "args": [ { "int": "4" } ] },
              { "prim": "DUP", "args": [ { "int": "5" } ] },
              { "prim": "CAR" },
              { "prim": "CAR" },
              { "prim": "PAIR" },
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
                                        { "prim": "bytes", "annots": [ "%_hash" ] },
                                        { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%_publicSignerHash" ] }, { "prim": "signature", "annots": [ "%_sigS" ] } ] }
                                      ]
                                    },
                                    {
                                      "prim": "pair",
                                      "args": [
                                        { "prim": "key", "annots": [ "%_signerPublicKey" ] },
                                        { "prim": "pair", "args": [ { "prim": "string", "annots": [ "%_toAlias" ] }, { "prim": "string", "annots": [ "%_tokenSymbol" ] } ] }
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
                                { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%NFTAddress" ] }, { "prim": "address", "annots": [ "%adminAddress" ] } ] },
                                {
                                  "prim": "pair",
                                  "args": [
                                    { "prim": "key", "annots": [ "%adminPublicKey" ] },
                                    {
                                      "prim": "pair",
                                      "args": [
                                        { "prim": "string", "annots": [ "%groupId" ] },
                                        { "prim": "map", "args": [ { "prim": "string" }, { "prim": "address" } ], "annots": [ "%signerAddress" ] }
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
                                    { "prim": "map", "args": [ { "prim": "bytes" }, { "prim": "string" } ], "annots": [ "%signerAddressAlias" ] },
                                    { "prim": "map", "args": [ { "prim": "string" }, { "prim": "nat" } ], "annots": [ "%tokensIssued" ] }
                                  ]
                                },
                                {
                                  "prim": "pair",
                                  "args": [
                                    {
                                      "prim": "map",
                                      "args": [ { "prim": "string" }, { "prim": "map", "args": [ { "prim": "bytes" }, { "prim": "address" } ] } ],
                                      "annots": [ "%tokerOwner" ]
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
                          {
                            "prim": "CAST",
                            "args": [
                              {
                                "prim": "pair",
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
                                              { "prim": "pair", "args": [ { "prim": "string" }, { "prim": "timestamp" } ] },
                                              { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "pair", "args": [ { "prim": "signature" }, { "prim": "key" } ] } ] }
                                            ]
                                          },
                                          {
                                            "prim": "pair",
                                            "args": [
                                              { "prim": "pair", "args": [ { "prim": "bytes" }, { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "signature" } ] } ] },
                                              { "prim": "pair", "args": [ { "prim": "key" }, { "prim": "pair", "args": [ { "prim": "string" }, { "prim": "string" } ] } ] }
                                            ]
                                          }
                                        ]
                                      },
                                      {
                                        "prim": "or",
                                        "args": [
                                          { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "key" } ] },
                                          { "prim": "pair", "args": [ { "prim": "nat" }, { "prim": "string" } ] }
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
                                          { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "address" } ] },
                                          {
                                            "prim": "pair",
                                            "args": [
                                              { "prim": "key" },
                                              { "prim": "pair", "args": [ { "prim": "string" }, { "prim": "map", "args": [ { "prim": "string" }, { "prim": "address" } ] } ] }
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
                                              { "prim": "map", "args": [ { "prim": "bytes" }, { "prim": "string" } ] },
                                              { "prim": "map", "args": [ { "prim": "string" }, { "prim": "nat" } ] }
                                            ]
                                          },
                                          {
                                            "prim": "pair",
                                            "args": [
                                              { "prim": "map", "args": [ { "prim": "string" }, { "prim": "map", "args": [ { "prim": "bytes" }, { "prim": "address" } ] } ] },
                                              {
                                                "prim": "pair",
                                                "args": [ { "prim": "set", "args": [ { "prim": "bytes" } ] }, { "prim": "set", "args": [ { "prim": "bytes" } ] } ]
                                              }
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
                          { "prim": "UNPAIR" },
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
                                      { "prim": "GET", "args": [ { "int": "7" } ] },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "GET", "args": [ { "int": "6" } ] },
                                      { "prim": "PACK" },
                                      { "prim": "MEM" },
                                      {
                                        "prim": "IF",
                                        "args": [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Already whitelisted" } ] }, { "prim": "FAILWITH" } ], [] ]
                                      },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "GET", "args": [ { "int": "8" } ] },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "3" } ] },
                                      { "prim": "GET", "args": [ { "int": "6" } ] },
                                      { "prim": "PAIR" },
                                      { "prim": "DIG", "args": [ { "int": "2" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "4" } ] },
                                      { "prim": "GET", "args": [ { "int": "3" } ] },
                                      { "prim": "PAIR" },
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
                                      { "prim": "GET", "args": [ { "int": "6" } ] },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "3" } ] },
                                      { "prim": "GET", "args": [ { "int": "3" } ] },
                                      { "prim": "PAIR" },
                                      { "prim": "PAIR" },
                                      { "prim": "PACK" },
                                      { "prim": "BLAKE2B" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "GET", "args": [ { "int": "5" } ] },
                                      { "prim": "DUP", "args": [ { "int": "4" } ] },
                                      { "prim": "CAR" },
                                      { "prim": "GET", "args": [ { "int": "3" } ] },
                                      { "prim": "CHECK_SIGNATURE" },
                                      {
                                        "prim": "IF",
                                        "args": [
                                          [],
                                          [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "verify hash: Invalid signature" } ] }, { "prim": "FAILWITH" } ]
                                        ]
                                      },
                                      { "prim": "SWAP" },
                                      { "prim": "UNPAIR" },
                                      { "prim": "UNPAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "UNPAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "UNPAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP", "args": [ { "int": "6" } ] },
                                      { "prim": "GET", "args": [ { "int": "3" } ] },
                                      { "prim": "SOME" },
                                      { "prim": "DUP", "args": [ { "int": "7" } ] },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "UPDATE" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "UNPAIR" },
                                      { "prim": "UNPAIR" },
                                      { "prim": "DUP", "args": [ { "int": "5" } ] },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "SOME" },
                                      { "prim": "DUP", "args": [ { "int": "6" } ] },
                                      { "prim": "GET", "args": [ { "int": "6" } ] },
                                      { "prim": "PACK" },
                                      { "prim": "UPDATE" },
                                      { "prim": "PAIR" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "DUP" },
                                      { "prim": "GET", "args": [ { "int": "7" } ] },
                                      { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] },
                                      { "prim": "DUP", "args": [ { "int": "4" } ] },
                                      { "prim": "GET", "args": [ { "int": "6" } ] },
                                      { "prim": "PACK" },
                                      { "prim": "UPDATE" },
                                      { "prim": "UPDATE", "args": [ { "int": "7" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "GET", "args": [ { "int": "8" } ] },
                                      { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] },
                                      { "prim": "DIG", "args": [ { "int": "3" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "5" } ] },
                                      { "prim": "GET", "args": [ { "int": "6" } ] },
                                      { "prim": "PAIR" },
                                      { "prim": "DIG", "args": [ { "int": "4" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "GET", "args": [ { "int": "3" } ] },
                                      { "prim": "PAIR" },
                                      { "prim": "PAIR" },
                                      { "prim": "PACK" },
                                      { "prim": "BLAKE2B" },
                                      { "prim": "UPDATE" },
                                      { "prim": "UPDATE", "args": [ { "int": "8" } ] },
                                      { "prim": "NIL", "args": [ { "prim": "operation" } ] }
                                    ],
                                    [
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "GET", "args": [ { "int": "7" } ] },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "GET", "args": [ { "int": "3" } ] },
                                      { "prim": "PACK" },
                                      { "prim": "MEM" },
                                      {
                                        "prim": "IF",
                                        "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "signer not whitelisted" } ] }, { "prim": "FAILWITH" } ] ]
                                      },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "GET", "args": [ { "int": "4" } ] },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "3" } ] },
                                      { "prim": "GET", "args": [ { "int": "3" } ] },
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
                                      { "prim": "GET", "args": [ { "int": "6" } ] },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "GET", "args": [ { "int": "5" } ] },
                                      { "prim": "MEM" },
                                      {
                                        "prim": "IF",
                                        "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "No to address found" } ] }, { "prim": "FAILWITH" } ] ]
                                      },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "GET", "args": [ { "int": "5" } ] },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "GET", "args": [ { "int": "6" } ] },
                                      { "prim": "MEM" },
                                      {
                                        "prim": "IF",
                                        "args": [
                                          [
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "GET", "args": [ { "int": "5" } ] },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "GET", "args": [ { "int": "6" } ] },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "104" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
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
                                            { "prim": "GET", "args": [ { "int": "6" } ] },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "GET", "args": [ { "int": "5" } ] },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "98" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "DUP", "args": [ { "int": "3" } ] },
                                            { "prim": "GET", "args": [ { "int": "5" } ] },
                                            { "prim": "DUP", "args": [ { "int": "3" } ] },
                                            { "prim": "GET", "args": [ { "int": "6" } ] },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "105" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "DUP", "args": [ { "int": "3" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "105" } ] }, { "prim": "FAILWITH" } ], [] ] },
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
                                            { "prim": "GET", "args": [ { "int": "5" } ] },
                                            { "prim": "EMPTY_MAP", "args": [ { "prim": "bytes" }, { "prim": "address" } ] },
                                            { "prim": "DIG", "args": [ { "int": "4" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "GET", "args": [ { "int": "6" } ] },
                                            { "prim": "DUP", "args": [ { "int": "5" } ] },
                                            { "prim": "GET", "args": [ { "int": "5" } ] },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "98" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "SOME" },
                                            { "prim": "DUP", "args": [ { "int": "5" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "UPDATE" },
                                            { "prim": "SOME" },
                                            { "prim": "DUP", "args": [ { "int": "4" } ] },
                                            { "prim": "GET", "args": [ { "int": "6" } ] },
                                            { "prim": "UPDATE" },
                                            { "prim": "UPDATE", "args": [ { "int": "5" } ] },
                                            { "prim": "SWAP" }
                                          ]
                                        ]
                                      },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "GET", "args": [ { "int": "3" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "GET", "args": [ { "int": "6" } ] },
                                      { "prim": "MEM" },
                                      {
                                        "prim": "IF",
                                        "args": [
                                          [
                                            { "prim": "NIL", "args": [ { "prim": "operation" } ] },
                                            { "prim": "DUP", "args": [ { "int": "3" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            {
                                              "prim": "CONTRACT",
                                              "args": [
                                                { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "pair", "args": [ { "prim": "nat" }, { "prim": "nat" } ] } ] }
                                              ],
                                              "annots": [ "%update" ]
                                            },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "118" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] },
                                            { "prim": "DUP", "args": [ { "int": "5" } ] },
                                            { "prim": "GET", "args": [ { "int": "3" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "DUP", "args": [ { "int": "5" } ] },
                                            { "prim": "GET", "args": [ { "int": "6" } ] },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "112" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
                                            { "prim": "DUP", "args": [ { "int": "7" } ] },
                                            { "prim": "GET", "args": [ { "int": "5" } ] },
                                            { "prim": "DUP", "args": [ { "int": "7" } ] },
                                            { "prim": "GET", "args": [ { "int": "6" } ] },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "123" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "DIG", "args": [ { "int": "6" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "123" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "PAIR", "args": [ { "int": "3" } ] },
                                            { "prim": "TRANSFER_TOKENS" },
                                            { "prim": "CONS" }
                                          ],
                                          [
                                            { "prim": "NIL", "args": [ { "prim": "operation" } ] },
                                            { "prim": "DUP", "args": [ { "int": "3" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            {
                                              "prim": "CONTRACT",
                                              "args": [
                                                {
                                                  "prim": "pair",
                                                  "args": [
                                                    { "prim": "pair", "args": [ { "prim": "bytes" }, { "prim": "address" } ] },
                                                    { "prim": "pair", "args": [ { "prim": "nat" }, { "prim": "map", "args": [ { "prim": "string" }, { "prim": "bytes" } ] } ] }
                                                  ]
                                                }
                                              ],
                                              "annots": [ "%mint" ]
                                            },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "131" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] },
                                            { "prim": "EMPTY_MAP", "args": [ { "prim": "string" }, { "prim": "bytes" } ] },
                                            { "prim": "SELF_ADDRESS" },
                                            { "prim": "PACK" },
                                            { "prim": "SOME" },
                                            { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "oracle" } ] },
                                            { "prim": "UPDATE" },
                                            { "prim": "DUP", "args": [ { "int": "5" } ] },
                                            { "prim": "GET", "args": [ { "int": "6" } ] },
                                            { "prim": "PACK" },
                                            { "prim": "SOME" },
                                            { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "assetId" } ] },
                                            { "prim": "UPDATE" },
                                            { "prim": "DUP", "args": [ { "int": "5" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "SOME" },
                                            { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "cid" } ] },
                                            { "prim": "UPDATE" },
                                            { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
                                            { "prim": "PAIR" },
                                            { "prim": "DUP", "args": [ { "int": "6" } ] },
                                            { "prim": "GET", "args": [ { "int": "5" } ] },
                                            { "prim": "DUP", "args": [ { "int": "6" } ] },
                                            { "prim": "GET", "args": [ { "int": "6" } ] },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "138" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "DUP", "args": [ { "int": "6" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "138" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "DIG", "args": [ { "int": "5" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "PAIR" },
                                            { "prim": "PAIR" },
                                            { "prim": "TRANSFER_TOKENS" },
                                            { "prim": "CONS" }
                                          ]
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
                                      { "prim": "UNPAIR" },
                                      { "prim": "UNPAIR" },
                                      { "prim": "CAR" },
                                      { "prim": "DUP", "args": [ { "int": "4" } ] },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CDR" },
                                      { "prim": "DIG", "args": [ { "int": "3" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
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
                                      { "prim": "UNPAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "UNPAIR" },
                                      { "prim": "UNPAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP", "args": [ { "int": "5" } ] },
                                      { "prim": "CAR" },
                                      { "prim": "SOME" },
                                      { "prim": "DIG", "args": [ { "int": "5" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "UPDATE" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
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
              { "prim": "UNPAIR" },
              { "prim": "UNPAIR" },
              { "prim": "SWAP" },
              { "prim": "DUP", "args": [ { "int": "5" } ] },
              { "prim": "CDR" },
              { "prim": "SOME" },
              { "prim": "DIG", "args": [ { "int": "6" } ] },
              { "prim": "GET", "args": [ { "int": "5" } ] },
              { "prim": "UPDATE" },
              { "prim": "SWAP" },
              { "prim": "PAIR" },
              { "prim": "PAIR" },
              { "prim": "DUP" },
              { "prim": "DUG", "args": [ { "int": "3" } ] },
              { "prim": "CAR" },
              { "prim": "CAR" },
              { "prim": "CONTRACT", "args": [ { "prim": "address" } ], "annots": [ "%addAccountToWhitelist" ] },
              { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "213" } ] }, { "prim": "FAILWITH" } ], [] ] },
              { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] },
              { "prim": "DIG", "args": [ { "int": "3" } ] },
              { "prim": "CDR" },
              { "prim": "TRANSFER_TOKENS" },
              { "prim": "CONS" }
            ],
            [
              { "prim": "SENDER" },
              { "prim": "DUP", "args": [ { "int": "3" } ] },
              { "prim": "GET", "args": [ { "int": "3" } ] },
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
              { "prim": "UNPAIR" },
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