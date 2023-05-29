import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Grid,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";

const AddNewEmployee = ({
  handleClosePopup,
  open,
  fetchData,
  selectedEditData = {},
}) => {
  const [formData, setFormData] = useState({ ...selectedEditData });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (Object.keys(selectedEditData).length > 0) {
      setFormData({ ...selectedEditData });
    }
  }, [selectedEditData]);

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (selectedEditData.id) {
        // If selectedEditData has an ID, it means we are editing an existing user
        await axios.put(`http://localhost:3005/users/${selectedEditData.id}`, {
          ...formData,
        });
        enqueueSnackbar("User updated successfully!", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else {
        // If selectedEditData does not have an ID, it means we are adding a new user
        await axios.post("http://localhost:3005/users", { ...formData });
        enqueueSnackbar("User added successfully!", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      }

      setFormData({}); // Clear the form fields by resetting formData to an empty object
      handleClosePopup();
      setTimeout(() => {
        fetchData();
      }, 1000);
    } catch (error) {
      enqueueSnackbar("An error occurred while saving the user.", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
      console.error(error);
    }
  }

  return (
    <>
      <Dialog open={open} onClose={handleClosePopup} sx={{ p: 1 }}>
        <DialogActions>
          <Typography variant="h5" style={{ margin: "auto", marginTop: "9px" }}>
            {selectedEditData.id ? "Edit Employee" : "Add Employee"}
          </Typography>
          <Button onClick={handleClosePopup} autoFocus>
            <CancelOutlinedIcon />
          </Button>
        </DialogActions>
        <Box sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  type="text"
                  fullWidth
                  placeholder="Enter First Name"
                  id="fullWidth"
                  sx={{ backgroundColor: "#fff" }}
                  name="name"
                  required
                  value={formData.name || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  type="text"
                  fullWidth
                  placeholder="Enter Email"
                  id="fullWidth"
                  sx={{ backgroundColor: "#fff" }}
                  name="email"
                  required
                  value={formData.email || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  id="fullWidth"
                  sx={{ backgroundColor: "#fff" }}
                  name="joiningDate"
                  required
                  value={formData.joiningDate || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  id="fullWidth"
                  sx={{ backgroundColor: "#fff" }}
                  name="mobile"
                  required
                  placeholder="Enter Mobile Number"
                  value={formData.mobile || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={12}>
                <FormControl fullWidth sx={{ backgroundColor: "#fff" }}>
                  <InputLabel id="designation-label">
                    Select Designation
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="designation-label"
                    id="designation-select"
                    name="title"
                    required
                    value={formData.title || ""}
                    onChange={handleChange}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Web Developer">Web Developer</MenuItem>
                    <MenuItem value="Web Designer">Web Designer</MenuItem>
                    <MenuItem value="Android Developer">
                      Android Developer
                    </MenuItem>
                    <MenuItem value="iOS Developer">iOS Developer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box sx={{ textAlign: "center", my: 3 }}>
              <Button variant="contained" sx={{ ml: 2 }} type="submit">
                {selectedEditData.id ? "Update Employee" : "Add Employee"}
              </Button>
            </Box>
          </form>
        </Box>
      </Dialog>
    </>
  );
};

export default AddNewEmployee;
