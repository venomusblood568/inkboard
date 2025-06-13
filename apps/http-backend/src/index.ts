import express,{Response,Request} from "express";
import { middleware, AuthRequest } from "./middleware";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

const app = express()
app.use(express.json());
const PORT = 3000


app.post("/signup", (req:Request,res:Response)=> {
  //db call
  res.status(200).json({
    roomId: 123,
  });
})
app.post("/signin", (req: Request, res: Response) => {
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
  //db call
  const userId = req.user?.userId;
  res.status(200).json({
    message:`User ${userId} joined the room `,
    roomId: 123
  })
});

app.listen(PORT,() => {
  console.log(`Server running on ${PORT}`)
});