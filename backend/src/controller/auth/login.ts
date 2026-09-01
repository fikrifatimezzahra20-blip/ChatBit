import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, passwordHash } = req.body;

        if (!email || !passwordHash) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ where: { email } }) as any;
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(passwordHash, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Set user online status
        await user.update({ is_online: true });

        const secret = process.env.JWT_SECRET as string;
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            secret,
            { expiresIn: "24h" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
                is_online: user.is_online
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error during login" });
    }
};
