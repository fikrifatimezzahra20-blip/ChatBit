import { Router } from "express";
import * as client from '../routes/app'
const  route =  Router()


route.post("/api/auth/register",client.register)
route.post("/api/auth/login")
route.get("/api/user/me")
route.get("/api/conversation")