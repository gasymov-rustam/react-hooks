import { useCallback, useState } from 'react';
import { useIsMounted } from '../useIsMounted/useIsMounted';

/** can not send request when component unmounted */
export const useSafeState = <S,>(initialValue: (() => S) | S) => {
  const [value, setValue] = useState(initialValue);

  const isMounted = useIsMounted();

  const setState = useCallback(
    (newValue: React.SetStateAction<S>) => {
      if (!isMounted.current) {
        return;
      }
      setValue(newValue);
    },
    [isMounted]
  );

  return [value, setState] as const;
};
