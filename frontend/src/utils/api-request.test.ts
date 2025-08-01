import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { apiRequest } from './api-request';

const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch);
});

afterEach(() => {
  vi.unstubAllGlobals();
  mockFetch.mockReset();
});

describe('apiRequest', () => {
  it('should return parsed data when response is ok', async () => {
    const mockData = { success: true };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: vi.fn().mockResolvedValueOnce(mockData)
    } as any);

    const result = await apiRequest<typeof mockData>('https://api.test/success');
    expect(result).toEqual(mockData);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.test/success',
      expect.objectContaining({
        headers: expect.objectContaining({ 'Content-Type': 'application/json' })
      })
    );
  });

  it('should throw error with message from error response (message field)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      json: vi.fn().mockResolvedValueOnce({ message: 'Invalid input' })
    } as any);

    await expect(apiRequest('https://api.test/error')).rejects.toThrow('Invalid input');
  });

  it('should throw error with message from error response (error field)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
      json: vi.fn().mockResolvedValueOnce({ error: 'Not authorized' })
    } as any);

    await expect(apiRequest('https://api.test/unauthorized')).rejects.toThrow('Not authorized');
  });

  it('should throw generic error message if error response cannot be parsed', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: vi.fn().mockRejectedValueOnce(new Error('Parse error'))
    } as any);

    await expect(apiRequest('https://api.test/server-error')).rejects.toThrow(
      'Something went wrong. Please try again later.'
    );
  });

  it('should merge custom headers with default Content-Type', async () => {
    const mockData = { ok: true };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: vi.fn().mockResolvedValueOnce(mockData)
    } as any);

    await apiRequest('https://api.test/headers', {
      headers: { Authorization: 'Bearer token' }
    });

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.test/headers',
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          Authorization: 'Bearer token'
        })
      })
    );
  });
});
