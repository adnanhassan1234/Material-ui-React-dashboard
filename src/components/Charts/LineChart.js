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
import { useSnackbar } from "notistack";
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
  TextField,
  Button,
} from "@mui/material";

const LineCharts = () => {
  const [data, setData] = useState([]);
  const [isInvalidFiles, setIsInvalidFiles] = useState(false);
  const [selectedOption, setSelectedOption] = useState("7");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [tableData, setTableData] = useState([]);
  // Pagination state variables
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page

  const handleFileUploads = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const contents = e.target.result;
      const rows = contents.split("\n");
      const header = rows[0].split(",");

      if (header.length < 2) {
        setIsInvalidFiles(true);
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
      setIsInvalidFiles(false);
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
      setIsInvalidFiles(true);
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

  useEffect(() => {
    if (data.length > 0) {
      const filteredData = updateData(selectedOption);
      setTableData(filteredData);
    }
  }, [data, selectedOption]);

  // Pagination event handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
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
          onChange={handleFileUploads}
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
        {isInvalidFiles && (
          <Typography variant="body1" sx={{ color: "red" }}>
            Please upload a valid CSV file
          </Typography>
        )}

        {data.length > 0 && (
          <ResponsiveContainer width="100%" aspect={2}>
            <LineChart
              data={updateData(selectedOption)}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={Object.keys(data[0])[0]} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                dataKey={Object.keys(data[0])[1]}
                stroke="#3F84FC"
                strokeWidth={3}
              />
              <Line
                dataKey={Object.keys(data[0])[2]}
                stroke="#82ca9d"
                strokeWidth={3}
              />
              {/* <Line dataKey="recovered" stroke="#82ca9d" strokeWidth={3} /> */}
            </LineChart>
          </ResponsiveContainer>
        )}
        {/* dataTable show */}
        {tableData.length > 0 && (
          <Typography color="text.primary" variant="h6">
            Analytics Report
          </Typography>
        )}
        {tableData.length > 0 && (
          <Box sx={{ overflowY: "scroll" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    {Object.keys(tableData[0]).map((header, index) => (
                      <TableCell key={index}>{header}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                        {Object.values(row).map((value, index) => (
                          <TableCell key={index}>{value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            {tableData.length > 0 && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default LineCharts;
