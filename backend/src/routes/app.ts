import { Router } from "express";
import { readFileSync } from "fs";
import auth from "../controller/auth.controller";
import conversation from "../controller/conversation.controller";
import { authenticateToken } from "../middleware/auth.middleware";


const route = Router();

// Auth routes
route.post("/api/auth/register", auth.register);
route.post("/api/auth/login", auth.login);
route.get("/api/users/me", authenticateToken, auth.me);

// Conversation REST routes
route.get("/api/conversations", authenticateToken, conversation.getAll);
route.post("/api/conversations", authenticateToken, conversation.create);
route.get("/api/conversations/:id/messages", authenticateToken, conversation.getMessages);
route.patch("/api/conversations/:id/close", authenticateToken, conversation.close);

export default route;