import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render, screen } from '@testing-library/react';

import type { User } from 'models/user';

import ProfileTab from './ProfileTab';

const mockUser: User = {
  id: 1,
  name: 'John Doe',
  profile: 'https://example.com/avatar.jpg'
};

// Mock useUserStore
const mockUseUserStore = vi.fn();
vi.mock('store/user.store', () => ({
  default: () => mockUseUserStore()
}));

const mockUserStore: {
  currentRecipient: User | null;
} = {
  currentRecipient: mockUser
};

vi.mock('store/user.store', () => ({
  default: () => mockUserStore
}));

describe('ProfileTab', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders placeholder text', () => {
    mockUserStore.currentRecipient = null;
    render(<ProfileTab />);
    expect(screen.getByText('This tab is a placeholder - no improvements are needed.')).toBeInTheDocument();
  });

  it('renders UserCard when currentRecipient exists', () => {
    mockUserStore.currentRecipient = mockUser;
    render(<ProfileTab />);
    expect(screen.getByTestId('user-card')).toHaveTextContent('John Doe');
  });

  it('does not render UserCard when currentRecipient is null', () => {
    mockUserStore.currentRecipient = null;
    render(<ProfileTab />);
    expect(screen.queryByTestId('user-card')).toBeNull();
  });
});
