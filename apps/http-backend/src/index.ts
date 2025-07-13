import express from "express";
import { Middleware } from "./middleware";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from "@repo/common/types";

dotenv.config();
const app = express();

if (!JWT_SECRET) {
  throw new Error(`JWT_SECRET must be defined in env variable.`);
}

// allow JSON body parsing
app.use(express.json());

app.post("/api/signup", (req, res) => {
  const data = CreateUserSchema.safeParse(req.body);
  if(!data.success){
    return res.json({
      message:"Incorrect Inputs"
    })
  }
  res.status(200).json({ message: "User signUp" });
});

app.post("/api/signin", (req, res) => {
  
  const data = SigninSchema.safeParse(req.body);
  if(!data.success){
    res.json({
      message:"Incorrect Inputs"
    })
    return;
  }

  const userId = 1;
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
  res.status(200).json({ message: "User Logged In", token });
});

app.post("/api/create-room", Middleware, (req, res) => {
  const data = CreateRoomSchema.safeParse(req.body);
  if(!data.success){
    res.json({
      message:"Incorrect Inputs"
    })
    return
  }
  
  res.status(200).json({ 
    message: `Room created`, 
    roomId: 123 });
});

app.listen(8888, () => {
  console.log(`Http-backend is running on http://localhost:8888`);
});
