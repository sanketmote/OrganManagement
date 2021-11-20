import web3 from "./web";
import OrganChain from './build/OrganChain.json';


const instance =  new web3.eth.Contract(
    JSON.parse(OrganChain.interface) ,
    '0x4bCFbA13E3B03749eBd0D1a86184150c977Ad6bE'
);

export default instance;