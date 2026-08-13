import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.models";

class auth {
    register = async (req: Request, res: Response) => {
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
            const secret = process.env.JWT_SECRET as string ;
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
    }

    login = async (req: Request, res: Response) => {
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

            const secret = process.env.JWT_SECRET as string ;
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
    }

    me = async (req: Request, res: Response) => {
        try {
            // req.user is set by authenticateToken middleware
            const reqWithUser = req as any;
            if (!reqWithUser.user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const user = await User.findByPk(reqWithUser.user.id) as any;
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json({
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
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default new auth();

