import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port: 8080},()=>{
    console.log(`Ws-backend is running on http://localhost:8080`)
})

wss.on("connection", function connection(ws){
    ws.on("message", function message(data){
        ws.send("PONG");
    })
})