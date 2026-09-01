import sequelize from "./config/database";
import express from "express";
import cors from "cors";
import route from "./routes/app";
import http from "http";
import { Server } from "socket.io";
import { setupSocket } from "./socket/socket";
import { SERVER_PORT } from "./config/env";
import { errorHandler } from "./middleware/error";

const app = express();
const port = SERVER_PORT;

// Enable CORS for all requests
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(route);

// Global error handler
app.use(errorHandler);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"]
    }
});

// Expose io instance to express controllers
app.set("io", io);

// Initialize Socket.IO handlers
setupSocket(io);

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Connection to the database has been established successfully.");
        
        // Sync models with database to automatically create schemas and columns
        await sequelize.sync();
        console.log("Database models synchronized successfully.");
    } catch (error) {
        console.warn("⚠️ Warning: Could not connect to PostgreSQL database:", error);
        console.warn("Ensure PostgreSQL is running (e.g., via `docker-compose up -d`).");
    }

    server.listen(port, () => {
        console.log(`🚀 ChatBit backend server is running on port ${port}`);
        console.log(`📡 Socket.IO server initialized on port ${port}`);
        console.log(`📖 API Documentation available at http://localhost:${port}/api/docs`);
    });
}

startServer();
