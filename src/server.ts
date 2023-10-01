import express, { Request, Response } from "express";
import { Server } from "http";
import { Socket, Server as SocketIOServer } from "socket.io";

const PORT: number = Number(process.env.PORT) || 3010;
const app = express();
const server: Server = new Server(app);
const io: SocketIOServer = new SocketIOServer(server);

app.get("/", (req: Request, res: Response) => {
  res.send(`🏄‍♂️  Chat server is running on port ${PORT}`);
});

io.on("connection", (socket: Socket) => {
  socket.on("onMessage", (msg: any) => {
    console.log(msg);
    // io.emit("onMessage", msg);
  });

  socket.on("connect", () => {
    console.log("user connected");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`🏄‍♂️  Chat server is running on port ${PORT}`);
});
