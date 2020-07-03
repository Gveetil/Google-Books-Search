import React, { useEffect, useState } from 'react'
import API from "./API"
import { AppContextAction, useAppContext } from "./AppContext";
import DeleteIcon from '@material-ui/icons/Delete';

const NO_RESULTS_FOUND = "You have not saved any Books yet!";

function useSavedBooks() {
    /* eslint-disable no-unused-vars */
    const [_, dispatch] = useAppContext();
    const [savedBooks, setSavedBooks] = useState([]);
    const [userMessage, setUserMessage] = useState(false);
    const supportedAction = {
        type: "Delete",
        icon: <DeleteIcon />,
        handler: handleDeleteBook,
    }

    useEffect(() => {

        async function loadSavedBooks() {
            try {
                dispatch({ type: AppContextAction.LOADING });
                setUserMessage("");
                const results = await API.getBooks();
                if (results != null && results.data != null && results.data.length > 0) {
                    setSavedBooks([...results.data])
                } else {
                    // no saved books found
                    setSavedBooks([]);
                    setUserMessage(NO_RESULTS_FOUND);
                }
                dispatch({ type: AppContextAction.LOADING_COMPLETED });
            } catch (error) {
                dispatch({ type: AppContextAction.SHOW_DIALOG, show: true, message: error.message });
            }
        };

        loadSavedBooks();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        userMessage,
        bookList: savedBooks,
        supportedAction
    };

    async function handleDeleteBook(deletedBook) {
        try {
            dispatch({ type: AppContextAction.LOADING });
            const results = await API.deleteBook(deletedBook._id);
            if (results !== null) {
                // set success toast message
                dispatch({
                    type: AppContextAction.SUCCESS_TOAST,
                    toast: "Book deleted successfully!",
                });
                const newBooks = savedBooks.filter(book => book._id !== deletedBook._id);
                setSavedBooks([...newBooks]);
                if (newBooks.length <= 0)
                    setUserMessage(NO_RESULTS_FOUND);
            } else {
                dispatch({ type: AppContextAction.SHOW_DIALOG, show: true, message: "Delete Failed!" });
            }
            dispatch({ type: AppContextAction.LOADING_COMPLETED });
        } catch (error) {
            console.log(error);
            dispatch({ type: AppContextAction.SHOW_DIALOG, show: true, message: error.message });
        }
    };

};

export default useSavedBooks;