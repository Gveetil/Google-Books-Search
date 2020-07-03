import { withStyles } from "@material-ui/core/styles";
import theme from '../utils/theme';
import { Button } from "@material-ui/core";
import { ToggleButton } from '@material-ui/lab';

// Styled components for re-use within the applicaiton

// Navigation Bar Link Button
export const NavButton = withStyles({
    root: {
        color: theme.palette.header.text,
        padding: "1rem",
        paddingTop: "1.3rem",
        '&$selected': {
            color: theme.palette.header.activeText,
        },
        '&:hover': {
            color: theme.palette.header.hoverText,
        },
        '&:focus': {
            color: theme.palette.header.hoverText,
        }
    },
    selected: {},
    label: {
        textTransform: 'none',
    },
})(ToggleButton);

// Navigation Bar Clickable Banner
export const NavBanner = withStyles({
    root: {
        color: theme.palette.header.text,
        padding: "0.4rem",
        paddingRight: "1rem",
    },
    label: {
        fontSize: "1.5rem",
        textTransform: 'none',
    },
})(Button);

// Buttons used within the application
export const AppButton = withStyles({
    root: {
        backgroundColor: theme.palette.secondary.main,
        '&:hover, &.active:hover': { backgroundColor: theme.palette.buttonHover.main, },
        color: theme.palette.secondary.contrastText,
        padding: theme.spacing(0.7),
        paddingLeft: theme.spacing(1.2),
        paddingRight: theme.spacing(1.7),
        margin: theme.spacing(0.5),
        marginTop: "auto",
        '& > span > svg': {
            marginRight: theme.spacing(0.5),
            [theme.breakpoints.down('xs')]: {
                marginRight: theme.spacing(0),
            }
        },
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1),
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
            minWidth: 0,
            borderRadius: 45,
        },
    },
    label: {
        [theme.breakpoints.down('xs')]: {
            fontSize: 0,
        },
        textTransform: 'none',
    },
})(Button);

export const RoundedButton = withStyles({
    root: {
        backgroundColor: theme.palette.secondary.main,
        '&:hover, &.active:hover': { backgroundColor: theme.palette.buttonHover.main, },
        color: theme.palette.secondary.contrastText,
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        margin: theme.spacing(0.5),
        marginTop: "auto",
        marginLeft: theme.spacing(2),
        borderRadius: 35,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0,
            padding: theme.spacing(1),
            paddingLeft: theme.spacing(1.2),
            paddingRight: theme.spacing(1.2),
            minWidth: 0,
            borderRadius: 45,
        },
    },
    label: {
        [theme.breakpoints.down('xs')]: {
            fontSize: 0,
        },
        textTransform: 'none',
    },
})(Button);

export const MoreButton = withStyles({
    root: {
        backgroundColor: theme.palette.secondary.main,
        '&:hover, &.active:hover': { backgroundColor: theme.palette.buttonHover.main, },
        color: theme.palette.secondary.contrastText,
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        margin: theme.spacing(0.5),
        marginTop: "auto",
        marginLeft: theme.spacing(2),
        borderRadius: 35,
    },
})(Button);