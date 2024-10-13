const multer = require('multer');

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/', // Specify the destination folder for uploaded files
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Set the file name to be unique using current timestamp
    }
});

// Initialize upload
const upload = multer({
    storage: storage, // Set storage engine
});

module.exports = upload;
