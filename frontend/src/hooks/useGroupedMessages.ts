import { useMemo } from 'react';

import { differenceInSeconds } from 'date-fns';

import type { Message } from 'models/message';

export interface MessageGroup {
  type: 'divider';
  timestamp: string;
}

export interface MessageItem {
  type: 'message';
  message: Message;
  addExtraSpace?: boolean; // Optional prop to add extra space after the message
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
    let lastSenderId: number | null = null;

    sortedMessages.forEach(message => {
      const currentTimestamp = new Date(message.timestamp);
      const messageTimeDifferenceSeconds = lastTimestamp ? differenceInSeconds(currentTimestamp, lastTimestamp) : 0;

      // Add divider if more than 1 hour gap or first message
      if (!lastTimestamp || messageTimeDifferenceSeconds > 3600) {
        grouped.push({
          type: 'divider',
          timestamp: message.timestamp
        });
      }

      // Add the message
      // If the sender is different from the last message or if the time difference is more than 20 seconds, add extra space
      grouped.push({
        type: 'message',
        message,
        addExtraSpace: lastSenderId !== message.senderId || (!!lastTimestamp && messageTimeDifferenceSeconds > 20)
      });

      lastTimestamp = currentTimestamp;
      lastSenderId = message.senderId;
    });

    return grouped;
  }, [messages]);
};
