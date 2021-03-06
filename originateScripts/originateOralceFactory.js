import {TezosOperationError, TezosToolkit} from '@taquito/taquito';

import { InMemorySigner } from '@taquito/signer'
import conf from '../conf/conf.js';
import oracleCodeJSON from '../Contracts/OracleFactory/code.js';
import oracleStorageJSON from '../Contracts/OracleFactory/storage';

const Tezos = new TezosToolkit(conf.rpc);
const util = require("util");

Tezos.setSignerProvider(new InMemorySigner(conf.adminSecretKey));

export async function originateOracleFactory(){
    try{
        console.log("Begin originating oracle factory contract");

        const originate_op = await Tezos.contract.originate({
            code: oracleCodeJSON,
            init: oracleStorageJSON,
        });

        const originated_oracle = await originate_op.contract();

        console.log("New contract address: " + originated_oracle.address);
        console.log("Factory Oracle Contract successfully originated");
        return originated_oracle.address;
    } catch (e) {
        if (e instanceof TezosOperationError){
            console.log(util.inspect(e.errors, false, null, true));
        } else {
            console.log("Error ", e);
        }
    }
}
