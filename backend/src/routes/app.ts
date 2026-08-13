import { Router } from "express";
import auth from "../controller/auth.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const route = Router();

route.post("/api/auth/register", auth.register);
route.post("/api/auth/login", auth.login);
route.get("/api/user/me", authenticateToken, auth.me);

export default route;