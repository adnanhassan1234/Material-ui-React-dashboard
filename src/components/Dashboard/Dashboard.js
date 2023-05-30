import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Container, Grid, Tab, Typography, Button, TextField  } from "@mui/material";
import styled from "styled-components";
// import { Coronavirus } from "@mui/icons-material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BarChartIcon from "@mui/icons-material/BarChart";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import BarCharts from "../Charts/Barchart";
import LineCharts from "../Charts/LineChart";
import axios from "axios";
import DashboardCards from "./DashboardCards";

const Dashboard = () => {
  const [data, setData] = useState([]);
  // const [leaveEmployee] = useState(adminLeaveData);

  // const handleDownload = () => {
  //   // Logic for downloading the charts
  // };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3006/data"); // Replace 'API_URL' with the actual endpoint URL
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate totals
  const totalInfected = data.reduce(
    (total, entry) => total + entry.infected,
    0
  );
  const totalTested = data.reduce((total, entry) => total + entry.tested, 0);
  const totalRecovered = data.reduce(
    (total, entry) => total + entry.recovered,
    0
  );
  const totalDeceased = data.reduce(
    (total, entry) => total + entry.deceased,
    0
  );

  return (
    <>
      <Box className="leave_admin">
        <Container>
          <Typography color="text.primary" variant="h5" mt={2}>
            Dashboard
          </Typography>
          <Typography color="text.primary" variant="body2" mb={2}>
            Welcome to your dashboard
          </Typography>
        </Container>
      </Box>
      {/* dashboard cards crona patients */}
      <Box className="dashboard" mt={3}>
        <Container>
          <Grid container spacing={2}>
            <DashboardCards
              totalInfected={totalInfected}
              title="Total Infected"
            />
            <DashboardCards
              totalInfected={totalRecovered}
              title="Total Recovered"
            />
            <DashboardCards totalInfected={totalTested} title="Total Tested" />
            <DashboardCards
              totalInfected={totalDeceased}
              title="Total Deceased"
            />
          </Grid>
        </Container>
      </Box>
      {/* dashboard cards crona patients */}
      <Box className="charts_tabs" my={5}>
        <Container>
        {/* <Grid item xs={12} sm={6}>
            <TextField
              id="date"
              label="Select Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              // fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDownload}
              // fullWidth
            >
              Download
            </Button>
          </Grid> */}
          <Grid container spacing={2}>
          {/* here date filed and download button in right side */}
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <BarCharts />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <LineCharts />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
