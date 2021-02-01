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
              {
                "prim": "pair",
                "args": [
                  { "prim": "key", "annots": [ "%adminPublicKey" ] },
                  {
                    "prim": "pair",
                    "args": [ { "prim": "address", "annots": [ "%administrator" ] }, { "prim": "set", "args": [ { "prim": "nat" } ], "annots": [ "%all_tokens" ] } ]
                  }
                ]
              },
              {
                "prim": "pair",
                "args": [
                  { "prim": "big_map", "args": [ { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] }, { "prim": "nat" } ], "annots": [ "%ledger" ] },
                  {
                    "prim": "pair",
                    "args": [
                      { "prim": "unit", "annots": [ "%metadata_string" ] },
                      {
                        "prim": "big_map",
                        "args": [
                          {
                            "prim": "pair",
                            "args": [
                              { "prim": "address", "annots": [ "%owner" ] },
                              { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%operator" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ] }
                            ]
                          },
                          { "prim": "unit" }
                        ],
                        "annots": [ "%operators" ]
                      }
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
                  { "prim": "address", "annots": [ "%oracleFactoryAddress" ] },
                  { "prim": "pair", "args": [ { "prim": "bool", "annots": [ "%paused" ] }, { "prim": "nat", "annots": [ "%tokenCount" ] } ] }
                ]
              },
              {
                "prim": "pair",
                "args": [
                  {
                    "prim": "pair",
                    "args": [
                      {
                        "prim": "big_map",
                        "args": [
                          { "prim": "nat" },
                          {
                            "prim": "list",
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
                                          { "prim": "pair", "args": [ { "prim": "string", "annots": [ "%groupId" ] }, { "prim": "timestamp", "annots": [ "%issueDateTime" ] } ] }
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
                      { "prim": "big_map", "args": [ { "prim": "bytes" }, { "prim": "nat" } ], "annots": [ "%tokenHash" ] }
                    ]
                  },
                  {
                    "prim": "pair",
                    "args": [
                      {
                        "prim": "big_map",
                        "args": [
                          { "prim": "nat" },
                          {
                            "prim": "pair",
                            "args": [
                              { "prim": "nat", "annots": [ "%token_id" ] },
                              {
                                "prim": "pair",
                                "args": [
                                  { "prim": "string", "annots": [ "%symbol" ] },
                                  {
                                    "prim": "pair",
                                    "args": [
                                      { "prim": "string", "annots": [ "%name" ] },
                                      {
                                        "prim": "pair",
                                        "args": [
                                          { "prim": "nat", "annots": [ "%decimals" ] },
                                          { "prim": "map", "args": [ { "prim": "string" }, { "prim": "string" } ], "annots": [ "%extras" ] }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ],
                        "annots": [ "%tokens" ]
                      },
                      { "prim": "set", "args": [ { "prim": "address" } ], "annots": [ "%whitelist" ] }
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
    "prim": "parameter",
    "args": [
      {
        "prim": "or",
        "args": [
          {
            "prim": "or",
            "args": [
              {
                "prim": "or",
                "args": [
                  { "prim": "address", "annots": [ "%addAccountToWhitelist" ] },
                  {
                    "prim": "pair",
                    "args": [
                      {
                        "prim": "list",
                        "args": [ { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ] } ],
                        "annots": [ "%requests" ]
                      },
                      {
                        "prim": "contract",
                        "args": [
                          {
                            "prim": "list",
                            "args": [
                              {
                                "prim": "pair",
                                "args": [
                                  {
                                    "prim": "pair",
                                    "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ],
                                    "annots": [ "%request" ]
                                  },
                                  { "prim": "nat", "annots": [ "%balance" ] }
                                ]
                              }
                            ]
                          }
                        ],
                        "annots": [ "%callback" ]
                      }
                    ],
                    "annots": [ "%balance_of" ]
                  }
                ]
              },
              {
                "prim": "or",
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
                              { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%address" ] }, { "prim": "nat", "annots": [ "%amount" ] } ] }
                            ]
                          },
                          {
                            "prim": "pair",
                            "args": [
                              {
                                "prim": "pair",
                                "args": [ { "prim": "string", "annots": [ "%assetType" ] }, { "prim": "set", "args": [ { "prim": "bytes" } ], "annots": [ "%authorities" ] } ]
                              },
                              {
                                "prim": "pair",
                                "args": [ { "prim": "set", "args": [ { "prim": "string" } ], "annots": [ "%authoritiesAlias" ] }, { "prim": "string", "annots": [ "%groupId" ] } ]
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
                              { "prim": "pair", "args": [ { "prim": "timestamp", "annots": [ "%issueDateTime" ] }, { "prim": "address", "annots": [ "%oracleContract" ] } ] },
                              {
                                "prim": "pair",
                                "args": [ { "prim": "set", "args": [ { "prim": "bytes" } ], "annots": [ "%signatures_hashed" ] }, { "prim": "string", "annots": [ "%state" ] } ]
                              }
                            ]
                          },
                          {
                            "prim": "pair",
                            "args": [
                              { "prim": "pair", "args": [ { "prim": "string", "annots": [ "%symbol" ] }, { "prim": "address", "annots": [ "%to" ] } ] },
                              { "prim": "pair", "args": [ { "prim": "string", "annots": [ "%toAlias" ] }, { "prim": "string", "annots": [ "%url" ] } ] }
                            ]
                          }
                        ]
                      }
                    ],
                    "annots": [ "%mint" ]
                  },
                  { "prim": "or", "args": [ { "prim": "address", "annots": [ "%set_administrator" ] }, { "prim": "bool", "annots": [ "%set_pause" ] } ] }
                ]
              }
            ]
          },
          {
            "prim": "or",
            "args": [
              {
                "prim": "or",
                "args": [
                  {
                    "prim": "pair",
                    "args": [
                      { "prim": "list", "args": [ { "prim": "nat" } ], "annots": [ "%token_ids" ] },
                      {
                        "prim": "lambda",
                        "args": [
                          {
                            "prim": "list",
                            "args": [
                              {
                                "prim": "pair",
                                "args": [
                                  { "prim": "nat", "annots": [ "%token_id" ] },
                                  {
                                    "prim": "pair",
                                    "args": [
                                      { "prim": "string", "annots": [ "%symbol" ] },
                                      {
                                        "prim": "pair",
                                        "args": [
                                          { "prim": "string", "annots": [ "%name" ] },
                                          {
                                            "prim": "pair",
                                            "args": [
                                              { "prim": "nat", "annots": [ "%decimals" ] },
                                              { "prim": "map", "args": [ { "prim": "string" }, { "prim": "string" } ], "annots": [ "%extras" ] }
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
                          { "prim": "unit" }
                        ],
                        "annots": [ "%handler" ]
                      }
                    ],
                    "annots": [ "%token_metadata" ]
                  },
                  { "prim": "contract", "args": [ { "prim": "address" } ], "annots": [ "%token_metadata_registry" ] }
                ]
              },
              {
                "prim": "or",
                "args": [
                  {
                    "prim": "list",
                    "args": [
                      {
                        "prim": "pair",
                        "args": [
                          { "prim": "address", "annots": [ "%from_" ] },
                          {
                            "prim": "list",
                            "args": [
                              {
                                "prim": "pair",
                                "args": [
                                  { "prim": "address", "annots": [ "%to_" ] },
                                  { "prim": "pair", "args": [ { "prim": "nat", "annots": [ "%token_id" ] }, { "prim": "nat", "annots": [ "%amount" ] } ] }
                                ]
                              }
                            ],
                            "annots": [ "%txs" ]
                          }
                        ]
                      }
                    ],
                    "annots": [ "%transfer" ]
                  },
                  {
                    "prim": "or",
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
                                  { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%address" ] }, { "prim": "nat", "annots": [ "%amount" ] } ] }
                                ]
                              },
                              {
                                "prim": "pair",
                                "args": [
                                  {
                                    "prim": "pair",
                                    "args": [ { "prim": "string", "annots": [ "%assetType" ] }, { "prim": "set", "args": [ { "prim": "bytes" } ], "annots": [ "%authorities" ] } ]
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
                                  { "prim": "pair", "args": [ { "prim": "timestamp", "annots": [ "%issueDateTime" ] }, { "prim": "address", "annots": [ "%oracleContract" ] } ] },
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
                                  { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%to" ] }, { "prim": "string", "annots": [ "%toAlias" ] } ] },
                                  { "prim": "pair", "args": [ { "prim": "nat", "annots": [ "%tokenId" ] }, { "prim": "string", "annots": [ "%url" ] } ] }
                                ]
                              }
                            ]
                          }
                        ],
                        "annots": [ "%update" ]
                      },
                      {
                        "prim": "list",
                        "args": [
                          {
                            "prim": "or",
                            "args": [
                              {
                                "prim": "pair",
                                "args": [
                                  { "prim": "address", "annots": [ "%owner" ] },
                                  { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%operator" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ] }
                                ],
                                "annots": [ "%add_operator" ]
                              },
                              {
                                "prim": "pair",
                                "args": [
                                  { "prim": "address", "annots": [ "%owner" ] },
                                  { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%operator" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ] }
                                ],
                                "annots": [ "%remove_operator" ]
                              }
                            ]
                          }
                        ],
                        "annots": [ "%update_operators" ]
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
                    {
                      "prim": "IF_LEFT",
                      "args": [
                        [
                          { "prim": "SENDER" },
                          { "prim": "DIG", "args": [ { "int": "2" } ] },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "3" } ] },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "COMPARE" },
                          { "prim": "EQ" },
                          { "prim": "IF", "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "782" } ] }, { "prim": "FAILWITH" } ] ] },
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
                          { "prim": "CAR" },
                          { "prim": "SWAP" },
                          { "prim": "CDR" },
                          { "prim": "DUP" },
                          { "prim": "CAR" },
                          { "prim": "SWAP" },
                          { "prim": "CDR" },
                          { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] },
                          { "prim": "DIG", "args": [ { "int": "6" } ] },
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
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "IF", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "549" } ] }, { "prim": "FAILWITH" } ], [] ] },
                          { "prim": "DUP" },
                          { "prim": "CAR" },
                          {
                            "prim": "MAP",
                            "args": [
                              [
                                { "prim": "DIG", "args": [ { "int": "2" } ] },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "3" } ] },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "SWAP" },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "2" } ] },
                                { "prim": "CDR" },
                                { "prim": "MEM" },
                                {
                                  "prim": "IF",
                                  "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_TOKEN_UNDEFINED" } ] }, { "prim": "FAILWITH" } ] ]
                                },
                                { "prim": "DIG", "args": [ { "int": "2" } ] },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "3" } ] },
                                { "prim": "CAR" },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "SWAP" },
                                { "prim": "DUP" },
                                { "prim": "CDR" },
                                { "prim": "SWAP" },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "3" } ] },
                                { "prim": "CAR" },
                                { "prim": "PAIR" },
                                { "prim": "MEM" },
                                {
                                  "prim": "IF",
                                  "args": [
                                    [
                                      { "prim": "DIG", "args": [ { "int": "2" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "3" } ] },
                                      { "prim": "CAR" },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "3" } ] },
                                      { "prim": "CAR" },
                                      { "prim": "PAIR" },
                                      { "prim": "GET" },
                                      { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "557" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR", "annots": [ "%request", "%balance" ] }
                                    ],
                                    [
                                      { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "0" } ] },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR", "annots": [ "%request", "%balance" ] }
                                    ]
                                  ]
                                }
                              ]
                            ]
                          },
                          { "prim": "NIL", "args": [ { "prim": "operation" } ] },
                          { "prim": "DIG", "args": [ { "int": "2" } ] },
                          { "prim": "CDR" },
                          { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] },
                          { "prim": "DIG", "args": [ { "int": "3" } ] },
                          { "prim": "TRANSFER_TOKENS" },
                          { "prim": "CONS" }
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
                          { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
                          { "prim": "ADD" },
                          { "prim": "SWAP" },
                          { "prim": "PAIR" },
                          { "prim": "SWAP" },
                          { "prim": "PAIR" },
                          { "prim": "PAIR" },
                          { "prim": "SWAP" },
                          { "prim": "PAIR" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          { "prim": "SENDER" },
                          { "prim": "MEM" },
                          { "prim": "IF", "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "659" } ] }, { "prim": "FAILWITH" } ] ] },
                          { "prim": "DUP" },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
                          { "prim": "COMPARE" },
                          { "prim": "EQ" },
                          {
                            "prim": "IF",
                            "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "NFT-asset: amount <> 1" } ] }, { "prim": "FAILWITH" } ] ]
                          },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "3" } ] },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          { "prim": "MEM" },
                          {
                            "prim": "IF",
                            "args": [
                              [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "NFT-asset: cannot mint twice same token" } ] }, { "prim": "FAILWITH" } ],
                              []
                            ]
                          },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "3" } ] },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          { "prim": "MEM" },
                          {
                            "prim": "IF",
                            "args": [
                              [],
                              [
                                { "prim": "SWAP" },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "2" } ] },
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
                                { "prim": "DIG", "args": [ { "int": "7" } ] },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "UPDATE" },
                                { "prim": "SWAP" },
                                { "prim": "PAIR" },
                                { "prim": "SWAP" },
                                { "prim": "PAIR" },
                                { "prim": "PAIR" },
                                { "prim": "PAIR" },
                                { "prim": "SWAP" }
                              ]
                            ]
                          },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "3" } ] },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          { "prim": "DIG", "args": [ { "int": "2" } ] },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "3" } ] },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "PAIR" },
                          { "prim": "MEM" },
                          {
                            "prim": "IF",
                            "args": [
                              [
                                { "prim": "SWAP" },
                                { "prim": "DUP" },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "SWAP" },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "3" } ] },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "MEM" },
                                { "prim": "NOT" }
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
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "SWAP" },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "3" } ] },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "MEM" },
                                {
                                  "prim": "IF",
                                  "args": [
                                    [],
                                    [
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
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
                                      { "prim": "CAR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "DIG", "args": [ { "int": "6" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "7" } ] },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "PAIR" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "GET" },
                                      {
                                        "prim": "IF_NONE",
                                        "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "673" } ] }, { "prim": "FAILWITH" } ], [ { "prim": "DROP" } ] ]
                                      },
                                      { "prim": "DIG", "args": [ { "int": "5" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "6" } ] },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "DIG", "args": [ { "int": "7" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "DIG", "args": [ { "int": "8" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "9" } ] },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "PAIR" },
                                      { "prim": "GET" },
                                      { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "673" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                      { "prim": "ADD" },
                                      { "prim": "SOME" },
                                      { "prim": "SWAP" },
                                      { "prim": "UPDATE" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" }
                                    ]
                                  ]
                                }
                              ],
                              [
                                { "prim": "SWAP" },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "2" } ] },
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
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "DIG", "args": [ { "int": "5" } ] },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "6" } ] },
                                { "prim": "CAR" },
                                { "prim": "CAR" },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "PAIR" },
                                { "prim": "DIG", "args": [ { "int": "5" } ] },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "6" } ] },
                                { "prim": "CAR" },
                                { "prim": "CAR" },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "SOME" },
                                { "prim": "SWAP" },
                                { "prim": "UPDATE" },
                                { "prim": "PAIR" },
                                { "prim": "SWAP" },
                                { "prim": "PAIR" },
                                { "prim": "PAIR" },
                                { "prim": "SWAP" }
                              ]
                            ]
                          },
                          { "prim": "DUP" },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          {
                            "prim": "CONTRACT",
                            "args": [ { "prim": "pair", "args": [ { "prim": "nat", "annots": [ "%tokenId" ] }, { "prim": "string", "annots": [ "%tokenSymbol" ] } ] } ],
                            "annots": [ "%updateTokenId" ]
                          },
                          { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "678" } ] }, { "prim": "FAILWITH" } ], [] ] },
                          { "prim": "NIL", "args": [ { "prim": "operation" } ] },
                          { "prim": "SWAP" },
                          { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] },
                          { "prim": "DIG", "args": [ { "int": "3" } ] },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "4" } ] },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "DIG", "args": [ { "int": "5" } ] },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "6" } ] },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          { "prim": "PAIR", "annots": [ "%tokenId", "%tokenSymbol" ] },
                          { "prim": "TRANSFER_TOKENS" },
                          { "prim": "CONS" },
                          { "prim": "DIG", "args": [ { "int": "2" } ] },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "3" } ] },
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
                          { "prim": "DIG", "args": [ { "int": "7" } ] },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "8" } ] },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          {
                            "prim": "PUSH",
                            "args": [
                              {
                                "prim": "pair",
                                "args": [
                                  { "prim": "string", "annots": [ "%name" ] },
                                  {
                                    "prim": "pair",
                                    "args": [
                                      { "prim": "nat", "annots": [ "%decimals" ] },
                                      { "prim": "map", "args": [ { "prim": "string" }, { "prim": "string" } ], "annots": [ "%extras" ] }
                                    ]
                                  }
                                ]
                              },
                              { "prim": "Pair", "args": [ { "string": "" }, { "prim": "Pair", "args": [ { "int": "0" }, [] ] } ] }
                            ]
                          },
                          { "prim": "DIG", "args": [ { "int": "8" } ] },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "9" } ] },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "PAIR", "annots": [ "%symbol" ] },
                          { "prim": "DIG", "args": [ { "int": "9" } ] },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          { "prim": "PAIR", "annots": [ "%token_id" ] },
                          { "prim": "SOME" },
                          { "prim": "SWAP" },
                          { "prim": "UPDATE" },
                          { "prim": "PAIR" },
                          { "prim": "SWAP" },
                          { "prim": "PAIR" },
                          { "prim": "SWAP" },
                          { "prim": "PAIR" },
                          { "prim": "SWAP" },
                          { "prim": "PAIR" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "3" } ] },
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
                          { "prim": "DIG", "args": [ { "int": "7" } ] },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          {
                            "prim": "NIL",
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
                                          { "prim": "pair", "args": [ { "prim": "string", "annots": [ "%groupId" ] }, { "prim": "timestamp", "annots": [ "%issueDateTime" ] } ] }
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
                          },
                          { "prim": "DIG", "args": [ { "int": "8" } ] },
                          { "prim": "DUP" },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "10" } ] },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "PAIR", "annots": [ "%toAlias", "%url" ] },
                          { "prim": "DIG", "args": [ { "int": "9" } ] },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "10" } ] },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "PAIR", "annots": [ "%to" ] },
                          { "prim": "DIG", "args": [ { "int": "9" } ] },
                          { "prim": "DUP" },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "11" } ] },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "PAIR", "annots": [ "%signatures_hashed", "%state" ] },
                          { "prim": "DIG", "args": [ { "int": "10" } ] },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "11" } ] },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "PAIR", "annots": [ "%oracleContract" ] },
                          { "prim": "PAIR" },
                          { "prim": "DIG", "args": [ { "int": "9" } ] },
                          { "prim": "DUP" },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "11" } ] },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          { "prim": "PAIR", "annots": [ "%groupId", "%issueDateTime" ] },
                          { "prim": "DIG", "args": [ { "int": "10" } ] },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "11" } ] },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "PAIR", "annots": [ "%authoritiesAlias" ] },
                          { "prim": "DIG", "args": [ { "int": "10" } ] },
                          { "prim": "DUP" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "12" } ] },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "PAIR", "annots": [ "%assetType", "%authorities" ] },
                          { "prim": "DIG", "args": [ { "int": "11" } ] },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "12" } ] },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "PAIR", "annots": [ "%_hash" ] },
                          { "prim": "PAIR" },
                          { "prim": "PAIR" },
                          { "prim": "CONS" },
                          { "prim": "SOME" },
                          { "prim": "SWAP" },
                          { "prim": "UPDATE" },
                          { "prim": "PAIR" },
                          { "prim": "PAIR" },
                          { "prim": "SWAP" },
                          { "prim": "PAIR" },
                          { "prim": "SWAP" },
                          { "prim": "PAIR" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "3" } ] },
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
                          { "prim": "DIG", "args": [ { "int": "6" } ] },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "DIG", "args": [ { "int": "7" } ] },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "CDR" },
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
                                { "prim": "IF", "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "623" } ] }, { "prim": "FAILWITH" } ] ] },
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
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "SENDER" },
                                { "prim": "COMPARE" },
                                { "prim": "EQ" },
                                { "prim": "IF", "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "633" } ] }, { "prim": "FAILWITH" } ] ] },
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
                                { "prim": "CDR" },
                                { "prim": "DIG", "args": [ { "int": "4" } ] },
                                { "prim": "PAIR" },
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
                    {
                      "prim": "IF_LEFT",
                      "args": [
                        [
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "IF", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "761" } ] }, { "prim": "FAILWITH" } ], [] ] },
                          { "prim": "DUP" },
                          { "prim": "CDR" },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                          { "prim": "CAR" },
                          {
                            "prim": "MAP",
                            "args": [
                              [
                                { "prim": "DIG", "args": [ { "int": "3" } ] },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "4" } ] },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "SWAP" },
                                { "prim": "GET" },
                                { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "772" } ] }, { "prim": "FAILWITH" } ], [] ] }
                              ]
                            ]
                          },
                          { "prim": "DIG", "args": [ { "int": "2" } ] },
                          { "prim": "DROP" },
                          { "prim": "EXEC" },
                          { "prim": "DROP" },
                          { "prim": "NIL", "args": [ { "prim": "operation" } ] }
                        ],
                        [
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "IF", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "578" } ] }, { "prim": "FAILWITH" } ], [] ] },
                          { "prim": "NIL", "args": [ { "prim": "operation" } ] },
                          { "prim": "SWAP" },
                          { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] },
                          { "prim": "SELF" },
                          { "prim": "ADDRESS" },
                          { "prim": "TRANSFER_TOKENS" },
                          { "prim": "CONS" }
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
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "CAR" },
                          { "prim": "IF", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "505" } ] }, { "prim": "FAILWITH" } ], [] ] },
                          { "prim": "DUP" },
                          {
                            "prim": "ITER",
                            "args": [
                              [
                                { "prim": "DUP" },
                                { "prim": "CDR" },
                                {
                                  "prim": "ITER",
                                  "args": [
                                    [
                                      { "prim": "DIG", "args": [ { "int": "3" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "4" } ] },
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
                                          [ { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] } ],
                                          [
                                            { "prim": "SENDER" },
                                            { "prim": "DIG", "args": [ { "int": "2" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "3" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "COMPARE" },
                                            { "prim": "EQ" }
                                          ]
                                        ]
                                      },
                                      {
                                        "prim": "IF",
                                        "args": [
                                          [ { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] } ],
                                          [
                                            { "prim": "DIG", "args": [ { "int": "3" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "4" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "SENDER" },
                                            { "prim": "PAIR", "annots": [ "%operator", "%token_id" ] },
                                            { "prim": "DIG", "args": [ { "int": "3" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "4" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "PAIR", "annots": [ "%owner" ] },
                                            { "prim": "MEM" }
                                          ]
                                        ]
                                      },
                                      {
                                        "prim": "IF",
                                        "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_NOT_OPERATOR" } ] }, { "prim": "FAILWITH" } ] ]
                                      },
                                      { "prim": "DIG", "args": [ { "int": "3" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "4" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "MEM" },
                                      {
                                        "prim": "IF",
                                        "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_TOKEN_UNDEFINED" } ] }, { "prim": "FAILWITH" } ] ]
                                      },
                                      { "prim": "DUP" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "0" } ] },
                                      { "prim": "COMPARE" },
                                      { "prim": "LT" },
                                      {
                                        "prim": "IF",
                                        "args": [
                                          [
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "DIG", "args": [ { "int": "4" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "5" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "DIG", "args": [ { "int": "2" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "3" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "DIG", "args": [ { "int": "4" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "5" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "PAIR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "532" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "COMPARE" },
                                            { "prim": "GE" },
                                            {
                                              "prim": "IF",
                                              "args": [
                                                [],
                                                [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_INSUFFICIENT_BALANCE" } ] }, { "prim": "FAILWITH" } ]
                                              ]
                                            },
                                            { "prim": "DIG", "args": [ { "int": "3" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "4" } ] },
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
                                            { "prim": "DIG", "args": [ { "int": "5" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "6" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "DIG", "args": [ { "int": "7" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "8" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "PAIR" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "GET" },
                                            {
                                              "prim": "IF_NONE",
                                              "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "536" } ] }, { "prim": "FAILWITH" } ], [ { "prim": "DROP" } ] ]
                                            },
                                            { "prim": "DIG", "args": [ { "int": "5" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "6" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "DIG", "args": [ { "int": "9" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "DIG", "args": [ { "int": "7" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "8" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "DIG", "args": [ { "int": "9" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "10" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "PAIR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "536" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "SUB" },
                                            { "prim": "ISNAT" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "536" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "SOME" },
                                            { "prim": "SWAP" },
                                            { "prim": "UPDATE" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "PAIR" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "4" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "3" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "PAIR" },
                                            { "prim": "MEM" },
                                            {
                                              "prim": "IF",
                                              "args": [
                                                [
                                                  { "prim": "DIG", "args": [ { "int": "3" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "4" } ] },
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
                                                  { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                  { "prim": "CAR" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                                  { "prim": "GET" },
                                                  {
                                                    "prim": "IF_NONE",
                                                    "args": [
                                                      [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "539" } ] }, { "prim": "FAILWITH" } ],
                                                      [ { "prim": "DROP" } ]
                                                    ]
                                                  },
                                                  { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                  { "prim": "CDR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "DIG", "args": [ { "int": "9" } ] },
                                                  { "prim": "CAR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "CAR" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "GET" },
                                                  {
                                                    "prim": "IF_NONE",
                                                    "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "539" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                  },
                                                  { "prim": "ADD" },
                                                  { "prim": "SOME" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "UPDATE" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] }
                                                ],
                                                [
                                                  { "prim": "DIG", "args": [ { "int": "3" } ] },
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
                                                  { "prim": "DIG", "args": [ { "int": "4" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                  { "prim": "CAR" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                  { "prim": "CDR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "SOME" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "UPDATE" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] }
                                                ]
                                              ]
                                            }
                                          ],
                                          [ { "prim": "DROP" } ]
                                        ]
                                      }
                                    ]
                                  ]
                                },
                                { "prim": "DROP" }
                              ]
                            ]
                          },
                          { "prim": "DROP" }
                        ],
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
                                { "prim": "CDR" },
                                { "prim": "SENDER" },
                                { "prim": "MEM" },
                                { "prim": "IF", "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "727" } ] }, { "prim": "FAILWITH" } ] ] },
                                { "prim": "DUP" },
                                { "prim": "CAR" },
                                { "prim": "CAR" },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
                                { "prim": "COMPARE" },
                                { "prim": "EQ" },
                                {
                                  "prim": "IF",
                                  "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "NFT-asset: amount <> 1" } ] }, { "prim": "FAILWITH" } ] ]
                                },
                                { "prim": "SWAP" },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "2" } ] },
                                { "prim": "CAR" },
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
                                { "prim": "MEM" },
                                {
                                  "prim": "IF",
                                  "args": [
                                    [],
                                    [
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
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CDR" },
                                      { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] },
                                      { "prim": "DIG", "args": [ { "int": "6" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "7" } ] },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "UPDATE" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "PAIR" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" }
                                    ]
                                  ]
                                },
                                { "prim": "SWAP" },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "2" } ] },
                                { "prim": "CAR" },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "SWAP" },
                                { "prim": "DUP" },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "SWAP" },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "3" } ] },
                                { "prim": "CAR" },
                                { "prim": "CAR" },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "PAIR" },
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
                                      { "prim": "NOT" }
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
                                      { "prim": "CDR" },
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
                                          [],
                                          [
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
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
                                            { "prim": "DIG", "args": [ { "int": "5" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "7" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "PAIR" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "GET" },
                                            {
                                              "prim": "IF_NONE",
                                              "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "738" } ] }, { "prim": "FAILWITH" } ], [ { "prim": "DROP" } ] ]
                                            },
                                            { "prim": "DIG", "args": [ { "int": "5" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "6" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "DIG", "args": [ { "int": "7" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "DIG", "args": [ { "int": "7" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "9" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "PAIR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "738" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "ADD" },
                                            { "prim": "SOME" },
                                            { "prim": "SWAP" },
                                            { "prim": "UPDATE" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" }
                                          ]
                                        ]
                                      }
                                    ],
                                    [
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
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "CAR" },
                                      { "prim": "DIG", "args": [ { "int": "4" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "6" } ] },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "CDR" },
                                      { "prim": "CAR" },
                                      { "prim": "PAIR" },
                                      { "prim": "DIG", "args": [ { "int": "5" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "6" } ] },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "CDR" },
                                      { "prim": "CDR" },
                                      { "prim": "SOME" },
                                      { "prim": "SWAP" },
                                      { "prim": "UPDATE" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" }
                                    ]
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
                                { "prim": "DUG", "args": [ { "int": "6" } ] },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "DIG", "args": [ { "int": "7" } ] },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "CAR" },
                                { "prim": "DIG", "args": [ { "int": "7" } ] },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "8" } ] },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "GET" },
                                { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "742" } ] }, { "prim": "FAILWITH" } ], [] ] },
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
                                { "prim": "CDR" },
                                { "prim": "PAIR", "annots": [ "%toAlias", "%url" ] },
                                { "prim": "DIG", "args": [ { "int": "8" } ] },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "9" } ] },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "CAR" },
                                { "prim": "PAIR", "annots": [ "%to" ] },
                                { "prim": "DIG", "args": [ { "int": "8" } ] },
                                { "prim": "DUP" },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "SWAP" },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "10" } ] },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "PAIR", "annots": [ "%signatures_hashed", "%state" ] },
                                { "prim": "DIG", "args": [ { "int": "9" } ] },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "10" } ] },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "CAR" },
                                { "prim": "CDR" },
                                { "prim": "PAIR", "annots": [ "%oracleContract" ] },
                                { "prim": "PAIR" },
                                { "prim": "DIG", "args": [ { "int": "8" } ] },
                                { "prim": "DUP" },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "CAR" },
                                { "prim": "CAR" },
                                { "prim": "SWAP" },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "10" } ] },
                                { "prim": "CAR" },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "PAIR", "annots": [ "%groupId", "%issueDateTime" ] },
                                { "prim": "DIG", "args": [ { "int": "9" } ] },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "10" } ] },
                                { "prim": "CAR" },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "PAIR", "annots": [ "%authoritiesAlias" ] },
                                { "prim": "DIG", "args": [ { "int": "9" } ] },
                                { "prim": "DUP" },
                                { "prim": "CAR" },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "CDR" },
                                { "prim": "SWAP" },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "11" } ] },
                                { "prim": "CAR" },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "CAR" },
                                { "prim": "PAIR", "annots": [ "%assetType", "%authorities" ] },
                                { "prim": "DIG", "args": [ { "int": "10" } ] },
                                { "prim": "CAR" },
                                { "prim": "CAR" },
                                { "prim": "CAR" },
                                { "prim": "PAIR", "annots": [ "%_hash" ] },
                                { "prim": "PAIR" },
                                { "prim": "PAIR" },
                                { "prim": "CONS" },
                                { "prim": "SOME" },
                                { "prim": "SWAP" },
                                { "prim": "UPDATE" },
                                { "prim": "PAIR" },
                                { "prim": "PAIR" },
                                { "prim": "SWAP" },
                                { "prim": "PAIR" },
                                { "prim": "SWAP" },
                                { "prim": "PAIR" }
                              ],
                              [
                                { "prim": "DUP" },
                                {
                                  "prim": "ITER",
                                  "args": [
                                    [
                                      {
                                        "prim": "IF_LEFT",
                                        "args": [
                                          [
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SENDER" },
                                            { "prim": "COMPARE" },
                                            { "prim": "EQ" },
                                            {
                                              "prim": "IF",
                                              "args": [
                                                [ { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] } ],
                                                [
                                                  { "prim": "DIG", "args": [ { "int": "2" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "3" } ] },
                                                  { "prim": "CAR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "SENDER" },
                                                  { "prim": "COMPARE" },
                                                  { "prim": "EQ" }
                                                ]
                                              ]
                                            },
                                            { "prim": "IF", "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "592" } ] }, { "prim": "FAILWITH" } ] ] },
                                            { "prim": "DIG", "args": [ { "int": "2" } ] },
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
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "7" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "PAIR", "annots": [ "%operator", "%token_id" ] },
                                            { "prim": "DIG", "args": [ { "int": "6" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "PAIR", "annots": [ "%owner" ] },
                                            {
                                              "prim": "PUSH",
                                              "args": [ { "prim": "option", "args": [ { "prim": "unit" } ] }, { "prim": "Some", "args": [ { "prim": "Unit" } ] } ]
                                            },
                                            { "prim": "SWAP" },
                                            { "prim": "UPDATE" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" }
                                          ],
                                          [
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SENDER" },
                                            { "prim": "COMPARE" },
                                            { "prim": "EQ" },
                                            {
                                              "prim": "IF",
                                              "args": [
                                                [ { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] } ],
                                                [
                                                  { "prim": "DIG", "args": [ { "int": "2" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "3" } ] },
                                                  { "prim": "CAR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "SENDER" },
                                                  { "prim": "COMPARE" },
                                                  { "prim": "EQ" }
                                                ]
                                              ]
                                            },
                                            { "prim": "IF", "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "599" } ] }, { "prim": "FAILWITH" } ] ] },
                                            { "prim": "DIG", "args": [ { "int": "2" } ] },
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
                                            { "prim": "NONE", "args": [ { "prim": "unit" } ] },
                                            { "prim": "DIG", "args": [ { "int": "6" } ] },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "8" } ] },
                                            { "prim": "CDR" },
                                            { "prim": "CAR" },
                                            { "prim": "PAIR", "annots": [ "%operator", "%token_id" ] },
                                            { "prim": "DIG", "args": [ { "int": "7" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "PAIR", "annots": [ "%owner" ] },
                                            { "prim": "UPDATE" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" }
                                          ]
                                        ]
                                      }
                                    ]
                                  ]
                                },
                                { "prim": "DROP" }
                              ]
                            ]
                          }
                        ]
                      ]
                    },
                    { "prim": "NIL", "args": [ { "prim": "operation" } ] }
                  ]
                ]
              }
            ]
          ]
        },
        { "prim": "PAIR" }
      ]
    ]
  }
]