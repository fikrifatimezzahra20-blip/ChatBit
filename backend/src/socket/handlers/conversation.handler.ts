import { Server, Socket } from "socket.io";
import { Conversation } from "../../models";

export const handleConversation = (io: Server, socket: Socket) => {
    const user = socket.data.user;

    // Handle conversation:join
    socket.on("conversation:join", async (data: { conversationId: number }) => {
        try {
            const { conversationId } = data;
            if (!conversationId) return;

            const conversation = await Conversation.findByPk(conversationId) as any;
            if (!conversation) {
                socket.emit("error", { message: "Conversation not found" });
                return;
            }

            const role = user.role?.toUpperCase();

            // Verify membership: client must be the owner, agent must be the owner or unassigned
            if (role === "CLIENT" && conversation.client_id !== user.id) {
                socket.emit("error", { message: "Unauthorized room access" });
                return;
            }
            if (role === "AGENT" && conversation.agent_id !== null && conversation.agent_id !== user.id) {
                socket.emit("error", { message: "Unauthorized room access" });
                return;
            }

            // Agent joining an unassigned (en_attente) conversation automatically assigns them
            if (role === "AGENT" && conversation.status === "en_attente") {
                await conversation.update({
                    status: "en_cours",
                    agent_id: user.id
                });
                // Broadcast updated conversation status to all clients
                io.emit("conversation:updated", conversation);
            }

            socket.join(`conversation_${conversationId}`);
            console.log(`User ${user.email} joined room: conversation_${conversationId}`);
        } catch (err) {
            console.error(err);
            socket.emit("error", { message: "Error joining conversation room" });
        }
    });

    // Handle conversation:leave
    socket.on("conversation:leave", (data: { conversationId: number }) => {
        const { conversationId } = data;
        if (conversationId) {
            socket.leave(`conversation_${conversationId}`);
            console.log(`User ${user.email} left room: conversation_${conversationId}`);
        }
    });
};
