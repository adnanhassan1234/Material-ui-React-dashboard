import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  iconRight: {
    display: "flex",
    justifyContent: "flex-end",
    // border:"1px solid #aaa",
  },

  space: {
    marginLeft: "8px",
    fontSize: "32px !important",
    padding: "1px",
    backgroundColor: " white",
    cursor: "pointer",
    border:"1px solid #e3e3e3",
  },
  // box: {
  //   [theme.breakpoints.up("xs")]: {
  //     justifyContent: "space-between", // hide on screens smaller than 600px
  //   },
  // },
}));
