import { Box, Select, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const Barchart = () => {
  const [chartData, setChartData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("15"); // Default to 15 days

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const fetchChartData = async () => {
    try {
      const response = await fetch(
        "https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true"
      );
      const data = await response.json();

      const extractedData = data.map((item) => ({
        country: item.country,
        infected: item.infected,
        recovered: item.recovered,
        lastUpdatedApify: item.lastUpdatedApify,
      }));

      extractedData.sort(
        (a, b) => new Date(b.lastUpdatedApify) - new Date(a.lastUpdatedApify)
      );

      const filteredData = extractedData.slice(0, parseInt(selectedOption));
      setChartData(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [selectedOption]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <>
      {/* <Box sx={{ ml: 5,backgroundColor: "white" }}>
       
      </Box> */}
      <Box sx={{ ml: 5, backgroundColor: "white" }}>
      <Select value={selectedOption} onChange={handleOptionChange} sx={{mb:3}}>
          <MenuItem value="10">Last 10 Days</MenuItem>
          <MenuItem value="15">Last 15 Days</MenuItem>
          <MenuItem value="30">Last 30 Days</MenuItem>
        </Select>
        <ResponsiveContainer width="100%" aspect={2}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3" />
            <XAxis dataKey="country" />
            <YAxis />
            <Tooltip
              formatter={(value, name, props) => [
                value,
                `${props.payload.country} - ${name}`,
              ]}
            />
            <Legend />
            <Bar dataKey="infected" fill="#8884d8" barSize={60} />
            <Bar dataKey="recovered" fill="#82ca9d" barSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};

export default Barchart;
