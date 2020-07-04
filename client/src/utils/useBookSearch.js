import React, { useEffect, useState } from 'react'
import API from "./API"
import { AppContextAction, useAppContext } from "./AppContext";
import SaveIcon from '@material-ui/icons/Save';

const NO_RESULTS_FOUND = "Your Search did not match any books!";
const PAGE_INCREMENT = 10;

// This custom hook handles all functionality related to search books - i.e
// perform book searches, infinite scroll and book save 
function useBookSearch() {
    const [state, dispatch] = useAppContext();
    const [hasMoreBooks, setHasMoreBooks] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [userMessage, setUserMessage] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);

    // Search Page supports save on books
    const supportedAction = {
        type: "Save",
        icon: <SaveIcon />,
        handler: handleSaveBook,
    }

    // Execute search on search query changed
    useEffect(() => {
        setPageNumber(1);
        loadPageForQuery(state.searchQuery, 1);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.searchQuery]);

    return {
        userMessage,
        bookList: searchResults,
        hasMoreBooks,
        supportedAction,
        loadNextPage,
    };

    // Loads the next page of data from google books
    function loadNextPage() {
        if (hasMoreBooks) {
            const newPageNumber = pageNumber + PAGE_INCREMENT;
            setPageNumber(newPageNumber);
            loadPageForQuery(state.searchQuery, newPageNumber);
        }
    };

    // Loads the google books data based on the search query and page number passed in
    async function loadPageForQuery(query, page) {
        try {
            if (query !== "") {
                dispatch({ type: AppContextAction.LOADING });
                setUserMessage("");
                const results = await fetchGoogleBooks(query, page);
                if (results != null) {
                    if (page === 1) {
                        // First Page - overwrite old results
                        setSearchResults([...results])
                    } else {
                        // New Page load - append search results
                        setSearchResults([...searchResults, ...results])
                    }
                    setHasMoreBooks(true);
                } else {
                    // No results found
                    if (page === 1) {
                        // First Page - empty dataset
                        setSearchResults([]);
                        setUserMessage(NO_RESULTS_FOUND);
                    }
                    setHasMoreBooks(false);
                }
                dispatch({ type: AppContextAction.LOADING_COMPLETED });
            } else {
                setPageNumber(1);
                setSearchResults([]);
                setHasMoreBooks(false);
                setUserMessage("Please enter a book to search for   ....  ");
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: AppContextAction.SHOW_DIALOG, show: true, message: error.message });
        }
    };

    // Saves a book to the database
    async function handleSaveBook(book) {
        try {
            dispatch({ type: AppContextAction.LOADING });
            const results = await API.saveBook(book);
            if (results === null) {
                dispatch({ type: AppContextAction.SHOW_DIALOG, show: true, message: "Save Failed!" });
            }
            dispatch({ type: AppContextAction.LOADING_COMPLETED });
        } catch (error) {
            let errorMessage = error.message;
            if (error.response && error.response.data) {
                errorMessage = `${error.response.data}`;
            }
            console.error(errorMessage);
            dispatch({ type: AppContextAction.SHOW_DIALOG, show: true, message: errorMessage });
        }
    };

};

// Performs actual query to fetch google books in a format compatible with this app
async function fetchGoogleBooks(query, page) {
    const results = await API.searchBooks(query, page);
    if (results != null && results.data != null
        && results.data.items != null && results.data.items.length > 0) {
        return results.data.items.map(googleBook => {
            const book = {};
            if (googleBook.volumeInfo) {
                book["_id"] = googleBook.id;
                book["title"] = googleBook.volumeInfo.title;
                book["subtitle"] = googleBook.volumeInfo.subtitle;
                book["authors"] = googleBook.volumeInfo.authors;
                book["description"] = googleBook.volumeInfo.description;
                book["googleLink"] = googleBook.volumeInfo.infoLink;
                book["image"] = (googleBook.volumeInfo.imageLinks) ?
                    fixImageUrl(googleBook.volumeInfo.imageLinks.thumbnail)
                    : null;

            }
            return book;
        });
    }
    return null;
}

// Google Books API Returns image links as http so need to replace them
// This is to prevent mixed content errors on heroku
function fixImageUrl(url) {
    return url.replace("http://", "https://");
}

export default useBookSearch;