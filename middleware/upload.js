const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(__dirname, '../public/Images');
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/jpeg'
        ) {
            callback(null, true);
        } else {
            console.log('Only JPG and PNG images are supported');
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2,
    },
});

module.exports = upload;
