import { useEffect, useState } from 'react';
//防抖函数
export const useDebounce = <V>(value: V, delay = 200) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const Time = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(Time);
    };
  }, [value, delay]);
  return debounceValue;
};
