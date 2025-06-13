import express, { Response, Request } from "express";
import { middleware, AuthRequest } from "./middleware";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import {
  CreateRoomSchema,
  CreateUserSchema,
  SigninSchema,
} from "@repo/common/types";

const app = express();
app.use(express.json());
const PORT = 3000;

app.post("/signup", (req: Request, res: Response) => {
  const data = CreateUserSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }
  //db call
  res.status(200).json({
    roomId: 123,
  });
});
app.post("/signin", (req: Request, res: Response) => {
  const data = SigninSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }
  const userId = 1;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );
  res.status(200).json({ token });
});
app.post("/room", middleware, (req: AuthRequest, res: Response) => {
  const data = CreateRoomSchema.safeParse(req.body);
  if (!data.success) {
    res.json({ message: "Incorrect Inputs" });
    return;
  }
  //db call
  const userId = req.user?.userId;
  res.status(200).json({
    message: `User ${userId} joined the room `,
    roomId: 123,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
