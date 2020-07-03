import React, { useContext } from 'react';
import { Typography, Card, Box, CardActionArea, CardActions, CardMedia, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { AppButton } from "../styles";
import BooksContext from "../../utils/BooksContext";

// Default image loaded when no image url is found
const noImageDefaultCover = "https://books.google.com.au/googlebooks/images/no_cover_thumb.gif";

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    headerPanel: {
        [theme.breakpoints.down('xs')]: {
            flexWrap: "wrap",
        },
        flexWrap: "",
    },
    cardHeader: {
        "&:last-child": {
            paddingBottom: theme.spacing(1),
        }
    },
    content: {
        [theme.breakpoints.down('xs')]: {
            flexWrap: "wrap",
        },
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    title: {
        fontSize: "0.9rem",
    },
    image: {
        height: 151,
        width: "auto",
        margin: theme.spacing(1),
    },
    imageAction: {
        height: "auto",
        width: "auto",
    },
}));

// This component generates a book card based on the book passed in
export default function SearchItem(props) {
    const classes = useStyles();
    const { supportedAction } = useContext(BooksContext);

    return (
        <Card variant="outlined" square>
            <Box display="flex" p={1} pb={0} mb={0} className={classes.headerPanel} alignItems="flex-start">
                <Box display="flex" flexGrow={1}>
                    <CardContent align="left" className={classes.cardHeader}>
                        <Typography variant="h5" component="h5" >
                            {props.book.title}
                        </Typography>
                        <Typography className={classes.title} gutterBottom>
                            {props.book.subtitle}
                        </Typography>
                        {(props.book.authors) ?
                            <Typography className={classes.title} color="textSecondary" >
                                Written by {props.book.authors.join(", ")}
                            </Typography>
                            : ""}
                    </CardContent>
                </Box>
                <Box display="flex" flexGrow={0}>
                    <CardActions>
                        <AppButton size="small" variant="contained"
                            component="a" target="_blank"
                            href={props.book.googleLink}>
                            <OpenInNewIcon />
                        View
                    </AppButton>
                        <AppButton size="small" variant="contained"
                            onClick={() => supportedAction.handler(props.book)}>
                            {supportedAction.icon}
                            {supportedAction.type}
                        </AppButton>
                    </CardActions>
                </Box>
            </Box>
            <Box display="flex" p={0} className={classes.content} alignItems="flex-start">
                <Box display="flex" flexGrow={0} mx="auto">
                    <CardActionArea
                        component="a" target="_blank"
                        href={props.book.googleLink}
                        className={classes.imageAction}>
                        <CardMedia
                            component="img"
                            alt={props.book.title}
                            className={classes.image}
                            image={(props.book.image) ?
                                props.book.image
                                :
                                noImageDefaultCover}
                            title={props.book.title}
                        />
                    </CardActionArea>
                </Box>
                <Box display="flex" flexGrow={1}>
                    <CardContent align="left">
                        <Typography variant="body2" component="p" align="justify" >
                            {props.book.description}
                        </Typography>
                    </CardContent>
                </Box>
            </Box>
        </Card >)
        ;
}