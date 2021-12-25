import React from "react";

import "swiper/swiper.min.css";

import "./App.scss";
import { BrowserRouter, Route } from "react-router-dom";
import Routes from "./config/Routes";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Route
          render={(props: any) => (
            <React.Fragment>
              <Header />
              <Routes />
              <Footer />
            </React.Fragment>
          )}
        ></Route>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
