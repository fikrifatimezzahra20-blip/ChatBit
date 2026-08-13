import { Server, Socket } from "socket.io";
import { authenticateSocket } from "../middleware/socketAuth.middleware";
import { handlePresence } from "./handlers/presence.handler";
import { handleConversation } from "./handlers/conversation.handler";
import { handleMessage } from "./handlers/message.handler";
import { handleTyping } from "./handlers/typing.handler";

export const setupSocket = (io: Server) => {
    // Apply Socket.IO JWT authentication middleware
    io.use(authenticateSocket);

    io.on("connection", async (socket: Socket) => {
        try {
            // Establish user presence and set up disconnect listener
            await handlePresence(io, socket);

            // Register conversation event listeners
            handleConversation(io, socket);

            // Register messaging event listeners
            handleMessage(io, socket);

            // Register typing state event listeners
            handleTyping(io, socket);
        } catch (err) {
            console.error(err);
            socket.disconnect();
        }
    });
};