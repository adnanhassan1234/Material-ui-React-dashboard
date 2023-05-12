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

export default function Employee(props) {
  var classes = useStyles();
  const [designation, setDesignation] = useState("");
  const [cardContent, setCardContent] = useState(cardData);
  const [viewMode, setViewMode] = useState("grid");
  

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleDesignationChange = (event) => {
    setDesignation(event.target.value);
  };


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
                    value={designation}
                    onChange={handleDesignationChange}
                  >
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
                >
                  Search
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {viewMode === "grid" ? (
        <Box className="employee_card" sx={{ my: 2, pb:4 }}>
          <Container>
            <Grid container spacing={3}>
              {cardContent?.map((content, ind) => {
                return <EmployeeCard key={ind} {...content} />;
              })}
            </Grid>
          </Container>
        </Box>
      ) : (
        <Box className="employee_table" sx={{ pb:4 , mt:0 }}>
          {/* <Container> */}
            <Grid container>
              <EmployeeTable cardContent={cardContent} />
            </Grid>
          {/* </Container> */}
        </Box>
      )}
    </>
  );
}
