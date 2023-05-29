import * as React from "react";
import { Box, Grid } from "@material-ui/core";
import useStyles from "./styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import AppsIcon from "@material-ui/icons/Apps";
import ListIcon from "@material-ui/icons/List";
import { Button, Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import EmployeeCard from "./EmployeeCard";
import EmployeeTable from "./EmployeeTable";
import TablePagination from "@mui/material/TablePagination";
// import cardData from "../Utils/CardData";
import axios from "axios";
import { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddNewEmployee from "./AddNewEmployee";

// rest of your code here

export default function Employee(props) {
  var classes = useStyles();
  const [cardContent, setCardContent] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermById, setSearchTermById] = useState("");
  const [searchTermByTitle, setSearchTermByTitle] = useState("");
  const [open, setOpen] = useState(false); // popup
  const [isLoader, setIsLoader] = useState(false);
  // pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // Pagination calculations
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedCardContent = cardContent.slice(startIndex, endIndex);

  // toggle mode grid and list view => true and false
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // fetch data
  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3005/users");
      setCardContent(response.data);
      setIsLoader(true);
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!isLoader) {
    return (
      <Box>
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }

  // search by id , name and designation title base on click search button functionality
  const handleSearch = () => {
    const filteredCards = cardContent.filter(
      (card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        card.id
          .toString()
          .toLowerCase()
          .includes(searchTermById.toLowerCase()) &&
        card.title
          .toString()
          .toLowerCase()
          .includes(searchTermByTitle.toLowerCase())
    );
    setCardContent(filteredCards);
  };

  // open and close popup
  const handleClosePopup = () => {
    setOpen(false);
  };

  // active grid bg color set
  const gridButtonClass = viewMode === "grid" ? "active" : "inactive";
  const listButtonClass = viewMode === "list" ? "active" : "inactive";

  return (
    <>
      <Box className="employee">
        <Container>
          <Typography color="text.primary" variant="h5" my={2}>
            Employee
          </Typography>
          <Grid container spacing={2} className={classes.box}>
            <Grid item sm={8}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                  <b>Dashboard</b>
                </Link>
                <Typography color="text.primary"> Employee</Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item sm={4}>
              <div className={classes.iconRight}>
                <AppsIcon
                  className={`${classes.space} ${gridButtonClass}`}
                  onClick={() => handleViewModeChange("grid")}
                />
                <ListIcon
                  className={`${classes.space} ${listButtonClass}`}
                  onClick={() => handleViewModeChange("list")}
                />
                <Button
                  variant="contained"
                  sx={{ ml: 2 }}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  {" "}
                  <AddIcon /> Add Employee
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ============== field and card section ================= */}
      <Box className="field_card">
        <Container>
          <Grid container spacing={2}>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <Box mt={3}>  
                <TextField
                  fullWidth
                  placeholder="Employee ID"
                  id="fullWidth"
                  // label="Email Address"
                  sx={{ backgroundColor: "#fff" }}
                  onChange={(e) => setSearchTermById(e.target.value)}
                  onBlur={(e) => {
                    if (e.target.value === "") {
                      setSearchTermById("");
                      handleSearch();
                    }
                  }}
                />
              </Box>
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <Box mt={3}>
                <TextField
                  fullWidth
                  placeholder="Employee Name"
                  id="fullWidth"
                  sx={{ backgroundColor: "#fff" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onBlur={(e) => {
                    if (e.target.value === "") {
                      setSearchTerm("");
                      handleSearch();
                    }
                  }}
                />
              </Box>
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <Box mt={3}>
                <FormControl fullWidth sx={{ backgroundColor: "#fff" }}>
                  <InputLabel id="designation-label">
                    Select Designation
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="designation-label"
                    label="Select Designation"
                    id="designation-select"
                    value={searchTermByTitle}
                    onChange={(e) => setSearchTermByTitle(e.target.value)}
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
              </Box>
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{
                    minHeight: "50px",
                    fontSize: "17px",
                    backgroundColor: "#55ce63",
                  }}
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {viewMode === "grid" ? (
        <Box className="employee_card" sx={{ my: 2, pb: 4 }}>
          <Container>
            <Grid container spacing={3}>
              {paginatedCardContent.length === 0 ? (
                <Typography variant="body1" sx={{ mx: 4 }}>
                  No employees found based on the search criteria.
                </Typography>
              ) : (
                paginatedCardContent.map((content, ind) => {
                  return (
                    <EmployeeCard
                      key={ind}
                      {...content}
                      fetchData={fetchData}
                    />
                  );
                })
              )}
            </Grid>
          </Container>
        </Box>
      ) : (
        <Box className="employee_table" sx={{ pb: 4, mt: 0 }}>
          <Grid container>
            {cardContent.length === 0 ? (
              <Typography variant="body1" sx={{ mt: 1, mx: 4 }}>
                No employees found based on the search criteria.
              </Typography>
            ) : (
              <EmployeeTable cardContent={cardContent} fetchData={fetchData} />
            )}
          </Grid>
        </Box>
      )}

      {/* mui Pagination */}
      {viewMode === "grid" ? (
        <Box sx={{ display: "flex", justifyContent: "end", mb: 4 }}>
          <TablePagination
            component="div"
            count={cardContent.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[8, 16, 24]} // You can customize the rows per page options
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      ) : null}
      <AddNewEmployee
        fetchData={fetchData}
        open={open}
        handleClosePopup={handleClosePopup}
        onHide={() => setOpen(false)}
      />
    </>
  );
}
