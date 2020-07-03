import React from "react";
import { Box, Paper, Divider } from '@material-ui/core';
import BookList from '../components/BookList';
import SearchFilter from '../components/SearchFilter';
import useBookSearch from "../utils/useBookSearch";
import BooksContext from "../utils/BooksContext";

// The search books page 
function Search() {
    const bookSearch = useBookSearch();

    return (
        <Box mb={5}>
            <Paper elevation={3}>
                <SearchFilter />
                <Divider />
                <BooksContext.Provider value={bookSearch}>
                    <BookList title="" loadNextPage={bookSearch.loadNextPage} />
                </BooksContext.Provider>
            </Paper>
        </Box>
    );
}

export default Search;
