import type { Message, MessageInput } from '../models/message';

const BASE_URL = 'http://localhost:3001/api/messages';

export async function fetchMessages(senderId: number, recipientId: number): Promise<Array<Message>> {
  const response = await fetch(`${BASE_URL}/${senderId}/${recipientId}`);
  const data = await response.json();
  return data;
}

export async function createMessage(newMessage: MessageInput): Promise<Message> {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(newMessage),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
}
