const express = require("express");
const path = require("path");
const router = express.Router();

// Middleware to serve static files
router.use(express.static(path.join(__dirname, "public"))); // Assuming the HTML files are in the 'public' folder

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Routes
// Basic route to serve HTML pages

router.get("/adminpanel", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/adminpanel.html"));
});

router.get("/alltools", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/alltools.html"));
});

router.get("/compress", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/compress.html"));
});

router.get("/excel-to-pdf", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/excel-to-pdf.html"));
});

router.get("/merge", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/merge.html"));
});

router.get("/pdf-to-excel", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/pdf-to-excel.html"));
});

router.get("/pdf-to-powerpoint", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/pdf-to-powerpoint.html"));
});

router.get("/pdf-to-word", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/pdf-to-word.html"));
});

router.get("/powerpoint-to-pdf", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/powerpoint-to-pdf.html"));
});

router.get("/split", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/split.html"));
});

router.get("/word-to-pdf", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/word-to-pdf.html"));
});

module.exports = router;
