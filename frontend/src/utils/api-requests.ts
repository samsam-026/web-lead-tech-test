// Generic API request handler with error handling
  export async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {

      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      // Check if response is ok
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

        // Try to parse error response
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          errorMessage = `Something went wrong. Please try again later.`;
        }

        throw new Error(errorMessage);
      }

      // Parse response
      const data = await response.json();
      return data;
    
  }