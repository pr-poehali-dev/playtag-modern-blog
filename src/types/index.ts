export interface User {
  id: string;
  login: string;
  email: string;
  name?: string;
  surname?: string;
  birthday?: string;
  city?: string;
  avatar?: string;
  coverImage?: string;
  points: number;
  isAdmin: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  coverImage: string;
  mediaFiles: MediaFile[];
  authorId: string;
  createdAt: string;
  views: number;
  reactions: Reactions;
  comments: Comment[];
}

export interface MediaFile {
  id: string;
  type: "image" | "video" | "audio";
  url: string;
  name: string;
}

export interface Reactions {
  likes: number;
  joy: number;
  love: number;
  sadness: number;
  anger: number;
  thinking: number;
  userReactions: Record<string, ReactionType>;
}

export type ReactionType =
  | "like"
  | "joy"
  | "love"
  | "sadness"
  | "anger"
  | "thinking";

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  blogPostId: string;
}

export interface Gift {
  id: string;
  name: string;
  emoji: string;
  cost: number;
}

export interface ReceivedGift {
  id: string;
  giftId: string;
  gift: Gift;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  createdAt: string;
}

export interface Reel {
  id: string;
  videoUrl: string;
  title: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  views: number;
  likes: number;
  comments: Comment[];
  userLiked: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
