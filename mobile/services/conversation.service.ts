import api from "./api";

export type Conversation = {
  id: number;
  subject: string;
  status: "en_attente" | "en_cours" | "fermee";
  clientid: number;
  agentid: number | null;
  createdat: string;
  closedat: string | null;
};

type CreateConversationData = {
  subject: string;
};

export const getConversations = async (): Promise<Conversation[]> => {
  const response = await api.get("/conversations");

  return response.data;
};

export const createConversation = async (
  data: CreateConversationData
): Promise<Conversation> => {
  const response = await api.post("/conversations", data);

  return response.data;
};

export const closeConversation = async (
  conversationId: number
): Promise<Conversation> => {
  const response = await api.patch(
    `/conversations/${conversationId}/close`
  );

  return response.data;
};