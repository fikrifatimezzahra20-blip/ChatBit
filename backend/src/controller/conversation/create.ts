import { Request, Response } from "express";
import { Conversation } from "../../models";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";

export const create = async (req: Request, res: Response) => {
    try {
        const user = (req as AuthenticatedRequest).user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (user.role !== "CLIENT") {
            return res.status(403).json({ message: "Only clients can create conversations" });
        }

        const { subject } = req.body;
        if (!subject) {
            return res.status(400).json({ message: "Subject is required" });
        }

        const newConversation = await Conversation.create({
            subject,
            status: "en_attente",
            client_id: user.id,
            agent_id: null
        });

        return res.status(201).json({
            message: "Conversation created successfully",
            conversation: newConversation
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error during conversation creation" });
    }
};
