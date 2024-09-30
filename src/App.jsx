import React, { useEffect } from "react";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { RouterProvider } from "react-router-dom";
import muiTheme from "./muiTheme";
import router from "./router";
import { HelmetProvider } from "react-helmet-async";
import SEO from "./SEO";

function App() {
  return (
    <HelmetProvider>
    <ThemeProvider theme={muiTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
