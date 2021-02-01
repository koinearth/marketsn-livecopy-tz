import conf from '../../conf/conf.js';

export default {
  "prim": "Pair",
  "args": [
    { "prim": "Pair", "args": [ { "string": `${conf.NFTAddress}` }, [] ] }, //change to conf.NFTAddress
    { "prim": "Pair", "args": [ { "string": `${conf.adminAddress}` }, { "string": `${conf.adminPublicKey}` } ] } //change to conf.adminAddress & conf.adminPublicKey
  ]
}