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
  // const { image, ...content } = selectedData; // Remove 'image' property from 'selectedData'

  return (
    <>
      <Dialog open={open} onClose={handleClosePopup} sx={{ p: 5 }}>
        <Box sx={{ p: 4 }}>
          {Object.keys(selectedData).map((key) => (
            <Typography variant="h6" key={key}>
              <b>{key.toUpperCase()}:</b> {selectedData[key]}
            </Typography>
          ))}
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
