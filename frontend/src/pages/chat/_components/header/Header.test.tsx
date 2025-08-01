import { beforeEach, describe, expect, vi } from 'vitest';
import { it } from 'vitest';

import { fireEvent, render, screen } from '@testing-library/react';

import type { User } from 'models/user';

import Header from './Header';

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

const mockNavigate = vi.fn();

describe('Header', () => {
  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<any>('react-router-dom');
    return {
      ...actual,
      useNavigate: () => mockNavigate
    };
  });

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('calls goHome and disconnects socket when ChevronLeft is clicked', () => {
    const disconnect = vi.fn();
    render(<Header socket={{ disconnect } as any} />);
    fireEvent.click(screen.getByTestId('chevron-left'));
    expect(disconnect).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('calls goHome if currentRecipient is missing', () => {
    mockUserStore.currentRecipient = null;
    render(<Header socket={null} />);
    expect(mockNavigate).toHaveBeenCalledWith('/');
    mockUserStore.currentRecipient = mockUserBob; // restore
  });

  it('calls goHome if currentUser is missing', () => {
    mockUserStore.currentUser = null;
    render(<Header socket={null} />);
    expect(mockNavigate).toHaveBeenCalledWith('/');
    mockUserStore.currentUser = mockUserAlice; // restore
  });

  it('returns null if currentRecipient or currentUser is missing', () => {
    mockUserStore.currentRecipient = null;
    const { container } = render(<Header socket={null} />);
    expect(container.firstChild).toBeNull();
    mockUserStore.currentRecipient = mockUserBob; // restore
  });
});
