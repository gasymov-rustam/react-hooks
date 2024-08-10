import { useEffect, useMemo } from 'react';
import { rafThrottle } from './rafThrottle';
import { useEvent } from '../useEvent/useEvent';

export function useRafThrottle<Fn extends (...args: any[]) => any>(fn: Fn) {
  const memoizedFn = useEvent(fn);

  const throttledFn = useMemo(
    () =>
      rafThrottle((...args: Parameters<Fn>) => {
        memoizedFn(...args);
      }),
    [memoizedFn]
  );

  useEffect(
    () => () => {
      throttledFn.cancel();
    },
    [throttledFn]
  );

  return throttledFn;
}
