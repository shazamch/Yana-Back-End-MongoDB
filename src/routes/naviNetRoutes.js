const express = require('express');
const router = express.Router();
const naviNetController = require('../controllers/naviNetController');
const upload = require('../middleware/fileUpload');
console.log(upload)
// Route to handle file upload and comparison
router.post('/upload', upload.single('naviNetFile'), naviNetController.uploadAndCompare);

module.exports = router;
