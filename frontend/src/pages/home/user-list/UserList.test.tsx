import { beforeEach, describe, expect, vi } from 'vitest';
import { it } from 'vitest';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import type { User } from 'models/user';

import UserList from './UserList';

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
const mockUserStore = {
  currentUser: mockUserAlice,
  setCurrentRecipient: vi.fn(),
  setCurrentUser: vi.fn()
};

// Mock dependencies
vi.mock('store/user.store', () => ({
  default: () => mockUserStore
}));

const mockUsers = [mockUserAlice, mockUserBob];

function renderWithProviders() {
  const queryClient = new QueryClient();
  vi.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: async () => mockUsers
  } as any);

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe('UserList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders user cards for all users', async () => {
    renderWithProviders();
    await waitFor(() => {
      // There are 4 cards, 1 for switching user and 1 for messaging each user
      expect(screen.getAllByTestId('user-card')).toHaveLength(4);
    });
    expect(screen.getAllByText('Alice')).toHaveLength(2);
    expect(screen.getAllByText('Bob')).toHaveLength(2);
  });

  it('disables "Switch to" and "Message" buttons for current user', async () => {
    renderWithProviders();
    await waitFor(() => {
      expect(screen.getAllByText('Current User')[0]).toBeDisabled();
      expect(screen.getAllByText('Message')[0]).toBeDisabled();
    });
  });

  it('calls setCurrentUser when switching user', async () => {
    renderWithProviders();
    await waitFor(() => {
      const switchBtn = screen.getAllByText('Switch to')[0];
      fireEvent.click(switchBtn);
    });
    expect(mockUserStore.setCurrentUser).toHaveBeenCalledWith(mockUsers[1]);
    expect(mockUserStore.setCurrentRecipient).toHaveBeenCalledWith(null);
  });

  it('calls setCurrentRecipient and navigates when messaging user', async () => {
    renderWithProviders();
    await waitFor(() => {
      const messageBtn = screen.getAllByText('Message')[1];
      fireEvent.click(messageBtn);
    });
    expect(mockUserStore.setCurrentRecipient).toHaveBeenCalledWith(mockUsers[1]);
  });
});
