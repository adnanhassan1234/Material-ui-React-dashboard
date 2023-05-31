import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import styled from 'styled-components';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';

const StyledCardContent = styled(Box)`
  background-color: #3f84fc;
  color: white;
  border-radius: 4px;
  padding: 25px 14px;
`;

const StyledCoronavirusIcon = styled(CoronavirusIcon)`
  margin-bottom: 0;
  && {
    font-size: 50px;
  }
`;

const DashboardCards = (props) => {
  const {title, icon, totalInfected } = props;
  return (
    <Grid item lg={3} md={6} sm={6} xs={12}>
      <StyledCardContent>
        <Box display="flex" alignItems="center">
          <StyledCoronavirusIcon />
          <Box ml={2}>
            <Typography gutterBottom variant="h6" mb={0}>
              {title}
            </Typography>
            <Typography variant="h6" mb={0}>
              <b style={{ fontSize: '18px' }}> {icon} {totalInfected}</b>
            </Typography>
          </Box>
        </Box>
      </StyledCardContent>
    </Grid>
  );
};

export default DashboardCards;
