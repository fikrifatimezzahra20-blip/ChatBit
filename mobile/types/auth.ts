export type UserRole = "client" | "agent";

export interface User {
  id: number;
  fullname: string;
  email: string;
  role: UserRole;
  isonline: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  fullname: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}