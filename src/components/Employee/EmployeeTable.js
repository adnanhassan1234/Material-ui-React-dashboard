import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Container, Grid } from "@mui/material";
import styled from "@mui/material/styles/styled";
import { TableRow } from "@mui/material";

const columns = [
    {
        field: "name",
        headerName: "Name",
        width: 200,
        sortable: false,
        renderCell: (params) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={params.row.image}
              style={{ height: "36px", borderRadius: "50%", marginRight: "10px" }}
            />
            <div>
              <div style={{ fontSize: "16px" }}>{params.row.name}</div>
              <div style={{ color: "#999" }}>{params.row.title}</div>
            </div>
          </div>
        ),
      },
      
  { field: "id", headerName: "Employee ID", width: 170, sortable: false },

  {
    field: "email",
    headerName: "Email",
    width: 160,
    sortable: false,
  },
  {
    field: "mobile",
    headerName: "Mobile",
    width: 170,
    sortable: false,
  },

  {
    field: "joiningDate",
    headerName: "Join Date",
    //   description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 165,
  },
  {
    field: "Action",
    headerName: "Action",
    //   type: "number",
    width: 140,
    sortable: false,
  },
];

const EmployeeTable = (props) => {
  return (
    <>
      <div className="service_table">
        <Container sx={{ my: 5 }}>
          <div style={{ width: "100%" }}>
            <DataGrid
              rows={props.cardContent}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </Container>
      </div>
    </>
  );
};

export default EmployeeTable;
