class AuthController {
  login(req, res, next) {
    const { email, password } = req.body;
    try {
    } catch (err) {
      next(err);
    }
  }

  getUser
}

module.exports = AuthController;
