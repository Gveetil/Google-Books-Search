import React, { useEffect, useState } from 'react'
import API from "./API"
import { AppContextAction, useAppContext } from "./AppContext";
import SaveIcon from '@material-ui/icons/Save';

const NO_RESULTS_FOUND = "Your Search did not match any books!";

function useBookSearch(query, pageNumber) {
    /* eslint-disable no-unused-vars */
    const [_, dispatch] = useAppContext();
    const [hasMoreBooks, setHasMoreBooks] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [userMessage, setUserMessage] = useState(false);
    const supportedAction = {
        type: "Save",
        icon: <SaveIcon />,
        handler: handleSaveBook,
    }

    useEffect(() => {

        async function executeSearch(query, pageNumber) {
            try {
                if (query !== "") {
                    setUserMessage("");
                    dispatch({ type: AppContextAction.LOADING });
                    const results = await fetchSearchResults(query, pageNumber);
                    if (results != null) {
                        if (pageNumber === 1) {
                            // New Query - clear search results
                            setSearchResults([...results])
                        } else {
                            // New Page load - append search results
                            setSearchResults([...searchResults, ...results])
                        }
                        setHasMoreBooks(true);
                    } else {
                        if (pageNumber === 1) {
                            // New Query - no search results
                            setSearchResults([]);
                            setUserMessage(NO_RESULTS_FOUND);
                        }
                        setHasMoreBooks(false);
                    }
                    dispatch({ type: AppContextAction.LOADING_COMPLETED });
                } else {
                    setSearchResults([]);
                    setHasMoreBooks(false);
                    setUserMessage("Please enter a book to search for!");
                }
            } catch (error) {
                console.log(error);
                dispatch({ type: AppContextAction.SHOW_DIALOG, show: true, message: error.message });
            }
        };

        executeSearch(query, pageNumber);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, pageNumber]);

    return {
        userMessage,
        bookList: searchResults,
        hasMoreBooks,
        supportedAction
    };

    async function handleSaveBook(book) {
        try {
            dispatch({ type: AppContextAction.LOADING });
            const results = await API.saveBook(book);
            if (results != null) {
                alert("Success!");
            } else {
                dispatch({ type: AppContextAction.SHOW_DIALOG, show: true, message: "Save Failed!" });
            }
            dispatch({ type: AppContextAction.LOADING_COMPLETED });
        } catch (error) {
            console.log(error);
            dispatch({ type: AppContextAction.SHOW_DIALOG, show: true, message: error.message });
        }
    };

};

async function fetchSearchResults(query, pageNumber) {
    const results = await API.searchBooks(query, pageNumber);
    if (results != null && results.data != null
        && results.data.items != null && results.data.items.length > 0) {
        return results.data.items.map(googleBook => {
            const book = {};
            if (googleBook.volumeInfo) {
                book["_id"] = `${pageNumber}${googleBook.id}`;
                book["title"] = googleBook.volumeInfo.title;
                book["subtitle"] = googleBook.volumeInfo.subtitle;
                book["authors"] = googleBook.volumeInfo.authors;
                book["description"] = googleBook.volumeInfo.description;
                book["googleLink"] = googleBook.volumeInfo.infoLink;
                book["image"] = (googleBook.volumeInfo.imageLinks) ?
                    googleBook.volumeInfo.imageLinks.thumbnail
                    : null;

            }
            return book;
        });
    }
    return null;
}

export default useBookSearch;