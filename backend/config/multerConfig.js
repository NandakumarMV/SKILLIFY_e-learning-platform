import multer from "multer";

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  console.log("eneter multer");
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    console.log("trueeee");
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only image and video files are allowed."),
      false
    );
  }
};

export const multerImage = multer({ storage: storage, fileFilter: fileFilter });

// export const multerPDF = multer({ storage: pdfStorage });
