import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  Button,
  Box,
  TextField,
} from "@mui/material";

const SheetTable = ({
  rows,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  onNewJob,
  onSearch,
  searchTerm,
}) => {
  const [expandedCells, setExpandedCells] = useState({});

  if (!rows || rows.length === 0) {
    return <Typography>No data available</Typography>;
  }

  const headers = rows[0];
  const dataRows = rows
    .slice(1)
    .filter((row) =>
      row.some((cell) =>
        typeof cell === "string" ? cell.trim() !== "" : !!cell
      )
    );
  const paginatedRows = dataRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const toggleExpand = (rowIndex, colIndex) => {
    const key = `${rowIndex}-${colIndex}`;
    setExpandedCells((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{ width: "100vw", height: "100vh", overflow: "auto" }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={"center"}
        mt={2}
        mr={4}
      >
        <Typography variant="h6" sx={{ p: 2 }}>
          Google Sheet Data
        </Typography>
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <TextField
            label="Search Jobs"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={onSearch}
            sx={{ width: 300 }}
          />
          <Button variant="contained" onClick={onNewJob}>
            Add New Job
          </Button>
        </Box>
      </Box>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {headers.map((head, index) => (
              <TableCell
                key={index}
                sx={{
                  fontWeight: "bold",
                  border: "1px solid #ccc",
                  backgroundColor: "#f5f5f5",
                  minWidth: "150px",
                }}
              >
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedRows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, colIndex) => {
                const key = `${rowIndex + page * rowsPerPage}-${colIndex}`;
                const isExpanded = expandedCells[key];
                const isLong = typeof cell === "string" && cell.length > 200;

                return (
                  <TableCell
                    key={colIndex}
                    sx={{ border: "1px solid #ddd", minWidth: "200px" }}
                  >
                    {isExpanded || !isLong ? (
                      cell
                    ) : (
                      <>
                        {cell.slice(0, 200)}...
                        <span
                          onClick={() =>
                            toggleExpand(
                              rowIndex + page * rowsPerPage,
                              colIndex
                            )
                          }
                          style={{
                            color: "blue",
                            cursor: "pointer",
                            marginLeft: 8,
                          }}
                        >
                          Read more
                        </span>
                      </>
                    )}
                    {isExpanded && isLong && (
                      <div
                        onClick={() =>
                          toggleExpand(rowIndex + page * rowsPerPage, colIndex)
                        }
                        style={{
                          color: "blue",
                          cursor: "pointer",
                          marginTop: 4,
                        }}
                      >
                        Show less
                      </div>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={dataRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default SheetTable;
