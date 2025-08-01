import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import type { User } from 'models/user';

import Chat from './Chat';

// Mock dependencies

const mockUserAlice: User = {
  id: 1,
  name: 'Alice',
  profile: 'https://example.com/alice.jpg'
};
const mockUserBob: User = {
  id: 2,
  name: 'Bob',
  profile: 'https://example.com/bob.jpg'
};

// Mock useUserStore
const mockUserStore: {
  currentUser: User | null;
  currentRecipient: User | null;
} = {
  currentUser: mockUserAlice,
  currentRecipient: mockUserBob
};

vi.mock('store/user.store', () => ({
  default: () => mockUserStore
}));

const ChatWithRouter = () => (
  <BrowserRouter>
    <Chat />
  </BrowserRouter>
);

describe('Chat', () => {
  it('renders header and tabs', () => {
    render(<ChatWithRouter />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('tabs')).toBeInTheDocument();
  });

  it('shows ChatTab by default', () => {
    render(<ChatWithRouter />);
    expect(screen.getByTestId('chat-tab')).toBeInTheDocument();
    expect(screen.queryByTestId('profile-tab')).not.toBeInTheDocument();
  });
});
