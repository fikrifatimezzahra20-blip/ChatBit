import { Router } from "express";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import swaggerUi from "swagger-ui-express";
import auth from "../controller/auth.controller";
import conversation from "../controller/conversation.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const route = Router();

// Health check
route.get("/api/health", (req, res) => res.json({ status: "ok", uptime: process.uptime() }));
route.get("/health", (req, res) => res.json({ status: "ok", uptime: process.uptime() }));

// OpenAPI docs
const openapiPath = join(process.cwd(), "src/docs/openapi.json");
if (existsSync(openapiPath)) {
    try {
        const openapiSpec = JSON.parse(readFileSync(openapiPath, "utf-8"));
        route.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));
        route.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));
    } catch (e) {
        console.error("Could not load OpenAPI specification:", e);
    }
}

// Auth routes (supporting both with and without /api prefix and user/users)
route.post(["/api/auth/register", "/auth/register"], auth.register);
route.post(["/api/auth/login", "/auth/login"], auth.login);
route.get(["/api/users/me", "/api/user/me", "/users/me", "/user/me"], authenticateToken, auth.me);

// Conversation REST routes
route.get(["/api/conversations", "/conversations"], authenticateToken, conversation.getAll);
route.post(["/api/conversations", "/conversations"], authenticateToken, conversation.create);
route.get(["/api/conversations/:id/messages", "/conversations/:id/messages"], authenticateToken, conversation.getMessages);
route.patch(["/api/conversations/:id/close", "/conversations/:id/close"], authenticateToken, conversation.close);

export default route;