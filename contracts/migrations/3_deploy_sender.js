const ERC721Sender = artifacts.require("ERC721Sender");

module.exports = function (deployer) {
  deployer.deploy(ERC721Sender);
};
