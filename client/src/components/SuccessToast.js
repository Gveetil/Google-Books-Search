import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { AppContextAction, useAppContext } from "../utils/AppContext";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

// This component displays a success message in a toast. 
export default function SuccessToast() {
    const [state, dispatch] = useAppContext();
    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        // clear success message
        dispatch({
            type: AppContextAction.SUCCESS_TOAST,
            toast: "",
        });
    };

    return (
        <Snackbar open={state.successMessage != ""} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                {state.successMessage}
            </Alert>
        </Snackbar>);
}
