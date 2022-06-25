export const cleanObject = (object: Record<string, unknown>): Record<string, unknown> => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    //要注意value=0的情况,0是有效的数字
    if (!value && value !== 0) {
      delete result[key];
    }
  });
  return result;
};

console.log(cleanObject({ name: 'xiaozhiwen', age: 0, parent: undefined }));
