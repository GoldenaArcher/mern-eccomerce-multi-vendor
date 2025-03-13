const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jti: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
});

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
