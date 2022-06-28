import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export const useMount = (fn: Function) => {
  useEffect(() => {
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
