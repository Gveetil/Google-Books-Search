import React from "react";
import { Box } from '@material-ui/core';
import BookList from '../components/BookList';
import SearchFilter from '../components/SearchFilter';
import useBookSearch from "../utils/useBookSearch";
import BooksContext from "../utils/BooksContext";

// The search books page 
function Search() {
    const bookSearch = useBookSearch();

    return (
        <Box mb={5}>
            <SearchFilter />
            <BooksContext.Provider value={bookSearch}>
                <BookList title="Results" loadNextPage={bookSearch.loadNextPage} />
            </BooksContext.Provider>
        </Box>
    );
}

export default Search;
