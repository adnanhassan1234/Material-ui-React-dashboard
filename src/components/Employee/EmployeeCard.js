import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import React, { useState } from "react";
import EmployeePopup from "./EmployeePopup";

const EmployeeCard = (content) => {
  const { id, image, name, title } = content;
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const selectedFunction = (item) => {
    console.log(item);
    if (open == true) {
      setOpen(false);
      setSelectedData({});
      // setOpen(true);
    } else {
      setOpen(true);
      setSelectedData(item);
      // setOpen(true);
    }
  };

  // open and close popup
  const handleClosePopup = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const opens = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (id) => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid item lg={3} md={6} sm={12} xs={12}>
        <Card sx={{ position: "relative", textAlign: "center" }}>
          <CardMedia
            sx={{
              height: "85px",
              width: "85px",
              borderRadius: "50%",
              margin: "23px auto 0",
            }}
            image={image}
            title="Employee"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ mb: 0 }}
            >
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <b> {title}</b>
            </Typography>
          </CardContent>
          <IconButton
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={handleClick}
          >
            <MoreVert />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={opens}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleClose(id)}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                selectedFunction(content);
              }}
            >
              View
            </MenuItem>
          </Menu>
        </Card>
      </Grid>
      <EmployeePopup
        open={open}
        handleClosePopup={handleClosePopup}
        selectedData={selectedData}
        onHide={() => setOpen(false)}
      />
    </>
  );
};

export default EmployeeCard;
