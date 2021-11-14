  
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

