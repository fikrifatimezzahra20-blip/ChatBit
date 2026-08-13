import {create} from "axios";
import { storage } from "../lib/storage";

const API_URL = "http://192.168.1.78:3000/api";

const api = create({
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