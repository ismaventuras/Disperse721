const MyToken = artifacts.require("MyToken");

module.exports = function (deployer,network,accounts) {
  if(network === 'development'){
    deployer.deploy(MyToken);
  }
};
