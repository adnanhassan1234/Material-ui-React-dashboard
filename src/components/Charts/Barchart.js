import { Box, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
  },
];

const BarCharts = () => {
    const [chartData, setChartData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("15"); // Default to 15 days
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown open state

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCloudDownloadClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
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

  return (
    <>
      <Box sx={{ p: 3, backgroundColor: "white", borderRadius:'4px' }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Select
            value={selectedOption}
            onChange={handleOptionChange}
            sx={{ height: "35px" }}
          >
            <MenuItem value="10">Last 10 Days</MenuItem>
            <MenuItem value="15">Last 15 Days</MenuItem>
            <MenuItem value="30">Last 30 Days</MenuItem>
          </Select>
          <CloudDownloadIcon
            sx={{ fontSize: "33px", color:"#3A7AE9"}}
            onClick={handleCloudDownloadClick}
          />
        </Box>
        {isDropdownOpen && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", fontSize:'14px' }}>
            <MenuItem value="item1">PNG</MenuItem>
            <MenuItem value="item2">CSV</MenuItem>
            <MenuItem value="item3">PDF</MenuItem>
          </Box>
        )}{" "}
        <br />
        <ResponsiveContainer width="100%" aspect={2}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Bar dataKey="pv" fill="#3A7AE9" />
            <Bar dataKey="uv" fill="#82ca9d" /> */}
            <Bar dataKey="infected" fill="#3A7AE9" barSize={60} />
            <Bar dataKey="recovered" fill="#82ca9d" barSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};

export default BarCharts;
