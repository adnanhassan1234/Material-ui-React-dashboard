import { Box, MenuItem, Select, Typography } from "@mui/material";
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
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


const LineCharts = () => {
  const [data, setData] = useState([]);
  const [isInvalidFile, setIsInvalidFile] = useState(false);
  const [selectedOption, setSelectedOption] = useState("7");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const contents = e.target.result;
      const rows = contents.split("\n");
      const header = rows[0].split(",");

      if (header.length < 2) {
        setIsInvalidFile(true);
        setData([]);
        return;
      }

      const formattedData = await Promise.all(
        rows.slice(1).map(async (row) => {
          const values = row.split(",");
          const obj = {};
          header.forEach((key, index) => {
            obj[key] = values[index];
          });
          return obj;
        })
      );

      setData(formattedData);
      setIsInvalidFile(false);
    };

    reader.readAsText(file);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCloudDownloadClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDownload = (format) => {
    if (data.length === 0) {
      setIsInvalidFile(true);
      return;
    }
  
    const filteredData = updateData(selectedOption); // Filter the data based on the selected number of days
  
    const dataToDownload = filteredData
      .map((item) => Object.values(item).join(","))
      .join("\n");
    const element = document.createElement("a");
    const file = new Blob([dataToDownload], { type: `text/${format}` });
    element.href = URL.createObjectURL(file);
    element.download = `data.${format}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const updateData = (value) => {
    const filteredData = data.slice(-parseInt(value));
    return filteredData;
  };

  return (
    <>
      <Box sx={{ p: 2, backgroundColor: "white", borderRadius: "4px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Select
            value={selectedOption}
            onChange={handleOptionChange}
            sx={{ height: "35px" }}
          >
            <MenuItem value="7">Last 7 Days</MenuItem>
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
            <MenuItem
              value="PNG"
              onClick={() => handleDownload("png")}
              disabled={data.length === 0}
            >
              PNG
            </MenuItem>
            <MenuItem
              value="JSON"
              onClick={() => handleDownload("json")}
              disabled={data.length === 0}
            >
              JSON
            </MenuItem>
            <MenuItem
              value="CSV"
              onClick={() => handleDownload("csv")}
              disabled={data.length === 0}
            >
              CSV
            </MenuItem>
          </Box>
        )}
        <br />
        <input
          type="file"
          accept=".csv"
          id="csv-file-input"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
        <label htmlFor="csv-file-input">
          <Box
            component="span"
            sx={{
              display: "inline-block",
              padding: "6px 12px",
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
              cursor: "pointer",
              userSelect: "none",
              marginBottom: "16px",
            }}
          >
            Upload CSV File
          </Box>
        </label>

        <br />
        {isInvalidFile && (
          <Typography variant="body1" sx={{ color: "red" }}>
            Please upload a valid CSV file
          </Typography>
        )}

        {data.length > 0 && (
        <ResponsiveContainer width="100%" aspect={2} >
          <LineChart data={updateData(selectedOption)}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={Object.keys(data[0])[0]}/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey={Object.keys(data[0])[1]} stroke="#3F84FC" strokeWidth={3} />
            <Line dataKey={Object.keys(data[0])[2]}  stroke="#82ca9d" strokeWidth={3} />
            {/* <Line dataKey="recovered" stroke="#82ca9d" strokeWidth={3} /> */}
          </LineChart>
        </ResponsiveContainer>
        )}
      </Box>
    </>
  );
};

export default LineCharts;
