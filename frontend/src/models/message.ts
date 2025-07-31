export interface Message {
  id: number;
  senderId: number;
  recipientId: number;
  content: string;
  timestamp: string;
}

export interface MessageInput {
  senderId: number;
  recipientId: number;
  content: string;
}
