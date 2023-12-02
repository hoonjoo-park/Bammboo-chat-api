export type Nullable<T> = T | null;

export interface Profile {
  id: number;
  userId: number;
  profileImage: string | null;
  username: string;
}

export interface Message {
  id: number;
  chatRoomId: number;
  content: string;
  createdAt: string;
  senderProfile: Profile;
}
