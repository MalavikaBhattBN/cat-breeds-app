import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#0097A7", dark: "#006064", light: "#00BCD4" },
    secondary: { main: "#f50057" },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    fontSize: 12,
  },
  components: {
    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: "1px solid #E0E0E0",

          "&:hover": {
            borderColor: '#0097A7',
          },

          "&:focus-within": {
            border: "2px solid #0097A7",
          }
        }
      }
    },
    MuiCircularProgress:{
      defaultProps:{
        size:40,
        thickness:4,
        color:"primary"
      }
    }
  }

});