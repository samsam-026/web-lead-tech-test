import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { render, screen } from '@testing-library/react';

import MessageDivider from './MessageDivider';

describe('MessageDivider', () => {
  const fixedDate = new Date('2023-06-01T14:30:00Z');
  const fixedDateString = fixedDate.toISOString();

  beforeAll(() => {
    // Mock Date to control "today"
    vi.useFakeTimers();
    vi.setSystemTime(fixedDate);
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('renders "Today" when timestamp is today', () => {
    render(<MessageDivider timestamp={fixedDateString} />);
    expect(
      screen.getByText(content => {
        return content.trim().startsWith('Today');
      })
    ).toBeInTheDocument();
  });

  it('renders formatted date when timestamp is not today', () => {
    const anotherDate = new Date('2023-05-31T09:15:00Z');
    render(<MessageDivider timestamp={anotherDate.toISOString()} />);
    // Format: "1 Jun 2023 09:15" (since fixedDate is 1 Jun 2023)
    expect(
      screen.getByText(content => {
        return content.trim().startsWith('31 May 2023');
      })
    ).toBeInTheDocument();
  });
});
