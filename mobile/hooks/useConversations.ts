import { useQuery } from "@tanstack/react-query";
import { getConversations } from "../services/conversation.service";

export function useConversations() {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });
}