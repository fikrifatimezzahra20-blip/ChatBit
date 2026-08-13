import jwt from "jsonwebtoken";

export const authenticateSocket = (socket: any, next: (err?: Error) => void) => {
    // Read token from handshake auth or query parameter
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;

    if (!token) {
        return next(new Error("Authentication error: Token required"));
    }

    const secret = process.env.JWT_SECRET || "supersecretkey_change_me";

    try {
        const decoded = jwt.verify(token, secret) as { id: number; email: string; role: string };
        socket.data.user = decoded; // Store authenticated user in socket.data
        next();
    } catch (err) {
        return next(new Error("Authentication error: Invalid or expired token"));
    }
};
