import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JWT_SECRET } from "@repo/backend-common/config";

dotenv.config();

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined in .env");
}

interface JwtPayload {
  userId: string;
}

export function Middleware(req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token missing or malformed" });
    }

    const token = header.split(" ")[1];
    if (!token || "") {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string") {
      return;
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    res.status(403).json({ message: "Forbidden: Invalid or expired token" });
  }
}
