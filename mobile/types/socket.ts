export interface NewMessageEvent {
  id: number;
  conversationid: number;
  senderid: number;
  content: string;
  isread: boolean;
  sentat: string;
}

export interface TypingUpdate {
  userId: number;
  isTyping: boolean;
}

export interface PresenceUpdate {
  userId: number;
  isOnline: boolean;
}