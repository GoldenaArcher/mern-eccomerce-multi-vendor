const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateAuthToken = (user) => {
  const jti = crypto.randomUUID();

  const authToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: 15 * 60 * 1000 }
  );

  const refreshToken = jwt.sign(
    { id: user._id, jti },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return { authToken, refreshToken };
};

module.exports = { generateAuthToken };
