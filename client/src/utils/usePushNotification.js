import { useState, useEffect } from 'react'
import io from "socket.io-client";

// This custom hook connects to the server and handles push notifications
// Notifications are then rendered via the Message Toast component
function usePushNotification() {
    const [notification, setNotification] = useState("");

    // Connect to server and listen for broadcasts
    useEffect(() => {
        function initializeSockets() {
            try {
                const socket = io.connect();
                socket.on('broadcast', function (message) {
                    setNotification(message);
                });
            } catch (error) {
                // Log errors and continue if sockets don't connect
                console.log(console.error());
            }
        }
        initializeSockets();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Clears the current notification message
    function clear() {
        setNotification("");
    }

    return {
        message: notification,
        clear,
    };
};

export default usePushNotification;