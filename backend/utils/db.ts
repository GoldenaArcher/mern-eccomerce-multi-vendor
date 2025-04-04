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
      console.error(e);
    });
};

export default databaseConnect;
