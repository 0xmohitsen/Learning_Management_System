import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
/**
 * @upload - Middleware to handle file uploads using multer.
 * The configuration sets the file size limit, file storage location, and file filter for allowed file types.
 */
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 mb in size max limit
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (_req, file, cb) => {
      const uniqueSuffix = uuidv4(); // Generate a unique ID
      const ext = path.extname(file.originalname); // Get file extension
      cb(null, `${uniqueSuffix}${ext}`); // Rename file with UUID + original extension
    },
  }),
  fileFilter: (_req, file, cb) => {
    let ext = path.extname(file.originalname);

    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".webp" &&
      ext !== ".png" &&
      ext !== ".mp4"
    ) {
      cb(new Error(`Unsupported file type! ${ext}`), false);
      return;
    }

    cb(null, true);
  },
});

export default upload;
