const ERC721Sender = artifacts.require("ERC721Sender");
const MyToken = artifacts.require("MyToken");

contract("ERC721Sender", (accounts) => {

    it("has been deployed succesfully", async () => {
        // deploy the contract
        const contract = await ERC721Sender.deployed();
        // check if it has been deployed
        assert(contract, "contract was not deployed");
    });

    it("sends one nft to one address", async () => {
        // get addresses
        const accountOne = accounts[0];
        const accountTwo = accounts[1];
        // deploy contracts
        const nft = await MyToken.deployed()
        const contract = await ERC721Sender.deployed();
        
        // approve tokens to contract
        await nft.setApprovalForAll(contract.address, true, { from: accountOne });
        const isApproved = await nft.isApprovedForAll.call(accountOne, contract.address, { from: accountOne });
        assert(isApproved, true);
        // send tokens
        await contract.sendERC721(nft.address, [accountTwo], [0], { from: accountOne });
        let balanceAccountTwo = (await nft.balanceOf.call(accountTwo, { from: accountOne })).toNumber();
        assert(balanceAccountTwo > 0);
    })
    it("sends 18 nft to 18 address", async () => {
        // get addresses
        const accountOne = accounts[0];
        const accountTwo = accounts[2];
        // deploy contracts
        const nft = await MyToken.deployed()
        const contract = await ERC721Sender.deployed();
        // get previous balance
        // approve tokens to contract
        await nft.setApprovalForAll(contract.address, true, { from: accountOne });
        const isApproved = await nft.isApprovedForAll.call(accountOne, contract.address, { from: accountOne });
        assert(isApproved, true);
        // send tokens
        await contract.sendERC721(
            nft.address, 
            [accountTwo, accountTwo,accountTwo,accountTwo,accountTwo,accountTwo, accountTwo,accountTwo,accountTwo,accountTwo,accountTwo, accountTwo,accountTwo,accountTwo,accountTwo,accountTwo, accountTwo,accountTwo], 
            [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], 
            { from: accountOne }
        );
        let balanceAccountTwo = (await nft.balanceOf.call(accountTwo, { from: accountOne })).toNumber();
        assert(balanceAccountTwo === 18, "balance is not 18");
    })
})