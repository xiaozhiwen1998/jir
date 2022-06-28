import { useCallback, useState } from 'react';

//多个state版本
export const useUndo1 = <T>(initial: T) => {
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState(initial);
  const [future, setFuture] = useState<T[]>([]);
  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  const undo = useCallback(() => {
    if (!canUndo) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1); //要返回一个新的state
    setPast(newPast);
    setPresent(previous);
    setFuture([present, ...future]);
  }, [canUndo, future, past, present]); //对于一个hooks中有很多依赖，依赖之间相互影响，这种情况应该将state合并在一起。

  const redo = useCallback(() => {
    if (!canRedo) return;
    const next = future[0];
    const newFuture = future.slice(1);
    setPast([...past, present]);
    setPresent(next);
    setFuture(newFuture);
  }, [canRedo, future, past, present]);

  const set = useCallback(
    (newPresent: T) => {
      if (newPresent === present) {
        return;
      }
      setPast([...past, present]);
      setPresent(newPresent);
      setFuture([]);
    },
    [past, present],
  );

  const reset = useCallback((newPresent: T) => {
    setPast([]);
    setFuture([]);
    setPresent(newPresent);
  }, []);

  return [
    { past, present, future },
    { set, reset, undo, redo, canUndo, canRedo },
  ] as const;
};

//一个state版本
export const useUndo2 = <T>(initial: T) => {
  const [state, setState] = useState<{ past: T[]; present: T; future: T[] }>({
    past: [],
    present: initial,
    future: [],
  });
  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  //撤销
  const undo = useCallback(() => {
    setState((preState) => {
      const { past, present, future } = preState;
      if (past.length < 1) return preState;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return { past: newPast, present: previous, future: [present, ...future] };
    });
  }, []);

  //取消撤销
  const redo = useCallback(() => {
    setState((preState) => {
      const { past, present, future } = preState;
      if (future.length < 1) return preState;
      const next = future[0];
      const newFuture = future.slice(1);
      return { past: [...past, present], present: next, future: newFuture };
    });
  }, []);

  //设置新值
  const set = useCallback((newPresent: T) => {
    setState((preState) => {
      const { past, present } = preState;
      if (newPresent === present) {
        return preState;
      }
      return { past: [...past, present], present: newPresent, future: [] };
    });
  }, []);

  //重置
  const reset = useCallback((newPresent: T) => {
    setState(() => {
      return { past: [], present: newPresent, future: [] };
    });
  }, []);

  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};
