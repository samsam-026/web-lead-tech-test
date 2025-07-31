import type { Message, MessageInput } from '../models/message';
import { apiRequest } from '../utils/api-requests';

const BASE_URL = `http://localhost:3001/api/messages`;

export async function fetchMessages(senderId: number, recipientId: number): Promise<Array<Message>> {
  try {
    return await apiRequest<Array<Message>>(`${BASE_URL}/${senderId}/${recipientId}`);
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    throw error;
  }
}

export async function createMessage(newMessage: MessageInput): Promise<Message> {
  try {
    return await apiRequest<Message>(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(newMessage)
    });
  } catch (error) {
    console.error('Failed to create message:', error);
    throw error;
  }
}
