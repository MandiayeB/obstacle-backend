const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'pictures')
    },
    filename: (req, file, callback) => {
        let name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        if (file.originalname.split('.').pop() == "png" || file.originalname.split('.').pop() == "jpg"){
            name = name.slice(0, -4);
        } else if (file.originalname.split('.').pop() == "jpeg") {
            name = name.slice(0, -5);
        }

        callback(null, name + Date.now() + '.' + extension);
    }
});

const maxSize = 1 * 1024 * 1024; // for 1MB

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
    limits: { fileSize: maxSize },
}).single('picture');

module.exports = { storage, upload, multer };