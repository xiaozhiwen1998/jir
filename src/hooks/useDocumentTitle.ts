import { useEffect, useRef } from 'react';

//需要所有页面都使用 useDocumentTitle,否则更换页面时title不会改变,闭包实现
/**
 * @param title  表示传入的title值
 * @param keepOnUnmount 是否卸载组件的时候保留
 */
export const useDocumentTitle1 = (title: string, keepOnUnmount = true) => {
  const oldTitle = document.title;

  useEffect(() => {
    document.title = title;
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle, title]);
};

//useRef实现
export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  // const oldTitle = useRef(document.title);
  // //tip:old是基本类型string，不会引起循环渲染
  // const old = oldTitle.current;

  //上面两行也可以写成如下形式：
  const old = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
    return () => {
      if (!keepOnUnmount) {
        document.title = old;
      }
    };
  }, [keepOnUnmount, title, old]);
};
