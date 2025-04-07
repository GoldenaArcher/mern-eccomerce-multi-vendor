import fs from "fs";
import path from "path";
import { Request } from "express";

export const UPLOAD_ROOT = "uploads";

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
    publicPath: `/${relativePath.replace(/\\/g, "/")}`,
  };
};
