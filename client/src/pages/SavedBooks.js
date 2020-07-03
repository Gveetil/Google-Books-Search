import React from "react";
import { Box, Paper } from '@material-ui/core';
import BookList from '../components/BookList';
import useSavedBooks from "../utils/useSavedBooks";
import BooksContext from "../utils/BooksContext";

// The saved books page 
function SavedBooks() {
    const savedBooks = useSavedBooks();

    return (
        <Box mb={5}>
            <BooksContext.Provider value={savedBooks}>
                <Paper elevation={3}>
                    <BookList title="Saved Books" />
                </Paper>
            </BooksContext.Provider>
        </Box>
    );
}

export default SavedBooks;
