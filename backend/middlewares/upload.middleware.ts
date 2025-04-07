import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";
import { ensureUploadDir, getUploadPaths } from "../utils/upload.util";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = ensureUploadDir();
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

    const { publicPath } = getUploadPaths(req, unique);
    (file as any).publicPath = publicPath;
    
    cb(null, unique);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  file.mimetype.startsWith("image/")
    ? cb(null, true)
    : cb(new Error("Only image files are allowed!"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;
