import React from 'react';
import { Link, useLocation } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, IconButton, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    icon: {
        padding: "0rem",
        color: theme.palette.header.activeText,
        paddingRight: "0.7rem",
    },
    drawer: {
        width: theme.spacing(20),
    },
}));

// Drop down navigation menu with expand icon for smaller viewports
export default function DropDownMenu(props) {
    const [opened, setOpened] = React.useState(false);
    const classes = useStyles();
    const location = useLocation();

    // Toggle show / close of menu 
    const toggleDrawer = (isOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpened(isOpen);
    };

    return (
        <>
            <IconButton
                className={classes.icon}
                aria-label="open menu"
                edge="end"
                onClick={toggleDrawer(true)}
            >
                <MenuIcon />
            </IconButton>
            <Drawer anchor='left' open={opened} onClose={toggleDrawer(false)}>
                <div
                    className={classes.drawer}
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        <ListItem button component={Link} to="/Search" key="search"
                            selected={isSelected(location.pathname, "/")}>
                            <ListItemIcon><SearchIcon /></ListItemIcon>
                            <ListItemText primary="Search" />
                        </ListItem>
                        <ListItem button component={Link} to="/Saved" key="saved"
                            selected={isSelected(location.pathname, "/Saved")}>
                            <ListItemIcon><BookmarksIcon /></ListItemIcon>
                            <ListItemText primary="Saved" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </>
    );
}

// Returns true if current route is selected
function isSelected(currentPath, route) {
    if (route === "/") {
        // To check for the default route, exclude other routes
        return (currentPath !== "/Saved");
    }
    return (currentPath === route);
}