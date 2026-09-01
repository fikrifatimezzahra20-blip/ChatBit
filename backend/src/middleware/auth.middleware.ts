import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        email: string;
        role: string;
    };
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void | Response => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access token required" });
    }

    const secret = process.env.JWT_SECRET as string;

    try {
        const decoded = jwt.verify(token, secret) as { id: number; email: string; role: string };
        (req as AuthenticatedRequest).user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
