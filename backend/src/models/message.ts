export enum MessageStatus {
  Delivered = 'delivered',
  Read = 'read'
}

export interface Message {
  id: number;
  content: string;
  userId: string;
  timestamp: Date;
}
