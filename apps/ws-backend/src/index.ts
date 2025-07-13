import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";

import { ENV } from "@repo/config";

const JWT_SECRET = ENV.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error(`JWT_SECRET must be defined in env variable.`);
}
const wss = new WebSocketServer({ port: 8080 }, () => {
  console.log(`Ws-backend is running on http://localhost:8080`);
});

wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }
  const qureryParams = new URLSearchParams(url.split("?")[1]);
  const token = qureryParams.get("token")|| "";
  const decoded = jwt.verify(token, JWT_SECRET);
  if(!decoded || !(decoded as JwtPayload).userId){
    ws.close();
    return;
  }
  ws.on("message", function message(data) {
    ws.send("PONG");
  });
});
