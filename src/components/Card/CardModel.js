import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";
import CardMedia from "@mui/material/CardMedia";

const CardModel = ({ handleClose, open, selectedData }) => {
  //   console.log("🚀 ~ file: CardModel.js:11 ~ CardModel ~ selectedData:", selectedData)
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <CardMedia sx={{ height: 250 }} image={selectedData.image} />
        <DialogTitle> {selectedData.title} </DialogTitle>
        <DialogContent>
          <p>{selectedData.para} </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CardModel;
