import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

interface IDecodeToken extends JwtPayload {
  userId: string;
}

export interface AuthReq extends Request {
  user?: IDecodeToken;
}

export async function authMiddleware(
  req: AuthReq,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
   
    const token = req.headers.authorization?.split(" ")[1];
 
    if (!token) {
      res.status(200).json({
        sucess: false,
        message: "unauthorized, please login to continue!",
      });
      return;
    }

    const decodeToken = (await jwt.verify(token, JWT_SECRET)) as IDecodeToken;
    if (!decodeToken) {
      res.status(200).json({
        sucess: false,
        message: "Invalid or expired token!",
      });
      return;
    }

    req.user = decodeToken;
    next();
  } catch (error) {
    res.status(200).json({
      sucess: false,
      message: "unauthorized, please login to continue!",
    });
    return;
  }
}
