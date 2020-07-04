import React, { useState, useEffect } from 'react';
import { Box, TextField, Container } from '@material-ui/core';
import { RoundedButton } from "./styles";
import { AppContextAction, useAppContext } from "../utils/AppContext";
import SearchIcon from '@material-ui/icons/Search';

// Validation message displayed when search is executed without a book name
const incorrectDataMessage = (<>
    <strong>Incomplete Entry! </strong>
    <br /> Please enter a book name.
</>);

// The search filter component 
export default function SearchFilter() {
    const [state, dispatch] = useAppContext();
    const [searchName, setSearchName] = useState('');

    // Update local state on change of book name
    const handleChange = (event) => {
        setSearchName(event.target.value);
    };

    // Handles submit of search - run search if book name is entered
    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchName.trim().length === 0) {
            // Validation message
            dispatch({
                type: AppContextAction.SHOW_DIALOG,
                show: true, message: incorrectDataMessage
            });
            return;
        }
        // update global state to execute search
        dispatch({
            type: AppContextAction.UPDATE_SEARCH_QUERY,
            query: searchName.trim()
        });
    }

    // Update search criteria from previous search on load
    useEffect(() => {
        setSearchName(state.searchQuery);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container maxWidth="sm">
            <form noValidate autoComplete="off">
                <Box display="flex" px={1} py={4} justifyContent="flex-end">
                    <TextField
                        id="search-book"
                        label="Book"
                        autoFocus
                        value={searchName}
                        placeholder="Enter a book name ..."
                        onChange={handleChange}
                        color="secondary"
                        fullWidth
                        margin="dense"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <RoundedButton size="small" type="submit"
                        onClick={handleSubmit}
                        variant="contained">
                        <SearchIcon />
                            Search
                    </RoundedButton>
                </Box>
            </form>
        </Container>);
}