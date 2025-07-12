import express from "express";
import { Middleware } from "./middleware";

const app = express();

// allow JSON body parsing
app.use(express.json())

app.post("/api/signup",(req,res) => {
    const{full_name,username,password} = req.body;
    res.status(200).json({message:"User signUp"})
})

app.post("/api/signin",(req,res) =>{
    const{username,password} = req.body;
    res.status(200).json({message:"User Logged In"})
})

app.post("/api/create-room",Middleware,(req,res) => {
    const user = (req as any).user;
    res.status(200).json({ message: `Room created for ${user.username}`});
})

app.listen(8888,()=>{
    console.log(`Http-backend is running on http://localhost:8888`);
});
