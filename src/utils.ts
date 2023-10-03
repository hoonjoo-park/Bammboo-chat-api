import axios from "axios";

export const authUser = async (authToken: string) => {
  if (!authToken || typeof authToken !== "string") return null;

  try {
    const token = authToken.split(" ").pop() || "";

    const { data: user } = await axios.get("http://localhost:3000/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return user;
  } catch (error) {
    return null;
  }
};
