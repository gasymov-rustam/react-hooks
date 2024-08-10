import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebounce } from '../useDebounce';

const sleep = (ms: number) => {
  return new Promise<void>((res) => {
    setTimeout(() => res(), ms);
  });
};

const storageAPI = {
  async save(text: string) {
    console.log('[save request]', text);
    await sleep(500);
    localStorage.setItem('saved-text', text);
  },

  async read() {
    await sleep(500);
    return localStorage.getItem('saved-text') || '';
  },
};

export const SaveableTextInput = () => {
  const [text, setText] = useState('');
  const isTextEdited = useRef(false);

  const debouncedFn = useDebounce(
    useCallback((value: string) => storageAPI.save(value), []),
    1000
  );

  const handleUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    isTextEdited.current = true;
    setText(e.target.value);
    debouncedFn(e.target.value);
  };

  useEffect(() => {
    storageAPI.read().then((text) => {
      if (isTextEdited.current) {
        return;
      }
      setText(text);
    });
  }, []);

  return (
    <div>
      <textarea value={text} onChange={handleUpdate} rows={30} cols={80} />
    </div>
  );
};
