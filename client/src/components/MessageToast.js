import React from 'react';
import { Snackbar, Container } from '@material-ui/core';
import { AlertTitle } from '@material-ui/lab';
import MuiAlert from '@material-ui/lab/Alert';
import usePushNotification from '../utils/usePushNotification';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// This component displays a push notification message in a toast. 
export default function MessageToast() {
    const notification = usePushNotification();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        notification.clear();
    };

    return (
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={notification.message !== ""} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info">
                <AlertTitle>Book List Updated!</AlertTitle>
                <Container maxWidth="xs">
                    {notification.message}
                </Container>
            </Alert>
        </Snackbar>);
}
