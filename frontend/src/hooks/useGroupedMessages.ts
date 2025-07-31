import { useMemo } from 'react';
import { differenceInHours } from 'date-fns';
import type { Message } from '../models/message';

export interface MessageGroup {
  type: 'divider';
  timestamp: string;
}

export interface MessageItem {
  type: 'message';
  message: Message;
}

export type ChatItem = MessageGroup | MessageItem;

export const useGroupedMessages = (messages: Message[]): ChatItem[] => {
  return useMemo(() => {
    if (!messages.length) return [];

    const sortedMessages = [...messages].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    const grouped: ChatItem[] = [];
    let lastTimestamp: Date | null = null;

    sortedMessages.forEach(message => {
      const currentTimestamp = new Date(message.timestamp);

      // Add divider if more than 1 hour gap or first message
      if (!lastTimestamp || differenceInHours(currentTimestamp, lastTimestamp) >= 1) {
        grouped.push({
          type: 'divider',
          timestamp: message.timestamp
        });
      }

      // Add the message
      grouped.push({
        type: 'message',
        message
      });

      lastTimestamp = currentTimestamp;
    });

    return grouped;
  }, [messages]);
};
