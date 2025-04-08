export type UploadedFileWithPath = Express.Multer.File & { publicPath: string };
