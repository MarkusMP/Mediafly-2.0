import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { User } from "../entities/user.entity";
import { IGetUserAuthInfoRequest } from "../utils/definitionFile";

export const protect = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findOne(decoded.id);

      next();
    } catch (error) {
      res.status(401);
      res.json({ message: "Not authorized, no token" });
    }
  }

  if (!token) {
    res.status(401);
    res.json({ message: "Not authorized, no token" });
  }
};
