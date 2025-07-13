import express from "express";
import { Middleware } from "./middleware";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from "@repo/common/types";
import {prismaClient} from "@repo/db/client";

dotenv.config();
const app = express();

if (!JWT_SECRET) {
  throw new Error(`JWT_SECRET must be defined in env variable.`);
}

// allow JSON body parsing
app.use(express.json());

app.post("/api/signup", async (req, res) => {
  const parcedData = CreateUserSchema.safeParse(req.body);
  if(!parcedData.success){
    return res.json({
      message:"Incorrect Inputs"
    })
  }
  try {
    await prismaClient.user.create({
      data: {
        email: parcedData.data?.username,
        password: parcedData.data?.password,
        name: parcedData.data?.name,
      },
    });
    res.status(200).json({ message: "User signUp" });
  } catch (error) {
    res.status(411).json({
      message:"User already exits with same email or internal error"
    })
  }
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
