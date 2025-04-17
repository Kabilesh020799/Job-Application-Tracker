// containers/SheetTableContainer.jsx
import React, { useEffect, useState } from "react";
import SheetTable from "../../components/sheet-table";
import AddJobForm from "../../components/add-job-form";
import { CircularProgress, Box } from "@mui/material";

const SheetTableContainer = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false); // modal state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchData = () => {
    setLoading(true);
    fetch("http://localhost:3001/api/rows")
      .then((res) => res.json())
      .then((data) => {
        setRows(data.rows || []);
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

  const handleSubmit = (rowData) => {
    fetch("http://localhost:3001/api/submit", {
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
        rows={rows}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={(e, newPage) => setPage(newPage)}
        handleChangeRowsPerPage={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        onNewJob={() => setOpen(true)}
      />

      {/* Modal form */}
      <AddJobForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default SheetTableContainer;
