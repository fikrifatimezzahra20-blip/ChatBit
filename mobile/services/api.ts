import axios from "axios";
import { storage } from "../lib/storage";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.1.182:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await storage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;