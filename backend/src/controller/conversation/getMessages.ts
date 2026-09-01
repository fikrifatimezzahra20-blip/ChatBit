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

        const role = user.role?.toUpperCase();
        // Verify membership: user must be client or agent of this conversation (or if agent and conversation is unassigned)
        if (role === "CLIENT" && conversation.client_id !== user.id) {
            return res.status(403).json({ message: "Forbidden: You are not a participant in this conversation" });
        }
        if (role === "AGENT" && conversation.agent_id !== null && conversation.agent_id !== user.id) {
            return res.status(403).json({ message: "Forbidden: Conversation is assigned to another agent" });
        }

        // Pagination query params
        const limit = parseInt(req.query.limit as string) || 50;
        const page = parseInt(req.query.page as string) || 1;
        const offset = req.query.offset !== undefined
            ? parseInt(req.query.offset as string)
            : (page - 1) * limit;

        const { count, rows: rawMessages } = await Message.findAndCountAll({
            where: { conversation_id: id },
            order: [["sent_at", "DESC"]],
            limit,
            offset,
            include: [
                { model: User, as: "sender", attributes: ["id", "fullname", "email", "role"] }
            ]
        });

        const messages = rawMessages.reverse().map((m: any) => {
            const item = m.toJSON ? m.toJSON() : m;
            return {
                ...item,
                conversationid: item.conversation_id,
                senderid: item.sender_id,
                isread: item.is_read,
                sentat: item.sent_at
            };
        });

        return res.status(200).json({
            total: count,
            limit,
            page,
            offset,
            messages
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error retrieving messages" });
    }
};
