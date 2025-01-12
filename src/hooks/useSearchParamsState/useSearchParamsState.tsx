import { useState } from 'react';
import { getSearchParam } from './getSearchParam';
import { useEvent } from '../useEvent/useEvent';
import { isFunction } from '../useStorage/utils';
import { setSearchParam } from './setSearchParam';

const defaultDeserialize = <Value,>(v: string | null) => v as Value;
const defaultSerialize = String;

interface UseSearchParamsStateOptions<Value> {
  name: string;
  serialize?: (value: Value) => string;
  deserialize?: (value: string | null) => Value;
}

export const useSearchParamsState = <Value,>({
  name,
  serialize = defaultSerialize,
  deserialize = defaultDeserialize,
}: UseSearchParamsStateOptions<Value>) => {
  const [value, setValue] = useState(() => {
    const initialValue = deserialize(getSearchParam(location.search, name));

    return initialValue;
  });

  const updateValue = useEvent((newValue: React.SetStateAction<Value>) => {
    const search = window.location.search;
    const actualNewValue = isFunction(newValue) ? newValue(value) : newValue;

    setValue(actualNewValue);

    const newSearch = setSearchParam(search, name, serialize(actualNewValue));

    history.pushState(null, '', `?${newSearch}`);
  });

  return [value, updateValue] as const;
};
