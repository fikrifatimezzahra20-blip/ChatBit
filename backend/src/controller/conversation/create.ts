import { Request, Response } from "express";
import { Conversation } from "../../models";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";

export const create = async (req: Request, res: Response) => {
    try {
        const user = (req as AuthenticatedRequest).user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const role = user.role?.toUpperCase();
        if (role !== "CLIENT") {
            return res.status(403).json({ message: "Only clients can create conversations" });
        }

        const { subject } = req.body;
        if (!subject || !subject.trim()) {
            return res.status(400).json({ message: "Subject is required" });
        }

        const newConversation = await Conversation.create({
            subject: subject.trim(),
            status: "en_attente",
            client_id: user.id,
            agent_id: null
        }) as any;

        const convJson = newConversation.toJSON ? newConversation.toJSON() : newConversation;
        const formatted = {
            ...convJson,
            clientid: convJson.client_id,
            agentid: convJson.agent_id,
            createdat: convJson.created_at,
            closedat: convJson.closed_at
        };

        // Notify agents via socket in real time
        const io = req.app.get("io");
        if (io) {
            io.emit("conversation:new", formatted);
        }

        return res.status(201).json({
            message: "Conversation created successfully",
            ...formatted,
            conversation: formatted
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error during conversation creation" });
    }
};
