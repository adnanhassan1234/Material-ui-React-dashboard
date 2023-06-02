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
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            {Object.keys(props.tableData[0]).map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
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
                <TableCell>
                  {props.page * props.rowsPerPage + index + 1}
                </TableCell>
                {Object.values(row).map((value, index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default VisualizationTable;
