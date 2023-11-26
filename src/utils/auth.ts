import { getMe } from "./api";

export const authUser = async () => {
  try {
    const user = await getMe();

    return user;
  } catch (error) {
    return null;
  }
};
