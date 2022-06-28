import { useCallback } from 'react';
import { useMountRef } from './useMountedRef';

const useSafeDispatch = <T>(dispatch: (...arg: T[]) => void) => {
  const mountedRef = useMountRef();

  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef],
  );
};

export default useSafeDispatch;
