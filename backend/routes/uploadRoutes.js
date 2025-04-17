const express = require("express");
const router = express.Router();
const uploadController = require("../controller/uploadController");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/upload-resume",
  upload.single("resume"),
  uploadController.uploadResume
);

module.exports = router;
