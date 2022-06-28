import { useEffect, useRef } from 'react';

// 用来处理一个组件的挂载状态，如果已经卸载，返回false,
export const useMountRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  return mountedRef;
};
