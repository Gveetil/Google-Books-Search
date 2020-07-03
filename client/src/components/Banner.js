import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.banner.main,
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
    },
    title: {
        paddingTop: theme.spacing(3),
    },
    subTitle: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(4),
    }
}));

// The banner displayed in the application 
export default function Banner() {
    const classes = useStyles();
    return (
        <Paper elevation={3} align="center"
            className={classes.root}>
            <Typography variant="h4" className={classes.title}>Google Books Search</Typography>
            <Typography variant="h6" className={classes.subTitle}>Search for and Save Books of Interest!</Typography>
        </Paper>
    );
}