import { Box, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import {
 LineChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from "recharts";

const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300,
      "amt": 2100
    }
  ]

const LineCharts = () => {
  const [selectedOption, setSelectedOption] = useState("15"); // Default to 15 days
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown open state

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCloudDownloadClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <Box sx={{ p: 3, backgroundColor: "white", borderRadius: "4px" }}>
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
            sx={{ fontSize: "33px", color: "#3A7AE9" }}
            onClick={handleCloudDownloadClick}
          />
        </Box>
        {isDropdownOpen && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              fontSize: "14px",
            }}
          >
            <MenuItem value="item1">PNG</MenuItem>
            <MenuItem value="item2">CSV</MenuItem>
            <MenuItem value="item3">PDF</MenuItem>
          </Box>
        )}{" "}
        <br />
        <ResponsiveContainer width="100%" aspect={2}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#3A7AE9" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};

export default LineCharts;
