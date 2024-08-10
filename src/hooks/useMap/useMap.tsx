import { useMemo, useReducer } from 'react';

type MapInitialEntries<Key, Value> = Iterable<readonly [Key, Value]> | (() => Iterable<readonly [Key, Value]>);

export const useMap = <Key, Value>(initialEntries?: MapInitialEntries<Key, Value>) => {
  const [version, updateVersion] = useReducer((v) => v + 1, 0);

  const map = useMemo(() => {
    const entries = typeof initialEntries === 'function' ? initialEntries() : initialEntries;
    return new Map(entries);
  }, [initialEntries]);

  const reactMap = useMemo(() => {
    const actualMap = {
      get(key: Key) {
        return map.get(key);
      },
      set(key: Key, value: Value) {
        updateVersion();
        map.set(key, value);
        return actualMap;
      },
      has(key: Key) {
        return map.has(key);
      },
      delete(key: Key) {
        updateVersion();
        return map.delete(key);
      },
      clear() {
        updateVersion();
        return map.clear();
      },
      forEach(cb: (value: Value, key: Key) => void) {
        map.forEach(cb);
      },
      get size() {
        return map.size;
      },
    };

    return actualMap;
  }, [map, version]);

  return reactMap;
};
