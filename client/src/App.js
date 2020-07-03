import React from 'react';
import 'fontsource-roboto';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Container } from "@material-ui/core";
import { AppProvider } from "./utils/AppContext";
import theme from './utils/theme';
import SavedBooks from "./pages/SavedBooks";
import Search from "./pages/Search";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Banner from "./components/Banner";
import AppDialog from './components/AppDialog';
import AppBackDrop from './components/AppBackDrop';
import SuccessToast from './components/SuccessToast';

// Renders the main application root component
function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <CssBaseline />
          <NavBar />
          <Container maxWidth="md">
            <Banner />
            <Switch>
              <Route exact path="/Saved">
                <SavedBooks />
              </Route>
              <Route path="/">
                <Search />
              </Route>
            </Switch>
          </Container>
          <AppDialog />
          <Footer />
          <AppBackDrop />
          <SuccessToast />
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
