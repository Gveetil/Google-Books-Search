import React from 'react';
import { Card, Box, TextField, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { RoundedButton } from "./styles";
import { AppContextAction, useAppContext } from "../utils/AppContext";
import SearchIcon from '@material-ui/icons/Search';

// Validation message displayed when search is executed without a book name
const incorrectDataMessage = (<>
    <strong>Incomplete Entry! </strong>
    <br /> Please enter a book name.
</>);

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    header: {
        padding: theme.spacing(1),
    },
    title: {
        fontFamily: theme.typography.h6.fontFamily,
    },
}));

// This component generates a portfolio card based on the props passed in
export default function SearchFilter(props) {
    /* eslint-disable no-unused-vars */
    const [_, dispatch] = useAppContext();

    const classes = useStyles();
    const [searchName, setSearchName] = React.useState('');

    // Update state on change of book name
    const handleChange = (event) => {
        setSearchName(event.target.value);
    };

    // Method shows a dialog box with the given message
    const showDialog = (message) => {
        dispatch({ type: AppContextAction.SHOW_DIALOG, show: true, message });
    };

    // Handles submit of search - run search if book name is entered
    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchName.trim().length === 0) {
            showDialog(incorrectDataMessage);
            return;
        }
        props.handleSearch(searchName.trim());
    }

    return (
        <Card className={classes.root}>
            <CardHeader title="Book Search"
                classes={{
                    root: classes.header,
                    title: classes.title,
                }}
            />
            <form noValidate autoComplete="off">
                <Box display="flex" px={1} pb={2} justifyContent="flex-end">
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
        </Card >)
        ;
}