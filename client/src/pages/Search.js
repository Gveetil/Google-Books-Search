import React, { useState } from "react";
import { Box } from '@material-ui/core';
import BookList from '../components/BookList';
import SearchFilter from '../components/SearchFilter';
import useBookSearch from "../utils/useBookSearch";
import BooksContext from "../utils/BooksContext";

const pageIncrement = 10;

// The search books page 
function Search() {
    const [query, setQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const bookSearch = useBookSearch(query, pageNumber);

    function loadNextPage() {
        if (bookSearch.hasMoreBooks) {
            setPageNumber(pageNumber + pageIncrement)
        }
    };

    async function handleSearch(bookName) {
        setPageNumber(1);
        setQuery(bookName);
    };

    return (
        <Box mb={5}>
            <SearchFilter handleSearch={handleSearch} />
            <BooksContext.Provider value={bookSearch}>
                <BookList title="Results" loadNextPage={loadNextPage} />
            </BooksContext.Provider>
        </Box>
    );
}

export default Search;
