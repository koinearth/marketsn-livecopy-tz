import conf from '../../conf/conf.js';

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
            { "prim": "Pair", "args": [ { "string": `${conf.adminAddress}` }, [] ] }
          ]
        },
        { "prim": "Pair", "args": [ [], { "prim": "Pair", "args": [ { "prim": "Unit" }, [] ] } ] }
      ]
    },
    {
      "prim": "Pair",
      "args": [
        { "prim": "Pair", "args": [ { "string": `${conf.OracleFactoryAddress}` }, { "prim": "Pair", "args": [ { "prim": "False" }, { "int": "0" } ] } ] },
        { "prim": "Pair", "args": [ { "prim": "Pair", "args": [ [], [] ] }, { "prim": "Pair", "args": [ [], [ { "string": `${conf.adminAddress}` } ] ] } ] }
      ]
    }
  ]
}