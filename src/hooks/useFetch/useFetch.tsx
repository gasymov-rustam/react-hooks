import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useIsMounted } from '../useIsMounted/useIsMounted';

interface UseFetchConfig<T> {
  url: string;
  method?: AxiosRequestConfig['method'];
  headers?: AxiosRequestConfig['headers'];
  body?: AxiosRequestConfig['data'];
  deps?: React.DependencyList;
  transformResponse?: (data: unknown) => T;
}

interface FetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: AxiosError | null;
}

export const useFetch = <T,>({
  url,
  method = 'GET',
  headers = {},
  body = null,
  deps = [],
  transformResponse = (data: unknown) => data as T,
}: UseFetchConfig<T>) => {
  const [response, setResponse] = useState<FetchResult<T>>();
  const isFetchingRef = useRef(true);
  const isMountedRef = useIsMounted();

  useEffect(() => {
    const fetchData = async () => {
      if (!(isMountedRef.current && isFetchingRef.current)) {
        return;
      }

      const localResponse: FetchResult<T> = { error: null, isLoading: true, data: null };
      isFetchingRef.current = false;

      try {
        const response: AxiosResponse<unknown> = await axios(url, {
          method,
          headers,
          data: body,
          params: method === 'GET' ? body : undefined,
        });
        if (response.data) {
          localResponse.data = transformResponse(response.data);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          console.warn('There are some errors during executing request!', error.response?.data);
          localResponse.error = error;
        }
      } finally {
        isFetchingRef.current = true;
        localResponse.isLoading = false;
        setResponse(localResponse);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return response;
};
