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
import { MoreVert, Edit } from "@mui/icons-material";
import React, { useState } from "react";
import EmployeePopup from "./EmployeePopup";
import card1 from "../../assets/image/card1.jpg";
import axios from "axios";
import { useSnackbar } from "notistack";
import AddNewEmployee from "./AddNewEmployee";

const EmployeeCard = ({
  id,
  image,
  name,
  title,
  joiningDate,
  email,
  mobile,
  fetchData,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedEditData, setSelectedEditData] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const selectedFunction = (item) => {
    console.log(item);
    if (open === true) {
      setOpen(false);
      setSelectedData({});
    } else {
      setOpen(true);
      setSelectedData(item);
    }
  };

  const handleClosePopup = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const opens = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/users/` + id);
      fetchData();
      handleClose();
      enqueueSnackbar("User deleted successfully!", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } catch (error) {
      console.error(error);
      console.log(error.response);
      enqueueSnackbar("An error occurred while deleting the user.", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }
  };

  const handleOpenEditModal = (user) => {
    setSelectedEditData(user);
    setOpenEditModal(true);
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
            image={card1}
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
              <b>{title}</b>
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
            <MenuItem onClick={() => handleOpenEditModal({ id, name, email, title, mobile, joiningDate })}>Edit</MenuItem>
            <MenuItem
              onClick={() => {
                deleteUser(id);
                handleClose();
              }}
            >
              Delete
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                selectedFunction({
                  id,
                  name,
                  email,
                  title,
                  mobile,
                  joiningDate,
                });
              }}
            >
              View
            </MenuItem>
          </Menu>
        </Card>
      </Grid>

      <AddNewEmployee
        handleClosePopup={() => setOpenEditModal(false)}
        open={openEditModal}
        fetchData={fetchData}
        selectedEditData={selectedEditData}
      />

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
