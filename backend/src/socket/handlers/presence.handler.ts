import { Server, Socket } from "socket.io";
import { User } from "../../models";

export const handlePresence = async (io: Server, socket: Socket) => {
    const user = socket.data.user;
    console.log(`User connected: ${user.email} (Role: ${user.role})`);

    // Update user status to online in database
    await User.update({ is_online: true }, { where: { id: user.id } });
    
    // Broadcast presence update to all connected clients
    io.emit("presence:update", { userId: user.id, is_online: true });

    // Join personal room for user-targeted events
    socket.join(`user_${user.id}`);

    // Handle disconnect
    socket.on("disconnect", async () => {
        console.log(`User disconnected: ${user.email}`);
        try {
            await User.update({ is_online: false }, { where: { id: user.id } });
            io.emit("presence:update", { userId: user.id, is_online: false });
        } catch (err) {
            console.error(err);
        }
    });
};
