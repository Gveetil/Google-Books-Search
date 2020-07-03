import React from "react";
import { Box } from '@material-ui/core';
import BookList from '../components/BookList';
import useSavedBooks from "../utils/useSavedBooks";
import BooksContext from "../utils/BooksContext";

// The saved books page 
function SavedBooks() {
    const savedBooks = useSavedBooks();

    return (
        <Box mb={5}>
            <BooksContext.Provider value={savedBooks}>
                <BookList title="Saved Books" />
            </BooksContext.Provider>
        </Box>
    );
}

export default SavedBooks;
