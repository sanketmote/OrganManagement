import Web3 from "web3";
 
let web3;
 
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/f0097ce3cf9142d2863edb22828b5ec0'
  );
  web3 = new Web3(provider);
}
// 0xdc904aE115951C552E19E83e97a5cee77E8aDc8A contract deployed
export default web3;