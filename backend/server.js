const express = require("express");
const cors = require("cors");
const sheetRoutes = require("./routes/sheetRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", sheetRoutes);

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
