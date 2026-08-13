import { Server, Socket } from "socket.io";

export const handleTyping = (io: Server, socket: Socket) => {
    const user = socket.data.user;

    // Handle typing:start
    socket.on("typing:start", (data: { conversationId: number }) => {
        const { conversationId } = data;
        if (conversationId) {
            socket.to(`conversation_${conversationId}`).emit("typing:update", {
                conversationId,
                userId: user.id,
                isTyping: true
            });
        }
    });

    // Handle typing:stop
    socket.on("typing:stop", (data: { conversationId: number }) => {
        const { conversationId } = data;
        if (conversationId) {
            socket.to(`conversation_${conversationId}`).emit("typing:update", {
                conversationId,
                userId: user.id,
                isTyping: false
            });
        }
    });
};
