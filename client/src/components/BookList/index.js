import React from 'react';
import BookCard from './BookCard';
import BooksContext from "../../utils/BooksContext";
import { Grid, Box, Typography, Paper } from "@material-ui/core";
import { MoreButton } from "../styles";

// This component loads up books into a grid based on the current book context
export default function BookList(props) {
    return (
        <BooksContext.Consumer>
            {({ bookList, userMessage, hasMoreBooks }) => (
                <div>
                    {(bookList !== null && bookList.length > 0) ?
                        loadBooks(props.title, bookList)
                        :
                        showEmptyBookList(userMessage)}
                    {(hasMoreBooks) ?
                        <Box py={4} align="center">
                            <MoreButton size="small" color="secondary" variant="contained" onClick={props.loadNextPage}>
                                ... Load More ...
                            </MoreButton>
                        </Box>
                        : ""
                    }
                </div>
            )}
        </BooksContext.Consumer>);
}

// Renders a message when the book list is empty  
function showEmptyBookList(message) {
    return (
        <Box align="center" p={5}>
            <Typography variant="h6" component="h6">
                {message}
            </Typography>
        </Box>
    );
}

// Render all books from the book list  
function loadBooks(title, bookList) {
    return (
        <Box p={2} align="center" >
            {(title != "") &&
                (<Box m={3} mb={4}>
                    <Typography variant="h6">
                        {title}
                    </Typography>
                </Box>)}
            <Box align="center" mt={1}>
                <Grid container justify="center">
                    {bookList.map((book, index) => (
                        <Grid item xs={12} key={index}>
                            <BookCard book={book} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}