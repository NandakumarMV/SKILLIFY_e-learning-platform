import multer from "multer";
import path from "path";
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only image and video files are allowed."),
      false
    );
  }
};

const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/public/pdfs");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const multerImage = multer({ storage: storage, fileFilter: fileFilter });

export const multerPDF = multer({ storage: pdfStorage });
