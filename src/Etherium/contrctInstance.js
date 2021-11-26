import web3 from "./web";
import OrganChain from './build/OrganChain.json';


const instance =  new web3.eth.Contract(
    JSON.parse(OrganChain.interface) ,
    '0x033c4d5916130904E754783b2682D71FdE62aB0d'
);

export default instance;