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
            { "string": "edpktzrjdb1tx6dQecQGZL6CwhujWg1D2CXfXWBriqtJSA6kvqMwA2" }, //change to conf.adminPublicKey
            { "prim": "Pair", "args": [ { "string": "tz1hdQscorfqMzFqYxnrApuS5i6QSTuoAp3w" }, [] ] } //change to conf.adminAddress
          ]
        },
        { "prim": "Pair", "args": [ [], { "prim": "Pair", "args": [ { "prim": "Unit" }, [] ] } ] }
      ]
    },
    {
      "prim": "Pair",
      "args": [
        { "prim": "Pair", "args": [ { "string": "KT1HjMfN66eJNXa2ZiZmfeeHdwTkb6aZQJLE" }, { "prim": "Pair", "args": [ { "prim": "False" }, [] ] } ] }, //change to conf.NFTAddress
        { "prim": "Pair", "args": [ [], { "prim": "Pair", "args": [ [], [ { "string": "tz1hdQscorfqMzFqYxnrApuS5i6QSTuoAp3w" } ] ] } ] } //change to conf.adminAddress
      ]
    }
  ]
}