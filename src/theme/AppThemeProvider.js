import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2", // Primary color
    },
    secondary: {
      main: "#FF4081", // Secondary color
    },
    grey: {
      light: "#F5F5F5", // Light Gray
      main: "#7F7F94", // Medium Gray
      dark: "#424242", // Dark Gray
    },
    pink: {
      main: "#FF1493",
    },
    white: {
      main: "#FAFAFA", // Soft White
    },
    bodyColor: {
      main: "#18203D",
      light: "#212748",
    },
    lightBlack: {
      main: "#090D25",
    },
    darkBlack: {
      main: "#151922",
    },
    dividerColor: {
      main: "#32345D",
    },
    green: {
      main: "#96D373",
    },
    purple: {
      main: "#533EC9",
    },
    orange: {
      main: "#43343E",
      dark: "#FF9448",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "black",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "grey",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
  },
});
function AppThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default AppThemeProvider;
