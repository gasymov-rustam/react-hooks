import { useEffect, useMemo } from 'react';
import { debounce } from './debounce';
import { useEvent } from '../useEvent/useEvent';

export const useDebounce = <Fn extends (...args: any[]) => any>(fn: Fn, ms: number) => {
  const memoizedFn = useEvent(fn);

  const debouncedFn = useMemo(
    () =>
      debounce((...args: Parameters<Fn>) => {
        memoizedFn(...args);
      }, ms),
    [memoizedFn, ms]
  );

  useEffect(
    () => () => {
      debouncedFn.cancel();
    },
    [debouncedFn]
  );

  return debouncedFn;
};
