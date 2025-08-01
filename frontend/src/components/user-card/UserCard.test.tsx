import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import type { User } from 'models/user';

import UserCard from './UserCard';

const mockUser: User = {
  id: 1,
  name: 'Jane Doe',
  profile: 'https://example.com/jane.jpg'
};

describe('UserCard', () => {
  it('renders user name', () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('renders user profile image with correct src and alt', () => {
    render(<UserCard user={mockUser} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockUser.profile);
    expect(img).toHaveAttribute('alt', mockUser.name);
  });

  it('has correct image classes', () => {
    render(<UserCard user={mockUser} />);
    const img = screen.getByRole('img');
    expect(img).toHaveClass('h-auto', 'w-10', 'rounded-full');
  });

  it('renders container with flex classes', () => {
    render(<UserCard user={mockUser} />);
    const img = screen.getByRole('img');
    const container = img.closest('div');
    expect(container).toHaveClass('flex', 'items-center', 'justify-center', 'gap-2.5');
  });
});
