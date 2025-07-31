import { create } from 'zustand';
import type { Message, MessageInput } from '../models/message';
import { createMessage, fetchMessages } from '../api/messages.api';

type MessagesState = {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  getMessages: (currentUserId: number, recipientId: number) => Promise<void>;
  createMessage: (message: MessageInput) => Promise<void>;
};

const useMessagesStore = create<MessagesState>()(set => ({
  messages: [],
  isLoading: false,
  error: null,

  getMessages: async (currentUserId: number, recipientId: number) => {
    set({ isLoading: true, error: null });
    try {
      const messages = await fetchMessages(currentUserId, recipientId);
      set({ messages, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load messages';
      set({ error: errorMessage, isLoading: false });
    }
  },
  createMessage: async (message: MessageInput) => {
    set({ error: null });
    try {
      const newMessage = await createMessage(message);
      set(state => ({
        messages: [...state.messages, newMessage]
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
      set({ error: errorMessage });
      throw error;
    }
  }
}));

export default useMessagesStore;
