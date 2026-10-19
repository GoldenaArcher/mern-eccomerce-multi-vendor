import mongoose from "mongoose";

export const isDatabaseUnavailable = (err: unknown): boolean => {
  const { mongo } = mongoose;

  return (
    err instanceof mongo.MongoNetworkError ||
    err instanceof mongo.MongoServerSelectionError ||
    err instanceof mongo.MongoNotConnectedError ||
    err instanceof mongo.MongoTopologyClosedError ||
    err instanceof mongo.MongoServerClosedError ||
    err instanceof mongoose.Error.MongooseServerSelectionError ||
    // A connection can drop after the request's readiness check. Buffered
    // queries then fail with a plain MongooseError rather than a driver error.
    (err instanceof mongoose.Error &&
      /^Operation `.+` buffering timed out after \d+ms$/.test(err.message))
  );
};
