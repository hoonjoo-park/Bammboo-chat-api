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
  const { data } = await bambooApi.get("/user/me");

  return data;
};

export default { bambooApi };