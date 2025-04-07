import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jti: { type: String, required: true, unique: true },
});

export default mongoose.model("RefreshToken", refreshTokenSchema);
