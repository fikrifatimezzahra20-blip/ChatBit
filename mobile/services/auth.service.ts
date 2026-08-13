import api from "./api";
import { storage } from "../lib/storage";

type RegisterData = {
  fullname: string;
  email: string;
  password: string;
  role?: "CLIENT" | "AGENT";
};

type LoginData = {
  email: string;
  password: string;
};

type User = {
  id: number;
  fullname: string;
  email: string;
  role: "client" | "agent";
  is_online?: boolean;
};

type AuthResponse = {
  token: string;
  user: {
    id: number;
    fullname: string;
    email: string;
    role: "CLIENT" | "AGENT";
    is_online?: boolean;
  };
};

const normalizeUser = (
  user: AuthResponse["user"]
): User => {
  return {
    ...user,
    role: user.role.toLowerCase() as "client" | "agent",
  };
};

export const register = async (data: RegisterData) => {
  const response = await api.post<AuthResponse>(
    "/auth/register",
    {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      role: data.role ?? "CLIENT",
    }
  );

  const user = normalizeUser(response.data.user);

  await storage.setToken(response.data.token);
  await storage.setUser(user);

  return {
    token: response.data.token,
    user,
  };
};

export const login = async (data: LoginData) => {
  const response = await api.post<AuthResponse>(
    "/auth/login",
    {
      email: data.email,
      passwordHash: data.password,
    }
  );

  const user = normalizeUser(response.data.user);

  await storage.setToken(response.data.token);
  await storage.setUser(user);

  return {
    token: response.data.token,
    user,
  };
};

export const logout = async () => {
  await storage.removeToken();
  await storage.removeUser();
};

export const getMe = async () => {
  const response = await api.get<AuthResponse["user"]>(
    "/user/me"
  );

  const user = normalizeUser(response.data);

  await storage.setUser(user);

  return user;
};