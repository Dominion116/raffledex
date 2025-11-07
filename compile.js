const path = require('path');
const fs = require('fs');
const solc = require('solc');

const rafflePath = path.resolve(__dirname, 'src', 'contracts', 'Raffle.sol');
const source = fs.readFileSync(rafflePath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Raffle.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

const contractFile = output.contracts['Raffle.sol']['Raffle'];

const abi = contractFile.abi;
const bytecode = contractFile.evm.bytecode.object;

const raffleArtifact = {
  abi,
  bytecode,
};

fs.writeFileSync(
  path.resolve(__dirname, 'src', 'contracts', 'Raffle.json'),
  JSON.stringify(raffleArtifact, null, 2)
);

console.log('Raffle contract compiled and Raffle.json created!');
