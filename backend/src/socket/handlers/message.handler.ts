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

            const role = user.role?.toUpperCase();

            // Verify participant permission
            if (role === "CLIENT" && conversation.client_id !== user.id) {
                socket.emit("error", { message: "Unauthorized to send message to this conversation" });
                return;
            }
            if (role === "AGENT") {
                if (conversation.agent_id === null) {
                    await conversation.update({ agent_id: user.id, status: "en_cours" });
                    io.emit("conversation:updated", conversation);
                } else if (conversation.agent_id !== user.id) {
                    socket.emit("error", { message: "Unauthorized to send message to this conversation" });
                    return;
                }
            }

            // Verify if conversation is already closed
            if (conversation.status === "closed" || conversation.status === "fermee") {
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
            }) as any;

            const msgJson = populatedMessage?.toJSON ? populatedMessage.toJSON() : (newMessage.toJSON ? newMessage.toJSON() : newMessage);
            const formatted = {
                ...msgJson,
                conversationid: msgJson.conversation_id,
                senderid: msgJson.sender_id,
                isread: msgJson.is_read,
                sentat: msgJson.sent_at
            };

            // Broadcast to room
            io.to(`conversation_${conversationId}`).emit("message:new", formatted);
        } catch (err) {
            console.error("Error in message:send:", err);
            socket.emit("error", { message: "Error sending message" });
        }
    });
};
