import { beforeEach, describe, expect, it, vi } from 'vitest';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import ChatTab from './ChatTab';

// Mocks
const mockGetMessages = vi.fn().mockResolvedValue(undefined);
const mockCreateMessage = vi.fn().mockResolvedValue({
  id: 1,
  senderId: 1,
  recipientId: 2,
  content: 'Hello',
  timestamp: new Date().toString()
});
const mockAddMessage = vi.fn();

interface MockMessagesStore {
  messages: any[];
  isLoading: boolean;
  error: string | undefined;
  getMessages: typeof mockGetMessages;
  createMessage: typeof mockCreateMessage;
  addMessage: typeof mockAddMessage;
}

const mockMessagesStore: MockMessagesStore = {
  messages: [],
  isLoading: false,
  error: undefined,
  getMessages: mockGetMessages,
  createMessage: mockCreateMessage,
  addMessage: mockAddMessage
};

vi.mock('store/messages.store', () => ({
  default: () => mockMessagesStore
}));

vi.mock('store/user.store', () => ({
  default: () => ({
    currentUser: { id: 1, name: 'User1' },
    currentRecipient: { id: 2, name: 'User2' }
  })
}));

vi.mock('hooks/useGroupedMessages', () => ({
  useGroupedMessages: () => []
}));

const mockSocket = {
  on: vi.fn(),
  off: vi.fn(),
  emit: vi.fn(),
  connect: vi.fn()
};

describe('ChatTab', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    mockMessagesStore.isLoading = true;
    render(<ChatTab socket={mockSocket as any} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockMessagesStore.error = 'Error!';
    render(<ChatTab socket={mockSocket as any} />);
    expect(screen.getByText('Error!')).toBeInTheDocument();
  });

  it('calls getMessages on mount', async () => {
    render(<ChatTab socket={mockSocket as any} />);
    await waitFor(() => {
      expect(mockGetMessages).toHaveBeenCalledWith(1, 2);
    });
  });

  it('sends message on form submit', async () => {
    render(<ChatTab socket={mockSocket as any} />);
    const textarea = screen.getByPlaceholderText('Message User2');
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    fireEvent.click(screen.getByText('Send'));
    await waitFor(() => {
      expect(mockCreateMessage).toHaveBeenCalledWith({
        senderId: 1,
        recipientId: 2,
        content: 'Hello'
      });
      expect(mockSocket.emit).toHaveBeenCalledWith('send_message', [1, 2], {
        id: 1,
        content: 'Hello',
        senderId: 1,
        recipientId: 2,
        timestamp: expect.any(String)
      });
    });
  });

  it('does not send empty message', async () => {
    render(<ChatTab socket={mockSocket as any} />);
    fireEvent.click(screen.getByText('Send'));
    await waitFor(() => {
      expect(mockCreateMessage).not.toHaveBeenCalled();
      expect(mockSocket.emit).not.toHaveBeenCalledWith('send_message', expect.anything());
    });
  });

  it('renders chat tab container', () => {
    render(<ChatTab socket={mockSocket as any} />);
    expect(screen.getByTestId('chat-tab')).toBeInTheDocument();
  });

  it('sets up socket listeners and emits start_chat', () => {
    render(<ChatTab socket={mockSocket as any} />);
    expect(mockSocket.on).toHaveBeenCalledWith('connect', expect.any(Function));
    expect(mockSocket.on).toHaveBeenCalledWith('disconnect', expect.any(Function));
    expect(mockSocket.on).toHaveBeenCalledWith('receive_message', expect.any(Function));
    expect(mockSocket.connect).toHaveBeenCalled();
  });
});
