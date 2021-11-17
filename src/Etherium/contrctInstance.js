import web3 from "./web";
import OrganChain from './build/OrganChain.json';


const instance =  new web3.eth.Contract(
    JSON.parse(OrganChain.interface) ,
    '0x6baDAc282798C30B4159Eb5941947571a5B859BA'
);

export default instance;