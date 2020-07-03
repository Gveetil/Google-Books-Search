import React from 'react';
import { Link, useLocation } from "react-router-dom"
import DropDownMenu from "./DropDownMenu"
import { Hidden, AppBar, Toolbar, ButtonGroup } from "@material-ui/core";
import { ToggleButtonGroup } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import { NavBanner, NavButton } from "./styles";

// Application header / navigation toolbar
export default function NavBar() {
    const location = useLocation();
    return (
        <div>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Hidden smUp>
                        <DropDownMenu />
                    </Hidden>
                    <ButtonGroup variant="text">
                        <NavBanner component={Link} to="/">Google Books</NavBanner>
                    </ButtonGroup>
                    <Hidden xsDown>
                        <ToggleButtonGroup>
                            <NavButton component={Link} to="/Search" value="Search"
                                selected={isSelected(location.pathname, "/")}>
                                <SearchIcon /> Search</NavButton>
                            <NavButton component={Link} to="/Saved" value="Saved"
                                selected={isSelected(location.pathname, "/Saved")}>
                                <BookmarksIcon /> Saved</NavButton>
                        </ToggleButtonGroup>
                    </Hidden>
                </Toolbar>
            </AppBar>
        </div>
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