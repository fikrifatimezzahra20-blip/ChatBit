import { Request, Response } from "express";
import { User } from "../../models";

export const me = async (req: Request, res: Response) => {
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
};
