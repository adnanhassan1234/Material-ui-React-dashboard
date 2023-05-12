import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "#0052cc",
  },
  overrides: {
    "@global" :{
        body:{
            backgroundColor: "red",
        },
        body1:{
            color: "red",
        }
    }
  }
});


export default theme;