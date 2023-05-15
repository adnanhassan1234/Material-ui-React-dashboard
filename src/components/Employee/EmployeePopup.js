import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";
import CardMedia from "@mui/material/CardMedia";
import { Box, Typography } from "@material-ui/core";

const EmployeePopup = ({ handleClosePopup, open, selectedData }) => {
  //   console.log("🚀 ~ file: CardModel.js:11 ~ CardModel ~ selectedData:", selectedData)
  return (
    <>
      <Dialog open={open} onClose={handleClosePopup} sx={{ p: 5 }}>
        <Box sx={{ p: 4 }}>
          <Typography variant="h6">
            <b>ID:</b> {selectedData.id}
          </Typography>
          <Typography variant="h6">
            <b>NAME:</b> {selectedData.name}
          </Typography>
          <Typography variant="h6">
            <b>TITLE: </b>{selectedData.title}
          </Typography>
          <Typography variant="h6">
            <b>EMAIL:</b> {selectedData.email}
          </Typography>
          <Typography variant="h6">
            <b>MOBILE:</b> {selectedData.mobile}
          </Typography>
          <Typography variant="h6">
            <b>JOINING DATE:</b> {selectedData.joiningDate}
          </Typography>
          <DialogActions>
            <Button onClick={handleClosePopup} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default EmployeePopup;
