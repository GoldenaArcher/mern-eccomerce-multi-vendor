import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import databaseConnect from "@/utils/db";
import dotenv from "dotenv";
import path from "path";

import errorMiddleware from "@/middlewares/error.middleware";

import authRoutes from "@/routes/auth.routes";
import adminRoutes from "@/routes/admin.routes";
import sellerRoutes from "@/routes/seller.routes";
import categoryRoutes from "@/routes/category.routes";
import productRoutes from "@/routes/product.routes";
import shopRoutes from "@/routes/shop.routes";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));

app.use("/api", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api/shops", shopRoutes);

app.use(errorMiddleware);

const port = process.env.PORT;

databaseConnect();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
