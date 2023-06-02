import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const VisualizationTable = (props) => {
  return (
    <TableContainer>
      <Table sx={{ border: "1px solid #ccc", fontWeight: "bold" ,mt:2 }}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            {Object.keys(props.tableData[0]).map((header, index) => (
              <TableCell
                key={index}
                sx={{ fontWeight: "bold", border: "1px solid #ccc" }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tableData
            .slice(
              props.page * props.rowsPerPage,
              props.page * props.rowsPerPage + props.rowsPerPage
            )
            .map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ border: "1px solid #ccc" }}>
                  {props.page * props.rowsPerPage + index + 1}
                </TableCell>
                {Object.values(row).map((value, index) => (
                  <TableCell key={index} sx={{ border: "1px solid #ccc" }}>
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VisualizationTable;
