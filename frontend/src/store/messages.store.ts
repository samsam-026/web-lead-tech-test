import { create } from 'zustand';
import type { Message, MessageInput } from '../models/message';
import { createMessage, fetchMessages } from '../api/messages.api';

type MessagesState = {
  messages: Message[];
  getMessages: (currentUserId: number, recipientId: number) => void;
  createMessage: (message: MessageInput) => void;
};

const useMessagesStore = create<MessagesState>()(set => ({
  messages: [],
  getMessages: async (currentUserId: number, recipientId: number) => {
    const messages = await fetchMessages(currentUserId, recipientId);
    set({ messages });
  },
  createMessage: async (message: MessageInput) => {
    const newMessage = await createMessage(message);
    return set(state => ({ messages: [...state.messages, newMessage] }));
  },
  clearConversation: () => set({ messages: [] })
}));

export default useMessagesStore;
