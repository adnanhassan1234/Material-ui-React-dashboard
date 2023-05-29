import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Container, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import styled from "@mui/material/styles/styled";
import { TableRow } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import card1 from "../../assets/image/card2.jpg";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import AddNewEmployee from "./AddNewEmployee";

const EmployeeTable = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedEditData, setSelectedEditData] = useState({});

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/users/` + id);
      props.fetchData();
      // handleClose();
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

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={card1}
            style={{ height: "36px", borderRadius: "50%", marginRight: "10px" }}
          />
          <div>
            <div style={{ fontSize: "16px" }}>{params.row.name}</div>
            <div style={{ color: "#999" }}>{params.row.title}</div>
          </div>
        </div>
      ),
    },
    { field: "id", headerName: "Employee ID", width: 160, sortable: false },
    { field: "email", headerName: "Email", width: 170, sortable: false },
    { field: "mobile", headerName: "Mobile", width: 170, sortable: false },
    {
      field: "joiningDate",
      headerName: "Join Date",
      sortable: false,
      width: 150,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const handleClick = (event) => {
          event.stopPropagation(); // when click checkbox not selected
          setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
          setAnchorEl(null);
        };

        const handleEdit = (id) => {
          console.log("Edit clicked for row with ID", id);
          //   console.log("Edit clicked for row with ID", params);
          handleClose();
        };

        const handleDelete = () => {
          // console.log("Delete clicked for row with ID", params.row.id);
          handleClose();
        };

        // for triple dot
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton aria-label="more" size="small" onClick={handleClick}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleEdit(params.row.id);
                  handleOpenEditModal(params.row);
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  deleteUser(params.row.id);
                  handleDelete();
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Container sx={{ my: 5 }}>
        <div style={{ width: "100%" }}>
          <DataGrid
            rows={props.cardContent}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </Container>

      {/* edit user data in model */}
      <AddNewEmployee
        handleClosePopup={() => setOpenEditModal(false)}
        open={openEditModal}
        fetchData={props.fetchData}
        selectedEditData={selectedEditData}
      />
    </>
  );
};

export default EmployeeTable;
