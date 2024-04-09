// 2023...
console.log(
  '%c [  [lodash]:(https://www.lodashjs.com/) ]-2',
  'font-size:13px; background:#0567f5; color:#49abff;',
  '常用工具： cloneDeep、throttle、debounce、_.merge(object, [sources])、_.uniqueId、 _.orderBy（集合分类中）',
  '命名风格 _.snakeCase、_.camelCase、const pascalCase = (string) => _.upperFirst(_.camelCase(string)); _.kebabCase、Ctrl+Shift+u/i VSCODE',
);

function uDebounce<T extends Function>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout;
  return function (this: ThisParameterType<T> | unknown, ...args: any[]) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  } as unknown as T;
}

function uThrottle<T extends Function>(func: T, wait: number): T {
  let lastExec = 0;
  let timer: NodeJS.Timeout;
  return function (this: ThisParameterType<T> | unknown, ...args: any[]) {
    const now = Date.now();

    if (now - lastExec >= wait) {
      func.apply(this, args);
      lastExec = now;
    } else if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(
      () => {
        func.apply(this, args);
        lastExec = Date.now();
      },
      wait - (now - lastExec),
    );
  } as unknown as T;
}
