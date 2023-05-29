import React, { useState } from "react";
import { Box, Card, Grid } from "@material-ui/core";
import { Breadcrumbs, CardContent, Container, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const adminLeaveData = [
  {
    title: "Today Presents",
    leave: "12 / 60",
  },
  {
    title: "Planned Leaves",
    leave: "8",
    day: "Today",
  },
  {
    title: "Unplanned Leaves",
    leave: "0",
    day: "Today",
  },
  {
    title: "Pending Requests",
    leave: "12",
  },
];


const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];


const LeaveAdmin = () => {
  const [leaveEmployee, setLeaveEmployee] = useState(adminLeaveData);

  return (
    <>
      {/* leave_admin */}
      <Box className="leave_admin">
        <Container>
          <Typography color="text.primary" variant="h5" my={2}>
            Employee
          </Typography>
          <Grid container spacing={2}>
            <Grid item sm={8}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  underline="hover"
                  color="inherit"
                  href="/"
                  style={{ textDecoration: "none", color: "#717171" }}
                >
                  <b>Leaves</b>
                </Link>
                <Typography color="text.primary">Leaves</Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>
        </Container>
        </Box>

        {/* ================== employee count data ================== */}
     
      <Box className="leave_admin" sx={{ mt: 4 }}>
        <Container>
          <Grid container spacing={2}>
            {leaveEmployee?.map((content, ind) => {
              return (
                <>
                  <Grid item lg={3} md={6} sm={6} xs={12} key={ind}>
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ mb: 0 }}
                      >
                        {content.title}
                      </Typography>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        <b>{content.leave}</b> &nbsp;{" "}
                        <span style={{ fontSize: "13px", color: "#717171" }}>
                          {content.day}
                        </span>
                      </Typography>
                    </CardContent>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Container>
      </Box>
      {/* ================== employee field ================== */}
      <Box className="admin_field">
        <Container>
          <Grid container spacing={2}>
          <Grid item lg={2} md={6} sm={6} xs={12}>
          <TextField
                  fullWidth
                  // placeholder="Employee Name"
                  id="fullWidth"
                  label="Employee Name"
                  sx={{ backgroundColor: "#fff" }}
                 
                />
            </Grid>      
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default LeaveAdmin;
