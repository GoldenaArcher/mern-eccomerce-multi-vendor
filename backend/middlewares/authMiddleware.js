const { AuthError, InternalServerError } = require("../errors");
const TokenService = require("../services/TokenService");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AuthError(401, "Unauthorized: No token provided"));
    }

    const decoded = TokenService.verifyAccessToken(authHeader.slice(7));

    if (!decoded) {
      return next(
        new AuthError(403, "Unauthorized: Token verification failed")
      );
    }

    req.user = decoded;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(new AuthError(401, "Unauthorized: Token expired"));
    } else if (err.name === "JsonWebTokenError") {
      return next(new AuthError(403, "Unauthorized: Invalid token"));
    }
    return next(new InternalServerError());
  }
};

module.exports = authMiddleware;
