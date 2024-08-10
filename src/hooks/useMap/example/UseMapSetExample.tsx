import { useState } from 'react';
import { useSet } from '../../useSet/useSet';
import { useMap } from '../useMap';

export const UseMapSetExample = () => {
  const set = useSet(() => ['b', 'd']);
  const map = useMap(() => [
    ['a', 'b'],
    ['c', 'd'],
  ]);

  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const setItems: JSX.Element[] = [];
  const mapItems: JSX.Element[] = [];

  set.forEach((item) => setItems.push(<div key={item}>{item}</div>));
  map.forEach((item, key) =>
    mapItems.push(
      <div key={key}>
        {key}:{item}
      </div>
    )
  );

  return (
    <div>
      <h4>Key</h4>
      <input type='text' value={key} onChange={(e) => setKey(e.target.value)} />
      <h4>Value</h4>
      <input type='text' value={value} onChange={(e) => setValue(e.target.value)} />
      <br />
      <button
        onClick={() => {
          set.add(value);
          map.set(key, value);
          setKey('');
          setValue('');
        }}
      >
        Add
      </button>

      <h4>Set</h4>
      {setItems}
      <h4>Map</h4>
      {mapItems}
    </div>
  );
};
