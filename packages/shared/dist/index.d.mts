declare const isClient: boolean;
declare const isDef: <T = any>(val?: T | undefined) => val is T;
declare const assert: (condition: boolean, ...infos: any[]) => void;
declare const isBoolean: (val: any) => val is boolean;
declare const isFunction: <T extends Function>(val: any) => val is T;
declare const isNumber: (val: any) => val is number;
declare const isString: (val: unknown) => val is string;
declare const isObject: (val: any) => val is object;
declare const isWindow: (val: any) => val is Window;
declare const now: () => number;
declare const timestamp: () => number;
declare const clamp: (n: number, min: number, max: number) => number;
declare const noop: () => void;
declare const rand: (min: number, max: number) => number;
declare const isIOS: boolean | "";
declare const hasOwn: <T extends object, K extends keyof T>(val: T, key: K) => key is K;

export { assert, clamp, hasOwn, isBoolean, isClient, isDef, isFunction, isIOS, isNumber, isObject, isString, isWindow, noop, now, rand, timestamp };
