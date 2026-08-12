import { Router } from "express";

const  route =  Router()


route.post("/api/auth/register")
route.post("/api/auth/login")
route.get("/api/user/me")
route.get("/api/conversation")