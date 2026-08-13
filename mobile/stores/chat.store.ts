import { create } from "zustand";
import { Message } from "../types/message";

interface ChatState {
  messages: Message[];
  typing: boolean;

  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setTyping: (typing: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  typing: false,

  setMessages: (messages) => {
    set({ messages });
  },

  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  setTyping: (typing) => {
    set({ typing });
  },

  clearMessages: () => {
    set({
      messages: [],
      typing: false,
    });
  },
}));