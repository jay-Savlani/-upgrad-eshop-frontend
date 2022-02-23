// importing routeController

import { RouteController } from "./routes";

// importing AuthProvider

import { AuthProvider } from "./contexts/authContext";

// imports for material ui

import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider } from "@material-ui/core";


import { Route } from "react-router-dom";

// overriding default material ui theme

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3f51b5",
      light: "#7986cb"
    },
    secondary: {
      main: "#f50057"
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme} >
      <RouteController />
    </ThemeProvider>
  );
}

export default App;
