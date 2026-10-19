import { RequestHandler } from "express";
import mongoose from "mongoose";
import { DatabaseUnavailableError } from "@/errors";

const databaseMiddleware: RequestHandler = (req, res, next) => {
  // Avoid waiting for Mongoose's query buffer when MongoDB is offline.
  if (mongoose.connection.readyState !== mongoose.STATES.connected) {
    return next(new DatabaseUnavailableError());
  }

  next();
};

export default databaseMiddleware;
