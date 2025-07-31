import { API_CONFIG } from 'config/env';

import type { Message, MessageInput } from 'models/message';

import { apiRequest } from 'utils/api-requests';

const MESSAGES_URL = `${API_CONFIG.API_BASE_URL}/messages`;

export async function fetchMessages(senderId: number, recipientId: number): Promise<Array<Message>> {
  try {
    return await apiRequest<Array<Message>>(`${MESSAGES_URL}/${senderId}/${recipientId}`);
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    throw error;
  }
}

export async function createMessage(newMessage: MessageInput): Promise<Message> {
  try {
    return await apiRequest<Message>(MESSAGES_URL, {
      method: 'POST',
      body: JSON.stringify(newMessage)
    });
  } catch (error) {
    console.error('Failed to create message:', error);
    throw error;
  }
}
