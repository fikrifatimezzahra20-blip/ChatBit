import { Server, Socket } from "socket.io";
import { Conversation, Message, User } from "../../models";

export const handleMessage = (io: Server, socket: Socket) => {
    const user = socket.data.user;

    // Handle message:send
    socket.on("message:send", async (data: { conversationId: number; content: string }) => {
        try {
            const { conversationId, content } = data;
            if (!conversationId || !content) {
                socket.emit("error", { message: "Missing conversationId or content" });
                return;
            }

            const conversation = await Conversation.findByPk(conversationId) as any;
            if (!conversation) {
                socket.emit("error", { message: "Conversation not found" });
                return;
            }

            // Verify participant permission
            if (user.role === "CLIENT" && conversation.client_id !== user.id) {
                socket.emit("error", { message: "Unauthorized to send message to this conversation" });
                return;
            }
            if (user.role === "AGENT" && conversation.agent_id !== user.id) {
                socket.emit("error", { message: "Unauthorized to send message to this conversation" });
                return;
            }

            // Verify if conversation is already closed
            if (conversation.status === "closed") {
                socket.emit("error", { message: "Cannot send message: Conversation is closed" });
                return;
            }

            // Mandatory order: Save to database first
            const newMessage = await Message.create({
                conversation_id: conversationId,
                sender_id: user.id,
                content,
                is_read: false
            }) as any;

            // Retrieve populated message with sender info
            const populatedMessage = await Message.findByPk(newMessage.id, {
                include: [
                    { model: User, as: "sender", attributes: ["id", "fullname", "email", "role"] }
                ]
            });

            // Broadcast to room
            io.to(`conversation_${conversationId}`).emit("message:new", populatedMessage);
        } catch (err) {
            console.error(err);
            socket.emit("error", { message: "Error sending message" });
        }
    });
};
