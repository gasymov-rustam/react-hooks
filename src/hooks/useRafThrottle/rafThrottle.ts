export const rafThrottle = <T extends (...args: any[]) => any>(fn: T) => {
  let rafId: number | null = null;

  function throttled(...args: Parameters<T>) {
    if (typeof rafId === 'number') {
      console.log('cancel');
      return;
    }

    rafId = requestAnimationFrame(() => {
      fn(...args);
      rafId = null;
    });
  }

  throttled.cancel = () => {
    if (typeof rafId !== 'number') {
      return;
    }
    cancelAnimationFrame(rafId);
  };

  return throttled;
};
