const HDWalletProvider =require('truffle-hdwallet-provider');
const Web3=require('web3');
const OrganChain =require('./build/OrganChain.json');

const provider=new HDWalletProvider(
	'prize truly dress between library elephant three frequent eager shove join crime',
    'https://rinkeby.infura.io/v3/f0097ce3cf9142d2863edb22828b5ec0'
);

const web3=new Web3(provider);

const deploy=async()=>{
	const accounts=await web3.eth.getAccounts();
	console.log(accounts[0]);

	const result=await new web3.eth.Contract(JSON.parse(OrganChain.interface))
	.deploy({data: OrganChain.bytecode})
	.send({gas:'5000000',gasPrice:'60000000000',from:accounts[0]});

	console.log(OrganChain.interface);
	console.log('addres == ',result.options.address);
};

deploy();
