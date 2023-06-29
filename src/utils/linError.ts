/**
 * 获取调用的文件路径、行号、列号
 * @returns {
 *  filePath: string,
 *  lineNumber: number,
 *  columnNumber: number
 * }
 */
export function getCallerFileInfo() {
  const error = new Error();
  const stack = error.stack!.split("\n").slice(2);
  const callerLine = stack[0].replace(/^\s+at\s+/, "");
  const [filePath, lineNumber, columnNumber] =
    callerLine.match(/(.*):(\d+):(\d+)/)!;
  return {
    filePath,
    lineNumber,
    columnNumber,
  };
}
