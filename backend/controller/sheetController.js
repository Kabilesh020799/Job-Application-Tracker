const { appendRowToSheet, getAllRows } = require("../models/sheetModel");

async function submitData(req, res) {
  try {
    const row = req.body.rowData;

    if (!Array.isArray(row)) {
      return res.status(400).json({ message: "rowData must be an array" });
    }

    await appendRowToSheet(row);
    res.status(200).json({ message: "Row successfully added to Google Sheet" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error writing to Google Sheet", error: error.message });
  }
}

async function fetchData(req, res) {
  try {
    const rows = await getAllRows();
    res.status(200).json({ rows });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error reading Google Sheet", error: error.message });
  }
}

module.exports = { submitData, fetchData };
