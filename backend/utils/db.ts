import mongoose from "mongoose";

const databaseConnect = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in the environment variables");
  }

  mongoose
    .connect(process.env.DATABASE_URL, {})
    .then(() => {
      console.log("Mongodb Connected!");
    })
    .catch((e) => {
      console.error(
        "MongoDB connection failed. Check DATABASE_URL and ensure MongoDB is running.",
        e
      );
    });
};

export default databaseConnect;
