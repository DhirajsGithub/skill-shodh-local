import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["DM Sans", "sans-serif"].join(","),
    h1: {
      color: "#FFF",

      fontSize: "64px",
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: "normal",
      // "@media (max-width:768px)": {
      //   fontSize: "32px",
      // },
    },
    h2: {
      color: "#FFF",

      fontSize: "48px",
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: "normal",
      "@media (max-width:786px)": {
        fontSize: "32px",
      },
    },
    h3: {
      color: "#FFF",

      fontSize: "32px",
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: "normal",
      "@media (max-width:786px)": {
        fontSize: "24px",
      },
    },
    h4: {
      color: "#FFF",

      fontSize: "24px",
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: "normal",
      "@media (max-width:786px)": {
        fontSize: "20px",
      },
    },
    h5: {
      color: "#FFF",
      fontSize: "20px",
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: "normal",
      letterSpacing: "0.4px",
      "@media (max-width:768px)": {
        fontSize: "16px",
      },
    },
    h6: {
      color: "#FFF",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: "normal",
    },
    body1: {
      color: "#FFF",

      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
      "@media (max-width:768px)": {
        fontSize: "14px",
      },
    },
    body2: {
      color: "#FFF",

      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
    },
    subtitle1: {
      color: "#888888",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
    },
    subtitle2: {
      color: "#888888",

      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
    },
  },
  palette: {
    primary: {
      main: "#5773FF",
      dark: "#18181D",
    },
    secondary: {
      main: "#1B7FF5",
      dark: "#982F93",
    },
    error: {
      main: "#EE2737",
    },
    white: "#FFFFFF",
    white100: "##F2F6FB",
    gray100: "#8B8B8B",
    gray20: "#343434",
  },
});

export default theme;
