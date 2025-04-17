const { google } = require("googleapis");
const credentials = require("../service-account.json");

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const SPREADSHEET_ID = "1Y9SYNdNhXHuCgj1yGY7cVRGWe_fjQ4RT7k4vW72q4mA";
const RANGE = "Sheet1";

async function appendRowToSheet(rowData) {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  return sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
    valueInputOption: "RAW",
    requestBody: {
      values: [rowData],
    },
  });
}

async function getAllRows() {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
  });

  return response.data.values;
}

module.exports = { appendRowToSheet, getAllRows };
