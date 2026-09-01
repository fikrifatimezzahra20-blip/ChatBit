import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, fullname, password, passwordHash, role } = req.body;
        const rawPassword = password || passwordHash;

        if (!email || !fullname || !rawPassword) {
            return res.status(400).json({ message: "Missing required fields: email, fullname, and password" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Hash password
        const hashed = await bcrypt.hash(rawPassword, 10);

        // Create new user
        const newUser = await User.create({
            fullname,
            email,
            passwordHash: hashed,
            role: role as string,
            is_online: false
        }) as any;

        // Generate JWT token
        const secret = process.env.JWT_SECRET as string;
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email, role: newUser.role },
            secret,
            { expiresIn: "24h" }
        );

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser.id,
                fullname: newUser.fullname,
                email: newUser.email,
                role: newUser.role,
                is_online: newUser.is_online
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error during registration" });
    }
};
