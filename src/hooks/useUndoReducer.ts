//useReducer和useState可以相互替换。当有多个state相互依赖的时候，可以使用useReducer。
import { useCallback, useReducer } from 'react';

type State<T> = {
  past: T[];
  present: T;
  future: T[];
};

//1.定义action
const UNDO = 'UNDO';
const REDO = 'REDO';
const SET = 'SET';
const RESET = 'RESET';

//action,有一个新的state,和要执行的动作。
type Action<T> = { newPresent?: T; type: typeof UNDO | typeof REDO | typeof SET | typeof RESET };

//2.定义reducer函数， 接收preState,根据action处理，返回新的state
const undoReducer = <T>(preState: State<T>, action: Action<T>) => {
  const { past, present, future } = preState;
  const { newPresent, type } = action; //action表示新传入的值和要执行的动作

  switch (type) {
    case UNDO: {
      if (past.length < 1) return preState;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return { past: newPast, present: previous, future: [present, ...future] };
    }
    case REDO: {
      const { past, present, future } = preState;
      if (past.length < 1) return preState;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return { past: newPast, present: previous, future: [present, ...future] };
    }
    case SET: {
      const { past, present, future } = preState;
      if (future.length < 1) return preState;
      const next = future[0];
      const newFuture = future.slice(1);
      return { past: [...past, present], present: next, future: newFuture };
    }
    case RESET: {
      return { past: [], present: newPresent, future: [] };
    }
  }
  return preState;
};

export const useUndo = <T>(initialPresent: T) => {
  //1. 使用useReducer,useReducer接收两个参数，一个是Reducer处理函数（每次运行都会传入preState,action）,一个是状态初始值，
  //返回state,和发送action的dispatch
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>);

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  //想要进行相应操作的时候，就使用dispatch,发送一个action（包含数据和类型）
  const undo = useCallback(() => dispatch({ type: UNDO }), []);

  const redo = useCallback(() => dispatch({ type: REDO }), []);

  const set = useCallback((newPresent: T) => dispatch({ type: SET, newPresent }), []);

  const reset = useCallback((newPresent: T) => dispatch({ type: RESET, newPresent }), []);

  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};
