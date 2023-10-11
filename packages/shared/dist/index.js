'use strict';
var s = Object.defineProperty;
var c = Object.getOwnPropertyDescriptor;
var p = Object.getOwnPropertyNames;
var l = Object.prototype.hasOwnProperty;
var d = (o, t) => {
    for (var n in t) s(o, n, { get: t[n], enumerable: !0 });
  },
  b = (o, t, n, r) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let e of p(t))
        !l.call(o, e) && e !== n && s(o, e, { get: () => t[e], enumerable: !(r = c(t, e)) || r.enumerable });
    return o;
  };
var x = (o) => b(s({}, '__esModule', { value: !0 }), o);
var K = {};
d(K, {
  assert: () => u,
  clamp: () => O,
  hasOwn: () => D,
  isBoolean: () => w,
  isClient: () => a,
  isDef: () => y,
  isFunction: () => f,
  isIOS: () => k,
  isNumber: () => m,
  isObject: () => h,
  isString: () => g,
  isWindow: () => v,
  noop: () => M,
  now: () => j,
  rand: () => S,
  timestamp: () => T,
});
module.exports = x(K);
var a = typeof window < 'u',
  y = (o) => typeof o < 'u',
  u = (o, ...t) => {
    o || console.warn(...t);
  },
  i = Object.prototype.toString,
  w = (o) => typeof o == 'boolean',
  f = (o) => typeof o == 'function',
  m = (o) => typeof o == 'number',
  g = (o) => typeof o == 'string',
  h = (o) => i.call(o) === '[object Object]',
  v = (o) => typeof window < 'u' && i.call(o) === '[object Window]',
  j = () => Date.now(),
  T = () => +Date.now(),
  O = (o, t, n) => Math.min(n, Math.max(t, o)),
  M = () => {},
  S = (o, t) => ((o = Math.ceil(o)), (t = Math.floor(t)), Math.floor(Math.random() * (t - o + 1)) + o),
  k = a && window?.navigator?.userAgent && /iP(ad|hone|od)/.test(window.navigator.userAgent),
  D = (o, t) => Object.prototype.hasOwnProperty.call(o, t);
0 &&
  (module.exports = {
    assert,
    clamp,
    hasOwn,
    isBoolean,
    isClient,
    isDef,
    isFunction,
    isIOS,
    isNumber,
    isObject,
    isString,
    isWindow,
    noop,
    now,
    rand,
    timestamp,
  });
//# sourceMappingURL=index.js.map
