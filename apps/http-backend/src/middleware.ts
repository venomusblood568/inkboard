import { Request,Response,NextFunction } from "express"
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET

export function Middleware(req:Request,res:Response,next:NextFunction){ 
    try {
        const header = req.headers.authorization;
        if (!header) {
          res.status(401).json({ message: "Unauthorized" });
          return
        }
        const token = header.split(" ")[1];
        // @ts-ignore
        const decoded = jwt.verify(token,JWT_SECRET);
        (req as any).user = decoded
        next()
    } catch (error) {
      res.status(403).json({messagae:"Something went wrong"})  
    }

}