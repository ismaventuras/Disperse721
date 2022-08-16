const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const {privateKey, privateKeyDev, RPC, etherscanApis} = require('./secrets.json');
//let privateKey = fs.readFileSync("./.secret").toString().trim();
let providerMumbai = new HDWalletProvider(privateKey, RPC.MUMBAI);
let providerPolygon = new HDWalletProvider(privateKey, RPC.POLYGON);
let providerMoonbase = new HDWalletProvider(privateKey, RPC.MOONBASE);
let providerMoonriver = new HDWalletProvider(privateKey, RPC.MOONRIVER);

module.exports = {

  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    mumbai: {
      provider: providerMumbai,
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    polygon: {
      provider: providerPolygon,
      network_id: 137,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gasPrice: 32000000000
    },
    moonbase: {
      provider: providerMoonbase,
      network_id: 1287,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gasPrice: 1000000000
    },
    moonriver: {
      provider: providerMoonriver,
      network_id: 1285,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gasPrice: 1000000000
    },

  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.15",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },

  plugins: ['truffle-plugin-verify'],
  api_keys:{
    polygonscan:etherscanApis.polygonscan,
    etherscan:etherscanApis.etherscan,
    moonscan: etherscanApis.moonscan,          
  }
};
