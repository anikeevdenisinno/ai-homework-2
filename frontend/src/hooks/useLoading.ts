import { useState, useCallback } from 'react';

export function useLoading(initialState = false) {
  const [loading, setLoading] = useState(initialState);

  const withLoading = useCallback(async <T>(promise: Promise<T>): Promise<T> => {
    try {
      setLoading(true);
      const result = await promise;
      return result;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    setLoading,
    withLoading,
  };
} 