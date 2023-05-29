import React from "react";
import { useState } from "react";
import { Box, Container, Grid, Tab, Typography } from "@mui/material";
import styled from "styled-components";
import { Coronavirus } from "@mui/icons-material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BarChartIcon from "@mui/icons-material/BarChart";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import BarCharts from "../Charts/Barchart";
import LineCharts from "../Charts/LineChart";


const StyledCardContent = styled(Box)`
  background-color: #3f84fc;
  color: white;
  border-radius: 4px;
  padding: 25px 14px 25px 14px;
`;

const StyledCoronavirusIcon = styled(Coronavirus)`
  margin-bottom: 0;
  && {
    font-size: 50px;
  }
`;

const adminLeaveData = [
  {
    title: "Recovered",
    leave: "8,13750",
  },
  {
    title: "Infected",
    leave: "82,39,54240",
  },
  {
    title: "Tested",
    leave: "7,35,6956054",
  },
  {
    title: "Deceased",
    leave: "82,39,54240",
  },
];

const Dashboard = () => {
  const [leaveEmployee] = useState(adminLeaveData);

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
            {leaveEmployee.map((content, ind) => (
              <Grid item lg={3} md={6} sm={6} xs={12} key={ind}>
                <StyledCardContent>
                  <Box display="flex" alignItems="center">
                    <StyledCoronavirusIcon />
                    <Box ml={2}>
                      <Typography gutterBottom variant="h5" mb={0}>
                        {content.title}
                      </Typography>
                      <Typography variant="h6" mb={0}>
                        <b style={{ fontSize: "18px" }}>{content.leave}</b>
                      </Typography>
                    </Box>
                  </Box>
                </StyledCardContent>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* dashboard cards crona patients */}
      <Box className="charts_tabs" my={5}>
        <Container>
          <Grid container spacing={2}>
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
