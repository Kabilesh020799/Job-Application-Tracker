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
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h5" color="textSecondary">
          No data available
        </Typography>
      </Box>
    );
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
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: 2,
        boxSizing: "border-box",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        px={2}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#2e3b55",
          }}
        >
          Job Listings
        </Typography>
        <Box display="flex" gap={2}>
          <TextField
            label="Search Jobs"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={onSearch}
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
          <Button variant="contained" color="primary" onClick={onNewJob}>
            Add New Job
          </Button>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        elevation={6}
        sx={{
          height: "calc(100vh - 100px)",
          overflow: "auto",
          borderRadius: 3,
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {headers.map((head, index) => (
                <TableCell
                  key={index}
                  sx={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    fontWeight: "bold",
                    textAlign: index === 0 ? "center" : "left",
                    minWidth: index === 0 ? "80px" : "150px",
                    fontSize: "16px",
                    borderRight: "1px solid #ddd",
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedRows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  backgroundColor: rowIndex % 2 === 0 ? "#f9fafc" : "white",
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                  },
                }}
              >
                {row.map((cell, colIndex) => {
                  const key = `${rowIndex + page * rowsPerPage}-${colIndex}`;
                  const isExpanded = expandedCells[key];
                  const isLong = typeof cell === "string" && cell.length > 30;
                  return (
                    <TableCell
                      key={colIndex}
                      sx={{
                        width:
                          colIndex === 0
                            ? "80px"
                            : `${
                                (100 - (80 / window.innerWidth) * 100) /
                                (headers.length - 1)
                              }%`,
                        maxWidth: colIndex === 0 ? "80px" : "200px",
                        whiteSpace: isExpanded ? "normal" : "nowrap",
                        overflow: isExpanded ? "visible" : "hidden",
                        textOverflow: isExpanded ? "unset" : "ellipsis",
                        textAlign: colIndex === 0 ? "center" : "left",
                        fontSize: "14px",
                        padding: "10px",
                      }}
                    >
                      {isExpanded ? (
                        <>
                          <Box
                            sx={{
                              whiteSpace: "normal",
                              wordWrap: "break-word",
                            }}
                          >
                            {cell}
                          </Box>
                          {isLong && (
                            <div
                              onClick={() =>
                                toggleExpand(
                                  rowIndex + page * rowsPerPage,
                                  colIndex
                                )
                              }
                              style={{
                                color: "#1976d2",
                                cursor: "pointer",
                                fontSize: "12px",
                                marginTop: 4,
                                textDecoration: "underline",
                              }}
                            >
                              Show less
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <Box
                            sx={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "block",
                            }}
                          >
                            {cell}
                          </Box>
                          {isLong && (
                            <span
                              onClick={() =>
                                toggleExpand(
                                  rowIndex + page * rowsPerPage,
                                  colIndex
                                )
                              }
                              style={{
                                color: "#1976d2",
                                cursor: "pointer",
                                marginLeft: 8,
                                fontSize: "12px",
                                textDecoration: "underline",
                              }}
                            >
                              Read more
                            </span>
                          )}
                        </>
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
    </Box>
  );
};

export default SheetTable;
