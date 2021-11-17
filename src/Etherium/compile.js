  
const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');


// Removing build folder is exits 
const buildPath = path.resolve(__dirname , 'build');
fs.removeSync(buildPath);

// Reading contracts
const OrganManagementpath = path.resolve(__dirname,'contract','OrganManagement.sol');
const source = fs.readFileSync(OrganManagementpath , 'utf-8');

const output =  solc.compile(source,1).contracts;

fs.ensureDirSync(buildPath);

for(let contract in output){
    fs.outputJsonSync(
        path.resolve(buildPath ,contract.slice(1)+'.json'),
        output[contract]
    );
}

// Account Deployed : 0xaA42C49c0F3EA1d2D0DA23E93d7B7632dA51674B
//deployed account : 0x969893142Ad794B6353543915847bA042593461D