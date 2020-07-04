import React, { useEffect, useState } from 'react'
import API from "./API"
import { AppContextAction, useAppContext } from "./AppContext";
import DeleteIcon from '@material-ui/icons/Delete';

const NO_RESULTS_FOUND = "You have not saved any Books yet!";

// This custom hook handles all functionality related to saved books - i.e
// fetches all saved books from the database and deletes a book
function useSavedBooks() {
    /* eslint-disable no-unused-vars */
    const [_, dispatch] = useAppContext();
    const [savedBooks, setSavedBooks] = useState([]);
    const [userMessage, setUserMessage] = useState(false);

    // Saved Books Page supports delete on books
    const supportedAction = {
        type: "Delete",
        icon: <DeleteIcon />,
        handler: handleDeleteBook,
    }

    // Fetch books when page is loaded
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

    // Deletes a book
    async function handleDeleteBook(deletedBook) {
        try {
            dispatch({ type: AppContextAction.LOADING });
            const results = await API.deleteBook(deletedBook._id, deletedBook.title);
            if (results !== null) {
                // delete successful
                const newBooks = savedBooks.filter(book => book._id !== deletedBook._id);
                setSavedBooks([...newBooks]);
                if (newBooks.length <= 0)
                    setUserMessage(NO_RESULTS_FOUND);
            } else {
                dispatch({ type: AppContextAction.SHOW_DIALOG, show: true, message: "Delete Failed!" });
            }
            dispatch({ type: AppContextAction.LOADING_COMPLETED });
        } catch (error) {
            let errorMessage = error.message;
            if (error.response && error.response.data) {
                errorMessage = error.response.data;
            }
            console.error(errorMessage);
            dispatch({ type: AppContextAction.SHOW_DIALOG, show: true, message: errorMessage });
        }
    };

};

export default useSavedBooks;