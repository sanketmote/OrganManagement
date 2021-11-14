import web3 from "./web3";
import OrganChain from './build/OrganChain.json';


const instance =  new web3.eth.Contract(
    JSON.parse(OrganChain.interface) ,
    '0xdc904aE115951C552E19E83e97a5cee77E8aDc8A'
);

export default instance;