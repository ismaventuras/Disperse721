/*
 Generate a list of addresses
 use with ts-node or compile it with tsc
 it will log the list of addresses in the console
*/
import { ethers } from "ethers"
const args = process.argv.slice(2) // get args from console

// set the first argument as the amount of wallets the user wants to create, if no parameter passed only 1 account is created.
let amountByArg: number = parseInt(args[0])
let numOfWallets: number = args[0] ? amountByArg : 1 

if (isNaN(numOfWallets)){ // if first arg is not a number then stop
    console.error('first argument is not a number')
    process.exit(1)
}

function generatePublicAddresses(amount: number){
    let listOfPublicAddresses: string[] = [];
    for(let index=1; index <= amount; index++){
        const wallet = ethers.Wallet.createRandom();        
        listOfPublicAddresses.push(wallet.address);
    }
    return listOfPublicAddresses
}

const wallets = generatePublicAddresses(numOfWallets)
console.log(wallets)
console.log(wallets.length)