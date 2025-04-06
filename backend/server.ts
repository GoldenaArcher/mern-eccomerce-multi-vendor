import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import databaseConnect from "@/utils/db";
import dotenv from "dotenv";

import errorMiddleware from "@/middlewares/error.middleware";

import authRoutes from "@/routes/auth.routes";
import adminRoutes from "@/routes/admin.routes";
import sellerRoutes from "@/routes/seller.routes";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/seller", sellerRoutes);

app.use(errorMiddleware);

const port = process.env.PORT;

databaseConnect();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
