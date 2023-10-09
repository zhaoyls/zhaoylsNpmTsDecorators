/**
 * Retrieves the file information of the caller.
 * @return {object} An object containing the file path, line number, and column number.
 */
export function getCallerFileInfo() {
  const error = new Error();
  const stack = error.stack!.split('\n').slice(2);
  const callerLine = stack[0].replace(/^\s+at\s+/, '');
  const result = callerLine.match(/(.*):(\d+):(\d+)/)!;
  const [filePathAll, filePath, lineNumber, columnNumber] = result;
  // console.trace('调用栈信息...')
  // See: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match
  // console.log(callerLine.match(/(.*):(\d+):(\d+)/))

  return {
    filePathAll,
    filePath,
    lineNumber,
    columnNumber,
  };
}
