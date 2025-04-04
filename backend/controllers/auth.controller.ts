import { Request, Response, NextFunction } from "express";

class AuthController {
  login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
