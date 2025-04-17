import React, { useEffect, useState } from "react";
import SheetTable from "../../components/sheet-table";
import AddJobForm from "../../components/add-job-form";
import { CircularProgress, Box, TextField } from "@mui/material";

const SheetTableContainer = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = () => {
    setLoading(true);
    fetch("https://job-application-tracker-zkoo.onrender.com/api/rows")
      .then((res) => res.json())
      .then((data) => {
        const sheetRows = data.rows || [];
        setRows(sheetRows);
        setFilteredRows(sheetRows);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching sheet data:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredRows(rows);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = rows.filter((row, index) => {
        if (index === 0) return true;
        return row.some(
          (cell) =>
            typeof cell === "string" && cell.toLowerCase().includes(term)
        );
      });
      setFilteredRows(filtered);
    }
  }, [searchTerm, rows]);

  const handleSubmit = (rowData) => {
    fetch("https://job-application-tracker-zkoo.onrender.com/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rowData }),
    })
      .then(() => fetchData())
      .catch(console.error);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <SheetTable
        rows={filteredRows}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={(e, newPage) => setPage(newPage)}
        handleChangeRowsPerPage={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        onNewJob={() => setOpen(true)}
        searchTerm={searchTerm}
        onSearch={(e) => setSearchTerm(e.target.value)}
      />

      <AddJobForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default SheetTableContainer;
