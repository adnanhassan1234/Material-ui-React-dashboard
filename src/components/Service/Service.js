import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Container, Grid } from "@mui/material";

const rowsData = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    age: 35,
    fullName: "Adnan hassan",
    phone: "54645273",
    data2: [
      {
        id: 112,
        lastName: "Snow",
        firstName: "Jon",
        age: 35,
        fullName: "Adnan hassan",
        phone: "54645273",
      },
    ],
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    age: 42,
    fullName: "Adnan hassan",
    phone: "54645273",
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    age: 45,
    fullName: "Adnan hassan",
    phone: "54645273",
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    age: 16,
    fullName: "Adnan hassan",
    phone: "54645273",
  },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: null,
    fullName: "Adnan hassan",
    phone: "54645273",
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: null,
    age: 150,
    fullName: "Adnan hassan",
    phone: "54645273",
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    age: 44,
    fullName: "Adnan hassan",
    phone: "54645273",
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    age: 36,
    fullName: "Adnan hassan",
    phone: "54645273",
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
    fullName: "Adnan hassan",
    phone: "54645273",
  },
];

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
    editable: true,
  },

  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 150,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 150,
    editable: true,
  },
];

const Service = () => {
  return (
    <>
      <div className="service_table">
        <Container sx={{ my: 5 }}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rowsData}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
            {console.log(
              "🚀 ~ file: Service.js:137 ~ Service ~ rowsData:",
              rowsData
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Service;
