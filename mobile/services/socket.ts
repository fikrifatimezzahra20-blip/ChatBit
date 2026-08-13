import { io } from "socket.io-client";
import { storage } from "../lib/storage";

const SOCKET_URL = "http://192.168.1.78:3000";

const socket = io(SOCKET_URL, {
  autoConnect: false,

  auth: async (cb) => {
    const token = await storage.getToken();

    cb({
      token,
    });
  },
});

export default socket;