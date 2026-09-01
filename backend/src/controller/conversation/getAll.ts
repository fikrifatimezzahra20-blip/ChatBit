import { Request, Response } from "express";
import { Conversation, User } from "../../models";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";
import { Op } from "sequelize";

export const getAll = async (req: Request, res: Response) => {
    try {
        const user = (req as AuthenticatedRequest).user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        let conversations;
        if (user.role === "CLIENT") {
            // Clients only see their own conversations
            conversations = await Conversation.findAll({
                where: { client_id: user.id },
                order: [["createdAt", "DESC"]],
                include: [
                    { model: User, as: "client", attributes: ["id", "fullname", "email", "role", "is_online"] },
                    { model: User, as: "agent", attributes: ["id", "fullname", "email", "role", "is_online"] }
                ]
            });
        } else if (user.role === "AGENT") {
            // Agents see conversations that are 'en_attente' or 'en_cours'
            conversations = await Conversation.findAll({
                where: {
                    status: {
                        [Op.in]: ["en_attente", "en_cours"]
                    }
                },
                order: [["createdAt", "DESC"]],
                include: [
                    { model: User, as: "client", attributes: ["id", "fullname", "email", "role", "is_online"] },
                    { model: User, as: "agent", attributes: ["id", "fullname", "email", "role", "is_online"] }
                ]
            });
        } else {
            return res.status(403).json({ message: "Forbidden" });
        }

        return res.status(200).json({ conversations });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error retrieving conversations" });
    }
};
