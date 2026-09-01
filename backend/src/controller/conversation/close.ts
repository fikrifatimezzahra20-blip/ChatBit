import { Request, Response } from "express";
import { Conversation } from "../../models";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";

export const close = async (req: Request, res: Response) => {
    try {
        const user = (req as AuthenticatedRequest).user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const role = user.role?.toUpperCase();
        if (role !== "AGENT") {
            return res.status(403).json({ message: "Forbidden: Only agents can close conversations" });
        }

        const { id } = req.params;
        if (typeof id !== 'string') {
            return res.status(400).json({ message: "Invalid conversation ID" });
        }
        const conversation = await Conversation.findByPk(id) as any;

        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        if (conversation.agent_id !== null && conversation.agent_id !== user.id) {
            return res.status(403).json({ message: "Forbidden: Conversation is assigned to another agent" });
        }

        await conversation.update({
            status: "closed",
            closed_at: new Date(),
            agent_id: conversation.agent_id || user.id // Assign to current agent if not already assigned
        });

        const convJson = conversation.toJSON ? conversation.toJSON() : conversation;
        const formatted = {
            ...convJson,
            clientid: convJson.client_id,
            agentid: convJson.agent_id,
            createdat: convJson.created_at,
            closedat: convJson.closed_at
        };

        // Broadcast real-time event if Socket.IO is initialized
        const io = req.app.get("io");
        if (io) {
            io.to(`conversation_${id}`).emit("conversation:updated", formatted);
            io.emit("conversation:updated", formatted);
        }

        return res.status(200).json({
            message: "Conversation closed successfully",
            ...formatted,
            conversation: formatted
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error closing conversation" });
    }
};
