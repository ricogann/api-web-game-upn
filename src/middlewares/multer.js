import multer, { diskStorage } from "multer";

const fileFilter = function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Sorry, only JPEG and PNG files are allowed"), false);
    }
};

const storage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/public");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
