import web3 from "./web";
import OrganChain from './build/OrganChain.json';


const instance =  new web3.eth.Contract(
    JSON.parse(OrganChain.interface) ,
    '0x969893142Ad794B6353543915847bA042593461D'
);

export default instance;