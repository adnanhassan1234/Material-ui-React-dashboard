import { Box, Typography, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";
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
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

const BarCharts = () => {
  const [data, setData] = useState([]);
  const [isInvalidFile, setIsInvalidFile] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState("7");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFileUploads = async (event) => {
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

      const formatedData = await Promise.all(
        rows.slice(1).map(async (row) => {
          const values = row.split(",");
          const obj = {};
          header.forEach((key, index) => {
            obj[key] = values[index];
          });
          return obj;
        })
      );

      setData(formatedData);
      setIsInvalidFile(false);
    };

    reader.readAsText(file);
  };

  const handleOptionChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  const handleCloudDownloadClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDownloads = (format) => {
    if (data.length === 0) {
      setIsInvalidFile(true);
      return;
    }

    const filteredData = updateData(selectedOptions); // Filter the data based on the selected number of days

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
            value={selectedOptions}
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
              onClick={() => handleDownloads("png")}
              disabled={data.length === 0}
            >
              PNG
            </MenuItem>
            <MenuItem
              value="JSON"
              onClick={() => handleDownloads("json")}
              disabled={data.length === 0}
            >
              JSON
            </MenuItem>
            <MenuItem
              value="CSV"
              onClick={() => handleDownloads("csv")}
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
          id="csv-file-inputs"
          onChange={handleFileUploads}
          style={{ display: "none" }}
        />
        <label htmlFor="csv-file-inputs">
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
          <ResponsiveContainer width="100%" aspect={2}>
            <BarChart data={updateData(selectedOptions)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={Object.keys(data[0])[0]} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={Object.keys(data[0])[1]} fill="#3F84FC" />
              <Bar dataKey={Object.keys(data[0])[2]} fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Box>
    </>
  );
};

export default BarCharts;
