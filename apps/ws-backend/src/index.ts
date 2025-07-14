import { WebSocketServer,WebSocket } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 }, () => {
  console.log(`Ws-backend is running on http://localhost:8080`);
});

interface User{
  ws: WebSocket,
  rooms: number[],
  userId: string,
}

const users : User[] = []

function checkUser(token:string):string| null{
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded == "string") {
      return null;
    }
    if (!decoded || !decoded.userId) {
      return null;
    }
    return decoded.userId;
  } catch (error) {
    console.error(`JWT verification failed: `,error)
    return null
  }
}


wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }
  const qureryParams = new URLSearchParams(url.split("?")[1]);
  const token = qureryParams.get("token")|| "";
  const userId = checkUser(token);
  
  if(!userId){
    ws.close()
    return null
  }

  users.push({
    userId,
    rooms:[],
    ws
  })

  ws.on("message", async function message(data) {
    let parsedData;
    try {
      parsedData = JSON.parse(data.toString());
    } catch (error) {
      console.log(`Invalid Json Received:`,data.toString())
      return;
    }
    
    // JOIN ROOM handler
    if(parsedData.type === "join_room"){
      const user = users.find(x => x.ws === ws);
      if(!user){
        return;
      }
      user.rooms.push(parsedData.roomId);
    }

    // LEAVE ROOM handler
    if(parsedData.type === "leave_room"){
      const user = users.find(x => x.ws === ws);
      if(!user){
        return;
      }
      user.rooms = user.rooms.filter(x => x !== parsedData.room);
    }

    // CHAT handler
    if(parsedData.type === "chat"){
      const roomId = Number(parsedData.roomId);
      const message = parsedData.message;

      //Before sending the message to the user push to db
      try {
        await prismaClient.chat.create({
          data: {
            roomId,
            message,
            userId,
          }
        });
        users.forEach((user) => {
          if (user.rooms.includes(roomId)) {
            console.log(`Sending to ${user.userId} in room ${roomId}`);
            user.ws.send(
              JSON.stringify({
                type: "chat",
                message: message,
                roomId
              })
            );
          }
        });
      } catch (error) {
        console.error("Failed to save chat message to DB:", error);
      }

      
    }

  });
});
