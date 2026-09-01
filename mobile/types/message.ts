export interface Message {
  id: number;
  conversationid: number;
  senderid: number;
  content: string;
  isread: boolean;
  sentat: string;
}