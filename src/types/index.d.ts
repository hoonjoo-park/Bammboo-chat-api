export type Nullable<T> = T | null;

export interface Profile {
  id: number;
  userId: number;
  profileImage?: string;
  username: string;
}

export interface Message {
  id: number;
  chatRoomId: number;
  content: string;
  createdAt: string;
  userProfile: Profile;
}
