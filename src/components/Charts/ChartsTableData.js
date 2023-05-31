import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";

const ChartsTableData = () => {
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3006/data"); // Replace 'http://localhost:3006/data' with the actual endpoint URL
      const dataWithIds = response.data.map((row, index) => ({
        id: index + 1,
        ...row,
      }));
      setTableData(dataWithIds);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      field: "country",
      headerName: "Country",
      width: 160,
      sortable: false,
    },
    {
      field: "recovered",
      headerName: "Recovered",
      width: 160,
      sortable: false,
    },
    {
      field: "infected",
      headerName: "Infected",
      width: 160,
      sortable: false,
    },
    {
      field: "tested",
      headerName: "Tested",
      width: 160,
      sortable: false,
    },
    {
      field: "deceased",
      headerName: "Deceased",
      width: 160,
      sortable: false,
    },
    {
      field: "lastUpdatedDate",
      headerName: "Updated Date",
      width: 160,
      sortable: false,
    },
  ];

  return (
    <Box sx={{ my: 5 }}>
      <Typography color="text.primary" variant="h5" mb={2}>
        Analytics Report
      </Typography>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={tableData}
          columns={columns}
        //   pageSize={5}
          initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10 , 25 , 50]}
          checkboxSelection
        />
      </div>
    </Box>
  );
};

export default ChartsTableData;
