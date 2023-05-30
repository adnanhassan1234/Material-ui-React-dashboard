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
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

  // downloaded format csv , png and pdf
  const handleDownload = (format) => {
    if (format === "PNG") {
      const chartContainer = document.getElementById("chart-container");
      html2canvas(chartContainer).then((canvas) => {
        canvas.toBlob((blob) => {
          saveAs(blob, "chart.png");
        });
      });
    } else if (format === "CSV") {
      const csvData = chartData.map(
        ({
          country,
          infected,
          tested,
          recovered,
          deceased,
          lastUpdatedDate,
        }) => [country, infected, tested, recovered, deceased, lastUpdatedDate]
      );
      const csvRows = [
        [
          "Country",
          "Infected",
          "Tested",
          "Recovered",
          "Deceased",
          "Last Updated Date",
        ],
        ...csvData,
      ];
      const csvContent = csvRows.map((row) => row.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "chart.csv");
    } else if (format === "PDF") {
      const chartContainer = document.getElementById("chart-container");
      html2canvas(chartContainer).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 0, 0, 200, 100);
        pdf.save("chart.pdf");
      });
    }
  };

  const fetchChartData = async () => {
    try {
      const response = await fetch("http://localhost:3006/data");
      const data = await response.json();

      const extractedData = data.map((item) => ({
        country: item.country,
        infected: item.infected,
        recovered: item.recovered,
        tested: item.tested,
        deceased: item.deceased,
        lastUpdatedDate: item.lastUpdatedDate,
      }));

      extractedData.sort(
        (a, b) => new Date(b.lastUpdatedDate) - new Date(a.lastUpdatedDate)
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
      <Box sx={{p:2, backgroundColor: "white", borderRadius: "4px" }}>
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
            <MenuItem value="PNG" onClick={() => handleDownload("PNG")}>
              PNG
            </MenuItem>
            <MenuItem value="CSV" onClick={() => handleDownload("CSV")}>
              CSV
            </MenuItem>
            <MenuItem value="PDF" onClick={() => handleDownload("PDF")}>
              PDF
            </MenuItem>
          </Box>
        )}
        <br />
        <ResponsiveContainer id="chart-container" width="100%" aspect={2}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="infected" fill="#3A7AE9" barSize={60} />
            <Bar dataKey="recovered" fill="#82ca9d" barSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};

export default BarCharts;
