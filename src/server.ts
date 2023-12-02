import cors from "cors";
import express, { Request, Response } from "express";
import { Server } from "http";
import { Socket, Server as SocketIOServer } from "socket.io";
import {
  createChatRoom,
  getChatRooms,
  sendMessage,
  setHeaderToken,
} from "./utils/api";
import { authUser } from "./utils/auth";

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

  socket.join(`user-${user.id}`);

  const chatRooms = await getChatRooms();

  socket.emit("chatRooms", chatRooms);

  socket.on("joinRoom", (chatRoomId: string) => {
    socket.join(chatRoomId);
  });

  // * Create a new chat room
  socket.on("createChatRoom", async ({ userId }: { userId: string }) => {
    try {
      const newChatRoom = await createChatRoom(Number(userId));

      socket.emit("updateChatRoom", newChatRoom);
    } catch (error) {
      socket.emit("error", error);
      console.error(error);
    }
  });

  // * Send a message
  socket.on("message", async (chatRoomId: string, message: string) => {
    if (!io.sockets.adapter.rooms.get(chatRoomId)) {
      socket.emit("error", "Chat room not found");
      return;
    }

    const newMessage = await sendMessage(Number(chatRoomId), message);

    io.to(chatRoomId).emit("message", newMessage);
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
