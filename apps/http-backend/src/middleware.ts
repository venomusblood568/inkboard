import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "@repo/backend-common";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}
export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export function middleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Authorization token Missing" });
    return;
  }
  const token = authHeader?.split(" ")[1];
  if (!token) {
    res.status(401).json({ messgae: "Token missing" });
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (typeof decoded == "string") {
      return;
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ messgae: "Invalid or expired token", error });
  }
}
