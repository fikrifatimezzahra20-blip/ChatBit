export type ConversationStatus =
  | "en_attente"
  | "en_cours"
  | "fermee";

export interface Conversation {
  id: number;
  subject: string;
  status: ConversationStatus;
  clientid: number;
  agentid: number | null;
  createdat: string;
  closedat: string | null;
}