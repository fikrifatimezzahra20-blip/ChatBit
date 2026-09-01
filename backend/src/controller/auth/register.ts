import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models";
import { JWT_SECRET } from "../../config/env";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, fullname, password, passwordHash, role } = req.body;
        const rawPassword = password || passwordHash;

        if (!email || !fullname || !rawPassword) {
            return res.status(400).json({ message: "Missing required fields: email, fullname, and password" });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const userRole = (role ? String(role).toUpperCase() : "CLIENT") as "CLIENT" | "AGENT";

        if (userRole !== "CLIENT" && userRole !== "AGENT") {
            return res.status(400).json({ message: "Role must be either CLIENT or AGENT" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email: normalizedEmail } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Hash password
        const hashed = await bcrypt.hash(rawPassword, 10);

        // Create new user
        const newUser = await User.create({
            fullname: fullname.trim(),
            email: normalizedEmail,
            passwordHash: hashed,
            role: userRole,
            is_online: false
        }) as any;

        // Generate JWT token
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email, role: newUser.role },
            JWT_SECRET,
            { expiresIn: "24h" }
        );

        const userData = {
            id: newUser.id,
            fullname: newUser.fullname,
            email: newUser.email,
            role: newUser.role,
            is_online: newUser.is_online,
            isonline: newUser.is_online
        };

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user: userData
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error during registration" });
    }
};
