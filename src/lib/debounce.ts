const debounce = (fn: (...args: unknown[]) => void, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (this: unknown, ...args: unknown[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export default debounce;
