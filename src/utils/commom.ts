
/**
 * Prints the provided data to the console.
 * @param {any[]} data - The data to be printed.
 * @return {void} This function does not return anything.
 */
export function print(...data: any[]): void {
    const log = console.log;
    log(...data);
}