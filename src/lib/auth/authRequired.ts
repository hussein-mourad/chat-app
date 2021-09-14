import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "./User";

export default async function authRequired(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.signedCookies.jwt;
  if (token) {
    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET || ""
      ) as JwtPayload;
      let user = await User.findById(decodedToken["id"]);
      if (user) {
        res.locals.user = user;
        next();
      } else {
        throw new Error("User is not authenticated.");
      }
    } catch (err: any) {
      res.status(401).json({ user: null, error: "User is not authenticated" });
    }
  } else {
    res.status(401).json({ user: null, error: "User is not authenticated" });
  }
}
