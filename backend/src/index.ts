import sequelize from "./config/database";
import express from "express";
import route from "./routes/app";
import http from "http";
import { Server } from "socket.io";
import { setupSocket } from "./socket/socket";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(route);

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

        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database or start server:", error);
    }
}

startServer();
