const express = require("express");
const router = express.Router();
const { submitData, fetchData } = require("../controller/sheetController");

router.post("/submit", submitData);
router.get("/rows", fetchData);

module.exports = router;
