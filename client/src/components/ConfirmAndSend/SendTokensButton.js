import React from "react";
import { ethers } from "ethers";
import ERC721Sender from "../../abi/ERC721Sender.json"
// import INFO from "../info.json"
import { Button,  } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { AppContext } from "../../context/AppContext";

export default function SendTokensButton( ) {
    
    const {library, chainId} = useWeb3React();
    const [disabled, setDisabled] = React.useState(false)
    const { nftAddress , nftAllowance, addressRows, handleError, handleTransacting, SENDER_ADDRESS} = React.useContext(AppContext);

    React.useEffect(()=>{
        let bool = nftAllowance && (addressRows.length > 0)        
        setDisabled(!bool);
    },[nftAllowance,addressRows]);

    const onClick = async (e) => {
        //create a new sender contract instance
        // format addreses
        let addressList = []
        let tokenIdList = []
        for (let item of addressRows) {
            addressList.push(item.address)
            tokenIdList.push(item.tokenId);
        }
        // send the tx
        try {
            const contract = new ethers.Contract(SENDER_ADDRESS[chainId], ERC721Sender, library.getSigner());
            handleTransacting(true);
            let tx = await contract.sendERC721(nftAddress, addressList, tokenIdList);
            console.log(tx);
            // process the receipt
            let receipt = await tx.wait();
            console.log(receipt);
            handleTransacting(false);
        } catch (err) {
            handleTransacting(false);
            console.log(err)
            if(err.error && err.error.code === -32603){
                handleError(err.error.data.message);
            }else{
                handleError(err.message);
            }
            
        }
    }

    return (
        <Button size="large" variant="contained" color="secondary" onClick={onClick} disabled={disabled}>
            send tokens
        </Button>
    )
}