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
//                       { bytes: "68747470733a2f2f6578616d706c652e636f6d" },
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
          "args": [ [], { "prim": "Pair", "args": [ [ { "prim": "Elt", "args": [ { "string": "" }, { "bytes": "68747470733a2f2f6769746875622e636f6d2f6b6f696e65617274682f6d61726b6574736e2d6c697665636f70792d747a2f747265652f312e302e31" } ] } ], [] ] } ]
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