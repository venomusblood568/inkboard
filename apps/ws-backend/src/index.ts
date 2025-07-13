import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 }, () => {
  console.log(`Ws-backend is running on http://localhost:8080`);
});

wss.on("connection", function connection(ws,request) {
  const url = request.url;
  if(!url){
    return;
  }
  const qureryParams = new URLSearchParams(url.split('?')[1]);
  const token = qureryParams.get('token');

  ws.on("message", function message(data) {
    ws.send("PONG");
  });
});
