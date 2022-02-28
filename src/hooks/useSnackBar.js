import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function useSnackBar() {


    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("success");

    const showSnackBar = () => {
        setOpen(true);
    };

    const hideSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const SnackBar = open === true && (
        <div >
            <Snackbar open={open} autoHideDuration={6000} onClose={hideSnackBar} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}>
                <MuiAlert style={{ fontSize: "1.5rem" }} elevation={9} variant="filled" autoHideDuration={4000} onClose={hideSnackBar} severity={type}>
                    {message}
                </MuiAlert>
            </Snackbar>
        </div>
    );

    return [showSnackBar, hideSnackBar, setMessage, setType, SnackBar];

}