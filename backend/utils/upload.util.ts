import fs from "fs";
import { unlink } from "fs/promises";
import path from "path";
import { Request } from "express";

export const UPLOAD_ROOT = "uploads";

function isMulterFile(file: unknown): file is Express.Multer.File {
  return (
    !!file &&
    typeof file === "object" &&
    "fieldname" in file &&
    "originalname" in file &&
    "path" in file
  );
}

export const ensureUploadDir = (
  dir?: string,
  fallbackDir = UPLOAD_ROOT
): string => {
  const finalDir = dir?.trim() || fallbackDir;
  const resolvedPath = path.resolve(__dirname, `../${finalDir}`);

  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true });
  }

  return resolvedPath;
};

export const getUploadPaths = (req: Request, filename: string) => {
  // const userId = (req as any).user?.id ?? "common";
  // const relativePath = `${UPLOAD_ROOT}/user-${userId}/${filename}`;
  const relativePath = `${UPLOAD_ROOT}`;

  return {
    absolutePath: path.resolve(__dirname, `../${relativePath}`),
    publicPath: `/${relativePath.replace(/\\/g, "/")}/${filename}`,
  };
};

export const deleteUploadedFiles = (
  files?:
    | Express.Multer.File
    | Express.Multer.File[]
    | { [fieldname: string]: Express.Multer.File[] }
) => {
  if (!files) return;

  const allFiles: Express.Multer.File[] = [];

  if (Array.isArray(files)) {
    allFiles.push(...files);
  } else if (isMulterFile(files)) {
    allFiles.push(files);
  } else if (typeof files === "object") {
    Object.values(files).forEach((arr) => {
      allFiles.push(...arr);
    });
  }

  for (const file of allFiles) {
    try {
      fs.existsSync(file.path) && fs.unlinkSync(file.path);
    } catch (err) {
      console.warn(`Failed to delete uploaded file: ${file.path}`, err);
    }
  }
};

export const deleteImagePaths = async (publicPaths: string[] = []) => {
  for (const publicPath of publicPaths) {
    try {
      const uploadsDir = path.join(__dirname, "../uploads");
      const absPath = path.join(uploadsDir, path.basename(publicPath));
      await unlink(absPath);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.warn(`Failed to delete image: ${publicPath}`, err.message);
      } else {
        console.warn(`Failed to delete image: ${publicPath}`, err);
      }
    }
  }
};
