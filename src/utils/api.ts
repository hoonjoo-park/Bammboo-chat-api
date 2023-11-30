import axios from "axios";

const bambooApi = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setHeaderToken = (token: string | string[] | undefined) => {
  if (!token) return;

  let tokenToSet = "";

  if (Array.isArray(token)) {
    tokenToSet = token[0];
  } else {
    tokenToSet = token;
  }

  if (tokenToSet) {
    bambooApi.defaults.headers.common["Authorization"] = `Bearer ${tokenToSet}`;
  } else {
    bambooApi.defaults.headers.common["Authorization"] = "";
  }
};

export const getMe = async () => {
  const { data: user } = await bambooApi.get("/user/me");

  return user;
};

export const getChatRooms = async () => {
  const { data: chatRooms } = await bambooApi.get("/chatRoom");

  return chatRooms;
};

export const createChatRoom = async (userId: number) => {
  const { data } = await bambooApi.post("/chatRoom", { userId });

  return data;
};

export const updateLatestMessage = async (
  chatRoomId: number,
  latestMessageId: number
) => {
  const { data: chatRoom } = await bambooApi.patch(`/chatRoom/latest-message`, {
    chatRoomId,
    latestMessageId,
  });

  return chatRoom;
};

export default { bambooApi };
