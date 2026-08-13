import api from "./api";
import { storage } from "../lib/storage";

type RegisterData = {
  fullname: string;
  email: string;
  password: string;
  role?: "client" | "agent";
};

type LoginData = {
  email: string;
  password: string;
};

type AuthResponse = {
  token: string;
  user: {
    id: number;
    fullname: string;
    email: string;
    role: "client" | "agent";
  };
};

export const register = async (data: RegisterData) => {
  const response = await api.post<AuthResponse>(
    "/auth/register",
    data
  );

  const { token, user } = response.data;

  await storage.setToken(token);
  await storage.setUser(user);

  return response.data;
};

export const login = async (data: LoginData) => {
  const response = await api.post<AuthResponse>(
    "/auth/login",
    data
  );

  const { token, user } = response.data;

  await storage.setToken(token);
  await storage.setUser(user);

  return response.data;
};

export const logout = async () => {
  await storage.removeToken();
  await storage.removeUser();
};

export const getMe = async () => {
  const response = await api.get("/users/me");

  return response.data;
};