const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];

    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

    const extension = require("path").extname(file.originalname).toLowerCase();

    if (
      allowedMimeTypes.includes(file.mimetype) ||
      (file.mimetype === "application/octet-stream" &&
        allowedExtensions.includes(extension))
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, WebP and AVIF images are allowed"));
    }
  },
  
});

module.exports = upload;
