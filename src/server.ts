import cors from "cors";
import express, { Request, Response } from "express";
import { Server } from "http";
import { Socket, Server as SocketIOServer } from "socket.io";
import { authUser } from "./utils/auth";
import { setHeaderToken } from "./utils/api";

const PORT: number = Number(process.env.PORT) || 3090;
const app = express();
const server: Server = new Server(app);
const io: SocketIOServer = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  allowEIO3: true,
});

app.use(cors());

app.get("/", (_: Request, res: Response) => {
  res.send(`🏄‍♂️  Chat server is running on port ${PORT}`);
});

io.on("connection", async (socket: Socket) => {
  const authToken = socket.handshake.query.token;

  setHeaderToken(authToken);

  const user = await authUser();

  if (!user) return;

  console.log(`🏓 Socket connected! (name: ${user.name})`);

  socket.on("message", (msg: any) => {
    console.log(msg);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected...");
  });
});

io.on("error", (error: any) => {
  console.error("Socket error:", error);
});

server.listen(PORT, () => {
  console.log(`🏄‍♂️  Chat server is running on port ${PORT}`);
});
