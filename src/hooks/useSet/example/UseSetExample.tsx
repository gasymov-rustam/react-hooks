import { useState } from 'react';
import { useSet } from '../useSet';

export const UseSetExample = () => {
  const set = useSet(() => ['b', 'd']);

  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const setItems: JSX.Element[] = [];

  set.forEach((item) => setItems.push(<div key={item}>{item}</div>));

  console.log('🚀 => 👍 ==>> UseSetExample ==>> Line #14 ==>> ', setItems);

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
          setKey('');
          setValue('');
        }}
      >
        Add
      </button>

      <h4>Set</h4>
      {setItems}
    </div>
  );
};
