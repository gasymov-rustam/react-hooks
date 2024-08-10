import { useCallback, useEffect, useState } from 'react';

export const useSearchParam = (param: string) => {
  const getValue = useCallback(() => new URLSearchParams(window.location.search).get(param), [param]);

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    const onChange = () => {
      setValue(getValue());
    };

    window.addEventListener('popstate', onChange);
    window.addEventListener('pushstate', onChange);
    window.addEventListener('replacestate', onChange);

    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener('pushstate', onChange);
      window.removeEventListener('replacestate', onChange);
    };
  }, [getValue]);

  const setSearchUrl = useCallback(
    (value: string) => {
      const url = new URL(window.location.href);
      url.searchParams.set(param, value);
      window.history.pushState({}, '', url.toString());
    },
    [param]
  );

  return { value, setSearchUrl };
};
