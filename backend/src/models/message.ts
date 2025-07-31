export enum MessageStatus {
  Delivered = 'delivered',
  Read = 'read'
}

export interface Message {
  id: number;
  content: string;
  senderId: number;
  recipientId: number;
  timestamp: Date;
}
