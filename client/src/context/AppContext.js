import { createContext, useState } from "react";
import info from "../info.json";

export const AppContext = createContext({});


export default function AppContextProvider({children}){
    
    const [nftAddress, setNftAddress] = useState("")
    const [nftName, setName] = useState("")
    const [nftSymbol, setSymbol] = useState("")
    const [nftBalance, setBalance] = useState("")
    const [nftAllowance, setAllowance] = useState(false)
    const [addressRows, setAddressRows] = useState([]);
    const [transacting, setTransacting] = useState(false);
    const [hash , setHash] = useState("");

    const handleHash = (txHash="") => setHash(txHash);
    const handleTransacting = (bool) => setTransacting(bool);

    const [error, setError] = useState("");

    const handleError = (errorMessage="") => setError(errorMessage);

    const SENDER_ADDRESS = info.SENDER_ADDRESS

    const handleAddressRows = (listOfObjects) => setAddressRows(listOfObjects);

    const assignNftData = (address="",name="", symbol="", balance=null, allowance=false) => {
        setNftAddress(address)
        setName(name)
        setSymbol(symbol)
        setBalance(balance)
        setAllowance(allowance)
    }

    const updateAllowance = (allowance) => {
        setAllowance(allowance);
    }

    const value = {
        nftName, nftAddress , nftBalance, nftSymbol, nftAllowance,
        assignNftData, updateAllowance,
        addressRows, handleAddressRows,
        error, handleError,
        SENDER_ADDRESS,
        transacting, handleTransacting,
        hash, handleHash
    }

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}