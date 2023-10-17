import multer from "multer";
import path from "path";
console.log("reached");
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

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

export const multerImage = multer({ storage: imageStorage });

export const multerPDF = multer({ storage: pdfStorage });
