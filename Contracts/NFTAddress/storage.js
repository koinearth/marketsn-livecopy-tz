import conf from "../../conf/conf.js";

// export default {
//   prim: "Pair",
//   args: [
//     {
//       prim: "Pair",
//       args: [
//         {
//           prim: "Pair",
//           args: [
//             { string: `${conf.adminPublicKey}` },
//             {
//               prim: "Pair",
//               args: [{ string: `${conf.adminAddress}` }, { int: "0" }],
//             },
//           ],
//         },
//         {
//           prim: "Pair",
//           args: [
//             [],
//             {
//               prim: "Pair",
//               args: [
//                 [
//                   {
//                     prim: "Elt",
//                     args: [
//                       { string: "" },
//                       { bytes: "68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f6b6f696e65617274682f6d61726b6574736e2d6c697665636f70792d747a2f6d61696e2f436f6e7472616374732f4e4654416464726573732f6d657461646174612e6a736f6e" },
//                     ],
//                   },
//                 ],
//                 [],
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       prim: "Pair",
//       args: [
//         {
//           prim: "Pair",
//           args: [
//             { string: `${conf.OracleFactoryAddress}` },
//             { prim: "Pair", args: [{ prim: "False" }, { int: "0" }] },
//           ],
//         },
//         {
//           prim: "Pair",
//           args: [
//             { prim: "Pair", args: [[], []] },
//             { prim: "Pair", args: [[], [{ string: `${conf.adminAddress}` }]] },
//           ],
//         },
//       ],
//     },
//   ],
// };

export default {

  "prim": "Pair",
  "args": [
    {
      "prim": "Pair",
      "args": [
        {
          "prim": "Pair",
          "args": [
            { "string": `${conf.adminPublicKey}` },
            { "prim": "Pair", "args": [ { "string": `${conf.adminAddress}` }, { "int": "0" } ] }
          ]
        },
        {
          "prim": "Pair",
          "args": [ [], { "prim": "Pair", "args": [ [ { "prim": "Elt", "args": [ { "string": "" }, { "bytes": "68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f6b6f696e65617274682f6d61726b6574736e2d6c697665636f70792d747a2f6d61696e2f436f6e7472616374732f4e4654416464726573732f6d657461646174612e6a736f6e" } ] } ], [] ] } ]
        }
      ]
    },
    {
      "prim": "Pair",
      "args": [
        { "prim": "Pair", "args": [ { "string": `${conf.OracleFactoryAddress}` }, { "prim": "Pair", "args": [ { "prim": "False" }, { "int": "0" } ] } ] },
        { "prim": "Pair", "args": [ [], { "prim": "Pair", "args": [ [], [ { "string": `${conf.adminAddress}` } ] ] } ] }
      ]
    }
  ]
};