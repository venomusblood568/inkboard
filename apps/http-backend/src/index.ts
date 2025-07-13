import express from "express";
import { Middleware } from "./middleware";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error(`JWT_SECRET must be defined in env variable.`);
}

// allow JSON body parsing
app.use(express.json());

app.post("/api/signup", (req, res) => {
  const { full_name, username, password } = req.body;
  //add userId later

  res.status(200).json({ message: "User signUp" });
});

app.post("/api/signin", (req, res) => {
  const { username, password } = req.body;
  const userId = 1;
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
  res.status(200).json({ message: "User Logged In", token });
});

app.post("/api/create-room", Middleware, (req, res) => {
  res.status(200).json({
    message: `Room created`,
    roomId: 123,
  });
});

app.listen(8888, () => {
  console.log(`Http-backend is running on http://localhost:8888`);
});
