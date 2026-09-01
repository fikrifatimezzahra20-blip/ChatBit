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

        const role = user.role?.toUpperCase();
        let rawConversations;

        if (role === "CLIENT") {
            // Clients only see their own conversations
            rawConversations = await Conversation.findAll({
                where: { client_id: user.id },
                order: [["created_at", "DESC"]],
                include: [
                    { model: User, as: "client", attributes: ["id", "fullname", "email", "role", "is_online"] },
                    { model: User, as: "agent", attributes: ["id", "fullname", "email", "role", "is_online"] }
                ]
            });
        } else if (role === "AGENT") {
            // Agents see conversations that are 'en_attente' or 'en_cours'
            rawConversations = await Conversation.findAll({
                where: {
                    status: {
                        [Op.in]: ["en_attente", "en_cours"]
                    }
                },
                order: [["created_at", "DESC"]],
                include: [
                    { model: User, as: "client", attributes: ["id", "fullname", "email", "role", "is_online"] },
                    { model: User, as: "agent", attributes: ["id", "fullname", "email", "role", "is_online"] }
                ]
            });
        } else {
            return res.status(403).json({ message: "Forbidden" });
        }

        // Map with both snake_case and camelCase/no-underscore for compatibility
        const conversations = rawConversations.map((c: any) => {
            const item = c.toJSON ? c.toJSON() : c;
            return {
                ...item,
                clientid: item.client_id,
                agentid: item.agent_id,
                createdat: item.created_at,
                closedat: item.closed_at
            };
        });

        return res.status(200).json(conversations);
    } catch (err) {
        console.error("Error retrieving conversations:", err);
        return res.status(500).json({ message: "Internal server error retrieving conversations" });
    }
};
