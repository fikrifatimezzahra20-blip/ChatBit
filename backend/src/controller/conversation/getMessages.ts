import { Request, Response } from "express";
import { Conversation, User, Message } from "../../models";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";

export const getMessages = async (req: Request, res: Response) => {
    try {
        const user = (req as AuthenticatedRequest).user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { id } = req.params;
        if (typeof id !== 'string') {
            return res.status(400).json({ message: "Invalid conversation ID" });
        }
        const conversation = await Conversation.findByPk(id) as any;

        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        // Verify membership: user must be client or agent of this conversation (or if agent and conversation is unassigned)
        if (user.role === "CLIENT" && conversation.client_id !== user.id) {
            return res.status(403).json({ message: "Forbidden: You are not a participant in this conversation" });
        }
        if (user.role === "AGENT" && conversation.agent_id !== null && conversation.agent_id !== user.id) {
            return res.status(403).json({ message: "Forbidden: Conversation is assigned to another agent" });
        }

        // Pagination query params
        const limit = parseInt(req.query.limit as string) || 20;
        const offset = parseInt(req.query.offset as string) || 0;

        const { count, rows: messages } = await Message.findAndCountAll({
            where: { conversation_id: id },
            order: [["sent_at", "DESC"]],
            limit,
            offset,
            include: [
                { model: User, as: "sender", attributes: ["id", "fullname", "email", "role"] }
            ]
        });

        return res.status(200).json({
            total: count,
            limit,
            offset,
            messages: messages.reverse() // Return in chronological order
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error retrieving messages" });
    }
};
