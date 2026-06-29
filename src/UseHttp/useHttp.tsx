import { useState, useCallback } from 'react';

import CachedItem from './CachedItem';

export function purgeStaleCache(currentVersion: string): void {
  const prefix = `${currentVersion}:`;
  Object.keys(sessionStorage)
    .filter(key => key.includes(':') && !key.startsWith(prefix))
    .forEach(key => sessionStorage.removeItem(key));
}

interface RequestConfig {
  url: string;
  method?: string;
  headers?: HeadersInit;
  body?: unknown;
  cacheAge: number;
  cacheVersion?: string;
}

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string[]>([]);
  const [httpStatus, setHttpStatus] = useState<number | null>(null);

  const sendRequest = useCallback(async <T,>(
    requestConfig: RequestConfig,
    applyData: (data: T) => void
  ) => {
    setIsLoading(true);
    setError([]);

    const cacheKey = requestConfig.cacheVersion
      ? `${requestConfig.cacheVersion}:${requestConfig.url}`
      : requestConfig.url;

    const writeToCache = (data: T) => {
      try {
        const cachedData: CachedItem = { data, timestamp: Date.now() + requestConfig.cacheAge };
        sessionStorage.setItem(cacheKey, JSON.stringify(cachedData));
      } catch {
        // Session storage full — continue without caching
      }
    };

    const makeHttpRequest = async () => {
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ?? 'GET',
          headers: requestConfig.headers ?? {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          setHttpStatus(response.status);
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = (await response.json()) as T;
        writeToCache(data);
        applyData(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'There was an issue processing the request.';
        console.error(`Failed to fetch ${requestConfig.url}:`, err);
        setError(prev => [...prev, message]);
      }
    };

    try {
      const cached = sessionStorage.getItem(cacheKey);

      if (cached) {
        const cachedItem = JSON.parse(cached) as CachedItem;
        if (cachedItem.timestamp > Date.now()) {
          applyData(cachedItem.data as T);
        } else {
          sessionStorage.removeItem(cacheKey);
          await makeHttpRequest();
        }
      } else {
        await makeHttpRequest();
      }
    } catch {
      await makeHttpRequest();
    }

    setIsLoading(false);
  }, []);

  return { isLoading, error, httpStatus, sendRequest };
};

export default useHttp;
