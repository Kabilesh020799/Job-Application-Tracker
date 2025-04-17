const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sheetRoutes = require("./routes/sheetRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", sheetRoutes);
app.use("/api", uploadRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
