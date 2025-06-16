import { create } from "zustand";

export type Message = {
  id: number;
  senderId: number;
  recipientId: number;
  content: string;
  timestamp: string;
};

export type MessageInput = {
  senderId: number;
  recipientId: number;
  content: string;
};

type MessagesState = {
  messages: Message[];
  createMessage: (message: MessageInput) => void;
};

const useMessagesStore = create<MessagesState>()((set, get) => ({
  messages: [],
  createMessage: (message: MessageInput) =>
    set((state) => {
      const newMessage: Message = {
        id: state.messages.length + 1,
        senderId: message.senderId,
        recipientId: message.recipientId,
        content: message.content,
        timestamp: new Date().toISOString(),
      };
      return { messages: [...state.messages, newMessage] };
    }),
}));

export default useMessagesStore;
