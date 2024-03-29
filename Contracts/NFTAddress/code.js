export default [
  {
    prim: "storage",
    args: [
      {
        prim: "pair",
        args: [
          {
            prim: "pair",
            args: [
              {
                prim: "pair",
                args: [
                  { prim: "key", annots: ["%adminPublicKey"] },
                  {
                    prim: "pair",
                    args: [
                      { prim: "address", annots: ["%administrator"] },
                      { prim: "nat", annots: ["%all_tokens"] },
                    ],
                  },
                ],
              },
              {
                prim: "pair",
                args: [
                  {
                    prim: "big_map",
                    args: [
                      {
                        prim: "pair",
                        args: [{ prim: "address" }, { prim: "nat" }],
                      },
                      { prim: "nat" },
                    ],
                    annots: ["%ledger"],
                  },
                  {
                    prim: "pair",
                    args: [
                      {
                        prim: "big_map",
                        args: [{ prim: "string" }, { prim: "bytes" }],
                        annots: ["%metadata"],
                      },
                      {
                        prim: "big_map",
                        args: [
                          {
                            prim: "pair",
                            args: [
                              { prim: "address", annots: ["%owner"] },
                              {
                                prim: "pair",
                                args: [
                                  { prim: "address", annots: ["%operator"] },
                                  { prim: "nat", annots: ["%token_id"] },
                                ],
                              },
                            ],
                          },
                          { prim: "unit" },
                        ],
                        annots: ["%operators"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            prim: "pair",
            args: [
              {
                prim: "pair",
                args: [
                  { prim: "address", annots: ["%oracleFactoryAddress"] },
                  {
                    prim: "pair",
                    args: [
                      { prim: "bool", annots: ["%paused"] },
                      { prim: "nat", annots: ["%tokenCount"] },
                    ],
                  },
                ],
              },
              {
                prim: "pair",
                args: [
                  {
                    prim: "big_map",
                    args: [
                      { prim: "nat" },
                      {
                        prim: "pair",
                        args: [
                          { prim: "nat", annots: ["%token_id"] },
                          {
                            prim: "map",
                            args: [{ prim: "string" }, { prim: "bytes" }],
                            annots: ["%token_info"],
                          },
                        ],
                      },
                    ],
                    annots: ["%token_metadata"],
                  },
                  {
                    prim: "pair",
                    args: [
                      {
                        prim: "big_map",
                        args: [{ prim: "nat" }, { prim: "nat" }],
                        annots: ["%total_supply"],
                      },
                      {
                        prim: "set",
                        args: [{ prim: "address" }],
                        annots: ["%whitelist"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    prim: "parameter",
    args: [
      {
        prim: "or",
        args: [
          {
            prim: "or",
            args: [
              {
                prim: "or",
                args: [
                  { prim: "address", annots: ["%addAccountToWLByAdmin"] },
                  {
                    prim: "or",
                    args: [
                      { prim: "address", annots: ["%addAccountToWhitelist"] },
                      {
                        prim: "pair",
                        args: [
                          {
                            prim: "list",
                            args: [
                              {
                                prim: "pair",
                                args: [
                                  { prim: "address", annots: ["%owner"] },
                                  { prim: "nat", annots: ["%token_id"] },
                                ],
                              },
                            ],
                            annots: ["%requests"],
                          },
                          {
                            prim: "contract",
                            args: [
                              {
                                prim: "list",
                                args: [
                                  {
                                    prim: "pair",
                                    args: [
                                      {
                                        prim: "pair",
                                        args: [
                                          {
                                            prim: "address",
                                            annots: ["%owner"],
                                          },
                                          {
                                            prim: "nat",
                                            annots: ["%token_id"],
                                          },
                                        ],
                                        annots: ["%request"],
                                      },
                                      { prim: "nat", annots: ["%balance"] },
                                    ],
                                  },
                                ],
                              },
                            ],
                            annots: ["%callback"],
                          },
                        ],
                        annots: ["%balance_of"],
                      },
                    ],
                  },
                ],
              },
              {
                prim: "or",
                args: [
                  {
                    prim: "pair",
                    args: [
                      {
                        prim: "pair",
                        args: [
                          { prim: "bytes", annots: ["%_hash"] },
                          {
                            prim: "pair",
                            args: [
                              { prim: "address", annots: ["%address"] },
                              { prim: "nat", annots: ["%amount"] },
                            ],
                          },
                        ],
                      },
                      {
                        prim: "pair",
                        args: [
                          {
                            prim: "map",
                            args: [{ prim: "string" }, { prim: "bytes" }],
                            annots: ["%metadata"],
                          },
                          {
                            prim: "pair",
                            args: [
                              { prim: "address", annots: ["%oracleContract"] },
                              { prim: "string", annots: ["%tokenSymbol"] },
                            ],
                          },
                        ],
                      },
                    ],
                    annots: ["%mint"],
                  },
                  {
                    prim: "or",
                    args: [
                      {
                        prim: "address",
                        annots: ["%removeAccountFromWLByAdmin"],
                      },
                      { prim: "address", annots: ["%set_administrator"] },
                    ],
                  },
                ],
              },
            ],
          },
          {
            prim: "or",
            args: [
              {
                prim: "or",
                args: [
                  {
                    prim: "pair",
                    args: [
                      { prim: "string", annots: ["%k"] },
                      { prim: "bytes", annots: ["%v"] },
                    ],
                    annots: ["%set_metadata"],
                  },
                  {
                    prim: "or",
                    args: [
                      { prim: "bool", annots: ["%set_pause"] },
                      {
                        prim: "list",
                        args: [
                          {
                            prim: "pair",
                            args: [
                              { prim: "address", annots: ["%from_"] },
                              {
                                prim: "list",
                                args: [
                                  {
                                    prim: "pair",
                                    args: [
                                      { prim: "address", annots: ["%to_"] },
                                      {
                                        prim: "pair",
                                        args: [
                                          {
                                            prim: "nat",
                                            annots: ["%token_id"],
                                          },
                                          { prim: "nat", annots: ["%amount"] },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                                annots: ["%txs"],
                              },
                            ],
                          },
                        ],
                        annots: ["%transfer"],
                      },
                    ],
                  },
                ],
              },
              {
                prim: "or",
                args: [
                  {
                    prim: "pair",
                    args: [
                      {
                        prim: "map",
                        args: [{ prim: "string" }, { prim: "bytes" }],
                        annots: ["%metadata"],
                      },
                      { prim: "nat", annots: ["%token_id"] },
                    ],
                    annots: ["%update"],
                  },
                  {
                    prim: "or",
                    args: [
                      { prim: "address", annots: ["%updateFactoryAddress"] },
                      {
                        prim: "list",
                        args: [
                          {
                            prim: "or",
                            args: [
                              {
                                prim: "pair",
                                args: [
                                  { prim: "address", annots: ["%owner"] },
                                  {
                                    prim: "pair",
                                    args: [
                                      {
                                        prim: "address",
                                        annots: ["%operator"],
                                      },
                                      { prim: "nat", annots: ["%token_id"] },
                                    ],
                                  },
                                ],
                                annots: ["%add_operator"],
                              },
                              {
                                prim: "pair",
                                args: [
                                  { prim: "address", annots: ["%owner"] },
                                  {
                                    prim: "pair",
                                    args: [
                                      {
                                        prim: "address",
                                        annots: ["%operator"],
                                      },
                                      { prim: "nat", annots: ["%token_id"] },
                                    ],
                                  },
                                ],
                                annots: ["%remove_operator"],
                              },
                            ],
                          },
                        ],
                        annots: ["%update_operators"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    prim: "code",
    args: [
      [
        {
          prim: "CAST",
          args: [
            {
              prim: "pair",
              args: [
                {
                  prim: "or",
                  args: [
                    {
                      prim: "or",
                      args: [
                        {
                          prim: "or",
                          args: [
                            { prim: "address" },
                            {
                              prim: "or",
                              args: [
                                { prim: "address" },
                                {
                                  prim: "pair",
                                  args: [
                                    {
                                      prim: "list",
                                      args: [
                                        {
                                          prim: "pair",
                                          args: [
                                            { prim: "address" },
                                            { prim: "nat" },
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      prim: "contract",
                                      args: [
                                        {
                                          prim: "list",
                                          args: [
                                            {
                                              prim: "pair",
                                              args: [
                                                {
                                                  prim: "pair",
                                                  args: [
                                                    { prim: "address" },
                                                    { prim: "nat" },
                                                  ],
                                                },
                                                { prim: "nat" },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          prim: "or",
                          args: [
                            {
                              prim: "pair",
                              args: [
                                {
                                  prim: "pair",
                                  args: [
                                    { prim: "bytes" },
                                    {
                                      prim: "pair",
                                      args: [
                                        { prim: "address" },
                                        { prim: "nat" },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  prim: "pair",
                                  args: [
                                    {
                                      prim: "map",
                                      args: [
                                        { prim: "string" },
                                        { prim: "bytes" },
                                      ],
                                    },
                                    {
                                      prim: "pair",
                                      args: [
                                        { prim: "address" },
                                        { prim: "string" },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              prim: "or",
                              args: [{ prim: "address" }, { prim: "address" }],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      prim: "or",
                      args: [
                        {
                          prim: "or",
                          args: [
                            {
                              prim: "pair",
                              args: [{ prim: "string" }, { prim: "bytes" }],
                            },
                            {
                              prim: "or",
                              args: [
                                { prim: "bool" },
                                {
                                  prim: "list",
                                  args: [
                                    {
                                      prim: "pair",
                                      args: [
                                        { prim: "address" },
                                        {
                                          prim: "list",
                                          args: [
                                            {
                                              prim: "pair",
                                              args: [
                                                { prim: "address" },
                                                {
                                                  prim: "pair",
                                                  args: [
                                                    { prim: "nat" },
                                                    { prim: "nat" },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          prim: "or",
                          args: [
                            {
                              prim: "pair",
                              args: [
                                {
                                  prim: "map",
                                  args: [{ prim: "string" }, { prim: "bytes" }],
                                },
                                { prim: "nat" },
                              ],
                            },
                            {
                              prim: "or",
                              args: [
                                { prim: "address" },
                                {
                                  prim: "list",
                                  args: [
                                    {
                                      prim: "or",
                                      args: [
                                        {
                                          prim: "pair",
                                          args: [
                                            { prim: "address" },
                                            {
                                              prim: "pair",
                                              args: [
                                                { prim: "address" },
                                                { prim: "nat" },
                                              ],
                                            },
                                          ],
                                        },
                                        {
                                          prim: "pair",
                                          args: [
                                            { prim: "address" },
                                            {
                                              prim: "pair",
                                              args: [
                                                { prim: "address" },
                                                { prim: "nat" },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  prim: "pair",
                  args: [
                    {
                      prim: "pair",
                      args: [
                        {
                          prim: "pair",
                          args: [
                            { prim: "key" },
                            {
                              prim: "pair",
                              args: [{ prim: "address" }, { prim: "nat" }],
                            },
                          ],
                        },
                        {
                          prim: "pair",
                          args: [
                            {
                              prim: "big_map",
                              args: [
                                {
                                  prim: "pair",
                                  args: [{ prim: "address" }, { prim: "nat" }],
                                },
                                { prim: "nat" },
                              ],
                            },
                            {
                              prim: "pair",
                              args: [
                                {
                                  prim: "big_map",
                                  args: [{ prim: "string" }, { prim: "bytes" }],
                                },
                                {
                                  prim: "big_map",
                                  args: [
                                    {
                                      prim: "pair",
                                      args: [
                                        { prim: "address" },
                                        {
                                          prim: "pair",
                                          args: [
                                            { prim: "address" },
                                            { prim: "nat" },
                                          ],
                                        },
                                      ],
                                    },
                                    { prim: "unit" },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      prim: "pair",
                      args: [
                        {
                          prim: "pair",
                          args: [
                            { prim: "address" },
                            {
                              prim: "pair",
                              args: [{ prim: "bool" }, { prim: "nat" }],
                            },
                          ],
                        },
                        {
                          prim: "pair",
                          args: [
                            {
                              prim: "big_map",
                              args: [
                                { prim: "nat" },
                                {
                                  prim: "pair",
                                  args: [
                                    { prim: "nat" },
                                    {
                                      prim: "map",
                                      args: [
                                        { prim: "string" },
                                        { prim: "bytes" },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              prim: "pair",
                              args: [
                                {
                                  prim: "big_map",
                                  args: [{ prim: "nat" }, { prim: "nat" }],
                                },
                                { prim: "set", args: [{ prim: "address" }] },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        { prim: "UNPAIR" },
        {
          prim: "IF_LEFT",
          args: [
            [
              {
                prim: "IF_LEFT",
                args: [
                  [
                    {
                      prim: "IF_LEFT",
                      args: [
                        [
                          { prim: "SWAP" },
                          { prim: "DUP" },
                          { prim: "DUG", args: [{ int: "2" }] },
                          { prim: "CAR" },
                          { prim: "CAR" },
                          { prim: "GET", args: [{ int: "3" }] },
                          { prim: "SENDER" },
                          { prim: "COMPARE" },
                          { prim: "EQ" },
                          {
                            prim: "IF",
                            args: [
                              [],
                              [
                                {
                                  prim: "PUSH",
                                  args: [
                                    { prim: "string" },
                                    { string: "FA2_NOT_ADMIN" },
                                  ],
                                },
                                { prim: "FAILWITH" },
                              ],
                            ],
                          },
                          { prim: "SWAP" },
                          { prim: "DUP" },
                          { prim: "GET", args: [{ int: "8" }] },
                          {
                            prim: "PUSH",
                            args: [{ prim: "bool" }, { prim: "True" }],
                          },
                          { prim: "DIG", args: [{ int: "3" }] },
                          { prim: "UPDATE" },
                          { prim: "UPDATE", args: [{ int: "8" }] },
                          { prim: "NIL", args: [{ prim: "operation" }] },
                        ],
                        [
                          {
                            prim: "IF_LEFT",
                            args: [
                              [
                                { prim: "SENDER" },
                                { prim: "DUP", args: [{ int: "3" }] },
                                { prim: "GET", args: [{ int: "3" }] },
                                { prim: "CAR" },
                                { prim: "COMPARE" },
                                { prim: "EQ" },
                                {
                                  prim: "IF",
                                  args: [
                                    [],
                                    [
                                      {
                                        prim: "PUSH",
                                        args: [{ prim: "int" }, { int: "663" }],
                                      },
                                      { prim: "FAILWITH" },
                                    ],
                                  ],
                                },
                                { prim: "SWAP" },
                                { prim: "DUP" },
                                { prim: "GET", args: [{ int: "8" }] },
                                {
                                  prim: "PUSH",
                                  args: [{ prim: "bool" }, { prim: "True" }],
                                },
                                { prim: "DIG", args: [{ int: "3" }] },
                                { prim: "UPDATE" },
                                { prim: "UPDATE", args: [{ int: "8" }] },
                                { prim: "NIL", args: [{ prim: "operation" }] },
                              ],
                              [
                                { prim: "SWAP" },
                                { prim: "DUP" },
                                { prim: "DUG", args: [{ int: "2" }] },
                                { prim: "GET", args: [{ int: "3" }] },
                                { prim: "GET", args: [{ int: "3" }] },
                                {
                                  prim: "IF",
                                  args: [
                                    [
                                      {
                                        prim: "PUSH",
                                        args: [
                                          { prim: "string" },
                                          { string: "FA2_PAUSED" },
                                        ],
                                      },
                                      { prim: "FAILWITH" },
                                    ],
                                    [],
                                  ],
                                },
                                { prim: "DUP" },
                                { prim: "CAR" },
                                {
                                  prim: "MAP",
                                  args: [
                                    [
                                      { prim: "DUP", args: [{ int: "3" }] },
                                      { prim: "GET", args: [{ int: "5" }] },
                                      { prim: "SWAP" },
                                      { prim: "DUP" },
                                      { prim: "DUG", args: [{ int: "2" }] },
                                      { prim: "CDR" },
                                      { prim: "MEM" },
                                      {
                                        prim: "IF",
                                        args: [
                                          [],
                                          [
                                            {
                                              prim: "PUSH",
                                              args: [
                                                { prim: "string" },
                                                {
                                                  string: "FA2_TOKEN_UNDEFINED",
                                                },
                                              ],
                                            },
                                            { prim: "FAILWITH" },
                                          ],
                                        ],
                                      },
                                      { prim: "DUP", args: [{ int: "3" }] },
                                      { prim: "CAR" },
                                      { prim: "GET", args: [{ int: "3" }] },
                                      { prim: "SWAP" },
                                      { prim: "DUP" },
                                      { prim: "CDR" },
                                      { prim: "SWAP" },
                                      { prim: "DUP" },
                                      { prim: "DUG", args: [{ int: "3" }] },
                                      { prim: "CAR" },
                                      { prim: "PAIR" },
                                      { prim: "MEM" },
                                      {
                                        prim: "IF",
                                        args: [
                                          [
                                            {
                                              prim: "DUP",
                                              args: [{ int: "3" }],
                                            },
                                            { prim: "CAR" },
                                            {
                                              prim: "GET",
                                              args: [{ int: "3" }],
                                            },
                                            { prim: "SWAP" },
                                            { prim: "DUP" },
                                            { prim: "CDR" },
                                            { prim: "SWAP" },
                                            { prim: "DUP" },
                                            {
                                              prim: "DUG",
                                              args: [{ int: "3" }],
                                            },
                                            { prim: "CAR" },
                                            { prim: "PAIR" },
                                            { prim: "GET" },
                                            {
                                              prim: "IF_NONE",
                                              args: [
                                                [
                                                  {
                                                    prim: "PUSH",
                                                    args: [
                                                      { prim: "int" },
                                                      { int: "469" },
                                                    ],
                                                  },
                                                  { prim: "FAILWITH" },
                                                ],
                                                [],
                                              ],
                                            },
                                            { prim: "SWAP" },
                                            { prim: "PAIR" },
                                          ],
                                          [
                                            {
                                              prim: "PUSH",
                                              args: [
                                                { prim: "nat" },
                                                { int: "0" },
                                              ],
                                            },
                                            { prim: "SWAP" },
                                            { prim: "PAIR" },
                                          ],
                                        ],
                                      },
                                    ],
                                  ],
                                },
                                { prim: "NIL", args: [{ prim: "operation" }] },
                                { prim: "DIG", args: [{ int: "2" }] },
                                { prim: "CDR" },
                                {
                                  prim: "PUSH",
                                  args: [{ prim: "mutez" }, { int: "0" }],
                                },
                                { prim: "DIG", args: [{ int: "3" }] },
                                { prim: "TRANSFER_TOKENS" },
                                { prim: "CONS" },
                              ],
                            ],
                          },
                        ],
                      ],
                    },
                  ],
                  [
                    {
                      prim: "IF_LEFT",
                      args: [
                        [
                          { prim: "SWAP" },
                          { prim: "DUP" },
                          { prim: "DUG", args: [{ int: "2" }] },
                          { prim: "GET", args: [{ int: "8" }] },
                          { prim: "SENDER" },
                          { prim: "MEM" },
                          {
                            prim: "IF",
                            args: [
                              [],
                              [
                                {
                                  prim: "PUSH",
                                  args: [{ prim: "int" }, { int: "581" }],
                                },
                                { prim: "FAILWITH" },
                              ],
                            ],
                          },
                          { prim: "SWAP" },
                          { prim: "DUP" },
                          { prim: "DUG", args: [{ int: "2" }] },
                          { prim: "UNPAIR" },
                          { prim: "UNPAIR" },
                          { prim: "UNPAIR" },
                          { prim: "SWAP" },
                          { prim: "CAR" },
                          { prim: "DUP", args: [{ int: "6" }] },
                          { prim: "CAR" },
                          { prim: "CAR" },
                          { prim: "GET", args: [{ int: "4" }] },
                          { prim: "DUP" },
                          {
                            prim: "PUSH",
                            args: [{ prim: "nat" }, { int: "1" }],
                          },
                          { prim: "DIG", args: [{ int: "8" }] },
                          { prim: "GET", args: [{ int: "3" }] },
                          { prim: "GET", args: [{ int: "4" }] },
                          { prim: "ADD" },
                          { prim: "DUP" },
                          { prim: "DUG", args: [{ int: "2" }] },
                          { prim: "COMPARE" },
                          { prim: "LE" },
                          {
                            prim: "IF",
                            args: [
                              [{ prim: "DROP" }],
                              [{ prim: "SWAP" }, { prim: "DROP" }],
                            ],
                          },
                          { prim: "SWAP" },
                          { prim: "PAIR" },
                          { prim: "SWAP" },
                          { prim: "PAIR" },
                          { prim: "PAIR" },
                          { prim: "PAIR" },
                          { prim: "DUP" },
                          { prim: "CAR" },
                          { prim: "GET", args: [{ int: "3" }] },
                          { prim: "SWAP" },
                          { prim: "DUP" },
                          { prim: "DUG", args: [{ int: "3" }] },
                          { prim: "GET", args: [{ int: "3" }] },
                          { prim: "GET", args: [{ int: "4" }] },
                          { prim: "DUP", args: [{ int: "3" }] },
                          { prim: "CAR" },
                          { prim: "GET", args: [{ int: "3" }] },
                          { prim: "PAIR" },
                          { prim: "MEM" },
                          {
                            prim: "IF",
                            args: [
                              [
                                { prim: "SWAP" },
                                { prim: "DUP" },
                                { prim: "DUG", args: [{ int: "2" }] },
                                { prim: "UNPAIR" },
                                { prim: "UNPAIR" },
                                { prim: "SWAP" },
                                { prim: "UNPAIR" },
                                { prim: "DUP" },
                                { prim: "DIG", args: [{ int: "6" }] },
                                { prim: "GET", args: [{ int: "3" }] },
                                { prim: "GET", args: [{ int: "4" }] },
                                { prim: "DUP", args: [{ int: "7" }] },
                                { prim: "CAR" },
                                { prim: "GET", args: [{ int: "3" }] },
                                { prim: "PAIR" },
                                { prim: "DUP" },
                                { prim: "DUG", args: [{ int: "2" }] },
                                { prim: "GET" },
                                {
                                  prim: "IF_NONE",
                                  args: [
                                    [
                                      {
                                        prim: "PUSH",
                                        args: [{ prim: "int" }, { int: "596" }],
                                      },
                                      { prim: "FAILWITH" },
                                    ],
                                    [],
                                  ],
                                },
                                { prim: "DUP", args: [{ int: "7" }] },
                                { prim: "CAR" },
                                { prim: "GET", args: [{ int: "4" }] },
                                { prim: "ADD" },
                                { prim: "SOME" },
                                { prim: "SWAP" },
                                { prim: "UPDATE" },
                                { prim: "PAIR" },
                                { prim: "SWAP" },
                                { prim: "PAIR" },
                                { prim: "PAIR" },
                                { prim: "SWAP" },
                              ],
                              [
                                { prim: "SWAP" },
                                { prim: "DUP" },
                                { prim: "DUG", args: [{ int: "2" }] },
                                { prim: "UNPAIR" },
                                { prim: "UNPAIR" },
                                { prim: "SWAP" },
                                { prim: "UNPAIR" },
                                { prim: "DUP", args: [{ int: "5" }] },
                                { prim: "CAR" },
                                { prim: "GET", args: [{ int: "4" }] },
                                { prim: "SOME" },
                                { prim: "DIG", args: [{ int: "6" }] },
                                { prim: "GET", args: [{ int: "3" }] },
                                { prim: "GET", args: [{ int: "4" }] },
                                { prim: "DUP", args: [{ int: "7" }] },
                                { prim: "CAR" },
                                { prim: "GET", args: [{ int: "3" }] },
                                { prim: "PAIR" },
                                { prim: "UPDATE" },
                                { prim: "PAIR" },
                                { prim: "SWAP" },
                                { prim: "PAIR" },
                                { prim: "PAIR" },
                                { prim: "SWAP" },
                              ],
                            ],
                          },
                          { prim: "SWAP" },
                          { prim: "DUP" },
                          { prim: "GET", args: [{ int: "5" }] },
                          { prim: "SWAP" },
                          { prim: "DUP" },
                          { prim: "DUG", args: [{ int: "3" }] },
                          { prim: "GET", args: [{ int: "3" }] },
                          { prim: "GET", args: [{ int: "4" }] },
                          { prim: "MEM" },
                          {
                            prim: "IF",
                            args: [
                              [],
                              [
                                { prim: "SWAP" },
                                { prim: "DUP" },
                                { prim: "DUG", args: [{ int: "2" }] },
                                { prim: "DUP" },
                                { prim: "GET", args: [{ int: "5" }] },
                                { prim: "DUP", args: [{ int: "3" }] },
                                { prim: "GET", args: [{ int: "3" }] },
                                { prim: "DUP", args: [{ int: "5" }] },
                                { prim: "GET", args: [{ int: "3" }] },
                                { prim: "GET", args: [{ int: "4" }] },
                                { prim: "PAIR" },
                                { prim: "SOME" },
                                { prim: "DIG", args: [{ int: "4" }] },
                                { prim: "GET", args: [{ int: "3" }] },
                                { prim: "GET", args: [{ int: "4" }] },
                                { prim: "UPDATE" },
                                { prim: "UPDATE", args: [{ int: "5" }] },
                                { prim: "DUP" },
                                { prim: "DUG", args: [{ int: "2" }] },
                                { prim: "DUP" },
                                { prim: "GET", args: [{ int: "7" }] },
                                { prim: "DUP", args: [{ int: "3" }] },
                                { prim: "CAR" },
                                { prim: "GET", args: [{ int: "4" }] },
                                { prim: "SOME" },
                                { prim: "DIG", args: [{ int: "4" }] },
                                { prim: "GET", args: [{ int: "3" }] },
                                { prim: "GET", args: [{ int: "4" }] },
                                { prim: "UPDATE" },
                                { prim: "UPDATE", args: [{ int: "7" }] },
                                { prim: "SWAP" },
                              ],
                            ],
                          },
                          { prim: "SWAP" },
                          { prim: "DUP" },
                          { prim: "DUG", args: [{ int: "2" }] },
                          { prim: "CAR" },
                          { prim: "CAR" },
                          { prim: "GET", args: [{ int: "3" }] },
                          { prim: "SWAP" },
                          { prim: "DUP" },
                          { prim: "DUG", args: [{ int: "2" }] },
                          { prim: "GET", args: [{ int: "5" }] },
                          { prim: "COMPARE" },
                          { prim: "NEQ" },
                          {
                            prim: "IF",
                            args: [
                              [
                                { prim: "DUP" },
                                { prim: "GET", args: [{ int: "5" }] },
                                {
                                  prim: "CONTRACT",
                                  args: [
                                    {
                                      prim: "pair",
                                      args: [
                                        { prim: "bytes" },
                                        {
                                          prim: "pair",
                                          args: [
                                            { prim: "nat" },
                                            { prim: "string" },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                  annots: ["%updateTokenId"],
                                },
                                {
                                  prim: "IF_NONE",
                                  args: [
                                    [
                                      {
                                        prim: "PUSH",
                                        args: [{ prim: "int" }, { int: "613" }],
                                      },
                                      { prim: "FAILWITH" },
                                    ],
                                    [],
                                  ],
                                },
                                { prim: "NIL", args: [{ prim: "operation" }] },
                                { prim: "SWAP" },
                                {
                                  prim: "PUSH",
                                  args: [{ prim: "mutez" }, { int: "0" }],
                                },
                                { prim: "DUP", args: [{ int: "4" }] },
                                { prim: "GET", args: [{ int: "6" }] },
                                { prim: "DUP", args: [{ int: "6" }] },
                                { prim: "GET", args: [{ int: "3" }] },
                                { prim: "GET", args: [{ int: "4" }] },
                                { prim: "DIG", args: [{ int: "5" }] },
                                { prim: "CAR" },
                                { prim: "CAR" },
                                { prim: "PAIR", args: [{ int: "3" }] },
                                { prim: "TRANSFER_TOKENS" },
                                { prim: "CONS" },
                              ],
                              [
                                { prim: "DROP" },
                                { prim: "NIL", args: [{ prim: "operation" }] },
                              ],
                            ],
                          },
                          { prim: "SWAP" },
                          { prim: "UNPAIR" },
                          { prim: "SWAP" },
                          { prim: "UNPAIR" },
                          { prim: "UNPAIR" },
                          { prim: "SWAP" },
                          { prim: "UNPAIR" },
                          { prim: "SWAP" },
                          {
                            prim: "PUSH",
                            args: [{ prim: "nat" }, { int: "1" }],
                          },
                          { prim: "ADD" },
                          { prim: "SWAP" },
                          { prim: "PAIR" },
                          { prim: "SWAP" },
                          { prim: "PAIR" },
                          { prim: "PAIR" },
                          { prim: "SWAP" },
                          { prim: "PAIR" },
                          { prim: "SWAP" },
                        ],
                        [
                          {
                            prim: "IF_LEFT",
                            args: [
                              [
                                { prim: "SWAP" },
                                { prim: "DUP" },
                                { prim: "DUG", args: [{ int: "2" }] },
                                { prim: "CAR" },
                                { prim: "CAR" },
                                { prim: "GET", args: [{ int: "3" }] },
                                { prim: "SENDER" },
                                { prim: "COMPARE" },
                                { prim: "EQ" },
                                {
                                  prim: "IF",
                                  args: [
                                    [],
                                    [
                                      {
                                        prim: "PUSH",
                                        args: [
                                          { prim: "string" },
                                          { string: "FA2_NOT_ADMIN" },
                                        ],
                                      },
                                      { prim: "FAILWITH" },
                                    ],
                                  ],
                                },
                                { prim: "SWAP" },
                                { prim: "DUP" },
                                { prim: "GET", args: [{ int: "8" }] },
                                {
                                  prim: "PUSH",
                                  args: [{ prim: "bool" }, { prim: "False" }],
                                },
                                { prim: "DIG", args: [{ int: "3" }] },
                                { prim: "UPDATE" },
                                { prim: "UPDATE", args: [{ int: "8" }] },
                              ],
                              [
                                { prim: "SWAP" },
                                { prim: "DUP" },
                                { prim: "DUG", args: [{ int: "2" }] },
                                { prim: "CAR" },
                                { prim: "CAR" },
                                { prim: "GET", args: [{ int: "3" }] },
                                { prim: "SENDER" },
                                { prim: "COMPARE" },
                                { prim: "EQ" },
                                {
                                  prim: "IF",
                                  args: [
                                    [],
                                    [
                                      {
                                        prim: "PUSH",
                                        args: [
                                          { prim: "string" },
                                          { string: "FA2_NOT_ADMIN" },
                                        ],
                                      },
                                      { prim: "FAILWITH" },
                                    ],
                                  ],
                                },
                                { prim: "SWAP" },
                                { prim: "UNPAIR" },
                                { prim: "UNPAIR" },
                                { prim: "UNPAIR" },
                                { prim: "SWAP" },
                                { prim: "CDR" },
                                { prim: "DIG", args: [{ int: "4" }] },
                                { prim: "PAIR" },
                                { prim: "SWAP" },
                                { prim: "PAIR" },
                                { prim: "PAIR" },
                                { prim: "PAIR" },
                              ],
                            ],
                          },
                          { prim: "NIL", args: [{ prim: "operation" }] },
                        ],
                      ],
                    },
                  ],
                ],
              },
            ],
            [
              {
                prim: "IF_LEFT",
                args: [
                  [
                    {
                      prim: "IF_LEFT",
                      args: [
                        [
                          { prim: "SWAP" },
                          { prim: "DUP" },
                          { prim: "DUG", args: [{ int: "2" }] },
                          { prim: "CAR" },
                          { prim: "CAR" },
                          { prim: "GET", args: [{ int: "3" }] },
                          { prim: "SENDER" },
                          { prim: "COMPARE" },
                          { prim: "EQ" },
                          {
                            prim: "IF",
                            args: [
                              [],
                              [
                                {
                                  prim: "PUSH",
                                  args: [
                                    { prim: "string" },
                                    { string: "FA2_NOT_ADMIN" },
                                  ],
                                },
                                { prim: "FAILWITH" },
                              ],
                            ],
                          },
                          { prim: "SWAP" },
                          { prim: "UNPAIR" },
                          { prim: "UNPAIR" },
                          { prim: "SWAP" },
                          { prim: "UNPAIR" },
                          { prim: "SWAP" },
                          { prim: "UNPAIR" },
                          { prim: "DUP", args: [{ int: "6" }] },
                          { prim: "CDR" },
                          { prim: "SOME" },
                          { prim: "DIG", args: [{ int: "6" }] },
                          { prim: "CAR" },
                          { prim: "UPDATE" },
                          { prim: "PAIR" },
                          { prim: "SWAP" },
                          { prim: "PAIR" },
                          { prim: "SWAP" },
                          { prim: "PAIR" },
                          { prim: "PAIR" },
                        ],
                        [
                          {
                            prim: "IF_LEFT",
                            args: [
                              [
                                { prim: "SWAP" },
                                { prim: "DUP" },
                                { prim: "DUG", args: [{ int: "2" }] },
                                { prim: "CAR" },
                                { prim: "CAR" },
                                { prim: "GET", args: [{ int: "3" }] },
                                { prim: "SENDER" },
                                { prim: "COMPARE" },
                                { prim: "EQ" },
                                {
                                  prim: "IF",
                                  args: [
                                    [],
                                    [
                                      {
                                        prim: "PUSH",
                                        args: [
                                          { prim: "string" },
                                          { string: "FA2_NOT_ADMIN" },
                                        ],
                                      },
                                      { prim: "FAILWITH" },
                                    ],
                                  ],
                                },
                                { prim: "SWAP" },
                                { prim: "UNPAIR" },
                                { prim: "SWAP" },
                                { prim: "UNPAIR" },
                                { prim: "UNPAIR" },
                                { prim: "SWAP" },
                                { prim: "CDR" },
                                { prim: "DIG", args: [{ int: "4" }] },
                                { prim: "PAIR" },
                                { prim: "SWAP" },
                                { prim: "PAIR" },
                                { prim: "PAIR" },
                                { prim: "SWAP" },
                                { prim: "PAIR" },
                              ],
                              [
                                { prim: "SWAP" },
                                { prim: "DUP" },
                                { prim: "DUG", args: [{ int: "2" }] },
                                { prim: "GET", args: [{ int: "3" }] },
                                { prim: "GET", args: [{ int: "3" }] },
                                {
                                  prim: "IF",
                                  args: [
                                    [
                                      {
                                        prim: "PUSH",
                                        args: [
                                          { prim: "string" },
                                          { string: "FA2_PAUSED" },
                                        ],
                                      },
                                      { prim: "FAILWITH" },
                                    ],
                                    [],
                                  ],
                                },
                                { prim: "DUP" },
                                {
                                  prim: "ITER",
                                  args: [
                                    [
                                      { prim: "DUP" },
                                      { prim: "CDR" },
                                      {
                                        prim: "ITER",
                                        args: [
                                          [
                                            {
                                              prim: "DUP",
                                              args: [{ int: "4" }],
                                            },
                                            { prim: "CAR" },
                                            { prim: "CAR" },
                                            {
                                              prim: "GET",
                                              args: [{ int: "3" }],
                                            },
                                            { prim: "SENDER" },
                                            { prim: "COMPARE" },
                                            { prim: "EQ" },
                                            {
                                              prim: "IF",
                                              args: [
                                                [
                                                  {
                                                    prim: "PUSH",
                                                    args: [
                                                      { prim: "bool" },
                                                      { prim: "True" },
                                                    ],
                                                  },
                                                ],
                                                [
                                                  { prim: "SENDER" },
                                                  {
                                                    prim: "DUP",
                                                    args: [{ int: "3" }],
                                                  },
                                                  { prim: "CAR" },
                                                  { prim: "COMPARE" },
                                                  { prim: "EQ" },
                                                ],
                                              ],
                                            },
                                            {
                                              prim: "IF",
                                              args: [
                                                [
                                                  {
                                                    prim: "PUSH",
                                                    args: [
                                                      { prim: "bool" },
                                                      { prim: "True" },
                                                    ],
                                                  },
                                                ],
                                                [
                                                  {
                                                    prim: "DUP",
                                                    args: [{ int: "4" }],
                                                  },
                                                  {
                                                    prim: "GET",
                                                    args: [{ int: "8" }],
                                                  },
                                                  { prim: "SENDER" },
                                                  { prim: "MEM" },
                                                ],
                                              ],
                                            },
                                            {
                                              prim: "IF",
                                              args: [
                                                [
                                                  {
                                                    prim: "PUSH",
                                                    args: [
                                                      { prim: "bool" },
                                                      { prim: "True" },
                                                    ],
                                                  },
                                                ],
                                                [
                                                  {
                                                    prim: "DUP",
                                                    args: [{ int: "4" }],
                                                  },
                                                  { prim: "CAR" },
                                                  {
                                                    prim: "GET",
                                                    args: [{ int: "6" }],
                                                  },
                                                  { prim: "SWAP" },
                                                  { prim: "DUP" },
                                                  {
                                                    prim: "DUG",
                                                    args: [{ int: "2" }],
                                                  },
                                                  {
                                                    prim: "GET",
                                                    args: [{ int: "3" }],
                                                  },
                                                  { prim: "SENDER" },
                                                  {
                                                    prim: "DUP",
                                                    args: [{ int: "5" }],
                                                  },
                                                  { prim: "CAR" },
                                                  {
                                                    prim: "PAIR",
                                                    args: [{ int: "3" }],
                                                  },
                                                  { prim: "MEM" },
                                                ],
                                              ],
                                            },
                                            {
                                              prim: "IF",
                                              args: [
                                                [],
                                                [
                                                  {
                                                    prim: "PUSH",
                                                    args: [
                                                      { prim: "string" },
                                                      {
                                                        string:
                                                          "FA2_NOT_OPERATOR",
                                                      },
                                                    ],
                                                  },
                                                  { prim: "FAILWITH" },
                                                ],
                                              ],
                                            },
                                            {
                                              prim: "DUP",
                                              args: [{ int: "4" }],
                                            },
                                            {
                                              prim: "GET",
                                              args: [{ int: "5" }],
                                            },
                                            { prim: "SWAP" },
                                            { prim: "DUP" },
                                            {
                                              prim: "DUG",
                                              args: [{ int: "2" }],
                                            },
                                            {
                                              prim: "GET",
                                              args: [{ int: "3" }],
                                            },
                                            { prim: "MEM" },
                                            {
                                              prim: "IF",
                                              args: [
                                                [],
                                                [
                                                  {
                                                    prim: "PUSH",
                                                    args: [
                                                      { prim: "string" },
                                                      {
                                                        string:
                                                          "FA2_TOKEN_UNDEFINED",
                                                      },
                                                    ],
                                                  },
                                                  { prim: "FAILWITH" },
                                                ],
                                              ],
                                            },
                                            { prim: "DUP" },
                                            {
                                              prim: "GET",
                                              args: [{ int: "4" }],
                                            },
                                            {
                                              prim: "PUSH",
                                              args: [
                                                { prim: "nat" },
                                                { int: "0" },
                                              ],
                                            },
                                            { prim: "COMPARE" },
                                            { prim: "LT" },
                                            {
                                              prim: "IF",
                                              args: [
                                                [
                                                  { prim: "DUP" },
                                                  {
                                                    prim: "GET",
                                                    args: [{ int: "4" }],
                                                  },
                                                  {
                                                    prim: "DUP",
                                                    args: [{ int: "5" }],
                                                  },
                                                  { prim: "CAR" },
                                                  {
                                                    prim: "GET",
                                                    args: [{ int: "3" }],
                                                  },
                                                  {
                                                    prim: "DUP",
                                                    args: [{ int: "3" }],
                                                  },
                                                  {
                                                    prim: "GET",
                                                    args: [{ int: "3" }],
                                                  },
                                                  {
                                                    prim: "DUP",
                                                    args: [{ int: "5" }],
                                                  },
                                                  { prim: "CAR" },
                                                  { prim: "PAIR" },
                                                  { prim: "GET" },
                                                  {
                                                    prim: "IF_NONE",
                                                    args: [
                                                      [
                                                        {
                                                          prim: "PUSH",
                                                          args: [
                                                            { prim: "int" },
                                                            { int: "444" },
                                                          ],
                                                        },
                                                        { prim: "FAILWITH" },
                                                      ],
                                                      [],
                                                    ],
                                                  },
                                                  { prim: "COMPARE" },
                                                  { prim: "GE" },
                                                  {
                                                    prim: "IF",
                                                    args: [
                                                      [],
                                                      [
                                                        {
                                                          prim: "PUSH",
                                                          args: [
                                                            { prim: "string" },
                                                            {
                                                              string:
                                                                "FA2_INSUFFICIENT_BALANCE",
                                                            },
                                                          ],
                                                        },
                                                        { prim: "FAILWITH" },
                                                      ],
                                                    ],
                                                  },
                                                  {
                                                    prim: "DUP",
                                                    args: [{ int: "4" }],
                                                  },
                                                  { prim: "UNPAIR" },
                                                  { prim: "UNPAIR" },
                                                  { prim: "SWAP" },
                                                  { prim: "UNPAIR" },
                                                  { prim: "DUP" },
                                                  {
                                                    prim: "DUP",
                                                    args: [{ int: "6" }],
                                                  },
                                                  {
                                                    prim: "GET",
                                                    args: [{ int: "3" }],
                                                  },
                                                  {
                                                    prim: "DUP",
                                                    args: [{ int: "8" }],
                                                  },
                                                  { prim: "CAR" },
                                                  { prim: "PAIR" },
                                                  { prim: "DUP" },
                                                  {
                                                    prim: "DUG",
                                                    args: [{ int: "2" }],
                                                  },
                                                  { prim: "GET" },
                                                  {
                                                    prim: "IF_NONE",
                                                    args: [
                                                      [
                                                        {
                                                          prim: "PUSH",
                                                          args: [
                                                            { prim: "int" },
                                                            { int: "448" },
                                                          ],
                                                        },
                                                        { prim: "FAILWITH" },
                                                      ],
                                                      [{ prim: "DROP" }],
                                                    ],
                                                  },
                                                  {
                                                    prim: "DUP",
                                                    args: [{ int: "6" }],
                                                  },
                                                  {
                                                    prim: "GET",
                                                    args: [{ int: "4" }],
                                                  },
                                                  {
                                                    prim: "DIG",
                                                    args: [{ int: "9" }],
                                                  },
                                                  { prim: "CAR" },
                                                  {
                                                    prim: "GET",
                                                    args: [{ int: "3" }],
                                                  },
                                                  {
                                                    prim: "DUP",
                                                    args: [{ int: "8" }],
                                                  },
                                                  {
                                                    prim: "GET",
                                                    args: [{ int: "3" }],
                                                  },
                                                  {
                                                    prim: "DUP",
                                                    args: [{ int: "10" }],
                                                  },
                                                  { prim: "CAR" },
                                                  { prim: "PAIR" },
                                                  { prim: "GET" },
                                                  {
                                                    prim: "IF_NONE",
                                                    args: [
                                                      [
                                                        {
                                                          prim: "PUSH",
                                                          args: [
                                                            { prim: "int" },
                                                            { int: "448" },
                                                          ],
                                                        },
                                                        { prim: "FAILWITH" },
                                                      ],
                                                      [],
                                                    ],
                                                  },
                                                  { prim: "SUB" },
                                                  { prim: "ISNAT" },
                                                  {
                                                    prim: "IF_NONE",
                                                    args: [
                                                      [
                                                        {
                                                          prim: "PUSH",
                                                          args: [
                                                            { prim: "int" },
                                                            { int: "448" },
                                                          ],
                                                        },
                                                        { prim: "FAILWITH" },
                                                      ],
                                                      [],
                                                    ],
                                                  },
                                                  { prim: "SOME" },
                                                  { prim: "SWAP" },
                                                  { prim: "UPDATE" },
                                                  { prim: "PAIR" },
                                                  { prim: "SWAP" },
                                                  { prim: "PAIR" },
                                                  { prim: "PAIR" },
                                                  { prim: "DUP" },
                                                  {
                                                    prim: "DUG",
                                                    args: [{ int: "4" }],
                                                  },
                                                  { prim: "CAR" },
                                                  {
                                                    prim: "GET",
                                                    args: [{ int: "3" }],
                                                  },
                                                  { prim: "SWAP" },
                                                  { prim: "DUP" },
                                                  {
                                                    prim: "GET",
                                                    args: [{ int: "3" }],
                                                  },
                                                  { prim: "SWAP" },
                                                  { prim: "DUP" },
                                                  {
                                                    prim: "DUG",
                                                    args: [{ int: "3" }],
                                                  },
                                                  { prim: "CAR" },
                                                  { prim: "PAIR" },
                                                  { prim: "MEM" },
                                                  {
                                                    prim: "IF",
                                                    args: [
                                                      [
                                                        {
                                                          prim: "DIG",
                                                          args: [{ int: "3" }],
                                                        },
                                                        { prim: "UNPAIR" },
                                                        { prim: "UNPAIR" },
                                                        { prim: "SWAP" },
                                                        { prim: "UNPAIR" },
                                                        { prim: "DUP" },
                                                        {
                                                          prim: "DIG",
                                                          args: [{ int: "5" }],
                                                        },
                                                        { prim: "DUP" },
                                                        {
                                                          prim: "GET",
                                                          args: [{ int: "3" }],
                                                        },
                                                        { prim: "SWAP" },
                                                        { prim: "DUP" },
                                                        {
                                                          prim: "DUG",
                                                          args: [{ int: "7" }],
                                                        },
                                                        { prim: "CAR" },
                                                        { prim: "PAIR" },
                                                        { prim: "DUP" },
                                                        {
                                                          prim: "DUG",
                                                          args: [{ int: "2" }],
                                                        },
                                                        { prim: "GET" },
                                                        {
                                                          prim: "IF_NONE",
                                                          args: [
                                                            [
                                                              {
                                                                prim: "PUSH",
                                                                args: [
                                                                  {
                                                                    prim: "int",
                                                                  },
                                                                  {
                                                                    int: "451",
                                                                  },
                                                                ],
                                                              },
                                                              {
                                                                prim: "FAILWITH",
                                                              },
                                                            ],
                                                            [],
                                                          ],
                                                        },
                                                        {
                                                          prim: "DIG",
                                                          args: [{ int: "6" }],
                                                        },
                                                        {
                                                          prim: "GET",
                                                          args: [{ int: "4" }],
                                                        },
                                                        { prim: "ADD" },
                                                        { prim: "SOME" },
                                                        { prim: "SWAP" },
                                                        { prim: "UPDATE" },
                                                        { prim: "PAIR" },
                                                        { prim: "SWAP" },
                                                        { prim: "PAIR" },
                                                        { prim: "PAIR" },
                                                        {
                                                          prim: "DUG",
                                                          args: [{ int: "2" }],
                                                        },
                                                      ],
                                                      [
                                                        {
                                                          prim: "DIG",
                                                          args: [{ int: "3" }],
                                                        },
                                                        { prim: "UNPAIR" },
                                                        { prim: "UNPAIR" },
                                                        { prim: "SWAP" },
                                                        { prim: "UNPAIR" },
                                                        {
                                                          prim: "DUP",
                                                          args: [{ int: "5" }],
                                                        },
                                                        {
                                                          prim: "GET",
                                                          args: [{ int: "4" }],
                                                        },
                                                        { prim: "SOME" },
                                                        {
                                                          prim: "DIG",
                                                          args: [{ int: "5" }],
                                                        },
                                                        { prim: "DUP" },
                                                        {
                                                          prim: "GET",
                                                          args: [{ int: "3" }],
                                                        },
                                                        { prim: "SWAP" },
                                                        { prim: "CAR" },
                                                        { prim: "PAIR" },
                                                        { prim: "UPDATE" },
                                                        { prim: "PAIR" },
                                                        { prim: "SWAP" },
                                                        { prim: "PAIR" },
                                                        { prim: "PAIR" },
                                                        {
                                                          prim: "DUG",
                                                          args: [{ int: "2" }],
                                                        },
                                                      ],
                                                    ],
                                                  },
                                                ],
                                                [{ prim: "DROP" }],
                                              ],
                                            },
                                          ],
                                        ],
                                      },
                                      { prim: "DROP" },
                                    ],
                                  ],
                                },
                                { prim: "DROP" },
                              ],
                            ],
                          },
                        ],
                      ],
                    },
                  ],
                  [
                    {
                      prim: "IF_LEFT",
                      args: [
                        [
                          { prim: "SWAP" },
                          { prim: "DUP" },
                          { prim: "DUG", args: [{ int: "2" }] },
                          { prim: "GET", args: [{ int: "8" }] },
                          { prim: "SENDER" },
                          { prim: "MEM" },
                          {
                            prim: "IF",
                            args: [
                              [],
                              [
                                {
                                  prim: "PUSH",
                                  args: [{ prim: "int" }, { int: "625" }],
                                },
                                { prim: "FAILWITH" },
                              ],
                            ],
                          },
                          { prim: "SWAP" },
                          { prim: "DUP" },
                          { prim: "GET", args: [{ int: "5" }] },
                          { prim: "DIG", args: [{ int: "2" }] },
                          { prim: "DUP" },
                          { prim: "CAR" },
                          { prim: "SWAP" },
                          { prim: "DUP" },
                          { prim: "DUG", args: [{ int: "4" }] },
                          { prim: "CDR" },
                          { prim: "PAIR" },
                          { prim: "SOME" },
                          { prim: "DIG", args: [{ int: "3" }] },
                          { prim: "CDR" },
                          { prim: "UPDATE" },
                          { prim: "UPDATE", args: [{ int: "5" }] },
                        ],
                        [
                          {
                            prim: "IF_LEFT",
                            args: [
                              [
                                { prim: "SWAP" },
                                { prim: "DUP" },
                                { prim: "DUG", args: [{ int: "2" }] },
                                { prim: "CAR" },
                                { prim: "CAR" },
                                { prim: "GET", args: [{ int: "3" }] },
                                { prim: "SENDER" },
                                { prim: "COMPARE" },
                                { prim: "EQ" },
                                {
                                  prim: "IF",
                                  args: [
                                    [],
                                    [
                                      {
                                        prim: "PUSH",
                                        args: [
                                          { prim: "string" },
                                          { string: "FA2_NOT_ADMIN" },
                                        ],
                                      },
                                      { prim: "FAILWITH" },
                                    ],
                                  ],
                                },
                                { prim: "SWAP" },
                                { prim: "UNPAIR" },
                                { prim: "SWAP" },
                                { prim: "UNPAIR" },
                                { prim: "CDR" },
                                { prim: "DIG", args: [{ int: "3" }] },
                                { prim: "PAIR" },
                                { prim: "PAIR" },
                                { prim: "SWAP" },
                                { prim: "PAIR" },
                              ],
                              [
                                { prim: "DUP" },
                                {
                                  prim: "ITER",
                                  args: [
                                    [
                                      {
                                        prim: "IF_LEFT",
                                        args: [
                                          [
                                            { prim: "DUP" },
                                            { prim: "CAR" },
                                            { prim: "SENDER" },
                                            { prim: "COMPARE" },
                                            { prim: "EQ" },
                                            {
                                              prim: "IF",
                                              args: [
                                                [
                                                  {
                                                    prim: "PUSH",
                                                    args: [
                                                      { prim: "bool" },
                                                      { prim: "True" },
                                                    ],
                                                  },
                                                ],
                                                [
                                                  {
                                                    prim: "DUP",
                                                    args: [{ int: "3" }],
                                                  },
                                                  { prim: "CAR" },
                                                  { prim: "CAR" },
                                                  {
                                                    prim: "GET",
                                                    args: [{ int: "3" }],
                                                  },
                                                  { prim: "SENDER" },
                                                  { prim: "COMPARE" },
                                                  { prim: "EQ" },
                                                ],
                                              ],
                                            },
                                            {
                                              prim: "IF",
                                              args: [
                                                [],
                                                [
                                                  {
                                                    prim: "PUSH",
                                                    args: [
                                                      { prim: "string" },
                                                      {
                                                        string:
                                                          "FA2_NOT_ADMIN_OR_OPERATOR",
                                                      },
                                                    ],
                                                  },
                                                  { prim: "FAILWITH" },
                                                ],
                                              ],
                                            },
                                            {
                                              prim: "DIG",
                                              args: [{ int: "2" }],
                                            },
                                            { prim: "UNPAIR" },
                                            { prim: "UNPAIR" },
                                            { prim: "SWAP" },
                                            { prim: "UNPAIR" },
                                            { prim: "SWAP" },
                                            { prim: "UNPAIR" },
                                            { prim: "SWAP" },
                                            {
                                              prim: "PUSH",
                                              args: [
                                                {
                                                  prim: "option",
                                                  args: [{ prim: "unit" }],
                                                },
                                                {
                                                  prim: "Some",
                                                  args: [{ prim: "Unit" }],
                                                },
                                              ],
                                            },
                                            {
                                              prim: "DIG",
                                              args: [{ int: "6" }],
                                            },
                                            { prim: "DUP" },
                                            {
                                              prim: "GET",
                                              args: [{ int: "4" }],
                                            },
                                            { prim: "SWAP" },
                                            { prim: "DUP" },
                                            {
                                              prim: "GET",
                                              args: [{ int: "3" }],
                                            },
                                            { prim: "SWAP" },
                                            { prim: "CAR" },
                                            {
                                              prim: "PAIR",
                                              args: [{ int: "3" }],
                                            },
                                            { prim: "UPDATE" },
                                            { prim: "SWAP" },
                                            { prim: "PAIR" },
                                            { prim: "SWAP" },
                                            { prim: "PAIR" },
                                            { prim: "SWAP" },
                                            { prim: "PAIR" },
                                            { prim: "PAIR" },
                                            { prim: "SWAP" },
                                          ],
                                          [
                                            { prim: "DUP" },
                                            { prim: "CAR" },
                                            { prim: "SENDER" },
                                            { prim: "COMPARE" },
                                            { prim: "EQ" },
                                            {
                                              prim: "IF",
                                              args: [
                                                [
                                                  {
                                                    prim: "PUSH",
                                                    args: [
                                                      { prim: "bool" },
                                                      { prim: "True" },
                                                    ],
                                                  },
                                                ],
                                                [
                                                  {
                                                    prim: "DUP",
                                                    args: [{ int: "3" }],
                                                  },
                                                  { prim: "CAR" },
                                                  { prim: "CAR" },
                                                  {
                                                    prim: "GET",
                                                    args: [{ int: "3" }],
                                                  },
                                                  { prim: "SENDER" },
                                                  { prim: "COMPARE" },
                                                  { prim: "EQ" },
                                                ],
                                              ],
                                            },
                                            {
                                              prim: "IF",
                                              args: [
                                                [],
                                                [
                                                  {
                                                    prim: "PUSH",
                                                    args: [
                                                      { prim: "string" },
                                                      {
                                                        string:
                                                          "FA2_NOT_ADMIN_OR_OPERATOR",
                                                      },
                                                    ],
                                                  },
                                                  { prim: "FAILWITH" },
                                                ],
                                              ],
                                            },
                                            {
                                              prim: "DIG",
                                              args: [{ int: "2" }],
                                            },
                                            { prim: "UNPAIR" },
                                            { prim: "UNPAIR" },
                                            { prim: "SWAP" },
                                            { prim: "UNPAIR" },
                                            { prim: "SWAP" },
                                            { prim: "UNPAIR" },
                                            { prim: "SWAP" },
                                            {
                                              prim: "NONE",
                                              args: [{ prim: "unit" }],
                                            },
                                            {
                                              prim: "DIG",
                                              args: [{ int: "6" }],
                                            },
                                            { prim: "DUP" },
                                            {
                                              prim: "GET",
                                              args: [{ int: "4" }],
                                            },
                                            { prim: "SWAP" },
                                            { prim: "DUP" },
                                            {
                                              prim: "GET",
                                              args: [{ int: "3" }],
                                            },
                                            { prim: "SWAP" },
                                            { prim: "CAR" },
                                            {
                                              prim: "PAIR",
                                              args: [{ int: "3" }],
                                            },
                                            { prim: "UPDATE" },
                                            { prim: "SWAP" },
                                            { prim: "PAIR" },
                                            { prim: "SWAP" },
                                            { prim: "PAIR" },
                                            { prim: "SWAP" },
                                            { prim: "PAIR" },
                                            { prim: "PAIR" },
                                            { prim: "SWAP" },
                                          ],
                                        ],
                                      },
                                    ],
                                  ],
                                },
                                { prim: "DROP" },
                              ],
                            ],
                          },
                        ],
                      ],
                    },
                  ],
                ],
              },
              { prim: "NIL", args: [{ prim: "operation" }] },
            ],
          ],
        },
        { prim: "PAIR" },
      ],
    ],
  },
];
