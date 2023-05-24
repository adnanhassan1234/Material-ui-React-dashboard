import React from "react";
import { Box, Card, Grid } from "@material-ui/core";
import { Breadcrumbs, CardContent, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const LeaveAdmin = () => {
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
                  <b>Dashboard</b>
                </Link>
                <Typography color="text.primary">Leaves</Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>
        </Container>

        {/* ================== employee count data ================== */}
      </Box>
      <Box className="leave_admin" sx={{ mt: 4 }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ mb: 0 }}
                >
                  Today Presents
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  <b>12 / 60</b>
                </Typography>
              </CardContent>
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ mb: 0 }}
                >
                  Planned Leaves
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  <b>8</b> &nbsp;{" "}
                  <span style={{ fontSize: "13px", color: "#717171" }}>
                    Today
                  </span>
                </Typography>
              </CardContent>
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ mb: 0 }}
                >
                  Unplanned Leaves
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  <b>0</b> &nbsp;{" "}
                  <span style={{ fontSize: "13px", color: "#717171" }}>
                    Today
                  </span>
                </Typography>
              </CardContent>
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ mb: 0 }}
                >
                  Pending Requests
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  <b>12</b>
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default LeaveAdmin;
