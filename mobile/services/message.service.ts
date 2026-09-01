import api from "./api";

export type Message = {
  id: number;
  conversationid: number;
  senderid: number;
  content: string;
  isread: boolean;
  sentat: string;
};

type MessagesResponse = {
  messages: Message[];
  page?: number;
  limit?: number;
  total?: number;
};

export const getMessages = async (
  conversationId: number,
  page = 1,
  limit = 20
): Promise<MessagesResponse> => {
  const response = await api.get(
    `/conversations/${conversationId}/messages`,
    {
      params: {
        page,
        limit,
      },
    }
  );

  return response.data;
};