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
import card1 from "../../assets/image/card1.jpg";
import EmployeeCard from "./EmployeeCard";

const cardData = [
  {
    id: 1,
    image: card1,
    name: "John Doe",
    title: "Web Designer",
  },
];

export default function Employee(props) {
  var classes = useStyles();
  const [designation, setDesignation] = useState("");

  const handleDesignationChange = (event) => {
    setDesignation(event.target.value);
  };

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
                <AppsIcon className={classes.space} />
                <ListIcon className={classes.space} />
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

      {/* ============= employee card ================ */}
      <Box className="employee_card" sx={{ my: 4 }}>
        <Container>
          <Grid container spacing={3}>
            {cardData?.map((content, ind) => {
              return <EmployeeCard key={ind} {...content} />;
            })}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
