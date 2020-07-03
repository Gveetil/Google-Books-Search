import { createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/blue';
import blueGrey from '@material-ui/core/colors/blueGrey';

const white = "#FFF";
const black = "#000";

// Create a theme instance to be used to style the application.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: cyan[900],
            contrastText: white,
        },
        secondary: {
            main: teal[700],
            contrastText: white,
        },
        background: {
            default: white,
            contrastText: black,
        },
        text: {
            secondary: cyan[700],
        },
        footer: {
            main: blueGrey[100],
            contrastText: cyan[900],
        },
        header: {
            text: teal[100],
            activeText: teal.A200,
            hoverText: teal.A200,
        },
        banner: {
            main: blueGrey[100],
        },
        buttonHover: {
            main: 'grey',
        },
    },
    typography: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        overline: {
            fontSize: "small"
        },
        h4: {
            color: cyan[900],
            fontFamily: '"Comic Sans MS", Arial, Helvetica, sans-serif',
        },
        h6: {
            fontFamily: '"Comic Sans MS", Arial, Helvetica, sans-serif',
        },
    },
    overrides: {
        MuiSvgIcon: {
            root: {
                marginRight: "0.4rem",
            }
        },
        MuiCardHeader: {
            root: {
            },
            title: {
                fontSize: "large",
            }
        }
    }
});

export default theme;