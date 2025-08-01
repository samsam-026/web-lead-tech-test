import { afterEach, describe, expect, vi } from 'vitest';
import { it } from 'vitest';

import { renderHook } from '@testing-library/react';

import { Socket, io } from 'socket.io-client';

import { useSocket } from './useSocket';

vi.mock('socket.io-client', () => {
  const socketMock = {
    disconnect: vi.fn(),
    on: vi.fn(),
    emit: vi.fn()
  };
  return {
    io: vi.fn(() => socketMock)
  };
});

describe('useSocket', () => {
  const url = 'http://localhost:3000';

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create a socket on mount', () => {
    const { result } = renderHook(() => useSocket(url));
    expect(io).toHaveBeenCalledWith(url, { autoConnect: false });
    expect(result.current).not.toBeNull();
  });

  it('should disconnect socket on unmount', () => {
    const { result, unmount } = renderHook(() => useSocket(url));
    const socketInstance = result.current as Socket;
    unmount();
    expect(socketInstance.disconnect).toHaveBeenCalled();
  });

  it('should create a new socket when url changes', () => {
    const { rerender } = renderHook(({ url }) => useSocket(url), {
      initialProps: { url }
    });
    rerender({ url: 'http://localhost:4000' });
    expect(io).toHaveBeenCalledWith('http://localhost:4000', { autoConnect: false });
  });
});
