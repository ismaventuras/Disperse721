import { Alert, IconButton, Link, Snackbar } from "@mui/material";
import React from "react";
import { AppContext } from "../context/AppContext";
// import MuiAlert from '@mui/material/Alert';
import { useWeb3React } from "@web3-react/core";
import info from "../info.json";
import CloseIcon from '@mui/icons-material/Close';

// const CustomAlert = React.forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

export default function TransactionAlert() {
    const { hash, handleTransacting , handleHash, transacting } = React.useContext(AppContext);
    const [open, setOpen] = React.useState(false);
    const {chainId} = useWeb3React();
    
    React.useEffect(()=>{
        setOpen(Boolean(hash))
    },[transacting, hash]);

    const onClose = (event, reason) => {
        if (reason === 'clickaway') return
        handleTransacting(false);
        handleHash("");
    }
    
    let blockExplorer = `${info.networkInfo[chainId]}tx/${hash}`

    return (
        <Snackbar open={open} autoHideDuration={20000} onClose={onClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
            <Alert severity="success" action={<IconButton onClick={onClose}><CloseIcon /></IconButton>}>
                Check your transaction on <Link href={blockExplorer} target={"_blank"} color={"inherit"}>block explorer</Link>
            </Alert>
        </Snackbar>
    )
}