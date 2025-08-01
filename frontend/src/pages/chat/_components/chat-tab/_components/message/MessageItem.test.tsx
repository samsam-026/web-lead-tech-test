import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import type { Message } from 'models/message';

import MessageItem from './MessageItem';

const baseMessage: Message = {
  id: 1,
  senderId: 2,
  recipientId: 3,
  content: 'Hello world!',
  timestamp: '2024-01-01T00:00:00Z'
};

describe('MessageItem', () => {
  it('renders message content', () => {
    render(<MessageItem message={baseMessage} />);
    expect(screen.getByText('Hello world!')).toBeInTheDocument();
  });

  it('applies sender styles when senderId matches currentUserId', () => {
    render(<MessageItem message={baseMessage} currentUserId={2} />);
    const div = screen.getByText('Hello world!');
    expect(div).toHaveClass('ms-auto');
    expect(div).toHaveClass('rounded-br-none');
    expect(div).toHaveClass('bg-[#fadbe1]');
  });

  it('applies receiver styles when senderId does not match currentUserId', () => {
    render(<MessageItem message={baseMessage} currentUserId={3} />);
    const div = screen.getByText('Hello world!');
    expect(div).toHaveClass('me-auto');
    expect(div).toHaveClass('rounded-bl-none');
    expect(div).toHaveClass('bg-slate-100');
  });

  it('adds extra space when addExtraSpace is true', () => {
    render(<MessageItem message={baseMessage} addExtraSpace />);
    const div = screen.getByText('Hello world!');
    expect(div).toHaveClass('mt-4');
  });

  it('does not add extra space when addExtraSpace is false', () => {
    render(<MessageItem message={baseMessage} addExtraSpace={false} />);
    const div = screen.getByText('Hello world!');
    expect(div).not.toHaveClass('mt-4');
  });
});
