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
import cardData from "./CardData";
import EmployeeTable from "./EmployeeTable";
import ReactPaginate from "react-paginate";
import { useEffect } from "react";

// rest of your code here

export default function Employee(props) {
  var classes = useStyles();
  const [cardContent, setCardContent] = useState(cardData);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermById, setSearchTermById] = useState("");
  const [searchTermByTitle, setSearchTermByTitle] = useState("");

  // ======= start pagination =======
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Set default value to 8

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(cardContent.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(cardContent.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, cardContent]);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  // rows per page
  const handleRowsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setItemOffset(0);
  }; // ======= close pagination =======

  // toggle mode grid and list view => true and false
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // search by id , name and designation title base on click search button functionality
  const handleSearch = () => {
    const filteredCards = cardData.filter(
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

  // active grid bg color set
  const gridButtonClass = viewMode === "grid" ? "active" : "inactive";
  const listButtonClass = viewMode === "list" ? "active" : "inactive";

  return (
    <>
      <Box className="employee">
        <Container>
          <Typography color="text.primary" variant="h4" my={2}>
            Employee
          </Typography>
          <Grid container spacing={2} className={classes.box}>
            <Grid item sm={8}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                  <b>Dashboard</b>
                </Link>
                <Typography color="text.primary">Employee</Typography>
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
        {/* maxWidth="xxl" */}
          <Container>
            <Grid container spacing={3}>
              {currentItems.length === 0 ? (
                <Typography variant="body1" sx={{ mx: 4 }}>
                  No employees found based on the search criteria.
                </Typography>
              ) : (
                currentItems.map((content, ind) => {
                  return <EmployeeCard key={ind} {...content} />;
                })
              )}
            </Grid>
          </Container>
        </Box>
      ) : (
        <Box className="employee_table" sx={{ pb: 4, mt: 0 }}>
          {/* <Container> */}
          <Grid container>
            {cardContent.length === 0 ? (
              <Typography variant="body1" sx={{ mt: 1, mx: 4 }}>
                No employees found based on the search criteria.
              </Typography>
            ) : (
              <EmployeeTable cardContent={cardContent} />
            )}
          </Grid>
          {/* </Container> */}
        </Box>
      )}

      {/* employee card pagination */}
      <Container sx={{ mb: 5 }}>
        {viewMode === "grid" ? (
          <div className="result_pagination">
            <span> Rows: </span> &nbsp;{itemsPerPage}
            <select onChange={handleRowsPerPageChange} value={itemsPerPage}>
              <option value={8} selected>
                8
              </option>
              {/* Set default to 3 */}
              <option value={12}>12</option>
              <option value={16}>16</option>
              <option value={32}>32</option>
            </select>
            <Box sx={{mx:3}}>
              {itemOffset + 1} - {itemOffset + itemsPerPage} of{" "}
              {cardContent.length}
            </Box>
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              rowsPerPage={itemsPerPage}
              previousLabel="Prev"
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageLinkClassName="page-num"
              previousLinkClassName="page-num"
              nextLinkClassName="page-num"
              activeLinkClassName="active"
            />
          </div>
        ) : null}
      </Container>
    </>
  );
}
