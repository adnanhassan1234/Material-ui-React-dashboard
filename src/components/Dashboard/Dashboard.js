import React, { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Tab,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import styled from "styled-components";
// import { Coronavirus } from "@mui/icons-material";
import axios from "axios";
import DashboardCards from "./DashboardCards";
import NorthOutlinedIcon from '@mui/icons-material/NorthOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import LineCharts from "../Charts/LineChart";
import BarCharts from "../Charts/BarCharts";


const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [leaveEmployee] = useState(adminLeaveData);

  // const handleDownload = () => {
  //   // Logic for downloading the charts
  // };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3006/data"); // Replace 'API_URL' with the actual endpoint URL
      setData(response.data);
      setLoading(true);
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

  if (!loading) {
    return (
      <>
        <h2>Loading...</h2>
      </>
    );
  }

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
              icon={<ArrowUpwardOutlinedIcon />}
              title="Total Infected"
            />
            <DashboardCards
              totalInfected={totalRecovered}
              icon={<ArrowDownwardOutlinedIcon />}
              title="Total Recovered"
            />
            <DashboardCards icon={<ArrowUpwardOutlinedIcon />} totalInfected={totalTested} title="Total Tested" />
            <DashboardCards
            icon={<ArrowDownwardOutlinedIcon />}
              totalInfected={totalDeceased}
              title="Total Deceased"
            />
          </Grid>
        </Container>
      </Box>
      {/* dashboard cards crona patients */}
      <Box className="charts_tabs" my={5}>
        <Container>
          <Grid container spacing={2}>
            {/* here date filed and download button in right side */}
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <BarCharts />
            </Grid>
            {/* <Grid item lg={12} md={12} sm={12} xs={12}>
              <LineCharts />
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
