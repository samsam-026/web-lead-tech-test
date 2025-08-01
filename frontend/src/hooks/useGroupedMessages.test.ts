import { describe, expect, it } from 'vitest';

import { renderHook } from '@testing-library/react';

import { useGroupedMessages } from './useGroupedMessages';

const baseTime = new Date('2024-06-01T12:00:00Z');

function addSeconds(date: Date, seconds: number) {
  return new Date(date.getTime() + seconds * 1000).toISOString();
}

describe('useGroupedMessages', () => {
  it('returns empty array for empty messages', () => {
    const { result } = renderHook(() => useGroupedMessages([]));
    expect(result.current).toEqual([]);
  });

  it('sorts messages by timestamp', () => {
    const messages = [
      { id: 2, senderId: 1, timestamp: addSeconds(baseTime, 10), text: 'Second' },
      { id: 1, senderId: 1, timestamp: baseTime.toISOString(), text: 'First' }
    ];
    const { result } = renderHook(() => useGroupedMessages(messages as any));
    expect((result.current[1] as any).message.text).toBe('First');
    expect((result.current[2] as any).message.text).toBe('Second');
  });

  it('groups messages with divider for first message', () => {
    const messages = [{ id: 1, senderId: 1, timestamp: baseTime.toISOString(), text: 'Hello' }];
    const { result } = renderHook(() => useGroupedMessages(messages as any));
    expect(result.current).toEqual([
      { type: 'divider', timestamp: baseTime.toISOString() },
      { type: 'message', message: messages[0], addExtraSpace: true }
    ]);
  });

  it('adds divider when messages are more than 1 hour apart', () => {
    const messages = [
      { id: 1, senderId: 1, timestamp: baseTime.toISOString(), text: 'Hello' },
      { id: 2, senderId: 1, timestamp: addSeconds(baseTime, 3601), text: 'Hi again' }
    ];
    const { result } = renderHook(() => useGroupedMessages(messages as any));
    expect(result.current.filter(i => i.type === 'divider')).toHaveLength(2);
  });

  it('adds extra space when sender changes', () => {
    const messages = [
      { id: 1, senderId: 1, timestamp: baseTime.toISOString(), text: 'Hello' },
      { id: 2, senderId: 2, timestamp: addSeconds(baseTime, 10), text: 'Hi' }
    ];
    const { result } = renderHook(() => useGroupedMessages(messages as any));
    expect((result.current[2] as any).addExtraSpace).toBe(true);
  });

  it('adds extra space when time difference > 20 seconds', () => {
    const messages = [
      { id: 1, senderId: 1, timestamp: baseTime.toISOString(), text: 'Hello' },
      { id: 2, senderId: 1, timestamp: addSeconds(baseTime, 25), text: 'Hi' }
    ];
    const { result } = renderHook(() => useGroupedMessages(messages as any));
    expect((result.current[2] as any).addExtraSpace).toBe(true);
  });

  it('does not add extra space for same sender within 20 seconds', () => {
    const messages = [
      { id: 1, senderId: 1, timestamp: baseTime.toISOString(), text: 'Hello' },
      { id: 2, senderId: 1, timestamp: addSeconds(baseTime, 10), text: 'Hi' }
    ];
    const { result } = renderHook(() => useGroupedMessages(messages as any));
    expect((result.current[2] as any).addExtraSpace).toBe(false);
  });
});
