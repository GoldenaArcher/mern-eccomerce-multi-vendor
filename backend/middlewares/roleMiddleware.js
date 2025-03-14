const { AuthError } = require("../errors");

const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return next(
        new AuthError(403, `Forbidden: ${requiredRole} access required`)
      );
    }
    next();
  };
};

module.exports = roleMiddleware;
