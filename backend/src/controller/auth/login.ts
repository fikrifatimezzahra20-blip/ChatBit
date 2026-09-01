import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models";
import { JWT_SECRET } from "../../config/env";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password, passwordHash } = req.body;
        const rawPassword = password || passwordHash;

        if (!email || !rawPassword) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({ where: { email: normalizedEmail } }) as any;
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(rawPassword, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Set user online status
        await user.update({ is_online: true });

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "24h" }
        );

        const userData = {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            is_online: true,
            isonline: true
        };

        return res.status(200).json({
            message: "Login successful",
            token,
            user: userData
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error during login" });
    }
};
