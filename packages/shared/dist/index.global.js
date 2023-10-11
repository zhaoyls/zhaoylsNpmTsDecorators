'use strict';
(() => {
  var s = typeof window < 'u',
    r = (o) => typeof o < 'u',
    a = (o, ...t) => {
      o || console.warn(...t);
    },
    n = Object.prototype.toString,
    i = (o) => typeof o == 'boolean',
    c = (o) => typeof o == 'function',
    p = (o) => typeof o == 'number',
    l = (o) => typeof o == 'string',
    d = (o) => n.call(o) === '[object Object]',
    b = (o) => typeof window < 'u' && n.call(o) === '[object Window]',
    x = () => Date.now(),
    y = () => +Date.now(),
    u = (o, t, e) => Math.min(e, Math.max(t, o)),
    w = () => {},
    f = (o, t) => ((o = Math.ceil(o)), (t = Math.floor(t)), Math.floor(Math.random() * (t - o + 1)) + o),
    m = s && window?.navigator?.userAgent && /iP(ad|hone|od)/.test(window.navigator.userAgent),
    g = (o, t) => Object.prototype.hasOwnProperty.call(o, t);
})();
//# sourceMappingURL=index.global.js.map
