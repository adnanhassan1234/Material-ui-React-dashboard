import {
  Box,
  Typography,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useSnackbar } from "notistack";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CloudDownload, PictureAsPdf, GetApp } from "@mui/icons-material";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import SimCardDownloadRoundedIcon from "@mui/icons-material/SimCardDownloadRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import VisualizationTable from "./VisualizationTable";
import { styled } from "@mui/system";

const StyledBox = styled(Box)`
  display: inline-block;
  padding: 6px 12px;
  background-color: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  margin-bottom: 16px;
`;

const chartCategory = [
  { value: "bar", label: "Bar Chart" },
  { value: "area", label: "Area Chart" },
  { value: "line", label: "Line Chart" },
];
const daysPerData = [
  { value: "7", label: "Last 7 Days" },
  { value: "10", label: "Last 10 Days" },
  { value: "15", label: "Last 15 Days" },
  { value: "30", label: "Last 30 Days" },
];

const BarCharts = () => {
  const [data, setData] = useState([]);
  const [isInvalidFile, setIsInvalidFile] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState("7");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [visualizationType, setVisualizationType] = useState("bar");

  // csv file upload
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
        enqueueSnackbar("Please upload a valid CSV file", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        return;
      } else {
        enqueueSnackbar("CSV file uploaded successfully!", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      }

      /*  formatting the data from a CSV file into an array of objects. */
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

      setData(formatedData); // save all csv data in state
      setIsInvalidFile(false);
    };

    reader.readAsText(file);
  };

  // Save the PDF
  const downloadAsPDF = () => {
    const chartContainer = document.getElementById("chart-container");
    const doc = new jsPDF("p", "mm", "a4");
    html2canvas(chartContainer).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // A4 width
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      doc.save("chart.pdf");
    });
  };

  // downloadAsPNG format
  const downloadAsPNG = () => {
    const container = document.getElementById("chart-container");
    html2canvas(container).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "chart.png";
      link.click();
    });
  };

  // download csv and JSON file
  const handleDownloads = (format) => {
    if (data.length === 0) {
      setIsInvalidFile(true);
      return;
    }
    const filteredData = updateData(selectedOptions);
    if (format === "json") {
      const jsonData = JSON.stringify(filteredData);
      const element = document.createElement("a");
      const file = new Blob([jsonData], { type: "application/json" });
      element.href = URL.createObjectURL(file);
      element.download = "data.json";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } else if (format === "csv") {
      const csvContent = [
        Object.keys(filteredData[0]).join(","),
        ...filteredData.map((item) => Object.values(item).join(",")),
      ].join("\n");
      const element = document.createElement("a");
      const file = new Blob([csvContent], { type: "text/csv" });
      element.href = URL.createObjectURL(file);
      element.download = "data.csv";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  const handleCloudDownloadClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const updateData = (value) => {
    const filteredData = data.slice(-parseInt(value));
    return filteredData;
  };

  useEffect(() => {
    if (data.length > 0) {
      const filteredData = updateData(selectedOptions);
      setTableData(filteredData);
    }
  }, [data, selectedOptions]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  // DownloadFormat Data options like PNG, PDF , CSV and JSON
  const DownloadFormatData = [
    { value: "PNG", onClick: downloadAsPNG, icon: <DownloadRoundedIcon /> },
    { value: "PDF", onClick: downloadAsPDF, icon: <PictureAsPdf /> },
    {
      value: "JSON",
      onClick: () => handleDownloads("json"),
      icon: <SimCardDownloadRoundedIcon />,
    },
    {
      value: "CSV",
      onClick: () => handleDownloads("csv"),
      icon: <SimCardDownloadRoundedIcon />,
    },
  ];

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
        Data Visualization
      </Typography>
      <Box sx={{ p: 2, backgroundColor: "white", borderRadius: "4px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Charts category types */}
          <Select
            value={visualizationType}
            onChange={(event) => setVisualizationType(event.target.value)}
            sx={{ height: "43px", width: "185px" }}
          >
            {chartCategory.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <CloudDownloadIcon
            sx={{ fontSize: "33px", color: "#3A7AE9" }}
            onClick={handleCloudDownloadClick}
          />
        </Box>
        {isDropdownOpen && (
          <Box
            // id="chart-container"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              fontSize: "14px",
            }}
          >
            {DownloadFormatData.map((item) => (
              <MenuItem
                key={item.value}
                value={item.value}
                onClick={item.onClick}
                disabled={data.length === 0}
              >
                {item.icon}
                {item.value}
              </MenuItem>
            ))}
          </Box>
        )}
        <br />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <input
            type="file"
            accept=".csv"
            id="csv-file-inputs"
            onChange={handleFileUploads}
            style={{ display: "none" }}
          />
          <label htmlFor="csv-file-inputs">
            <StyledBox component="span"
            >
              <IconButton component="span" color="primary">
                <FileUploadRoundedIcon />
              </IconButton>
              Upload CSV File
            </StyledBox>
          </label>

          {isInvalidFile && (
            <Typography variant="body1" sx={{ color: "red" }}>
              Please upload a valid CSV file
            </Typography>
          )}
          {/* Days per Data show */}
          {tableData.length > 0 && (
            <Select
              value={selectedOptions}
              onChange={handleOptionChange}
              sx={{ height: "43px", width: "187px" }}
            >
              {daysPerData.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          )}
        </Box>
        <br />
        {/* Bar charts */}
        {visualizationType === "bar" && data.length > 0 && (
          <ResponsiveContainer width="100%" aspect={2} id="chart-container">
            <BarChart data={updateData(selectedOptions)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={Object.keys(data[0])[0]} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={Object.keys(data[0])[1]} fill="#3F84FC" />
              <Bar dataKey={Object.keys(data[0])[2]} fill="#82ca9d" />
              <Bar dataKey={Object.keys(data[0])[3]} fill="#FF6C37" />
            </BarChart>
          </ResponsiveContainer>
        )}
        {/* Line Charts */}
        {visualizationType === "line" && data.length > 0 && (
          <ResponsiveContainer width="100%" aspect={2} id="chart-container">
            <LineChart data={updateData(selectedOptions)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={Object.keys(data[0])[0]} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={Object.keys(data[0])[1]}
                stroke="#3F84FC"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey={Object.keys(data[0])[2]}
                stroke="#82ca9d"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey={Object.keys(data[0])[3]}
                stroke="#FF6C37"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
        {/* Area chart */}
        {visualizationType === "area" && data.length > 0 && (
          <ResponsiveContainer width="100%" aspect={2} id="chart-container">
            <AreaChart data={updateData(selectedOptions)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={Object.keys(data[0])[0]} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey={Object.keys(data[0])[1]}
                fill="#3F84FC"
                stroke="#3F84FC"
              />
              <Area
                type="monotone"
                dataKey={Object.keys(data[0])[2]}
                fill="#82ca9d"
                stroke="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey={Object.keys(data[0])[3]}
                fill="#FF6C37"
                stroke="#FF6C37"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
        {/* table data */}
        {tableData.length > 0 && (
          <TableContainer>
            <Typography color="text.primary" variant="h6">
              Analytics Report
            </Typography>
            {/* Visualization Table */}
            <VisualizationTable
              tableData={tableData}
              rowsPerPage={rowsPerPage}
              page={page}
            />
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        )}
      </Box>
    </>
  );
};

export default BarCharts;
