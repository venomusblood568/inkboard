import express from "express";
import { Middleware } from "./middleware";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JWT_SECRET } from "@repo/backend-common/config";
import {
  CreateRoomSchema,
  CreateUserSchema,
  SigninSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import bcrypt from "bcrypt";
import cors from "cors";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
const PORT = 8181

if (!JWT_SECRET) {
  throw new Error(`JWT_SECRET must be defined in env variable.`);
}

// allow JSON body parsing
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("✅ Express backend is working");
});

app.post("/api/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(401).json({
      message: "Invalid Inputs",
    });
  }

  const { username, password, name } = parsedData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prismaClient.user.create({
      data: {
        username: username,
        password: hashedPassword,
        name,
      },
    });
    res.status(200).json({ message: "User signUp", userId: user.id });
  } catch (error) {
    res.status(411).json({
      message: "User already exits with same email or internal error",
    });
  }
});

app.post("/api/signin", async (req, res) => {
  const parcedData = SigninSchema.safeParse(req.body);
  if (!parcedData.success) {
    return res.status(401).json({
      message: "Invalid Inputs",
    });
  }
  const { username, password } = parcedData.data;
  try {
    const user = await prismaClient.user.findUnique({
      where: { username },
    });
    if (!user) {
      res.status(401).json({
        message: "Invaild credentials",
      });
      return;
    }
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      res.status(401).json({
        message: "Invalid Credentials",
      });
      return;
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "User Logged In", username,token });
  } catch (error) {
    res.status(500).json({
      message: "Intenal Server Error",
    });
  }
});

app.post("/api/create-room", Middleware, async(req, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }
  const userId = req.userId;
  if(!userId){
    res.status(401).json({message:"Unauthorized: Missing user Id"})
    return
  }
  try {
    const room = await prismaClient.room.create({
      data: {
        slug: parsedData.data.name,
        adminId: userId,
      },
    });
    res.status(200).json({
      message: `Room created`,
      roomId: room.id,
    });
  } catch (error) {
    res.status(500).json({"message":"room already exits with same name"})
  }
});

app.get("/api/roomlist",Middleware,async(req,res) => {
  try {
    const userId = req.userId;
    if(!userId){
      res.status(401).json({error:"Unauthorized"});
    }
    const rooms = await prismaClient.room.findMany({
      where:{
        adminId: userId
      }
    })
    res.status(200).json({rooms})
  } catch (error) {
    console.log(`Error fecthing room list:`,error);
    res.status(500).json({error: `Internal Server Error`})
    
  }
})

app.get("/api/chats/:roomId", async(req,res)=>{
  try {
    const roomId = Number(req.params.roomId);
    const messages = await prismaClient.chat.findMany({
      where: {
        roomId: roomId,
      },
      orderBy: {
        id: "desc",
      },
      take: 50,
    });
    res.status(200).json({
      messages,
    });
  } catch (error) {
    res.status(500).json({"message":"Internal Error"})
  }
})

app.get("/api/room/:slug", async(req ,res) => {
  const slug = req.params.slug;
  console.log("Slug requested:", slug);
  try {
    const room = await prismaClient.room.findFirst({
      where:{
        slug
      }
    })
    res.status(200).json({
      room
    })
  } catch (error) {
    console.log(`Something went wrong:`,error)
    res.status(401).json({
      message:"Something went worng"
    })
  }
})

app.listen(PORT, () => {
  console.log(`Http-backend is running on http://localhost:${PORT}`);
});
