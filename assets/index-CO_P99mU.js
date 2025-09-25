function R0(a, o) {
  for (var u = 0; u < o.length; u++) {
    const c = o[u];
    if (typeof c != "string" && !Array.isArray(c)) {
      for (const s in c)
        if (s !== "default" && !(s in a)) {
          const d = Object.getOwnPropertyDescriptor(c, s);
          d &&
            Object.defineProperty(
              a,
              s,
              d.get ? d : { enumerable: !0, get: () => c[s] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(a, Symbol.toStringTag, { value: "Module" })
  );
}
(function () {
  const o = document.createElement("link").relList;
  if (o && o.supports && o.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) c(s);
  new MutationObserver((s) => {
    for (const d of s)
      if (d.type === "childList")
        for (const m of d.addedNodes)
          m.tagName === "LINK" && m.rel === "modulepreload" && c(m);
  }).observe(document, { childList: !0, subtree: !0 });
  function u(s) {
    const d = {};
    return (
      s.integrity && (d.integrity = s.integrity),
      s.referrerPolicy && (d.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (d.credentials = "include")
        : s.crossOrigin === "anonymous"
        ? (d.credentials = "omit")
        : (d.credentials = "same-origin"),
      d
    );
  }
  function c(s) {
    if (s.ep) return;
    s.ep = !0;
    const d = u(s);
    fetch(s.href, d);
  }
})();
function pv(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default")
    ? a.default
    : a;
}
var Uu = { exports: {} },
  xi = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var xh;
function C0() {
  if (xh) return xi;
  xh = 1;
  var a = Symbol.for("react.transitional.element"),
    o = Symbol.for("react.fragment");
  function u(c, s, d) {
    var m = null;
    if (
      (d !== void 0 && (m = "" + d),
      s.key !== void 0 && (m = "" + s.key),
      "key" in s)
    ) {
      d = {};
      for (var h in s) h !== "key" && (d[h] = s[h]);
    } else d = s;
    return (
      (s = d.ref),
      { $$typeof: a, type: c, key: m, ref: s !== void 0 ? s : null, props: d }
    );
  }
  return (xi.Fragment = o), (xi.jsx = u), (xi.jsxs = u), xi;
}
var wh;
function O0() {
  return wh || ((wh = 1), (Uu.exports = C0())), Uu.exports;
}
var w = O0(),
  Hu = { exports: {} },
  ye = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Eh;
function M0() {
  if (Eh) return ye;
  Eh = 1;
  var a = Symbol.for("react.transitional.element"),
    o = Symbol.for("react.portal"),
    u = Symbol.for("react.fragment"),
    c = Symbol.for("react.strict_mode"),
    s = Symbol.for("react.profiler"),
    d = Symbol.for("react.consumer"),
    m = Symbol.for("react.context"),
    h = Symbol.for("react.forward_ref"),
    g = Symbol.for("react.suspense"),
    v = Symbol.for("react.memo"),
    y = Symbol.for("react.lazy"),
    S = Symbol.iterator;
  function T(A) {
    return A === null || typeof A != "object"
      ? null
      : ((A = (S && A[S]) || A["@@iterator"]),
        typeof A == "function" ? A : null);
  }
  var C = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    D = Object.assign,
    E = {};
  function _(A, Q, F) {
    (this.props = A),
      (this.context = Q),
      (this.refs = E),
      (this.updater = F || C);
  }
  (_.prototype.isReactComponent = {}),
    (_.prototype.setState = function (A, Q) {
      if (typeof A != "object" && typeof A != "function" && A != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, A, Q, "setState");
    }),
    (_.prototype.forceUpdate = function (A) {
      this.updater.enqueueForceUpdate(this, A, "forceUpdate");
    });
  function L() {}
  L.prototype = _.prototype;
  function H(A, Q, F) {
    (this.props = A),
      (this.context = Q),
      (this.refs = E),
      (this.updater = F || C);
  }
  var Y = (H.prototype = new L());
  (Y.constructor = H), D(Y, _.prototype), (Y.isPureReactComponent = !0);
  var K = Array.isArray,
    q = { H: null, A: null, T: null, S: null, V: null },
    $ = Object.prototype.hasOwnProperty;
  function X(A, Q, F, W, ee, pe) {
    return (
      (F = pe.ref),
      { $$typeof: a, type: A, key: Q, ref: F !== void 0 ? F : null, props: pe }
    );
  }
  function J(A, Q) {
    return X(A.type, Q, void 0, void 0, void 0, A.props);
  }
  function te(A) {
    return typeof A == "object" && A !== null && A.$$typeof === a;
  }
  function oe(A) {
    var Q = { "=": "=0", ":": "=2" };
    return (
      "$" +
      A.replace(/[=:]/g, function (F) {
        return Q[F];
      })
    );
  }
  var ge = /\/+/g;
  function me(A, Q) {
    return typeof A == "object" && A !== null && A.key != null
      ? oe("" + A.key)
      : Q.toString(36);
  }
  function P() {}
  function ne(A) {
    switch (A.status) {
      case "fulfilled":
        return A.value;
      case "rejected":
        throw A.reason;
      default:
        switch (
          (typeof A.status == "string"
            ? A.then(P, P)
            : ((A.status = "pending"),
              A.then(
                function (Q) {
                  A.status === "pending" &&
                    ((A.status = "fulfilled"), (A.value = Q));
                },
                function (Q) {
                  A.status === "pending" &&
                    ((A.status = "rejected"), (A.reason = Q));
                }
              )),
          A.status)
        ) {
          case "fulfilled":
            return A.value;
          case "rejected":
            throw A.reason;
        }
    }
    throw A;
  }
  function re(A, Q, F, W, ee) {
    var pe = typeof A;
    (pe === "undefined" || pe === "boolean") && (A = null);
    var se = !1;
    if (A === null) se = !0;
    else
      switch (pe) {
        case "bigint":
        case "string":
        case "number":
          se = !0;
          break;
        case "object":
          switch (A.$$typeof) {
            case a:
            case o:
              se = !0;
              break;
            case y:
              return (se = A._init), re(se(A._payload), Q, F, W, ee);
          }
      }
    if (se)
      return (
        (ee = ee(A)),
        (se = W === "" ? "." + me(A, 0) : W),
        K(ee)
          ? ((F = ""),
            se != null && (F = se.replace(ge, "$&/") + "/"),
            re(ee, Q, F, "", function (Ne) {
              return Ne;
            }))
          : ee != null &&
            (te(ee) &&
              (ee = J(
                ee,
                F +
                  (ee.key == null || (A && A.key === ee.key)
                    ? ""
                    : ("" + ee.key).replace(ge, "$&/") + "/") +
                  se
              )),
            Q.push(ee)),
        1
      );
    se = 0;
    var I = W === "" ? "." : W + ":";
    if (K(A))
      for (var fe = 0; fe < A.length; fe++)
        (W = A[fe]), (pe = I + me(W, fe)), (se += re(W, Q, F, pe, ee));
    else if (((fe = T(A)), typeof fe == "function"))
      for (A = fe.call(A), fe = 0; !(W = A.next()).done; )
        (W = W.value), (pe = I + me(W, fe++)), (se += re(W, Q, F, pe, ee));
    else if (pe === "object") {
      if (typeof A.then == "function") return re(ne(A), Q, F, W, ee);
      throw (
        ((Q = String(A)),
        Error(
          "Objects are not valid as a React child (found: " +
            (Q === "[object Object]"
              ? "object with keys {" + Object.keys(A).join(", ") + "}"
              : Q) +
            "). If you meant to render a collection of children, use an array instead."
        ))
      );
    }
    return se;
  }
  function O(A, Q, F) {
    if (A == null) return A;
    var W = [],
      ee = 0;
    return (
      re(A, W, "", "", function (pe) {
        return Q.call(F, pe, ee++);
      }),
      W
    );
  }
  function k(A) {
    if (A._status === -1) {
      var Q = A._result;
      (Q = Q()),
        Q.then(
          function (F) {
            (A._status === 0 || A._status === -1) &&
              ((A._status = 1), (A._result = F));
          },
          function (F) {
            (A._status === 0 || A._status === -1) &&
              ((A._status = 2), (A._result = F));
          }
        ),
        A._status === -1 && ((A._status = 0), (A._result = Q));
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var B =
    typeof reportError == "function"
      ? reportError
      : function (A) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var Q = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof A == "object" &&
                A !== null &&
                typeof A.message == "string"
                  ? String(A.message)
                  : String(A),
              error: A,
            });
            if (!window.dispatchEvent(Q)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", A);
            return;
          }
          console.error(A);
        };
  function ue() {}
  return (
    (ye.Children = {
      map: O,
      forEach: function (A, Q, F) {
        O(
          A,
          function () {
            Q.apply(this, arguments);
          },
          F
        );
      },
      count: function (A) {
        var Q = 0;
        return (
          O(A, function () {
            Q++;
          }),
          Q
        );
      },
      toArray: function (A) {
        return (
          O(A, function (Q) {
            return Q;
          }) || []
        );
      },
      only: function (A) {
        if (!te(A))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return A;
      },
    }),
    (ye.Component = _),
    (ye.Fragment = u),
    (ye.Profiler = s),
    (ye.PureComponent = H),
    (ye.StrictMode = c),
    (ye.Suspense = g),
    (ye.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = q),
    (ye.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (A) {
        return q.H.useMemoCache(A);
      },
    }),
    (ye.cache = function (A) {
      return function () {
        return A.apply(null, arguments);
      };
    }),
    (ye.cloneElement = function (A, Q, F) {
      if (A == null)
        throw Error(
          "The argument must be a React element, but you passed " + A + "."
        );
      var W = D({}, A.props),
        ee = A.key,
        pe = void 0;
      if (Q != null)
        for (se in (Q.ref !== void 0 && (pe = void 0),
        Q.key !== void 0 && (ee = "" + Q.key),
        Q))
          !$.call(Q, se) ||
            se === "key" ||
            se === "__self" ||
            se === "__source" ||
            (se === "ref" && Q.ref === void 0) ||
            (W[se] = Q[se]);
      var se = arguments.length - 2;
      if (se === 1) W.children = F;
      else if (1 < se) {
        for (var I = Array(se), fe = 0; fe < se; fe++)
          I[fe] = arguments[fe + 2];
        W.children = I;
      }
      return X(A.type, ee, void 0, void 0, pe, W);
    }),
    (ye.createContext = function (A) {
      return (
        (A = {
          $$typeof: m,
          _currentValue: A,
          _currentValue2: A,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (A.Provider = A),
        (A.Consumer = { $$typeof: d, _context: A }),
        A
      );
    }),
    (ye.createElement = function (A, Q, F) {
      var W,
        ee = {},
        pe = null;
      if (Q != null)
        for (W in (Q.key !== void 0 && (pe = "" + Q.key), Q))
          $.call(Q, W) &&
            W !== "key" &&
            W !== "__self" &&
            W !== "__source" &&
            (ee[W] = Q[W]);
      var se = arguments.length - 2;
      if (se === 1) ee.children = F;
      else if (1 < se) {
        for (var I = Array(se), fe = 0; fe < se; fe++)
          I[fe] = arguments[fe + 2];
        ee.children = I;
      }
      if (A && A.defaultProps)
        for (W in ((se = A.defaultProps), se))
          ee[W] === void 0 && (ee[W] = se[W]);
      return X(A, pe, void 0, void 0, null, ee);
    }),
    (ye.createRef = function () {
      return { current: null };
    }),
    (ye.forwardRef = function (A) {
      return { $$typeof: h, render: A };
    }),
    (ye.isValidElement = te),
    (ye.lazy = function (A) {
      return { $$typeof: y, _payload: { _status: -1, _result: A }, _init: k };
    }),
    (ye.memo = function (A, Q) {
      return { $$typeof: v, type: A, compare: Q === void 0 ? null : Q };
    }),
    (ye.startTransition = function (A) {
      var Q = q.T,
        F = {};
      q.T = F;
      try {
        var W = A(),
          ee = q.S;
        ee !== null && ee(F, W),
          typeof W == "object" &&
            W !== null &&
            typeof W.then == "function" &&
            W.then(ue, B);
      } catch (pe) {
        B(pe);
      } finally {
        q.T = Q;
      }
    }),
    (ye.unstable_useCacheRefresh = function () {
      return q.H.useCacheRefresh();
    }),
    (ye.use = function (A) {
      return q.H.use(A);
    }),
    (ye.useActionState = function (A, Q, F) {
      return q.H.useActionState(A, Q, F);
    }),
    (ye.useCallback = function (A, Q) {
      return q.H.useCallback(A, Q);
    }),
    (ye.useContext = function (A) {
      return q.H.useContext(A);
    }),
    (ye.useDebugValue = function () {}),
    (ye.useDeferredValue = function (A, Q) {
      return q.H.useDeferredValue(A, Q);
    }),
    (ye.useEffect = function (A, Q, F) {
      var W = q.H;
      if (typeof F == "function")
        throw Error(
          "useEffect CRUD overload is not enabled in this build of React."
        );
      return W.useEffect(A, Q);
    }),
    (ye.useId = function () {
      return q.H.useId();
    }),
    (ye.useImperativeHandle = function (A, Q, F) {
      return q.H.useImperativeHandle(A, Q, F);
    }),
    (ye.useInsertionEffect = function (A, Q) {
      return q.H.useInsertionEffect(A, Q);
    }),
    (ye.useLayoutEffect = function (A, Q) {
      return q.H.useLayoutEffect(A, Q);
    }),
    (ye.useMemo = function (A, Q) {
      return q.H.useMemo(A, Q);
    }),
    (ye.useOptimistic = function (A, Q) {
      return q.H.useOptimistic(A, Q);
    }),
    (ye.useReducer = function (A, Q, F) {
      return q.H.useReducer(A, Q, F);
    }),
    (ye.useRef = function (A) {
      return q.H.useRef(A);
    }),
    (ye.useState = function (A) {
      return q.H.useState(A);
    }),
    (ye.useSyncExternalStore = function (A, Q, F) {
      return q.H.useSyncExternalStore(A, Q, F);
    }),
    (ye.useTransition = function () {
      return q.H.useTransition();
    }),
    (ye.version = "19.1.1"),
    ye
  );
}
var Ah;
function hs() {
  return Ah || ((Ah = 1), (Hu.exports = M0())), Hu.exports;
}
var b = hs();
const Wn = pv(b),
  yv = R0({ __proto__: null, default: Wn }, [b]);
var Lu = { exports: {} },
  wi = {},
  Bu = { exports: {} },
  Yu = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Th;
function N0() {
  return (
    Th ||
      ((Th = 1),
      (function (a) {
        function o(O, k) {
          var B = O.length;
          O.push(k);
          e: for (; 0 < B; ) {
            var ue = (B - 1) >>> 1,
              A = O[ue];
            if (0 < s(A, k)) (O[ue] = k), (O[B] = A), (B = ue);
            else break e;
          }
        }
        function u(O) {
          return O.length === 0 ? null : O[0];
        }
        function c(O) {
          if (O.length === 0) return null;
          var k = O[0],
            B = O.pop();
          if (B !== k) {
            O[0] = B;
            e: for (var ue = 0, A = O.length, Q = A >>> 1; ue < Q; ) {
              var F = 2 * (ue + 1) - 1,
                W = O[F],
                ee = F + 1,
                pe = O[ee];
              if (0 > s(W, B))
                ee < A && 0 > s(pe, W)
                  ? ((O[ue] = pe), (O[ee] = B), (ue = ee))
                  : ((O[ue] = W), (O[F] = B), (ue = F));
              else if (ee < A && 0 > s(pe, B))
                (O[ue] = pe), (O[ee] = B), (ue = ee);
              else break e;
            }
          }
          return k;
        }
        function s(O, k) {
          var B = O.sortIndex - k.sortIndex;
          return B !== 0 ? B : O.id - k.id;
        }
        if (
          ((a.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var d = performance;
          a.unstable_now = function () {
            return d.now();
          };
        } else {
          var m = Date,
            h = m.now();
          a.unstable_now = function () {
            return m.now() - h;
          };
        }
        var g = [],
          v = [],
          y = 1,
          S = null,
          T = 3,
          C = !1,
          D = !1,
          E = !1,
          _ = !1,
          L = typeof setTimeout == "function" ? setTimeout : null,
          H = typeof clearTimeout == "function" ? clearTimeout : null,
          Y = typeof setImmediate < "u" ? setImmediate : null;
        function K(O) {
          for (var k = u(v); k !== null; ) {
            if (k.callback === null) c(v);
            else if (k.startTime <= O)
              c(v), (k.sortIndex = k.expirationTime), o(g, k);
            else break;
            k = u(v);
          }
        }
        function q(O) {
          if (((E = !1), K(O), !D))
            if (u(g) !== null) (D = !0), $ || (($ = !0), me());
            else {
              var k = u(v);
              k !== null && re(q, k.startTime - O);
            }
        }
        var $ = !1,
          X = -1,
          J = 5,
          te = -1;
        function oe() {
          return _ ? !0 : !(a.unstable_now() - te < J);
        }
        function ge() {
          if (((_ = !1), $)) {
            var O = a.unstable_now();
            te = O;
            var k = !0;
            try {
              e: {
                (D = !1), E && ((E = !1), H(X), (X = -1)), (C = !0);
                var B = T;
                try {
                  t: {
                    for (
                      K(O), S = u(g);
                      S !== null && !(S.expirationTime > O && oe());

                    ) {
                      var ue = S.callback;
                      if (typeof ue == "function") {
                        (S.callback = null), (T = S.priorityLevel);
                        var A = ue(S.expirationTime <= O);
                        if (((O = a.unstable_now()), typeof A == "function")) {
                          (S.callback = A), K(O), (k = !0);
                          break t;
                        }
                        S === u(g) && c(g), K(O);
                      } else c(g);
                      S = u(g);
                    }
                    if (S !== null) k = !0;
                    else {
                      var Q = u(v);
                      Q !== null && re(q, Q.startTime - O), (k = !1);
                    }
                  }
                  break e;
                } finally {
                  (S = null), (T = B), (C = !1);
                }
                k = void 0;
              }
            } finally {
              k ? me() : ($ = !1);
            }
          }
        }
        var me;
        if (typeof Y == "function")
          me = function () {
            Y(ge);
          };
        else if (typeof MessageChannel < "u") {
          var P = new MessageChannel(),
            ne = P.port2;
          (P.port1.onmessage = ge),
            (me = function () {
              ne.postMessage(null);
            });
        } else
          me = function () {
            L(ge, 0);
          };
        function re(O, k) {
          X = L(function () {
            O(a.unstable_now());
          }, k);
        }
        (a.unstable_IdlePriority = 5),
          (a.unstable_ImmediatePriority = 1),
          (a.unstable_LowPriority = 4),
          (a.unstable_NormalPriority = 3),
          (a.unstable_Profiling = null),
          (a.unstable_UserBlockingPriority = 2),
          (a.unstable_cancelCallback = function (O) {
            O.callback = null;
          }),
          (a.unstable_forceFrameRate = function (O) {
            0 > O || 125 < O
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (J = 0 < O ? Math.floor(1e3 / O) : 5);
          }),
          (a.unstable_getCurrentPriorityLevel = function () {
            return T;
          }),
          (a.unstable_next = function (O) {
            switch (T) {
              case 1:
              case 2:
              case 3:
                var k = 3;
                break;
              default:
                k = T;
            }
            var B = T;
            T = k;
            try {
              return O();
            } finally {
              T = B;
            }
          }),
          (a.unstable_requestPaint = function () {
            _ = !0;
          }),
          (a.unstable_runWithPriority = function (O, k) {
            switch (O) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                O = 3;
            }
            var B = T;
            T = O;
            try {
              return k();
            } finally {
              T = B;
            }
          }),
          (a.unstable_scheduleCallback = function (O, k, B) {
            var ue = a.unstable_now();
            switch (
              (typeof B == "object" && B !== null
                ? ((B = B.delay),
                  (B = typeof B == "number" && 0 < B ? ue + B : ue))
                : (B = ue),
              O)
            ) {
              case 1:
                var A = -1;
                break;
              case 2:
                A = 250;
                break;
              case 5:
                A = 1073741823;
                break;
              case 4:
                A = 1e4;
                break;
              default:
                A = 5e3;
            }
            return (
              (A = B + A),
              (O = {
                id: y++,
                callback: k,
                priorityLevel: O,
                startTime: B,
                expirationTime: A,
                sortIndex: -1,
              }),
              B > ue
                ? ((O.sortIndex = B),
                  o(v, O),
                  u(g) === null &&
                    O === u(v) &&
                    (E ? (H(X), (X = -1)) : (E = !0), re(q, B - ue)))
                : ((O.sortIndex = A),
                  o(g, O),
                  D || C || ((D = !0), $ || (($ = !0), me()))),
              O
            );
          }),
          (a.unstable_shouldYield = oe),
          (a.unstable_wrapCallback = function (O) {
            var k = T;
            return function () {
              var B = T;
              T = k;
              try {
                return O.apply(this, arguments);
              } finally {
                T = B;
              }
            };
          });
      })(Yu)),
    Yu
  );
}
var Rh;
function _0() {
  return Rh || ((Rh = 1), (Bu.exports = N0())), Bu.exports;
}
var Vu = { exports: {} },
  st = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ch;
function z0() {
  if (Ch) return st;
  Ch = 1;
  var a = hs();
  function o(g) {
    var v = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        v += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return (
      "Minified React error #" +
      g +
      "; visit " +
      v +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function u() {}
  var c = {
      d: {
        f: u,
        r: function () {
          throw Error(o(522));
        },
        D: u,
        C: u,
        L: u,
        m: u,
        X: u,
        S: u,
        M: u,
      },
      p: 0,
      findDOMNode: null,
    },
    s = Symbol.for("react.portal");
  function d(g, v, y) {
    var S =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: S == null ? null : "" + S,
      children: g,
      containerInfo: v,
      implementation: y,
    };
  }
  var m = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(g, v) {
    if (g === "font") return "";
    if (typeof v == "string") return v === "use-credentials" ? v : "";
  }
  return (
    (st.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c),
    (st.createPortal = function (g, v) {
      var y =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!v || (v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11))
        throw Error(o(299));
      return d(g, v, null, y);
    }),
    (st.flushSync = function (g) {
      var v = m.T,
        y = c.p;
      try {
        if (((m.T = null), (c.p = 2), g)) return g();
      } finally {
        (m.T = v), (c.p = y), c.d.f();
      }
    }),
    (st.preconnect = function (g, v) {
      typeof g == "string" &&
        (v
          ? ((v = v.crossOrigin),
            (v =
              typeof v == "string"
                ? v === "use-credentials"
                  ? v
                  : ""
                : void 0))
          : (v = null),
        c.d.C(g, v));
    }),
    (st.prefetchDNS = function (g) {
      typeof g == "string" && c.d.D(g);
    }),
    (st.preinit = function (g, v) {
      if (typeof g == "string" && v && typeof v.as == "string") {
        var y = v.as,
          S = h(y, v.crossOrigin),
          T = typeof v.integrity == "string" ? v.integrity : void 0,
          C = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
        y === "style"
          ? c.d.S(g, typeof v.precedence == "string" ? v.precedence : void 0, {
              crossOrigin: S,
              integrity: T,
              fetchPriority: C,
            })
          : y === "script" &&
            c.d.X(g, {
              crossOrigin: S,
              integrity: T,
              fetchPriority: C,
              nonce: typeof v.nonce == "string" ? v.nonce : void 0,
            });
      }
    }),
    (st.preinitModule = function (g, v) {
      if (typeof g == "string")
        if (typeof v == "object" && v !== null) {
          if (v.as == null || v.as === "script") {
            var y = h(v.as, v.crossOrigin);
            c.d.M(g, {
              crossOrigin: y,
              integrity: typeof v.integrity == "string" ? v.integrity : void 0,
              nonce: typeof v.nonce == "string" ? v.nonce : void 0,
            });
          }
        } else v == null && c.d.M(g);
    }),
    (st.preload = function (g, v) {
      if (
        typeof g == "string" &&
        typeof v == "object" &&
        v !== null &&
        typeof v.as == "string"
      ) {
        var y = v.as,
          S = h(y, v.crossOrigin);
        c.d.L(g, y, {
          crossOrigin: S,
          integrity: typeof v.integrity == "string" ? v.integrity : void 0,
          nonce: typeof v.nonce == "string" ? v.nonce : void 0,
          type: typeof v.type == "string" ? v.type : void 0,
          fetchPriority:
            typeof v.fetchPriority == "string" ? v.fetchPriority : void 0,
          referrerPolicy:
            typeof v.referrerPolicy == "string" ? v.referrerPolicy : void 0,
          imageSrcSet:
            typeof v.imageSrcSet == "string" ? v.imageSrcSet : void 0,
          imageSizes: typeof v.imageSizes == "string" ? v.imageSizes : void 0,
          media: typeof v.media == "string" ? v.media : void 0,
        });
      }
    }),
    (st.preloadModule = function (g, v) {
      if (typeof g == "string")
        if (v) {
          var y = h(v.as, v.crossOrigin);
          c.d.m(g, {
            as: typeof v.as == "string" && v.as !== "script" ? v.as : void 0,
            crossOrigin: y,
            integrity: typeof v.integrity == "string" ? v.integrity : void 0,
          });
        } else c.d.m(g);
    }),
    (st.requestFormReset = function (g) {
      c.d.r(g);
    }),
    (st.unstable_batchedUpdates = function (g, v) {
      return g(v);
    }),
    (st.useFormState = function (g, v, y) {
      return m.H.useFormState(g, v, y);
    }),
    (st.useFormStatus = function () {
      return m.H.useHostTransitionStatus();
    }),
    (st.version = "19.1.1"),
    st
  );
}
var Oh;
function bv() {
  if (Oh) return Vu.exports;
  Oh = 1;
  function a() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (o) {
        console.error(o);
      }
  }
  return a(), (Vu.exports = z0()), Vu.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Mh;
function D0() {
  if (Mh) return wi;
  Mh = 1;
  var a = _0(),
    o = hs(),
    u = bv();
  function c(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function s(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function d(e) {
    var t = e,
      n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do (t = e), (t.flags & 4098) !== 0 && (n = t.return), (e = t.return);
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function m(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function h(e) {
    if (d(e) !== e) throw Error(c(188));
  }
  function g(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = d(e)), t === null)) throw Error(c(188));
      return t !== e ? null : e;
    }
    for (var n = e, l = t; ; ) {
      var i = n.return;
      if (i === null) break;
      var r = i.alternate;
      if (r === null) {
        if (((l = i.return), l !== null)) {
          n = l;
          continue;
        }
        break;
      }
      if (i.child === r.child) {
        for (r = i.child; r; ) {
          if (r === n) return h(i), e;
          if (r === l) return h(i), t;
          r = r.sibling;
        }
        throw Error(c(188));
      }
      if (n.return !== l.return) (n = i), (l = r);
      else {
        for (var f = !1, p = i.child; p; ) {
          if (p === n) {
            (f = !0), (n = i), (l = r);
            break;
          }
          if (p === l) {
            (f = !0), (l = i), (n = r);
            break;
          }
          p = p.sibling;
        }
        if (!f) {
          for (p = r.child; p; ) {
            if (p === n) {
              (f = !0), (n = r), (l = i);
              break;
            }
            if (p === l) {
              (f = !0), (l = r), (n = i);
              break;
            }
            p = p.sibling;
          }
          if (!f) throw Error(c(189));
        }
      }
      if (n.alternate !== l) throw Error(c(190));
    }
    if (n.tag !== 3) throw Error(c(188));
    return n.stateNode.current === n ? e : t;
  }
  function v(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = v(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var y = Object.assign,
    S = Symbol.for("react.element"),
    T = Symbol.for("react.transitional.element"),
    C = Symbol.for("react.portal"),
    D = Symbol.for("react.fragment"),
    E = Symbol.for("react.strict_mode"),
    _ = Symbol.for("react.profiler"),
    L = Symbol.for("react.provider"),
    H = Symbol.for("react.consumer"),
    Y = Symbol.for("react.context"),
    K = Symbol.for("react.forward_ref"),
    q = Symbol.for("react.suspense"),
    $ = Symbol.for("react.suspense_list"),
    X = Symbol.for("react.memo"),
    J = Symbol.for("react.lazy"),
    te = Symbol.for("react.activity"),
    oe = Symbol.for("react.memo_cache_sentinel"),
    ge = Symbol.iterator;
  function me(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (ge && e[ge]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var P = Symbol.for("react.client.reference");
  function ne(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === P ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case D:
        return "Fragment";
      case _:
        return "Profiler";
      case E:
        return "StrictMode";
      case q:
        return "Suspense";
      case $:
        return "SuspenseList";
      case te:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case C:
          return "Portal";
        case Y:
          return (e.displayName || "Context") + ".Provider";
        case H:
          return (e._context.displayName || "Context") + ".Consumer";
        case K:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case X:
          return (
            (t = e.displayName || null), t !== null ? t : ne(e.type) || "Memo"
          );
        case J:
          (t = e._payload), (e = e._init);
          try {
            return ne(e(t));
          } catch {}
      }
    return null;
  }
  var re = Array.isArray,
    O = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    k = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    B = { pending: !1, data: null, method: null, action: null },
    ue = [],
    A = -1;
  function Q(e) {
    return { current: e };
  }
  function F(e) {
    0 > A || ((e.current = ue[A]), (ue[A] = null), A--);
  }
  function W(e, t) {
    A++, (ue[A] = e.current), (e.current = t);
  }
  var ee = Q(null),
    pe = Q(null),
    se = Q(null),
    I = Q(null);
  function fe(e, t) {
    switch ((W(se, t), W(pe, e), W(ee, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Wm(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI)))
          (t = Wm(t)), (e = Pm(t, e));
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    F(ee), W(ee, e);
  }
  function Ne() {
    F(ee), F(pe), F(se);
  }
  function Re(e) {
    e.memoizedState !== null && W(I, e);
    var t = ee.current,
      n = Pm(t, e.type);
    t !== n && (W(pe, e), W(ee, n));
  }
  function we(e) {
    pe.current === e && (F(ee), F(pe)),
      I.current === e && (F(I), (gi._currentValue = B));
  }
  var Ee = Object.prototype.hasOwnProperty,
    nt = a.unstable_scheduleCallback,
    mt = a.unstable_cancelCallback,
    tl = a.unstable_shouldYield,
    nl = a.unstable_requestPaint,
    ot = a.unstable_now,
    Eo = a.unstable_getCurrentPriorityLevel,
    ll = a.unstable_ImmediatePriority,
    Ms = a.unstable_UserBlockingPriority,
    _i = a.unstable_NormalPriority,
    op = a.unstable_LowPriority,
    Ns = a.unstable_IdlePriority,
    cp = a.log,
    up = a.unstable_setDisableYieldValue,
    Aa = null,
    St = null;
  function An(e) {
    if (
      (typeof cp == "function" && up(e),
      St && typeof St.setStrictMode == "function")
    )
      try {
        St.setStrictMode(Aa, e);
      } catch {}
  }
  var xt = Math.clz32 ? Math.clz32 : dp,
    sp = Math.log,
    fp = Math.LN2;
  function dp(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((sp(e) / fp) | 0)) | 0;
  }
  var zi = 256,
    Di = 4194304;
  function al(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function ji(e, t, n) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var i = 0,
      r = e.suspendedLanes,
      f = e.pingedLanes;
    e = e.warmLanes;
    var p = l & 134217727;
    return (
      p !== 0
        ? ((l = p & ~r),
          l !== 0
            ? (i = al(l))
            : ((f &= p),
              f !== 0
                ? (i = al(f))
                : n || ((n = p & ~e), n !== 0 && (i = al(n)))))
        : ((p = l & ~r),
          p !== 0
            ? (i = al(p))
            : f !== 0
            ? (i = al(f))
            : n || ((n = l & ~e), n !== 0 && (i = al(n)))),
      i === 0
        ? 0
        : t !== 0 &&
          t !== i &&
          (t & r) === 0 &&
          ((r = i & -i),
          (n = t & -t),
          r >= n || (r === 32 && (n & 4194048) !== 0))
        ? t
        : i
    );
  }
  function Ta(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function mp(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function _s() {
    var e = zi;
    return (zi <<= 1), (zi & 4194048) === 0 && (zi = 256), e;
  }
  function zs() {
    var e = Di;
    return (Di <<= 1), (Di & 62914560) === 0 && (Di = 4194304), e;
  }
  function Ao(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Ra(e, t) {
    (e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0));
  }
  function hp(e, t, n, l, i, r) {
    var f = e.pendingLanes;
    (e.pendingLanes = n),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= n),
      (e.entangledLanes &= n),
      (e.errorRecoveryDisabledLanes &= n),
      (e.shellSuspendCounter = 0);
    var p = e.entanglements,
      x = e.expirationTimes,
      z = e.hiddenUpdates;
    for (n = f & ~n; 0 < n; ) {
      var V = 31 - xt(n),
        Z = 1 << V;
      (p[V] = 0), (x[V] = -1);
      var j = z[V];
      if (j !== null)
        for (z[V] = null, V = 0; V < j.length; V++) {
          var U = j[V];
          U !== null && (U.lane &= -536870913);
        }
      n &= ~Z;
    }
    l !== 0 && Ds(e, l, 0),
      r !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= r & ~(f & ~t));
  }
  function Ds(e, t, n) {
    (e.pendingLanes |= t), (e.suspendedLanes &= ~t);
    var l = 31 - xt(t);
    (e.entangledLanes |= t),
      (e.entanglements[l] = e.entanglements[l] | 1073741824 | (n & 4194090));
  }
  function js(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
      var l = 31 - xt(n),
        i = 1 << l;
      (i & t) | (e[l] & t) && (e[l] |= t), (n &= ~i);
    }
  }
  function To(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Ro(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Us() {
    var e = k.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : vh(e.type));
  }
  function vp(e, t) {
    var n = k.p;
    try {
      return (k.p = e), t();
    } finally {
      k.p = n;
    }
  }
  var Tn = Math.random().toString(36).slice(2),
    ct = "__reactFiber$" + Tn,
    ht = "__reactProps$" + Tn,
    Rl = "__reactContainer$" + Tn,
    Co = "__reactEvents$" + Tn,
    gp = "__reactListeners$" + Tn,
    pp = "__reactHandles$" + Tn,
    Hs = "__reactResources$" + Tn,
    Ca = "__reactMarker$" + Tn;
  function Oo(e) {
    delete e[ct], delete e[ht], delete e[Co], delete e[gp], delete e[pp];
  }
  function Cl(e) {
    var t = e[ct];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[Rl] || n[ct])) {
        if (
          ((n = t.alternate),
          t.child !== null || (n !== null && n.child !== null))
        )
          for (e = eh(e); e !== null; ) {
            if ((n = e[ct])) return n;
            e = eh(e);
          }
        return t;
      }
      (e = n), (n = e.parentNode);
    }
    return null;
  }
  function Ol(e) {
    if ((e = e[ct] || e[Rl])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Oa(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(c(33));
  }
  function Ml(e) {
    var t = e[Hs];
    return (
      t ||
        (t = e[Hs] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function Fe(e) {
    e[Ca] = !0;
  }
  var Ls = new Set(),
    Bs = {};
  function il(e, t) {
    Nl(e, t), Nl(e + "Capture", t);
  }
  function Nl(e, t) {
    for (Bs[e] = t, e = 0; e < t.length; e++) Ls.add(t[e]);
  }
  var yp = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    Ys = {},
    Vs = {};
  function bp(e) {
    return Ee.call(Vs, e)
      ? !0
      : Ee.call(Ys, e)
      ? !1
      : yp.test(e)
      ? (Vs[e] = !0)
      : ((Ys[e] = !0), !1);
  }
  function Ui(e, t, n) {
    if (bp(t))
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var l = t.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + n);
      }
  }
  function Hi(e, t, n) {
    if (n === null) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + n);
    }
  }
  function rn(e, t, n, l) {
    if (l === null) e.removeAttribute(n);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, "" + l);
    }
  }
  var Mo, qs;
  function _l(e) {
    if (Mo === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        (Mo = (t && t[1]) || ""),
          (qs =
            -1 <
            n.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < n.stack.indexOf("@")
              ? "@unknown:0:0"
              : "");
      }
    return (
      `
` +
      Mo +
      e +
      qs
    );
  }
  var No = !1;
  function _o(e, t) {
    if (!e || No) return "";
    No = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var Z = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(Z.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(Z, []);
                } catch (U) {
                  var j = U;
                }
                Reflect.construct(e, [], Z);
              } else {
                try {
                  Z.call();
                } catch (U) {
                  j = U;
                }
                e.call(Z.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (U) {
                j = U;
              }
              (Z = e()) &&
                typeof Z.catch == "function" &&
                Z.catch(function () {});
            }
          } catch (U) {
            if (U && j && typeof U.stack == "string") return [U.stack, j.stack];
          }
          return [null, null];
        },
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var i = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      i &&
        i.configurable &&
        Object.defineProperty(l.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var r = l.DetermineComponentFrameRoot(),
        f = r[0],
        p = r[1];
      if (f && p) {
        var x = f.split(`
`),
          z = p.split(`
`);
        for (
          i = l = 0;
          l < x.length && !x[l].includes("DetermineComponentFrameRoot");

        )
          l++;
        for (; i < z.length && !z[i].includes("DetermineComponentFrameRoot"); )
          i++;
        if (l === x.length || i === z.length)
          for (
            l = x.length - 1, i = z.length - 1;
            1 <= l && 0 <= i && x[l] !== z[i];

          )
            i--;
        for (; 1 <= l && 0 <= i; l--, i--)
          if (x[l] !== z[i]) {
            if (l !== 1 || i !== 1)
              do
                if ((l--, i--, 0 > i || x[l] !== z[i])) {
                  var V =
                    `
` + x[l].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      V.includes("<anonymous>") &&
                      (V = V.replace("<anonymous>", e.displayName)),
                    V
                  );
                }
              while (1 <= l && 0 <= i);
            break;
          }
      }
    } finally {
      (No = !1), (Error.prepareStackTrace = n);
    }
    return (n = e ? e.displayName || e.name : "") ? _l(n) : "";
  }
  function Sp(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return _l(e.type);
      case 16:
        return _l("Lazy");
      case 13:
        return _l("Suspense");
      case 19:
        return _l("SuspenseList");
      case 0:
      case 15:
        return _o(e.type, !1);
      case 11:
        return _o(e.type.render, !1);
      case 1:
        return _o(e.type, !0);
      case 31:
        return _l("Activity");
      default:
        return "";
    }
  }
  function ks(e) {
    try {
      var t = "";
      do (t += Sp(e)), (e = e.return);
      while (e);
      return t;
    } catch (n) {
      return (
        `
Error generating stack: ` +
        n.message +
        `
` +
        n.stack
      );
    }
  }
  function zt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Gs(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function xp(e) {
    var t = Gs(e) ? "checked" : "value",
      n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      l = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof n < "u" &&
      typeof n.get == "function" &&
      typeof n.set == "function"
    ) {
      var i = n.get,
        r = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return i.call(this);
          },
          set: function (f) {
            (l = "" + f), r.call(this, f);
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return l;
          },
          setValue: function (f) {
            l = "" + f;
          },
          stopTracking: function () {
            (e._valueTracker = null), delete e[t];
          },
        }
      );
    }
  }
  function Li(e) {
    e._valueTracker || (e._valueTracker = xp(e));
  }
  function Xs(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      l = "";
    return (
      e && (l = Gs(e) ? (e.checked ? "true" : "false") : e.value),
      (e = l),
      e !== n ? (t.setValue(e), !0) : !1
    );
  }
  function Bi(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var wp = /[\n"\\]/g;
  function Dt(e) {
    return e.replace(wp, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function zo(e, t, n, l, i, r, f, p) {
    (e.name = ""),
      f != null &&
      typeof f != "function" &&
      typeof f != "symbol" &&
      typeof f != "boolean"
        ? (e.type = f)
        : e.removeAttribute("type"),
      t != null
        ? f === "number"
          ? ((t === 0 && e.value === "") || e.value != t) &&
            (e.value = "" + zt(t))
          : e.value !== "" + zt(t) && (e.value = "" + zt(t))
        : (f !== "submit" && f !== "reset") || e.removeAttribute("value"),
      t != null
        ? Do(e, f, zt(t))
        : n != null
        ? Do(e, f, zt(n))
        : l != null && e.removeAttribute("value"),
      i == null && r != null && (e.defaultChecked = !!r),
      i != null &&
        (e.checked = i && typeof i != "function" && typeof i != "symbol"),
      p != null &&
      typeof p != "function" &&
      typeof p != "symbol" &&
      typeof p != "boolean"
        ? (e.name = "" + zt(p))
        : e.removeAttribute("name");
  }
  function Qs(e, t, n, l, i, r, f, p) {
    if (
      (r != null &&
        typeof r != "function" &&
        typeof r != "symbol" &&
        typeof r != "boolean" &&
        (e.type = r),
      t != null || n != null)
    ) {
      if (!((r !== "submit" && r !== "reset") || t != null)) return;
      (n = n != null ? "" + zt(n) : ""),
        (t = t != null ? "" + zt(t) : n),
        p || t === e.value || (e.value = t),
        (e.defaultValue = t);
    }
    (l = l ?? i),
      (l = typeof l != "function" && typeof l != "symbol" && !!l),
      (e.checked = p ? e.checked : !!l),
      (e.defaultChecked = !!l),
      f != null &&
        typeof f != "function" &&
        typeof f != "symbol" &&
        typeof f != "boolean" &&
        (e.name = f);
  }
  function Do(e, t, n) {
    (t === "number" && Bi(e.ownerDocument) === e) ||
      e.defaultValue === "" + n ||
      (e.defaultValue = "" + n);
  }
  function zl(e, t, n, l) {
    if (((e = e.options), t)) {
      t = {};
      for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
      for (n = 0; n < e.length; n++)
        (i = t.hasOwnProperty("$" + e[n].value)),
          e[n].selected !== i && (e[n].selected = i),
          i && l && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + zt(n), t = null, i = 0; i < e.length; i++) {
        if (e[i].value === n) {
          (e[i].selected = !0), l && (e[i].defaultSelected = !0);
          return;
        }
        t !== null || e[i].disabled || (t = e[i]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Zs(e, t, n) {
    if (
      t != null &&
      ((t = "" + zt(t)), t !== e.value && (e.value = t), n == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + zt(n) : "";
  }
  function Ks(e, t, n, l) {
    if (t == null) {
      if (l != null) {
        if (n != null) throw Error(c(92));
        if (re(l)) {
          if (1 < l.length) throw Error(c(93));
          l = l[0];
        }
        n = l;
      }
      n == null && (n = ""), (t = n);
    }
    (n = zt(t)),
      (e.defaultValue = n),
      (l = e.textContent),
      l === n && l !== "" && l !== null && (e.value = l);
  }
  function Dl(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Ep = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Js(e, t, n) {
    var l = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === ""
      ? l
        ? e.setProperty(t, "")
        : t === "float"
        ? (e.cssFloat = "")
        : (e[t] = "")
      : l
      ? e.setProperty(t, n)
      : typeof n != "number" || n === 0 || Ep.has(t)
      ? t === "float"
        ? (e.cssFloat = n)
        : (e[t] = ("" + n).trim())
      : (e[t] = n + "px");
  }
  function Ws(e, t, n) {
    if (t != null && typeof t != "object") throw Error(c(62));
    if (((e = e.style), n != null)) {
      for (var l in n)
        !n.hasOwnProperty(l) ||
          (t != null && t.hasOwnProperty(l)) ||
          (l.indexOf("--") === 0
            ? e.setProperty(l, "")
            : l === "float"
            ? (e.cssFloat = "")
            : (e[l] = ""));
      for (var i in t)
        (l = t[i]), t.hasOwnProperty(i) && n[i] !== l && Js(e, i, l);
    } else for (var r in t) t.hasOwnProperty(r) && Js(e, r, t[r]);
  }
  function jo(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Ap = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    Tp =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Yi(e) {
    return Tp.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  var Uo = null;
  function Ho(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var jl = null,
    Ul = null;
  function Ps(e) {
    var t = Ol(e);
    if (t && (e = t.stateNode)) {
      var n = e[ht] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case "input":
          if (
            (zo(
              e,
              n.value,
              n.defaultValue,
              n.defaultValue,
              n.checked,
              n.defaultChecked,
              n.type,
              n.name
            ),
            (t = n.name),
            n.type === "radio" && t != null)
          ) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                'input[name="' + Dt("" + t) + '"][type="radio"]'
              ),
                t = 0;
              t < n.length;
              t++
            ) {
              var l = n[t];
              if (l !== e && l.form === e.form) {
                var i = l[ht] || null;
                if (!i) throw Error(c(90));
                zo(
                  l,
                  i.value,
                  i.defaultValue,
                  i.defaultValue,
                  i.checked,
                  i.defaultChecked,
                  i.type,
                  i.name
                );
              }
            }
            for (t = 0; t < n.length; t++)
              (l = n[t]), l.form === e.form && Xs(l);
          }
          break e;
        case "textarea":
          Zs(e, n.value, n.defaultValue);
          break e;
        case "select":
          (t = n.value), t != null && zl(e, !!n.multiple, t, !1);
      }
    }
  }
  var Lo = !1;
  function $s(e, t, n) {
    if (Lo) return e(t, n);
    Lo = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (
        ((Lo = !1),
        (jl !== null || Ul !== null) &&
          (Ar(), jl && ((t = jl), (e = Ul), (Ul = jl = null), Ps(t), e)))
      )
        for (t = 0; t < e.length; t++) Ps(e[t]);
    }
  }
  function Ma(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var l = n[ht] || null;
    if (l === null) return null;
    n = l[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (l = !l.disabled) ||
          ((e = e.type),
          (l = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !l);
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(c(231, t, typeof n));
    return n;
  }
  var on = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    Bo = !1;
  if (on)
    try {
      var Na = {};
      Object.defineProperty(Na, "passive", {
        get: function () {
          Bo = !0;
        },
      }),
        window.addEventListener("test", Na, Na),
        window.removeEventListener("test", Na, Na);
    } catch {
      Bo = !1;
    }
  var Rn = null,
    Yo = null,
    Vi = null;
  function Fs() {
    if (Vi) return Vi;
    var e,
      t = Yo,
      n = t.length,
      l,
      i = "value" in Rn ? Rn.value : Rn.textContent,
      r = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++);
    var f = n - e;
    for (l = 1; l <= f && t[n - l] === i[r - l]; l++);
    return (Vi = i.slice(e, 1 < l ? 1 - l : void 0));
  }
  function qi(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function ki() {
    return !0;
  }
  function Is() {
    return !1;
  }
  function vt(e) {
    function t(n, l, i, r, f) {
      (this._reactName = n),
        (this._targetInst = i),
        (this.type = l),
        (this.nativeEvent = r),
        (this.target = f),
        (this.currentTarget = null);
      for (var p in e)
        e.hasOwnProperty(p) && ((n = e[p]), (this[p] = n ? n(r) : r[p]));
      return (
        (this.isDefaultPrevented = (
          r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1
        )
          ? ki
          : Is),
        (this.isPropagationStopped = Is),
        this
      );
    }
    return (
      y(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            (this.isDefaultPrevented = ki));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            (this.isPropagationStopped = ki));
        },
        persist: function () {},
        isPersistent: ki,
      }),
      t
    );
  }
  var rl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Gi = vt(rl),
    _a = y({}, rl, { view: 0, detail: 0 }),
    Rp = vt(_a),
    Vo,
    qo,
    za,
    Xi = y({}, _a, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Go,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== za &&
              (za && e.type === "mousemove"
                ? ((Vo = e.screenX - za.screenX), (qo = e.screenY - za.screenY))
                : (qo = Vo = 0),
              (za = e)),
            Vo);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : qo;
      },
    }),
    ef = vt(Xi),
    Cp = y({}, Xi, { dataTransfer: 0 }),
    Op = vt(Cp),
    Mp = y({}, _a, { relatedTarget: 0 }),
    ko = vt(Mp),
    Np = y({}, rl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    _p = vt(Np),
    zp = y({}, rl, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Dp = vt(zp),
    jp = y({}, rl, { data: 0 }),
    tf = vt(jp),
    Up = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    Hp = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    Lp = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function Bp(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = Lp[e])
      ? !!t[e]
      : !1;
  }
  function Go() {
    return Bp;
  }
  var Yp = y({}, _a, {
      key: function (e) {
        if (e.key) {
          var t = Up[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = qi(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
          ? Hp[e.keyCode] || "Unidentified"
          : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Go,
      charCode: function (e) {
        return e.type === "keypress" ? qi(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? qi(e)
          : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
      },
    }),
    Vp = vt(Yp),
    qp = y({}, Xi, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    nf = vt(qp),
    kp = y({}, _a, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Go,
    }),
    Gp = vt(kp),
    Xp = y({}, rl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Qp = vt(Xp),
    Zp = y({}, Xi, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
          ? -e.wheelDeltaX
          : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
          ? -e.wheelDelta
          : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Kp = vt(Zp),
    Jp = y({}, rl, { newState: 0, oldState: 0 }),
    Wp = vt(Jp),
    Pp = [9, 13, 27, 32],
    Xo = on && "CompositionEvent" in window,
    Da = null;
  on && "documentMode" in document && (Da = document.documentMode);
  var $p = on && "TextEvent" in window && !Da,
    lf = on && (!Xo || (Da && 8 < Da && 11 >= Da)),
    af = " ",
    rf = !1;
  function of(e, t) {
    switch (e) {
      case "keyup":
        return Pp.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function cf(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
  }
  var Hl = !1;
  function Fp(e, t) {
    switch (e) {
      case "compositionend":
        return cf(t);
      case "keypress":
        return t.which !== 32 ? null : ((rf = !0), af);
      case "textInput":
        return (e = t.data), e === af && rf ? null : e;
      default:
        return null;
    }
  }
  function Ip(e, t) {
    if (Hl)
      return e === "compositionend" || (!Xo && of(e, t))
        ? ((e = Fs()), (Vi = Yo = Rn = null), (Hl = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return lf && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var ey = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function uf(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!ey[e.type] : t === "textarea";
  }
  function sf(e, t, n, l) {
    jl ? (Ul ? Ul.push(l) : (Ul = [l])) : (jl = l),
      (t = Nr(t, "onChange")),
      0 < t.length &&
        ((n = new Gi("onChange", "change", null, n, l)),
        e.push({ event: n, listeners: t }));
  }
  var ja = null,
    Ua = null;
  function ty(e) {
    Xm(e, 0);
  }
  function Qi(e) {
    var t = Oa(e);
    if (Xs(t)) return e;
  }
  function ff(e, t) {
    if (e === "change") return t;
  }
  var df = !1;
  if (on) {
    var Qo;
    if (on) {
      var Zo = "oninput" in document;
      if (!Zo) {
        var mf = document.createElement("div");
        mf.setAttribute("oninput", "return;"),
          (Zo = typeof mf.oninput == "function");
      }
      Qo = Zo;
    } else Qo = !1;
    df = Qo && (!document.documentMode || 9 < document.documentMode);
  }
  function hf() {
    ja && (ja.detachEvent("onpropertychange", vf), (Ua = ja = null));
  }
  function vf(e) {
    if (e.propertyName === "value" && Qi(Ua)) {
      var t = [];
      sf(t, Ua, e, Ho(e)), $s(ty, t);
    }
  }
  function ny(e, t, n) {
    e === "focusin"
      ? (hf(), (ja = t), (Ua = n), ja.attachEvent("onpropertychange", vf))
      : e === "focusout" && hf();
  }
  function ly(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Qi(Ua);
  }
  function ay(e, t) {
    if (e === "click") return Qi(t);
  }
  function iy(e, t) {
    if (e === "input" || e === "change") return Qi(t);
  }
  function ry(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var wt = typeof Object.is == "function" ? Object.is : ry;
  function Ha(e, t) {
    if (wt(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var n = Object.keys(e),
      l = Object.keys(t);
    if (n.length !== l.length) return !1;
    for (l = 0; l < n.length; l++) {
      var i = n[l];
      if (!Ee.call(t, i) || !wt(e[i], t[i])) return !1;
    }
    return !0;
  }
  function gf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function pf(e, t) {
    var n = gf(e);
    e = 0;
    for (var l; n; ) {
      if (n.nodeType === 3) {
        if (((l = e + n.textContent.length), e <= t && l >= t))
          return { node: n, offset: t - e };
        e = l;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = gf(n);
    }
  }
  function yf(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
        ? yf(e, t.parentNode)
        : "contains" in e
        ? e.contains(t)
        : e.compareDocumentPosition
        ? !!(e.compareDocumentPosition(t) & 16)
        : !1
      : !1;
  }
  function bf(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = Bi(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Bi(e.document);
    }
    return t;
  }
  function Ko(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  var oy = on && "documentMode" in document && 11 >= document.documentMode,
    Ll = null,
    Jo = null,
    La = null,
    Wo = !1;
  function Sf(e, t, n) {
    var l =
      n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Wo ||
      Ll == null ||
      Ll !== Bi(l) ||
      ((l = Ll),
      "selectionStart" in l && Ko(l)
        ? (l = { start: l.selectionStart, end: l.selectionEnd })
        : ((l = (
            (l.ownerDocument && l.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (l = {
            anchorNode: l.anchorNode,
            anchorOffset: l.anchorOffset,
            focusNode: l.focusNode,
            focusOffset: l.focusOffset,
          })),
      (La && Ha(La, l)) ||
        ((La = l),
        (l = Nr(Jo, "onSelect")),
        0 < l.length &&
          ((t = new Gi("onSelect", "select", null, t, n)),
          e.push({ event: t, listeners: l }),
          (t.target = Ll))));
  }
  function ol(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n["Webkit" + e] = "webkit" + t),
      (n["Moz" + e] = "moz" + t),
      n
    );
  }
  var Bl = {
      animationend: ol("Animation", "AnimationEnd"),
      animationiteration: ol("Animation", "AnimationIteration"),
      animationstart: ol("Animation", "AnimationStart"),
      transitionrun: ol("Transition", "TransitionRun"),
      transitionstart: ol("Transition", "TransitionStart"),
      transitioncancel: ol("Transition", "TransitionCancel"),
      transitionend: ol("Transition", "TransitionEnd"),
    },
    Po = {},
    xf = {};
  on &&
    ((xf = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Bl.animationend.animation,
      delete Bl.animationiteration.animation,
      delete Bl.animationstart.animation),
    "TransitionEvent" in window || delete Bl.transitionend.transition);
  function cl(e) {
    if (Po[e]) return Po[e];
    if (!Bl[e]) return e;
    var t = Bl[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in xf) return (Po[e] = t[n]);
    return e;
  }
  var wf = cl("animationend"),
    Ef = cl("animationiteration"),
    Af = cl("animationstart"),
    cy = cl("transitionrun"),
    uy = cl("transitionstart"),
    sy = cl("transitioncancel"),
    Tf = cl("transitionend"),
    Rf = new Map(),
    $o =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  $o.push("scrollEnd");
  function kt(e, t) {
    Rf.set(e, t), il(t, [e]);
  }
  var Cf = new WeakMap();
  function jt(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = Cf.get(e);
      return n !== void 0
        ? n
        : ((t = { value: e, source: t, stack: ks(t) }), Cf.set(e, t), t);
    }
    return { value: e, source: t, stack: ks(t) };
  }
  var Ut = [],
    Yl = 0,
    Fo = 0;
  function Zi() {
    for (var e = Yl, t = (Fo = Yl = 0); t < e; ) {
      var n = Ut[t];
      Ut[t++] = null;
      var l = Ut[t];
      Ut[t++] = null;
      var i = Ut[t];
      Ut[t++] = null;
      var r = Ut[t];
      if (((Ut[t++] = null), l !== null && i !== null)) {
        var f = l.pending;
        f === null ? (i.next = i) : ((i.next = f.next), (f.next = i)),
          (l.pending = i);
      }
      r !== 0 && Of(n, i, r);
    }
  }
  function Ki(e, t, n, l) {
    (Ut[Yl++] = e),
      (Ut[Yl++] = t),
      (Ut[Yl++] = n),
      (Ut[Yl++] = l),
      (Fo |= l),
      (e.lanes |= l),
      (e = e.alternate),
      e !== null && (e.lanes |= l);
  }
  function Io(e, t, n, l) {
    return Ki(e, t, n, l), Ji(e);
  }
  function Vl(e, t) {
    return Ki(e, null, null, t), Ji(e);
  }
  function Of(e, t, n) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n);
    for (var i = !1, r = e.return; r !== null; )
      (r.childLanes |= n),
        (l = r.alternate),
        l !== null && (l.childLanes |= n),
        r.tag === 22 &&
          ((e = r.stateNode), e === null || e._visibility & 1 || (i = !0)),
        (e = r),
        (r = r.return);
    return e.tag === 3
      ? ((r = e.stateNode),
        i &&
          t !== null &&
          ((i = 31 - xt(n)),
          (e = r.hiddenUpdates),
          (l = e[i]),
          l === null ? (e[i] = [t]) : l.push(t),
          (t.lane = n | 536870912)),
        r)
      : null;
  }
  function Ji(e) {
    if (50 < ci) throw ((ci = 0), (iu = null), Error(c(185)));
    for (var t = e.return; t !== null; ) (e = t), (t = e.return);
    return e.tag === 3 ? e.stateNode : null;
  }
  var ql = {};
  function fy(e, t, n, l) {
    (this.tag = e),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = l),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function Et(e, t, n, l) {
    return new fy(e, t, n, l);
  }
  function ec(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
  }
  function cn(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = Et(e.tag, t, e.key, e.mode)),
          (n.elementType = e.elementType),
          (n.type = e.type),
          (n.stateNode = e.stateNode),
          (n.alternate = e),
          (e.alternate = n))
        : ((n.pendingProps = t),
          (n.type = e.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = e.flags & 65011712),
      (n.childLanes = e.childLanes),
      (n.lanes = e.lanes),
      (n.child = e.child),
      (n.memoizedProps = e.memoizedProps),
      (n.memoizedState = e.memoizedState),
      (n.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (n.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (n.sibling = e.sibling),
      (n.index = e.index),
      (n.ref = e.ref),
      (n.refCleanup = e.refCleanup),
      n
    );
  }
  function Mf(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return (
      n === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = n.childLanes),
          (e.lanes = n.lanes),
          (e.child = n.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = n.memoizedProps),
          (e.memoizedState = n.memoizedState),
          (e.updateQueue = n.updateQueue),
          (e.type = n.type),
          (t = n.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function Wi(e, t, n, l, i, r) {
    var f = 0;
    if (((l = e), typeof e == "function")) ec(e) && (f = 1);
    else if (typeof e == "string")
      f = m0(e, n, ee.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
        ? 27
        : 5;
    else
      e: switch (e) {
        case te:
          return (e = Et(31, n, t, i)), (e.elementType = te), (e.lanes = r), e;
        case D:
          return ul(n.children, i, r, t);
        case E:
          (f = 8), (i |= 24);
          break;
        case _:
          return (
            (e = Et(12, n, t, i | 2)), (e.elementType = _), (e.lanes = r), e
          );
        case q:
          return (e = Et(13, n, t, i)), (e.elementType = q), (e.lanes = r), e;
        case $:
          return (e = Et(19, n, t, i)), (e.elementType = $), (e.lanes = r), e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case L:
              case Y:
                f = 10;
                break e;
              case H:
                f = 9;
                break e;
              case K:
                f = 11;
                break e;
              case X:
                f = 14;
                break e;
              case J:
                (f = 16), (l = null);
                break e;
            }
          (f = 29),
            (n = Error(c(130, e === null ? "null" : typeof e, ""))),
            (l = null);
      }
    return (
      (t = Et(f, n, t, i)), (t.elementType = e), (t.type = l), (t.lanes = r), t
    );
  }
  function ul(e, t, n, l) {
    return (e = Et(7, e, l, t)), (e.lanes = n), e;
  }
  function tc(e, t, n) {
    return (e = Et(6, e, null, t)), (e.lanes = n), e;
  }
  function nc(e, t, n) {
    return (
      (t = Et(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var kl = [],
    Gl = 0,
    Pi = null,
    $i = 0,
    Ht = [],
    Lt = 0,
    sl = null,
    un = 1,
    sn = "";
  function fl(e, t) {
    (kl[Gl++] = $i), (kl[Gl++] = Pi), (Pi = e), ($i = t);
  }
  function Nf(e, t, n) {
    (Ht[Lt++] = un), (Ht[Lt++] = sn), (Ht[Lt++] = sl), (sl = e);
    var l = un;
    e = sn;
    var i = 32 - xt(l) - 1;
    (l &= ~(1 << i)), (n += 1);
    var r = 32 - xt(t) + i;
    if (30 < r) {
      var f = i - (i % 5);
      (r = (l & ((1 << f) - 1)).toString(32)),
        (l >>= f),
        (i -= f),
        (un = (1 << (32 - xt(t) + i)) | (n << i) | l),
        (sn = r + e);
    } else (un = (1 << r) | (n << i) | l), (sn = e);
  }
  function lc(e) {
    e.return !== null && (fl(e, 1), Nf(e, 1, 0));
  }
  function ac(e) {
    for (; e === Pi; )
      (Pi = kl[--Gl]), (kl[Gl] = null), ($i = kl[--Gl]), (kl[Gl] = null);
    for (; e === sl; )
      (sl = Ht[--Lt]),
        (Ht[Lt] = null),
        (sn = Ht[--Lt]),
        (Ht[Lt] = null),
        (un = Ht[--Lt]),
        (Ht[Lt] = null);
  }
  var dt = null,
    Ge = null,
    Me = !1,
    dl = null,
    Jt = !1,
    ic = Error(c(519));
  function ml(e) {
    var t = Error(c(418, ""));
    throw (Va(jt(t, e)), ic);
  }
  function _f(e) {
    var t = e.stateNode,
      n = e.type,
      l = e.memoizedProps;
    switch (((t[ct] = e), (t[ht] = l), n)) {
      case "dialog":
        Te("cancel", t), Te("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Te("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < si.length; n++) Te(si[n], t);
        break;
      case "source":
        Te("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Te("error", t), Te("load", t);
        break;
      case "details":
        Te("toggle", t);
        break;
      case "input":
        Te("invalid", t),
          Qs(
            t,
            l.value,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name,
            !0
          ),
          Li(t);
        break;
      case "select":
        Te("invalid", t);
        break;
      case "textarea":
        Te("invalid", t), Ks(t, l.value, l.defaultValue, l.children), Li(t);
    }
    (n = l.children),
      (typeof n != "string" && typeof n != "number" && typeof n != "bigint") ||
      t.textContent === "" + n ||
      l.suppressHydrationWarning === !0 ||
      Jm(t.textContent, n)
        ? (l.popover != null && (Te("beforetoggle", t), Te("toggle", t)),
          l.onScroll != null && Te("scroll", t),
          l.onScrollEnd != null && Te("scrollend", t),
          l.onClick != null && (t.onclick = _r),
          (t = !0))
        : (t = !1),
      t || ml(e);
  }
  function zf(e) {
    for (dt = e.return; dt; )
      switch (dt.tag) {
        case 5:
        case 13:
          Jt = !1;
          return;
        case 27:
        case 3:
          Jt = !0;
          return;
        default:
          dt = dt.return;
      }
  }
  function Ba(e) {
    if (e !== dt) return !1;
    if (!Me) return zf(e), (Me = !0), !1;
    var t = e.tag,
      n;
    if (
      ((n = t !== 3 && t !== 27) &&
        ((n = t === 5) &&
          ((n = e.type),
          (n =
            !(n !== "form" && n !== "button") || xu(e.type, e.memoizedProps))),
        (n = !n)),
      n && Ge && ml(e),
      zf(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(c(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8)
            if (((n = e.data), n === "/$")) {
              if (t === 0) {
                Ge = Xt(e.nextSibling);
                break e;
              }
              t--;
            } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
          e = e.nextSibling;
        }
        Ge = null;
      }
    } else
      t === 27
        ? ((t = Ge), kn(e.type) ? ((e = Tu), (Tu = null), (Ge = e)) : (Ge = t))
        : (Ge = dt ? Xt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function Ya() {
    (Ge = dt = null), (Me = !1);
  }
  function Df() {
    var e = dl;
    return (
      e !== null &&
        (yt === null ? (yt = e) : yt.push.apply(yt, e), (dl = null)),
      e
    );
  }
  function Va(e) {
    dl === null ? (dl = [e]) : dl.push(e);
  }
  var rc = Q(null),
    hl = null,
    fn = null;
  function Cn(e, t, n) {
    W(rc, t._currentValue), (t._currentValue = n);
  }
  function dn(e) {
    (e._currentValue = rc.current), F(rc);
  }
  function oc(e, t, n) {
    for (; e !== null; ) {
      var l = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), l !== null && (l.childLanes |= t))
          : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t),
        e === n)
      )
        break;
      e = e.return;
    }
  }
  function cc(e, t, n, l) {
    var i = e.child;
    for (i !== null && (i.return = e); i !== null; ) {
      var r = i.dependencies;
      if (r !== null) {
        var f = i.child;
        r = r.firstContext;
        e: for (; r !== null; ) {
          var p = r;
          r = i;
          for (var x = 0; x < t.length; x++)
            if (p.context === t[x]) {
              (r.lanes |= n),
                (p = r.alternate),
                p !== null && (p.lanes |= n),
                oc(r.return, n, e),
                l || (f = null);
              break e;
            }
          r = p.next;
        }
      } else if (i.tag === 18) {
        if (((f = i.return), f === null)) throw Error(c(341));
        (f.lanes |= n),
          (r = f.alternate),
          r !== null && (r.lanes |= n),
          oc(f, n, e),
          (f = null);
      } else f = i.child;
      if (f !== null) f.return = i;
      else
        for (f = i; f !== null; ) {
          if (f === e) {
            f = null;
            break;
          }
          if (((i = f.sibling), i !== null)) {
            (i.return = f.return), (f = i);
            break;
          }
          f = f.return;
        }
      i = f;
    }
  }
  function qa(e, t, n, l) {
    e = null;
    for (var i = t, r = !1; i !== null; ) {
      if (!r) {
        if ((i.flags & 524288) !== 0) r = !0;
        else if ((i.flags & 262144) !== 0) break;
      }
      if (i.tag === 10) {
        var f = i.alternate;
        if (f === null) throw Error(c(387));
        if (((f = f.memoizedProps), f !== null)) {
          var p = i.type;
          wt(i.pendingProps.value, f.value) ||
            (e !== null ? e.push(p) : (e = [p]));
        }
      } else if (i === I.current) {
        if (((f = i.alternate), f === null)) throw Error(c(387));
        f.memoizedState.memoizedState !== i.memoizedState.memoizedState &&
          (e !== null ? e.push(gi) : (e = [gi]));
      }
      i = i.return;
    }
    e !== null && cc(t, e, n, l), (t.flags |= 262144);
  }
  function Fi(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!wt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function vl(e) {
    (hl = e),
      (fn = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null);
  }
  function ut(e) {
    return jf(hl, e);
  }
  function Ii(e, t) {
    return hl === null && vl(e), jf(e, t);
  }
  function jf(e, t) {
    var n = t._currentValue;
    if (((t = { context: t, memoizedValue: n, next: null }), fn === null)) {
      if (e === null) throw Error(c(308));
      (fn = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288);
    } else fn = fn.next = t;
    return n;
  }
  var dy =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (n, l) {
                  e.push(l);
                },
              });
            this.abort = function () {
              (t.aborted = !0),
                e.forEach(function (n) {
                  return n();
                });
            };
          },
    my = a.unstable_scheduleCallback,
    hy = a.unstable_NormalPriority,
    We = {
      $$typeof: Y,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function uc() {
    return { controller: new dy(), data: new Map(), refCount: 0 };
  }
  function ka(e) {
    e.refCount--,
      e.refCount === 0 &&
        my(hy, function () {
          e.controller.abort();
        });
  }
  var Ga = null,
    sc = 0,
    Xl = 0,
    Ql = null;
  function vy(e, t) {
    if (Ga === null) {
      var n = (Ga = []);
      (sc = 0),
        (Xl = du()),
        (Ql = {
          status: "pending",
          value: void 0,
          then: function (l) {
            n.push(l);
          },
        });
    }
    return sc++, t.then(Uf, Uf), t;
  }
  function Uf() {
    if (--sc === 0 && Ga !== null) {
      Ql !== null && (Ql.status = "fulfilled");
      var e = Ga;
      (Ga = null), (Xl = 0), (Ql = null);
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function gy(e, t) {
    var n = [],
      l = {
        status: "pending",
        value: null,
        reason: null,
        then: function (i) {
          n.push(i);
        },
      };
    return (
      e.then(
        function () {
          (l.status = "fulfilled"), (l.value = t);
          for (var i = 0; i < n.length; i++) (0, n[i])(t);
        },
        function (i) {
          for (l.status = "rejected", l.reason = i, i = 0; i < n.length; i++)
            (0, n[i])(void 0);
        }
      ),
      l
    );
  }
  var Hf = O.S;
  O.S = function (e, t) {
    typeof t == "object" &&
      t !== null &&
      typeof t.then == "function" &&
      vy(e, t),
      Hf !== null && Hf(e, t);
  };
  var gl = Q(null);
  function fc() {
    var e = gl.current;
    return e !== null ? e : Be.pooledCache;
  }
  function er(e, t) {
    t === null ? W(gl, gl.current) : W(gl, t.pool);
  }
  function Lf() {
    var e = fc();
    return e === null ? null : { parent: We._currentValue, pool: e };
  }
  var Xa = Error(c(460)),
    Bf = Error(c(474)),
    tr = Error(c(542)),
    dc = { then: function () {} };
  function Yf(e) {
    return (e = e.status), e === "fulfilled" || e === "rejected";
  }
  function nr() {}
  function Vf(e, t, n) {
    switch (
      ((n = e[n]),
      n === void 0 ? e.push(t) : n !== t && (t.then(nr, nr), (t = n)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((e = t.reason), kf(e), e);
      default:
        if (typeof t.status == "string") t.then(nr, nr);
        else {
          if (((e = Be), e !== null && 100 < e.shellSuspendCounter))
            throw Error(c(482));
          (e = t),
            (e.status = "pending"),
            e.then(
              function (l) {
                if (t.status === "pending") {
                  var i = t;
                  (i.status = "fulfilled"), (i.value = l);
                }
              },
              function (l) {
                if (t.status === "pending") {
                  var i = t;
                  (i.status = "rejected"), (i.reason = l);
                }
              }
            );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((e = t.reason), kf(e), e);
        }
        throw ((Qa = t), Xa);
    }
  }
  var Qa = null;
  function qf() {
    if (Qa === null) throw Error(c(459));
    var e = Qa;
    return (Qa = null), e;
  }
  function kf(e) {
    if (e === Xa || e === tr) throw Error(c(483));
  }
  var On = !1;
  function mc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function hc(e, t) {
    (e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        });
  }
  function Mn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Nn(e, t, n) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (((l = l.shared), (_e & 2) !== 0)) {
      var i = l.pending;
      return (
        i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
        (l.pending = t),
        (t = Ji(e)),
        Of(e, null, n),
        t
      );
    }
    return Ki(e, l, t, n), Ji(e);
  }
  function Za(e, t, n) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194048) !== 0))
    ) {
      var l = t.lanes;
      (l &= e.pendingLanes), (n |= l), (t.lanes = n), js(e, n);
    }
  }
  function vc(e, t) {
    var n = e.updateQueue,
      l = e.alternate;
    if (l !== null && ((l = l.updateQueue), n === l)) {
      var i = null,
        r = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var f = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null,
          };
          r === null ? (i = r = f) : (r = r.next = f), (n = n.next);
        } while (n !== null);
        r === null ? (i = r = t) : (r = r.next = t);
      } else i = r = t;
      (n = {
        baseState: l.baseState,
        firstBaseUpdate: i,
        lastBaseUpdate: r,
        shared: l.shared,
        callbacks: l.callbacks,
      }),
        (e.updateQueue = n);
      return;
    }
    (e = n.lastBaseUpdate),
      e === null ? (n.firstBaseUpdate = t) : (e.next = t),
      (n.lastBaseUpdate = t);
  }
  var gc = !1;
  function Ka() {
    if (gc) {
      var e = Ql;
      if (e !== null) throw e;
    }
  }
  function Ja(e, t, n, l) {
    gc = !1;
    var i = e.updateQueue;
    On = !1;
    var r = i.firstBaseUpdate,
      f = i.lastBaseUpdate,
      p = i.shared.pending;
    if (p !== null) {
      i.shared.pending = null;
      var x = p,
        z = x.next;
      (x.next = null), f === null ? (r = z) : (f.next = z), (f = x);
      var V = e.alternate;
      V !== null &&
        ((V = V.updateQueue),
        (p = V.lastBaseUpdate),
        p !== f &&
          (p === null ? (V.firstBaseUpdate = z) : (p.next = z),
          (V.lastBaseUpdate = x)));
    }
    if (r !== null) {
      var Z = i.baseState;
      (f = 0), (V = z = x = null), (p = r);
      do {
        var j = p.lane & -536870913,
          U = j !== p.lane;
        if (U ? (Ce & j) === j : (l & j) === j) {
          j !== 0 && j === Xl && (gc = !0),
            V !== null &&
              (V = V.next =
                {
                  lane: 0,
                  tag: p.tag,
                  payload: p.payload,
                  callback: null,
                  next: null,
                });
          e: {
            var ve = e,
              de = p;
            j = t;
            var Ue = n;
            switch (de.tag) {
              case 1:
                if (((ve = de.payload), typeof ve == "function")) {
                  Z = ve.call(Ue, Z, j);
                  break e;
                }
                Z = ve;
                break e;
              case 3:
                ve.flags = (ve.flags & -65537) | 128;
              case 0:
                if (
                  ((ve = de.payload),
                  (j = typeof ve == "function" ? ve.call(Ue, Z, j) : ve),
                  j == null)
                )
                  break e;
                Z = y({}, Z, j);
                break e;
              case 2:
                On = !0;
            }
          }
          (j = p.callback),
            j !== null &&
              ((e.flags |= 64),
              U && (e.flags |= 8192),
              (U = i.callbacks),
              U === null ? (i.callbacks = [j]) : U.push(j));
        } else
          (U = {
            lane: j,
            tag: p.tag,
            payload: p.payload,
            callback: p.callback,
            next: null,
          }),
            V === null ? ((z = V = U), (x = Z)) : (V = V.next = U),
            (f |= j);
        if (((p = p.next), p === null)) {
          if (((p = i.shared.pending), p === null)) break;
          (U = p),
            (p = U.next),
            (U.next = null),
            (i.lastBaseUpdate = U),
            (i.shared.pending = null);
        }
      } while (!0);
      V === null && (x = Z),
        (i.baseState = x),
        (i.firstBaseUpdate = z),
        (i.lastBaseUpdate = V),
        r === null && (i.shared.lanes = 0),
        (Bn |= f),
        (e.lanes = f),
        (e.memoizedState = Z);
    }
  }
  function Gf(e, t) {
    if (typeof e != "function") throw Error(c(191, e));
    e.call(t);
  }
  function Xf(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++) Gf(n[e], t);
  }
  var Zl = Q(null),
    lr = Q(0);
  function Qf(e, t) {
    (e = bn), W(lr, e), W(Zl, t), (bn = e | t.baseLanes);
  }
  function pc() {
    W(lr, bn), W(Zl, Zl.current);
  }
  function yc() {
    (bn = lr.current), F(Zl), F(lr);
  }
  var _n = 0,
    be = null,
    De = null,
    Ke = null,
    ar = !1,
    Kl = !1,
    pl = !1,
    ir = 0,
    Wa = 0,
    Jl = null,
    py = 0;
  function Qe() {
    throw Error(c(321));
  }
  function bc(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!wt(e[n], t[n])) return !1;
    return !0;
  }
  function Sc(e, t, n, l, i, r) {
    return (
      (_n = r),
      (be = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (O.H = e === null || e.memoizedState === null ? Od : Md),
      (pl = !1),
      (r = n(l, i)),
      (pl = !1),
      Kl && (r = Kf(t, n, l, i)),
      Zf(e),
      r
    );
  }
  function Zf(e) {
    O.H = fr;
    var t = De !== null && De.next !== null;
    if (((_n = 0), (Ke = De = be = null), (ar = !1), (Wa = 0), (Jl = null), t))
      throw Error(c(300));
    e === null ||
      Ie ||
      ((e = e.dependencies), e !== null && Fi(e) && (Ie = !0));
  }
  function Kf(e, t, n, l) {
    be = e;
    var i = 0;
    do {
      if ((Kl && (Jl = null), (Wa = 0), (Kl = !1), 25 <= i))
        throw Error(c(301));
      if (((i += 1), (Ke = De = null), e.updateQueue != null)) {
        var r = e.updateQueue;
        (r.lastEffect = null),
          (r.events = null),
          (r.stores = null),
          r.memoCache != null && (r.memoCache.index = 0);
      }
      (O.H = Ay), (r = t(n, l));
    } while (Kl);
    return r;
  }
  function yy() {
    var e = O.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == "function" ? Pa(t) : t),
      (e = e.useState()[0]),
      (De !== null ? De.memoizedState : null) !== e && (be.flags |= 1024),
      t
    );
  }
  function xc() {
    var e = ir !== 0;
    return (ir = 0), e;
  }
  function wc(e, t, n) {
    (t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~n);
  }
  function Ec(e) {
    if (ar) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), (e = e.next);
      }
      ar = !1;
    }
    (_n = 0), (Ke = De = be = null), (Kl = !1), (Wa = ir = 0), (Jl = null);
  }
  function gt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return Ke === null ? (be.memoizedState = Ke = e) : (Ke = Ke.next = e), Ke;
  }
  function Je() {
    if (De === null) {
      var e = be.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = De.next;
    var t = Ke === null ? be.memoizedState : Ke.next;
    if (t !== null) (Ke = t), (De = e);
    else {
      if (e === null)
        throw be.alternate === null ? Error(c(467)) : Error(c(310));
      (De = e),
        (e = {
          memoizedState: De.memoizedState,
          baseState: De.baseState,
          baseQueue: De.baseQueue,
          queue: De.queue,
          next: null,
        }),
        Ke === null ? (be.memoizedState = Ke = e) : (Ke = Ke.next = e);
    }
    return Ke;
  }
  function Ac() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Pa(e) {
    var t = Wa;
    return (
      (Wa += 1),
      Jl === null && (Jl = []),
      (e = Vf(Jl, e, t)),
      (t = be),
      (Ke === null ? t.memoizedState : Ke.next) === null &&
        ((t = t.alternate),
        (O.H = t === null || t.memoizedState === null ? Od : Md)),
      e
    );
  }
  function rr(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Pa(e);
      if (e.$$typeof === Y) return ut(e);
    }
    throw Error(c(438, String(e)));
  }
  function Tc(e) {
    var t = null,
      n = be.updateQueue;
    if ((n !== null && (t = n.memoCache), t == null)) {
      var l = be.alternate;
      l !== null &&
        ((l = l.updateQueue),
        l !== null &&
          ((l = l.memoCache),
          l != null &&
            (t = {
              data: l.data.map(function (i) {
                return i.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      n === null && ((n = Ac()), (be.updateQueue = n)),
      (n.memoCache = t),
      (n = t.data[t.index]),
      n === void 0)
    )
      for (n = t.data[t.index] = Array(e), l = 0; l < e; l++) n[l] = oe;
    return t.index++, n;
  }
  function mn(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function or(e) {
    var t = Je();
    return Rc(t, De, e);
  }
  function Rc(e, t, n) {
    var l = e.queue;
    if (l === null) throw Error(c(311));
    l.lastRenderedReducer = n;
    var i = e.baseQueue,
      r = l.pending;
    if (r !== null) {
      if (i !== null) {
        var f = i.next;
        (i.next = r.next), (r.next = f);
      }
      (t.baseQueue = i = r), (l.pending = null);
    }
    if (((r = e.baseState), i === null)) e.memoizedState = r;
    else {
      t = i.next;
      var p = (f = null),
        x = null,
        z = t,
        V = !1;
      do {
        var Z = z.lane & -536870913;
        if (Z !== z.lane ? (Ce & Z) === Z : (_n & Z) === Z) {
          var j = z.revertLane;
          if (j === 0)
            x !== null &&
              (x = x.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: z.action,
                  hasEagerState: z.hasEagerState,
                  eagerState: z.eagerState,
                  next: null,
                }),
              Z === Xl && (V = !0);
          else if ((_n & j) === j) {
            (z = z.next), j === Xl && (V = !0);
            continue;
          } else
            (Z = {
              lane: 0,
              revertLane: z.revertLane,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null,
            }),
              x === null ? ((p = x = Z), (f = r)) : (x = x.next = Z),
              (be.lanes |= j),
              (Bn |= j);
          (Z = z.action),
            pl && n(r, Z),
            (r = z.hasEagerState ? z.eagerState : n(r, Z));
        } else
          (j = {
            lane: Z,
            revertLane: z.revertLane,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null,
          }),
            x === null ? ((p = x = j), (f = r)) : (x = x.next = j),
            (be.lanes |= Z),
            (Bn |= Z);
        z = z.next;
      } while (z !== null && z !== t);
      if (
        (x === null ? (f = r) : (x.next = p),
        !wt(r, e.memoizedState) && ((Ie = !0), V && ((n = Ql), n !== null)))
      )
        throw n;
      (e.memoizedState = r),
        (e.baseState = f),
        (e.baseQueue = x),
        (l.lastRenderedState = r);
    }
    return i === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Cc(e) {
    var t = Je(),
      n = t.queue;
    if (n === null) throw Error(c(311));
    n.lastRenderedReducer = e;
    var l = n.dispatch,
      i = n.pending,
      r = t.memoizedState;
    if (i !== null) {
      n.pending = null;
      var f = (i = i.next);
      do (r = e(r, f.action)), (f = f.next);
      while (f !== i);
      wt(r, t.memoizedState) || (Ie = !0),
        (t.memoizedState = r),
        t.baseQueue === null && (t.baseState = r),
        (n.lastRenderedState = r);
    }
    return [r, l];
  }
  function Jf(e, t, n) {
    var l = be,
      i = Je(),
      r = Me;
    if (r) {
      if (n === void 0) throw Error(c(407));
      n = n();
    } else n = t();
    var f = !wt((De || i).memoizedState, n);
    f && ((i.memoizedState = n), (Ie = !0)), (i = i.queue);
    var p = $f.bind(null, l, i, e);
    if (
      ($a(2048, 8, p, [e]),
      i.getSnapshot !== t || f || (Ke !== null && Ke.memoizedState.tag & 1))
    ) {
      if (
        ((l.flags |= 2048),
        Wl(9, cr(), Pf.bind(null, l, i, n, t), null),
        Be === null)
      )
        throw Error(c(349));
      r || (_n & 124) !== 0 || Wf(l, t, n);
    }
    return n;
  }
  function Wf(e, t, n) {
    (e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = be.updateQueue),
      t === null
        ? ((t = Ac()), (be.updateQueue = t), (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
  }
  function Pf(e, t, n, l) {
    (t.value = n), (t.getSnapshot = l), Ff(t) && If(e);
  }
  function $f(e, t, n) {
    return n(function () {
      Ff(t) && If(e);
    });
  }
  function Ff(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !wt(e, n);
    } catch {
      return !0;
    }
  }
  function If(e) {
    var t = Vl(e, 2);
    t !== null && Ot(t, e, 2);
  }
  function Oc(e) {
    var t = gt();
    if (typeof e == "function") {
      var n = e;
      if (((e = n()), pl)) {
        An(!0);
        try {
          n();
        } finally {
          An(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: mn,
        lastRenderedState: e,
      }),
      t
    );
  }
  function ed(e, t, n, l) {
    return (e.baseState = n), Rc(e, De, typeof l == "function" ? l : mn);
  }
  function by(e, t, n, l, i) {
    if (sr(e)) throw Error(c(485));
    if (((e = t.action), e !== null)) {
      var r = {
        payload: i,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (f) {
          r.listeners.push(f);
        },
      };
      O.T !== null ? n(!0) : (r.isTransition = !1),
        l(r),
        (n = t.pending),
        n === null
          ? ((r.next = t.pending = r), td(t, r))
          : ((r.next = n.next), (t.pending = n.next = r));
    }
  }
  function td(e, t) {
    var n = t.action,
      l = t.payload,
      i = e.state;
    if (t.isTransition) {
      var r = O.T,
        f = {};
      O.T = f;
      try {
        var p = n(i, l),
          x = O.S;
        x !== null && x(f, p), nd(e, t, p);
      } catch (z) {
        Mc(e, t, z);
      } finally {
        O.T = r;
      }
    } else
      try {
        (r = n(i, l)), nd(e, t, r);
      } catch (z) {
        Mc(e, t, z);
      }
  }
  function nd(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function"
      ? n.then(
          function (l) {
            ld(e, t, l);
          },
          function (l) {
            return Mc(e, t, l);
          }
        )
      : ld(e, t, n);
  }
  function ld(e, t, n) {
    (t.status = "fulfilled"),
      (t.value = n),
      ad(t),
      (e.state = n),
      (t = e.pending),
      t !== null &&
        ((n = t.next),
        n === t ? (e.pending = null) : ((n = n.next), (t.next = n), td(e, n)));
  }
  function Mc(e, t, n) {
    var l = e.pending;
    if (((e.pending = null), l !== null)) {
      l = l.next;
      do (t.status = "rejected"), (t.reason = n), ad(t), (t = t.next);
      while (t !== l);
    }
    e.action = null;
  }
  function ad(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function id(e, t) {
    return t;
  }
  function rd(e, t) {
    if (Me) {
      var n = Be.formState;
      if (n !== null) {
        e: {
          var l = be;
          if (Me) {
            if (Ge) {
              t: {
                for (var i = Ge, r = Jt; i.nodeType !== 8; ) {
                  if (!r) {
                    i = null;
                    break t;
                  }
                  if (((i = Xt(i.nextSibling)), i === null)) {
                    i = null;
                    break t;
                  }
                }
                (r = i.data), (i = r === "F!" || r === "F" ? i : null);
              }
              if (i) {
                (Ge = Xt(i.nextSibling)), (l = i.data === "F!");
                break e;
              }
            }
            ml(l);
          }
          l = !1;
        }
        l && (t = n[0]);
      }
    }
    return (
      (n = gt()),
      (n.memoizedState = n.baseState = t),
      (l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: id,
        lastRenderedState: t,
      }),
      (n.queue = l),
      (n = Td.bind(null, be, l)),
      (l.dispatch = n),
      (l = Oc(!1)),
      (r = jc.bind(null, be, !1, l.queue)),
      (l = gt()),
      (i = { state: t, dispatch: null, action: e, pending: null }),
      (l.queue = i),
      (n = by.bind(null, be, i, r, n)),
      (i.dispatch = n),
      (l.memoizedState = e),
      [t, n, !1]
    );
  }
  function od(e) {
    var t = Je();
    return cd(t, De, e);
  }
  function cd(e, t, n) {
    if (
      ((t = Rc(e, t, id)[0]),
      (e = or(mn)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var l = Pa(t);
      } catch (f) {
        throw f === Xa ? tr : f;
      }
    else l = t;
    t = Je();
    var i = t.queue,
      r = i.dispatch;
    return (
      n !== t.memoizedState &&
        ((be.flags |= 2048), Wl(9, cr(), Sy.bind(null, i, n), null)),
      [l, r, e]
    );
  }
  function Sy(e, t) {
    e.action = t;
  }
  function ud(e) {
    var t = Je(),
      n = De;
    if (n !== null) return cd(t, n, e);
    Je(), (t = t.memoizedState), (n = Je());
    var l = n.queue.dispatch;
    return (n.memoizedState = e), [t, l, !1];
  }
  function Wl(e, t, n, l) {
    return (
      (e = { tag: e, create: n, deps: l, inst: t, next: null }),
      (t = be.updateQueue),
      t === null && ((t = Ac()), (be.updateQueue = t)),
      (n = t.lastEffect),
      n === null
        ? (t.lastEffect = e.next = e)
        : ((l = n.next), (n.next = e), (e.next = l), (t.lastEffect = e)),
      e
    );
  }
  function cr() {
    return { destroy: void 0, resource: void 0 };
  }
  function sd() {
    return Je().memoizedState;
  }
  function ur(e, t, n, l) {
    var i = gt();
    (l = l === void 0 ? null : l),
      (be.flags |= e),
      (i.memoizedState = Wl(1 | t, cr(), n, l));
  }
  function $a(e, t, n, l) {
    var i = Je();
    l = l === void 0 ? null : l;
    var r = i.memoizedState.inst;
    De !== null && l !== null && bc(l, De.memoizedState.deps)
      ? (i.memoizedState = Wl(t, r, n, l))
      : ((be.flags |= e), (i.memoizedState = Wl(1 | t, r, n, l)));
  }
  function fd(e, t) {
    ur(8390656, 8, e, t);
  }
  function dd(e, t) {
    $a(2048, 8, e, t);
  }
  function md(e, t) {
    return $a(4, 2, e, t);
  }
  function hd(e, t) {
    return $a(4, 4, e, t);
  }
  function vd(e, t) {
    if (typeof t == "function") {
      e = e();
      var n = t(e);
      return function () {
        typeof n == "function" ? n() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function gd(e, t, n) {
    (n = n != null ? n.concat([e]) : null), $a(4, 4, vd.bind(null, t, e), n);
  }
  function Nc() {}
  function pd(e, t) {
    var n = Je();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    return t !== null && bc(t, l[1]) ? l[0] : ((n.memoizedState = [e, t]), e);
  }
  function yd(e, t) {
    var n = Je();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    if (t !== null && bc(t, l[1])) return l[0];
    if (((l = e()), pl)) {
      An(!0);
      try {
        e();
      } finally {
        An(!1);
      }
    }
    return (n.memoizedState = [l, t]), l;
  }
  function _c(e, t, n) {
    return n === void 0 || (_n & 1073741824) !== 0
      ? (e.memoizedState = t)
      : ((e.memoizedState = n), (e = xm()), (be.lanes |= e), (Bn |= e), n);
  }
  function bd(e, t, n, l) {
    return wt(n, t)
      ? n
      : Zl.current !== null
      ? ((e = _c(e, n, l)), wt(e, t) || (Ie = !0), e)
      : (_n & 42) === 0
      ? ((Ie = !0), (e.memoizedState = n))
      : ((e = xm()), (be.lanes |= e), (Bn |= e), t);
  }
  function Sd(e, t, n, l, i) {
    var r = k.p;
    k.p = r !== 0 && 8 > r ? r : 8;
    var f = O.T,
      p = {};
    (O.T = p), jc(e, !1, t, n);
    try {
      var x = i(),
        z = O.S;
      if (
        (z !== null && z(p, x),
        x !== null && typeof x == "object" && typeof x.then == "function")
      ) {
        var V = gy(x, l);
        Fa(e, t, V, Ct(e));
      } else Fa(e, t, l, Ct(e));
    } catch (Z) {
      Fa(e, t, { then: function () {}, status: "rejected", reason: Z }, Ct());
    } finally {
      (k.p = r), (O.T = f);
    }
  }
  function xy() {}
  function zc(e, t, n, l) {
    if (e.tag !== 5) throw Error(c(476));
    var i = xd(e).queue;
    Sd(
      e,
      i,
      t,
      B,
      n === null
        ? xy
        : function () {
            return wd(e), n(l);
          }
    );
  }
  function xd(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: B,
      baseState: B,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: mn,
        lastRenderedState: B,
      },
      next: null,
    };
    var n = {};
    return (
      (t.next = {
        memoizedState: n,
        baseState: n,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: mn,
          lastRenderedState: n,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function wd(e) {
    var t = xd(e).next.queue;
    Fa(e, t, {}, Ct());
  }
  function Dc() {
    return ut(gi);
  }
  function Ed() {
    return Je().memoizedState;
  }
  function Ad() {
    return Je().memoizedState;
  }
  function wy(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = Ct();
          e = Mn(n);
          var l = Nn(t, e, n);
          l !== null && (Ot(l, t, n), Za(l, t, n)),
            (t = { cache: uc() }),
            (e.payload = t);
          return;
      }
      t = t.return;
    }
  }
  function Ey(e, t, n) {
    var l = Ct();
    (n = {
      lane: l,
      revertLane: 0,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      sr(e)
        ? Rd(t, n)
        : ((n = Io(e, t, n, l)), n !== null && (Ot(n, e, l), Cd(n, t, l)));
  }
  function Td(e, t, n) {
    var l = Ct();
    Fa(e, t, n, l);
  }
  function Fa(e, t, n, l) {
    var i = {
      lane: l,
      revertLane: 0,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (sr(e)) Rd(t, i);
    else {
      var r = e.alternate;
      if (
        e.lanes === 0 &&
        (r === null || r.lanes === 0) &&
        ((r = t.lastRenderedReducer), r !== null)
      )
        try {
          var f = t.lastRenderedState,
            p = r(f, n);
          if (((i.hasEagerState = !0), (i.eagerState = p), wt(p, f)))
            return Ki(e, t, i, 0), Be === null && Zi(), !1;
        } catch {
        } finally {
        }
      if (((n = Io(e, t, i, l)), n !== null))
        return Ot(n, e, l), Cd(n, t, l), !0;
    }
    return !1;
  }
  function jc(e, t, n, l) {
    if (
      ((l = {
        lane: 2,
        revertLane: du(),
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      sr(e))
    ) {
      if (t) throw Error(c(479));
    } else (t = Io(e, n, l, 2)), t !== null && Ot(t, e, 2);
  }
  function sr(e) {
    var t = e.alternate;
    return e === be || (t !== null && t === be);
  }
  function Rd(e, t) {
    Kl = ar = !0;
    var n = e.pending;
    n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (e.pending = t);
  }
  function Cd(e, t, n) {
    if ((n & 4194048) !== 0) {
      var l = t.lanes;
      (l &= e.pendingLanes), (n |= l), (t.lanes = n), js(e, n);
    }
  }
  var fr = {
      readContext: ut,
      use: rr,
      useCallback: Qe,
      useContext: Qe,
      useEffect: Qe,
      useImperativeHandle: Qe,
      useLayoutEffect: Qe,
      useInsertionEffect: Qe,
      useMemo: Qe,
      useReducer: Qe,
      useRef: Qe,
      useState: Qe,
      useDebugValue: Qe,
      useDeferredValue: Qe,
      useTransition: Qe,
      useSyncExternalStore: Qe,
      useId: Qe,
      useHostTransitionStatus: Qe,
      useFormState: Qe,
      useActionState: Qe,
      useOptimistic: Qe,
      useMemoCache: Qe,
      useCacheRefresh: Qe,
    },
    Od = {
      readContext: ut,
      use: rr,
      useCallback: function (e, t) {
        return (gt().memoizedState = [e, t === void 0 ? null : t]), e;
      },
      useContext: ut,
      useEffect: fd,
      useImperativeHandle: function (e, t, n) {
        (n = n != null ? n.concat([e]) : null),
          ur(4194308, 4, vd.bind(null, t, e), n);
      },
      useLayoutEffect: function (e, t) {
        return ur(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        ur(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = gt();
        t = t === void 0 ? null : t;
        var l = e();
        if (pl) {
          An(!0);
          try {
            e();
          } finally {
            An(!1);
          }
        }
        return (n.memoizedState = [l, t]), l;
      },
      useReducer: function (e, t, n) {
        var l = gt();
        if (n !== void 0) {
          var i = n(t);
          if (pl) {
            An(!0);
            try {
              n(t);
            } finally {
              An(!1);
            }
          }
        } else i = t;
        return (
          (l.memoizedState = l.baseState = i),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: i,
          }),
          (l.queue = e),
          (e = e.dispatch = Ey.bind(null, be, e)),
          [l.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = gt();
        return (e = { current: e }), (t.memoizedState = e);
      },
      useState: function (e) {
        e = Oc(e);
        var t = e.queue,
          n = Td.bind(null, be, t);
        return (t.dispatch = n), [e.memoizedState, n];
      },
      useDebugValue: Nc,
      useDeferredValue: function (e, t) {
        var n = gt();
        return _c(n, e, t);
      },
      useTransition: function () {
        var e = Oc(!1);
        return (
          (e = Sd.bind(null, be, e.queue, !0, !1)),
          (gt().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, t, n) {
        var l = be,
          i = gt();
        if (Me) {
          if (n === void 0) throw Error(c(407));
          n = n();
        } else {
          if (((n = t()), Be === null)) throw Error(c(349));
          (Ce & 124) !== 0 || Wf(l, t, n);
        }
        i.memoizedState = n;
        var r = { value: n, getSnapshot: t };
        return (
          (i.queue = r),
          fd($f.bind(null, l, r, e), [e]),
          (l.flags |= 2048),
          Wl(9, cr(), Pf.bind(null, l, r, n, t), null),
          n
        );
      },
      useId: function () {
        var e = gt(),
          t = Be.identifierPrefix;
        if (Me) {
          var n = sn,
            l = un;
          (n = (l & ~(1 << (32 - xt(l) - 1))).toString(32) + n),
            (t = "«" + t + "R" + n),
            (n = ir++),
            0 < n && (t += "H" + n.toString(32)),
            (t += "»");
        } else (n = py++), (t = "«" + t + "r" + n.toString(32) + "»");
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Dc,
      useFormState: rd,
      useActionState: rd,
      useOptimistic: function (e) {
        var t = gt();
        t.memoizedState = t.baseState = e;
        var n = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = n),
          (t = jc.bind(null, be, !0, n)),
          (n.dispatch = t),
          [e, t]
        );
      },
      useMemoCache: Tc,
      useCacheRefresh: function () {
        return (gt().memoizedState = wy.bind(null, be));
      },
    },
    Md = {
      readContext: ut,
      use: rr,
      useCallback: pd,
      useContext: ut,
      useEffect: dd,
      useImperativeHandle: gd,
      useInsertionEffect: md,
      useLayoutEffect: hd,
      useMemo: yd,
      useReducer: or,
      useRef: sd,
      useState: function () {
        return or(mn);
      },
      useDebugValue: Nc,
      useDeferredValue: function (e, t) {
        var n = Je();
        return bd(n, De.memoizedState, e, t);
      },
      useTransition: function () {
        var e = or(mn)[0],
          t = Je().memoizedState;
        return [typeof e == "boolean" ? e : Pa(e), t];
      },
      useSyncExternalStore: Jf,
      useId: Ed,
      useHostTransitionStatus: Dc,
      useFormState: od,
      useActionState: od,
      useOptimistic: function (e, t) {
        var n = Je();
        return ed(n, De, e, t);
      },
      useMemoCache: Tc,
      useCacheRefresh: Ad,
    },
    Ay = {
      readContext: ut,
      use: rr,
      useCallback: pd,
      useContext: ut,
      useEffect: dd,
      useImperativeHandle: gd,
      useInsertionEffect: md,
      useLayoutEffect: hd,
      useMemo: yd,
      useReducer: Cc,
      useRef: sd,
      useState: function () {
        return Cc(mn);
      },
      useDebugValue: Nc,
      useDeferredValue: function (e, t) {
        var n = Je();
        return De === null ? _c(n, e, t) : bd(n, De.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Cc(mn)[0],
          t = Je().memoizedState;
        return [typeof e == "boolean" ? e : Pa(e), t];
      },
      useSyncExternalStore: Jf,
      useId: Ed,
      useHostTransitionStatus: Dc,
      useFormState: ud,
      useActionState: ud,
      useOptimistic: function (e, t) {
        var n = Je();
        return De !== null
          ? ed(n, De, e, t)
          : ((n.baseState = e), [e, n.queue.dispatch]);
      },
      useMemoCache: Tc,
      useCacheRefresh: Ad,
    },
    Pl = null,
    Ia = 0;
  function dr(e) {
    var t = Ia;
    return (Ia += 1), Pl === null && (Pl = []), Vf(Pl, e, t);
  }
  function ei(e, t) {
    (t = t.props.ref), (e.ref = t !== void 0 ? t : null);
  }
  function mr(e, t) {
    throw t.$$typeof === S
      ? Error(c(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          c(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e
          )
        ));
  }
  function Nd(e) {
    var t = e._init;
    return t(e._payload);
  }
  function _d(e) {
    function t(M, R) {
      if (e) {
        var N = M.deletions;
        N === null ? ((M.deletions = [R]), (M.flags |= 16)) : N.push(R);
      }
    }
    function n(M, R) {
      if (!e) return null;
      for (; R !== null; ) t(M, R), (R = R.sibling);
      return null;
    }
    function l(M) {
      for (var R = new Map(); M !== null; )
        M.key !== null ? R.set(M.key, M) : R.set(M.index, M), (M = M.sibling);
      return R;
    }
    function i(M, R) {
      return (M = cn(M, R)), (M.index = 0), (M.sibling = null), M;
    }
    function r(M, R, N) {
      return (
        (M.index = N),
        e
          ? ((N = M.alternate),
            N !== null
              ? ((N = N.index), N < R ? ((M.flags |= 67108866), R) : N)
              : ((M.flags |= 67108866), R))
          : ((M.flags |= 1048576), R)
      );
    }
    function f(M) {
      return e && M.alternate === null && (M.flags |= 67108866), M;
    }
    function p(M, R, N, G) {
      return R === null || R.tag !== 6
        ? ((R = tc(N, M.mode, G)), (R.return = M), R)
        : ((R = i(R, N)), (R.return = M), R);
    }
    function x(M, R, N, G) {
      var le = N.type;
      return le === D
        ? V(M, R, N.props.children, G, N.key)
        : R !== null &&
          (R.elementType === le ||
            (typeof le == "object" &&
              le !== null &&
              le.$$typeof === J &&
              Nd(le) === R.type))
        ? ((R = i(R, N.props)), ei(R, N), (R.return = M), R)
        : ((R = Wi(N.type, N.key, N.props, null, M.mode, G)),
          ei(R, N),
          (R.return = M),
          R);
    }
    function z(M, R, N, G) {
      return R === null ||
        R.tag !== 4 ||
        R.stateNode.containerInfo !== N.containerInfo ||
        R.stateNode.implementation !== N.implementation
        ? ((R = nc(N, M.mode, G)), (R.return = M), R)
        : ((R = i(R, N.children || [])), (R.return = M), R);
    }
    function V(M, R, N, G, le) {
      return R === null || R.tag !== 7
        ? ((R = ul(N, M.mode, G, le)), (R.return = M), R)
        : ((R = i(R, N)), (R.return = M), R);
    }
    function Z(M, R, N) {
      if (
        (typeof R == "string" && R !== "") ||
        typeof R == "number" ||
        typeof R == "bigint"
      )
        return (R = tc("" + R, M.mode, N)), (R.return = M), R;
      if (typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case T:
            return (
              (N = Wi(R.type, R.key, R.props, null, M.mode, N)),
              ei(N, R),
              (N.return = M),
              N
            );
          case C:
            return (R = nc(R, M.mode, N)), (R.return = M), R;
          case J:
            var G = R._init;
            return (R = G(R._payload)), Z(M, R, N);
        }
        if (re(R) || me(R))
          return (R = ul(R, M.mode, N, null)), (R.return = M), R;
        if (typeof R.then == "function") return Z(M, dr(R), N);
        if (R.$$typeof === Y) return Z(M, Ii(M, R), N);
        mr(M, R);
      }
      return null;
    }
    function j(M, R, N, G) {
      var le = R !== null ? R.key : null;
      if (
        (typeof N == "string" && N !== "") ||
        typeof N == "number" ||
        typeof N == "bigint"
      )
        return le !== null ? null : p(M, R, "" + N, G);
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case T:
            return N.key === le ? x(M, R, N, G) : null;
          case C:
            return N.key === le ? z(M, R, N, G) : null;
          case J:
            return (le = N._init), (N = le(N._payload)), j(M, R, N, G);
        }
        if (re(N) || me(N)) return le !== null ? null : V(M, R, N, G, null);
        if (typeof N.then == "function") return j(M, R, dr(N), G);
        if (N.$$typeof === Y) return j(M, R, Ii(M, N), G);
        mr(M, N);
      }
      return null;
    }
    function U(M, R, N, G, le) {
      if (
        (typeof G == "string" && G !== "") ||
        typeof G == "number" ||
        typeof G == "bigint"
      )
        return (M = M.get(N) || null), p(R, M, "" + G, le);
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case T:
            return (
              (M = M.get(G.key === null ? N : G.key) || null), x(R, M, G, le)
            );
          case C:
            return (
              (M = M.get(G.key === null ? N : G.key) || null), z(R, M, G, le)
            );
          case J:
            var xe = G._init;
            return (G = xe(G._payload)), U(M, R, N, G, le);
        }
        if (re(G) || me(G)) return (M = M.get(N) || null), V(R, M, G, le, null);
        if (typeof G.then == "function") return U(M, R, N, dr(G), le);
        if (G.$$typeof === Y) return U(M, R, N, Ii(R, G), le);
        mr(R, G);
      }
      return null;
    }
    function ve(M, R, N, G) {
      for (
        var le = null, xe = null, ce = R, he = (R = 0), tt = null;
        ce !== null && he < N.length;
        he++
      ) {
        ce.index > he ? ((tt = ce), (ce = null)) : (tt = ce.sibling);
        var Oe = j(M, ce, N[he], G);
        if (Oe === null) {
          ce === null && (ce = tt);
          break;
        }
        e && ce && Oe.alternate === null && t(M, ce),
          (R = r(Oe, R, he)),
          xe === null ? (le = Oe) : (xe.sibling = Oe),
          (xe = Oe),
          (ce = tt);
      }
      if (he === N.length) return n(M, ce), Me && fl(M, he), le;
      if (ce === null) {
        for (; he < N.length; he++)
          (ce = Z(M, N[he], G)),
            ce !== null &&
              ((R = r(ce, R, he)),
              xe === null ? (le = ce) : (xe.sibling = ce),
              (xe = ce));
        return Me && fl(M, he), le;
      }
      for (ce = l(ce); he < N.length; he++)
        (tt = U(ce, M, he, N[he], G)),
          tt !== null &&
            (e &&
              tt.alternate !== null &&
              ce.delete(tt.key === null ? he : tt.key),
            (R = r(tt, R, he)),
            xe === null ? (le = tt) : (xe.sibling = tt),
            (xe = tt));
      return (
        e &&
          ce.forEach(function (Kn) {
            return t(M, Kn);
          }),
        Me && fl(M, he),
        le
      );
    }
    function de(M, R, N, G) {
      if (N == null) throw Error(c(151));
      for (
        var le = null,
          xe = null,
          ce = R,
          he = (R = 0),
          tt = null,
          Oe = N.next();
        ce !== null && !Oe.done;
        he++, Oe = N.next()
      ) {
        ce.index > he ? ((tt = ce), (ce = null)) : (tt = ce.sibling);
        var Kn = j(M, ce, Oe.value, G);
        if (Kn === null) {
          ce === null && (ce = tt);
          break;
        }
        e && ce && Kn.alternate === null && t(M, ce),
          (R = r(Kn, R, he)),
          xe === null ? (le = Kn) : (xe.sibling = Kn),
          (xe = Kn),
          (ce = tt);
      }
      if (Oe.done) return n(M, ce), Me && fl(M, he), le;
      if (ce === null) {
        for (; !Oe.done; he++, Oe = N.next())
          (Oe = Z(M, Oe.value, G)),
            Oe !== null &&
              ((R = r(Oe, R, he)),
              xe === null ? (le = Oe) : (xe.sibling = Oe),
              (xe = Oe));
        return Me && fl(M, he), le;
      }
      for (ce = l(ce); !Oe.done; he++, Oe = N.next())
        (Oe = U(ce, M, he, Oe.value, G)),
          Oe !== null &&
            (e &&
              Oe.alternate !== null &&
              ce.delete(Oe.key === null ? he : Oe.key),
            (R = r(Oe, R, he)),
            xe === null ? (le = Oe) : (xe.sibling = Oe),
            (xe = Oe));
      return (
        e &&
          ce.forEach(function (T0) {
            return t(M, T0);
          }),
        Me && fl(M, he),
        le
      );
    }
    function Ue(M, R, N, G) {
      if (
        (typeof N == "object" &&
          N !== null &&
          N.type === D &&
          N.key === null &&
          (N = N.props.children),
        typeof N == "object" && N !== null)
      ) {
        switch (N.$$typeof) {
          case T:
            e: {
              for (var le = N.key; R !== null; ) {
                if (R.key === le) {
                  if (((le = N.type), le === D)) {
                    if (R.tag === 7) {
                      n(M, R.sibling),
                        (G = i(R, N.props.children)),
                        (G.return = M),
                        (M = G);
                      break e;
                    }
                  } else if (
                    R.elementType === le ||
                    (typeof le == "object" &&
                      le !== null &&
                      le.$$typeof === J &&
                      Nd(le) === R.type)
                  ) {
                    n(M, R.sibling),
                      (G = i(R, N.props)),
                      ei(G, N),
                      (G.return = M),
                      (M = G);
                    break e;
                  }
                  n(M, R);
                  break;
                } else t(M, R);
                R = R.sibling;
              }
              N.type === D
                ? ((G = ul(N.props.children, M.mode, G, N.key)),
                  (G.return = M),
                  (M = G))
                : ((G = Wi(N.type, N.key, N.props, null, M.mode, G)),
                  ei(G, N),
                  (G.return = M),
                  (M = G));
            }
            return f(M);
          case C:
            e: {
              for (le = N.key; R !== null; ) {
                if (R.key === le)
                  if (
                    R.tag === 4 &&
                    R.stateNode.containerInfo === N.containerInfo &&
                    R.stateNode.implementation === N.implementation
                  ) {
                    n(M, R.sibling),
                      (G = i(R, N.children || [])),
                      (G.return = M),
                      (M = G);
                    break e;
                  } else {
                    n(M, R);
                    break;
                  }
                else t(M, R);
                R = R.sibling;
              }
              (G = nc(N, M.mode, G)), (G.return = M), (M = G);
            }
            return f(M);
          case J:
            return (le = N._init), (N = le(N._payload)), Ue(M, R, N, G);
        }
        if (re(N)) return ve(M, R, N, G);
        if (me(N)) {
          if (((le = me(N)), typeof le != "function")) throw Error(c(150));
          return (N = le.call(N)), de(M, R, N, G);
        }
        if (typeof N.then == "function") return Ue(M, R, dr(N), G);
        if (N.$$typeof === Y) return Ue(M, R, Ii(M, N), G);
        mr(M, N);
      }
      return (typeof N == "string" && N !== "") ||
        typeof N == "number" ||
        typeof N == "bigint"
        ? ((N = "" + N),
          R !== null && R.tag === 6
            ? (n(M, R.sibling), (G = i(R, N)), (G.return = M), (M = G))
            : (n(M, R), (G = tc(N, M.mode, G)), (G.return = M), (M = G)),
          f(M))
        : n(M, R);
    }
    return function (M, R, N, G) {
      try {
        Ia = 0;
        var le = Ue(M, R, N, G);
        return (Pl = null), le;
      } catch (ce) {
        if (ce === Xa || ce === tr) throw ce;
        var xe = Et(29, ce, null, M.mode);
        return (xe.lanes = G), (xe.return = M), xe;
      } finally {
      }
    };
  }
  var $l = _d(!0),
    zd = _d(!1),
    Bt = Q(null),
    Wt = null;
  function zn(e) {
    var t = e.alternate;
    W(Pe, Pe.current & 1),
      W(Bt, e),
      Wt === null &&
        (t === null || Zl.current !== null || t.memoizedState !== null) &&
        (Wt = e);
  }
  function Dd(e) {
    if (e.tag === 22) {
      if ((W(Pe, Pe.current), W(Bt, e), Wt === null)) {
        var t = e.alternate;
        t !== null && t.memoizedState !== null && (Wt = e);
      }
    } else Dn();
  }
  function Dn() {
    W(Pe, Pe.current), W(Bt, Bt.current);
  }
  function hn(e) {
    F(Bt), Wt === e && (Wt = null), F(Pe);
  }
  var Pe = Q(0);
  function hr(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (
          n !== null &&
          ((n = n.dehydrated), n === null || n.data === "$?" || Au(n))
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        (t.child.return = t), (t = t.child);
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
  }
  function Uc(e, t, n, l) {
    (t = e.memoizedState),
      (n = n(l, t)),
      (n = n == null ? t : y({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var Hc = {
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var l = Ct(),
        i = Mn(l);
      (i.payload = t),
        n != null && (i.callback = n),
        (t = Nn(e, i, l)),
        t !== null && (Ot(t, e, l), Za(t, e, l));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var l = Ct(),
        i = Mn(l);
      (i.tag = 1),
        (i.payload = t),
        n != null && (i.callback = n),
        (t = Nn(e, i, l)),
        t !== null && (Ot(t, e, l), Za(t, e, l));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = Ct(),
        l = Mn(n);
      (l.tag = 2),
        t != null && (l.callback = t),
        (t = Nn(e, l, n)),
        t !== null && (Ot(t, e, n), Za(t, e, n));
    },
  };
  function jd(e, t, n, l, i, r, f) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(l, r, f)
        : t.prototype && t.prototype.isPureReactComponent
        ? !Ha(n, l) || !Ha(i, r)
        : !0
    );
  }
  function Ud(e, t, n, l) {
    (e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(n, l),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(n, l),
      t.state !== e && Hc.enqueueReplaceState(t, t.state, null);
  }
  function yl(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var l in t) l !== "ref" && (n[l] = t[l]);
    }
    if ((e = e.defaultProps)) {
      n === t && (n = y({}, n));
      for (var i in e) n[i] === void 0 && (n[i] = e[i]);
    }
    return n;
  }
  var vr =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var t = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e == "object" &&
                e !== null &&
                typeof e.message == "string"
                  ? String(e.message)
                  : String(e),
              error: e,
            });
            if (!window.dispatchEvent(t)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", e);
            return;
          }
          console.error(e);
        };
  function Hd(e) {
    vr(e);
  }
  function Ld(e) {
    console.error(e);
  }
  function Bd(e) {
    vr(e);
  }
  function gr(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function () {
        throw l;
      });
    }
  }
  function Yd(e, t, n) {
    try {
      var l = e.onCaughtError;
      l(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (i) {
      setTimeout(function () {
        throw i;
      });
    }
  }
  function Lc(e, t, n) {
    return (
      (n = Mn(n)),
      (n.tag = 3),
      (n.payload = { element: null }),
      (n.callback = function () {
        gr(e, t);
      }),
      n
    );
  }
  function Vd(e) {
    return (e = Mn(e)), (e.tag = 3), e;
  }
  function qd(e, t, n, l) {
    var i = n.type.getDerivedStateFromError;
    if (typeof i == "function") {
      var r = l.value;
      (e.payload = function () {
        return i(r);
      }),
        (e.callback = function () {
          Yd(t, n, l);
        });
    }
    var f = n.stateNode;
    f !== null &&
      typeof f.componentDidCatch == "function" &&
      (e.callback = function () {
        Yd(t, n, l),
          typeof i != "function" &&
            (Yn === null ? (Yn = new Set([this])) : Yn.add(this));
        var p = l.stack;
        this.componentDidCatch(l.value, {
          componentStack: p !== null ? p : "",
        });
      });
  }
  function Ty(e, t, n, l, i) {
    if (
      ((n.flags |= 32768),
      l !== null && typeof l == "object" && typeof l.then == "function")
    ) {
      if (
        ((t = n.alternate),
        t !== null && qa(t, n, i, !0),
        (n = Bt.current),
        n !== null)
      ) {
        switch (n.tag) {
          case 13:
            return (
              Wt === null ? ou() : n.alternate === null && Xe === 0 && (Xe = 3),
              (n.flags &= -257),
              (n.flags |= 65536),
              (n.lanes = i),
              l === dc
                ? (n.flags |= 16384)
                : ((t = n.updateQueue),
                  t === null ? (n.updateQueue = new Set([l])) : t.add(l),
                  uu(e, l, i)),
              !1
            );
          case 22:
            return (
              (n.flags |= 65536),
              l === dc
                ? (n.flags |= 16384)
                : ((t = n.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([l]),
                      }),
                      (n.updateQueue = t))
                    : ((n = t.retryQueue),
                      n === null ? (t.retryQueue = new Set([l])) : n.add(l)),
                  uu(e, l, i)),
              !1
            );
        }
        throw Error(c(435, n.tag));
      }
      return uu(e, l, i), ou(), !1;
    }
    if (Me)
      return (
        (t = Bt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = i),
            l !== ic && ((e = Error(c(422), { cause: l })), Va(jt(e, n))))
          : (l !== ic && ((t = Error(c(423), { cause: l })), Va(jt(t, n))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (i &= -i),
            (e.lanes |= i),
            (l = jt(l, n)),
            (i = Lc(e.stateNode, l, i)),
            vc(e, i),
            Xe !== 4 && (Xe = 2)),
        !1
      );
    var r = Error(c(520), { cause: l });
    if (
      ((r = jt(r, n)),
      oi === null ? (oi = [r]) : oi.push(r),
      Xe !== 4 && (Xe = 2),
      t === null)
    )
      return !0;
    (l = jt(l, n)), (n = t);
    do {
      switch (n.tag) {
        case 3:
          return (
            (n.flags |= 65536),
            (e = i & -i),
            (n.lanes |= e),
            (e = Lc(n.stateNode, l, e)),
            vc(n, e),
            !1
          );
        case 1:
          if (
            ((t = n.type),
            (r = n.stateNode),
            (n.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (r !== null &&
                  typeof r.componentDidCatch == "function" &&
                  (Yn === null || !Yn.has(r)))))
          )
            return (
              (n.flags |= 65536),
              (i &= -i),
              (n.lanes |= i),
              (i = Vd(i)),
              qd(i, e, n, l),
              vc(n, i),
              !1
            );
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var kd = Error(c(461)),
    Ie = !1;
  function lt(e, t, n, l) {
    t.child = e === null ? zd(t, null, n, l) : $l(t, e.child, n, l);
  }
  function Gd(e, t, n, l, i) {
    n = n.render;
    var r = t.ref;
    if ("ref" in l) {
      var f = {};
      for (var p in l) p !== "ref" && (f[p] = l[p]);
    } else f = l;
    return (
      vl(t),
      (l = Sc(e, t, n, f, r, i)),
      (p = xc()),
      e !== null && !Ie
        ? (wc(e, t, i), vn(e, t, i))
        : (Me && p && lc(t), (t.flags |= 1), lt(e, t, l, i), t.child)
    );
  }
  function Xd(e, t, n, l, i) {
    if (e === null) {
      var r = n.type;
      return typeof r == "function" &&
        !ec(r) &&
        r.defaultProps === void 0 &&
        n.compare === null
        ? ((t.tag = 15), (t.type = r), Qd(e, t, r, l, i))
        : ((e = Wi(n.type, null, l, t, t.mode, i)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((r = e.child), !Qc(e, i))) {
      var f = r.memoizedProps;
      if (
        ((n = n.compare), (n = n !== null ? n : Ha), n(f, l) && e.ref === t.ref)
      )
        return vn(e, t, i);
    }
    return (
      (t.flags |= 1),
      (e = cn(r, l)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Qd(e, t, n, l, i) {
    if (e !== null) {
      var r = e.memoizedProps;
      if (Ha(r, l) && e.ref === t.ref)
        if (((Ie = !1), (t.pendingProps = l = r), Qc(e, i)))
          (e.flags & 131072) !== 0 && (Ie = !0);
        else return (t.lanes = e.lanes), vn(e, t, i);
    }
    return Bc(e, t, n, l, i);
  }
  function Zd(e, t, n) {
    var l = t.pendingProps,
      i = l.children,
      r = e !== null ? e.memoizedState : null;
    if (l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (((l = r !== null ? r.baseLanes | n : n), e !== null)) {
          for (i = t.child = e.child, r = 0; i !== null; )
            (r = r | i.lanes | i.childLanes), (i = i.sibling);
          t.childLanes = r & ~l;
        } else (t.childLanes = 0), (t.child = null);
        return Kd(e, t, l, n);
      }
      if ((n & 536870912) !== 0)
        (t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && er(t, r !== null ? r.cachePool : null),
          r !== null ? Qf(t, r) : pc(),
          Dd(t);
      else
        return (
          (t.lanes = t.childLanes = 536870912),
          Kd(e, t, r !== null ? r.baseLanes | n : n, n)
        );
    } else
      r !== null
        ? (er(t, r.cachePool), Qf(t, r), Dn(), (t.memoizedState = null))
        : (e !== null && er(t, null), pc(), Dn());
    return lt(e, t, i, n), t.child;
  }
  function Kd(e, t, n, l) {
    var i = fc();
    return (
      (i = i === null ? null : { parent: We._currentValue, pool: i }),
      (t.memoizedState = { baseLanes: n, cachePool: i }),
      e !== null && er(t, null),
      pc(),
      Dd(t),
      e !== null && qa(e, t, l, !0),
      null
    );
  }
  function pr(e, t) {
    var n = t.ref;
    if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object") throw Error(c(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function Bc(e, t, n, l, i) {
    return (
      vl(t),
      (n = Sc(e, t, n, l, void 0, i)),
      (l = xc()),
      e !== null && !Ie
        ? (wc(e, t, i), vn(e, t, i))
        : (Me && l && lc(t), (t.flags |= 1), lt(e, t, n, i), t.child)
    );
  }
  function Jd(e, t, n, l, i, r) {
    return (
      vl(t),
      (t.updateQueue = null),
      (n = Kf(t, l, n, i)),
      Zf(e),
      (l = xc()),
      e !== null && !Ie
        ? (wc(e, t, r), vn(e, t, r))
        : (Me && l && lc(t), (t.flags |= 1), lt(e, t, n, r), t.child)
    );
  }
  function Wd(e, t, n, l, i) {
    if ((vl(t), t.stateNode === null)) {
      var r = ql,
        f = n.contextType;
      typeof f == "object" && f !== null && (r = ut(f)),
        (r = new n(l, r)),
        (t.memoizedState =
          r.state !== null && r.state !== void 0 ? r.state : null),
        (r.updater = Hc),
        (t.stateNode = r),
        (r._reactInternals = t),
        (r = t.stateNode),
        (r.props = l),
        (r.state = t.memoizedState),
        (r.refs = {}),
        mc(t),
        (f = n.contextType),
        (r.context = typeof f == "object" && f !== null ? ut(f) : ql),
        (r.state = t.memoizedState),
        (f = n.getDerivedStateFromProps),
        typeof f == "function" && (Uc(t, n, f, l), (r.state = t.memoizedState)),
        typeof n.getDerivedStateFromProps == "function" ||
          typeof r.getSnapshotBeforeUpdate == "function" ||
          (typeof r.UNSAFE_componentWillMount != "function" &&
            typeof r.componentWillMount != "function") ||
          ((f = r.state),
          typeof r.componentWillMount == "function" && r.componentWillMount(),
          typeof r.UNSAFE_componentWillMount == "function" &&
            r.UNSAFE_componentWillMount(),
          f !== r.state && Hc.enqueueReplaceState(r, r.state, null),
          Ja(t, l, r, i),
          Ka(),
          (r.state = t.memoizedState)),
        typeof r.componentDidMount == "function" && (t.flags |= 4194308),
        (l = !0);
    } else if (e === null) {
      r = t.stateNode;
      var p = t.memoizedProps,
        x = yl(n, p);
      r.props = x;
      var z = r.context,
        V = n.contextType;
      (f = ql), typeof V == "object" && V !== null && (f = ut(V));
      var Z = n.getDerivedStateFromProps;
      (V =
        typeof Z == "function" ||
        typeof r.getSnapshotBeforeUpdate == "function"),
        (p = t.pendingProps !== p),
        V ||
          (typeof r.UNSAFE_componentWillReceiveProps != "function" &&
            typeof r.componentWillReceiveProps != "function") ||
          ((p || z !== f) && Ud(t, r, l, f)),
        (On = !1);
      var j = t.memoizedState;
      (r.state = j),
        Ja(t, l, r, i),
        Ka(),
        (z = t.memoizedState),
        p || j !== z || On
          ? (typeof Z == "function" && (Uc(t, n, Z, l), (z = t.memoizedState)),
            (x = On || jd(t, n, x, l, j, z, f))
              ? (V ||
                  (typeof r.UNSAFE_componentWillMount != "function" &&
                    typeof r.componentWillMount != "function") ||
                  (typeof r.componentWillMount == "function" &&
                    r.componentWillMount(),
                  typeof r.UNSAFE_componentWillMount == "function" &&
                    r.UNSAFE_componentWillMount()),
                typeof r.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof r.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = l),
                (t.memoizedState = z)),
            (r.props = l),
            (r.state = z),
            (r.context = f),
            (l = x))
          : (typeof r.componentDidMount == "function" && (t.flags |= 4194308),
            (l = !1));
    } else {
      (r = t.stateNode),
        hc(e, t),
        (f = t.memoizedProps),
        (V = yl(n, f)),
        (r.props = V),
        (Z = t.pendingProps),
        (j = r.context),
        (z = n.contextType),
        (x = ql),
        typeof z == "object" && z !== null && (x = ut(z)),
        (p = n.getDerivedStateFromProps),
        (z =
          typeof p == "function" ||
          typeof r.getSnapshotBeforeUpdate == "function") ||
          (typeof r.UNSAFE_componentWillReceiveProps != "function" &&
            typeof r.componentWillReceiveProps != "function") ||
          ((f !== Z || j !== x) && Ud(t, r, l, x)),
        (On = !1),
        (j = t.memoizedState),
        (r.state = j),
        Ja(t, l, r, i),
        Ka();
      var U = t.memoizedState;
      f !== Z ||
      j !== U ||
      On ||
      (e !== null && e.dependencies !== null && Fi(e.dependencies))
        ? (typeof p == "function" && (Uc(t, n, p, l), (U = t.memoizedState)),
          (V =
            On ||
            jd(t, n, V, l, j, U, x) ||
            (e !== null && e.dependencies !== null && Fi(e.dependencies)))
            ? (z ||
                (typeof r.UNSAFE_componentWillUpdate != "function" &&
                  typeof r.componentWillUpdate != "function") ||
                (typeof r.componentWillUpdate == "function" &&
                  r.componentWillUpdate(l, U, x),
                typeof r.UNSAFE_componentWillUpdate == "function" &&
                  r.UNSAFE_componentWillUpdate(l, U, x)),
              typeof r.componentDidUpdate == "function" && (t.flags |= 4),
              typeof r.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof r.componentDidUpdate != "function" ||
                (f === e.memoizedProps && j === e.memoizedState) ||
                (t.flags |= 4),
              typeof r.getSnapshotBeforeUpdate != "function" ||
                (f === e.memoizedProps && j === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = l),
              (t.memoizedState = U)),
          (r.props = l),
          (r.state = U),
          (r.context = x),
          (l = V))
        : (typeof r.componentDidUpdate != "function" ||
            (f === e.memoizedProps && j === e.memoizedState) ||
            (t.flags |= 4),
          typeof r.getSnapshotBeforeUpdate != "function" ||
            (f === e.memoizedProps && j === e.memoizedState) ||
            (t.flags |= 1024),
          (l = !1));
    }
    return (
      (r = l),
      pr(e, t),
      (l = (t.flags & 128) !== 0),
      r || l
        ? ((r = t.stateNode),
          (n =
            l && typeof n.getDerivedStateFromError != "function"
              ? null
              : r.render()),
          (t.flags |= 1),
          e !== null && l
            ? ((t.child = $l(t, e.child, null, i)),
              (t.child = $l(t, null, n, i)))
            : lt(e, t, n, i),
          (t.memoizedState = r.state),
          (e = t.child))
        : (e = vn(e, t, i)),
      e
    );
  }
  function Pd(e, t, n, l) {
    return Ya(), (t.flags |= 256), lt(e, t, n, l), t.child;
  }
  var Yc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function Vc(e) {
    return { baseLanes: e, cachePool: Lf() };
  }
  function qc(e, t, n) {
    return (e = e !== null ? e.childLanes & ~n : 0), t && (e |= Yt), e;
  }
  function $d(e, t, n) {
    var l = t.pendingProps,
      i = !1,
      r = (t.flags & 128) !== 0,
      f;
    if (
      ((f = r) ||
        (f =
          e !== null && e.memoizedState === null ? !1 : (Pe.current & 2) !== 0),
      f && ((i = !0), (t.flags &= -129)),
      (f = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (Me) {
        if ((i ? zn(t) : Dn(), Me)) {
          var p = Ge,
            x;
          if ((x = p)) {
            e: {
              for (x = p, p = Jt; x.nodeType !== 8; ) {
                if (!p) {
                  p = null;
                  break e;
                }
                if (((x = Xt(x.nextSibling)), x === null)) {
                  p = null;
                  break e;
                }
              }
              p = x;
            }
            p !== null
              ? ((t.memoizedState = {
                  dehydrated: p,
                  treeContext: sl !== null ? { id: un, overflow: sn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (x = Et(18, null, null, 0)),
                (x.stateNode = p),
                (x.return = t),
                (t.child = x),
                (dt = t),
                (Ge = null),
                (x = !0))
              : (x = !1);
          }
          x || ml(t);
        }
        if (
          ((p = t.memoizedState),
          p !== null && ((p = p.dehydrated), p !== null))
        )
          return Au(p) ? (t.lanes = 32) : (t.lanes = 536870912), null;
        hn(t);
      }
      return (
        (p = l.children),
        (l = l.fallback),
        i
          ? (Dn(),
            (i = t.mode),
            (p = yr({ mode: "hidden", children: p }, i)),
            (l = ul(l, i, n, null)),
            (p.return = t),
            (l.return = t),
            (p.sibling = l),
            (t.child = p),
            (i = t.child),
            (i.memoizedState = Vc(n)),
            (i.childLanes = qc(e, f, n)),
            (t.memoizedState = Yc),
            l)
          : (zn(t), kc(t, p))
      );
    }
    if (
      ((x = e.memoizedState), x !== null && ((p = x.dehydrated), p !== null))
    ) {
      if (r)
        t.flags & 256
          ? (zn(t), (t.flags &= -257), (t = Gc(e, t, n)))
          : t.memoizedState !== null
          ? (Dn(), (t.child = e.child), (t.flags |= 128), (t = null))
          : (Dn(),
            (i = l.fallback),
            (p = t.mode),
            (l = yr({ mode: "visible", children: l.children }, p)),
            (i = ul(i, p, n, null)),
            (i.flags |= 2),
            (l.return = t),
            (i.return = t),
            (l.sibling = i),
            (t.child = l),
            $l(t, e.child, null, n),
            (l = t.child),
            (l.memoizedState = Vc(n)),
            (l.childLanes = qc(e, f, n)),
            (t.memoizedState = Yc),
            (t = i));
      else if ((zn(t), Au(p))) {
        if (((f = p.nextSibling && p.nextSibling.dataset), f)) var z = f.dgst;
        (f = z),
          (l = Error(c(419))),
          (l.stack = ""),
          (l.digest = f),
          Va({ value: l, source: null, stack: null }),
          (t = Gc(e, t, n));
      } else if (
        (Ie || qa(e, t, n, !1), (f = (n & e.childLanes) !== 0), Ie || f)
      ) {
        if (
          ((f = Be),
          f !== null &&
            ((l = n & -n),
            (l = (l & 42) !== 0 ? 1 : To(l)),
            (l = (l & (f.suspendedLanes | n)) !== 0 ? 0 : l),
            l !== 0 && l !== x.retryLane))
        )
          throw ((x.retryLane = l), Vl(e, l), Ot(f, e, l), kd);
        p.data === "$?" || ou(), (t = Gc(e, t, n));
      } else
        p.data === "$?"
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = x.treeContext),
            (Ge = Xt(p.nextSibling)),
            (dt = t),
            (Me = !0),
            (dl = null),
            (Jt = !1),
            e !== null &&
              ((Ht[Lt++] = un),
              (Ht[Lt++] = sn),
              (Ht[Lt++] = sl),
              (un = e.id),
              (sn = e.overflow),
              (sl = t)),
            (t = kc(t, l.children)),
            (t.flags |= 4096));
      return t;
    }
    return i
      ? (Dn(),
        (i = l.fallback),
        (p = t.mode),
        (x = e.child),
        (z = x.sibling),
        (l = cn(x, { mode: "hidden", children: l.children })),
        (l.subtreeFlags = x.subtreeFlags & 65011712),
        z !== null ? (i = cn(z, i)) : ((i = ul(i, p, n, null)), (i.flags |= 2)),
        (i.return = t),
        (l.return = t),
        (l.sibling = i),
        (t.child = l),
        (l = i),
        (i = t.child),
        (p = e.child.memoizedState),
        p === null
          ? (p = Vc(n))
          : ((x = p.cachePool),
            x !== null
              ? ((z = We._currentValue),
                (x = x.parent !== z ? { parent: z, pool: z } : x))
              : (x = Lf()),
            (p = { baseLanes: p.baseLanes | n, cachePool: x })),
        (i.memoizedState = p),
        (i.childLanes = qc(e, f, n)),
        (t.memoizedState = Yc),
        l)
      : (zn(t),
        (n = e.child),
        (e = n.sibling),
        (n = cn(n, { mode: "visible", children: l.children })),
        (n.return = t),
        (n.sibling = null),
        e !== null &&
          ((f = t.deletions),
          f === null ? ((t.deletions = [e]), (t.flags |= 16)) : f.push(e)),
        (t.child = n),
        (t.memoizedState = null),
        n);
  }
  function kc(e, t) {
    return (
      (t = yr({ mode: "visible", children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function yr(e, t) {
    return (
      (e = Et(22, e, null, t)),
      (e.lanes = 0),
      (e.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
      e
    );
  }
  function Gc(e, t, n) {
    return (
      $l(t, e.child, null, n),
      (e = kc(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Fd(e, t, n) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), oc(e.return, t, n);
  }
  function Xc(e, t, n, l, i) {
    var r = e.memoizedState;
    r === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: l,
          tail: n,
          tailMode: i,
        })
      : ((r.isBackwards = t),
        (r.rendering = null),
        (r.renderingStartTime = 0),
        (r.last = l),
        (r.tail = n),
        (r.tailMode = i));
  }
  function Id(e, t, n) {
    var l = t.pendingProps,
      i = l.revealOrder,
      r = l.tail;
    if ((lt(e, t, l.children, n), (l = Pe.current), (l & 2) !== 0))
      (l = (l & 1) | 2), (t.flags |= 128);
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && Fd(e, n, t);
          else if (e.tag === 19) Fd(e, n, t);
          else if (e.child !== null) {
            (e.child.return = e), (e = e.child);
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          (e.sibling.return = e.return), (e = e.sibling);
        }
      l &= 1;
    }
    switch ((W(Pe, l), i)) {
      case "forwards":
        for (n = t.child, i = null; n !== null; )
          (e = n.alternate),
            e !== null && hr(e) === null && (i = n),
            (n = n.sibling);
        (n = i),
          n === null
            ? ((i = t.child), (t.child = null))
            : ((i = n.sibling), (n.sibling = null)),
          Xc(t, !1, i, n, r);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && hr(e) === null)) {
            t.child = i;
            break;
          }
          (e = i.sibling), (i.sibling = n), (n = i), (i = e);
        }
        Xc(t, !0, n, null, r);
        break;
      case "together":
        Xc(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function vn(e, t, n) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (Bn |= t.lanes),
      (n & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((qa(e, t, n, !1), (n & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(c(153));
    if (t.child !== null) {
      for (
        e = t.child, n = cn(e, e.pendingProps), t.child = n, n.return = t;
        e.sibling !== null;

      )
        (e = e.sibling),
          (n = n.sibling = cn(e, e.pendingProps)),
          (n.return = t);
      n.sibling = null;
    }
    return t.child;
  }
  function Qc(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && Fi(e)));
  }
  function Ry(e, t, n) {
    switch (t.tag) {
      case 3:
        fe(t, t.stateNode.containerInfo),
          Cn(t, We, e.memoizedState.cache),
          Ya();
        break;
      case 27:
      case 5:
        Re(t);
        break;
      case 4:
        fe(t, t.stateNode.containerInfo);
        break;
      case 10:
        Cn(t, t.type, t.memoizedProps.value);
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null
            ? (zn(t), (t.flags |= 128), null)
            : (n & t.child.childLanes) !== 0
            ? $d(e, t, n)
            : (zn(t), (e = vn(e, t, n)), e !== null ? e.sibling : null);
        zn(t);
        break;
      case 19:
        var i = (e.flags & 128) !== 0;
        if (
          ((l = (n & t.childLanes) !== 0),
          l || (qa(e, t, n, !1), (l = (n & t.childLanes) !== 0)),
          i)
        ) {
          if (l) return Id(e, t, n);
          t.flags |= 128;
        }
        if (
          ((i = t.memoizedState),
          i !== null &&
            ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
          W(Pe, Pe.current),
          l)
        )
          break;
        return null;
      case 22:
      case 23:
        return (t.lanes = 0), Zd(e, t, n);
      case 24:
        Cn(t, We, e.memoizedState.cache);
    }
    return vn(e, t, n);
  }
  function em(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) Ie = !0;
      else {
        if (!Qc(e, n) && (t.flags & 128) === 0) return (Ie = !1), Ry(e, t, n);
        Ie = (e.flags & 131072) !== 0;
      }
    else (Ie = !1), Me && (t.flags & 1048576) !== 0 && Nf(t, $i, t.index);
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          e = t.pendingProps;
          var l = t.elementType,
            i = l._init;
          if (((l = i(l._payload)), (t.type = l), typeof l == "function"))
            ec(l)
              ? ((e = yl(l, e)), (t.tag = 1), (t = Wd(null, t, l, e, n)))
              : ((t.tag = 0), (t = Bc(null, t, l, e, n)));
          else {
            if (l != null) {
              if (((i = l.$$typeof), i === K)) {
                (t.tag = 11), (t = Gd(null, t, l, e, n));
                break e;
              } else if (i === X) {
                (t.tag = 14), (t = Xd(null, t, l, e, n));
                break e;
              }
            }
            throw ((t = ne(l) || l), Error(c(306, t, "")));
          }
        }
        return t;
      case 0:
        return Bc(e, t, t.type, t.pendingProps, n);
      case 1:
        return (l = t.type), (i = yl(l, t.pendingProps)), Wd(e, t, l, i, n);
      case 3:
        e: {
          if ((fe(t, t.stateNode.containerInfo), e === null))
            throw Error(c(387));
          l = t.pendingProps;
          var r = t.memoizedState;
          (i = r.element), hc(e, t), Ja(t, l, null, n);
          var f = t.memoizedState;
          if (
            ((l = f.cache),
            Cn(t, We, l),
            l !== r.cache && cc(t, [We], n, !0),
            Ka(),
            (l = f.element),
            r.isDehydrated)
          )
            if (
              ((r = { element: l, isDehydrated: !1, cache: f.cache }),
              (t.updateQueue.baseState = r),
              (t.memoizedState = r),
              t.flags & 256)
            ) {
              t = Pd(e, t, l, n);
              break e;
            } else if (l !== i) {
              (i = jt(Error(c(424)), t)), Va(i), (t = Pd(e, t, l, n));
              break e;
            } else {
              switch (((e = t.stateNode.containerInfo), e.nodeType)) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (
                Ge = Xt(e.firstChild),
                  dt = t,
                  Me = !0,
                  dl = null,
                  Jt = !0,
                  n = zd(t, null, l, n),
                  t.child = n;
                n;

              )
                (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
            }
          else {
            if ((Ya(), l === i)) {
              t = vn(e, t, n);
              break e;
            }
            lt(e, t, l, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          pr(e, t),
          e === null
            ? (n = ah(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = n)
              : Me ||
                ((n = t.type),
                (e = t.pendingProps),
                (l = zr(se.current).createElement(n)),
                (l[ct] = t),
                (l[ht] = e),
                it(l, n, e),
                Fe(l),
                (t.stateNode = l))
            : (t.memoizedState = ah(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState
              )),
          null
        );
      case 27:
        return (
          Re(t),
          e === null &&
            Me &&
            ((l = t.stateNode = th(t.type, t.pendingProps, se.current)),
            (dt = t),
            (Jt = !0),
            (i = Ge),
            kn(t.type) ? ((Tu = i), (Ge = Xt(l.firstChild))) : (Ge = i)),
          lt(e, t, t.pendingProps.children, n),
          pr(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            Me &&
            ((i = l = Ge) &&
              ((l = e0(l, t.type, t.pendingProps, Jt)),
              l !== null
                ? ((t.stateNode = l),
                  (dt = t),
                  (Ge = Xt(l.firstChild)),
                  (Jt = !1),
                  (i = !0))
                : (i = !1)),
            i || ml(t)),
          Re(t),
          (i = t.type),
          (r = t.pendingProps),
          (f = e !== null ? e.memoizedProps : null),
          (l = r.children),
          xu(i, r) ? (l = null) : f !== null && xu(i, f) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((i = Sc(e, t, yy, null, null, n)), (gi._currentValue = i)),
          pr(e, t),
          lt(e, t, l, n),
          t.child
        );
      case 6:
        return (
          e === null &&
            Me &&
            ((e = n = Ge) &&
              ((n = t0(n, t.pendingProps, Jt)),
              n !== null
                ? ((t.stateNode = n), (dt = t), (Ge = null), (e = !0))
                : (e = !1)),
            e || ml(t)),
          null
        );
      case 13:
        return $d(e, t, n);
      case 4:
        return (
          fe(t, t.stateNode.containerInfo),
          (l = t.pendingProps),
          e === null ? (t.child = $l(t, null, l, n)) : lt(e, t, l, n),
          t.child
        );
      case 11:
        return Gd(e, t, t.type, t.pendingProps, n);
      case 7:
        return lt(e, t, t.pendingProps, n), t.child;
      case 8:
        return lt(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return lt(e, t, t.pendingProps.children, n), t.child;
      case 10:
        return (
          (l = t.pendingProps),
          Cn(t, t.type, l.value),
          lt(e, t, l.children, n),
          t.child
        );
      case 9:
        return (
          (i = t.type._context),
          (l = t.pendingProps.children),
          vl(t),
          (i = ut(i)),
          (l = l(i)),
          (t.flags |= 1),
          lt(e, t, l, n),
          t.child
        );
      case 14:
        return Xd(e, t, t.type, t.pendingProps, n);
      case 15:
        return Qd(e, t, t.type, t.pendingProps, n);
      case 19:
        return Id(e, t, n);
      case 31:
        return (
          (l = t.pendingProps),
          (n = t.mode),
          (l = { mode: l.mode, children: l.children }),
          e === null
            ? ((n = yr(l, n)),
              (n.ref = t.ref),
              (t.child = n),
              (n.return = t),
              (t = n))
            : ((n = cn(e.child, l)),
              (n.ref = t.ref),
              (t.child = n),
              (n.return = t),
              (t = n)),
          t
        );
      case 22:
        return Zd(e, t, n);
      case 24:
        return (
          vl(t),
          (l = ut(We)),
          e === null
            ? ((i = fc()),
              i === null &&
                ((i = Be),
                (r = uc()),
                (i.pooledCache = r),
                r.refCount++,
                r !== null && (i.pooledCacheLanes |= n),
                (i = r)),
              (t.memoizedState = { parent: l, cache: i }),
              mc(t),
              Cn(t, We, i))
            : ((e.lanes & n) !== 0 && (hc(e, t), Ja(t, null, null, n), Ka()),
              (i = e.memoizedState),
              (r = t.memoizedState),
              i.parent !== l
                ? ((i = { parent: l, cache: l }),
                  (t.memoizedState = i),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = i),
                  Cn(t, We, l))
                : ((l = r.cache),
                  Cn(t, We, l),
                  l !== i.cache && cc(t, [We], n, !0))),
          lt(e, t, t.pendingProps.children, n),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(c(156, t.tag));
  }
  function gn(e) {
    e.flags |= 4;
  }
  function tm(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !uh(t))) {
      if (
        ((t = Bt.current),
        t !== null &&
          ((Ce & 4194048) === Ce
            ? Wt !== null
            : ((Ce & 62914560) !== Ce && (Ce & 536870912) === 0) || t !== Wt))
      )
        throw ((Qa = dc), Bf);
      e.flags |= 8192;
    }
  }
  function br(e, t) {
    t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? zs() : 536870912), (e.lanes |= t), (ta |= t));
  }
  function ti(e, t) {
    if (!Me)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            t.alternate !== null && (n = t), (t = t.sibling);
          n === null ? (e.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = e.tail;
          for (var l = null; n !== null; )
            n.alternate !== null && (l = n), (n = n.sibling);
          l === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (l.sibling = null);
      }
  }
  function ke(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      l = 0;
    if (t)
      for (var i = e.child; i !== null; )
        (n |= i.lanes | i.childLanes),
          (l |= i.subtreeFlags & 65011712),
          (l |= i.flags & 65011712),
          (i.return = e),
          (i = i.sibling);
    else
      for (i = e.child; i !== null; )
        (n |= i.lanes | i.childLanes),
          (l |= i.subtreeFlags),
          (l |= i.flags),
          (i.return = e),
          (i = i.sibling);
    return (e.subtreeFlags |= l), (e.childLanes = n), t;
  }
  function Cy(e, t, n) {
    var l = t.pendingProps;
    switch ((ac(t), t.tag)) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return ke(t), null;
      case 1:
        return ke(t), null;
      case 3:
        return (
          (n = t.stateNode),
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          dn(We),
          Ne(),
          n.pendingContext &&
            ((n.context = n.pendingContext), (n.pendingContext = null)),
          (e === null || e.child === null) &&
            (Ba(t)
              ? gn(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Df())),
          ke(t),
          null
        );
      case 26:
        return (
          (n = t.memoizedState),
          e === null
            ? (gn(t),
              n !== null ? (ke(t), tm(t, n)) : (ke(t), (t.flags &= -16777217)))
            : n
            ? n !== e.memoizedState
              ? (gn(t), ke(t), tm(t, n))
              : (ke(t), (t.flags &= -16777217))
            : (e.memoizedProps !== l && gn(t), ke(t), (t.flags &= -16777217)),
          null
        );
      case 27:
        we(t), (n = se.current);
        var i = t.type;
        if (e !== null && t.stateNode != null) e.memoizedProps !== l && gn(t);
        else {
          if (!l) {
            if (t.stateNode === null) throw Error(c(166));
            return ke(t), null;
          }
          (e = ee.current),
            Ba(t) ? _f(t) : ((e = th(i, l, n)), (t.stateNode = e), gn(t));
        }
        return ke(t), null;
      case 5:
        if ((we(t), (n = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== l && gn(t);
        else {
          if (!l) {
            if (t.stateNode === null) throw Error(c(166));
            return ke(t), null;
          }
          if (((e = ee.current), Ba(t))) _f(t);
          else {
            switch (((i = zr(se.current)), e)) {
              case 1:
                e = i.createElementNS("http://www.w3.org/2000/svg", n);
                break;
              case 2:
                e = i.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                break;
              default:
                switch (n) {
                  case "svg":
                    e = i.createElementNS("http://www.w3.org/2000/svg", n);
                    break;
                  case "math":
                    e = i.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    );
                    break;
                  case "script":
                    (e = i.createElement("div")),
                      (e.innerHTML = "<script></script>"),
                      (e = e.removeChild(e.firstChild));
                    break;
                  case "select":
                    (e =
                      typeof l.is == "string"
                        ? i.createElement("select", { is: l.is })
                        : i.createElement("select")),
                      l.multiple
                        ? (e.multiple = !0)
                        : l.size && (e.size = l.size);
                    break;
                  default:
                    e =
                      typeof l.is == "string"
                        ? i.createElement(n, { is: l.is })
                        : i.createElement(n);
                }
            }
            (e[ct] = t), (e[ht] = l);
            e: for (i = t.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6) e.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                (i.child.return = i), (i = i.child);
                continue;
              }
              if (i === t) break e;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === t) break e;
                i = i.return;
              }
              (i.sibling.return = i.return), (i = i.sibling);
            }
            t.stateNode = e;
            e: switch ((it(e, n, l), n)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!l.autoFocus;
                break e;
              case "img":
                e = !0;
                break e;
              default:
                e = !1;
            }
            e && gn(t);
          }
        }
        return ke(t), (t.flags &= -16777217), null;
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== l && gn(t);
        else {
          if (typeof l != "string" && t.stateNode === null) throw Error(c(166));
          if (((e = se.current), Ba(t))) {
            if (
              ((e = t.stateNode),
              (n = t.memoizedProps),
              (l = null),
              (i = dt),
              i !== null)
            )
              switch (i.tag) {
                case 27:
                case 5:
                  l = i.memoizedProps;
              }
            (e[ct] = t),
              (e = !!(
                e.nodeValue === n ||
                (l !== null && l.suppressHydrationWarning === !0) ||
                Jm(e.nodeValue, n)
              )),
              e || ml(t);
          } else (e = zr(e).createTextNode(l)), (e[ct] = t), (t.stateNode = e);
        }
        return ke(t), null;
      case 13:
        if (
          ((l = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((i = Ba(t)), l !== null && l.dehydrated !== null)) {
            if (e === null) {
              if (!i) throw Error(c(318));
              if (
                ((i = t.memoizedState),
                (i = i !== null ? i.dehydrated : null),
                !i)
              )
                throw Error(c(317));
              i[ct] = t;
            } else
              Ya(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4);
            ke(t), (i = !1);
          } else
            (i = Df()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = i),
              (i = !0);
          if (!i) return t.flags & 256 ? (hn(t), t) : (hn(t), null);
        }
        if ((hn(t), (t.flags & 128) !== 0)) return (t.lanes = n), t;
        if (
          ((n = l !== null), (e = e !== null && e.memoizedState !== null), n)
        ) {
          (l = t.child),
            (i = null),
            l.alternate !== null &&
              l.alternate.memoizedState !== null &&
              l.alternate.memoizedState.cachePool !== null &&
              (i = l.alternate.memoizedState.cachePool.pool);
          var r = null;
          l.memoizedState !== null &&
            l.memoizedState.cachePool !== null &&
            (r = l.memoizedState.cachePool.pool),
            r !== i && (l.flags |= 2048);
        }
        return (
          n !== e && n && (t.child.flags |= 8192),
          br(t, t.updateQueue),
          ke(t),
          null
        );
      case 4:
        return Ne(), e === null && gu(t.stateNode.containerInfo), ke(t), null;
      case 10:
        return dn(t.type), ke(t), null;
      case 19:
        if ((F(Pe), (i = t.memoizedState), i === null)) return ke(t), null;
        if (((l = (t.flags & 128) !== 0), (r = i.rendering), r === null))
          if (l) ti(i, !1);
          else {
            if (Xe !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((r = hr(e)), r !== null)) {
                  for (
                    t.flags |= 128,
                      ti(i, !1),
                      e = r.updateQueue,
                      t.updateQueue = e,
                      br(t, e),
                      t.subtreeFlags = 0,
                      e = n,
                      n = t.child;
                    n !== null;

                  )
                    Mf(n, e), (n = n.sibling);
                  return W(Pe, (Pe.current & 1) | 2), t.child;
                }
                e = e.sibling;
              }
            i.tail !== null &&
              ot() > wr &&
              ((t.flags |= 128), (l = !0), ti(i, !1), (t.lanes = 4194304));
          }
        else {
          if (!l)
            if (((e = hr(r)), e !== null)) {
              if (
                ((t.flags |= 128),
                (l = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                br(t, e),
                ti(i, !0),
                i.tail === null &&
                  i.tailMode === "hidden" &&
                  !r.alternate &&
                  !Me)
              )
                return ke(t), null;
            } else
              2 * ot() - i.renderingStartTime > wr &&
                n !== 536870912 &&
                ((t.flags |= 128), (l = !0), ti(i, !1), (t.lanes = 4194304));
          i.isBackwards
            ? ((r.sibling = t.child), (t.child = r))
            : ((e = i.last),
              e !== null ? (e.sibling = r) : (t.child = r),
              (i.last = r));
        }
        return i.tail !== null
          ? ((t = i.tail),
            (i.rendering = t),
            (i.tail = t.sibling),
            (i.renderingStartTime = ot()),
            (t.sibling = null),
            (e = Pe.current),
            W(Pe, l ? (e & 1) | 2 : e & 1),
            t)
          : (ke(t), null);
      case 22:
      case 23:
        return (
          hn(t),
          yc(),
          (l = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== l && (t.flags |= 8192)
            : l && (t.flags |= 8192),
          l
            ? (n & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (ke(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : ke(t),
          (n = t.updateQueue),
          n !== null && br(t, n.retryQueue),
          (n = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (n = e.memoizedState.cachePool.pool),
          (l = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (l = t.memoizedState.cachePool.pool),
          l !== n && (t.flags |= 2048),
          e !== null && F(gl),
          null
        );
      case 24:
        return (
          (n = null),
          e !== null && (n = e.memoizedState.cache),
          t.memoizedState.cache !== n && (t.flags |= 2048),
          dn(We),
          ke(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(c(156, t.tag));
  }
  function Oy(e, t) {
    switch ((ac(t), t.tag)) {
      case 1:
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          dn(We),
          Ne(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return we(t), null;
      case 13:
        if (
          (hn(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(c(340));
          Ya();
        }
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return F(Pe), null;
      case 4:
        return Ne(), null;
      case 10:
        return dn(t.type), null;
      case 22:
      case 23:
        return (
          hn(t),
          yc(),
          e !== null && F(gl),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return dn(We), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function nm(e, t) {
    switch ((ac(t), t.tag)) {
      case 3:
        dn(We), Ne();
        break;
      case 26:
      case 27:
      case 5:
        we(t);
        break;
      case 4:
        Ne();
        break;
      case 13:
        hn(t);
        break;
      case 19:
        F(Pe);
        break;
      case 10:
        dn(t.type);
        break;
      case 22:
      case 23:
        hn(t), yc(), e !== null && F(gl);
        break;
      case 24:
        dn(We);
    }
  }
  function ni(e, t) {
    try {
      var n = t.updateQueue,
        l = n !== null ? n.lastEffect : null;
      if (l !== null) {
        var i = l.next;
        n = i;
        do {
          if ((n.tag & e) === e) {
            l = void 0;
            var r = n.create,
              f = n.inst;
            (l = r()), (f.destroy = l);
          }
          n = n.next;
        } while (n !== i);
      }
    } catch (p) {
      He(t, t.return, p);
    }
  }
  function jn(e, t, n) {
    try {
      var l = t.updateQueue,
        i = l !== null ? l.lastEffect : null;
      if (i !== null) {
        var r = i.next;
        l = r;
        do {
          if ((l.tag & e) === e) {
            var f = l.inst,
              p = f.destroy;
            if (p !== void 0) {
              (f.destroy = void 0), (i = t);
              var x = n,
                z = p;
              try {
                z();
              } catch (V) {
                He(i, x, V);
              }
            }
          }
          l = l.next;
        } while (l !== r);
      }
    } catch (V) {
      He(t, t.return, V);
    }
  }
  function lm(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        Xf(t, n);
      } catch (l) {
        He(e, e.return, l);
      }
    }
  }
  function am(e, t, n) {
    (n.props = yl(e.type, e.memoizedProps)), (n.state = e.memoizedState);
    try {
      n.componentWillUnmount();
    } catch (l) {
      He(e, t, l);
    }
  }
  function li(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var l = e.stateNode;
            break;
          case 30:
            l = e.stateNode;
            break;
          default:
            l = e.stateNode;
        }
        typeof n == "function" ? (e.refCleanup = n(l)) : (n.current = l);
      }
    } catch (i) {
      He(e, t, i);
    }
  }
  function Pt(e, t) {
    var n = e.ref,
      l = e.refCleanup;
    if (n !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (i) {
          He(e, t, i);
        } finally {
          (e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (i) {
          He(e, t, i);
        }
      else n.current = null;
  }
  function im(e) {
    var t = e.type,
      n = e.memoizedProps,
      l = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && l.focus();
          break e;
        case "img":
          n.src ? (l.src = n.src) : n.srcSet && (l.srcset = n.srcSet);
      }
    } catch (i) {
      He(e, e.return, i);
    }
  }
  function Zc(e, t, n) {
    try {
      var l = e.stateNode;
      Wy(l, e.type, n, t), (l[ht] = t);
    } catch (i) {
      He(e, e.return, i);
    }
  }
  function rm(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && kn(e.type)) ||
      e.tag === 4
    );
  }
  function Kc(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || rm(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if (
          (e.tag === 27 && kn(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e;
        (e.child.return = e), (e = e.child);
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Jc(e, t, n) {
    var l = e.tag;
    if (l === 5 || l === 6)
      (e = e.stateNode),
        t
          ? (n.nodeType === 9
              ? n.body
              : n.nodeName === "HTML"
              ? n.ownerDocument.body
              : n
            ).insertBefore(e, t)
          : ((t =
              n.nodeType === 9
                ? n.body
                : n.nodeName === "HTML"
                ? n.ownerDocument.body
                : n),
            t.appendChild(e),
            (n = n._reactRootContainer),
            n != null || t.onclick !== null || (t.onclick = _r));
    else if (
      l !== 4 &&
      (l === 27 && kn(e.type) && ((n = e.stateNode), (t = null)),
      (e = e.child),
      e !== null)
    )
      for (Jc(e, t, n), e = e.sibling; e !== null; )
        Jc(e, t, n), (e = e.sibling);
  }
  function Sr(e, t, n) {
    var l = e.tag;
    if (l === 5 || l === 6)
      (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (
      l !== 4 &&
      (l === 27 && kn(e.type) && (n = e.stateNode), (e = e.child), e !== null)
    )
      for (Sr(e, t, n), e = e.sibling; e !== null; )
        Sr(e, t, n), (e = e.sibling);
  }
  function om(e) {
    var t = e.stateNode,
      n = e.memoizedProps;
    try {
      for (var l = e.type, i = t.attributes; i.length; )
        t.removeAttributeNode(i[0]);
      it(t, l, n), (t[ct] = e), (t[ht] = n);
    } catch (r) {
      He(e, e.return, r);
    }
  }
  var pn = !1,
    Ze = !1,
    Wc = !1,
    cm = typeof WeakSet == "function" ? WeakSet : Set,
    et = null;
  function My(e, t) {
    if (((e = e.containerInfo), (bu = Br), (e = bf(e)), Ko(e))) {
      if ("selectionStart" in e)
        var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var l = n.getSelection && n.getSelection();
          if (l && l.rangeCount !== 0) {
            n = l.anchorNode;
            var i = l.anchorOffset,
              r = l.focusNode;
            l = l.focusOffset;
            try {
              n.nodeType, r.nodeType;
            } catch {
              n = null;
              break e;
            }
            var f = 0,
              p = -1,
              x = -1,
              z = 0,
              V = 0,
              Z = e,
              j = null;
            t: for (;;) {
              for (
                var U;
                Z !== n || (i !== 0 && Z.nodeType !== 3) || (p = f + i),
                  Z !== r || (l !== 0 && Z.nodeType !== 3) || (x = f + l),
                  Z.nodeType === 3 && (f += Z.nodeValue.length),
                  (U = Z.firstChild) !== null;

              )
                (j = Z), (Z = U);
              for (;;) {
                if (Z === e) break t;
                if (
                  (j === n && ++z === i && (p = f),
                  j === r && ++V === l && (x = f),
                  (U = Z.nextSibling) !== null)
                )
                  break;
                (Z = j), (j = Z.parentNode);
              }
              Z = U;
            }
            n = p === -1 || x === -1 ? null : { start: p, end: x };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (
      Su = { focusedElem: e, selectionRange: n }, Br = !1, et = t;
      et !== null;

    )
      if (
        ((t = et), (e = t.child), (t.subtreeFlags & 1024) !== 0 && e !== null)
      )
        (e.return = t), (et = e);
      else
        for (; et !== null; ) {
          switch (((t = et), (r = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && r !== null) {
                (e = void 0),
                  (n = t),
                  (i = r.memoizedProps),
                  (r = r.memoizedState),
                  (l = n.stateNode);
                try {
                  var ve = yl(n.type, i, n.elementType === n.type);
                  (e = l.getSnapshotBeforeUpdate(ve, r)),
                    (l.__reactInternalSnapshotBeforeUpdate = e);
                } catch (de) {
                  He(n, n.return, de);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (n = e.nodeType), n === 9)
                )
                  Eu(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Eu(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(c(163));
          }
          if (((e = t.sibling), e !== null)) {
            (e.return = t.return), (et = e);
            break;
          }
          et = t.return;
        }
  }
  function um(e, t, n) {
    var l = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        Un(e, n), l & 4 && ni(5, n);
        break;
      case 1:
        if ((Un(e, n), l & 4))
          if (((e = n.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (f) {
              He(n, n.return, f);
            }
          else {
            var i = yl(n.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (f) {
              He(n, n.return, f);
            }
          }
        l & 64 && lm(n), l & 512 && li(n, n.return);
        break;
      case 3:
        if ((Un(e, n), l & 64 && ((e = n.updateQueue), e !== null))) {
          if (((t = null), n.child !== null))
            switch (n.child.tag) {
              case 27:
              case 5:
                t = n.child.stateNode;
                break;
              case 1:
                t = n.child.stateNode;
            }
          try {
            Xf(e, t);
          } catch (f) {
            He(n, n.return, f);
          }
        }
        break;
      case 27:
        t === null && l & 4 && om(n);
      case 26:
      case 5:
        Un(e, n), t === null && l & 4 && im(n), l & 512 && li(n, n.return);
        break;
      case 12:
        Un(e, n);
        break;
      case 13:
        Un(e, n),
          l & 4 && dm(e, n),
          l & 64 &&
            ((e = n.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((n = By.bind(null, n)), n0(e, n))));
        break;
      case 22:
        if (((l = n.memoizedState !== null || pn), !l)) {
          (t = (t !== null && t.memoizedState !== null) || Ze), (i = pn);
          var r = Ze;
          (pn = l),
            (Ze = t) && !r ? Hn(e, n, (n.subtreeFlags & 8772) !== 0) : Un(e, n),
            (pn = i),
            (Ze = r);
        }
        break;
      case 30:
        break;
      default:
        Un(e, n);
    }
  }
  function sm(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), sm(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Oo(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null);
  }
  var Ve = null,
    pt = !1;
  function yn(e, t, n) {
    for (n = n.child; n !== null; ) fm(e, t, n), (n = n.sibling);
  }
  function fm(e, t, n) {
    if (St && typeof St.onCommitFiberUnmount == "function")
      try {
        St.onCommitFiberUnmount(Aa, n);
      } catch {}
    switch (n.tag) {
      case 26:
        Ze || Pt(n, t),
          yn(e, t, n),
          n.memoizedState
            ? n.memoizedState.count--
            : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n));
        break;
      case 27:
        Ze || Pt(n, t);
        var l = Ve,
          i = pt;
        kn(n.type) && ((Ve = n.stateNode), (pt = !1)),
          yn(e, t, n),
          di(n.stateNode),
          (Ve = l),
          (pt = i);
        break;
      case 5:
        Ze || Pt(n, t);
      case 6:
        if (
          ((l = Ve),
          (i = pt),
          (Ve = null),
          yn(e, t, n),
          (Ve = l),
          (pt = i),
          Ve !== null)
        )
          if (pt)
            try {
              (Ve.nodeType === 9
                ? Ve.body
                : Ve.nodeName === "HTML"
                ? Ve.ownerDocument.body
                : Ve
              ).removeChild(n.stateNode);
            } catch (r) {
              He(n, t, r);
            }
          else
            try {
              Ve.removeChild(n.stateNode);
            } catch (r) {
              He(n, t, r);
            }
        break;
      case 18:
        Ve !== null &&
          (pt
            ? ((e = Ve),
              Im(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                  ? e.ownerDocument.body
                  : e,
                n.stateNode
              ),
              Si(e))
            : Im(Ve, n.stateNode));
        break;
      case 4:
        (l = Ve),
          (i = pt),
          (Ve = n.stateNode.containerInfo),
          (pt = !0),
          yn(e, t, n),
          (Ve = l),
          (pt = i);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ze || jn(2, n, t), Ze || jn(4, n, t), yn(e, t, n);
        break;
      case 1:
        Ze ||
          (Pt(n, t),
          (l = n.stateNode),
          typeof l.componentWillUnmount == "function" && am(n, t, l)),
          yn(e, t, n);
        break;
      case 21:
        yn(e, t, n);
        break;
      case 22:
        (Ze = (l = Ze) || n.memoizedState !== null), yn(e, t, n), (Ze = l);
        break;
      default:
        yn(e, t, n);
    }
  }
  function dm(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Si(e);
      } catch (n) {
        He(t, t.return, n);
      }
  }
  function Ny(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new cm()), t;
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new cm()),
          t
        );
      default:
        throw Error(c(435, e.tag));
    }
  }
  function Pc(e, t) {
    var n = Ny(e);
    t.forEach(function (l) {
      var i = Yy.bind(null, e, l);
      n.has(l) || (n.add(l), l.then(i, i));
    });
  }
  function At(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var i = n[l],
          r = e,
          f = t,
          p = f;
        e: for (; p !== null; ) {
          switch (p.tag) {
            case 27:
              if (kn(p.type)) {
                (Ve = p.stateNode), (pt = !1);
                break e;
              }
              break;
            case 5:
              (Ve = p.stateNode), (pt = !1);
              break e;
            case 3:
            case 4:
              (Ve = p.stateNode.containerInfo), (pt = !0);
              break e;
          }
          p = p.return;
        }
        if (Ve === null) throw Error(c(160));
        fm(r, f, i),
          (Ve = null),
          (pt = !1),
          (r = i.alternate),
          r !== null && (r.return = null),
          (i.return = null);
      }
    if (t.subtreeFlags & 13878)
      for (t = t.child; t !== null; ) mm(t, e), (t = t.sibling);
  }
  var Gt = null;
  function mm(e, t) {
    var n = e.alternate,
      l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        At(t, e),
          Tt(e),
          l & 4 && (jn(3, e, e.return), ni(3, e), jn(5, e, e.return));
        break;
      case 1:
        At(t, e),
          Tt(e),
          l & 512 && (Ze || n === null || Pt(n, n.return)),
          l & 64 &&
            pn &&
            ((e = e.updateQueue),
            e !== null &&
              ((l = e.callbacks),
              l !== null &&
                ((n = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = n === null ? l : n.concat(l)))));
        break;
      case 26:
        var i = Gt;
        if (
          (At(t, e),
          Tt(e),
          l & 512 && (Ze || n === null || Pt(n, n.return)),
          l & 4)
        ) {
          var r = n !== null ? n.memoizedState : null;
          if (((l = e.memoizedState), n === null))
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  (l = e.type),
                    (n = e.memoizedProps),
                    (i = i.ownerDocument || i);
                  t: switch (l) {
                    case "title":
                      (r = i.getElementsByTagName("title")[0]),
                        (!r ||
                          r[Ca] ||
                          r[ct] ||
                          r.namespaceURI === "http://www.w3.org/2000/svg" ||
                          r.hasAttribute("itemprop")) &&
                          ((r = i.createElement(l)),
                          i.head.insertBefore(
                            r,
                            i.querySelector("head > title")
                          )),
                        it(r, l, n),
                        (r[ct] = e),
                        Fe(r),
                        (l = r);
                      break e;
                    case "link":
                      var f = oh("link", "href", i).get(l + (n.href || ""));
                      if (f) {
                        for (var p = 0; p < f.length; p++)
                          if (
                            ((r = f[p]),
                            r.getAttribute("href") ===
                              (n.href == null || n.href === ""
                                ? null
                                : n.href) &&
                              r.getAttribute("rel") ===
                                (n.rel == null ? null : n.rel) &&
                              r.getAttribute("title") ===
                                (n.title == null ? null : n.title) &&
                              r.getAttribute("crossorigin") ===
                                (n.crossOrigin == null ? null : n.crossOrigin))
                          ) {
                            f.splice(p, 1);
                            break t;
                          }
                      }
                      (r = i.createElement(l)),
                        it(r, l, n),
                        i.head.appendChild(r);
                      break;
                    case "meta":
                      if (
                        (f = oh("meta", "content", i).get(
                          l + (n.content || "")
                        ))
                      ) {
                        for (p = 0; p < f.length; p++)
                          if (
                            ((r = f[p]),
                            r.getAttribute("content") ===
                              (n.content == null ? null : "" + n.content) &&
                              r.getAttribute("name") ===
                                (n.name == null ? null : n.name) &&
                              r.getAttribute("property") ===
                                (n.property == null ? null : n.property) &&
                              r.getAttribute("http-equiv") ===
                                (n.httpEquiv == null ? null : n.httpEquiv) &&
                              r.getAttribute("charset") ===
                                (n.charSet == null ? null : n.charSet))
                          ) {
                            f.splice(p, 1);
                            break t;
                          }
                      }
                      (r = i.createElement(l)),
                        it(r, l, n),
                        i.head.appendChild(r);
                      break;
                    default:
                      throw Error(c(468, l));
                  }
                  (r[ct] = e), Fe(r), (l = r);
                }
                e.stateNode = l;
              } else ch(i, e.type, e.stateNode);
            else e.stateNode = rh(i, l, e.memoizedProps);
          else
            r !== l
              ? (r === null
                  ? n.stateNode !== null &&
                    ((n = n.stateNode), n.parentNode.removeChild(n))
                  : r.count--,
                l === null
                  ? ch(i, e.type, e.stateNode)
                  : rh(i, l, e.memoizedProps))
              : l === null &&
                e.stateNode !== null &&
                Zc(e, e.memoizedProps, n.memoizedProps);
        }
        break;
      case 27:
        At(t, e),
          Tt(e),
          l & 512 && (Ze || n === null || Pt(n, n.return)),
          n !== null && l & 4 && Zc(e, e.memoizedProps, n.memoizedProps);
        break;
      case 5:
        if (
          (At(t, e),
          Tt(e),
          l & 512 && (Ze || n === null || Pt(n, n.return)),
          e.flags & 32)
        ) {
          i = e.stateNode;
          try {
            Dl(i, "");
          } catch (U) {
            He(e, e.return, U);
          }
        }
        l & 4 &&
          e.stateNode != null &&
          ((i = e.memoizedProps), Zc(e, i, n !== null ? n.memoizedProps : i)),
          l & 1024 && (Wc = !0);
        break;
      case 6:
        if ((At(t, e), Tt(e), l & 4)) {
          if (e.stateNode === null) throw Error(c(162));
          (l = e.memoizedProps), (n = e.stateNode);
          try {
            n.nodeValue = l;
          } catch (U) {
            He(e, e.return, U);
          }
        }
        break;
      case 3:
        if (
          ((Ur = null),
          (i = Gt),
          (Gt = Dr(t.containerInfo)),
          At(t, e),
          (Gt = i),
          Tt(e),
          l & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            Si(t.containerInfo);
          } catch (U) {
            He(e, e.return, U);
          }
        Wc && ((Wc = !1), hm(e));
        break;
      case 4:
        (l = Gt),
          (Gt = Dr(e.stateNode.containerInfo)),
          At(t, e),
          Tt(e),
          (Gt = l);
        break;
      case 12:
        At(t, e), Tt(e);
        break;
      case 13:
        At(t, e),
          Tt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (n !== null && n.memoizedState !== null) &&
            (nu = ot()),
          l & 4 &&
            ((l = e.updateQueue),
            l !== null && ((e.updateQueue = null), Pc(e, l)));
        break;
      case 22:
        i = e.memoizedState !== null;
        var x = n !== null && n.memoizedState !== null,
          z = pn,
          V = Ze;
        if (
          ((pn = z || i),
          (Ze = V || x),
          At(t, e),
          (Ze = V),
          (pn = z),
          Tt(e),
          l & 8192)
        )
          e: for (
            t = e.stateNode,
              t._visibility = i ? t._visibility & -2 : t._visibility | 1,
              i && (n === null || x || pn || Ze || bl(e)),
              n = null,
              t = e;
            ;

          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                x = n = t;
                try {
                  if (((r = x.stateNode), i))
                    (f = r.style),
                      typeof f.setProperty == "function"
                        ? f.setProperty("display", "none", "important")
                        : (f.display = "none");
                  else {
                    p = x.stateNode;
                    var Z = x.memoizedProps.style,
                      j =
                        Z != null && Z.hasOwnProperty("display")
                          ? Z.display
                          : null;
                    p.style.display =
                      j == null || typeof j == "boolean" ? "" : ("" + j).trim();
                  }
                } catch (U) {
                  He(x, x.return, U);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                x = t;
                try {
                  x.stateNode.nodeValue = i ? "" : x.memoizedProps;
                } catch (U) {
                  He(x, x.return, U);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              (t.child.return = t), (t = t.child);
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              n === t && (n = null), (t = t.return);
            }
            n === t && (n = null),
              (t.sibling.return = t.return),
              (t = t.sibling);
          }
        l & 4 &&
          ((l = e.updateQueue),
          l !== null &&
            ((n = l.retryQueue),
            n !== null && ((l.retryQueue = null), Pc(e, n))));
        break;
      case 19:
        At(t, e),
          Tt(e),
          l & 4 &&
            ((l = e.updateQueue),
            l !== null && ((e.updateQueue = null), Pc(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        At(t, e), Tt(e);
    }
  }
  function Tt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, l = e.return; l !== null; ) {
          if (rm(l)) {
            n = l;
            break;
          }
          l = l.return;
        }
        if (n == null) throw Error(c(160));
        switch (n.tag) {
          case 27:
            var i = n.stateNode,
              r = Kc(e);
            Sr(e, r, i);
            break;
          case 5:
            var f = n.stateNode;
            n.flags & 32 && (Dl(f, ""), (n.flags &= -33));
            var p = Kc(e);
            Sr(e, p, f);
            break;
          case 3:
          case 4:
            var x = n.stateNode.containerInfo,
              z = Kc(e);
            Jc(e, z, x);
            break;
          default:
            throw Error(c(161));
        }
      } catch (V) {
        He(e, e.return, V);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function hm(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        hm(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling);
      }
  }
  function Un(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) um(e, t.alternate, t), (t = t.sibling);
  }
  function bl(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          jn(4, t, t.return), bl(t);
          break;
        case 1:
          Pt(t, t.return);
          var n = t.stateNode;
          typeof n.componentWillUnmount == "function" && am(t, t.return, n),
            bl(t);
          break;
        case 27:
          di(t.stateNode);
        case 26:
        case 5:
          Pt(t, t.return), bl(t);
          break;
        case 22:
          t.memoizedState === null && bl(t);
          break;
        case 30:
          bl(t);
          break;
        default:
          bl(t);
      }
      e = e.sibling;
    }
  }
  function Hn(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate,
        i = e,
        r = t,
        f = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          Hn(i, r, n), ni(4, r);
          break;
        case 1:
          if (
            (Hn(i, r, n),
            (l = r),
            (i = l.stateNode),
            typeof i.componentDidMount == "function")
          )
            try {
              i.componentDidMount();
            } catch (z) {
              He(l, l.return, z);
            }
          if (((l = r), (i = l.updateQueue), i !== null)) {
            var p = l.stateNode;
            try {
              var x = i.shared.hiddenCallbacks;
              if (x !== null)
                for (i.shared.hiddenCallbacks = null, i = 0; i < x.length; i++)
                  Gf(x[i], p);
            } catch (z) {
              He(l, l.return, z);
            }
          }
          n && f & 64 && lm(r), li(r, r.return);
          break;
        case 27:
          om(r);
        case 26:
        case 5:
          Hn(i, r, n), n && l === null && f & 4 && im(r), li(r, r.return);
          break;
        case 12:
          Hn(i, r, n);
          break;
        case 13:
          Hn(i, r, n), n && f & 4 && dm(i, r);
          break;
        case 22:
          r.memoizedState === null && Hn(i, r, n), li(r, r.return);
          break;
        case 30:
          break;
        default:
          Hn(i, r, n);
      }
      t = t.sibling;
    }
  }
  function $c(e, t) {
    var n = null;
    e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (n = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== n && (e != null && e.refCount++, n != null && ka(n));
  }
  function Fc(e, t) {
    (e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && ka(e));
  }
  function $t(e, t, n, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) vm(e, t, n, l), (t = t.sibling);
  }
  function vm(e, t, n, l) {
    var i = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        $t(e, t, n, l), i & 2048 && ni(9, t);
        break;
      case 1:
        $t(e, t, n, l);
        break;
      case 3:
        $t(e, t, n, l),
          i & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && ka(e)));
        break;
      case 12:
        if (i & 2048) {
          $t(e, t, n, l), (e = t.stateNode);
          try {
            var r = t.memoizedProps,
              f = r.id,
              p = r.onPostCommit;
            typeof p == "function" &&
              p(
                f,
                t.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0
              );
          } catch (x) {
            He(t, t.return, x);
          }
        } else $t(e, t, n, l);
        break;
      case 13:
        $t(e, t, n, l);
        break;
      case 23:
        break;
      case 22:
        (r = t.stateNode),
          (f = t.alternate),
          t.memoizedState !== null
            ? r._visibility & 2
              ? $t(e, t, n, l)
              : ai(e, t)
            : r._visibility & 2
            ? $t(e, t, n, l)
            : ((r._visibility |= 2),
              Fl(e, t, n, l, (t.subtreeFlags & 10256) !== 0)),
          i & 2048 && $c(f, t);
        break;
      case 24:
        $t(e, t, n, l), i & 2048 && Fc(t.alternate, t);
        break;
      default:
        $t(e, t, n, l);
    }
  }
  function Fl(e, t, n, l, i) {
    for (i = i && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
      var r = e,
        f = t,
        p = n,
        x = l,
        z = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          Fl(r, f, p, x, i), ni(8, f);
          break;
        case 23:
          break;
        case 22:
          var V = f.stateNode;
          f.memoizedState !== null
            ? V._visibility & 2
              ? Fl(r, f, p, x, i)
              : ai(r, f)
            : ((V._visibility |= 2), Fl(r, f, p, x, i)),
            i && z & 2048 && $c(f.alternate, f);
          break;
        case 24:
          Fl(r, f, p, x, i), i && z & 2048 && Fc(f.alternate, f);
          break;
        default:
          Fl(r, f, p, x, i);
      }
      t = t.sibling;
    }
  }
  function ai(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e,
          l = t,
          i = l.flags;
        switch (l.tag) {
          case 22:
            ai(n, l), i & 2048 && $c(l.alternate, l);
            break;
          case 24:
            ai(n, l), i & 2048 && Fc(l.alternate, l);
            break;
          default:
            ai(n, l);
        }
        t = t.sibling;
      }
  }
  var ii = 8192;
  function Il(e) {
    if (e.subtreeFlags & ii)
      for (e = e.child; e !== null; ) gm(e), (e = e.sibling);
  }
  function gm(e) {
    switch (e.tag) {
      case 26:
        Il(e),
          e.flags & ii &&
            e.memoizedState !== null &&
            v0(Gt, e.memoizedState, e.memoizedProps);
        break;
      case 5:
        Il(e);
        break;
      case 3:
      case 4:
        var t = Gt;
        (Gt = Dr(e.stateNode.containerInfo)), Il(e), (Gt = t);
        break;
      case 22:
        e.memoizedState === null &&
          ((t = e.alternate),
          t !== null && t.memoizedState !== null
            ? ((t = ii), (ii = 16777216), Il(e), (ii = t))
            : Il(e));
        break;
      default:
        Il(e);
    }
  }
  function pm(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do (t = e.sibling), (e.sibling = null), (e = t);
      while (e !== null);
    }
  }
  function ri(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          (et = l), bm(l, e);
        }
      pm(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) ym(e), (e = e.sibling);
  }
  function ym(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ri(e), e.flags & 2048 && jn(9, e, e.return);
        break;
      case 3:
        ri(e);
        break;
      case 12:
        ri(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null &&
        t._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), xr(e))
          : ri(e);
        break;
      default:
        ri(e);
    }
  }
  function xr(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          (et = l), bm(l, e);
        }
      pm(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          jn(8, t, t.return), xr(t);
          break;
        case 22:
          (n = t.stateNode),
            n._visibility & 2 && ((n._visibility &= -3), xr(t));
          break;
        default:
          xr(t);
      }
      e = e.sibling;
    }
  }
  function bm(e, t) {
    for (; et !== null; ) {
      var n = et;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          jn(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var l = n.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          ka(n.memoizedState.cache);
      }
      if (((l = n.child), l !== null)) (l.return = n), (et = l);
      else
        e: for (n = e; et !== null; ) {
          l = et;
          var i = l.sibling,
            r = l.return;
          if ((sm(l), l === n)) {
            et = null;
            break e;
          }
          if (i !== null) {
            (i.return = r), (et = i);
            break e;
          }
          et = r;
        }
    }
  }
  var _y = {
      getCacheForType: function (e) {
        var t = ut(We),
          n = t.data.get(e);
        return n === void 0 && ((n = e()), t.data.set(e, n)), n;
      },
    },
    zy = typeof WeakMap == "function" ? WeakMap : Map,
    _e = 0,
    Be = null,
    Ae = null,
    Ce = 0,
    ze = 0,
    Rt = null,
    Ln = !1,
    ea = !1,
    Ic = !1,
    bn = 0,
    Xe = 0,
    Bn = 0,
    Sl = 0,
    eu = 0,
    Yt = 0,
    ta = 0,
    oi = null,
    yt = null,
    tu = !1,
    nu = 0,
    wr = 1 / 0,
    Er = null,
    Yn = null,
    at = 0,
    Vn = null,
    na = null,
    la = 0,
    lu = 0,
    au = null,
    Sm = null,
    ci = 0,
    iu = null;
  function Ct() {
    if ((_e & 2) !== 0 && Ce !== 0) return Ce & -Ce;
    if (O.T !== null) {
      var e = Xl;
      return e !== 0 ? e : du();
    }
    return Us();
  }
  function xm() {
    Yt === 0 && (Yt = (Ce & 536870912) === 0 || Me ? _s() : 536870912);
    var e = Bt.current;
    return e !== null && (e.flags |= 32), Yt;
  }
  function Ot(e, t, n) {
    ((e === Be && (ze === 2 || ze === 9)) || e.cancelPendingCommit !== null) &&
      (aa(e, 0), qn(e, Ce, Yt, !1)),
      Ra(e, n),
      ((_e & 2) === 0 || e !== Be) &&
        (e === Be &&
          ((_e & 2) === 0 && (Sl |= n), Xe === 4 && qn(e, Ce, Yt, !1)),
        Ft(e));
  }
  function wm(e, t, n) {
    if ((_e & 6) !== 0) throw Error(c(327));
    var l = (!n && (t & 124) === 0 && (t & e.expiredLanes) === 0) || Ta(e, t),
      i = l ? Uy(e, t) : cu(e, t, !0),
      r = l;
    do {
      if (i === 0) {
        ea && !l && qn(e, t, 0, !1);
        break;
      } else {
        if (((n = e.current.alternate), r && !Dy(n))) {
          (i = cu(e, t, !1)), (r = !1);
          continue;
        }
        if (i === 2) {
          if (((r = t), e.errorRecoveryDisabledLanes & r)) var f = 0;
          else
            (f = e.pendingLanes & -536870913),
              (f = f !== 0 ? f : f & 536870912 ? 536870912 : 0);
          if (f !== 0) {
            t = f;
            e: {
              var p = e;
              i = oi;
              var x = p.current.memoizedState.isDehydrated;
              if ((x && (aa(p, f).flags |= 256), (f = cu(p, f, !1)), f !== 2)) {
                if (Ic && !x) {
                  (p.errorRecoveryDisabledLanes |= r), (Sl |= r), (i = 4);
                  break e;
                }
                (r = yt),
                  (yt = i),
                  r !== null && (yt === null ? (yt = r) : yt.push.apply(yt, r));
              }
              i = f;
            }
            if (((r = !1), i !== 2)) continue;
          }
        }
        if (i === 1) {
          aa(e, 0), qn(e, t, 0, !0);
          break;
        }
        e: {
          switch (((l = e), (r = i), r)) {
            case 0:
            case 1:
              throw Error(c(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              qn(l, t, Yt, !Ln);
              break e;
            case 2:
              yt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(c(329));
          }
          if ((t & 62914560) === t && ((i = nu + 300 - ot()), 10 < i)) {
            if ((qn(l, t, Yt, !Ln), ji(l, 0, !0) !== 0)) break e;
            l.timeoutHandle = $m(
              Em.bind(null, l, n, yt, Er, tu, t, Yt, Sl, ta, Ln, r, 2, -0, 0),
              i
            );
            break e;
          }
          Em(l, n, yt, Er, tu, t, Yt, Sl, ta, Ln, r, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    Ft(e);
  }
  function Em(e, t, n, l, i, r, f, p, x, z, V, Z, j, U) {
    if (
      ((e.timeoutHandle = -1),
      (Z = t.subtreeFlags),
      (Z & 8192 || (Z & 16785408) === 16785408) &&
        ((vi = { stylesheets: null, count: 0, unsuspend: h0 }),
        gm(t),
        (Z = g0()),
        Z !== null))
    ) {
      (e.cancelPendingCommit = Z(
        Nm.bind(null, e, t, r, n, l, i, f, p, x, V, 1, j, U)
      )),
        qn(e, r, f, !z);
      return;
    }
    Nm(e, t, r, n, l, i, f, p, x);
  }
  function Dy(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if (
        (n === 0 || n === 11 || n === 15) &&
        t.flags & 16384 &&
        ((n = t.updateQueue), n !== null && ((n = n.stores), n !== null))
      )
        for (var l = 0; l < n.length; l++) {
          var i = n[l],
            r = i.getSnapshot;
          i = i.value;
          try {
            if (!wt(r(), i)) return !1;
          } catch {
            return !1;
          }
        }
      if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
        (n.return = t), (t = n);
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    }
    return !0;
  }
  function qn(e, t, n, l) {
    (t &= ~eu),
      (t &= ~Sl),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      l && (e.warmLanes |= t),
      (l = e.expirationTimes);
    for (var i = t; 0 < i; ) {
      var r = 31 - xt(i),
        f = 1 << r;
      (l[r] = -1), (i &= ~f);
    }
    n !== 0 && Ds(e, n, t);
  }
  function Ar() {
    return (_e & 6) === 0 ? (ui(0), !1) : !0;
  }
  function ru() {
    if (Ae !== null) {
      if (ze === 0) var e = Ae.return;
      else (e = Ae), (fn = hl = null), Ec(e), (Pl = null), (Ia = 0), (e = Ae);
      for (; e !== null; ) nm(e.alternate, e), (e = e.return);
      Ae = null;
    }
  }
  function aa(e, t) {
    var n = e.timeoutHandle;
    n !== -1 && ((e.timeoutHandle = -1), $y(n)),
      (n = e.cancelPendingCommit),
      n !== null && ((e.cancelPendingCommit = null), n()),
      ru(),
      (Be = e),
      (Ae = n = cn(e.current, null)),
      (Ce = t),
      (ze = 0),
      (Rt = null),
      (Ln = !1),
      (ea = Ta(e, t)),
      (Ic = !1),
      (ta = Yt = eu = Sl = Bn = Xe = 0),
      (yt = oi = null),
      (tu = !1),
      (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var i = 31 - xt(l),
          r = 1 << i;
        (t |= e[i]), (l &= ~r);
      }
    return (bn = t), Zi(), n;
  }
  function Am(e, t) {
    (be = null),
      (O.H = fr),
      t === Xa || t === tr
        ? ((t = qf()), (ze = 3))
        : t === Bf
        ? ((t = qf()), (ze = 4))
        : (ze =
            t === kd
              ? 8
              : t !== null &&
                typeof t == "object" &&
                typeof t.then == "function"
              ? 6
              : 1),
      (Rt = t),
      Ae === null && ((Xe = 1), gr(e, jt(t, e.current)));
  }
  function Tm() {
    var e = O.H;
    return (O.H = fr), e === null ? fr : e;
  }
  function Rm() {
    var e = O.A;
    return (O.A = _y), e;
  }
  function ou() {
    (Xe = 4),
      Ln || ((Ce & 4194048) !== Ce && Bt.current !== null) || (ea = !0),
      ((Bn & 134217727) === 0 && (Sl & 134217727) === 0) ||
        Be === null ||
        qn(Be, Ce, Yt, !1);
  }
  function cu(e, t, n) {
    var l = _e;
    _e |= 2;
    var i = Tm(),
      r = Rm();
    (Be !== e || Ce !== t) && ((Er = null), aa(e, t)), (t = !1);
    var f = Xe;
    e: do
      try {
        if (ze !== 0 && Ae !== null) {
          var p = Ae,
            x = Rt;
          switch (ze) {
            case 8:
              ru(), (f = 6);
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Bt.current === null && (t = !0);
              var z = ze;
              if (((ze = 0), (Rt = null), ia(e, p, x, z), n && ea)) {
                f = 0;
                break e;
              }
              break;
            default:
              (z = ze), (ze = 0), (Rt = null), ia(e, p, x, z);
          }
        }
        jy(), (f = Xe);
        break;
      } catch (V) {
        Am(e, V);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (fn = hl = null),
      (_e = l),
      (O.H = i),
      (O.A = r),
      Ae === null && ((Be = null), (Ce = 0), Zi()),
      f
    );
  }
  function jy() {
    for (; Ae !== null; ) Cm(Ae);
  }
  function Uy(e, t) {
    var n = _e;
    _e |= 2;
    var l = Tm(),
      i = Rm();
    Be !== e || Ce !== t
      ? ((Er = null), (wr = ot() + 500), aa(e, t))
      : (ea = Ta(e, t));
    e: do
      try {
        if (ze !== 0 && Ae !== null) {
          t = Ae;
          var r = Rt;
          t: switch (ze) {
            case 1:
              (ze = 0), (Rt = null), ia(e, t, r, 1);
              break;
            case 2:
            case 9:
              if (Yf(r)) {
                (ze = 0), (Rt = null), Om(t);
                break;
              }
              (t = function () {
                (ze !== 2 && ze !== 9) || Be !== e || (ze = 7), Ft(e);
              }),
                r.then(t, t);
              break e;
            case 3:
              ze = 7;
              break e;
            case 4:
              ze = 5;
              break e;
            case 7:
              Yf(r)
                ? ((ze = 0), (Rt = null), Om(t))
                : ((ze = 0), (Rt = null), ia(e, t, r, 7));
              break;
            case 5:
              var f = null;
              switch (Ae.tag) {
                case 26:
                  f = Ae.memoizedState;
                case 5:
                case 27:
                  var p = Ae;
                  if (!f || uh(f)) {
                    (ze = 0), (Rt = null);
                    var x = p.sibling;
                    if (x !== null) Ae = x;
                    else {
                      var z = p.return;
                      z !== null ? ((Ae = z), Tr(z)) : (Ae = null);
                    }
                    break t;
                  }
              }
              (ze = 0), (Rt = null), ia(e, t, r, 5);
              break;
            case 6:
              (ze = 0), (Rt = null), ia(e, t, r, 6);
              break;
            case 8:
              ru(), (Xe = 6);
              break e;
            default:
              throw Error(c(462));
          }
        }
        Hy();
        break;
      } catch (V) {
        Am(e, V);
      }
    while (!0);
    return (
      (fn = hl = null),
      (O.H = l),
      (O.A = i),
      (_e = n),
      Ae !== null ? 0 : ((Be = null), (Ce = 0), Zi(), Xe)
    );
  }
  function Hy() {
    for (; Ae !== null && !tl(); ) Cm(Ae);
  }
  function Cm(e) {
    var t = em(e.alternate, e, bn);
    (e.memoizedProps = e.pendingProps), t === null ? Tr(e) : (Ae = t);
  }
  function Om(e) {
    var t = e,
      n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Jd(n, t, t.pendingProps, t.type, void 0, Ce);
        break;
      case 11:
        t = Jd(n, t, t.pendingProps, t.type.render, t.ref, Ce);
        break;
      case 5:
        Ec(t);
      default:
        nm(n, t), (t = Ae = Mf(t, bn)), (t = em(n, t, bn));
    }
    (e.memoizedProps = e.pendingProps), t === null ? Tr(e) : (Ae = t);
  }
  function ia(e, t, n, l) {
    (fn = hl = null), Ec(t), (Pl = null), (Ia = 0);
    var i = t.return;
    try {
      if (Ty(e, i, t, n, Ce)) {
        (Xe = 1), gr(e, jt(n, e.current)), (Ae = null);
        return;
      }
    } catch (r) {
      if (i !== null) throw ((Ae = i), r);
      (Xe = 1), gr(e, jt(n, e.current)), (Ae = null);
      return;
    }
    t.flags & 32768
      ? (Me || l === 1
          ? (e = !0)
          : ea || (Ce & 536870912) !== 0
          ? (e = !1)
          : ((Ln = e = !0),
            (l === 2 || l === 9 || l === 3 || l === 6) &&
              ((l = Bt.current),
              l !== null && l.tag === 13 && (l.flags |= 16384))),
        Mm(t, e))
      : Tr(t);
  }
  function Tr(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Mm(t, Ln);
        return;
      }
      e = t.return;
      var n = Cy(t.alternate, t, bn);
      if (n !== null) {
        Ae = n;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        Ae = t;
        return;
      }
      Ae = t = e;
    } while (t !== null);
    Xe === 0 && (Xe = 5);
  }
  function Mm(e, t) {
    do {
      var n = Oy(e.alternate, e);
      if (n !== null) {
        (n.flags &= 32767), (Ae = n);
        return;
      }
      if (
        ((n = e.return),
        n !== null &&
          ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        Ae = e;
        return;
      }
      Ae = e = n;
    } while (e !== null);
    (Xe = 6), (Ae = null);
  }
  function Nm(e, t, n, l, i, r, f, p, x) {
    e.cancelPendingCommit = null;
    do Rr();
    while (at !== 0);
    if ((_e & 6) !== 0) throw Error(c(327));
    if (t !== null) {
      if (t === e.current) throw Error(c(177));
      if (
        ((r = t.lanes | t.childLanes),
        (r |= Fo),
        hp(e, n, r, f, p, x),
        e === Be && ((Ae = Be = null), (Ce = 0)),
        (na = t),
        (Vn = e),
        (la = n),
        (lu = r),
        (au = i),
        (Sm = l),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            Vy(_i, function () {
              return Um(), null;
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (l = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || l)
      ) {
        (l = O.T), (O.T = null), (i = k.p), (k.p = 2), (f = _e), (_e |= 4);
        try {
          My(e, t, n);
        } finally {
          (_e = f), (k.p = i), (O.T = l);
        }
      }
      (at = 1), _m(), zm(), Dm();
    }
  }
  function _m() {
    if (at === 1) {
      at = 0;
      var e = Vn,
        t = na,
        n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        (n = O.T), (O.T = null);
        var l = k.p;
        k.p = 2;
        var i = _e;
        _e |= 4;
        try {
          mm(t, e);
          var r = Su,
            f = bf(e.containerInfo),
            p = r.focusedElem,
            x = r.selectionRange;
          if (
            f !== p &&
            p &&
            p.ownerDocument &&
            yf(p.ownerDocument.documentElement, p)
          ) {
            if (x !== null && Ko(p)) {
              var z = x.start,
                V = x.end;
              if ((V === void 0 && (V = z), "selectionStart" in p))
                (p.selectionStart = z),
                  (p.selectionEnd = Math.min(V, p.value.length));
              else {
                var Z = p.ownerDocument || document,
                  j = (Z && Z.defaultView) || window;
                if (j.getSelection) {
                  var U = j.getSelection(),
                    ve = p.textContent.length,
                    de = Math.min(x.start, ve),
                    Ue = x.end === void 0 ? de : Math.min(x.end, ve);
                  !U.extend && de > Ue && ((f = Ue), (Ue = de), (de = f));
                  var M = pf(p, de),
                    R = pf(p, Ue);
                  if (
                    M &&
                    R &&
                    (U.rangeCount !== 1 ||
                      U.anchorNode !== M.node ||
                      U.anchorOffset !== M.offset ||
                      U.focusNode !== R.node ||
                      U.focusOffset !== R.offset)
                  ) {
                    var N = Z.createRange();
                    N.setStart(M.node, M.offset),
                      U.removeAllRanges(),
                      de > Ue
                        ? (U.addRange(N), U.extend(R.node, R.offset))
                        : (N.setEnd(R.node, R.offset), U.addRange(N));
                  }
                }
              }
            }
            for (Z = [], U = p; (U = U.parentNode); )
              U.nodeType === 1 &&
                Z.push({ element: U, left: U.scrollLeft, top: U.scrollTop });
            for (
              typeof p.focus == "function" && p.focus(), p = 0;
              p < Z.length;
              p++
            ) {
              var G = Z[p];
              (G.element.scrollLeft = G.left), (G.element.scrollTop = G.top);
            }
          }
          (Br = !!bu), (Su = bu = null);
        } finally {
          (_e = i), (k.p = l), (O.T = n);
        }
      }
      (e.current = t), (at = 2);
    }
  }
  function zm() {
    if (at === 2) {
      at = 0;
      var e = Vn,
        t = na,
        n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        (n = O.T), (O.T = null);
        var l = k.p;
        k.p = 2;
        var i = _e;
        _e |= 4;
        try {
          um(e, t.alternate, t);
        } finally {
          (_e = i), (k.p = l), (O.T = n);
        }
      }
      at = 3;
    }
  }
  function Dm() {
    if (at === 4 || at === 3) {
      (at = 0), nl();
      var e = Vn,
        t = na,
        n = la,
        l = Sm;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (at = 5)
        : ((at = 0), (na = Vn = null), jm(e, e.pendingLanes));
      var i = e.pendingLanes;
      if (
        (i === 0 && (Yn = null),
        Ro(n),
        (t = t.stateNode),
        St && typeof St.onCommitFiberRoot == "function")
      )
        try {
          St.onCommitFiberRoot(Aa, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (l !== null) {
        (t = O.T), (i = k.p), (k.p = 2), (O.T = null);
        try {
          for (var r = e.onRecoverableError, f = 0; f < l.length; f++) {
            var p = l[f];
            r(p.value, { componentStack: p.stack });
          }
        } finally {
          (O.T = t), (k.p = i);
        }
      }
      (la & 3) !== 0 && Rr(),
        Ft(e),
        (i = e.pendingLanes),
        (n & 4194090) !== 0 && (i & 42) !== 0
          ? e === iu
            ? ci++
            : ((ci = 0), (iu = e))
          : (ci = 0),
        ui(0);
    }
  }
  function jm(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), ka(t)));
  }
  function Rr(e) {
    return _m(), zm(), Dm(), Um();
  }
  function Um() {
    if (at !== 5) return !1;
    var e = Vn,
      t = lu;
    lu = 0;
    var n = Ro(la),
      l = O.T,
      i = k.p;
    try {
      (k.p = 32 > n ? 32 : n), (O.T = null), (n = au), (au = null);
      var r = Vn,
        f = la;
      if (((at = 0), (na = Vn = null), (la = 0), (_e & 6) !== 0))
        throw Error(c(331));
      var p = _e;
      if (
        ((_e |= 4),
        ym(r.current),
        vm(r, r.current, f, n),
        (_e = p),
        ui(0, !1),
        St && typeof St.onPostCommitFiberRoot == "function")
      )
        try {
          St.onPostCommitFiberRoot(Aa, r);
        } catch {}
      return !0;
    } finally {
      (k.p = i), (O.T = l), jm(e, t);
    }
  }
  function Hm(e, t, n) {
    (t = jt(n, t)),
      (t = Lc(e.stateNode, t, 2)),
      (e = Nn(e, t, 2)),
      e !== null && (Ra(e, 2), Ft(e));
  }
  function He(e, t, n) {
    if (e.tag === 3) Hm(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Hm(t, e, n);
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof l.componentDidCatch == "function" &&
              (Yn === null || !Yn.has(l)))
          ) {
            (e = jt(n, e)),
              (n = Vd(2)),
              (l = Nn(t, n, 2)),
              l !== null && (qd(n, l, t, e), Ra(l, 2), Ft(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function uu(e, t, n) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new zy();
      var i = new Set();
      l.set(t, i);
    } else (i = l.get(t)), i === void 0 && ((i = new Set()), l.set(t, i));
    i.has(n) ||
      ((Ic = !0), i.add(n), (e = Ly.bind(null, e, t, n)), t.then(e, e));
  }
  function Ly(e, t, n) {
    var l = e.pingCache;
    l !== null && l.delete(t),
      (e.pingedLanes |= e.suspendedLanes & n),
      (e.warmLanes &= ~n),
      Be === e &&
        (Ce & n) === n &&
        (Xe === 4 || (Xe === 3 && (Ce & 62914560) === Ce && 300 > ot() - nu)
          ? (_e & 2) === 0 && aa(e, 0)
          : (eu |= n),
        ta === Ce && (ta = 0)),
      Ft(e);
  }
  function Lm(e, t) {
    t === 0 && (t = zs()), (e = Vl(e, t)), e !== null && (Ra(e, t), Ft(e));
  }
  function By(e) {
    var t = e.memoizedState,
      n = 0;
    t !== null && (n = t.retryLane), Lm(e, n);
  }
  function Yy(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var l = e.stateNode,
          i = e.memoizedState;
        i !== null && (n = i.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(c(314));
    }
    l !== null && l.delete(t), Lm(e, n);
  }
  function Vy(e, t) {
    return nt(e, t);
  }
  var Cr = null,
    ra = null,
    su = !1,
    Or = !1,
    fu = !1,
    xl = 0;
  function Ft(e) {
    e !== ra &&
      e.next === null &&
      (ra === null ? (Cr = ra = e) : (ra = ra.next = e)),
      (Or = !0),
      su || ((su = !0), ky());
  }
  function ui(e, t) {
    if (!fu && Or) {
      fu = !0;
      do
        for (var n = !1, l = Cr; l !== null; ) {
          if (e !== 0) {
            var i = l.pendingLanes;
            if (i === 0) var r = 0;
            else {
              var f = l.suspendedLanes,
                p = l.pingedLanes;
              (r = (1 << (31 - xt(42 | e) + 1)) - 1),
                (r &= i & ~(f & ~p)),
                (r = r & 201326741 ? (r & 201326741) | 1 : r ? r | 2 : 0);
            }
            r !== 0 && ((n = !0), qm(l, r));
          } else
            (r = Ce),
              (r = ji(
                l,
                l === Be ? r : 0,
                l.cancelPendingCommit !== null || l.timeoutHandle !== -1
              )),
              (r & 3) === 0 || Ta(l, r) || ((n = !0), qm(l, r));
          l = l.next;
        }
      while (n);
      fu = !1;
    }
  }
  function qy() {
    Bm();
  }
  function Bm() {
    Or = su = !1;
    var e = 0;
    xl !== 0 && (Py() && (e = xl), (xl = 0));
    for (var t = ot(), n = null, l = Cr; l !== null; ) {
      var i = l.next,
        r = Ym(l, t);
      r === 0
        ? ((l.next = null),
          n === null ? (Cr = i) : (n.next = i),
          i === null && (ra = n))
        : ((n = l), (e !== 0 || (r & 3) !== 0) && (Or = !0)),
        (l = i);
    }
    ui(e);
  }
  function Ym(e, t) {
    for (
      var n = e.suspendedLanes,
        l = e.pingedLanes,
        i = e.expirationTimes,
        r = e.pendingLanes & -62914561;
      0 < r;

    ) {
      var f = 31 - xt(r),
        p = 1 << f,
        x = i[f];
      x === -1
        ? ((p & n) === 0 || (p & l) !== 0) && (i[f] = mp(p, t))
        : x <= t && (e.expiredLanes |= p),
        (r &= ~p);
    }
    if (
      ((t = Be),
      (n = Ce),
      (n = ji(
        e,
        e === t ? n : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      (l = e.callbackNode),
      n === 0 ||
        (e === t && (ze === 2 || ze === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        l !== null && l !== null && mt(l),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((n & 3) === 0 || Ta(e, n)) {
      if (((t = n & -n), t === e.callbackPriority)) return t;
      switch ((l !== null && mt(l), Ro(n))) {
        case 2:
        case 8:
          n = Ms;
          break;
        case 32:
          n = _i;
          break;
        case 268435456:
          n = Ns;
          break;
        default:
          n = _i;
      }
      return (
        (l = Vm.bind(null, e)),
        (n = nt(n, l)),
        (e.callbackPriority = t),
        (e.callbackNode = n),
        t
      );
    }
    return (
      l !== null && l !== null && mt(l),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function Vm(e, t) {
    if (at !== 0 && at !== 5)
      return (e.callbackNode = null), (e.callbackPriority = 0), null;
    var n = e.callbackNode;
    if (Rr() && e.callbackNode !== n) return null;
    var l = Ce;
    return (
      (l = ji(
        e,
        e === Be ? l : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      l === 0
        ? null
        : (wm(e, l, t),
          Ym(e, ot()),
          e.callbackNode != null && e.callbackNode === n
            ? Vm.bind(null, e)
            : null)
    );
  }
  function qm(e, t) {
    if (Rr()) return null;
    wm(e, t, !0);
  }
  function ky() {
    Fy(function () {
      (_e & 6) !== 0 ? nt(ll, qy) : Bm();
    });
  }
  function du() {
    return xl === 0 && (xl = _s()), xl;
  }
  function km(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
      ? e
      : Yi("" + e);
  }
  function Gm(e, t) {
    var n = t.ownerDocument.createElement("input");
    return (
      (n.name = t.name),
      (n.value = t.value),
      e.id && n.setAttribute("form", e.id),
      t.parentNode.insertBefore(n, t),
      (e = new FormData(e)),
      n.parentNode.removeChild(n),
      e
    );
  }
  function Gy(e, t, n, l, i) {
    if (t === "submit" && n && n.stateNode === i) {
      var r = km((i[ht] || null).action),
        f = l.submitter;
      f &&
        ((t = (t = f[ht] || null)
          ? km(t.formAction)
          : f.getAttribute("formAction")),
        t !== null && ((r = t), (f = null)));
      var p = new Gi("action", "action", null, l, i);
      e.push({
        event: p,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (l.defaultPrevented) {
                if (xl !== 0) {
                  var x = f ? Gm(i, f) : new FormData(i);
                  zc(
                    n,
                    { pending: !0, data: x, method: i.method, action: r },
                    null,
                    x
                  );
                }
              } else
                typeof r == "function" &&
                  (p.preventDefault(),
                  (x = f ? Gm(i, f) : new FormData(i)),
                  zc(
                    n,
                    { pending: !0, data: x, method: i.method, action: r },
                    r,
                    x
                  ));
            },
            currentTarget: i,
          },
        ],
      });
    }
  }
  for (var mu = 0; mu < $o.length; mu++) {
    var hu = $o[mu],
      Xy = hu.toLowerCase(),
      Qy = hu[0].toUpperCase() + hu.slice(1);
    kt(Xy, "on" + Qy);
  }
  kt(wf, "onAnimationEnd"),
    kt(Ef, "onAnimationIteration"),
    kt(Af, "onAnimationStart"),
    kt("dblclick", "onDoubleClick"),
    kt("focusin", "onFocus"),
    kt("focusout", "onBlur"),
    kt(cy, "onTransitionRun"),
    kt(uy, "onTransitionStart"),
    kt(sy, "onTransitionCancel"),
    kt(Tf, "onTransitionEnd"),
    Nl("onMouseEnter", ["mouseout", "mouseover"]),
    Nl("onMouseLeave", ["mouseout", "mouseover"]),
    Nl("onPointerEnter", ["pointerout", "pointerover"]),
    Nl("onPointerLeave", ["pointerout", "pointerover"]),
    il(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    il(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    il("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    il(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    il(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    il(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
  var si =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    Zy = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(si)
    );
  function Xm(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var l = e[n],
        i = l.event;
      l = l.listeners;
      e: {
        var r = void 0;
        if (t)
          for (var f = l.length - 1; 0 <= f; f--) {
            var p = l[f],
              x = p.instance,
              z = p.currentTarget;
            if (((p = p.listener), x !== r && i.isPropagationStopped()))
              break e;
            (r = p), (i.currentTarget = z);
            try {
              r(i);
            } catch (V) {
              vr(V);
            }
            (i.currentTarget = null), (r = x);
          }
        else
          for (f = 0; f < l.length; f++) {
            if (
              ((p = l[f]),
              (x = p.instance),
              (z = p.currentTarget),
              (p = p.listener),
              x !== r && i.isPropagationStopped())
            )
              break e;
            (r = p), (i.currentTarget = z);
            try {
              r(i);
            } catch (V) {
              vr(V);
            }
            (i.currentTarget = null), (r = x);
          }
      }
    }
  }
  function Te(e, t) {
    var n = t[Co];
    n === void 0 && (n = t[Co] = new Set());
    var l = e + "__bubble";
    n.has(l) || (Qm(t, e, 2, !1), n.add(l));
  }
  function vu(e, t, n) {
    var l = 0;
    t && (l |= 4), Qm(n, e, l, t);
  }
  var Mr = "_reactListening" + Math.random().toString(36).slice(2);
  function gu(e) {
    if (!e[Mr]) {
      (e[Mr] = !0),
        Ls.forEach(function (n) {
          n !== "selectionchange" && (Zy.has(n) || vu(n, !1, e), vu(n, !0, e));
        });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Mr] || ((t[Mr] = !0), vu("selectionchange", !1, t));
    }
  }
  function Qm(e, t, n, l) {
    switch (vh(t)) {
      case 2:
        var i = b0;
        break;
      case 8:
        i = S0;
        break;
      default:
        i = Nu;
    }
    (n = i.bind(null, t, n, e)),
      (i = void 0),
      !Bo ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (i = !0),
      l
        ? i !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: i })
          : e.addEventListener(t, n, !0)
        : i !== void 0
        ? e.addEventListener(t, n, { passive: i })
        : e.addEventListener(t, n, !1);
  }
  function pu(e, t, n, l, i) {
    var r = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (;;) {
        if (l === null) return;
        var f = l.tag;
        if (f === 3 || f === 4) {
          var p = l.stateNode.containerInfo;
          if (p === i) break;
          if (f === 4)
            for (f = l.return; f !== null; ) {
              var x = f.tag;
              if ((x === 3 || x === 4) && f.stateNode.containerInfo === i)
                return;
              f = f.return;
            }
          for (; p !== null; ) {
            if (((f = Cl(p)), f === null)) return;
            if (((x = f.tag), x === 5 || x === 6 || x === 26 || x === 27)) {
              l = r = f;
              continue e;
            }
            p = p.parentNode;
          }
        }
        l = l.return;
      }
    $s(function () {
      var z = r,
        V = Ho(n),
        Z = [];
      e: {
        var j = Rf.get(e);
        if (j !== void 0) {
          var U = Gi,
            ve = e;
          switch (e) {
            case "keypress":
              if (qi(n) === 0) break e;
            case "keydown":
            case "keyup":
              U = Vp;
              break;
            case "focusin":
              (ve = "focus"), (U = ko);
              break;
            case "focusout":
              (ve = "blur"), (U = ko);
              break;
            case "beforeblur":
            case "afterblur":
              U = ko;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              U = ef;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              U = Op;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              U = Gp;
              break;
            case wf:
            case Ef:
            case Af:
              U = _p;
              break;
            case Tf:
              U = Qp;
              break;
            case "scroll":
            case "scrollend":
              U = Rp;
              break;
            case "wheel":
              U = Kp;
              break;
            case "copy":
            case "cut":
            case "paste":
              U = Dp;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              U = nf;
              break;
            case "toggle":
            case "beforetoggle":
              U = Wp;
          }
          var de = (t & 4) !== 0,
            Ue = !de && (e === "scroll" || e === "scrollend"),
            M = de ? (j !== null ? j + "Capture" : null) : j;
          de = [];
          for (var R = z, N; R !== null; ) {
            var G = R;
            if (
              ((N = G.stateNode),
              (G = G.tag),
              (G !== 5 && G !== 26 && G !== 27) ||
                N === null ||
                M === null ||
                ((G = Ma(R, M)), G != null && de.push(fi(R, G, N))),
              Ue)
            )
              break;
            R = R.return;
          }
          0 < de.length &&
            ((j = new U(j, ve, null, n, V)),
            Z.push({ event: j, listeners: de }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((j = e === "mouseover" || e === "pointerover"),
            (U = e === "mouseout" || e === "pointerout"),
            j &&
              n !== Uo &&
              (ve = n.relatedTarget || n.fromElement) &&
              (Cl(ve) || ve[Rl]))
          )
            break e;
          if (
            (U || j) &&
            ((j =
              V.window === V
                ? V
                : (j = V.ownerDocument)
                ? j.defaultView || j.parentWindow
                : window),
            U
              ? ((ve = n.relatedTarget || n.toElement),
                (U = z),
                (ve = ve ? Cl(ve) : null),
                ve !== null &&
                  ((Ue = d(ve)),
                  (de = ve.tag),
                  ve !== Ue || (de !== 5 && de !== 27 && de !== 6)) &&
                  (ve = null))
              : ((U = null), (ve = z)),
            U !== ve)
          ) {
            if (
              ((de = ef),
              (G = "onMouseLeave"),
              (M = "onMouseEnter"),
              (R = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((de = nf),
                (G = "onPointerLeave"),
                (M = "onPointerEnter"),
                (R = "pointer")),
              (Ue = U == null ? j : Oa(U)),
              (N = ve == null ? j : Oa(ve)),
              (j = new de(G, R + "leave", U, n, V)),
              (j.target = Ue),
              (j.relatedTarget = N),
              (G = null),
              Cl(V) === z &&
                ((de = new de(M, R + "enter", ve, n, V)),
                (de.target = N),
                (de.relatedTarget = Ue),
                (G = de)),
              (Ue = G),
              U && ve)
            )
              t: {
                for (de = U, M = ve, R = 0, N = de; N; N = oa(N)) R++;
                for (N = 0, G = M; G; G = oa(G)) N++;
                for (; 0 < R - N; ) (de = oa(de)), R--;
                for (; 0 < N - R; ) (M = oa(M)), N--;
                for (; R--; ) {
                  if (de === M || (M !== null && de === M.alternate)) break t;
                  (de = oa(de)), (M = oa(M));
                }
                de = null;
              }
            else de = null;
            U !== null && Zm(Z, j, U, de, !1),
              ve !== null && Ue !== null && Zm(Z, Ue, ve, de, !0);
          }
        }
        e: {
          if (
            ((j = z ? Oa(z) : window),
            (U = j.nodeName && j.nodeName.toLowerCase()),
            U === "select" || (U === "input" && j.type === "file"))
          )
            var le = ff;
          else if (uf(j))
            if (df) le = iy;
            else {
              le = ly;
              var xe = ny;
            }
          else
            (U = j.nodeName),
              !U ||
              U.toLowerCase() !== "input" ||
              (j.type !== "checkbox" && j.type !== "radio")
                ? z && jo(z.elementType) && (le = ff)
                : (le = ay);
          if (le && (le = le(e, z))) {
            sf(Z, le, n, V);
            break e;
          }
          xe && xe(e, j, z),
            e === "focusout" &&
              z &&
              j.type === "number" &&
              z.memoizedProps.value != null &&
              Do(j, "number", j.value);
        }
        switch (((xe = z ? Oa(z) : window), e)) {
          case "focusin":
            (uf(xe) || xe.contentEditable === "true") &&
              ((Ll = xe), (Jo = z), (La = null));
            break;
          case "focusout":
            La = Jo = Ll = null;
            break;
          case "mousedown":
            Wo = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (Wo = !1), Sf(Z, n, V);
            break;
          case "selectionchange":
            if (oy) break;
          case "keydown":
          case "keyup":
            Sf(Z, n, V);
        }
        var ce;
        if (Xo)
          e: {
            switch (e) {
              case "compositionstart":
                var he = "onCompositionStart";
                break e;
              case "compositionend":
                he = "onCompositionEnd";
                break e;
              case "compositionupdate":
                he = "onCompositionUpdate";
                break e;
            }
            he = void 0;
          }
        else
          Hl
            ? of(e, n) && (he = "onCompositionEnd")
            : e === "keydown" &&
              n.keyCode === 229 &&
              (he = "onCompositionStart");
        he &&
          (lf &&
            n.locale !== "ko" &&
            (Hl || he !== "onCompositionStart"
              ? he === "onCompositionEnd" && Hl && (ce = Fs())
              : ((Rn = V),
                (Yo = "value" in Rn ? Rn.value : Rn.textContent),
                (Hl = !0))),
          (xe = Nr(z, he)),
          0 < xe.length &&
            ((he = new tf(he, e, null, n, V)),
            Z.push({ event: he, listeners: xe }),
            ce
              ? (he.data = ce)
              : ((ce = cf(n)), ce !== null && (he.data = ce)))),
          (ce = $p ? Fp(e, n) : Ip(e, n)) &&
            ((he = Nr(z, "onBeforeInput")),
            0 < he.length &&
              ((xe = new tf("onBeforeInput", "beforeinput", null, n, V)),
              Z.push({ event: xe, listeners: he }),
              (xe.data = ce))),
          Gy(Z, e, z, n, V);
      }
      Xm(Z, t);
    });
  }
  function fi(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Nr(e, t) {
    for (var n = t + "Capture", l = []; e !== null; ) {
      var i = e,
        r = i.stateNode;
      if (
        ((i = i.tag),
        (i !== 5 && i !== 26 && i !== 27) ||
          r === null ||
          ((i = Ma(e, n)),
          i != null && l.unshift(fi(e, i, r)),
          (i = Ma(e, t)),
          i != null && l.push(fi(e, i, r))),
        e.tag === 3)
      )
        return l;
      e = e.return;
    }
    return [];
  }
  function oa(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Zm(e, t, n, l, i) {
    for (var r = t._reactName, f = []; n !== null && n !== l; ) {
      var p = n,
        x = p.alternate,
        z = p.stateNode;
      if (((p = p.tag), x !== null && x === l)) break;
      (p !== 5 && p !== 26 && p !== 27) ||
        z === null ||
        ((x = z),
        i
          ? ((z = Ma(n, r)), z != null && f.unshift(fi(n, z, x)))
          : i || ((z = Ma(n, r)), z != null && f.push(fi(n, z, x)))),
        (n = n.return);
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var Ky = /\r\n?/g,
    Jy = /\u0000|\uFFFD/g;
  function Km(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        Ky,
        `
`
      )
      .replace(Jy, "");
  }
  function Jm(e, t) {
    return (t = Km(t)), Km(e) === t;
  }
  function _r() {}
  function je(e, t, n, l, i, r) {
    switch (n) {
      case "children":
        typeof l == "string"
          ? t === "body" || (t === "textarea" && l === "") || Dl(e, l)
          : (typeof l == "number" || typeof l == "bigint") &&
            t !== "body" &&
            Dl(e, "" + l);
        break;
      case "className":
        Hi(e, "class", l);
        break;
      case "tabIndex":
        Hi(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Hi(e, n, l);
        break;
      case "style":
        Ws(e, l, r);
        break;
      case "data":
        if (t !== "object") {
          Hi(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (
          l == null ||
          typeof l == "function" ||
          typeof l == "symbol" ||
          typeof l == "boolean"
        ) {
          e.removeAttribute(n);
          break;
        }
        (l = Yi("" + l)), e.setAttribute(n, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          e.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof r == "function" &&
            (n === "formAction"
              ? (t !== "input" && je(e, t, "name", i.name, i, null),
                je(e, t, "formEncType", i.formEncType, i, null),
                je(e, t, "formMethod", i.formMethod, i, null),
                je(e, t, "formTarget", i.formTarget, i, null))
              : (je(e, t, "encType", i.encType, i, null),
                je(e, t, "method", i.method, i, null),
                je(e, t, "target", i.target, i, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(n);
          break;
        }
        (l = Yi("" + l)), e.setAttribute(n, l);
        break;
      case "onClick":
        l != null && (e.onclick = _r);
        break;
      case "onScroll":
        l != null && Te("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Te("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(c(61));
          if (((n = l.__html), n != null)) {
            if (i.children != null) throw Error(c(60));
            e.innerHTML = n;
          }
        }
        break;
      case "multiple":
        e.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        e.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          l == null ||
          typeof l == "function" ||
          typeof l == "boolean" ||
          typeof l == "symbol"
        ) {
          e.removeAttribute("xlink:href");
          break;
        }
        (n = Yi("" + l)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol"
          ? e.setAttribute(n, "" + l)
          : e.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol"
          ? e.setAttribute(n, "")
          : e.removeAttribute(n);
        break;
      case "capture":
      case "download":
        l === !0
          ? e.setAttribute(n, "")
          : l !== !1 &&
            l != null &&
            typeof l != "function" &&
            typeof l != "symbol"
          ? e.setAttribute(n, l)
          : e.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null &&
        typeof l != "function" &&
        typeof l != "symbol" &&
        !isNaN(l) &&
        1 <= l
          ? e.setAttribute(n, l)
          : e.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l)
          ? e.removeAttribute(n)
          : e.setAttribute(n, l);
        break;
      case "popover":
        Te("beforetoggle", e), Te("toggle", e), Ui(e, "popover", l);
        break;
      case "xlinkActuate":
        rn(e, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
        break;
      case "xlinkArcrole":
        rn(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
        break;
      case "xlinkRole":
        rn(e, "http://www.w3.org/1999/xlink", "xlink:role", l);
        break;
      case "xlinkShow":
        rn(e, "http://www.w3.org/1999/xlink", "xlink:show", l);
        break;
      case "xlinkTitle":
        rn(e, "http://www.w3.org/1999/xlink", "xlink:title", l);
        break;
      case "xlinkType":
        rn(e, "http://www.w3.org/1999/xlink", "xlink:type", l);
        break;
      case "xmlBase":
        rn(e, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
        break;
      case "xmlLang":
        rn(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
        break;
      case "xmlSpace":
        rn(e, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
        break;
      case "is":
        Ui(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) ||
          (n[0] !== "o" && n[0] !== "O") ||
          (n[1] !== "n" && n[1] !== "N")) &&
          ((n = Ap.get(n) || n), Ui(e, n, l));
    }
  }
  function yu(e, t, n, l, i, r) {
    switch (n) {
      case "style":
        Ws(e, l, r);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(c(61));
          if (((n = l.__html), n != null)) {
            if (i.children != null) throw Error(c(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof l == "string"
          ? Dl(e, l)
          : (typeof l == "number" || typeof l == "bigint") && Dl(e, "" + l);
        break;
      case "onScroll":
        l != null && Te("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Te("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = _r);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Bs.hasOwnProperty(n))
          e: {
            if (
              n[0] === "o" &&
              n[1] === "n" &&
              ((i = n.endsWith("Capture")),
              (t = n.slice(2, i ? n.length - 7 : void 0)),
              (r = e[ht] || null),
              (r = r != null ? r[n] : null),
              typeof r == "function" && e.removeEventListener(t, r, i),
              typeof l == "function")
            ) {
              typeof r != "function" &&
                r !== null &&
                (n in e
                  ? (e[n] = null)
                  : e.hasAttribute(n) && e.removeAttribute(n)),
                e.addEventListener(t, l, i);
              break e;
            }
            n in e
              ? (e[n] = l)
              : l === !0
              ? e.setAttribute(n, "")
              : Ui(e, n, l);
          }
    }
  }
  function it(e, t, n) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Te("error", e), Te("load", e);
        var l = !1,
          i = !1,
          r;
        for (r in n)
          if (n.hasOwnProperty(r)) {
            var f = n[r];
            if (f != null)
              switch (r) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  i = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(c(137, t));
                default:
                  je(e, t, r, f, n, null);
              }
          }
        i && je(e, t, "srcSet", n.srcSet, n, null),
          l && je(e, t, "src", n.src, n, null);
        return;
      case "input":
        Te("invalid", e);
        var p = (r = f = i = null),
          x = null,
          z = null;
        for (l in n)
          if (n.hasOwnProperty(l)) {
            var V = n[l];
            if (V != null)
              switch (l) {
                case "name":
                  i = V;
                  break;
                case "type":
                  f = V;
                  break;
                case "checked":
                  x = V;
                  break;
                case "defaultChecked":
                  z = V;
                  break;
                case "value":
                  r = V;
                  break;
                case "defaultValue":
                  p = V;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (V != null) throw Error(c(137, t));
                  break;
                default:
                  je(e, t, l, V, n, null);
              }
          }
        Qs(e, r, p, x, z, f, i, !1), Li(e);
        return;
      case "select":
        Te("invalid", e), (l = f = r = null);
        for (i in n)
          if (n.hasOwnProperty(i) && ((p = n[i]), p != null))
            switch (i) {
              case "value":
                r = p;
                break;
              case "defaultValue":
                f = p;
                break;
              case "multiple":
                l = p;
              default:
                je(e, t, i, p, n, null);
            }
        (t = r),
          (n = f),
          (e.multiple = !!l),
          t != null ? zl(e, !!l, t, !1) : n != null && zl(e, !!l, n, !0);
        return;
      case "textarea":
        Te("invalid", e), (r = i = l = null);
        for (f in n)
          if (n.hasOwnProperty(f) && ((p = n[f]), p != null))
            switch (f) {
              case "value":
                l = p;
                break;
              case "defaultValue":
                i = p;
                break;
              case "children":
                r = p;
                break;
              case "dangerouslySetInnerHTML":
                if (p != null) throw Error(c(91));
                break;
              default:
                je(e, t, f, p, n, null);
            }
        Ks(e, l, i, r), Li(e);
        return;
      case "option":
        for (x in n)
          if (n.hasOwnProperty(x) && ((l = n[x]), l != null))
            switch (x) {
              case "selected":
                e.selected =
                  l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                je(e, t, x, l, n, null);
            }
        return;
      case "dialog":
        Te("beforetoggle", e), Te("toggle", e), Te("cancel", e), Te("close", e);
        break;
      case "iframe":
      case "object":
        Te("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < si.length; l++) Te(si[l], e);
        break;
      case "image":
        Te("error", e), Te("load", e);
        break;
      case "details":
        Te("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Te("error", e), Te("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (z in n)
          if (n.hasOwnProperty(z) && ((l = n[z]), l != null))
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(c(137, t));
              default:
                je(e, t, z, l, n, null);
            }
        return;
      default:
        if (jo(t)) {
          for (V in n)
            n.hasOwnProperty(V) &&
              ((l = n[V]), l !== void 0 && yu(e, t, V, l, n, void 0));
          return;
        }
    }
    for (p in n)
      n.hasOwnProperty(p) && ((l = n[p]), l != null && je(e, t, p, l, n, null));
  }
  function Wy(e, t, n, l) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var i = null,
          r = null,
          f = null,
          p = null,
          x = null,
          z = null,
          V = null;
        for (U in n) {
          var Z = n[U];
          if (n.hasOwnProperty(U) && Z != null)
            switch (U) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                x = Z;
              default:
                l.hasOwnProperty(U) || je(e, t, U, null, l, Z);
            }
        }
        for (var j in l) {
          var U = l[j];
          if (((Z = n[j]), l.hasOwnProperty(j) && (U != null || Z != null)))
            switch (j) {
              case "type":
                r = U;
                break;
              case "name":
                i = U;
                break;
              case "checked":
                z = U;
                break;
              case "defaultChecked":
                V = U;
                break;
              case "value":
                f = U;
                break;
              case "defaultValue":
                p = U;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (U != null) throw Error(c(137, t));
                break;
              default:
                U !== Z && je(e, t, j, U, l, Z);
            }
        }
        zo(e, f, p, x, z, V, r, i);
        return;
      case "select":
        U = f = p = j = null;
        for (r in n)
          if (((x = n[r]), n.hasOwnProperty(r) && x != null))
            switch (r) {
              case "value":
                break;
              case "multiple":
                U = x;
              default:
                l.hasOwnProperty(r) || je(e, t, r, null, l, x);
            }
        for (i in l)
          if (
            ((r = l[i]),
            (x = n[i]),
            l.hasOwnProperty(i) && (r != null || x != null))
          )
            switch (i) {
              case "value":
                j = r;
                break;
              case "defaultValue":
                p = r;
                break;
              case "multiple":
                f = r;
              default:
                r !== x && je(e, t, i, r, l, x);
            }
        (t = p),
          (n = f),
          (l = U),
          j != null
            ? zl(e, !!n, j, !1)
            : !!l != !!n &&
              (t != null ? zl(e, !!n, t, !0) : zl(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        U = j = null;
        for (p in n)
          if (
            ((i = n[p]),
            n.hasOwnProperty(p) && i != null && !l.hasOwnProperty(p))
          )
            switch (p) {
              case "value":
                break;
              case "children":
                break;
              default:
                je(e, t, p, null, l, i);
            }
        for (f in l)
          if (
            ((i = l[f]),
            (r = n[f]),
            l.hasOwnProperty(f) && (i != null || r != null))
          )
            switch (f) {
              case "value":
                j = i;
                break;
              case "defaultValue":
                U = i;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (i != null) throw Error(c(91));
                break;
              default:
                i !== r && je(e, t, f, i, l, r);
            }
        Zs(e, j, U);
        return;
      case "option":
        for (var ve in n)
          if (
            ((j = n[ve]),
            n.hasOwnProperty(ve) && j != null && !l.hasOwnProperty(ve))
          )
            switch (ve) {
              case "selected":
                e.selected = !1;
                break;
              default:
                je(e, t, ve, null, l, j);
            }
        for (x in l)
          if (
            ((j = l[x]),
            (U = n[x]),
            l.hasOwnProperty(x) && j !== U && (j != null || U != null))
          )
            switch (x) {
              case "selected":
                e.selected =
                  j && typeof j != "function" && typeof j != "symbol";
                break;
              default:
                je(e, t, x, j, l, U);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var de in n)
          (j = n[de]),
            n.hasOwnProperty(de) &&
              j != null &&
              !l.hasOwnProperty(de) &&
              je(e, t, de, null, l, j);
        for (z in l)
          if (
            ((j = l[z]),
            (U = n[z]),
            l.hasOwnProperty(z) && j !== U && (j != null || U != null))
          )
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (j != null) throw Error(c(137, t));
                break;
              default:
                je(e, t, z, j, l, U);
            }
        return;
      default:
        if (jo(t)) {
          for (var Ue in n)
            (j = n[Ue]),
              n.hasOwnProperty(Ue) &&
                j !== void 0 &&
                !l.hasOwnProperty(Ue) &&
                yu(e, t, Ue, void 0, l, j);
          for (V in l)
            (j = l[V]),
              (U = n[V]),
              !l.hasOwnProperty(V) ||
                j === U ||
                (j === void 0 && U === void 0) ||
                yu(e, t, V, j, l, U);
          return;
        }
    }
    for (var M in n)
      (j = n[M]),
        n.hasOwnProperty(M) &&
          j != null &&
          !l.hasOwnProperty(M) &&
          je(e, t, M, null, l, j);
    for (Z in l)
      (j = l[Z]),
        (U = n[Z]),
        !l.hasOwnProperty(Z) ||
          j === U ||
          (j == null && U == null) ||
          je(e, t, Z, j, l, U);
  }
  var bu = null,
    Su = null;
  function zr(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Wm(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Pm(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function xu(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var wu = null;
  function Py() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === wu
        ? !1
        : ((wu = e), !0)
      : ((wu = null), !1);
  }
  var $m = typeof setTimeout == "function" ? setTimeout : void 0,
    $y = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Fm = typeof Promise == "function" ? Promise : void 0,
    Fy =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Fm < "u"
        ? function (e) {
            return Fm.resolve(null).then(e).catch(Iy);
          }
        : $m;
  function Iy(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function kn(e) {
    return e === "head";
  }
  function Im(e, t) {
    var n = t,
      l = 0,
      i = 0;
    do {
      var r = n.nextSibling;
      if ((e.removeChild(n), r && r.nodeType === 8))
        if (((n = r.data), n === "/$")) {
          if (0 < l && 8 > l) {
            n = l;
            var f = e.ownerDocument;
            if ((n & 1 && di(f.documentElement), n & 2 && di(f.body), n & 4))
              for (n = f.head, di(n), f = n.firstChild; f; ) {
                var p = f.nextSibling,
                  x = f.nodeName;
                f[Ca] ||
                  x === "SCRIPT" ||
                  x === "STYLE" ||
                  (x === "LINK" && f.rel.toLowerCase() === "stylesheet") ||
                  n.removeChild(f),
                  (f = p);
              }
          }
          if (i === 0) {
            e.removeChild(r), Si(t);
            return;
          }
          i--;
        } else
          n === "$" || n === "$?" || n === "$!"
            ? i++
            : (l = n.charCodeAt(0) - 48);
      else l = 0;
      n = r;
    } while (n);
    Si(t);
  }
  function Eu(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (((t = t.nextSibling), n.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Eu(n), Oo(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(n);
    }
  }
  function e0(e, t, n, l) {
    for (; e.nodeType === 1; ) {
      var i = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (l) {
        if (!e[Ca])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (
                ((r = e.getAttribute("rel")),
                r === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break;
              if (
                r !== i.rel ||
                e.getAttribute("href") !==
                  (i.href == null || i.href === "" ? null : i.href) ||
                e.getAttribute("crossorigin") !==
                  (i.crossOrigin == null ? null : i.crossOrigin) ||
                e.getAttribute("title") !== (i.title == null ? null : i.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((r = e.getAttribute("src")),
                (r !== (i.src == null ? null : i.src) ||
                  e.getAttribute("type") !== (i.type == null ? null : i.type) ||
                  e.getAttribute("crossorigin") !==
                    (i.crossOrigin == null ? null : i.crossOrigin)) &&
                  r &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var r = i.name == null ? null : "" + i.name;
        if (i.type === "hidden" && e.getAttribute("name") === r) return e;
      } else return e;
      if (((e = Xt(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function t0(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !n) ||
        ((e = Xt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Au(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState === "complete")
    );
  }
  function n0(e, t) {
    var n = e.ownerDocument;
    if (e.data !== "$?" || n.readyState === "complete") t();
    else {
      var l = function () {
        t(), n.removeEventListener("DOMContentLoaded", l);
      };
      n.addEventListener("DOMContentLoaded", l), (e._reactRetry = l);
    }
  }
  function Xt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F")
        )
          break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  var Tu = null;
  function eh(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0) return e;
          t--;
        } else n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function th(e, t, n) {
    switch (((t = zr(n)), e)) {
      case "html":
        if (((e = t.documentElement), !e)) throw Error(c(452));
        return e;
      case "head":
        if (((e = t.head), !e)) throw Error(c(453));
        return e;
      case "body":
        if (((e = t.body), !e)) throw Error(c(454));
        return e;
      default:
        throw Error(c(451));
    }
  }
  function di(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    Oo(e);
  }
  var Vt = new Map(),
    nh = new Set();
  function Dr(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
      ? e
      : e.ownerDocument;
  }
  var Sn = k.d;
  k.d = { f: l0, r: a0, D: i0, C: r0, L: o0, m: c0, X: s0, S: u0, M: f0 };
  function l0() {
    var e = Sn.f(),
      t = Ar();
    return e || t;
  }
  function a0(e) {
    var t = Ol(e);
    t !== null && t.tag === 5 && t.type === "form" ? wd(t) : Sn.r(e);
  }
  var ca = typeof document > "u" ? null : document;
  function lh(e, t, n) {
    var l = ca;
    if (l && typeof t == "string" && t) {
      var i = Dt(t);
      (i = 'link[rel="' + e + '"][href="' + i + '"]'),
        typeof n == "string" && (i += '[crossorigin="' + n + '"]'),
        nh.has(i) ||
          (nh.add(i),
          (e = { rel: e, crossOrigin: n, href: t }),
          l.querySelector(i) === null &&
            ((t = l.createElement("link")),
            it(t, "link", e),
            Fe(t),
            l.head.appendChild(t)));
    }
  }
  function i0(e) {
    Sn.D(e), lh("dns-prefetch", e, null);
  }
  function r0(e, t) {
    Sn.C(e, t), lh("preconnect", e, t);
  }
  function o0(e, t, n) {
    Sn.L(e, t, n);
    var l = ca;
    if (l && e && t) {
      var i = 'link[rel="preload"][as="' + Dt(t) + '"]';
      t === "image" && n && n.imageSrcSet
        ? ((i += '[imagesrcset="' + Dt(n.imageSrcSet) + '"]'),
          typeof n.imageSizes == "string" &&
            (i += '[imagesizes="' + Dt(n.imageSizes) + '"]'))
        : (i += '[href="' + Dt(e) + '"]');
      var r = i;
      switch (t) {
        case "style":
          r = ua(e);
          break;
        case "script":
          r = sa(e);
      }
      Vt.has(r) ||
        ((e = y(
          {
            rel: "preload",
            href: t === "image" && n && n.imageSrcSet ? void 0 : e,
            as: t,
          },
          n
        )),
        Vt.set(r, e),
        l.querySelector(i) !== null ||
          (t === "style" && l.querySelector(mi(r))) ||
          (t === "script" && l.querySelector(hi(r))) ||
          ((t = l.createElement("link")),
          it(t, "link", e),
          Fe(t),
          l.head.appendChild(t)));
    }
  }
  function c0(e, t) {
    Sn.m(e, t);
    var n = ca;
    if (n && e) {
      var l = t && typeof t.as == "string" ? t.as : "script",
        i =
          'link[rel="modulepreload"][as="' + Dt(l) + '"][href="' + Dt(e) + '"]',
        r = i;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          r = sa(e);
      }
      if (
        !Vt.has(r) &&
        ((e = y({ rel: "modulepreload", href: e }, t)),
        Vt.set(r, e),
        n.querySelector(i) === null)
      ) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(hi(r))) return;
        }
        (l = n.createElement("link")),
          it(l, "link", e),
          Fe(l),
          n.head.appendChild(l);
      }
    }
  }
  function u0(e, t, n) {
    Sn.S(e, t, n);
    var l = ca;
    if (l && e) {
      var i = Ml(l).hoistableStyles,
        r = ua(e);
      t = t || "default";
      var f = i.get(r);
      if (!f) {
        var p = { loading: 0, preload: null };
        if ((f = l.querySelector(mi(r)))) p.loading = 5;
        else {
          (e = y({ rel: "stylesheet", href: e, "data-precedence": t }, n)),
            (n = Vt.get(r)) && Ru(e, n);
          var x = (f = l.createElement("link"));
          Fe(x),
            it(x, "link", e),
            (x._p = new Promise(function (z, V) {
              (x.onload = z), (x.onerror = V);
            })),
            x.addEventListener("load", function () {
              p.loading |= 1;
            }),
            x.addEventListener("error", function () {
              p.loading |= 2;
            }),
            (p.loading |= 4),
            jr(f, t, l);
        }
        (f = { type: "stylesheet", instance: f, count: 1, state: p }),
          i.set(r, f);
      }
    }
  }
  function s0(e, t) {
    Sn.X(e, t);
    var n = ca;
    if (n && e) {
      var l = Ml(n).hoistableScripts,
        i = sa(e),
        r = l.get(i);
      r ||
        ((r = n.querySelector(hi(i))),
        r ||
          ((e = y({ src: e, async: !0 }, t)),
          (t = Vt.get(i)) && Cu(e, t),
          (r = n.createElement("script")),
          Fe(r),
          it(r, "link", e),
          n.head.appendChild(r)),
        (r = { type: "script", instance: r, count: 1, state: null }),
        l.set(i, r));
    }
  }
  function f0(e, t) {
    Sn.M(e, t);
    var n = ca;
    if (n && e) {
      var l = Ml(n).hoistableScripts,
        i = sa(e),
        r = l.get(i);
      r ||
        ((r = n.querySelector(hi(i))),
        r ||
          ((e = y({ src: e, async: !0, type: "module" }, t)),
          (t = Vt.get(i)) && Cu(e, t),
          (r = n.createElement("script")),
          Fe(r),
          it(r, "link", e),
          n.head.appendChild(r)),
        (r = { type: "script", instance: r, count: 1, state: null }),
        l.set(i, r));
    }
  }
  function ah(e, t, n, l) {
    var i = (i = se.current) ? Dr(i) : null;
    if (!i) throw Error(c(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string"
          ? ((t = ua(n.href)),
            (n = Ml(i).hoistableStyles),
            (l = n.get(t)),
            l ||
              ((l = { type: "style", instance: null, count: 0, state: null }),
              n.set(t, l)),
            l)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          n.rel === "stylesheet" &&
          typeof n.href == "string" &&
          typeof n.precedence == "string"
        ) {
          e = ua(n.href);
          var r = Ml(i).hoistableStyles,
            f = r.get(e);
          if (
            (f ||
              ((i = i.ownerDocument || i),
              (f = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              r.set(e, f),
              (r = i.querySelector(mi(e))) &&
                !r._p &&
                ((f.instance = r), (f.state.loading = 5)),
              Vt.has(e) ||
                ((n = {
                  rel: "preload",
                  as: "style",
                  href: n.href,
                  crossOrigin: n.crossOrigin,
                  integrity: n.integrity,
                  media: n.media,
                  hrefLang: n.hrefLang,
                  referrerPolicy: n.referrerPolicy,
                }),
                Vt.set(e, n),
                r || d0(i, e, n, f.state))),
            t && l === null)
          )
            throw Error(c(528, ""));
          return f;
        }
        if (t && l !== null) throw Error(c(529, ""));
        return null;
      case "script":
        return (
          (t = n.async),
          (n = n.src),
          typeof n == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = sa(n)),
              (n = Ml(i).hoistableScripts),
              (l = n.get(t)),
              l ||
                ((l = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                n.set(t, l)),
              l)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(c(444, e));
    }
  }
  function ua(e) {
    return 'href="' + Dt(e) + '"';
  }
  function mi(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function ih(e) {
    return y({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function d0(e, t, n, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (l.loading = 1)
      : ((t = e.createElement("link")),
        (l.preload = t),
        t.addEventListener("load", function () {
          return (l.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (l.loading |= 2);
        }),
        it(t, "link", n),
        Fe(t),
        e.head.appendChild(t));
  }
  function sa(e) {
    return '[src="' + Dt(e) + '"]';
  }
  function hi(e) {
    return "script[async]" + e;
  }
  function rh(e, t, n) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var l = e.querySelector('style[data-href~="' + Dt(n.href) + '"]');
          if (l) return (t.instance = l), Fe(l), l;
          var i = y({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null,
          });
          return (
            (l = (e.ownerDocument || e).createElement("style")),
            Fe(l),
            it(l, "style", i),
            jr(l, n.precedence, e),
            (t.instance = l)
          );
        case "stylesheet":
          i = ua(n.href);
          var r = e.querySelector(mi(i));
          if (r) return (t.state.loading |= 4), (t.instance = r), Fe(r), r;
          (l = ih(n)),
            (i = Vt.get(i)) && Ru(l, i),
            (r = (e.ownerDocument || e).createElement("link")),
            Fe(r);
          var f = r;
          return (
            (f._p = new Promise(function (p, x) {
              (f.onload = p), (f.onerror = x);
            })),
            it(r, "link", l),
            (t.state.loading |= 4),
            jr(r, n.precedence, e),
            (t.instance = r)
          );
        case "script":
          return (
            (r = sa(n.src)),
            (i = e.querySelector(hi(r)))
              ? ((t.instance = i), Fe(i), i)
              : ((l = n),
                (i = Vt.get(r)) && ((l = y({}, n)), Cu(l, i)),
                (e = e.ownerDocument || e),
                (i = e.createElement("script")),
                Fe(i),
                it(i, "link", l),
                e.head.appendChild(i),
                (t.instance = i))
          );
        case "void":
          return null;
        default:
          throw Error(c(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((l = t.instance), (t.state.loading |= 4), jr(l, n.precedence, e));
    return t.instance;
  }
  function jr(e, t, n) {
    for (
      var l = n.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        i = l.length ? l[l.length - 1] : null,
        r = i,
        f = 0;
      f < l.length;
      f++
    ) {
      var p = l[f];
      if (p.dataset.precedence === t) r = p;
      else if (r !== i) break;
    }
    r
      ? r.parentNode.insertBefore(e, r.nextSibling)
      : ((t = n.nodeType === 9 ? n.head : n), t.insertBefore(e, t.firstChild));
  }
  function Ru(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title);
  }
  function Cu(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity);
  }
  var Ur = null;
  function oh(e, t, n) {
    if (Ur === null) {
      var l = new Map(),
        i = (Ur = new Map());
      i.set(n, l);
    } else (i = Ur), (l = i.get(n)), l || ((l = new Map()), i.set(n, l));
    if (l.has(e)) return l;
    for (
      l.set(e, null), n = n.getElementsByTagName(e), i = 0;
      i < n.length;
      i++
    ) {
      var r = n[i];
      if (
        !(
          r[Ca] ||
          r[ct] ||
          (e === "link" && r.getAttribute("rel") === "stylesheet")
        ) &&
        r.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var f = r.getAttribute(t) || "";
        f = e + f;
        var p = l.get(f);
        p ? p.push(r) : l.set(f, [r]);
      }
    }
    return l;
  }
  function ch(e, t, n) {
    (e = e.ownerDocument || e),
      e.head.insertBefore(
        n,
        t === "title" ? e.querySelector("head > title") : null
      );
  }
  function m0(e, t, n) {
    if (n === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case "stylesheet":
            return (
              (e = t.disabled), typeof t.precedence == "string" && e == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function uh(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  var vi = null;
  function h0() {}
  function v0(e, t, n) {
    if (vi === null) throw Error(c(475));
    var l = vi;
    if (
      t.type === "stylesheet" &&
      (typeof n.media != "string" || matchMedia(n.media).matches !== !1) &&
      (t.state.loading & 4) === 0
    ) {
      if (t.instance === null) {
        var i = ua(n.href),
          r = e.querySelector(mi(i));
        if (r) {
          (e = r._p),
            e !== null &&
              typeof e == "object" &&
              typeof e.then == "function" &&
              (l.count++, (l = Hr.bind(l)), e.then(l, l)),
            (t.state.loading |= 4),
            (t.instance = r),
            Fe(r);
          return;
        }
        (r = e.ownerDocument || e),
          (n = ih(n)),
          (i = Vt.get(i)) && Ru(n, i),
          (r = r.createElement("link")),
          Fe(r);
        var f = r;
        (f._p = new Promise(function (p, x) {
          (f.onload = p), (f.onerror = x);
        })),
          it(r, "link", n),
          (t.instance = r);
      }
      l.stylesheets === null && (l.stylesheets = new Map()),
        l.stylesheets.set(t, e),
        (e = t.state.preload) &&
          (t.state.loading & 3) === 0 &&
          (l.count++,
          (t = Hr.bind(l)),
          e.addEventListener("load", t),
          e.addEventListener("error", t));
    }
  }
  function g0() {
    if (vi === null) throw Error(c(475));
    var e = vi;
    return (
      e.stylesheets && e.count === 0 && Ou(e, e.stylesheets),
      0 < e.count
        ? function (t) {
            var n = setTimeout(function () {
              if ((e.stylesheets && Ou(e, e.stylesheets), e.unsuspend)) {
                var l = e.unsuspend;
                (e.unsuspend = null), l();
              }
            }, 6e4);
            return (
              (e.unsuspend = t),
              function () {
                (e.unsuspend = null), clearTimeout(n);
              }
            );
          }
        : null
    );
  }
  function Hr() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) Ou(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        (this.unsuspend = null), e();
      }
    }
  }
  var Lr = null;
  function Ou(e, t) {
    (e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (Lr = new Map()),
        t.forEach(p0, e),
        (Lr = null),
        Hr.call(e));
  }
  function p0(e, t) {
    if (!(t.state.loading & 4)) {
      var n = Lr.get(e);
      if (n) var l = n.get(null);
      else {
        (n = new Map()), Lr.set(e, n);
        for (
          var i = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            r = 0;
          r < i.length;
          r++
        ) {
          var f = i[r];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") &&
            (n.set(f.dataset.precedence, f), (l = f));
        }
        l && n.set(null, l);
      }
      (i = t.instance),
        (f = i.getAttribute("data-precedence")),
        (r = n.get(f) || l),
        r === l && n.set(null, i),
        n.set(f, i),
        this.count++,
        (l = Hr.bind(this)),
        i.addEventListener("load", l),
        i.addEventListener("error", l),
        r
          ? r.parentNode.insertBefore(i, r.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(i, e.firstChild)),
        (t.state.loading |= 4);
    }
  }
  var gi = {
    $$typeof: Y,
    Provider: null,
    Consumer: null,
    _currentValue: B,
    _currentValue2: B,
    _threadCount: 0,
  };
  function y0(e, t, n, l, i, r, f, p) {
    (this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Ao(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Ao(0)),
      (this.hiddenUpdates = Ao(null)),
      (this.identifierPrefix = l),
      (this.onUncaughtError = i),
      (this.onCaughtError = r),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = p),
      (this.incompleteTransitions = new Map());
  }
  function sh(e, t, n, l, i, r, f, p, x, z, V, Z) {
    return (
      (e = new y0(e, t, n, f, p, x, z, Z)),
      (t = 1),
      r === !0 && (t |= 24),
      (r = Et(3, null, null, t)),
      (e.current = r),
      (r.stateNode = e),
      (t = uc()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (r.memoizedState = { element: l, isDehydrated: n, cache: t }),
      mc(r),
      e
    );
  }
  function fh(e) {
    return e ? ((e = ql), e) : ql;
  }
  function dh(e, t, n, l, i, r) {
    (i = fh(i)),
      l.context === null ? (l.context = i) : (l.pendingContext = i),
      (l = Mn(t)),
      (l.payload = { element: n }),
      (r = r === void 0 ? null : r),
      r !== null && (l.callback = r),
      (n = Nn(e, l, t)),
      n !== null && (Ot(n, e, t), Za(n, e, t));
  }
  function mh(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Mu(e, t) {
    mh(e, t), (e = e.alternate) && mh(e, t);
  }
  function hh(e) {
    if (e.tag === 13) {
      var t = Vl(e, 67108864);
      t !== null && Ot(t, e, 67108864), Mu(e, 67108864);
    }
  }
  var Br = !0;
  function b0(e, t, n, l) {
    var i = O.T;
    O.T = null;
    var r = k.p;
    try {
      (k.p = 2), Nu(e, t, n, l);
    } finally {
      (k.p = r), (O.T = i);
    }
  }
  function S0(e, t, n, l) {
    var i = O.T;
    O.T = null;
    var r = k.p;
    try {
      (k.p = 8), Nu(e, t, n, l);
    } finally {
      (k.p = r), (O.T = i);
    }
  }
  function Nu(e, t, n, l) {
    if (Br) {
      var i = _u(l);
      if (i === null) pu(e, t, l, Yr, n), gh(e, l);
      else if (w0(i, e, t, n, l)) l.stopPropagation();
      else if ((gh(e, l), t & 4 && -1 < x0.indexOf(e))) {
        for (; i !== null; ) {
          var r = Ol(i);
          if (r !== null)
            switch (r.tag) {
              case 3:
                if (((r = r.stateNode), r.current.memoizedState.isDehydrated)) {
                  var f = al(r.pendingLanes);
                  if (f !== 0) {
                    var p = r;
                    for (p.pendingLanes |= 2, p.entangledLanes |= 2; f; ) {
                      var x = 1 << (31 - xt(f));
                      (p.entanglements[1] |= x), (f &= ~x);
                    }
                    Ft(r), (_e & 6) === 0 && ((wr = ot() + 500), ui(0));
                  }
                }
                break;
              case 13:
                (p = Vl(r, 2)), p !== null && Ot(p, r, 2), Ar(), Mu(r, 2);
            }
          if (((r = _u(l)), r === null && pu(e, t, l, Yr, n), r === i)) break;
          i = r;
        }
        i !== null && l.stopPropagation();
      } else pu(e, t, l, null, n);
    }
  }
  function _u(e) {
    return (e = Ho(e)), zu(e);
  }
  var Yr = null;
  function zu(e) {
    if (((Yr = null), (e = Cl(e)), e !== null)) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (((e = m(t)), e !== null)) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return (Yr = e), null;
  }
  function vh(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Eo()) {
          case ll:
            return 2;
          case Ms:
            return 8;
          case _i:
          case op:
            return 32;
          case Ns:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Du = !1,
    Gn = null,
    Xn = null,
    Qn = null,
    pi = new Map(),
    yi = new Map(),
    Zn = [],
    x0 =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
  function gh(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Gn = null;
        break;
      case "dragenter":
      case "dragleave":
        Xn = null;
        break;
      case "mouseover":
      case "mouseout":
        Qn = null;
        break;
      case "pointerover":
      case "pointerout":
        pi.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        yi.delete(t.pointerId);
    }
  }
  function bi(e, t, n, l, i, r) {
    return e === null || e.nativeEvent !== r
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: l,
          nativeEvent: r,
          targetContainers: [i],
        }),
        t !== null && ((t = Ol(t)), t !== null && hh(t)),
        e)
      : ((e.eventSystemFlags |= l),
        (t = e.targetContainers),
        i !== null && t.indexOf(i) === -1 && t.push(i),
        e);
  }
  function w0(e, t, n, l, i) {
    switch (t) {
      case "focusin":
        return (Gn = bi(Gn, e, t, n, l, i)), !0;
      case "dragenter":
        return (Xn = bi(Xn, e, t, n, l, i)), !0;
      case "mouseover":
        return (Qn = bi(Qn, e, t, n, l, i)), !0;
      case "pointerover":
        var r = i.pointerId;
        return pi.set(r, bi(pi.get(r) || null, e, t, n, l, i)), !0;
      case "gotpointercapture":
        return (
          (r = i.pointerId), yi.set(r, bi(yi.get(r) || null, e, t, n, l, i)), !0
        );
    }
    return !1;
  }
  function ph(e) {
    var t = Cl(e.target);
    if (t !== null) {
      var n = d(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = m(n)), t !== null)) {
            (e.blockedOn = t),
              vp(e.priority, function () {
                if (n.tag === 13) {
                  var l = Ct();
                  l = To(l);
                  var i = Vl(n, l);
                  i !== null && Ot(i, n, l), Mu(n, l);
                }
              });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Vr(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = _u(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var l = new n.constructor(n.type, n);
        (Uo = l), n.target.dispatchEvent(l), (Uo = null);
      } else return (t = Ol(n)), t !== null && hh(t), (e.blockedOn = n), !1;
      t.shift();
    }
    return !0;
  }
  function yh(e, t, n) {
    Vr(e) && n.delete(t);
  }
  function E0() {
    (Du = !1),
      Gn !== null && Vr(Gn) && (Gn = null),
      Xn !== null && Vr(Xn) && (Xn = null),
      Qn !== null && Vr(Qn) && (Qn = null),
      pi.forEach(yh),
      yi.forEach(yh);
  }
  function qr(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Du ||
        ((Du = !0),
        a.unstable_scheduleCallback(a.unstable_NormalPriority, E0)));
  }
  var kr = null;
  function bh(e) {
    kr !== e &&
      ((kr = e),
      a.unstable_scheduleCallback(a.unstable_NormalPriority, function () {
        kr === e && (kr = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t],
            l = e[t + 1],
            i = e[t + 2];
          if (typeof l != "function") {
            if (zu(l || n) === null) continue;
            break;
          }
          var r = Ol(n);
          r !== null &&
            (e.splice(t, 3),
            (t -= 3),
            zc(r, { pending: !0, data: i, method: n.method, action: l }, l, i));
        }
      }));
  }
  function Si(e) {
    function t(x) {
      return qr(x, e);
    }
    Gn !== null && qr(Gn, e),
      Xn !== null && qr(Xn, e),
      Qn !== null && qr(Qn, e),
      pi.forEach(t),
      yi.forEach(t);
    for (var n = 0; n < Zn.length; n++) {
      var l = Zn[n];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < Zn.length && ((n = Zn[0]), n.blockedOn === null); )
      ph(n), n.blockedOn === null && Zn.shift();
    if (((n = (e.ownerDocument || e).$$reactFormReplay), n != null))
      for (l = 0; l < n.length; l += 3) {
        var i = n[l],
          r = n[l + 1],
          f = i[ht] || null;
        if (typeof r == "function") f || bh(n);
        else if (f) {
          var p = null;
          if (r && r.hasAttribute("formAction")) {
            if (((i = r), (f = r[ht] || null))) p = f.formAction;
            else if (zu(i) !== null) continue;
          } else p = f.action;
          typeof p == "function" ? (n[l + 1] = p) : (n.splice(l, 3), (l -= 3)),
            bh(n);
        }
      }
  }
  function ju(e) {
    this._internalRoot = e;
  }
  (Gr.prototype.render = ju.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(c(409));
      var n = t.current,
        l = Ct();
      dh(n, l, e, t, null, null);
    }),
    (Gr.prototype.unmount = ju.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          dh(e.current, 2, null, e, null, null), Ar(), (t[Rl] = null);
        }
      });
  function Gr(e) {
    this._internalRoot = e;
  }
  Gr.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Us();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Zn.length && t !== 0 && t < Zn[n].priority; n++);
      Zn.splice(n, 0, e), n === 0 && ph(e);
    }
  };
  var Sh = o.version;
  if (Sh !== "19.1.1") throw Error(c(527, Sh, "19.1.1"));
  k.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function"
        ? Error(c(188))
        : ((e = Object.keys(e).join(",")), Error(c(268, e)));
    return (
      (e = g(t)),
      (e = e !== null ? v(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var A0 = {
    bundleType: 0,
    version: "19.1.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.1.1",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Xr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Xr.isDisabled && Xr.supportsFiber)
      try {
        (Aa = Xr.inject(A0)), (St = Xr);
      } catch {}
  }
  return (
    (wi.createRoot = function (e, t) {
      if (!s(e)) throw Error(c(299));
      var n = !1,
        l = "",
        i = Hd,
        r = Ld,
        f = Bd,
        p = null;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (l = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (i = t.onUncaughtError),
          t.onCaughtError !== void 0 && (r = t.onCaughtError),
          t.onRecoverableError !== void 0 && (f = t.onRecoverableError),
          t.unstable_transitionCallbacks !== void 0 &&
            (p = t.unstable_transitionCallbacks)),
        (t = sh(e, 1, !1, null, null, n, l, i, r, f, p, null)),
        (e[Rl] = t.current),
        gu(e),
        new ju(t)
      );
    }),
    (wi.hydrateRoot = function (e, t, n) {
      if (!s(e)) throw Error(c(299));
      var l = !1,
        i = "",
        r = Hd,
        f = Ld,
        p = Bd,
        x = null,
        z = null;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (l = !0),
          n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (r = n.onUncaughtError),
          n.onCaughtError !== void 0 && (f = n.onCaughtError),
          n.onRecoverableError !== void 0 && (p = n.onRecoverableError),
          n.unstable_transitionCallbacks !== void 0 &&
            (x = n.unstable_transitionCallbacks),
          n.formState !== void 0 && (z = n.formState)),
        (t = sh(e, 1, !0, t, n ?? null, l, i, r, f, p, x, z)),
        (t.context = fh(null)),
        (n = t.current),
        (l = Ct()),
        (l = To(l)),
        (i = Mn(l)),
        (i.callback = null),
        Nn(n, i, l),
        (n = l),
        (t.current.lanes = n),
        Ra(t, n),
        Ft(t),
        (e[Rl] = t.current),
        gu(e),
        new Gr(t)
      );
    }),
    (wi.version = "19.1.1"),
    wi
  );
}
var Nh;
function j0() {
  if (Nh) return Lu.exports;
  Nh = 1;
  function a() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (o) {
        console.error(o);
      }
  }
  return a(), (Lu.exports = D0()), Lu.exports;
}
var U0 = j0();
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const H0 = (a) => a.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  L0 = (a) =>
    a.replace(/^([A-Z])|[\s-_]+(\w)/g, (o, u, c) =>
      c ? c.toUpperCase() : u.toLowerCase()
    ),
  _h = (a) => {
    const o = L0(a);
    return o.charAt(0).toUpperCase() + o.slice(1);
  },
  Sv = (...a) =>
    a
      .filter((o, u, c) => !!o && o.trim() !== "" && c.indexOf(o) === u)
      .join(" ")
      .trim(),
  B0 = (a) => {
    for (const o in a)
      if (o.startsWith("aria-") || o === "role" || o === "title") return !0;
  };
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var Y0 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const V0 = b.forwardRef(
  (
    {
      color: a = "currentColor",
      size: o = 24,
      strokeWidth: u = 2,
      absoluteStrokeWidth: c,
      className: s = "",
      children: d,
      iconNode: m,
      ...h
    },
    g
  ) =>
    b.createElement(
      "svg",
      {
        ref: g,
        ...Y0,
        width: o,
        height: o,
        stroke: a,
        strokeWidth: c ? (Number(u) * 24) / Number(o) : u,
        className: Sv("lucide", s),
        ...(!d && !B0(h) && { "aria-hidden": "true" }),
        ...h,
      },
      [
        ...m.map(([v, y]) => b.createElement(v, y)),
        ...(Array.isArray(d) ? d : [d]),
      ]
    )
);
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const _t = (a, o) => {
  const u = b.forwardRef(({ className: c, ...s }, d) =>
    b.createElement(V0, {
      ref: d,
      iconNode: o,
      className: Sv(`lucide-${H0(_h(a))}`, `lucide-${a}`, c),
      ...s,
    })
  );
  return (u.displayName = _h(a)), u;
};
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const q0 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]],
  k0 = _t("check", q0);
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const G0 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]],
  xv = _t("chevron-down", G0);
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const X0 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]],
  Q0 = _t("chevron-up", X0);
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Z0 = [
    [
      "rect",
      {
        width: "14",
        height: "14",
        x: "8",
        y: "8",
        rx: "2",
        ry: "2",
        key: "17jyea",
      },
    ],
    [
      "path",
      {
        d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
        key: "zix9uf",
      },
    ],
  ],
  K0 = _t("copy", Z0);
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const J0 = [
    [
      "path",
      {
        d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
        key: "1rqfz7",
      },
    ],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
    ["path", { d: "M10 9H8", key: "b1mrlr" }],
    ["path", { d: "M16 13H8", key: "t4e002" }],
    ["path", { d: "M16 17H8", key: "z1uh3a" }],
  ],
  zh = _t("file-text", J0);
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const W0 = [
    [
      "path",
      {
        d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
        key: "sc7q7i",
      },
    ],
  ],
  P0 = _t("funnel", W0);
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $0 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    [
      "path",
      { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" },
    ],
    ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ],
  F0 = _t("globe", $0);
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const I0 = [
    ["path", { d: "m5 8 6 6", key: "1wu5hv" }],
    ["path", { d: "m4 14 6-6 2-3", key: "1k1g8d" }],
    ["path", { d: "M2 5h12", key: "or177f" }],
    ["path", { d: "M7 2h1", key: "1t2jsx" }],
    ["path", { d: "m22 22-5-10-5 10", key: "don7ne" }],
    ["path", { d: "M14 18h6", key: "1m8k6r" }],
  ],
  eb = _t("languages", I0);
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const tb = [
    ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
    [
      "rect",
      { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" },
    ],
  ],
  Dh = _t("mail", tb);
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const nb = [
    ["path", { d: "M12 20h9", key: "t2du7b" }],
    [
      "path",
      {
        d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
        key: "1ykcvy",
      },
    ],
  ],
  lb = _t("pen-line", nb);
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ab = [
    [
      "path",
      { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" },
    ],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ],
  ib = _t("rotate-ccw", ab);
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const rb = [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ],
  ob = _t("search", rb);
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const cb = [
    [
      "path",
      {
        d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
        key: "4pj2yx",
      },
    ],
    ["path", { d: "M20 3v4", key: "1olli1" }],
    ["path", { d: "M22 5h-4", key: "1gvqau" }],
    ["path", { d: "M4 17v2", key: "vumght" }],
    ["path", { d: "M5 18H3", key: "zchphs" }],
  ],
  jh = _t("sparkles", cb);
function Uh(a, o) {
  if (typeof a == "function") return a(o);
  a != null && (a.current = o);
}
function wv(...a) {
  return (o) => {
    let u = !1;
    const c = a.map((s) => {
      const d = Uh(s, o);
      return !u && typeof d == "function" && (u = !0), d;
    });
    if (u)
      return () => {
        for (let s = 0; s < c.length; s++) {
          const d = c[s];
          typeof d == "function" ? d() : Uh(a[s], null);
        }
      };
  };
}
function qe(...a) {
  return b.useCallback(wv(...a), a);
}
function Ti(a) {
  const o = ub(a),
    u = b.forwardRef((c, s) => {
      const { children: d, ...m } = c,
        h = b.Children.toArray(d),
        g = h.find(fb);
      if (g) {
        const v = g.props.children,
          y = h.map((S) =>
            S === g
              ? b.Children.count(v) > 1
                ? b.Children.only(null)
                : b.isValidElement(v)
                ? v.props.children
                : null
              : S
          );
        return w.jsx(o, {
          ...m,
          ref: s,
          children: b.isValidElement(v) ? b.cloneElement(v, void 0, y) : null,
        });
      }
      return w.jsx(o, { ...m, ref: s, children: d });
    });
  return (u.displayName = `${a}.Slot`), u;
}
var Ev = Ti("Slot");
function ub(a) {
  const o = b.forwardRef((u, c) => {
    const { children: s, ...d } = u;
    if (b.isValidElement(s)) {
      const m = mb(s),
        h = db(d, s.props);
      return (
        s.type !== b.Fragment && (h.ref = c ? wv(c, m) : m),
        b.cloneElement(s, h)
      );
    }
    return b.Children.count(s) > 1 ? b.Children.only(null) : null;
  });
  return (o.displayName = `${a}.SlotClone`), o;
}
var sb = Symbol("radix.slottable");
function fb(a) {
  return (
    b.isValidElement(a) &&
    typeof a.type == "function" &&
    "__radixId" in a.type &&
    a.type.__radixId === sb
  );
}
function db(a, o) {
  const u = { ...o };
  for (const c in o) {
    const s = a[c],
      d = o[c];
    /^on[A-Z]/.test(c)
      ? s && d
        ? (u[c] = (...h) => {
            const g = d(...h);
            return s(...h), g;
          })
        : s && (u[c] = s)
      : c === "style"
      ? (u[c] = { ...s, ...d })
      : c === "className" && (u[c] = [s, d].filter(Boolean).join(" "));
  }
  return { ...a, ...u };
}
function mb(a) {
  var c, s;
  let o =
      (c = Object.getOwnPropertyDescriptor(a.props, "ref")) == null
        ? void 0
        : c.get,
    u = o && "isReactWarning" in o && o.isReactWarning;
  return u
    ? a.ref
    : ((o =
        (s = Object.getOwnPropertyDescriptor(a, "ref")) == null
          ? void 0
          : s.get),
      (u = o && "isReactWarning" in o && o.isReactWarning),
      u ? a.props.ref : a.props.ref || a.ref);
}
function Av(a) {
  var o,
    u,
    c = "";
  if (typeof a == "string" || typeof a == "number") c += a;
  else if (typeof a == "object")
    if (Array.isArray(a)) {
      var s = a.length;
      for (o = 0; o < s; o++)
        a[o] && (u = Av(a[o])) && (c && (c += " "), (c += u));
    } else for (u in a) a[u] && (c && (c += " "), (c += u));
  return c;
}
function Tv() {
  for (var a, o, u = 0, c = "", s = arguments.length; u < s; u++)
    (a = arguments[u]) && (o = Av(a)) && (c && (c += " "), (c += o));
  return c;
}
const Hh = (a) => (typeof a == "boolean" ? `${a}` : a === 0 ? "0" : a),
  Lh = Tv,
  Rv = (a, o) => (u) => {
    var c;
    if ((o == null ? void 0 : o.variants) == null)
      return Lh(
        a,
        u == null ? void 0 : u.class,
        u == null ? void 0 : u.className
      );
    const { variants: s, defaultVariants: d } = o,
      m = Object.keys(s).map((v) => {
        const y = u == null ? void 0 : u[v],
          S = d == null ? void 0 : d[v];
        if (y === null) return null;
        const T = Hh(y) || Hh(S);
        return s[v][T];
      }),
      h =
        u &&
        Object.entries(u).reduce((v, y) => {
          let [S, T] = y;
          return T === void 0 || (v[S] = T), v;
        }, {}),
      g =
        o == null || (c = o.compoundVariants) === null || c === void 0
          ? void 0
          : c.reduce((v, y) => {
              let { class: S, className: T, ...C } = y;
              return Object.entries(C).every((D) => {
                let [E, _] = D;
                return Array.isArray(_)
                  ? _.includes({ ...d, ...h }[E])
                  : { ...d, ...h }[E] === _;
              })
                ? [...v, S, T]
                : v;
            }, []);
    return Lh(
      a,
      m,
      g,
      u == null ? void 0 : u.class,
      u == null ? void 0 : u.className
    );
  },
  vs = "-",
  hb = (a) => {
    const o = gb(a),
      { conflictingClassGroups: u, conflictingClassGroupModifiers: c } = a;
    return {
      getClassGroupId: (m) => {
        const h = m.split(vs);
        return h[0] === "" && h.length !== 1 && h.shift(), Cv(h, o) || vb(m);
      },
      getConflictingClassGroupIds: (m, h) => {
        const g = u[m] || [];
        return h && c[m] ? [...g, ...c[m]] : g;
      },
    };
  },
  Cv = (a, o) => {
    var m;
    if (a.length === 0) return o.classGroupId;
    const u = a[0],
      c = o.nextPart.get(u),
      s = c ? Cv(a.slice(1), c) : void 0;
    if (s) return s;
    if (o.validators.length === 0) return;
    const d = a.join(vs);
    return (m = o.validators.find(({ validator: h }) => h(d))) == null
      ? void 0
      : m.classGroupId;
  },
  Bh = /^\[(.+)\]$/,
  vb = (a) => {
    if (Bh.test(a)) {
      const o = Bh.exec(a)[1],
        u = o == null ? void 0 : o.substring(0, o.indexOf(":"));
      if (u) return "arbitrary.." + u;
    }
  },
  gb = (a) => {
    const { theme: o, classGroups: u } = a,
      c = { nextPart: new Map(), validators: [] };
    for (const s in u) es(u[s], c, s, o);
    return c;
  },
  es = (a, o, u, c) => {
    a.forEach((s) => {
      if (typeof s == "string") {
        const d = s === "" ? o : Yh(o, s);
        d.classGroupId = u;
        return;
      }
      if (typeof s == "function") {
        if (pb(s)) {
          es(s(c), o, u, c);
          return;
        }
        o.validators.push({ validator: s, classGroupId: u });
        return;
      }
      Object.entries(s).forEach(([d, m]) => {
        es(m, Yh(o, d), u, c);
      });
    });
  },
  Yh = (a, o) => {
    let u = a;
    return (
      o.split(vs).forEach((c) => {
        u.nextPart.has(c) ||
          u.nextPart.set(c, { nextPart: new Map(), validators: [] }),
          (u = u.nextPart.get(c));
      }),
      u
    );
  },
  pb = (a) => a.isThemeGetter,
  yb = (a) => {
    if (a < 1) return { get: () => {}, set: () => {} };
    let o = 0,
      u = new Map(),
      c = new Map();
    const s = (d, m) => {
      u.set(d, m), o++, o > a && ((o = 0), (c = u), (u = new Map()));
    };
    return {
      get(d) {
        let m = u.get(d);
        if (m !== void 0) return m;
        if ((m = c.get(d)) !== void 0) return s(d, m), m;
      },
      set(d, m) {
        u.has(d) ? u.set(d, m) : s(d, m);
      },
    };
  },
  ts = "!",
  ns = ":",
  bb = ns.length,
  Sb = (a) => {
    const { prefix: o, experimentalParseClassName: u } = a;
    let c = (s) => {
      const d = [];
      let m = 0,
        h = 0,
        g = 0,
        v;
      for (let D = 0; D < s.length; D++) {
        let E = s[D];
        if (m === 0 && h === 0) {
          if (E === ns) {
            d.push(s.slice(g, D)), (g = D + bb);
            continue;
          }
          if (E === "/") {
            v = D;
            continue;
          }
        }
        E === "[" ? m++ : E === "]" ? m-- : E === "(" ? h++ : E === ")" && h--;
      }
      const y = d.length === 0 ? s : s.substring(g),
        S = xb(y),
        T = S !== y,
        C = v && v > g ? v - g : void 0;
      return {
        modifiers: d,
        hasImportantModifier: T,
        baseClassName: S,
        maybePostfixModifierPosition: C,
      };
    };
    if (o) {
      const s = o + ns,
        d = c;
      c = (m) =>
        m.startsWith(s)
          ? d(m.substring(s.length))
          : {
              isExternal: !0,
              modifiers: [],
              hasImportantModifier: !1,
              baseClassName: m,
              maybePostfixModifierPosition: void 0,
            };
    }
    if (u) {
      const s = c;
      c = (d) => u({ className: d, parseClassName: s });
    }
    return c;
  },
  xb = (a) =>
    a.endsWith(ts)
      ? a.substring(0, a.length - 1)
      : a.startsWith(ts)
      ? a.substring(1)
      : a,
  wb = (a) => {
    const o = Object.fromEntries(a.orderSensitiveModifiers.map((c) => [c, !0]));
    return (c) => {
      if (c.length <= 1) return c;
      const s = [];
      let d = [];
      return (
        c.forEach((m) => {
          m[0] === "[" || o[m] ? (s.push(...d.sort(), m), (d = [])) : d.push(m);
        }),
        s.push(...d.sort()),
        s
      );
    };
  },
  Eb = (a) => ({
    cache: yb(a.cacheSize),
    parseClassName: Sb(a),
    sortModifiers: wb(a),
    ...hb(a),
  }),
  Ab = /\s+/,
  Tb = (a, o) => {
    const {
        parseClassName: u,
        getClassGroupId: c,
        getConflictingClassGroupIds: s,
        sortModifiers: d,
      } = o,
      m = [],
      h = a.trim().split(Ab);
    let g = "";
    for (let v = h.length - 1; v >= 0; v -= 1) {
      const y = h[v],
        {
          isExternal: S,
          modifiers: T,
          hasImportantModifier: C,
          baseClassName: D,
          maybePostfixModifierPosition: E,
        } = u(y);
      if (S) {
        g = y + (g.length > 0 ? " " + g : g);
        continue;
      }
      let _ = !!E,
        L = c(_ ? D.substring(0, E) : D);
      if (!L) {
        if (!_) {
          g = y + (g.length > 0 ? " " + g : g);
          continue;
        }
        if (((L = c(D)), !L)) {
          g = y + (g.length > 0 ? " " + g : g);
          continue;
        }
        _ = !1;
      }
      const H = d(T).join(":"),
        Y = C ? H + ts : H,
        K = Y + L;
      if (m.includes(K)) continue;
      m.push(K);
      const q = s(L, _);
      for (let $ = 0; $ < q.length; ++$) {
        const X = q[$];
        m.push(Y + X);
      }
      g = y + (g.length > 0 ? " " + g : g);
    }
    return g;
  };
function Rb() {
  let a = 0,
    o,
    u,
    c = "";
  for (; a < arguments.length; )
    (o = arguments[a++]) && (u = Ov(o)) && (c && (c += " "), (c += u));
  return c;
}
const Ov = (a) => {
  if (typeof a == "string") return a;
  let o,
    u = "";
  for (let c = 0; c < a.length; c++)
    a[c] && (o = Ov(a[c])) && (u && (u += " "), (u += o));
  return u;
};
function Cb(a, ...o) {
  let u,
    c,
    s,
    d = m;
  function m(g) {
    const v = o.reduce((y, S) => S(y), a());
    return (u = Eb(v)), (c = u.cache.get), (s = u.cache.set), (d = h), h(g);
  }
  function h(g) {
    const v = c(g);
    if (v) return v;
    const y = Tb(g, u);
    return s(g, y), y;
  }
  return function () {
    return d(Rb.apply(null, arguments));
  };
}
const $e = (a) => {
    const o = (u) => u[a] || [];
    return (o.isThemeGetter = !0), o;
  },
  Mv = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  Nv = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  Ob = /^\d+\/\d+$/,
  Mb = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Nb =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  _b = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  zb = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  Db =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  fa = (a) => Ob.test(a),
  Se = (a) => !!a && !Number.isNaN(Number(a)),
  Jn = (a) => !!a && Number.isInteger(Number(a)),
  qu = (a) => a.endsWith("%") && Se(a.slice(0, -1)),
  xn = (a) => Mb.test(a),
  jb = () => !0,
  Ub = (a) => Nb.test(a) && !_b.test(a),
  _v = () => !1,
  Hb = (a) => zb.test(a),
  Lb = (a) => Db.test(a),
  Bb = (a) => !ae(a) && !ie(a),
  Yb = (a) => ba(a, jv, _v),
  ae = (a) => Mv.test(a),
  wl = (a) => ba(a, Uv, Ub),
  ku = (a) => ba(a, Xb, Se),
  Vh = (a) => ba(a, zv, _v),
  Vb = (a) => ba(a, Dv, Lb),
  Qr = (a) => ba(a, Hv, Hb),
  ie = (a) => Nv.test(a),
  Ei = (a) => Sa(a, Uv),
  qb = (a) => Sa(a, Qb),
  qh = (a) => Sa(a, zv),
  kb = (a) => Sa(a, jv),
  Gb = (a) => Sa(a, Dv),
  Zr = (a) => Sa(a, Hv, !0),
  ba = (a, o, u) => {
    const c = Mv.exec(a);
    return c ? (c[1] ? o(c[1]) : u(c[2])) : !1;
  },
  Sa = (a, o, u = !1) => {
    const c = Nv.exec(a);
    return c ? (c[1] ? o(c[1]) : u) : !1;
  },
  zv = (a) => a === "position" || a === "percentage",
  Dv = (a) => a === "image" || a === "url",
  jv = (a) => a === "length" || a === "size" || a === "bg-size",
  Uv = (a) => a === "length",
  Xb = (a) => a === "number",
  Qb = (a) => a === "family-name",
  Hv = (a) => a === "shadow",
  Zb = () => {
    const a = $e("color"),
      o = $e("font"),
      u = $e("text"),
      c = $e("font-weight"),
      s = $e("tracking"),
      d = $e("leading"),
      m = $e("breakpoint"),
      h = $e("container"),
      g = $e("spacing"),
      v = $e("radius"),
      y = $e("shadow"),
      S = $e("inset-shadow"),
      T = $e("text-shadow"),
      C = $e("drop-shadow"),
      D = $e("blur"),
      E = $e("perspective"),
      _ = $e("aspect"),
      L = $e("ease"),
      H = $e("animate"),
      Y = () => [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column",
      ],
      K = () => [
        "center",
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "left-top",
        "top-right",
        "right-top",
        "bottom-right",
        "right-bottom",
        "bottom-left",
        "left-bottom",
      ],
      q = () => [...K(), ie, ae],
      $ = () => ["auto", "hidden", "clip", "visible", "scroll"],
      X = () => ["auto", "contain", "none"],
      J = () => [ie, ae, g],
      te = () => [fa, "full", "auto", ...J()],
      oe = () => [Jn, "none", "subgrid", ie, ae],
      ge = () => ["auto", { span: ["full", Jn, ie, ae] }, Jn, ie, ae],
      me = () => [Jn, "auto", ie, ae],
      P = () => ["auto", "min", "max", "fr", ie, ae],
      ne = () => [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
        "baseline",
        "center-safe",
        "end-safe",
      ],
      re = () => [
        "start",
        "end",
        "center",
        "stretch",
        "center-safe",
        "end-safe",
      ],
      O = () => ["auto", ...J()],
      k = () => [
        fa,
        "auto",
        "full",
        "dvw",
        "dvh",
        "lvw",
        "lvh",
        "svw",
        "svh",
        "min",
        "max",
        "fit",
        ...J(),
      ],
      B = () => [a, ie, ae],
      ue = () => [...K(), qh, Vh, { position: [ie, ae] }],
      A = () => ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }],
      Q = () => ["auto", "cover", "contain", kb, Yb, { size: [ie, ae] }],
      F = () => [qu, Ei, wl],
      W = () => ["", "none", "full", v, ie, ae],
      ee = () => ["", Se, Ei, wl],
      pe = () => ["solid", "dashed", "dotted", "double"],
      se = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      I = () => [Se, qu, qh, Vh],
      fe = () => ["", "none", D, ie, ae],
      Ne = () => ["none", Se, ie, ae],
      Re = () => ["none", Se, ie, ae],
      we = () => [Se, ie, ae],
      Ee = () => [fa, "full", ...J()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [xn],
        breakpoint: [xn],
        color: [jb],
        container: [xn],
        "drop-shadow": [xn],
        ease: ["in", "out", "in-out"],
        font: [Bb],
        "font-weight": [
          "thin",
          "extralight",
          "light",
          "normal",
          "medium",
          "semibold",
          "bold",
          "extrabold",
          "black",
        ],
        "inset-shadow": [xn],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: [
          "dramatic",
          "near",
          "normal",
          "midrange",
          "distant",
          "none",
        ],
        radius: [xn],
        shadow: [xn],
        spacing: ["px", Se],
        text: [xn],
        "text-shadow": [xn],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", fa, ae, ie, _] }],
        container: ["container"],
        columns: [{ columns: [Se, ae, ie, h] }],
        "break-after": [{ "break-after": Y() }],
        "break-before": [{ "break-before": Y() }],
        "break-inside": [
          { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
        ],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        sr: ["sr-only", "not-sr-only"],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [
          { object: ["contain", "cover", "fill", "none", "scale-down"] },
        ],
        "object-position": [{ object: q() }],
        overflow: [{ overflow: $() }],
        "overflow-x": [{ "overflow-x": $() }],
        "overflow-y": [{ "overflow-y": $() }],
        overscroll: [{ overscroll: X() }],
        "overscroll-x": [{ "overscroll-x": X() }],
        "overscroll-y": [{ "overscroll-y": X() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: te() }],
        "inset-x": [{ "inset-x": te() }],
        "inset-y": [{ "inset-y": te() }],
        start: [{ start: te() }],
        end: [{ end: te() }],
        top: [{ top: te() }],
        right: [{ right: te() }],
        bottom: [{ bottom: te() }],
        left: [{ left: te() }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: [Jn, "auto", ie, ae] }],
        basis: [{ basis: [fa, "full", "auto", h, ...J()] }],
        "flex-direction": [
          { flex: ["row", "row-reverse", "col", "col-reverse"] },
        ],
        "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
        flex: [{ flex: [Se, fa, "auto", "initial", "none", ae] }],
        grow: [{ grow: ["", Se, ie, ae] }],
        shrink: [{ shrink: ["", Se, ie, ae] }],
        order: [{ order: [Jn, "first", "last", "none", ie, ae] }],
        "grid-cols": [{ "grid-cols": oe() }],
        "col-start-end": [{ col: ge() }],
        "col-start": [{ "col-start": me() }],
        "col-end": [{ "col-end": me() }],
        "grid-rows": [{ "grid-rows": oe() }],
        "row-start-end": [{ row: ge() }],
        "row-start": [{ "row-start": me() }],
        "row-end": [{ "row-end": me() }],
        "grid-flow": [
          { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
        ],
        "auto-cols": [{ "auto-cols": P() }],
        "auto-rows": [{ "auto-rows": P() }],
        gap: [{ gap: J() }],
        "gap-x": [{ "gap-x": J() }],
        "gap-y": [{ "gap-y": J() }],
        "justify-content": [{ justify: [...ne(), "normal"] }],
        "justify-items": [{ "justify-items": [...re(), "normal"] }],
        "justify-self": [{ "justify-self": ["auto", ...re()] }],
        "align-content": [{ content: ["normal", ...ne()] }],
        "align-items": [{ items: [...re(), { baseline: ["", "last"] }] }],
        "align-self": [{ self: ["auto", ...re(), { baseline: ["", "last"] }] }],
        "place-content": [{ "place-content": ne() }],
        "place-items": [{ "place-items": [...re(), "baseline"] }],
        "place-self": [{ "place-self": ["auto", ...re()] }],
        p: [{ p: J() }],
        px: [{ px: J() }],
        py: [{ py: J() }],
        ps: [{ ps: J() }],
        pe: [{ pe: J() }],
        pt: [{ pt: J() }],
        pr: [{ pr: J() }],
        pb: [{ pb: J() }],
        pl: [{ pl: J() }],
        m: [{ m: O() }],
        mx: [{ mx: O() }],
        my: [{ my: O() }],
        ms: [{ ms: O() }],
        me: [{ me: O() }],
        mt: [{ mt: O() }],
        mr: [{ mr: O() }],
        mb: [{ mb: O() }],
        ml: [{ ml: O() }],
        "space-x": [{ "space-x": J() }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": J() }],
        "space-y-reverse": ["space-y-reverse"],
        size: [{ size: k() }],
        w: [{ w: [h, "screen", ...k()] }],
        "min-w": [{ "min-w": [h, "screen", "none", ...k()] }],
        "max-w": [
          { "max-w": [h, "screen", "none", "prose", { screen: [m] }, ...k()] },
        ],
        h: [{ h: ["screen", "lh", ...k()] }],
        "min-h": [{ "min-h": ["screen", "lh", "none", ...k()] }],
        "max-h": [{ "max-h": ["screen", "lh", ...k()] }],
        "font-size": [{ text: ["base", u, Ei, wl] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [{ font: [c, ie, ku] }],
        "font-stretch": [
          {
            "font-stretch": [
              "ultra-condensed",
              "extra-condensed",
              "condensed",
              "semi-condensed",
              "normal",
              "semi-expanded",
              "expanded",
              "extra-expanded",
              "ultra-expanded",
              qu,
              ae,
            ],
          },
        ],
        "font-family": [{ font: [qb, ae, o] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{ tracking: [s, ie, ae] }],
        "line-clamp": [{ "line-clamp": [Se, "none", ie, ku] }],
        leading: [{ leading: [d, ...J()] }],
        "list-image": [{ "list-image": ["none", ie, ae] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "list-style-type": [{ list: ["disc", "decimal", "none", ie, ae] }],
        "text-alignment": [
          { text: ["left", "center", "right", "justify", "start", "end"] },
        ],
        "placeholder-color": [{ placeholder: B() }],
        "text-color": [{ text: B() }],
        "text-decoration": [
          "underline",
          "overline",
          "line-through",
          "no-underline",
        ],
        "text-decoration-style": [{ decoration: [...pe(), "wavy"] }],
        "text-decoration-thickness": [
          { decoration: [Se, "from-font", "auto", ie, wl] },
        ],
        "text-decoration-color": [{ decoration: B() }],
        "underline-offset": [{ "underline-offset": [Se, "auto", ie, ae] }],
        "text-transform": [
          "uppercase",
          "lowercase",
          "capitalize",
          "normal-case",
        ],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: J() }],
        "vertical-align": [
          {
            align: [
              "baseline",
              "top",
              "middle",
              "bottom",
              "text-top",
              "text-bottom",
              "sub",
              "super",
              ie,
              ae,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              "normal",
              "nowrap",
              "pre",
              "pre-line",
              "pre-wrap",
              "break-spaces",
            ],
          },
        ],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        wrap: [{ wrap: ["break-word", "anywhere", "normal"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", ie, ae] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: ue() }],
        "bg-repeat": [{ bg: A() }],
        "bg-size": [{ bg: Q() }],
        "bg-image": [
          {
            bg: [
              "none",
              {
                linear: [
                  { to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
                  Jn,
                  ie,
                  ae,
                ],
                radial: ["", ie, ae],
                conic: [Jn, ie, ae],
              },
              Gb,
              Vb,
            ],
          },
        ],
        "bg-color": [{ bg: B() }],
        "gradient-from-pos": [{ from: F() }],
        "gradient-via-pos": [{ via: F() }],
        "gradient-to-pos": [{ to: F() }],
        "gradient-from": [{ from: B() }],
        "gradient-via": [{ via: B() }],
        "gradient-to": [{ to: B() }],
        rounded: [{ rounded: W() }],
        "rounded-s": [{ "rounded-s": W() }],
        "rounded-e": [{ "rounded-e": W() }],
        "rounded-t": [{ "rounded-t": W() }],
        "rounded-r": [{ "rounded-r": W() }],
        "rounded-b": [{ "rounded-b": W() }],
        "rounded-l": [{ "rounded-l": W() }],
        "rounded-ss": [{ "rounded-ss": W() }],
        "rounded-se": [{ "rounded-se": W() }],
        "rounded-ee": [{ "rounded-ee": W() }],
        "rounded-es": [{ "rounded-es": W() }],
        "rounded-tl": [{ "rounded-tl": W() }],
        "rounded-tr": [{ "rounded-tr": W() }],
        "rounded-br": [{ "rounded-br": W() }],
        "rounded-bl": [{ "rounded-bl": W() }],
        "border-w": [{ border: ee() }],
        "border-w-x": [{ "border-x": ee() }],
        "border-w-y": [{ "border-y": ee() }],
        "border-w-s": [{ "border-s": ee() }],
        "border-w-e": [{ "border-e": ee() }],
        "border-w-t": [{ "border-t": ee() }],
        "border-w-r": [{ "border-r": ee() }],
        "border-w-b": [{ "border-b": ee() }],
        "border-w-l": [{ "border-l": ee() }],
        "divide-x": [{ "divide-x": ee() }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": ee() }],
        "divide-y-reverse": ["divide-y-reverse"],
        "border-style": [{ border: [...pe(), "hidden", "none"] }],
        "divide-style": [{ divide: [...pe(), "hidden", "none"] }],
        "border-color": [{ border: B() }],
        "border-color-x": [{ "border-x": B() }],
        "border-color-y": [{ "border-y": B() }],
        "border-color-s": [{ "border-s": B() }],
        "border-color-e": [{ "border-e": B() }],
        "border-color-t": [{ "border-t": B() }],
        "border-color-r": [{ "border-r": B() }],
        "border-color-b": [{ "border-b": B() }],
        "border-color-l": [{ "border-l": B() }],
        "divide-color": [{ divide: B() }],
        "outline-style": [{ outline: [...pe(), "none", "hidden"] }],
        "outline-offset": [{ "outline-offset": [Se, ie, ae] }],
        "outline-w": [{ outline: ["", Se, Ei, wl] }],
        "outline-color": [{ outline: B() }],
        shadow: [{ shadow: ["", "none", y, Zr, Qr] }],
        "shadow-color": [{ shadow: B() }],
        "inset-shadow": [{ "inset-shadow": ["none", S, Zr, Qr] }],
        "inset-shadow-color": [{ "inset-shadow": B() }],
        "ring-w": [{ ring: ee() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: B() }],
        "ring-offset-w": [{ "ring-offset": [Se, wl] }],
        "ring-offset-color": [{ "ring-offset": B() }],
        "inset-ring-w": [{ "inset-ring": ee() }],
        "inset-ring-color": [{ "inset-ring": B() }],
        "text-shadow": [{ "text-shadow": ["none", T, Zr, Qr] }],
        "text-shadow-color": [{ "text-shadow": B() }],
        opacity: [{ opacity: [Se, ie, ae] }],
        "mix-blend": [
          { "mix-blend": [...se(), "plus-darker", "plus-lighter"] },
        ],
        "bg-blend": [{ "bg-blend": se() }],
        "mask-clip": [
          {
            "mask-clip": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
          "mask-no-clip",
        ],
        "mask-composite": [
          { mask: ["add", "subtract", "intersect", "exclude"] },
        ],
        "mask-image-linear-pos": [{ "mask-linear": [Se] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": I() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": I() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": B() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": B() }],
        "mask-image-t-from-pos": [{ "mask-t-from": I() }],
        "mask-image-t-to-pos": [{ "mask-t-to": I() }],
        "mask-image-t-from-color": [{ "mask-t-from": B() }],
        "mask-image-t-to-color": [{ "mask-t-to": B() }],
        "mask-image-r-from-pos": [{ "mask-r-from": I() }],
        "mask-image-r-to-pos": [{ "mask-r-to": I() }],
        "mask-image-r-from-color": [{ "mask-r-from": B() }],
        "mask-image-r-to-color": [{ "mask-r-to": B() }],
        "mask-image-b-from-pos": [{ "mask-b-from": I() }],
        "mask-image-b-to-pos": [{ "mask-b-to": I() }],
        "mask-image-b-from-color": [{ "mask-b-from": B() }],
        "mask-image-b-to-color": [{ "mask-b-to": B() }],
        "mask-image-l-from-pos": [{ "mask-l-from": I() }],
        "mask-image-l-to-pos": [{ "mask-l-to": I() }],
        "mask-image-l-from-color": [{ "mask-l-from": B() }],
        "mask-image-l-to-color": [{ "mask-l-to": B() }],
        "mask-image-x-from-pos": [{ "mask-x-from": I() }],
        "mask-image-x-to-pos": [{ "mask-x-to": I() }],
        "mask-image-x-from-color": [{ "mask-x-from": B() }],
        "mask-image-x-to-color": [{ "mask-x-to": B() }],
        "mask-image-y-from-pos": [{ "mask-y-from": I() }],
        "mask-image-y-to-pos": [{ "mask-y-to": I() }],
        "mask-image-y-from-color": [{ "mask-y-from": B() }],
        "mask-image-y-to-color": [{ "mask-y-to": B() }],
        "mask-image-radial": [{ "mask-radial": [ie, ae] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": I() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": I() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": B() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": B() }],
        "mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
        "mask-image-radial-size": [
          {
            "mask-radial": [
              { closest: ["side", "corner"], farthest: ["side", "corner"] },
            ],
          },
        ],
        "mask-image-radial-pos": [{ "mask-radial-at": K() }],
        "mask-image-conic-pos": [{ "mask-conic": [Se] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": I() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": I() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": B() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": B() }],
        "mask-mode": [{ mask: ["alpha", "luminance", "match"] }],
        "mask-origin": [
          {
            "mask-origin": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
        ],
        "mask-position": [{ mask: ue() }],
        "mask-repeat": [{ mask: A() }],
        "mask-size": [{ mask: Q() }],
        "mask-type": [{ "mask-type": ["alpha", "luminance"] }],
        "mask-image": [{ mask: ["none", ie, ae] }],
        filter: [{ filter: ["", "none", ie, ae] }],
        blur: [{ blur: fe() }],
        brightness: [{ brightness: [Se, ie, ae] }],
        contrast: [{ contrast: [Se, ie, ae] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", C, Zr, Qr] }],
        "drop-shadow-color": [{ "drop-shadow": B() }],
        grayscale: [{ grayscale: ["", Se, ie, ae] }],
        "hue-rotate": [{ "hue-rotate": [Se, ie, ae] }],
        invert: [{ invert: ["", Se, ie, ae] }],
        saturate: [{ saturate: [Se, ie, ae] }],
        sepia: [{ sepia: ["", Se, ie, ae] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none", ie, ae] }],
        "backdrop-blur": [{ "backdrop-blur": fe() }],
        "backdrop-brightness": [{ "backdrop-brightness": [Se, ie, ae] }],
        "backdrop-contrast": [{ "backdrop-contrast": [Se, ie, ae] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": ["", Se, ie, ae] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [Se, ie, ae] }],
        "backdrop-invert": [{ "backdrop-invert": ["", Se, ie, ae] }],
        "backdrop-opacity": [{ "backdrop-opacity": [Se, ie, ae] }],
        "backdrop-saturate": [{ "backdrop-saturate": [Se, ie, ae] }],
        "backdrop-sepia": [{ "backdrop-sepia": ["", Se, ie, ae] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": J() }],
        "border-spacing-x": [{ "border-spacing-x": J() }],
        "border-spacing-y": [{ "border-spacing-y": J() }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [
          {
            transition: [
              "",
              "all",
              "colors",
              "opacity",
              "shadow",
              "transform",
              "none",
              ie,
              ae,
            ],
          },
        ],
        "transition-behavior": [{ transition: ["normal", "discrete"] }],
        duration: [{ duration: [Se, "initial", ie, ae] }],
        ease: [{ ease: ["linear", "initial", L, ie, ae] }],
        delay: [{ delay: [Se, ie, ae] }],
        animate: [{ animate: ["none", H, ie, ae] }],
        backface: [{ backface: ["hidden", "visible"] }],
        perspective: [{ perspective: [E, ie, ae] }],
        "perspective-origin": [{ "perspective-origin": q() }],
        rotate: [{ rotate: Ne() }],
        "rotate-x": [{ "rotate-x": Ne() }],
        "rotate-y": [{ "rotate-y": Ne() }],
        "rotate-z": [{ "rotate-z": Ne() }],
        scale: [{ scale: Re() }],
        "scale-x": [{ "scale-x": Re() }],
        "scale-y": [{ "scale-y": Re() }],
        "scale-z": [{ "scale-z": Re() }],
        "scale-3d": ["scale-3d"],
        skew: [{ skew: we() }],
        "skew-x": [{ "skew-x": we() }],
        "skew-y": [{ "skew-y": we() }],
        transform: [{ transform: [ie, ae, "", "none", "gpu", "cpu"] }],
        "transform-origin": [{ origin: q() }],
        "transform-style": [{ transform: ["3d", "flat"] }],
        translate: [{ translate: Ee() }],
        "translate-x": [{ "translate-x": Ee() }],
        "translate-y": [{ "translate-y": Ee() }],
        "translate-z": [{ "translate-z": Ee() }],
        "translate-none": ["translate-none"],
        accent: [{ accent: B() }],
        appearance: [{ appearance: ["none", "auto"] }],
        "caret-color": [{ caret: B() }],
        "color-scheme": [
          {
            scheme: [
              "normal",
              "dark",
              "light",
              "light-dark",
              "only-dark",
              "only-light",
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              ie,
              ae,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
        "pointer-events": [{ "pointer-events": ["auto", "none"] }],
        resize: [{ resize: ["none", "", "y", "x"] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": J() }],
        "scroll-mx": [{ "scroll-mx": J() }],
        "scroll-my": [{ "scroll-my": J() }],
        "scroll-ms": [{ "scroll-ms": J() }],
        "scroll-me": [{ "scroll-me": J() }],
        "scroll-mt": [{ "scroll-mt": J() }],
        "scroll-mr": [{ "scroll-mr": J() }],
        "scroll-mb": [{ "scroll-mb": J() }],
        "scroll-ml": [{ "scroll-ml": J() }],
        "scroll-p": [{ "scroll-p": J() }],
        "scroll-px": [{ "scroll-px": J() }],
        "scroll-py": [{ "scroll-py": J() }],
        "scroll-ps": [{ "scroll-ps": J() }],
        "scroll-pe": [{ "scroll-pe": J() }],
        "scroll-pt": [{ "scroll-pt": J() }],
        "scroll-pr": [{ "scroll-pr": J() }],
        "scroll-pb": [{ "scroll-pb": J() }],
        "scroll-pl": [{ "scroll-pl": J() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [
          {
            "will-change": ["auto", "scroll", "contents", "transform", ie, ae],
          },
        ],
        fill: [{ fill: ["none", ...B()] }],
        "stroke-w": [{ stroke: [Se, Ei, wl, ku] }],
        stroke: [{ stroke: ["none", ...B()] }],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: [
          "inset-x",
          "inset-y",
          "start",
          "end",
          "top",
          "right",
          "bottom",
          "left",
        ],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": [
          "fvn-ordinal",
          "fvn-slashed-zero",
          "fvn-figure",
          "fvn-spacing",
          "fvn-fraction",
        ],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": [
          "border-w-x",
          "border-w-y",
          "border-w-s",
          "border-w-e",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l",
        ],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-x",
          "border-color-y",
          "border-color-s",
          "border-color-e",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        translate: ["translate-x", "translate-y", "translate-none"],
        "translate-none": [
          "translate",
          "translate-x",
          "translate-y",
          "translate-z",
        ],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml",
        ],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl",
        ],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
      orderSensitiveModifiers: [
        "*",
        "**",
        "after",
        "backdrop",
        "before",
        "details-content",
        "file",
        "first-letter",
        "first-line",
        "marker",
        "placeholder",
        "selection",
      ],
    };
  },
  Kb = Cb(Zb);
function ft(...a) {
  return Kb(Tv(a));
}
const Jb = Rv(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);
function kh({ className: a, variant: o, size: u, asChild: c = !1, ...s }) {
  const d = c ? Ev : "button";
  return w.jsx(d, {
    "data-slot": "button",
    className: ft(Jb({ variant: o, size: u, className: a })),
    ...s,
  });
}
function Gh({ className: a, type: o, ...u }) {
  return w.jsx("input", {
    type: o,
    "data-slot": "input",
    className: ft(
      "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      a
    ),
    ...u,
  });
}
function Xh({ className: a, ...o }) {
  return w.jsx("textarea", {
    "data-slot": "textarea",
    className: ft(
      "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      a
    ),
    ...o,
  });
}
function Kr({ className: a, ...o }) {
  return w.jsx("div", {
    "data-slot": "card",
    className: ft(
      "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
      a
    ),
    ...o,
  });
}
function Gu({ className: a, ...o }) {
  return w.jsx("div", {
    "data-slot": "card-header",
    className: ft(
      "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
      a
    ),
    ...o,
  });
}
function Xu({ className: a, ...o }) {
  return w.jsx("div", {
    "data-slot": "card-title",
    className: ft("leading-none font-semibold", a),
    ...o,
  });
}
function Jr({ className: a, ...o }) {
  return w.jsx("div", {
    "data-slot": "card-content",
    className: ft("px-6", a),
    ...o,
  });
}
const Wb = Rv(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);
function Pb({ className: a, variant: o, asChild: u = !1, ...c }) {
  const s = u ? Ev : "span";
  return w.jsx(s, {
    "data-slot": "badge",
    className: ft(Wb({ variant: o }), a),
    ...c,
  });
}
var Oi = bv();
const $b = pv(Oi);
function ls(a, [o, u]) {
  return Math.min(u, Math.max(o, a));
}
function Le(a, o, { checkForDefaultPrevented: u = !0 } = {}) {
  return function (s) {
    if ((a == null || a(s), u === !1 || !s.defaultPrevented))
      return o == null ? void 0 : o(s);
  };
}
function fo(a, o = []) {
  let u = [];
  function c(d, m) {
    const h = b.createContext(m),
      g = u.length;
    u = [...u, m];
    const v = (S) => {
      var L;
      const { scope: T, children: C, ...D } = S,
        E = ((L = T == null ? void 0 : T[a]) == null ? void 0 : L[g]) || h,
        _ = b.useMemo(() => D, Object.values(D));
      return w.jsx(E.Provider, { value: _, children: C });
    };
    v.displayName = d + "Provider";
    function y(S, T) {
      var E;
      const C = ((E = T == null ? void 0 : T[a]) == null ? void 0 : E[g]) || h,
        D = b.useContext(C);
      if (D) return D;
      if (m !== void 0) return m;
      throw new Error(`\`${S}\` must be used within \`${d}\``);
    }
    return [v, y];
  }
  const s = () => {
    const d = u.map((m) => b.createContext(m));
    return function (h) {
      const g = (h == null ? void 0 : h[a]) || d;
      return b.useMemo(() => ({ [`__scope${a}`]: { ...h, [a]: g } }), [h, g]);
    };
  };
  return (s.scopeName = a), [c, Fb(s, ...o)];
}
function Fb(...a) {
  const o = a[0];
  if (a.length === 1) return o;
  const u = () => {
    const c = a.map((s) => ({ useScope: s(), scopeName: s.scopeName }));
    return function (d) {
      const m = c.reduce((h, { useScope: g, scopeName: v }) => {
        const S = g(d)[`__scope${v}`];
        return { ...h, ...S };
      }, {});
      return b.useMemo(() => ({ [`__scope${o.scopeName}`]: m }), [m]);
    };
  };
  return (u.scopeName = o.scopeName), u;
}
function Ib(a) {
  const o = a + "CollectionProvider",
    [u, c] = fo(o),
    [s, d] = u(o, { collectionRef: { current: null }, itemMap: new Map() }),
    m = (E) => {
      const { scope: _, children: L } = E,
        H = Wn.useRef(null),
        Y = Wn.useRef(new Map()).current;
      return w.jsx(s, { scope: _, itemMap: Y, collectionRef: H, children: L });
    };
  m.displayName = o;
  const h = a + "CollectionSlot",
    g = Ti(h),
    v = Wn.forwardRef((E, _) => {
      const { scope: L, children: H } = E,
        Y = d(h, L),
        K = qe(_, Y.collectionRef);
      return w.jsx(g, { ref: K, children: H });
    });
  v.displayName = h;
  const y = a + "CollectionItemSlot",
    S = "data-radix-collection-item",
    T = Ti(y),
    C = Wn.forwardRef((E, _) => {
      const { scope: L, children: H, ...Y } = E,
        K = Wn.useRef(null),
        q = qe(_, K),
        $ = d(y, L);
      return (
        Wn.useEffect(
          () => (
            $.itemMap.set(K, { ref: K, ...Y }), () => void $.itemMap.delete(K)
          )
        ),
        w.jsx(T, { [S]: "", ref: q, children: H })
      );
    });
  C.displayName = y;
  function D(E) {
    const _ = d(a + "CollectionConsumer", E);
    return Wn.useCallback(() => {
      const H = _.collectionRef.current;
      if (!H) return [];
      const Y = Array.from(H.querySelectorAll(`[${S}]`));
      return Array.from(_.itemMap.values()).sort(
        ($, X) => Y.indexOf($.ref.current) - Y.indexOf(X.ref.current)
      );
    }, [_.collectionRef, _.itemMap]);
  }
  return [{ Provider: m, Slot: v, ItemSlot: C }, D, c];
}
var eS = b.createContext(void 0);
function Lv(a) {
  const o = b.useContext(eS);
  return a || o || "ltr";
}
var tS = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul",
  ],
  Ye = tS.reduce((a, o) => {
    const u = Ti(`Primitive.${o}`),
      c = b.forwardRef((s, d) => {
        const { asChild: m, ...h } = s,
          g = m ? u : o;
        return (
          typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
          w.jsx(g, { ...h, ref: d })
        );
      });
    return (c.displayName = `Primitive.${o}`), { ...a, [o]: c };
  }, {});
function nS(a, o) {
  a && Oi.flushSync(() => a.dispatchEvent(o));
}
function bt(a) {
  const o = b.useRef(a);
  return (
    b.useEffect(() => {
      o.current = a;
    }),
    b.useMemo(
      () =>
        (...u) => {
          var c;
          return (c = o.current) == null ? void 0 : c.call(o, ...u);
        },
      []
    )
  );
}
function lS(a, o = globalThis == null ? void 0 : globalThis.document) {
  const u = bt(a);
  b.useEffect(() => {
    const c = (s) => {
      s.key === "Escape" && u(s);
    };
    return (
      o.addEventListener("keydown", c, { capture: !0 }),
      () => o.removeEventListener("keydown", c, { capture: !0 })
    );
  }, [u, o]);
}
var aS = "DismissableLayer",
  as = "dismissableLayer.update",
  iS = "dismissableLayer.pointerDownOutside",
  rS = "dismissableLayer.focusOutside",
  Qh,
  Bv = b.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  Yv = b.forwardRef((a, o) => {
    const {
        disableOutsidePointerEvents: u = !1,
        onEscapeKeyDown: c,
        onPointerDownOutside: s,
        onFocusOutside: d,
        onInteractOutside: m,
        onDismiss: h,
        ...g
      } = a,
      v = b.useContext(Bv),
      [y, S] = b.useState(null),
      T =
        (y == null ? void 0 : y.ownerDocument) ??
        (globalThis == null ? void 0 : globalThis.document),
      [, C] = b.useState({}),
      D = qe(o, (X) => S(X)),
      E = Array.from(v.layers),
      [_] = [...v.layersWithOutsidePointerEventsDisabled].slice(-1),
      L = E.indexOf(_),
      H = y ? E.indexOf(y) : -1,
      Y = v.layersWithOutsidePointerEventsDisabled.size > 0,
      K = H >= L,
      q = uS((X) => {
        const J = X.target,
          te = [...v.branches].some((oe) => oe.contains(J));
        !K ||
          te ||
          (s == null || s(X),
          m == null || m(X),
          X.defaultPrevented || h == null || h());
      }, T),
      $ = sS((X) => {
        const J = X.target;
        [...v.branches].some((oe) => oe.contains(J)) ||
          (d == null || d(X),
          m == null || m(X),
          X.defaultPrevented || h == null || h());
      }, T);
    return (
      lS((X) => {
        H === v.layers.size - 1 &&
          (c == null || c(X),
          !X.defaultPrevented && h && (X.preventDefault(), h()));
      }, T),
      b.useEffect(() => {
        if (y)
          return (
            u &&
              (v.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((Qh = T.body.style.pointerEvents),
                (T.body.style.pointerEvents = "none")),
              v.layersWithOutsidePointerEventsDisabled.add(y)),
            v.layers.add(y),
            Zh(),
            () => {
              u &&
                v.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (T.body.style.pointerEvents = Qh);
            }
          );
      }, [y, T, u, v]),
      b.useEffect(
        () => () => {
          y &&
            (v.layers.delete(y),
            v.layersWithOutsidePointerEventsDisabled.delete(y),
            Zh());
        },
        [y, v]
      ),
      b.useEffect(() => {
        const X = () => C({});
        return (
          document.addEventListener(as, X),
          () => document.removeEventListener(as, X)
        );
      }, []),
      w.jsx(Ye.div, {
        ...g,
        ref: D,
        style: {
          pointerEvents: Y ? (K ? "auto" : "none") : void 0,
          ...a.style,
        },
        onFocusCapture: Le(a.onFocusCapture, $.onFocusCapture),
        onBlurCapture: Le(a.onBlurCapture, $.onBlurCapture),
        onPointerDownCapture: Le(
          a.onPointerDownCapture,
          q.onPointerDownCapture
        ),
      })
    );
  });
Yv.displayName = aS;
var oS = "DismissableLayerBranch",
  cS = b.forwardRef((a, o) => {
    const u = b.useContext(Bv),
      c = b.useRef(null),
      s = qe(o, c);
    return (
      b.useEffect(() => {
        const d = c.current;
        if (d)
          return (
            u.branches.add(d),
            () => {
              u.branches.delete(d);
            }
          );
      }, [u.branches]),
      w.jsx(Ye.div, { ...a, ref: s })
    );
  });
cS.displayName = oS;
function uS(a, o = globalThis == null ? void 0 : globalThis.document) {
  const u = bt(a),
    c = b.useRef(!1),
    s = b.useRef(() => {});
  return (
    b.useEffect(() => {
      const d = (h) => {
          if (h.target && !c.current) {
            let g = function () {
              Vv(iS, u, v, { discrete: !0 });
            };
            const v = { originalEvent: h };
            h.pointerType === "touch"
              ? (o.removeEventListener("click", s.current),
                (s.current = g),
                o.addEventListener("click", s.current, { once: !0 }))
              : g();
          } else o.removeEventListener("click", s.current);
          c.current = !1;
        },
        m = window.setTimeout(() => {
          o.addEventListener("pointerdown", d);
        }, 0);
      return () => {
        window.clearTimeout(m),
          o.removeEventListener("pointerdown", d),
          o.removeEventListener("click", s.current);
      };
    }, [o, u]),
    { onPointerDownCapture: () => (c.current = !0) }
  );
}
function sS(a, o = globalThis == null ? void 0 : globalThis.document) {
  const u = bt(a),
    c = b.useRef(!1);
  return (
    b.useEffect(() => {
      const s = (d) => {
        d.target &&
          !c.current &&
          Vv(rS, u, { originalEvent: d }, { discrete: !1 });
      };
      return (
        o.addEventListener("focusin", s),
        () => o.removeEventListener("focusin", s)
      );
    }, [o, u]),
    {
      onFocusCapture: () => (c.current = !0),
      onBlurCapture: () => (c.current = !1),
    }
  );
}
function Zh() {
  const a = new CustomEvent(as);
  document.dispatchEvent(a);
}
function Vv(a, o, u, { discrete: c }) {
  const s = u.originalEvent.target,
    d = new CustomEvent(a, { bubbles: !1, cancelable: !0, detail: u });
  o && s.addEventListener(a, o, { once: !0 }),
    c ? nS(s, d) : s.dispatchEvent(d);
}
var Qu = 0;
function fS() {
  b.useEffect(() => {
    const a = document.querySelectorAll("[data-radix-focus-guard]");
    return (
      document.body.insertAdjacentElement("afterbegin", a[0] ?? Kh()),
      document.body.insertAdjacentElement("beforeend", a[1] ?? Kh()),
      Qu++,
      () => {
        Qu === 1 &&
          document
            .querySelectorAll("[data-radix-focus-guard]")
            .forEach((o) => o.remove()),
          Qu--;
      }
    );
  }, []);
}
function Kh() {
  const a = document.createElement("span");
  return (
    a.setAttribute("data-radix-focus-guard", ""),
    (a.tabIndex = 0),
    (a.style.outline = "none"),
    (a.style.opacity = "0"),
    (a.style.position = "fixed"),
    (a.style.pointerEvents = "none"),
    a
  );
}
var Zu = "focusScope.autoFocusOnMount",
  Ku = "focusScope.autoFocusOnUnmount",
  Jh = { bubbles: !1, cancelable: !0 },
  dS = "FocusScope",
  qv = b.forwardRef((a, o) => {
    const {
        loop: u = !1,
        trapped: c = !1,
        onMountAutoFocus: s,
        onUnmountAutoFocus: d,
        ...m
      } = a,
      [h, g] = b.useState(null),
      v = bt(s),
      y = bt(d),
      S = b.useRef(null),
      T = qe(o, (E) => g(E)),
      C = b.useRef({
        paused: !1,
        pause() {
          this.paused = !0;
        },
        resume() {
          this.paused = !1;
        },
      }).current;
    b.useEffect(() => {
      if (c) {
        let E = function (Y) {
            if (C.paused || !h) return;
            const K = Y.target;
            h.contains(K) ? (S.current = K) : Pn(S.current, { select: !0 });
          },
          _ = function (Y) {
            if (C.paused || !h) return;
            const K = Y.relatedTarget;
            K !== null && (h.contains(K) || Pn(S.current, { select: !0 }));
          },
          L = function (Y) {
            if (document.activeElement === document.body)
              for (const q of Y) q.removedNodes.length > 0 && Pn(h);
          };
        document.addEventListener("focusin", E),
          document.addEventListener("focusout", _);
        const H = new MutationObserver(L);
        return (
          h && H.observe(h, { childList: !0, subtree: !0 }),
          () => {
            document.removeEventListener("focusin", E),
              document.removeEventListener("focusout", _),
              H.disconnect();
          }
        );
      }
    }, [c, h, C.paused]),
      b.useEffect(() => {
        if (h) {
          Ph.add(C);
          const E = document.activeElement;
          if (!h.contains(E)) {
            const L = new CustomEvent(Zu, Jh);
            h.addEventListener(Zu, v),
              h.dispatchEvent(L),
              L.defaultPrevented ||
                (mS(yS(kv(h)), { select: !0 }),
                document.activeElement === E && Pn(h));
          }
          return () => {
            h.removeEventListener(Zu, v),
              setTimeout(() => {
                const L = new CustomEvent(Ku, Jh);
                h.addEventListener(Ku, y),
                  h.dispatchEvent(L),
                  L.defaultPrevented || Pn(E ?? document.body, { select: !0 }),
                  h.removeEventListener(Ku, y),
                  Ph.remove(C);
              }, 0);
          };
        }
      }, [h, v, y, C]);
    const D = b.useCallback(
      (E) => {
        if ((!u && !c) || C.paused) return;
        const _ = E.key === "Tab" && !E.altKey && !E.ctrlKey && !E.metaKey,
          L = document.activeElement;
        if (_ && L) {
          const H = E.currentTarget,
            [Y, K] = hS(H);
          Y && K
            ? !E.shiftKey && L === K
              ? (E.preventDefault(), u && Pn(Y, { select: !0 }))
              : E.shiftKey &&
                L === Y &&
                (E.preventDefault(), u && Pn(K, { select: !0 }))
            : L === H && E.preventDefault();
        }
      },
      [u, c, C.paused]
    );
    return w.jsx(Ye.div, { tabIndex: -1, ...m, ref: T, onKeyDown: D });
  });
qv.displayName = dS;
function mS(a, { select: o = !1 } = {}) {
  const u = document.activeElement;
  for (const c of a)
    if ((Pn(c, { select: o }), document.activeElement !== u)) return;
}
function hS(a) {
  const o = kv(a),
    u = Wh(o, a),
    c = Wh(o.reverse(), a);
  return [u, c];
}
function kv(a) {
  const o = [],
    u = document.createTreeWalker(a, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (c) => {
        const s = c.tagName === "INPUT" && c.type === "hidden";
        return c.disabled || c.hidden || s
          ? NodeFilter.FILTER_SKIP
          : c.tabIndex >= 0
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP;
      },
    });
  for (; u.nextNode(); ) o.push(u.currentNode);
  return o;
}
function Wh(a, o) {
  for (const u of a) if (!vS(u, { upTo: o })) return u;
}
function vS(a, { upTo: o }) {
  if (getComputedStyle(a).visibility === "hidden") return !0;
  for (; a; ) {
    if (o !== void 0 && a === o) return !1;
    if (getComputedStyle(a).display === "none") return !0;
    a = a.parentElement;
  }
  return !1;
}
function gS(a) {
  return a instanceof HTMLInputElement && "select" in a;
}
function Pn(a, { select: o = !1 } = {}) {
  if (a && a.focus) {
    const u = document.activeElement;
    a.focus({ preventScroll: !0 }), a !== u && gS(a) && o && a.select();
  }
}
var Ph = pS();
function pS() {
  let a = [];
  return {
    add(o) {
      const u = a[0];
      o !== u && (u == null || u.pause()), (a = $h(a, o)), a.unshift(o);
    },
    remove(o) {
      var u;
      (a = $h(a, o)), (u = a[0]) == null || u.resume();
    },
  };
}
function $h(a, o) {
  const u = [...a],
    c = u.indexOf(o);
  return c !== -1 && u.splice(c, 1), u;
}
function yS(a) {
  return a.filter((o) => o.tagName !== "A");
}
var rt =
    globalThis != null && globalThis.document ? b.useLayoutEffect : () => {},
  bS = yv[" useId ".trim().toString()] || (() => {}),
  SS = 0;
function gs(a) {
  const [o, u] = b.useState(bS());
  return (
    rt(() => {
      u((c) => c ?? String(SS++));
    }, [a]),
    a || (o ? `radix-${o}` : "")
  );
}
const xS = ["top", "right", "bottom", "left"],
  $n = Math.min,
  Mt = Math.max,
  ao = Math.round,
  Wr = Math.floor,
  tn = (a) => ({ x: a, y: a }),
  wS = { left: "right", right: "left", bottom: "top", top: "bottom" },
  ES = { start: "end", end: "start" };
function is(a, o, u) {
  return Mt(a, $n(o, u));
}
function wn(a, o) {
  return typeof a == "function" ? a(o) : a;
}
function En(a) {
  return a.split("-")[0];
}
function xa(a) {
  return a.split("-")[1];
}
function ps(a) {
  return a === "x" ? "y" : "x";
}
function ys(a) {
  return a === "y" ? "height" : "width";
}
const AS = new Set(["top", "bottom"]);
function en(a) {
  return AS.has(En(a)) ? "y" : "x";
}
function bs(a) {
  return ps(en(a));
}
function TS(a, o, u) {
  u === void 0 && (u = !1);
  const c = xa(a),
    s = bs(a),
    d = ys(s);
  let m =
    s === "x"
      ? c === (u ? "end" : "start")
        ? "right"
        : "left"
      : c === "start"
      ? "bottom"
      : "top";
  return o.reference[d] > o.floating[d] && (m = io(m)), [m, io(m)];
}
function RS(a) {
  const o = io(a);
  return [rs(a), o, rs(o)];
}
function rs(a) {
  return a.replace(/start|end/g, (o) => ES[o]);
}
const Fh = ["left", "right"],
  Ih = ["right", "left"],
  CS = ["top", "bottom"],
  OS = ["bottom", "top"];
function MS(a, o, u) {
  switch (a) {
    case "top":
    case "bottom":
      return u ? (o ? Ih : Fh) : o ? Fh : Ih;
    case "left":
    case "right":
      return o ? CS : OS;
    default:
      return [];
  }
}
function NS(a, o, u, c) {
  const s = xa(a);
  let d = MS(En(a), u === "start", c);
  return (
    s && ((d = d.map((m) => m + "-" + s)), o && (d = d.concat(d.map(rs)))), d
  );
}
function io(a) {
  return a.replace(/left|right|bottom|top/g, (o) => wS[o]);
}
function _S(a) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...a };
}
function Gv(a) {
  return typeof a != "number"
    ? _S(a)
    : { top: a, right: a, bottom: a, left: a };
}
function ro(a) {
  const { x: o, y: u, width: c, height: s } = a;
  return {
    width: c,
    height: s,
    top: u,
    left: o,
    right: o + c,
    bottom: u + s,
    x: o,
    y: u,
  };
}
function ev(a, o, u) {
  let { reference: c, floating: s } = a;
  const d = en(o),
    m = bs(o),
    h = ys(m),
    g = En(o),
    v = d === "y",
    y = c.x + c.width / 2 - s.width / 2,
    S = c.y + c.height / 2 - s.height / 2,
    T = c[h] / 2 - s[h] / 2;
  let C;
  switch (g) {
    case "top":
      C = { x: y, y: c.y - s.height };
      break;
    case "bottom":
      C = { x: y, y: c.y + c.height };
      break;
    case "right":
      C = { x: c.x + c.width, y: S };
      break;
    case "left":
      C = { x: c.x - s.width, y: S };
      break;
    default:
      C = { x: c.x, y: c.y };
  }
  switch (xa(o)) {
    case "start":
      C[m] -= T * (u && v ? -1 : 1);
      break;
    case "end":
      C[m] += T * (u && v ? -1 : 1);
      break;
  }
  return C;
}
const zS = async (a, o, u) => {
  const {
      placement: c = "bottom",
      strategy: s = "absolute",
      middleware: d = [],
      platform: m,
    } = u,
    h = d.filter(Boolean),
    g = await (m.isRTL == null ? void 0 : m.isRTL(o));
  let v = await m.getElementRects({ reference: a, floating: o, strategy: s }),
    { x: y, y: S } = ev(v, c, g),
    T = c,
    C = {},
    D = 0;
  for (let E = 0; E < h.length; E++) {
    const { name: _, fn: L } = h[E],
      {
        x: H,
        y: Y,
        data: K,
        reset: q,
      } = await L({
        x: y,
        y: S,
        initialPlacement: c,
        placement: T,
        strategy: s,
        middlewareData: C,
        rects: v,
        platform: m,
        elements: { reference: a, floating: o },
      });
    (y = H ?? y),
      (S = Y ?? S),
      (C = { ...C, [_]: { ...C[_], ...K } }),
      q &&
        D <= 50 &&
        (D++,
        typeof q == "object" &&
          (q.placement && (T = q.placement),
          q.rects &&
            (v =
              q.rects === !0
                ? await m.getElementRects({
                    reference: a,
                    floating: o,
                    strategy: s,
                  })
                : q.rects),
          ({ x: y, y: S } = ev(v, T, g))),
        (E = -1));
  }
  return { x: y, y: S, placement: T, strategy: s, middlewareData: C };
};
async function Ri(a, o) {
  var u;
  o === void 0 && (o = {});
  const { x: c, y: s, platform: d, rects: m, elements: h, strategy: g } = a,
    {
      boundary: v = "clippingAncestors",
      rootBoundary: y = "viewport",
      elementContext: S = "floating",
      altBoundary: T = !1,
      padding: C = 0,
    } = wn(o, a),
    D = Gv(C),
    _ = h[T ? (S === "floating" ? "reference" : "floating") : S],
    L = ro(
      await d.getClippingRect({
        element:
          (u = await (d.isElement == null ? void 0 : d.isElement(_))) == null ||
          u
            ? _
            : _.contextElement ||
              (await (d.getDocumentElement == null
                ? void 0
                : d.getDocumentElement(h.floating))),
        boundary: v,
        rootBoundary: y,
        strategy: g,
      })
    ),
    H =
      S === "floating"
        ? { x: c, y: s, width: m.floating.width, height: m.floating.height }
        : m.reference,
    Y = await (d.getOffsetParent == null
      ? void 0
      : d.getOffsetParent(h.floating)),
    K = (await (d.isElement == null ? void 0 : d.isElement(Y)))
      ? (await (d.getScale == null ? void 0 : d.getScale(Y))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    q = ro(
      d.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await d.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: h,
            rect: H,
            offsetParent: Y,
            strategy: g,
          })
        : H
    );
  return {
    top: (L.top - q.top + D.top) / K.y,
    bottom: (q.bottom - L.bottom + D.bottom) / K.y,
    left: (L.left - q.left + D.left) / K.x,
    right: (q.right - L.right + D.right) / K.x,
  };
}
const DS = (a) => ({
    name: "arrow",
    options: a,
    async fn(o) {
      const {
          x: u,
          y: c,
          placement: s,
          rects: d,
          platform: m,
          elements: h,
          middlewareData: g,
        } = o,
        { element: v, padding: y = 0 } = wn(a, o) || {};
      if (v == null) return {};
      const S = Gv(y),
        T = { x: u, y: c },
        C = bs(s),
        D = ys(C),
        E = await m.getDimensions(v),
        _ = C === "y",
        L = _ ? "top" : "left",
        H = _ ? "bottom" : "right",
        Y = _ ? "clientHeight" : "clientWidth",
        K = d.reference[D] + d.reference[C] - T[C] - d.floating[D],
        q = T[C] - d.reference[C],
        $ = await (m.getOffsetParent == null ? void 0 : m.getOffsetParent(v));
      let X = $ ? $[Y] : 0;
      (!X || !(await (m.isElement == null ? void 0 : m.isElement($)))) &&
        (X = h.floating[Y] || d.floating[D]);
      const J = K / 2 - q / 2,
        te = X / 2 - E[D] / 2 - 1,
        oe = $n(S[L], te),
        ge = $n(S[H], te),
        me = oe,
        P = X - E[D] - ge,
        ne = X / 2 - E[D] / 2 + J,
        re = is(me, ne, P),
        O =
          !g.arrow &&
          xa(s) != null &&
          ne !== re &&
          d.reference[D] / 2 - (ne < me ? oe : ge) - E[D] / 2 < 0,
        k = O ? (ne < me ? ne - me : ne - P) : 0;
      return {
        [C]: T[C] + k,
        data: {
          [C]: re,
          centerOffset: ne - re - k,
          ...(O && { alignmentOffset: k }),
        },
        reset: O,
      };
    },
  }),
  jS = function (a) {
    return (
      a === void 0 && (a = {}),
      {
        name: "flip",
        options: a,
        async fn(o) {
          var u, c;
          const {
              placement: s,
              middlewareData: d,
              rects: m,
              initialPlacement: h,
              platform: g,
              elements: v,
            } = o,
            {
              mainAxis: y = !0,
              crossAxis: S = !0,
              fallbackPlacements: T,
              fallbackStrategy: C = "bestFit",
              fallbackAxisSideDirection: D = "none",
              flipAlignment: E = !0,
              ..._
            } = wn(a, o);
          if ((u = d.arrow) != null && u.alignmentOffset) return {};
          const L = En(s),
            H = en(h),
            Y = En(h) === h,
            K = await (g.isRTL == null ? void 0 : g.isRTL(v.floating)),
            q = T || (Y || !E ? [io(h)] : RS(h)),
            $ = D !== "none";
          !T && $ && q.push(...NS(h, E, D, K));
          const X = [h, ...q],
            J = await Ri(o, _),
            te = [];
          let oe = ((c = d.flip) == null ? void 0 : c.overflows) || [];
          if ((y && te.push(J[L]), S)) {
            const ne = TS(s, m, K);
            te.push(J[ne[0]], J[ne[1]]);
          }
          if (
            ((oe = [...oe, { placement: s, overflows: te }]),
            !te.every((ne) => ne <= 0))
          ) {
            var ge, me;
            const ne = (((ge = d.flip) == null ? void 0 : ge.index) || 0) + 1,
              re = X[ne];
            if (
              re &&
              (!(S === "alignment" ? H !== en(re) : !1) ||
                oe.every((B) =>
                  en(B.placement) === H ? B.overflows[0] > 0 : !0
                ))
            )
              return {
                data: { index: ne, overflows: oe },
                reset: { placement: re },
              };
            let O =
              (me = oe
                .filter((k) => k.overflows[0] <= 0)
                .sort((k, B) => k.overflows[1] - B.overflows[1])[0]) == null
                ? void 0
                : me.placement;
            if (!O)
              switch (C) {
                case "bestFit": {
                  var P;
                  const k =
                    (P = oe
                      .filter((B) => {
                        if ($) {
                          const ue = en(B.placement);
                          return ue === H || ue === "y";
                        }
                        return !0;
                      })
                      .map((B) => [
                        B.placement,
                        B.overflows
                          .filter((ue) => ue > 0)
                          .reduce((ue, A) => ue + A, 0),
                      ])
                      .sort((B, ue) => B[1] - ue[1])[0]) == null
                      ? void 0
                      : P[0];
                  k && (O = k);
                  break;
                }
                case "initialPlacement":
                  O = h;
                  break;
              }
            if (s !== O) return { reset: { placement: O } };
          }
          return {};
        },
      }
    );
  };
function tv(a, o) {
  return {
    top: a.top - o.height,
    right: a.right - o.width,
    bottom: a.bottom - o.height,
    left: a.left - o.width,
  };
}
function nv(a) {
  return xS.some((o) => a[o] >= 0);
}
const US = function (a) {
    return (
      a === void 0 && (a = {}),
      {
        name: "hide",
        options: a,
        async fn(o) {
          const { rects: u } = o,
            { strategy: c = "referenceHidden", ...s } = wn(a, o);
          switch (c) {
            case "referenceHidden": {
              const d = await Ri(o, { ...s, elementContext: "reference" }),
                m = tv(d, u.reference);
              return {
                data: { referenceHiddenOffsets: m, referenceHidden: nv(m) },
              };
            }
            case "escaped": {
              const d = await Ri(o, { ...s, altBoundary: !0 }),
                m = tv(d, u.floating);
              return { data: { escapedOffsets: m, escaped: nv(m) } };
            }
            default:
              return {};
          }
        },
      }
    );
  },
  Xv = new Set(["left", "top"]);
async function HS(a, o) {
  const { placement: u, platform: c, elements: s } = a,
    d = await (c.isRTL == null ? void 0 : c.isRTL(s.floating)),
    m = En(u),
    h = xa(u),
    g = en(u) === "y",
    v = Xv.has(m) ? -1 : 1,
    y = d && g ? -1 : 1,
    S = wn(o, a);
  let {
    mainAxis: T,
    crossAxis: C,
    alignmentAxis: D,
  } = typeof S == "number"
    ? { mainAxis: S, crossAxis: 0, alignmentAxis: null }
    : {
        mainAxis: S.mainAxis || 0,
        crossAxis: S.crossAxis || 0,
        alignmentAxis: S.alignmentAxis,
      };
  return (
    h && typeof D == "number" && (C = h === "end" ? D * -1 : D),
    g ? { x: C * y, y: T * v } : { x: T * v, y: C * y }
  );
}
const LS = function (a) {
    return (
      a === void 0 && (a = 0),
      {
        name: "offset",
        options: a,
        async fn(o) {
          var u, c;
          const { x: s, y: d, placement: m, middlewareData: h } = o,
            g = await HS(o, a);
          return m === ((u = h.offset) == null ? void 0 : u.placement) &&
            (c = h.arrow) != null &&
            c.alignmentOffset
            ? {}
            : { x: s + g.x, y: d + g.y, data: { ...g, placement: m } };
        },
      }
    );
  },
  BS = function (a) {
    return (
      a === void 0 && (a = {}),
      {
        name: "shift",
        options: a,
        async fn(o) {
          const { x: u, y: c, placement: s } = o,
            {
              mainAxis: d = !0,
              crossAxis: m = !1,
              limiter: h = {
                fn: (_) => {
                  let { x: L, y: H } = _;
                  return { x: L, y: H };
                },
              },
              ...g
            } = wn(a, o),
            v = { x: u, y: c },
            y = await Ri(o, g),
            S = en(En(s)),
            T = ps(S);
          let C = v[T],
            D = v[S];
          if (d) {
            const _ = T === "y" ? "top" : "left",
              L = T === "y" ? "bottom" : "right",
              H = C + y[_],
              Y = C - y[L];
            C = is(H, C, Y);
          }
          if (m) {
            const _ = S === "y" ? "top" : "left",
              L = S === "y" ? "bottom" : "right",
              H = D + y[_],
              Y = D - y[L];
            D = is(H, D, Y);
          }
          const E = h.fn({ ...o, [T]: C, [S]: D });
          return {
            ...E,
            data: { x: E.x - u, y: E.y - c, enabled: { [T]: d, [S]: m } },
          };
        },
      }
    );
  },
  YS = function (a) {
    return (
      a === void 0 && (a = {}),
      {
        options: a,
        fn(o) {
          const { x: u, y: c, placement: s, rects: d, middlewareData: m } = o,
            { offset: h = 0, mainAxis: g = !0, crossAxis: v = !0 } = wn(a, o),
            y = { x: u, y: c },
            S = en(s),
            T = ps(S);
          let C = y[T],
            D = y[S];
          const E = wn(h, o),
            _ =
              typeof E == "number"
                ? { mainAxis: E, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...E };
          if (g) {
            const Y = T === "y" ? "height" : "width",
              K = d.reference[T] - d.floating[Y] + _.mainAxis,
              q = d.reference[T] + d.reference[Y] - _.mainAxis;
            C < K ? (C = K) : C > q && (C = q);
          }
          if (v) {
            var L, H;
            const Y = T === "y" ? "width" : "height",
              K = Xv.has(En(s)),
              q =
                d.reference[S] -
                d.floating[Y] +
                ((K && ((L = m.offset) == null ? void 0 : L[S])) || 0) +
                (K ? 0 : _.crossAxis),
              $ =
                d.reference[S] +
                d.reference[Y] +
                (K ? 0 : ((H = m.offset) == null ? void 0 : H[S]) || 0) -
                (K ? _.crossAxis : 0);
            D < q ? (D = q) : D > $ && (D = $);
          }
          return { [T]: C, [S]: D };
        },
      }
    );
  },
  VS = function (a) {
    return (
      a === void 0 && (a = {}),
      {
        name: "size",
        options: a,
        async fn(o) {
          var u, c;
          const { placement: s, rects: d, platform: m, elements: h } = o,
            { apply: g = () => {}, ...v } = wn(a, o),
            y = await Ri(o, v),
            S = En(s),
            T = xa(s),
            C = en(s) === "y",
            { width: D, height: E } = d.floating;
          let _, L;
          S === "top" || S === "bottom"
            ? ((_ = S),
              (L =
                T ===
                ((await (m.isRTL == null ? void 0 : m.isRTL(h.floating)))
                  ? "start"
                  : "end")
                  ? "left"
                  : "right"))
            : ((L = S), (_ = T === "end" ? "top" : "bottom"));
          const H = E - y.top - y.bottom,
            Y = D - y.left - y.right,
            K = $n(E - y[_], H),
            q = $n(D - y[L], Y),
            $ = !o.middlewareData.shift;
          let X = K,
            J = q;
          if (
            ((u = o.middlewareData.shift) != null && u.enabled.x && (J = Y),
            (c = o.middlewareData.shift) != null && c.enabled.y && (X = H),
            $ && !T)
          ) {
            const oe = Mt(y.left, 0),
              ge = Mt(y.right, 0),
              me = Mt(y.top, 0),
              P = Mt(y.bottom, 0);
            C
              ? (J =
                  D -
                  2 * (oe !== 0 || ge !== 0 ? oe + ge : Mt(y.left, y.right)))
              : (X =
                  E - 2 * (me !== 0 || P !== 0 ? me + P : Mt(y.top, y.bottom)));
          }
          await g({ ...o, availableWidth: J, availableHeight: X });
          const te = await m.getDimensions(h.floating);
          return D !== te.width || E !== te.height
            ? { reset: { rects: !0 } }
            : {};
        },
      }
    );
  };
function mo() {
  return typeof window < "u";
}
function wa(a) {
  return Qv(a) ? (a.nodeName || "").toLowerCase() : "#document";
}
function Nt(a) {
  var o;
  return (
    (a == null || (o = a.ownerDocument) == null ? void 0 : o.defaultView) ||
    window
  );
}
function ln(a) {
  var o;
  return (o = (Qv(a) ? a.ownerDocument : a.document) || window.document) == null
    ? void 0
    : o.documentElement;
}
function Qv(a) {
  return mo() ? a instanceof Node || a instanceof Nt(a).Node : !1;
}
function Zt(a) {
  return mo() ? a instanceof Element || a instanceof Nt(a).Element : !1;
}
function nn(a) {
  return mo() ? a instanceof HTMLElement || a instanceof Nt(a).HTMLElement : !1;
}
function lv(a) {
  return !mo() || typeof ShadowRoot > "u"
    ? !1
    : a instanceof ShadowRoot || a instanceof Nt(a).ShadowRoot;
}
const qS = new Set(["inline", "contents"]);
function Mi(a) {
  const { overflow: o, overflowX: u, overflowY: c, display: s } = Kt(a);
  return /auto|scroll|overlay|hidden|clip/.test(o + c + u) && !qS.has(s);
}
const kS = new Set(["table", "td", "th"]);
function GS(a) {
  return kS.has(wa(a));
}
const XS = [":popover-open", ":modal"];
function ho(a) {
  return XS.some((o) => {
    try {
      return a.matches(o);
    } catch {
      return !1;
    }
  });
}
const QS = ["transform", "translate", "scale", "rotate", "perspective"],
  ZS = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
  KS = ["paint", "layout", "strict", "content"];
function Ss(a) {
  const o = xs(),
    u = Zt(a) ? Kt(a) : a;
  return (
    QS.some((c) => (u[c] ? u[c] !== "none" : !1)) ||
    (u.containerType ? u.containerType !== "normal" : !1) ||
    (!o && (u.backdropFilter ? u.backdropFilter !== "none" : !1)) ||
    (!o && (u.filter ? u.filter !== "none" : !1)) ||
    ZS.some((c) => (u.willChange || "").includes(c)) ||
    KS.some((c) => (u.contain || "").includes(c))
  );
}
function JS(a) {
  let o = Fn(a);
  for (; nn(o) && !pa(o); ) {
    if (Ss(o)) return o;
    if (ho(o)) return null;
    o = Fn(o);
  }
  return null;
}
function xs() {
  return typeof CSS > "u" || !CSS.supports
    ? !1
    : CSS.supports("-webkit-backdrop-filter", "none");
}
const WS = new Set(["html", "body", "#document"]);
function pa(a) {
  return WS.has(wa(a));
}
function Kt(a) {
  return Nt(a).getComputedStyle(a);
}
function vo(a) {
  return Zt(a)
    ? { scrollLeft: a.scrollLeft, scrollTop: a.scrollTop }
    : { scrollLeft: a.scrollX, scrollTop: a.scrollY };
}
function Fn(a) {
  if (wa(a) === "html") return a;
  const o = a.assignedSlot || a.parentNode || (lv(a) && a.host) || ln(a);
  return lv(o) ? o.host : o;
}
function Zv(a) {
  const o = Fn(a);
  return pa(o)
    ? a.ownerDocument
      ? a.ownerDocument.body
      : a.body
    : nn(o) && Mi(o)
    ? o
    : Zv(o);
}
function Ci(a, o, u) {
  var c;
  o === void 0 && (o = []), u === void 0 && (u = !0);
  const s = Zv(a),
    d = s === ((c = a.ownerDocument) == null ? void 0 : c.body),
    m = Nt(s);
  if (d) {
    const h = os(m);
    return o.concat(
      m,
      m.visualViewport || [],
      Mi(s) ? s : [],
      h && u ? Ci(h) : []
    );
  }
  return o.concat(s, Ci(s, [], u));
}
function os(a) {
  return a.parent && Object.getPrototypeOf(a.parent) ? a.frameElement : null;
}
function Kv(a) {
  const o = Kt(a);
  let u = parseFloat(o.width) || 0,
    c = parseFloat(o.height) || 0;
  const s = nn(a),
    d = s ? a.offsetWidth : u,
    m = s ? a.offsetHeight : c,
    h = ao(u) !== d || ao(c) !== m;
  return h && ((u = d), (c = m)), { width: u, height: c, $: h };
}
function ws(a) {
  return Zt(a) ? a : a.contextElement;
}
function va(a) {
  const o = ws(a);
  if (!nn(o)) return tn(1);
  const u = o.getBoundingClientRect(),
    { width: c, height: s, $: d } = Kv(o);
  let m = (d ? ao(u.width) : u.width) / c,
    h = (d ? ao(u.height) : u.height) / s;
  return (
    (!m || !Number.isFinite(m)) && (m = 1),
    (!h || !Number.isFinite(h)) && (h = 1),
    { x: m, y: h }
  );
}
const PS = tn(0);
function Jv(a) {
  const o = Nt(a);
  return !xs() || !o.visualViewport
    ? PS
    : { x: o.visualViewport.offsetLeft, y: o.visualViewport.offsetTop };
}
function $S(a, o, u) {
  return o === void 0 && (o = !1), !u || (o && u !== Nt(a)) ? !1 : o;
}
function El(a, o, u, c) {
  o === void 0 && (o = !1), u === void 0 && (u = !1);
  const s = a.getBoundingClientRect(),
    d = ws(a);
  let m = tn(1);
  o && (c ? Zt(c) && (m = va(c)) : (m = va(a)));
  const h = $S(d, u, c) ? Jv(d) : tn(0);
  let g = (s.left + h.x) / m.x,
    v = (s.top + h.y) / m.y,
    y = s.width / m.x,
    S = s.height / m.y;
  if (d) {
    const T = Nt(d),
      C = c && Zt(c) ? Nt(c) : c;
    let D = T,
      E = os(D);
    for (; E && c && C !== D; ) {
      const _ = va(E),
        L = E.getBoundingClientRect(),
        H = Kt(E),
        Y = L.left + (E.clientLeft + parseFloat(H.paddingLeft)) * _.x,
        K = L.top + (E.clientTop + parseFloat(H.paddingTop)) * _.y;
      (g *= _.x),
        (v *= _.y),
        (y *= _.x),
        (S *= _.y),
        (g += Y),
        (v += K),
        (D = Nt(E)),
        (E = os(D));
    }
  }
  return ro({ width: y, height: S, x: g, y: v });
}
function go(a, o) {
  const u = vo(a).scrollLeft;
  return o ? o.left + u : El(ln(a)).left + u;
}
function Wv(a, o) {
  const u = a.getBoundingClientRect(),
    c = u.left + o.scrollLeft - go(a, u),
    s = u.top + o.scrollTop;
  return { x: c, y: s };
}
function FS(a) {
  let { elements: o, rect: u, offsetParent: c, strategy: s } = a;
  const d = s === "fixed",
    m = ln(c),
    h = o ? ho(o.floating) : !1;
  if (c === m || (h && d)) return u;
  let g = { scrollLeft: 0, scrollTop: 0 },
    v = tn(1);
  const y = tn(0),
    S = nn(c);
  if (
    (S || (!S && !d)) &&
    ((wa(c) !== "body" || Mi(m)) && (g = vo(c)), nn(c))
  ) {
    const C = El(c);
    (v = va(c)), (y.x = C.x + c.clientLeft), (y.y = C.y + c.clientTop);
  }
  const T = m && !S && !d ? Wv(m, g) : tn(0);
  return {
    width: u.width * v.x,
    height: u.height * v.y,
    x: u.x * v.x - g.scrollLeft * v.x + y.x + T.x,
    y: u.y * v.y - g.scrollTop * v.y + y.y + T.y,
  };
}
function IS(a) {
  return Array.from(a.getClientRects());
}
function ex(a) {
  const o = ln(a),
    u = vo(a),
    c = a.ownerDocument.body,
    s = Mt(o.scrollWidth, o.clientWidth, c.scrollWidth, c.clientWidth),
    d = Mt(o.scrollHeight, o.clientHeight, c.scrollHeight, c.clientHeight);
  let m = -u.scrollLeft + go(a);
  const h = -u.scrollTop;
  return (
    Kt(c).direction === "rtl" && (m += Mt(o.clientWidth, c.clientWidth) - s),
    { width: s, height: d, x: m, y: h }
  );
}
const av = 25;
function tx(a, o) {
  const u = Nt(a),
    c = ln(a),
    s = u.visualViewport;
  let d = c.clientWidth,
    m = c.clientHeight,
    h = 0,
    g = 0;
  if (s) {
    (d = s.width), (m = s.height);
    const y = xs();
    (!y || (y && o === "fixed")) && ((h = s.offsetLeft), (g = s.offsetTop));
  }
  const v = go(c);
  if (v <= 0) {
    const y = c.ownerDocument,
      S = y.body,
      T = getComputedStyle(S),
      C =
        (y.compatMode === "CSS1Compat" &&
          parseFloat(T.marginLeft) + parseFloat(T.marginRight)) ||
        0,
      D = Math.abs(c.clientWidth - S.clientWidth - C);
    D <= av && (d -= D);
  } else v <= av && (d += v);
  return { width: d, height: m, x: h, y: g };
}
const nx = new Set(["absolute", "fixed"]);
function lx(a, o) {
  const u = El(a, !0, o === "fixed"),
    c = u.top + a.clientTop,
    s = u.left + a.clientLeft,
    d = nn(a) ? va(a) : tn(1),
    m = a.clientWidth * d.x,
    h = a.clientHeight * d.y,
    g = s * d.x,
    v = c * d.y;
  return { width: m, height: h, x: g, y: v };
}
function iv(a, o, u) {
  let c;
  if (o === "viewport") c = tx(a, u);
  else if (o === "document") c = ex(ln(a));
  else if (Zt(o)) c = lx(o, u);
  else {
    const s = Jv(a);
    c = { x: o.x - s.x, y: o.y - s.y, width: o.width, height: o.height };
  }
  return ro(c);
}
function Pv(a, o) {
  const u = Fn(a);
  return u === o || !Zt(u) || pa(u)
    ? !1
    : Kt(u).position === "fixed" || Pv(u, o);
}
function ax(a, o) {
  const u = o.get(a);
  if (u) return u;
  let c = Ci(a, [], !1).filter((h) => Zt(h) && wa(h) !== "body"),
    s = null;
  const d = Kt(a).position === "fixed";
  let m = d ? Fn(a) : a;
  for (; Zt(m) && !pa(m); ) {
    const h = Kt(m),
      g = Ss(m);
    !g && h.position === "fixed" && (s = null),
      (
        d
          ? !g && !s
          : (!g && h.position === "static" && !!s && nx.has(s.position)) ||
            (Mi(m) && !g && Pv(a, m))
      )
        ? (c = c.filter((y) => y !== m))
        : (s = h),
      (m = Fn(m));
  }
  return o.set(a, c), c;
}
function ix(a) {
  let { element: o, boundary: u, rootBoundary: c, strategy: s } = a;
  const m = [
      ...(u === "clippingAncestors"
        ? ho(o)
          ? []
          : ax(o, this._c)
        : [].concat(u)),
      c,
    ],
    h = m[0],
    g = m.reduce((v, y) => {
      const S = iv(o, y, s);
      return (
        (v.top = Mt(S.top, v.top)),
        (v.right = $n(S.right, v.right)),
        (v.bottom = $n(S.bottom, v.bottom)),
        (v.left = Mt(S.left, v.left)),
        v
      );
    }, iv(o, h, s));
  return {
    width: g.right - g.left,
    height: g.bottom - g.top,
    x: g.left,
    y: g.top,
  };
}
function rx(a) {
  const { width: o, height: u } = Kv(a);
  return { width: o, height: u };
}
function ox(a, o, u) {
  const c = nn(o),
    s = ln(o),
    d = u === "fixed",
    m = El(a, !0, d, o);
  let h = { scrollLeft: 0, scrollTop: 0 };
  const g = tn(0);
  function v() {
    g.x = go(s);
  }
  if (c || (!c && !d))
    if (((wa(o) !== "body" || Mi(s)) && (h = vo(o)), c)) {
      const C = El(o, !0, d, o);
      (g.x = C.x + o.clientLeft), (g.y = C.y + o.clientTop);
    } else s && v();
  d && !c && s && v();
  const y = s && !c && !d ? Wv(s, h) : tn(0),
    S = m.left + h.scrollLeft - g.x - y.x,
    T = m.top + h.scrollTop - g.y - y.y;
  return { x: S, y: T, width: m.width, height: m.height };
}
function Ju(a) {
  return Kt(a).position === "static";
}
function rv(a, o) {
  if (!nn(a) || Kt(a).position === "fixed") return null;
  if (o) return o(a);
  let u = a.offsetParent;
  return ln(a) === u && (u = u.ownerDocument.body), u;
}
function $v(a, o) {
  const u = Nt(a);
  if (ho(a)) return u;
  if (!nn(a)) {
    let s = Fn(a);
    for (; s && !pa(s); ) {
      if (Zt(s) && !Ju(s)) return s;
      s = Fn(s);
    }
    return u;
  }
  let c = rv(a, o);
  for (; c && GS(c) && Ju(c); ) c = rv(c, o);
  return c && pa(c) && Ju(c) && !Ss(c) ? u : c || JS(a) || u;
}
const cx = async function (a) {
  const o = this.getOffsetParent || $v,
    u = this.getDimensions,
    c = await u(a.floating);
  return {
    reference: ox(a.reference, await o(a.floating), a.strategy),
    floating: { x: 0, y: 0, width: c.width, height: c.height },
  };
};
function ux(a) {
  return Kt(a).direction === "rtl";
}
const sx = {
  convertOffsetParentRelativeRectToViewportRelativeRect: FS,
  getDocumentElement: ln,
  getClippingRect: ix,
  getOffsetParent: $v,
  getElementRects: cx,
  getClientRects: IS,
  getDimensions: rx,
  getScale: va,
  isElement: Zt,
  isRTL: ux,
};
function Fv(a, o) {
  return (
    a.x === o.x && a.y === o.y && a.width === o.width && a.height === o.height
  );
}
function fx(a, o) {
  let u = null,
    c;
  const s = ln(a);
  function d() {
    var h;
    clearTimeout(c), (h = u) == null || h.disconnect(), (u = null);
  }
  function m(h, g) {
    h === void 0 && (h = !1), g === void 0 && (g = 1), d();
    const v = a.getBoundingClientRect(),
      { left: y, top: S, width: T, height: C } = v;
    if ((h || o(), !T || !C)) return;
    const D = Wr(S),
      E = Wr(s.clientWidth - (y + T)),
      _ = Wr(s.clientHeight - (S + C)),
      L = Wr(y),
      Y = {
        rootMargin: -D + "px " + -E + "px " + -_ + "px " + -L + "px",
        threshold: Mt(0, $n(1, g)) || 1,
      };
    let K = !0;
    function q($) {
      const X = $[0].intersectionRatio;
      if (X !== g) {
        if (!K) return m();
        X
          ? m(!1, X)
          : (c = setTimeout(() => {
              m(!1, 1e-7);
            }, 1e3));
      }
      X === 1 && !Fv(v, a.getBoundingClientRect()) && m(), (K = !1);
    }
    try {
      u = new IntersectionObserver(q, { ...Y, root: s.ownerDocument });
    } catch {
      u = new IntersectionObserver(q, Y);
    }
    u.observe(a);
  }
  return m(!0), d;
}
function dx(a, o, u, c) {
  c === void 0 && (c = {});
  const {
      ancestorScroll: s = !0,
      ancestorResize: d = !0,
      elementResize: m = typeof ResizeObserver == "function",
      layoutShift: h = typeof IntersectionObserver == "function",
      animationFrame: g = !1,
    } = c,
    v = ws(a),
    y = s || d ? [...(v ? Ci(v) : []), ...Ci(o)] : [];
  y.forEach((L) => {
    s && L.addEventListener("scroll", u, { passive: !0 }),
      d && L.addEventListener("resize", u);
  });
  const S = v && h ? fx(v, u) : null;
  let T = -1,
    C = null;
  m &&
    ((C = new ResizeObserver((L) => {
      let [H] = L;
      H &&
        H.target === v &&
        C &&
        (C.unobserve(o),
        cancelAnimationFrame(T),
        (T = requestAnimationFrame(() => {
          var Y;
          (Y = C) == null || Y.observe(o);
        }))),
        u();
    })),
    v && !g && C.observe(v),
    C.observe(o));
  let D,
    E = g ? El(a) : null;
  g && _();
  function _() {
    const L = El(a);
    E && !Fv(E, L) && u(), (E = L), (D = requestAnimationFrame(_));
  }
  return (
    u(),
    () => {
      var L;
      y.forEach((H) => {
        s && H.removeEventListener("scroll", u),
          d && H.removeEventListener("resize", u);
      }),
        S == null || S(),
        (L = C) == null || L.disconnect(),
        (C = null),
        g && cancelAnimationFrame(D);
    }
  );
}
const mx = LS,
  hx = BS,
  vx = jS,
  gx = VS,
  px = US,
  ov = DS,
  yx = YS,
  bx = (a, o, u) => {
    const c = new Map(),
      s = { platform: sx, ...u },
      d = { ...s.platform, _c: c };
    return zS(a, o, { ...s, platform: d });
  };
var Sx = typeof document < "u",
  xx = function () {},
  to = Sx ? b.useLayoutEffect : xx;
function oo(a, o) {
  if (a === o) return !0;
  if (typeof a != typeof o) return !1;
  if (typeof a == "function" && a.toString() === o.toString()) return !0;
  let u, c, s;
  if (a && o && typeof a == "object") {
    if (Array.isArray(a)) {
      if (((u = a.length), u !== o.length)) return !1;
      for (c = u; c-- !== 0; ) if (!oo(a[c], o[c])) return !1;
      return !0;
    }
    if (((s = Object.keys(a)), (u = s.length), u !== Object.keys(o).length))
      return !1;
    for (c = u; c-- !== 0; ) if (!{}.hasOwnProperty.call(o, s[c])) return !1;
    for (c = u; c-- !== 0; ) {
      const d = s[c];
      if (!(d === "_owner" && a.$$typeof) && !oo(a[d], o[d])) return !1;
    }
    return !0;
  }
  return a !== a && o !== o;
}
function Iv(a) {
  return typeof window > "u"
    ? 1
    : (a.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function cv(a, o) {
  const u = Iv(a);
  return Math.round(o * u) / u;
}
function Wu(a) {
  const o = b.useRef(a);
  return (
    to(() => {
      o.current = a;
    }),
    o
  );
}
function wx(a) {
  a === void 0 && (a = {});
  const {
      placement: o = "bottom",
      strategy: u = "absolute",
      middleware: c = [],
      platform: s,
      elements: { reference: d, floating: m } = {},
      transform: h = !0,
      whileElementsMounted: g,
      open: v,
    } = a,
    [y, S] = b.useState({
      x: 0,
      y: 0,
      strategy: u,
      placement: o,
      middlewareData: {},
      isPositioned: !1,
    }),
    [T, C] = b.useState(c);
  oo(T, c) || C(c);
  const [D, E] = b.useState(null),
    [_, L] = b.useState(null),
    H = b.useCallback((B) => {
      B !== $.current && (($.current = B), E(B));
    }, []),
    Y = b.useCallback((B) => {
      B !== X.current && ((X.current = B), L(B));
    }, []),
    K = d || D,
    q = m || _,
    $ = b.useRef(null),
    X = b.useRef(null),
    J = b.useRef(y),
    te = g != null,
    oe = Wu(g),
    ge = Wu(s),
    me = Wu(v),
    P = b.useCallback(() => {
      if (!$.current || !X.current) return;
      const B = { placement: o, strategy: u, middleware: T };
      ge.current && (B.platform = ge.current),
        bx($.current, X.current, B).then((ue) => {
          const A = { ...ue, isPositioned: me.current !== !1 };
          ne.current &&
            !oo(J.current, A) &&
            ((J.current = A),
            Oi.flushSync(() => {
              S(A);
            }));
        });
    }, [T, o, u, ge, me]);
  to(() => {
    v === !1 &&
      J.current.isPositioned &&
      ((J.current.isPositioned = !1), S((B) => ({ ...B, isPositioned: !1 })));
  }, [v]);
  const ne = b.useRef(!1);
  to(
    () => (
      (ne.current = !0),
      () => {
        ne.current = !1;
      }
    ),
    []
  ),
    to(() => {
      if ((K && ($.current = K), q && (X.current = q), K && q)) {
        if (oe.current) return oe.current(K, q, P);
        P();
      }
    }, [K, q, P, oe, te]);
  const re = b.useMemo(
      () => ({ reference: $, floating: X, setReference: H, setFloating: Y }),
      [H, Y]
    ),
    O = b.useMemo(() => ({ reference: K, floating: q }), [K, q]),
    k = b.useMemo(() => {
      const B = { position: u, left: 0, top: 0 };
      if (!O.floating) return B;
      const ue = cv(O.floating, y.x),
        A = cv(O.floating, y.y);
      return h
        ? {
            ...B,
            transform: "translate(" + ue + "px, " + A + "px)",
            ...(Iv(O.floating) >= 1.5 && { willChange: "transform" }),
          }
        : { position: u, left: ue, top: A };
    }, [u, h, O.floating, y.x, y.y]);
  return b.useMemo(
    () => ({ ...y, update: P, refs: re, elements: O, floatingStyles: k }),
    [y, P, re, O, k]
  );
}
const Ex = (a) => {
    function o(u) {
      return {}.hasOwnProperty.call(u, "current");
    }
    return {
      name: "arrow",
      options: a,
      fn(u) {
        const { element: c, padding: s } = typeof a == "function" ? a(u) : a;
        return c && o(c)
          ? c.current != null
            ? ov({ element: c.current, padding: s }).fn(u)
            : {}
          : c
          ? ov({ element: c, padding: s }).fn(u)
          : {};
      },
    };
  },
  Ax = (a, o) => ({ ...mx(a), options: [a, o] }),
  Tx = (a, o) => ({ ...hx(a), options: [a, o] }),
  Rx = (a, o) => ({ ...yx(a), options: [a, o] }),
  Cx = (a, o) => ({ ...vx(a), options: [a, o] }),
  Ox = (a, o) => ({ ...gx(a), options: [a, o] }),
  Mx = (a, o) => ({ ...px(a), options: [a, o] }),
  Nx = (a, o) => ({ ...Ex(a), options: [a, o] });
var _x = "Arrow",
  eg = b.forwardRef((a, o) => {
    const { children: u, width: c = 10, height: s = 5, ...d } = a;
    return w.jsx(Ye.svg, {
      ...d,
      ref: o,
      width: c,
      height: s,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: a.asChild ? u : w.jsx("polygon", { points: "0,0 30,0 15,10" }),
    });
  });
eg.displayName = _x;
var zx = eg;
function Dx(a) {
  const [o, u] = b.useState(void 0);
  return (
    rt(() => {
      if (a) {
        u({ width: a.offsetWidth, height: a.offsetHeight });
        const c = new ResizeObserver((s) => {
          if (!Array.isArray(s) || !s.length) return;
          const d = s[0];
          let m, h;
          if ("borderBoxSize" in d) {
            const g = d.borderBoxSize,
              v = Array.isArray(g) ? g[0] : g;
            (m = v.inlineSize), (h = v.blockSize);
          } else (m = a.offsetWidth), (h = a.offsetHeight);
          u({ width: m, height: h });
        });
        return c.observe(a, { box: "border-box" }), () => c.unobserve(a);
      } else u(void 0);
    }, [a]),
    o
  );
}
var Es = "Popper",
  [tg, ng] = fo(Es),
  [jx, lg] = tg(Es),
  ag = (a) => {
    const { __scopePopper: o, children: u } = a,
      [c, s] = b.useState(null);
    return w.jsx(jx, { scope: o, anchor: c, onAnchorChange: s, children: u });
  };
ag.displayName = Es;
var ig = "PopperAnchor",
  rg = b.forwardRef((a, o) => {
    const { __scopePopper: u, virtualRef: c, ...s } = a,
      d = lg(ig, u),
      m = b.useRef(null),
      h = qe(o, m),
      g = b.useRef(null);
    return (
      b.useEffect(() => {
        const v = g.current;
        (g.current = (c == null ? void 0 : c.current) || m.current),
          v !== g.current && d.onAnchorChange(g.current);
      }),
      c ? null : w.jsx(Ye.div, { ...s, ref: h })
    );
  });
rg.displayName = ig;
var As = "PopperContent",
  [Ux, Hx] = tg(As),
  og = b.forwardRef((a, o) => {
    var I, fe, Ne, Re, we, Ee;
    const {
        __scopePopper: u,
        side: c = "bottom",
        sideOffset: s = 0,
        align: d = "center",
        alignOffset: m = 0,
        arrowPadding: h = 0,
        avoidCollisions: g = !0,
        collisionBoundary: v = [],
        collisionPadding: y = 0,
        sticky: S = "partial",
        hideWhenDetached: T = !1,
        updatePositionStrategy: C = "optimized",
        onPlaced: D,
        ...E
      } = a,
      _ = lg(As, u),
      [L, H] = b.useState(null),
      Y = qe(o, (nt) => H(nt)),
      [K, q] = b.useState(null),
      $ = Dx(K),
      X = ($ == null ? void 0 : $.width) ?? 0,
      J = ($ == null ? void 0 : $.height) ?? 0,
      te = c + (d !== "center" ? "-" + d : ""),
      oe =
        typeof y == "number"
          ? y
          : { top: 0, right: 0, bottom: 0, left: 0, ...y },
      ge = Array.isArray(v) ? v : [v],
      me = ge.length > 0,
      P = { padding: oe, boundary: ge.filter(Bx), altBoundary: me },
      {
        refs: ne,
        floatingStyles: re,
        placement: O,
        isPositioned: k,
        middlewareData: B,
      } = wx({
        strategy: "fixed",
        placement: te,
        whileElementsMounted: (...nt) =>
          dx(...nt, { animationFrame: C === "always" }),
        elements: { reference: _.anchor },
        middleware: [
          Ax({ mainAxis: s + J, alignmentAxis: m }),
          g &&
            Tx({
              mainAxis: !0,
              crossAxis: !1,
              limiter: S === "partial" ? Rx() : void 0,
              ...P,
            }),
          g && Cx({ ...P }),
          Ox({
            ...P,
            apply: ({
              elements: nt,
              rects: mt,
              availableWidth: tl,
              availableHeight: nl,
            }) => {
              const { width: ot, height: Eo } = mt.reference,
                ll = nt.floating.style;
              ll.setProperty("--radix-popper-available-width", `${tl}px`),
                ll.setProperty("--radix-popper-available-height", `${nl}px`),
                ll.setProperty("--radix-popper-anchor-width", `${ot}px`),
                ll.setProperty("--radix-popper-anchor-height", `${Eo}px`);
            },
          }),
          K && Nx({ element: K, padding: h }),
          Yx({ arrowWidth: X, arrowHeight: J }),
          T && Mx({ strategy: "referenceHidden", ...P }),
        ],
      }),
      [ue, A] = sg(O),
      Q = bt(D);
    rt(() => {
      k && (Q == null || Q());
    }, [k, Q]);
    const F = (I = B.arrow) == null ? void 0 : I.x,
      W = (fe = B.arrow) == null ? void 0 : fe.y,
      ee = ((Ne = B.arrow) == null ? void 0 : Ne.centerOffset) !== 0,
      [pe, se] = b.useState();
    return (
      rt(() => {
        L && se(window.getComputedStyle(L).zIndex);
      }, [L]),
      w.jsx("div", {
        ref: ne.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...re,
          transform: k ? re.transform : "translate(0, -200%)",
          minWidth: "max-content",
          zIndex: pe,
          "--radix-popper-transform-origin": [
            (Re = B.transformOrigin) == null ? void 0 : Re.x,
            (we = B.transformOrigin) == null ? void 0 : we.y,
          ].join(" "),
          ...(((Ee = B.hide) == null ? void 0 : Ee.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none",
          }),
        },
        dir: a.dir,
        children: w.jsx(Ux, {
          scope: u,
          placedSide: ue,
          onArrowChange: q,
          arrowX: F,
          arrowY: W,
          shouldHideArrow: ee,
          children: w.jsx(Ye.div, {
            "data-side": ue,
            "data-align": A,
            ...E,
            ref: Y,
            style: { ...E.style, animation: k ? void 0 : "none" },
          }),
        }),
      })
    );
  });
og.displayName = As;
var cg = "PopperArrow",
  Lx = { top: "bottom", right: "left", bottom: "top", left: "right" },
  ug = b.forwardRef(function (o, u) {
    const { __scopePopper: c, ...s } = o,
      d = Hx(cg, c),
      m = Lx[d.placedSide];
    return w.jsx("span", {
      ref: d.onArrowChange,
      style: {
        position: "absolute",
        left: d.arrowX,
        top: d.arrowY,
        [m]: 0,
        transformOrigin: {
          top: "",
          right: "0 0",
          bottom: "center 0",
          left: "100% 0",
        }[d.placedSide],
        transform: {
          top: "translateY(100%)",
          right: "translateY(50%) rotate(90deg) translateX(-50%)",
          bottom: "rotate(180deg)",
          left: "translateY(50%) rotate(-90deg) translateX(50%)",
        }[d.placedSide],
        visibility: d.shouldHideArrow ? "hidden" : void 0,
      },
      children: w.jsx(zx, {
        ...s,
        ref: u,
        style: { ...s.style, display: "block" },
      }),
    });
  });
ug.displayName = cg;
function Bx(a) {
  return a !== null;
}
var Yx = (a) => ({
  name: "transformOrigin",
  options: a,
  fn(o) {
    var _, L, H;
    const { placement: u, rects: c, middlewareData: s } = o,
      m = ((_ = s.arrow) == null ? void 0 : _.centerOffset) !== 0,
      h = m ? 0 : a.arrowWidth,
      g = m ? 0 : a.arrowHeight,
      [v, y] = sg(u),
      S = { start: "0%", center: "50%", end: "100%" }[y],
      T = (((L = s.arrow) == null ? void 0 : L.x) ?? 0) + h / 2,
      C = (((H = s.arrow) == null ? void 0 : H.y) ?? 0) + g / 2;
    let D = "",
      E = "";
    return (
      v === "bottom"
        ? ((D = m ? S : `${T}px`), (E = `${-g}px`))
        : v === "top"
        ? ((D = m ? S : `${T}px`), (E = `${c.floating.height + g}px`))
        : v === "right"
        ? ((D = `${-g}px`), (E = m ? S : `${C}px`))
        : v === "left" &&
          ((D = `${c.floating.width + g}px`), (E = m ? S : `${C}px`)),
      { data: { x: D, y: E } }
    );
  },
});
function sg(a) {
  const [o, u = "center"] = a.split("-");
  return [o, u];
}
var Vx = ag,
  qx = rg,
  kx = og,
  Gx = ug,
  Xx = "Portal",
  fg = b.forwardRef((a, o) => {
    var h;
    const { container: u, ...c } = a,
      [s, d] = b.useState(!1);
    rt(() => d(!0), []);
    const m =
      u ||
      (s &&
        ((h = globalThis == null ? void 0 : globalThis.document) == null
          ? void 0
          : h.body));
    return m ? $b.createPortal(w.jsx(Ye.div, { ...c, ref: o }), m) : null;
  });
fg.displayName = Xx;
var Qx = yv[" useInsertionEffect ".trim().toString()] || rt;
function uv({ prop: a, defaultProp: o, onChange: u = () => {}, caller: c }) {
  const [s, d, m] = Zx({ defaultProp: o, onChange: u }),
    h = a !== void 0,
    g = h ? a : s;
  {
    const y = b.useRef(a !== void 0);
    b.useEffect(() => {
      const S = y.current;
      S !== h &&
        console.warn(
          `${c} is changing from ${S ? "controlled" : "uncontrolled"} to ${
            h ? "controlled" : "uncontrolled"
          }. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        ),
        (y.current = h);
    }, [h, c]);
  }
  const v = b.useCallback(
    (y) => {
      var S;
      if (h) {
        const T = Kx(y) ? y(a) : y;
        T !== a && ((S = m.current) == null || S.call(m, T));
      } else d(y);
    },
    [h, a, d, m]
  );
  return [g, v];
}
function Zx({ defaultProp: a, onChange: o }) {
  const [u, c] = b.useState(a),
    s = b.useRef(u),
    d = b.useRef(o);
  return (
    Qx(() => {
      d.current = o;
    }, [o]),
    b.useEffect(() => {
      var m;
      s.current !== u &&
        ((m = d.current) == null || m.call(d, u), (s.current = u));
    }, [u, s]),
    [u, c, d]
  );
}
function Kx(a) {
  return typeof a == "function";
}
function Jx(a) {
  const o = b.useRef({ value: a, previous: a });
  return b.useMemo(
    () => (
      o.current.value !== a &&
        ((o.current.previous = o.current.value), (o.current.value = a)),
      o.current.previous
    ),
    [a]
  );
}
var dg = Object.freeze({
    position: "absolute",
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    wordWrap: "normal",
  }),
  Wx = "VisuallyHidden",
  Px = b.forwardRef((a, o) =>
    w.jsx(Ye.span, { ...a, ref: o, style: { ...dg, ...a.style } })
  );
Px.displayName = Wx;
var $x = function (a) {
    if (typeof document > "u") return null;
    var o = Array.isArray(a) ? a[0] : a;
    return o.ownerDocument.body;
  },
  da = new WeakMap(),
  Pr = new WeakMap(),
  $r = {},
  Pu = 0,
  mg = function (a) {
    return a && (a.host || mg(a.parentNode));
  },
  Fx = function (a, o) {
    return o
      .map(function (u) {
        if (a.contains(u)) return u;
        var c = mg(u);
        return c && a.contains(c)
          ? c
          : (console.error(
              "aria-hidden",
              u,
              "in not contained inside",
              a,
              ". Doing nothing"
            ),
            null);
      })
      .filter(function (u) {
        return !!u;
      });
  },
  Ix = function (a, o, u, c) {
    var s = Fx(o, Array.isArray(a) ? a : [a]);
    $r[u] || ($r[u] = new WeakMap());
    var d = $r[u],
      m = [],
      h = new Set(),
      g = new Set(s),
      v = function (S) {
        !S || h.has(S) || (h.add(S), v(S.parentNode));
      };
    s.forEach(v);
    var y = function (S) {
      !S ||
        g.has(S) ||
        Array.prototype.forEach.call(S.children, function (T) {
          if (h.has(T)) y(T);
          else
            try {
              var C = T.getAttribute(c),
                D = C !== null && C !== "false",
                E = (da.get(T) || 0) + 1,
                _ = (d.get(T) || 0) + 1;
              da.set(T, E),
                d.set(T, _),
                m.push(T),
                E === 1 && D && Pr.set(T, !0),
                _ === 1 && T.setAttribute(u, "true"),
                D || T.setAttribute(c, "true");
            } catch (L) {
              console.error("aria-hidden: cannot operate on ", T, L);
            }
        });
    };
    return (
      y(o),
      h.clear(),
      Pu++,
      function () {
        m.forEach(function (S) {
          var T = da.get(S) - 1,
            C = d.get(S) - 1;
          da.set(S, T),
            d.set(S, C),
            T || (Pr.has(S) || S.removeAttribute(c), Pr.delete(S)),
            C || S.removeAttribute(u);
        }),
          Pu--,
          Pu ||
            ((da = new WeakMap()),
            (da = new WeakMap()),
            (Pr = new WeakMap()),
            ($r = {}));
      }
    );
  },
  e1 = function (a, o, u) {
    u === void 0 && (u = "data-aria-hidden");
    var c = Array.from(Array.isArray(a) ? a : [a]),
      s = $x(a);
    return s
      ? (c.push.apply(c, Array.from(s.querySelectorAll("[aria-live], script"))),
        Ix(c, s, u, "aria-hidden"))
      : function () {
          return null;
        };
  },
  It = function () {
    return (
      (It =
        Object.assign ||
        function (o) {
          for (var u, c = 1, s = arguments.length; c < s; c++) {
            u = arguments[c];
            for (var d in u)
              Object.prototype.hasOwnProperty.call(u, d) && (o[d] = u[d]);
          }
          return o;
        }),
      It.apply(this, arguments)
    );
  };
function hg(a, o) {
  var u = {};
  for (var c in a)
    Object.prototype.hasOwnProperty.call(a, c) &&
      o.indexOf(c) < 0 &&
      (u[c] = a[c]);
  if (a != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, c = Object.getOwnPropertySymbols(a); s < c.length; s++)
      o.indexOf(c[s]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(a, c[s]) &&
        (u[c[s]] = a[c[s]]);
  return u;
}
function t1(a, o, u) {
  if (u || arguments.length === 2)
    for (var c = 0, s = o.length, d; c < s; c++)
      (d || !(c in o)) &&
        (d || (d = Array.prototype.slice.call(o, 0, c)), (d[c] = o[c]));
  return a.concat(d || Array.prototype.slice.call(o));
}
var no = "right-scroll-bar-position",
  lo = "width-before-scroll-bar",
  n1 = "with-scroll-bars-hidden",
  l1 = "--removed-body-scroll-bar-size";
function $u(a, o) {
  return typeof a == "function" ? a(o) : a && (a.current = o), a;
}
function a1(a, o) {
  var u = b.useState(function () {
    return {
      value: a,
      callback: o,
      facade: {
        get current() {
          return u.value;
        },
        set current(c) {
          var s = u.value;
          s !== c && ((u.value = c), u.callback(c, s));
        },
      },
    };
  })[0];
  return (u.callback = o), u.facade;
}
var i1 = typeof window < "u" ? b.useLayoutEffect : b.useEffect,
  sv = new WeakMap();
function r1(a, o) {
  var u = a1(null, function (c) {
    return a.forEach(function (s) {
      return $u(s, c);
    });
  });
  return (
    i1(
      function () {
        var c = sv.get(u);
        if (c) {
          var s = new Set(c),
            d = new Set(a),
            m = u.current;
          s.forEach(function (h) {
            d.has(h) || $u(h, null);
          }),
            d.forEach(function (h) {
              s.has(h) || $u(h, m);
            });
        }
        sv.set(u, a);
      },
      [a]
    ),
    u
  );
}
function o1(a) {
  return a;
}
function c1(a, o) {
  o === void 0 && (o = o1);
  var u = [],
    c = !1,
    s = {
      read: function () {
        if (c)
          throw new Error(
            "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`."
          );
        return u.length ? u[u.length - 1] : a;
      },
      useMedium: function (d) {
        var m = o(d, c);
        return (
          u.push(m),
          function () {
            u = u.filter(function (h) {
              return h !== m;
            });
          }
        );
      },
      assignSyncMedium: function (d) {
        for (c = !0; u.length; ) {
          var m = u;
          (u = []), m.forEach(d);
        }
        u = {
          push: function (h) {
            return d(h);
          },
          filter: function () {
            return u;
          },
        };
      },
      assignMedium: function (d) {
        c = !0;
        var m = [];
        if (u.length) {
          var h = u;
          (u = []), h.forEach(d), (m = u);
        }
        var g = function () {
            var y = m;
            (m = []), y.forEach(d);
          },
          v = function () {
            return Promise.resolve().then(g);
          };
        v(),
          (u = {
            push: function (y) {
              m.push(y), v();
            },
            filter: function (y) {
              return (m = m.filter(y)), u;
            },
          });
      },
    };
  return s;
}
function u1(a) {
  a === void 0 && (a = {});
  var o = c1(null);
  return (o.options = It({ async: !0, ssr: !1 }, a)), o;
}
var vg = function (a) {
  var o = a.sideCar,
    u = hg(a, ["sideCar"]);
  if (!o)
    throw new Error(
      "Sidecar: please provide `sideCar` property to import the right car"
    );
  var c = o.read();
  if (!c) throw new Error("Sidecar medium not found");
  return b.createElement(c, It({}, u));
};
vg.isSideCarExport = !0;
function s1(a, o) {
  return a.useMedium(o), vg;
}
var gg = u1(),
  Fu = function () {},
  po = b.forwardRef(function (a, o) {
    var u = b.useRef(null),
      c = b.useState({
        onScrollCapture: Fu,
        onWheelCapture: Fu,
        onTouchMoveCapture: Fu,
      }),
      s = c[0],
      d = c[1],
      m = a.forwardProps,
      h = a.children,
      g = a.className,
      v = a.removeScrollBar,
      y = a.enabled,
      S = a.shards,
      T = a.sideCar,
      C = a.noRelative,
      D = a.noIsolation,
      E = a.inert,
      _ = a.allowPinchZoom,
      L = a.as,
      H = L === void 0 ? "div" : L,
      Y = a.gapMode,
      K = hg(a, [
        "forwardProps",
        "children",
        "className",
        "removeScrollBar",
        "enabled",
        "shards",
        "sideCar",
        "noRelative",
        "noIsolation",
        "inert",
        "allowPinchZoom",
        "as",
        "gapMode",
      ]),
      q = T,
      $ = r1([u, o]),
      X = It(It({}, K), s);
    return b.createElement(
      b.Fragment,
      null,
      y &&
        b.createElement(q, {
          sideCar: gg,
          removeScrollBar: v,
          shards: S,
          noRelative: C,
          noIsolation: D,
          inert: E,
          setCallbacks: d,
          allowPinchZoom: !!_,
          lockRef: u,
          gapMode: Y,
        }),
      m
        ? b.cloneElement(b.Children.only(h), It(It({}, X), { ref: $ }))
        : b.createElement(H, It({}, X, { className: g, ref: $ }), h)
    );
  });
po.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
po.classNames = { fullWidth: lo, zeroRight: no };
var f1 = function () {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function d1() {
  if (!document) return null;
  var a = document.createElement("style");
  a.type = "text/css";
  var o = f1();
  return o && a.setAttribute("nonce", o), a;
}
function m1(a, o) {
  a.styleSheet
    ? (a.styleSheet.cssText = o)
    : a.appendChild(document.createTextNode(o));
}
function h1(a) {
  var o = document.head || document.getElementsByTagName("head")[0];
  o.appendChild(a);
}
var v1 = function () {
    var a = 0,
      o = null;
    return {
      add: function (u) {
        a == 0 && (o = d1()) && (m1(o, u), h1(o)), a++;
      },
      remove: function () {
        a--,
          !a && o && (o.parentNode && o.parentNode.removeChild(o), (o = null));
      },
    };
  },
  g1 = function () {
    var a = v1();
    return function (o, u) {
      b.useEffect(
        function () {
          return (
            a.add(o),
            function () {
              a.remove();
            }
          );
        },
        [o && u]
      );
    };
  },
  pg = function () {
    var a = g1(),
      o = function (u) {
        var c = u.styles,
          s = u.dynamic;
        return a(c, s), null;
      };
    return o;
  },
  p1 = { left: 0, top: 0, right: 0, gap: 0 },
  Iu = function (a) {
    return parseInt(a || "", 10) || 0;
  },
  y1 = function (a) {
    var o = window.getComputedStyle(document.body),
      u = o[a === "padding" ? "paddingLeft" : "marginLeft"],
      c = o[a === "padding" ? "paddingTop" : "marginTop"],
      s = o[a === "padding" ? "paddingRight" : "marginRight"];
    return [Iu(u), Iu(c), Iu(s)];
  },
  b1 = function (a) {
    if ((a === void 0 && (a = "margin"), typeof window > "u")) return p1;
    var o = y1(a),
      u = document.documentElement.clientWidth,
      c = window.innerWidth;
    return {
      left: o[0],
      top: o[1],
      right: o[2],
      gap: Math.max(0, c - u + o[2] - o[0]),
    };
  },
  S1 = pg(),
  ga = "data-scroll-locked",
  x1 = function (a, o, u, c) {
    var s = a.left,
      d = a.top,
      m = a.right,
      h = a.gap;
    return (
      u === void 0 && (u = "margin"),
      `
  .`
        .concat(
          n1,
          ` {
   overflow: hidden `
        )
        .concat(
          c,
          `;
   padding-right: `
        )
        .concat(h, "px ")
        .concat(
          c,
          `;
  }
  body[`
        )
        .concat(
          ga,
          `] {
    overflow: hidden `
        )
        .concat(
          c,
          `;
    overscroll-behavior: contain;
    `
        )
        .concat(
          [
            o && "position: relative ".concat(c, ";"),
            u === "margin" &&
              `
    padding-left: `
                .concat(
                  s,
                  `px;
    padding-top: `
                )
                .concat(
                  d,
                  `px;
    padding-right: `
                )
                .concat(
                  m,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `
                )
                .concat(h, "px ")
                .concat(
                  c,
                  `;
    `
                ),
            u === "padding" &&
              "padding-right: ".concat(h, "px ").concat(c, ";"),
          ]
            .filter(Boolean)
            .join(""),
          `
  }
  
  .`
        )
        .concat(
          no,
          ` {
    right: `
        )
        .concat(h, "px ")
        .concat(
          c,
          `;
  }
  
  .`
        )
        .concat(
          lo,
          ` {
    margin-right: `
        )
        .concat(h, "px ")
        .concat(
          c,
          `;
  }
  
  .`
        )
        .concat(no, " .")
        .concat(
          no,
          ` {
    right: 0 `
        )
        .concat(
          c,
          `;
  }
  
  .`
        )
        .concat(lo, " .")
        .concat(
          lo,
          ` {
    margin-right: 0 `
        )
        .concat(
          c,
          `;
  }
  
  body[`
        )
        .concat(
          ga,
          `] {
    `
        )
        .concat(l1, ": ")
        .concat(
          h,
          `px;
  }
`
        )
    );
  },
  fv = function () {
    var a = parseInt(document.body.getAttribute(ga) || "0", 10);
    return isFinite(a) ? a : 0;
  },
  w1 = function () {
    b.useEffect(function () {
      return (
        document.body.setAttribute(ga, (fv() + 1).toString()),
        function () {
          var a = fv() - 1;
          a <= 0
            ? document.body.removeAttribute(ga)
            : document.body.setAttribute(ga, a.toString());
        }
      );
    }, []);
  },
  E1 = function (a) {
    var o = a.noRelative,
      u = a.noImportant,
      c = a.gapMode,
      s = c === void 0 ? "margin" : c;
    w1();
    var d = b.useMemo(
      function () {
        return b1(s);
      },
      [s]
    );
    return b.createElement(S1, { styles: x1(d, !o, s, u ? "" : "!important") });
  },
  cs = !1;
if (typeof window < "u")
  try {
    var Fr = Object.defineProperty({}, "passive", {
      get: function () {
        return (cs = !0), !0;
      },
    });
    window.addEventListener("test", Fr, Fr),
      window.removeEventListener("test", Fr, Fr);
  } catch {
    cs = !1;
  }
var ma = cs ? { passive: !1 } : !1,
  A1 = function (a) {
    return a.tagName === "TEXTAREA";
  },
  yg = function (a, o) {
    if (!(a instanceof Element)) return !1;
    var u = window.getComputedStyle(a);
    return (
      u[o] !== "hidden" &&
      !(u.overflowY === u.overflowX && !A1(a) && u[o] === "visible")
    );
  },
  T1 = function (a) {
    return yg(a, "overflowY");
  },
  R1 = function (a) {
    return yg(a, "overflowX");
  },
  dv = function (a, o) {
    var u = o.ownerDocument,
      c = o;
    do {
      typeof ShadowRoot < "u" && c instanceof ShadowRoot && (c = c.host);
      var s = bg(a, c);
      if (s) {
        var d = Sg(a, c),
          m = d[1],
          h = d[2];
        if (m > h) return !0;
      }
      c = c.parentNode;
    } while (c && c !== u.body);
    return !1;
  },
  C1 = function (a) {
    var o = a.scrollTop,
      u = a.scrollHeight,
      c = a.clientHeight;
    return [o, u, c];
  },
  O1 = function (a) {
    var o = a.scrollLeft,
      u = a.scrollWidth,
      c = a.clientWidth;
    return [o, u, c];
  },
  bg = function (a, o) {
    return a === "v" ? T1(o) : R1(o);
  },
  Sg = function (a, o) {
    return a === "v" ? C1(o) : O1(o);
  },
  M1 = function (a, o) {
    return a === "h" && o === "rtl" ? -1 : 1;
  },
  N1 = function (a, o, u, c, s) {
    var d = M1(a, window.getComputedStyle(o).direction),
      m = d * c,
      h = u.target,
      g = o.contains(h),
      v = !1,
      y = m > 0,
      S = 0,
      T = 0;
    do {
      if (!h) break;
      var C = Sg(a, h),
        D = C[0],
        E = C[1],
        _ = C[2],
        L = E - _ - d * D;
      (D || L) && bg(a, h) && ((S += L), (T += D));
      var H = h.parentNode;
      h = H && H.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? H.host : H;
    } while ((!g && h !== document.body) || (g && (o.contains(h) || o === h)));
    return ((y && Math.abs(S) < 1) || (!y && Math.abs(T) < 1)) && (v = !0), v;
  },
  Ir = function (a) {
    return "changedTouches" in a
      ? [a.changedTouches[0].clientX, a.changedTouches[0].clientY]
      : [0, 0];
  },
  mv = function (a) {
    return [a.deltaX, a.deltaY];
  },
  hv = function (a) {
    return a && "current" in a ? a.current : a;
  },
  _1 = function (a, o) {
    return a[0] === o[0] && a[1] === o[1];
  },
  z1 = function (a) {
    return `
  .block-interactivity-`
      .concat(
        a,
        ` {pointer-events: none;}
  .allow-interactivity-`
      )
      .concat(
        a,
        ` {pointer-events: all;}
`
      );
  },
  D1 = 0,
  ha = [];
function j1(a) {
  var o = b.useRef([]),
    u = b.useRef([0, 0]),
    c = b.useRef(),
    s = b.useState(D1++)[0],
    d = b.useState(pg)[0],
    m = b.useRef(a);
  b.useEffect(
    function () {
      m.current = a;
    },
    [a]
  ),
    b.useEffect(
      function () {
        if (a.inert) {
          document.body.classList.add("block-interactivity-".concat(s));
          var E = t1([a.lockRef.current], (a.shards || []).map(hv), !0).filter(
            Boolean
          );
          return (
            E.forEach(function (_) {
              return _.classList.add("allow-interactivity-".concat(s));
            }),
            function () {
              document.body.classList.remove("block-interactivity-".concat(s)),
                E.forEach(function (_) {
                  return _.classList.remove("allow-interactivity-".concat(s));
                });
            }
          );
        }
      },
      [a.inert, a.lockRef.current, a.shards]
    );
  var h = b.useCallback(function (E, _) {
      if (
        ("touches" in E && E.touches.length === 2) ||
        (E.type === "wheel" && E.ctrlKey)
      )
        return !m.current.allowPinchZoom;
      var L = Ir(E),
        H = u.current,
        Y = "deltaX" in E ? E.deltaX : H[0] - L[0],
        K = "deltaY" in E ? E.deltaY : H[1] - L[1],
        q,
        $ = E.target,
        X = Math.abs(Y) > Math.abs(K) ? "h" : "v";
      if ("touches" in E && X === "h" && $.type === "range") return !1;
      var J = dv(X, $);
      if (!J) return !0;
      if ((J ? (q = X) : ((q = X === "v" ? "h" : "v"), (J = dv(X, $))), !J))
        return !1;
      if (
        (!c.current && "changedTouches" in E && (Y || K) && (c.current = q), !q)
      )
        return !0;
      var te = c.current || q;
      return N1(te, _, E, te === "h" ? Y : K);
    }, []),
    g = b.useCallback(function (E) {
      var _ = E;
      if (!(!ha.length || ha[ha.length - 1] !== d)) {
        var L = "deltaY" in _ ? mv(_) : Ir(_),
          H = o.current.filter(function (q) {
            return (
              q.name === _.type &&
              (q.target === _.target || _.target === q.shadowParent) &&
              _1(q.delta, L)
            );
          })[0];
        if (H && H.should) {
          _.cancelable && _.preventDefault();
          return;
        }
        if (!H) {
          var Y = (m.current.shards || [])
              .map(hv)
              .filter(Boolean)
              .filter(function (q) {
                return q.contains(_.target);
              }),
            K = Y.length > 0 ? h(_, Y[0]) : !m.current.noIsolation;
          K && _.cancelable && _.preventDefault();
        }
      }
    }, []),
    v = b.useCallback(function (E, _, L, H) {
      var Y = { name: E, delta: _, target: L, should: H, shadowParent: U1(L) };
      o.current.push(Y),
        setTimeout(function () {
          o.current = o.current.filter(function (K) {
            return K !== Y;
          });
        }, 1);
    }, []),
    y = b.useCallback(function (E) {
      (u.current = Ir(E)), (c.current = void 0);
    }, []),
    S = b.useCallback(function (E) {
      v(E.type, mv(E), E.target, h(E, a.lockRef.current));
    }, []),
    T = b.useCallback(function (E) {
      v(E.type, Ir(E), E.target, h(E, a.lockRef.current));
    }, []);
  b.useEffect(function () {
    return (
      ha.push(d),
      a.setCallbacks({
        onScrollCapture: S,
        onWheelCapture: S,
        onTouchMoveCapture: T,
      }),
      document.addEventListener("wheel", g, ma),
      document.addEventListener("touchmove", g, ma),
      document.addEventListener("touchstart", y, ma),
      function () {
        (ha = ha.filter(function (E) {
          return E !== d;
        })),
          document.removeEventListener("wheel", g, ma),
          document.removeEventListener("touchmove", g, ma),
          document.removeEventListener("touchstart", y, ma);
      }
    );
  }, []);
  var C = a.removeScrollBar,
    D = a.inert;
  return b.createElement(
    b.Fragment,
    null,
    D ? b.createElement(d, { styles: z1(s) }) : null,
    C
      ? b.createElement(E1, { noRelative: a.noRelative, gapMode: a.gapMode })
      : null
  );
}
function U1(a) {
  for (var o = null; a !== null; )
    a instanceof ShadowRoot && ((o = a.host), (a = a.host)), (a = a.parentNode);
  return o;
}
const H1 = s1(gg, j1);
var xg = b.forwardRef(function (a, o) {
  return b.createElement(po, It({}, a, { ref: o, sideCar: H1 }));
});
xg.classNames = po.classNames;
var L1 = [" ", "Enter", "ArrowUp", "ArrowDown"],
  B1 = [" ", "Enter"],
  Al = "Select",
  [yo, bo, Y1] = Ib(Al),
  [Ea, Xw] = fo(Al, [Y1, ng]),
  So = ng(),
  [V1, In] = Ea(Al),
  [q1, k1] = Ea(Al),
  wg = (a) => {
    const {
        __scopeSelect: o,
        children: u,
        open: c,
        defaultOpen: s,
        onOpenChange: d,
        value: m,
        defaultValue: h,
        onValueChange: g,
        dir: v,
        name: y,
        autoComplete: S,
        disabled: T,
        required: C,
        form: D,
      } = a,
      E = So(o),
      [_, L] = b.useState(null),
      [H, Y] = b.useState(null),
      [K, q] = b.useState(!1),
      $ = Lv(v),
      [X, J] = uv({ prop: c, defaultProp: s ?? !1, onChange: d, caller: Al }),
      [te, oe] = uv({ prop: m, defaultProp: h, onChange: g, caller: Al }),
      ge = b.useRef(null),
      me = _ ? D || !!_.closest("form") : !0,
      [P, ne] = b.useState(new Set()),
      re = Array.from(P)
        .map((O) => O.props.value)
        .join(";");
    return w.jsx(Vx, {
      ...E,
      children: w.jsxs(V1, {
        required: C,
        scope: o,
        trigger: _,
        onTriggerChange: L,
        valueNode: H,
        onValueNodeChange: Y,
        valueNodeHasChildren: K,
        onValueNodeHasChildrenChange: q,
        contentId: gs(),
        value: te,
        onValueChange: oe,
        open: X,
        onOpenChange: J,
        dir: $,
        triggerPointerDownPosRef: ge,
        disabled: T,
        children: [
          w.jsx(yo.Provider, {
            scope: o,
            children: w.jsx(q1, {
              scope: a.__scopeSelect,
              onNativeOptionAdd: b.useCallback((O) => {
                ne((k) => new Set(k).add(O));
              }, []),
              onNativeOptionRemove: b.useCallback((O) => {
                ne((k) => {
                  const B = new Set(k);
                  return B.delete(O), B;
                });
              }, []),
              children: u,
            }),
          }),
          me
            ? w.jsxs(
                Xg,
                {
                  "aria-hidden": !0,
                  required: C,
                  tabIndex: -1,
                  name: y,
                  autoComplete: S,
                  value: te,
                  onChange: (O) => oe(O.target.value),
                  disabled: T,
                  form: D,
                  children: [
                    te === void 0 ? w.jsx("option", { value: "" }) : null,
                    Array.from(P),
                  ],
                },
                re
              )
            : null,
        ],
      }),
    });
  };
wg.displayName = Al;
var Eg = "SelectTrigger",
  Ag = b.forwardRef((a, o) => {
    const { __scopeSelect: u, disabled: c = !1, ...s } = a,
      d = So(u),
      m = In(Eg, u),
      h = m.disabled || c,
      g = qe(o, m.onTriggerChange),
      v = bo(u),
      y = b.useRef("touch"),
      [S, T, C] = Zg((E) => {
        const _ = v().filter((Y) => !Y.disabled),
          L = _.find((Y) => Y.value === m.value),
          H = Kg(_, E, L);
        H !== void 0 && m.onValueChange(H.value);
      }),
      D = (E) => {
        h || (m.onOpenChange(!0), C()),
          E &&
            (m.triggerPointerDownPosRef.current = {
              x: Math.round(E.pageX),
              y: Math.round(E.pageY),
            });
      };
    return w.jsx(qx, {
      asChild: !0,
      ...d,
      children: w.jsx(Ye.button, {
        type: "button",
        role: "combobox",
        "aria-controls": m.contentId,
        "aria-expanded": m.open,
        "aria-required": m.required,
        "aria-autocomplete": "none",
        dir: m.dir,
        "data-state": m.open ? "open" : "closed",
        disabled: h,
        "data-disabled": h ? "" : void 0,
        "data-placeholder": Qg(m.value) ? "" : void 0,
        ...s,
        ref: g,
        onClick: Le(s.onClick, (E) => {
          E.currentTarget.focus(), y.current !== "mouse" && D(E);
        }),
        onPointerDown: Le(s.onPointerDown, (E) => {
          y.current = E.pointerType;
          const _ = E.target;
          _.hasPointerCapture(E.pointerId) &&
            _.releasePointerCapture(E.pointerId),
            E.button === 0 &&
              E.ctrlKey === !1 &&
              E.pointerType === "mouse" &&
              (D(E), E.preventDefault());
        }),
        onKeyDown: Le(s.onKeyDown, (E) => {
          const _ = S.current !== "";
          !(E.ctrlKey || E.altKey || E.metaKey) &&
            E.key.length === 1 &&
            T(E.key),
            !(_ && E.key === " ") &&
              L1.includes(E.key) &&
              (D(), E.preventDefault());
        }),
      }),
    });
  });
Ag.displayName = Eg;
var Tg = "SelectValue",
  Rg = b.forwardRef((a, o) => {
    const {
        __scopeSelect: u,
        className: c,
        style: s,
        children: d,
        placeholder: m = "",
        ...h
      } = a,
      g = In(Tg, u),
      { onValueNodeHasChildrenChange: v } = g,
      y = d !== void 0,
      S = qe(o, g.onValueNodeChange);
    return (
      rt(() => {
        v(y);
      }, [v, y]),
      w.jsx(Ye.span, {
        ...h,
        ref: S,
        style: { pointerEvents: "none" },
        children: Qg(g.value) ? w.jsx(w.Fragment, { children: m }) : d,
      })
    );
  });
Rg.displayName = Tg;
var G1 = "SelectIcon",
  Cg = b.forwardRef((a, o) => {
    const { __scopeSelect: u, children: c, ...s } = a;
    return w.jsx(Ye.span, {
      "aria-hidden": !0,
      ...s,
      ref: o,
      children: c || "▼",
    });
  });
Cg.displayName = G1;
var X1 = "SelectPortal",
  Og = (a) => w.jsx(fg, { asChild: !0, ...a });
Og.displayName = X1;
var Tl = "SelectContent",
  Mg = b.forwardRef((a, o) => {
    const u = In(Tl, a.__scopeSelect),
      [c, s] = b.useState();
    if (
      (rt(() => {
        s(new DocumentFragment());
      }, []),
      !u.open)
    ) {
      const d = c;
      return d
        ? Oi.createPortal(
            w.jsx(Ng, {
              scope: a.__scopeSelect,
              children: w.jsx(yo.Slot, {
                scope: a.__scopeSelect,
                children: w.jsx("div", { children: a.children }),
              }),
            }),
            d
          )
        : null;
    }
    return w.jsx(_g, { ...a, ref: o });
  });
Mg.displayName = Tl;
var Qt = 10,
  [Ng, el] = Ea(Tl),
  Q1 = "SelectContentImpl",
  Z1 = Ti("SelectContent.RemoveScroll"),
  _g = b.forwardRef((a, o) => {
    const {
        __scopeSelect: u,
        position: c = "item-aligned",
        onCloseAutoFocus: s,
        onEscapeKeyDown: d,
        onPointerDownOutside: m,
        side: h,
        sideOffset: g,
        align: v,
        alignOffset: y,
        arrowPadding: S,
        collisionBoundary: T,
        collisionPadding: C,
        sticky: D,
        hideWhenDetached: E,
        avoidCollisions: _,
        ...L
      } = a,
      H = In(Tl, u),
      [Y, K] = b.useState(null),
      [q, $] = b.useState(null),
      X = qe(o, (I) => K(I)),
      [J, te] = b.useState(null),
      [oe, ge] = b.useState(null),
      me = bo(u),
      [P, ne] = b.useState(!1),
      re = b.useRef(!1);
    b.useEffect(() => {
      if (Y) return e1(Y);
    }, [Y]),
      fS();
    const O = b.useCallback(
        (I) => {
          const [fe, ...Ne] = me().map((Ee) => Ee.ref.current),
            [Re] = Ne.slice(-1),
            we = document.activeElement;
          for (const Ee of I)
            if (
              Ee === we ||
              (Ee == null || Ee.scrollIntoView({ block: "nearest" }),
              Ee === fe && q && (q.scrollTop = 0),
              Ee === Re && q && (q.scrollTop = q.scrollHeight),
              Ee == null || Ee.focus(),
              document.activeElement !== we)
            )
              return;
        },
        [me, q]
      ),
      k = b.useCallback(() => O([J, Y]), [O, J, Y]);
    b.useEffect(() => {
      P && k();
    }, [P, k]);
    const { onOpenChange: B, triggerPointerDownPosRef: ue } = H;
    b.useEffect(() => {
      if (Y) {
        let I = { x: 0, y: 0 };
        const fe = (Re) => {
            var we, Ee;
            I = {
              x: Math.abs(
                Math.round(Re.pageX) -
                  (((we = ue.current) == null ? void 0 : we.x) ?? 0)
              ),
              y: Math.abs(
                Math.round(Re.pageY) -
                  (((Ee = ue.current) == null ? void 0 : Ee.y) ?? 0)
              ),
            };
          },
          Ne = (Re) => {
            I.x <= 10 && I.y <= 10
              ? Re.preventDefault()
              : Y.contains(Re.target) || B(!1),
              document.removeEventListener("pointermove", fe),
              (ue.current = null);
          };
        return (
          ue.current !== null &&
            (document.addEventListener("pointermove", fe),
            document.addEventListener("pointerup", Ne, {
              capture: !0,
              once: !0,
            })),
          () => {
            document.removeEventListener("pointermove", fe),
              document.removeEventListener("pointerup", Ne, { capture: !0 });
          }
        );
      }
    }, [Y, B, ue]),
      b.useEffect(() => {
        const I = () => B(!1);
        return (
          window.addEventListener("blur", I),
          window.addEventListener("resize", I),
          () => {
            window.removeEventListener("blur", I),
              window.removeEventListener("resize", I);
          }
        );
      }, [B]);
    const [A, Q] = Zg((I) => {
        const fe = me().filter((we) => !we.disabled),
          Ne = fe.find((we) => we.ref.current === document.activeElement),
          Re = Kg(fe, I, Ne);
        Re && setTimeout(() => Re.ref.current.focus());
      }),
      F = b.useCallback(
        (I, fe, Ne) => {
          const Re = !re.current && !Ne;
          ((H.value !== void 0 && H.value === fe) || Re) &&
            (te(I), Re && (re.current = !0));
        },
        [H.value]
      ),
      W = b.useCallback(() => (Y == null ? void 0 : Y.focus()), [Y]),
      ee = b.useCallback(
        (I, fe, Ne) => {
          const Re = !re.current && !Ne;
          ((H.value !== void 0 && H.value === fe) || Re) && ge(I);
        },
        [H.value]
      ),
      pe = c === "popper" ? us : zg,
      se =
        pe === us
          ? {
              side: h,
              sideOffset: g,
              align: v,
              alignOffset: y,
              arrowPadding: S,
              collisionBoundary: T,
              collisionPadding: C,
              sticky: D,
              hideWhenDetached: E,
              avoidCollisions: _,
            }
          : {};
    return w.jsx(Ng, {
      scope: u,
      content: Y,
      viewport: q,
      onViewportChange: $,
      itemRefCallback: F,
      selectedItem: J,
      onItemLeave: W,
      itemTextRefCallback: ee,
      focusSelectedItem: k,
      selectedItemText: oe,
      position: c,
      isPositioned: P,
      searchRef: A,
      children: w.jsx(xg, {
        as: Z1,
        allowPinchZoom: !0,
        children: w.jsx(qv, {
          asChild: !0,
          trapped: H.open,
          onMountAutoFocus: (I) => {
            I.preventDefault();
          },
          onUnmountAutoFocus: Le(s, (I) => {
            var fe;
            (fe = H.trigger) == null || fe.focus({ preventScroll: !0 }),
              I.preventDefault();
          }),
          children: w.jsx(Yv, {
            asChild: !0,
            disableOutsidePointerEvents: !0,
            onEscapeKeyDown: d,
            onPointerDownOutside: m,
            onFocusOutside: (I) => I.preventDefault(),
            onDismiss: () => H.onOpenChange(!1),
            children: w.jsx(pe, {
              role: "listbox",
              id: H.contentId,
              "data-state": H.open ? "open" : "closed",
              dir: H.dir,
              onContextMenu: (I) => I.preventDefault(),
              ...L,
              ...se,
              onPlaced: () => ne(!0),
              ref: X,
              style: {
                display: "flex",
                flexDirection: "column",
                outline: "none",
                ...L.style,
              },
              onKeyDown: Le(L.onKeyDown, (I) => {
                const fe = I.ctrlKey || I.altKey || I.metaKey;
                if (
                  (I.key === "Tab" && I.preventDefault(),
                  !fe && I.key.length === 1 && Q(I.key),
                  ["ArrowUp", "ArrowDown", "Home", "End"].includes(I.key))
                ) {
                  let Re = me()
                    .filter((we) => !we.disabled)
                    .map((we) => we.ref.current);
                  if (
                    (["ArrowUp", "End"].includes(I.key) &&
                      (Re = Re.slice().reverse()),
                    ["ArrowUp", "ArrowDown"].includes(I.key))
                  ) {
                    const we = I.target,
                      Ee = Re.indexOf(we);
                    Re = Re.slice(Ee + 1);
                  }
                  setTimeout(() => O(Re)), I.preventDefault();
                }
              }),
            }),
          }),
        }),
      }),
    });
  });
_g.displayName = Q1;
var K1 = "SelectItemAlignedPosition",
  zg = b.forwardRef((a, o) => {
    const { __scopeSelect: u, onPlaced: c, ...s } = a,
      d = In(Tl, u),
      m = el(Tl, u),
      [h, g] = b.useState(null),
      [v, y] = b.useState(null),
      S = qe(o, (X) => y(X)),
      T = bo(u),
      C = b.useRef(!1),
      D = b.useRef(!0),
      {
        viewport: E,
        selectedItem: _,
        selectedItemText: L,
        focusSelectedItem: H,
      } = m,
      Y = b.useCallback(() => {
        if (d.trigger && d.valueNode && h && v && E && _ && L) {
          const X = d.trigger.getBoundingClientRect(),
            J = v.getBoundingClientRect(),
            te = d.valueNode.getBoundingClientRect(),
            oe = L.getBoundingClientRect();
          if (d.dir !== "rtl") {
            const we = oe.left - J.left,
              Ee = te.left - we,
              nt = X.left - Ee,
              mt = X.width + nt,
              tl = Math.max(mt, J.width),
              nl = window.innerWidth - Qt,
              ot = ls(Ee, [Qt, Math.max(Qt, nl - tl)]);
            (h.style.minWidth = mt + "px"), (h.style.left = ot + "px");
          } else {
            const we = J.right - oe.right,
              Ee = window.innerWidth - te.right - we,
              nt = window.innerWidth - X.right - Ee,
              mt = X.width + nt,
              tl = Math.max(mt, J.width),
              nl = window.innerWidth - Qt,
              ot = ls(Ee, [Qt, Math.max(Qt, nl - tl)]);
            (h.style.minWidth = mt + "px"), (h.style.right = ot + "px");
          }
          const ge = T(),
            me = window.innerHeight - Qt * 2,
            P = E.scrollHeight,
            ne = window.getComputedStyle(v),
            re = parseInt(ne.borderTopWidth, 10),
            O = parseInt(ne.paddingTop, 10),
            k = parseInt(ne.borderBottomWidth, 10),
            B = parseInt(ne.paddingBottom, 10),
            ue = re + O + P + B + k,
            A = Math.min(_.offsetHeight * 5, ue),
            Q = window.getComputedStyle(E),
            F = parseInt(Q.paddingTop, 10),
            W = parseInt(Q.paddingBottom, 10),
            ee = X.top + X.height / 2 - Qt,
            pe = me - ee,
            se = _.offsetHeight / 2,
            I = _.offsetTop + se,
            fe = re + O + I,
            Ne = ue - fe;
          if (fe <= ee) {
            const we = ge.length > 0 && _ === ge[ge.length - 1].ref.current;
            h.style.bottom = "0px";
            const Ee = v.clientHeight - E.offsetTop - E.offsetHeight,
              nt = Math.max(pe, se + (we ? W : 0) + Ee + k),
              mt = fe + nt;
            h.style.height = mt + "px";
          } else {
            const we = ge.length > 0 && _ === ge[0].ref.current;
            h.style.top = "0px";
            const nt = Math.max(ee, re + E.offsetTop + (we ? F : 0) + se) + Ne;
            (h.style.height = nt + "px"), (E.scrollTop = fe - ee + E.offsetTop);
          }
          (h.style.margin = `${Qt}px 0`),
            (h.style.minHeight = A + "px"),
            (h.style.maxHeight = me + "px"),
            c == null || c(),
            requestAnimationFrame(() => (C.current = !0));
        }
      }, [T, d.trigger, d.valueNode, h, v, E, _, L, d.dir, c]);
    rt(() => Y(), [Y]);
    const [K, q] = b.useState();
    rt(() => {
      v && q(window.getComputedStyle(v).zIndex);
    }, [v]);
    const $ = b.useCallback(
      (X) => {
        X && D.current === !0 && (Y(), H == null || H(), (D.current = !1));
      },
      [Y, H]
    );
    return w.jsx(W1, {
      scope: u,
      contentWrapper: h,
      shouldExpandOnScrollRef: C,
      onScrollButtonChange: $,
      children: w.jsx("div", {
        ref: g,
        style: {
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          zIndex: K,
        },
        children: w.jsx(Ye.div, {
          ...s,
          ref: S,
          style: { boxSizing: "border-box", maxHeight: "100%", ...s.style },
        }),
      }),
    });
  });
zg.displayName = K1;
var J1 = "SelectPopperPosition",
  us = b.forwardRef((a, o) => {
    const {
        __scopeSelect: u,
        align: c = "start",
        collisionPadding: s = Qt,
        ...d
      } = a,
      m = So(u);
    return w.jsx(kx, {
      ...m,
      ...d,
      ref: o,
      align: c,
      collisionPadding: s,
      style: {
        boxSizing: "border-box",
        ...d.style,
        "--radix-select-content-transform-origin":
          "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width":
          "var(--radix-popper-available-width)",
        "--radix-select-content-available-height":
          "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)",
      },
    });
  });
us.displayName = J1;
var [W1, Ts] = Ea(Tl, {}),
  ss = "SelectViewport",
  Dg = b.forwardRef((a, o) => {
    const { __scopeSelect: u, nonce: c, ...s } = a,
      d = el(ss, u),
      m = Ts(ss, u),
      h = qe(o, d.onViewportChange),
      g = b.useRef(0);
    return w.jsxs(w.Fragment, {
      children: [
        w.jsx("style", {
          dangerouslySetInnerHTML: {
            __html:
              "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}",
          },
          nonce: c,
        }),
        w.jsx(yo.Slot, {
          scope: u,
          children: w.jsx(Ye.div, {
            "data-radix-select-viewport": "",
            role: "presentation",
            ...s,
            ref: h,
            style: {
              position: "relative",
              flex: 1,
              overflow: "hidden auto",
              ...s.style,
            },
            onScroll: Le(s.onScroll, (v) => {
              const y = v.currentTarget,
                { contentWrapper: S, shouldExpandOnScrollRef: T } = m;
              if (T != null && T.current && S) {
                const C = Math.abs(g.current - y.scrollTop);
                if (C > 0) {
                  const D = window.innerHeight - Qt * 2,
                    E = parseFloat(S.style.minHeight),
                    _ = parseFloat(S.style.height),
                    L = Math.max(E, _);
                  if (L < D) {
                    const H = L + C,
                      Y = Math.min(D, H),
                      K = H - Y;
                    (S.style.height = Y + "px"),
                      S.style.bottom === "0px" &&
                        ((y.scrollTop = K > 0 ? K : 0),
                        (S.style.justifyContent = "flex-end"));
                  }
                }
              }
              g.current = y.scrollTop;
            }),
          }),
        }),
      ],
    });
  });
Dg.displayName = ss;
var jg = "SelectGroup",
  [P1, $1] = Ea(jg),
  F1 = b.forwardRef((a, o) => {
    const { __scopeSelect: u, ...c } = a,
      s = gs();
    return w.jsx(P1, {
      scope: u,
      id: s,
      children: w.jsx(Ye.div, {
        role: "group",
        "aria-labelledby": s,
        ...c,
        ref: o,
      }),
    });
  });
F1.displayName = jg;
var Ug = "SelectLabel",
  I1 = b.forwardRef((a, o) => {
    const { __scopeSelect: u, ...c } = a,
      s = $1(Ug, u);
    return w.jsx(Ye.div, { id: s.id, ...c, ref: o });
  });
I1.displayName = Ug;
var co = "SelectItem",
  [ew, Hg] = Ea(co),
  Lg = b.forwardRef((a, o) => {
    const {
        __scopeSelect: u,
        value: c,
        disabled: s = !1,
        textValue: d,
        ...m
      } = a,
      h = In(co, u),
      g = el(co, u),
      v = h.value === c,
      [y, S] = b.useState(d ?? ""),
      [T, C] = b.useState(!1),
      D = qe(o, (H) => {
        var Y;
        return (Y = g.itemRefCallback) == null ? void 0 : Y.call(g, H, c, s);
      }),
      E = gs(),
      _ = b.useRef("touch"),
      L = () => {
        s || (h.onValueChange(c), h.onOpenChange(!1));
      };
    if (c === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return w.jsx(ew, {
      scope: u,
      value: c,
      disabled: s,
      textId: E,
      isSelected: v,
      onItemTextChange: b.useCallback((H) => {
        S((Y) => Y || ((H == null ? void 0 : H.textContent) ?? "").trim());
      }, []),
      children: w.jsx(yo.ItemSlot, {
        scope: u,
        value: c,
        disabled: s,
        textValue: y,
        children: w.jsx(Ye.div, {
          role: "option",
          "aria-labelledby": E,
          "data-highlighted": T ? "" : void 0,
          "aria-selected": v && T,
          "data-state": v ? "checked" : "unchecked",
          "aria-disabled": s || void 0,
          "data-disabled": s ? "" : void 0,
          tabIndex: s ? void 0 : -1,
          ...m,
          ref: D,
          onFocus: Le(m.onFocus, () => C(!0)),
          onBlur: Le(m.onBlur, () => C(!1)),
          onClick: Le(m.onClick, () => {
            _.current !== "mouse" && L();
          }),
          onPointerUp: Le(m.onPointerUp, () => {
            _.current === "mouse" && L();
          }),
          onPointerDown: Le(m.onPointerDown, (H) => {
            _.current = H.pointerType;
          }),
          onPointerMove: Le(m.onPointerMove, (H) => {
            var Y;
            (_.current = H.pointerType),
              s
                ? (Y = g.onItemLeave) == null || Y.call(g)
                : _.current === "mouse" &&
                  H.currentTarget.focus({ preventScroll: !0 });
          }),
          onPointerLeave: Le(m.onPointerLeave, (H) => {
            var Y;
            H.currentTarget === document.activeElement &&
              ((Y = g.onItemLeave) == null || Y.call(g));
          }),
          onKeyDown: Le(m.onKeyDown, (H) => {
            var K;
            (((K = g.searchRef) == null ? void 0 : K.current) !== "" &&
              H.key === " ") ||
              (B1.includes(H.key) && L(), H.key === " " && H.preventDefault());
          }),
        }),
      }),
    });
  });
Lg.displayName = co;
var Ai = "SelectItemText",
  Bg = b.forwardRef((a, o) => {
    const { __scopeSelect: u, className: c, style: s, ...d } = a,
      m = In(Ai, u),
      h = el(Ai, u),
      g = Hg(Ai, u),
      v = k1(Ai, u),
      [y, S] = b.useState(null),
      T = qe(
        o,
        (L) => S(L),
        g.onItemTextChange,
        (L) => {
          var H;
          return (H = h.itemTextRefCallback) == null
            ? void 0
            : H.call(h, L, g.value, g.disabled);
        }
      ),
      C = y == null ? void 0 : y.textContent,
      D = b.useMemo(
        () =>
          w.jsx(
            "option",
            { value: g.value, disabled: g.disabled, children: C },
            g.value
          ),
        [g.disabled, g.value, C]
      ),
      { onNativeOptionAdd: E, onNativeOptionRemove: _ } = v;
    return (
      rt(() => (E(D), () => _(D)), [E, _, D]),
      w.jsxs(w.Fragment, {
        children: [
          w.jsx(Ye.span, { id: g.textId, ...d, ref: T }),
          g.isSelected && m.valueNode && !m.valueNodeHasChildren
            ? Oi.createPortal(d.children, m.valueNode)
            : null,
        ],
      })
    );
  });
Bg.displayName = Ai;
var Yg = "SelectItemIndicator",
  Vg = b.forwardRef((a, o) => {
    const { __scopeSelect: u, ...c } = a;
    return Hg(Yg, u).isSelected
      ? w.jsx(Ye.span, { "aria-hidden": !0, ...c, ref: o })
      : null;
  });
Vg.displayName = Yg;
var fs = "SelectScrollUpButton",
  qg = b.forwardRef((a, o) => {
    const u = el(fs, a.__scopeSelect),
      c = Ts(fs, a.__scopeSelect),
      [s, d] = b.useState(!1),
      m = qe(o, c.onScrollButtonChange);
    return (
      rt(() => {
        if (u.viewport && u.isPositioned) {
          let h = function () {
            const v = g.scrollTop > 0;
            d(v);
          };
          const g = u.viewport;
          return (
            h(),
            g.addEventListener("scroll", h),
            () => g.removeEventListener("scroll", h)
          );
        }
      }, [u.viewport, u.isPositioned]),
      s
        ? w.jsx(Gg, {
            ...a,
            ref: m,
            onAutoScroll: () => {
              const { viewport: h, selectedItem: g } = u;
              h && g && (h.scrollTop = h.scrollTop - g.offsetHeight);
            },
          })
        : null
    );
  });
qg.displayName = fs;
var ds = "SelectScrollDownButton",
  kg = b.forwardRef((a, o) => {
    const u = el(ds, a.__scopeSelect),
      c = Ts(ds, a.__scopeSelect),
      [s, d] = b.useState(!1),
      m = qe(o, c.onScrollButtonChange);
    return (
      rt(() => {
        if (u.viewport && u.isPositioned) {
          let h = function () {
            const v = g.scrollHeight - g.clientHeight,
              y = Math.ceil(g.scrollTop) < v;
            d(y);
          };
          const g = u.viewport;
          return (
            h(),
            g.addEventListener("scroll", h),
            () => g.removeEventListener("scroll", h)
          );
        }
      }, [u.viewport, u.isPositioned]),
      s
        ? w.jsx(Gg, {
            ...a,
            ref: m,
            onAutoScroll: () => {
              const { viewport: h, selectedItem: g } = u;
              h && g && (h.scrollTop = h.scrollTop + g.offsetHeight);
            },
          })
        : null
    );
  });
kg.displayName = ds;
var Gg = b.forwardRef((a, o) => {
    const { __scopeSelect: u, onAutoScroll: c, ...s } = a,
      d = el("SelectScrollButton", u),
      m = b.useRef(null),
      h = bo(u),
      g = b.useCallback(() => {
        m.current !== null &&
          (window.clearInterval(m.current), (m.current = null));
      }, []);
    return (
      b.useEffect(() => () => g(), [g]),
      rt(() => {
        var y;
        const v = h().find((S) => S.ref.current === document.activeElement);
        (y = v == null ? void 0 : v.ref.current) == null ||
          y.scrollIntoView({ block: "nearest" });
      }, [h]),
      w.jsx(Ye.div, {
        "aria-hidden": !0,
        ...s,
        ref: o,
        style: { flexShrink: 0, ...s.style },
        onPointerDown: Le(s.onPointerDown, () => {
          m.current === null && (m.current = window.setInterval(c, 50));
        }),
        onPointerMove: Le(s.onPointerMove, () => {
          var v;
          (v = d.onItemLeave) == null || v.call(d),
            m.current === null && (m.current = window.setInterval(c, 50));
        }),
        onPointerLeave: Le(s.onPointerLeave, () => {
          g();
        }),
      })
    );
  }),
  tw = "SelectSeparator",
  nw = b.forwardRef((a, o) => {
    const { __scopeSelect: u, ...c } = a;
    return w.jsx(Ye.div, { "aria-hidden": !0, ...c, ref: o });
  });
nw.displayName = tw;
var ms = "SelectArrow",
  lw = b.forwardRef((a, o) => {
    const { __scopeSelect: u, ...c } = a,
      s = So(u),
      d = In(ms, u),
      m = el(ms, u);
    return d.open && m.position === "popper"
      ? w.jsx(Gx, { ...s, ...c, ref: o })
      : null;
  });
lw.displayName = ms;
var aw = "SelectBubbleInput",
  Xg = b.forwardRef(({ __scopeSelect: a, value: o, ...u }, c) => {
    const s = b.useRef(null),
      d = qe(c, s),
      m = Jx(o);
    return (
      b.useEffect(() => {
        const h = s.current;
        if (!h) return;
        const g = window.HTMLSelectElement.prototype,
          y = Object.getOwnPropertyDescriptor(g, "value").set;
        if (m !== o && y) {
          const S = new Event("change", { bubbles: !0 });
          y.call(h, o), h.dispatchEvent(S);
        }
      }, [m, o]),
      w.jsx(Ye.select, {
        ...u,
        style: { ...dg, ...u.style },
        ref: d,
        defaultValue: o,
      })
    );
  });
Xg.displayName = aw;
function Qg(a) {
  return a === "" || a === void 0;
}
function Zg(a) {
  const o = bt(a),
    u = b.useRef(""),
    c = b.useRef(0),
    s = b.useCallback(
      (m) => {
        const h = u.current + m;
        o(h),
          (function g(v) {
            (u.current = v),
              window.clearTimeout(c.current),
              v !== "" && (c.current = window.setTimeout(() => g(""), 1e3));
          })(h);
      },
      [o]
    ),
    d = b.useCallback(() => {
      (u.current = ""), window.clearTimeout(c.current);
    }, []);
  return b.useEffect(() => () => window.clearTimeout(c.current), []), [u, s, d];
}
function Kg(a, o, u) {
  const s = o.length > 1 && Array.from(o).every((v) => v === o[0]) ? o[0] : o,
    d = u ? a.indexOf(u) : -1;
  let m = iw(a, Math.max(d, 0));
  s.length === 1 && (m = m.filter((v) => v !== u));
  const g = m.find((v) =>
    v.textValue.toLowerCase().startsWith(s.toLowerCase())
  );
  return g !== u ? g : void 0;
}
function iw(a, o) {
  return a.map((u, c) => a[(o + c) % a.length]);
}
var rw = wg,
  ow = Ag,
  cw = Rg,
  uw = Cg,
  sw = Og,
  fw = Mg,
  dw = Dg,
  mw = Lg,
  hw = Bg,
  vw = Vg,
  gw = qg,
  pw = kg;
function yw({ ...a }) {
  return w.jsx(rw, { "data-slot": "select", ...a });
}
function bw({ ...a }) {
  return w.jsx(cw, { "data-slot": "select-value", ...a });
}
function Sw({ className: a, size: o = "default", children: u, ...c }) {
  return w.jsxs(ow, {
    "data-slot": "select-trigger",
    "data-size": o,
    className: ft(
      "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      a
    ),
    ...c,
    children: [
      u,
      w.jsx(uw, {
        asChild: !0,
        children: w.jsx(xv, { className: "size-4 opacity-50" }),
      }),
    ],
  });
}
function xw({ className: a, children: o, position: u = "popper", ...c }) {
  return w.jsx(sw, {
    children: w.jsxs(fw, {
      "data-slot": "select-content",
      className: ft(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        u === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        a
      ),
      position: u,
      ...c,
      children: [
        w.jsx(ww, {}),
        w.jsx(dw, {
          className: ft(
            "p-1",
            u === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          ),
          children: o,
        }),
        w.jsx(Ew, {}),
      ],
    }),
  });
}
function vv({ className: a, children: o, ...u }) {
  return w.jsxs(mw, {
    "data-slot": "select-item",
    className: ft(
      "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
      a
    ),
    ...u,
    children: [
      w.jsx("span", {
        className: "absolute right-2 flex size-3.5 items-center justify-center",
        children: w.jsx(vw, { children: w.jsx(k0, { className: "size-4" }) }),
      }),
      w.jsx(hw, { children: o }),
    ],
  });
}
function ww({ className: a, ...o }) {
  return w.jsx(gw, {
    "data-slot": "select-scroll-up-button",
    className: ft("flex cursor-default items-center justify-center py-1", a),
    ...o,
    children: w.jsx(Q0, { className: "size-4" }),
  });
}
function Ew({ className: a, ...o }) {
  return w.jsx(pw, {
    "data-slot": "select-scroll-down-button",
    className: ft("flex cursor-default items-center justify-center py-1", a),
    ...o,
    children: w.jsx(xv, { className: "size-4" }),
  });
}
function Aw(a, o) {
  return b.useReducer((u, c) => o[u][c] ?? u, a);
}
var Ni = (a) => {
  const { present: o, children: u } = a,
    c = Tw(o),
    s =
      typeof u == "function" ? u({ present: c.isPresent }) : b.Children.only(u),
    d = qe(c.ref, Rw(s));
  return typeof u == "function" || c.isPresent
    ? b.cloneElement(s, { ref: d })
    : null;
};
Ni.displayName = "Presence";
function Tw(a) {
  const [o, u] = b.useState(),
    c = b.useRef(null),
    s = b.useRef(a),
    d = b.useRef("none"),
    m = a ? "mounted" : "unmounted",
    [h, g] = Aw(m, {
      mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
      unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
      unmounted: { MOUNT: "mounted" },
    });
  return (
    b.useEffect(() => {
      const v = eo(c.current);
      d.current = h === "mounted" ? v : "none";
    }, [h]),
    rt(() => {
      const v = c.current,
        y = s.current;
      if (y !== a) {
        const T = d.current,
          C = eo(v);
        a
          ? g("MOUNT")
          : C === "none" || (v == null ? void 0 : v.display) === "none"
          ? g("UNMOUNT")
          : g(y && T !== C ? "ANIMATION_OUT" : "UNMOUNT"),
          (s.current = a);
      }
    }, [a, g]),
    rt(() => {
      if (o) {
        let v;
        const y = o.ownerDocument.defaultView ?? window,
          S = (C) => {
            const E = eo(c.current).includes(CSS.escape(C.animationName));
            if (C.target === o && E && (g("ANIMATION_END"), !s.current)) {
              const _ = o.style.animationFillMode;
              (o.style.animationFillMode = "forwards"),
                (v = y.setTimeout(() => {
                  o.style.animationFillMode === "forwards" &&
                    (o.style.animationFillMode = _);
                }));
            }
          },
          T = (C) => {
            C.target === o && (d.current = eo(c.current));
          };
        return (
          o.addEventListener("animationstart", T),
          o.addEventListener("animationcancel", S),
          o.addEventListener("animationend", S),
          () => {
            y.clearTimeout(v),
              o.removeEventListener("animationstart", T),
              o.removeEventListener("animationcancel", S),
              o.removeEventListener("animationend", S);
          }
        );
      } else g("ANIMATION_END");
    }, [o, g]),
    {
      isPresent: ["mounted", "unmountSuspended"].includes(h),
      ref: b.useCallback((v) => {
        (c.current = v ? getComputedStyle(v) : null), u(v);
      }, []),
    }
  );
}
function eo(a) {
  return (a == null ? void 0 : a.animationName) || "none";
}
function Rw(a) {
  var c, s;
  let o =
      (c = Object.getOwnPropertyDescriptor(a.props, "ref")) == null
        ? void 0
        : c.get,
    u = o && "isReactWarning" in o && o.isReactWarning;
  return u
    ? a.ref
    : ((o =
        (s = Object.getOwnPropertyDescriptor(a, "ref")) == null
          ? void 0
          : s.get),
      (u = o && "isReactWarning" in o && o.isReactWarning),
      u ? a.props.ref : a.props.ref || a.ref);
}
function Cw(a, o) {
  return b.useReducer((u, c) => o[u][c] ?? u, a);
}
var Rs = "ScrollArea",
  [Jg, Qw] = fo(Rs),
  [Ow, qt] = Jg(Rs),
  Wg = b.forwardRef((a, o) => {
    const {
        __scopeScrollArea: u,
        type: c = "hover",
        dir: s,
        scrollHideDelay: d = 600,
        ...m
      } = a,
      [h, g] = b.useState(null),
      [v, y] = b.useState(null),
      [S, T] = b.useState(null),
      [C, D] = b.useState(null),
      [E, _] = b.useState(null),
      [L, H] = b.useState(0),
      [Y, K] = b.useState(0),
      [q, $] = b.useState(!1),
      [X, J] = b.useState(!1),
      te = qe(o, (ge) => g(ge)),
      oe = Lv(s);
    return w.jsx(Ow, {
      scope: u,
      type: c,
      dir: oe,
      scrollHideDelay: d,
      scrollArea: h,
      viewport: v,
      onViewportChange: y,
      content: S,
      onContentChange: T,
      scrollbarX: C,
      onScrollbarXChange: D,
      scrollbarXEnabled: q,
      onScrollbarXEnabledChange: $,
      scrollbarY: E,
      onScrollbarYChange: _,
      scrollbarYEnabled: X,
      onScrollbarYEnabledChange: J,
      onCornerWidthChange: H,
      onCornerHeightChange: K,
      children: w.jsx(Ye.div, {
        dir: oe,
        ...m,
        ref: te,
        style: {
          position: "relative",
          "--radix-scroll-area-corner-width": L + "px",
          "--radix-scroll-area-corner-height": Y + "px",
          ...a.style,
        },
      }),
    });
  });
Wg.displayName = Rs;
var Pg = "ScrollAreaViewport",
  $g = b.forwardRef((a, o) => {
    const { __scopeScrollArea: u, children: c, nonce: s, ...d } = a,
      m = qt(Pg, u),
      h = b.useRef(null),
      g = qe(o, h, m.onViewportChange);
    return w.jsxs(w.Fragment, {
      children: [
        w.jsx("style", {
          dangerouslySetInnerHTML: {
            __html:
              "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}",
          },
          nonce: s,
        }),
        w.jsx(Ye.div, {
          "data-radix-scroll-area-viewport": "",
          ...d,
          ref: g,
          style: {
            overflowX: m.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: m.scrollbarYEnabled ? "scroll" : "hidden",
            ...a.style,
          },
          children: w.jsx("div", {
            ref: m.onContentChange,
            style: { minWidth: "100%", display: "table" },
            children: c,
          }),
        }),
      ],
    });
  });
$g.displayName = Pg;
var an = "ScrollAreaScrollbar",
  Fg = b.forwardRef((a, o) => {
    const { forceMount: u, ...c } = a,
      s = qt(an, a.__scopeScrollArea),
      { onScrollbarXEnabledChange: d, onScrollbarYEnabledChange: m } = s,
      h = a.orientation === "horizontal";
    return (
      b.useEffect(
        () => (
          h ? d(!0) : m(!0),
          () => {
            h ? d(!1) : m(!1);
          }
        ),
        [h, d, m]
      ),
      s.type === "hover"
        ? w.jsx(Mw, { ...c, ref: o, forceMount: u })
        : s.type === "scroll"
        ? w.jsx(Nw, { ...c, ref: o, forceMount: u })
        : s.type === "auto"
        ? w.jsx(Ig, { ...c, ref: o, forceMount: u })
        : s.type === "always"
        ? w.jsx(Cs, { ...c, ref: o })
        : null
    );
  });
Fg.displayName = an;
var Mw = b.forwardRef((a, o) => {
    const { forceMount: u, ...c } = a,
      s = qt(an, a.__scopeScrollArea),
      [d, m] = b.useState(!1);
    return (
      b.useEffect(() => {
        const h = s.scrollArea;
        let g = 0;
        if (h) {
          const v = () => {
              window.clearTimeout(g), m(!0);
            },
            y = () => {
              g = window.setTimeout(() => m(!1), s.scrollHideDelay);
            };
          return (
            h.addEventListener("pointerenter", v),
            h.addEventListener("pointerleave", y),
            () => {
              window.clearTimeout(g),
                h.removeEventListener("pointerenter", v),
                h.removeEventListener("pointerleave", y);
            }
          );
        }
      }, [s.scrollArea, s.scrollHideDelay]),
      w.jsx(Ni, {
        present: u || d,
        children: w.jsx(Ig, {
          "data-state": d ? "visible" : "hidden",
          ...c,
          ref: o,
        }),
      })
    );
  }),
  Nw = b.forwardRef((a, o) => {
    const { forceMount: u, ...c } = a,
      s = qt(an, a.__scopeScrollArea),
      d = a.orientation === "horizontal",
      m = wo(() => g("SCROLL_END"), 100),
      [h, g] = Cw("hidden", {
        hidden: { SCROLL: "scrolling" },
        scrolling: { SCROLL_END: "idle", POINTER_ENTER: "interacting" },
        interacting: { SCROLL: "interacting", POINTER_LEAVE: "idle" },
        idle: {
          HIDE: "hidden",
          SCROLL: "scrolling",
          POINTER_ENTER: "interacting",
        },
      });
    return (
      b.useEffect(() => {
        if (h === "idle") {
          const v = window.setTimeout(() => g("HIDE"), s.scrollHideDelay);
          return () => window.clearTimeout(v);
        }
      }, [h, s.scrollHideDelay, g]),
      b.useEffect(() => {
        const v = s.viewport,
          y = d ? "scrollLeft" : "scrollTop";
        if (v) {
          let S = v[y];
          const T = () => {
            const C = v[y];
            S !== C && (g("SCROLL"), m()), (S = C);
          };
          return (
            v.addEventListener("scroll", T),
            () => v.removeEventListener("scroll", T)
          );
        }
      }, [s.viewport, d, g, m]),
      w.jsx(Ni, {
        present: u || h !== "hidden",
        children: w.jsx(Cs, {
          "data-state": h === "hidden" ? "hidden" : "visible",
          ...c,
          ref: o,
          onPointerEnter: Le(a.onPointerEnter, () => g("POINTER_ENTER")),
          onPointerLeave: Le(a.onPointerLeave, () => g("POINTER_LEAVE")),
        }),
      })
    );
  }),
  Ig = b.forwardRef((a, o) => {
    const u = qt(an, a.__scopeScrollArea),
      { forceMount: c, ...s } = a,
      [d, m] = b.useState(!1),
      h = a.orientation === "horizontal",
      g = wo(() => {
        if (u.viewport) {
          const v = u.viewport.offsetWidth < u.viewport.scrollWidth,
            y = u.viewport.offsetHeight < u.viewport.scrollHeight;
          m(h ? v : y);
        }
      }, 10);
    return (
      ya(u.viewport, g),
      ya(u.content, g),
      w.jsx(Ni, {
        present: c || d,
        children: w.jsx(Cs, {
          "data-state": d ? "visible" : "hidden",
          ...s,
          ref: o,
        }),
      })
    );
  }),
  Cs = b.forwardRef((a, o) => {
    const { orientation: u = "vertical", ...c } = a,
      s = qt(an, a.__scopeScrollArea),
      d = b.useRef(null),
      m = b.useRef(0),
      [h, g] = b.useState({
        content: 0,
        viewport: 0,
        scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 },
      }),
      v = ap(h.viewport, h.content),
      y = {
        ...c,
        sizes: h,
        onSizesChange: g,
        hasThumb: v > 0 && v < 1,
        onThumbChange: (T) => (d.current = T),
        onThumbPointerUp: () => (m.current = 0),
        onThumbPointerDown: (T) => (m.current = T),
      };
    function S(T, C) {
      return Hw(T, m.current, h, C);
    }
    return u === "horizontal"
      ? w.jsx(_w, {
          ...y,
          ref: o,
          onThumbPositionChange: () => {
            if (s.viewport && d.current) {
              const T = s.viewport.scrollLeft,
                C = gv(T, h, s.dir);
              d.current.style.transform = `translate3d(${C}px, 0, 0)`;
            }
          },
          onWheelScroll: (T) => {
            s.viewport && (s.viewport.scrollLeft = T);
          },
          onDragScroll: (T) => {
            s.viewport && (s.viewport.scrollLeft = S(T, s.dir));
          },
        })
      : u === "vertical"
      ? w.jsx(zw, {
          ...y,
          ref: o,
          onThumbPositionChange: () => {
            if (s.viewport && d.current) {
              const T = s.viewport.scrollTop,
                C = gv(T, h);
              d.current.style.transform = `translate3d(0, ${C}px, 0)`;
            }
          },
          onWheelScroll: (T) => {
            s.viewport && (s.viewport.scrollTop = T);
          },
          onDragScroll: (T) => {
            s.viewport && (s.viewport.scrollTop = S(T));
          },
        })
      : null;
  }),
  _w = b.forwardRef((a, o) => {
    const { sizes: u, onSizesChange: c, ...s } = a,
      d = qt(an, a.__scopeScrollArea),
      [m, h] = b.useState(),
      g = b.useRef(null),
      v = qe(o, g, d.onScrollbarXChange);
    return (
      b.useEffect(() => {
        g.current && h(getComputedStyle(g.current));
      }, [g]),
      w.jsx(tp, {
        "data-orientation": "horizontal",
        ...s,
        ref: v,
        sizes: u,
        style: {
          bottom: 0,
          left: d.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
          right: d.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
          "--radix-scroll-area-thumb-width": xo(u) + "px",
          ...a.style,
        },
        onThumbPointerDown: (y) => a.onThumbPointerDown(y.x),
        onDragScroll: (y) => a.onDragScroll(y.x),
        onWheelScroll: (y, S) => {
          if (d.viewport) {
            const T = d.viewport.scrollLeft + y.deltaX;
            a.onWheelScroll(T), rp(T, S) && y.preventDefault();
          }
        },
        onResize: () => {
          g.current &&
            d.viewport &&
            m &&
            c({
              content: d.viewport.scrollWidth,
              viewport: d.viewport.offsetWidth,
              scrollbar: {
                size: g.current.clientWidth,
                paddingStart: so(m.paddingLeft),
                paddingEnd: so(m.paddingRight),
              },
            });
        },
      })
    );
  }),
  zw = b.forwardRef((a, o) => {
    const { sizes: u, onSizesChange: c, ...s } = a,
      d = qt(an, a.__scopeScrollArea),
      [m, h] = b.useState(),
      g = b.useRef(null),
      v = qe(o, g, d.onScrollbarYChange);
    return (
      b.useEffect(() => {
        g.current && h(getComputedStyle(g.current));
      }, [g]),
      w.jsx(tp, {
        "data-orientation": "vertical",
        ...s,
        ref: v,
        sizes: u,
        style: {
          top: 0,
          right: d.dir === "ltr" ? 0 : void 0,
          left: d.dir === "rtl" ? 0 : void 0,
          bottom: "var(--radix-scroll-area-corner-height)",
          "--radix-scroll-area-thumb-height": xo(u) + "px",
          ...a.style,
        },
        onThumbPointerDown: (y) => a.onThumbPointerDown(y.y),
        onDragScroll: (y) => a.onDragScroll(y.y),
        onWheelScroll: (y, S) => {
          if (d.viewport) {
            const T = d.viewport.scrollTop + y.deltaY;
            a.onWheelScroll(T), rp(T, S) && y.preventDefault();
          }
        },
        onResize: () => {
          g.current &&
            d.viewport &&
            m &&
            c({
              content: d.viewport.scrollHeight,
              viewport: d.viewport.offsetHeight,
              scrollbar: {
                size: g.current.clientHeight,
                paddingStart: so(m.paddingTop),
                paddingEnd: so(m.paddingBottom),
              },
            });
        },
      })
    );
  }),
  [Dw, ep] = Jg(an),
  tp = b.forwardRef((a, o) => {
    const {
        __scopeScrollArea: u,
        sizes: c,
        hasThumb: s,
        onThumbChange: d,
        onThumbPointerUp: m,
        onThumbPointerDown: h,
        onThumbPositionChange: g,
        onDragScroll: v,
        onWheelScroll: y,
        onResize: S,
        ...T
      } = a,
      C = qt(an, u),
      [D, E] = b.useState(null),
      _ = qe(o, (te) => E(te)),
      L = b.useRef(null),
      H = b.useRef(""),
      Y = C.viewport,
      K = c.content - c.viewport,
      q = bt(y),
      $ = bt(g),
      X = wo(S, 10);
    function J(te) {
      if (L.current) {
        const oe = te.clientX - L.current.left,
          ge = te.clientY - L.current.top;
        v({ x: oe, y: ge });
      }
    }
    return (
      b.useEffect(() => {
        const te = (oe) => {
          const ge = oe.target;
          (D == null ? void 0 : D.contains(ge)) && q(oe, K);
        };
        return (
          document.addEventListener("wheel", te, { passive: !1 }),
          () => document.removeEventListener("wheel", te, { passive: !1 })
        );
      }, [Y, D, K, q]),
      b.useEffect($, [c, $]),
      ya(D, X),
      ya(C.content, X),
      w.jsx(Dw, {
        scope: u,
        scrollbar: D,
        hasThumb: s,
        onThumbChange: bt(d),
        onThumbPointerUp: bt(m),
        onThumbPositionChange: $,
        onThumbPointerDown: bt(h),
        children: w.jsx(Ye.div, {
          ...T,
          ref: _,
          style: { position: "absolute", ...T.style },
          onPointerDown: Le(a.onPointerDown, (te) => {
            te.button === 0 &&
              (te.target.setPointerCapture(te.pointerId),
              (L.current = D.getBoundingClientRect()),
              (H.current = document.body.style.webkitUserSelect),
              (document.body.style.webkitUserSelect = "none"),
              C.viewport && (C.viewport.style.scrollBehavior = "auto"),
              J(te));
          }),
          onPointerMove: Le(a.onPointerMove, J),
          onPointerUp: Le(a.onPointerUp, (te) => {
            const oe = te.target;
            oe.hasPointerCapture(te.pointerId) &&
              oe.releasePointerCapture(te.pointerId),
              (document.body.style.webkitUserSelect = H.current),
              C.viewport && (C.viewport.style.scrollBehavior = ""),
              (L.current = null);
          }),
        }),
      })
    );
  }),
  uo = "ScrollAreaThumb",
  np = b.forwardRef((a, o) => {
    const { forceMount: u, ...c } = a,
      s = ep(uo, a.__scopeScrollArea);
    return w.jsx(Ni, {
      present: u || s.hasThumb,
      children: w.jsx(jw, { ref: o, ...c }),
    });
  }),
  jw = b.forwardRef((a, o) => {
    const { __scopeScrollArea: u, style: c, ...s } = a,
      d = qt(uo, u),
      m = ep(uo, u),
      { onThumbPositionChange: h } = m,
      g = qe(o, (S) => m.onThumbChange(S)),
      v = b.useRef(void 0),
      y = wo(() => {
        v.current && (v.current(), (v.current = void 0));
      }, 100);
    return (
      b.useEffect(() => {
        const S = d.viewport;
        if (S) {
          const T = () => {
            if ((y(), !v.current)) {
              const C = Lw(S, h);
              (v.current = C), h();
            }
          };
          return (
            h(),
            S.addEventListener("scroll", T),
            () => S.removeEventListener("scroll", T)
          );
        }
      }, [d.viewport, y, h]),
      w.jsx(Ye.div, {
        "data-state": m.hasThumb ? "visible" : "hidden",
        ...s,
        ref: g,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...c,
        },
        onPointerDownCapture: Le(a.onPointerDownCapture, (S) => {
          const C = S.target.getBoundingClientRect(),
            D = S.clientX - C.left,
            E = S.clientY - C.top;
          m.onThumbPointerDown({ x: D, y: E });
        }),
        onPointerUp: Le(a.onPointerUp, m.onThumbPointerUp),
      })
    );
  });
np.displayName = uo;
var Os = "ScrollAreaCorner",
  lp = b.forwardRef((a, o) => {
    const u = qt(Os, a.__scopeScrollArea),
      c = !!(u.scrollbarX && u.scrollbarY);
    return u.type !== "scroll" && c ? w.jsx(Uw, { ...a, ref: o }) : null;
  });
lp.displayName = Os;
var Uw = b.forwardRef((a, o) => {
  const { __scopeScrollArea: u, ...c } = a,
    s = qt(Os, u),
    [d, m] = b.useState(0),
    [h, g] = b.useState(0),
    v = !!(d && h);
  return (
    ya(s.scrollbarX, () => {
      var S;
      const y = ((S = s.scrollbarX) == null ? void 0 : S.offsetHeight) || 0;
      s.onCornerHeightChange(y), g(y);
    }),
    ya(s.scrollbarY, () => {
      var S;
      const y = ((S = s.scrollbarY) == null ? void 0 : S.offsetWidth) || 0;
      s.onCornerWidthChange(y), m(y);
    }),
    v
      ? w.jsx(Ye.div, {
          ...c,
          ref: o,
          style: {
            width: d,
            height: h,
            position: "absolute",
            right: s.dir === "ltr" ? 0 : void 0,
            left: s.dir === "rtl" ? 0 : void 0,
            bottom: 0,
            ...a.style,
          },
        })
      : null
  );
});
function so(a) {
  return a ? parseInt(a, 10) : 0;
}
function ap(a, o) {
  const u = a / o;
  return isNaN(u) ? 0 : u;
}
function xo(a) {
  const o = ap(a.viewport, a.content),
    u = a.scrollbar.paddingStart + a.scrollbar.paddingEnd,
    c = (a.scrollbar.size - u) * o;
  return Math.max(c, 18);
}
function Hw(a, o, u, c = "ltr") {
  const s = xo(u),
    d = s / 2,
    m = o || d,
    h = s - m,
    g = u.scrollbar.paddingStart + m,
    v = u.scrollbar.size - u.scrollbar.paddingEnd - h,
    y = u.content - u.viewport,
    S = c === "ltr" ? [0, y] : [y * -1, 0];
  return ip([g, v], S)(a);
}
function gv(a, o, u = "ltr") {
  const c = xo(o),
    s = o.scrollbar.paddingStart + o.scrollbar.paddingEnd,
    d = o.scrollbar.size - s,
    m = o.content - o.viewport,
    h = d - c,
    g = u === "ltr" ? [0, m] : [m * -1, 0],
    v = ls(a, g);
  return ip([0, m], [0, h])(v);
}
function ip(a, o) {
  return (u) => {
    if (a[0] === a[1] || o[0] === o[1]) return o[0];
    const c = (o[1] - o[0]) / (a[1] - a[0]);
    return o[0] + c * (u - a[0]);
  };
}
function rp(a, o) {
  return a > 0 && a < o;
}
var Lw = (a, o = () => {}) => {
  let u = { left: a.scrollLeft, top: a.scrollTop },
    c = 0;
  return (
    (function s() {
      const d = { left: a.scrollLeft, top: a.scrollTop },
        m = u.left !== d.left,
        h = u.top !== d.top;
      (m || h) && o(), (u = d), (c = window.requestAnimationFrame(s));
    })(),
    () => window.cancelAnimationFrame(c)
  );
};
function wo(a, o) {
  const u = bt(a),
    c = b.useRef(0);
  return (
    b.useEffect(() => () => window.clearTimeout(c.current), []),
    b.useCallback(() => {
      window.clearTimeout(c.current), (c.current = window.setTimeout(u, o));
    }, [u, o])
  );
}
function ya(a, o) {
  const u = bt(o);
  rt(() => {
    let c = 0;
    if (a) {
      const s = new ResizeObserver(() => {
        cancelAnimationFrame(c), (c = window.requestAnimationFrame(u));
      });
      return (
        s.observe(a),
        () => {
          window.cancelAnimationFrame(c), s.unobserve(a);
        }
      );
    }
  }, [a, u]);
}
var Bw = Wg,
  Yw = $g,
  Vw = lp;
function qw({ className: a, children: o, ...u }) {
  return w.jsxs(Bw, {
    "data-slot": "scroll-area",
    className: ft("relative", a),
    ...u,
    children: [
      w.jsx(Yw, {
        "data-slot": "scroll-area-viewport",
        className:
          "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
        children: o,
      }),
      w.jsx(kw, {}),
      w.jsx(Vw, {}),
    ],
  });
}
function kw({ className: a, orientation: o = "vertical", ...u }) {
  return w.jsx(Fg, {
    "data-slot": "scroll-area-scrollbar",
    orientation: o,
    className: ft(
      "flex touch-none p-px transition-colors select-none",
      o === "vertical" && "h-full w-2.5 border-l border-l-transparent",
      o === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
      a
    ),
    ...u,
    children: w.jsx(np, {
      "data-slot": "scroll-area-thumb",
      className: "bg-border relative flex-1 rounded-full",
    }),
  });
}
function Gw() {
  const [a, o] = b.useState(null),
    [u, c] = b.useState(!0),
    [s, d] = b.useState("fr"),
    [m, h] = b.useState("fr"),
    [g, v] = b.useState(null),
    [y, S] = b.useState(""),
    [T, C] = b.useState("all"),
    [D, E] = b.useState(""),
    [_, L] = b.useState(""),
    [H, Y] = b.useState({}),
    [K, q] = b.useState(!1),
    X = {
      fr: {
        title: "Assistant pour rédaction de courriels aux clients",
        subtitle: "Bureau de la traduction",
        searchPlaceholder: "🔍 Rechercher un modèle...",
        allCategories: "Toutes les catégories",
        selectTemplate: "Sélectionnez un modèle",
        templateLanguage: "Langue du modèle",
        interfaceLanguage: "Langue de l'interface",
        variables: "Variables",
        subject: "Objet",
        body: "Corps du message",
        emailContent: "Contenu de l'email",
        editableVersion: "✏️ Éditez votre email",
        copy: "Copier",
        reset: "Réinitialiser",
        copied: "✅ Email copié !",
        noTemplate: "Sélectionnez un modèle pour commencer",
        templatesCount: "modèles disponibles",
      },
      en: {
        title: "Email Writing Assistant for Clients",
        subtitle: "Translation Bureau",
        searchPlaceholder: "🔍 Search for a template...",
        allCategories: "All categories",
        selectTemplate: "Select a template",
        templateLanguage: "Template language",
        interfaceLanguage: "Interface language",
        variables: "Variables",
        subject: "Subject",
        body: "Message body",
        emailContent: "Email content",
        editableVersion: "✏️ Edit your email",
        copy: "Copy",
        reset: "Reset",
        copied: "✅ Email copied!",
        noTemplate: "Select a template to get started",
        templatesCount: "templates available",
      },
    }[s];
  b.useEffect(() => {
    (async () => {
      try {
        const ne = await fetch(
          "/email-assistant/complete_email_templates.json"
        );
        if (!ne.ok) throw new Error("Failed to load templates data");
        const re = await ne.json();
        o(re);
      } catch (ne) {
        console.error("Error loading templates data:", ne);
      } finally {
        c(!1);
      }
    })();
  }, []);
  const J = b.useMemo(() => {
      if (!a) return [];
      let P = a.templates;
      return (
        y &&
          (P = P.filter((ne) => {
            var re, O;
            return (
              ((re = ne.title[m]) == null
                ? void 0
                : re.toLowerCase().includes(y.toLowerCase())) ||
              ((O = ne.description[m]) == null
                ? void 0
                : O.toLowerCase().includes(y.toLowerCase())) ||
              ne.category.toLowerCase().includes(y.toLowerCase())
            );
          })),
        T !== "all" && (P = P.filter((ne) => ne.category === T)),
        P
      );
    }, [y, T, m]),
    te = b.useMemo(
      () => (a ? [...new Set(a.templates.map((ne) => ne.category))] : []),
      [a]
    ),
    oe = (P) => {
      let ne = P;
      return (
        Object.entries(H).forEach(([re, O]) => {
          const k = new RegExp(`<<${re}>>`, "g");
          ne = ne.replace(k, O || `<<${re}>>`);
        }),
        ne
      );
    };
  b.useEffect(() => {
    if (g) {
      const P = {};
      g.variables.forEach((O) => {
        const k = a.variables[O];
        k && (P[O] = k.example || "");
      }),
        Y(P);
      const ne = oe(g.subject[m] || ""),
        re = oe(g.body[m] || "");
      E(ne), L(re);
    }
  }, [g, m]),
    b.useEffect(() => {
      if (g) {
        const P = oe(g.subject[m] || ""),
          ne = oe(g.body[m] || "");
        E(P), L(ne);
      }
    }, [H, g, m]);
  const ge = () => {
      const P = `${D}

${_}`;
      navigator.clipboard.writeText(P).then(() => {
        q(!0), setTimeout(() => q(!1), 2e3);
      });
    },
    me = () => {
      if (g) {
        const P = {};
        g.variables.forEach((O) => {
          const k = a.variables[O];
          k && (P[O] = k.example || "");
        }),
          Y(P);
        const ne = oe(g.subject[m] || ""),
          re = oe(g.body[m] || "");
        E(ne), L(re);
      }
    };
  return w.jsx("div", {
    className:
      "min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
    children: u
      ? w.jsx("div", {
          className: "flex items-center justify-center min-h-screen",
          children: w.jsxs("div", {
            className: "text-center",
            children: [
              w.jsx("div", {
                className:
                  "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4",
              }),
              w.jsx("p", {
                className: "text-gray-600",
                children: "Chargement des modèles...",
              }),
            ],
          }),
        })
      : w.jsxs(w.Fragment, {
          children: [
            w.jsx("header", {
              className:
                "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-xl",
              children: w.jsx("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
                children: w.jsxs("div", {
                  className: "flex items-center justify-between",
                  children: [
                    w.jsxs("div", {
                      className: "flex items-center space-x-4",
                      children: [
                        w.jsxs("div", {
                          className: "relative",
                          children: [
                            w.jsx(Dh, {
                              className: "h-10 w-10 text-white animate-pulse",
                            }),
                            w.jsx(jh, {
                              className:
                                "h-4 w-4 text-yellow-300 absolute -top-1 -right-1 animate-bounce",
                            }),
                          ],
                        }),
                        w.jsxs("div", {
                          children: [
                            w.jsx("h1", {
                              className:
                                "text-3xl font-bold text-white drop-shadow-lg",
                              children: X.title,
                            }),
                            w.jsx("p", {
                              className: "text-blue-100 text-sm",
                              children: X.subtitle,
                            }),
                          ],
                        }),
                      ],
                    }),
                    w.jsxs("div", {
                      className:
                        "flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2",
                      children: [
                        w.jsx(F0, { className: "h-5 w-5 text-white" }),
                        w.jsxs("span", {
                          className: "text-white font-medium",
                          children: [X.interfaceLanguage, ":"],
                        }),
                        w.jsxs("div", {
                          className: "flex bg-white/20 rounded-lg p-1",
                          children: [
                            w.jsx("button", {
                              onClick: () => d("fr"),
                              className: `px-4 py-2 text-sm font-bold rounded-md transition-all duration-300 ${
                                s === "fr"
                                  ? "bg-white text-blue-600 shadow-lg transform scale-105"
                                  : "text-white hover:bg-white/20"
                              }`,
                              children: "FR",
                            }),
                            w.jsx("button", {
                              onClick: () => d("en"),
                              className: `px-4 py-2 text-sm font-bold rounded-md transition-all duration-300 ${
                                s === "en"
                                  ? "bg-white text-blue-600 shadow-lg transform scale-105"
                                  : "text-white hover:bg-white/20"
                              }`,
                              children: "EN",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
            w.jsx("main", {
              className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
              children: w.jsxs("div", {
                className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
                children: [
                  w.jsx("div", {
                    className: "lg:col-span-1",
                    children: w.jsxs(Kr, {
                      className:
                        "h-fit shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 overflow-hidden",
                      children: [
                        w.jsxs(Gu, {
                          className:
                            "pb-4 bg-gradient-to-r from-gray-50 to-blue-50",
                          children: [
                            w.jsxs(Xu, {
                              className:
                                "text-xl font-bold text-gray-800 flex items-center",
                              children: [
                                w.jsx(zh, {
                                  className: "h-6 w-6 mr-2 text-blue-600",
                                }),
                                X.selectTemplate,
                              ],
                            }),
                            w.jsxs("p", {
                              className: "text-sm text-gray-600",
                              children: [J.length, " ", X.templatesCount],
                            }),
                            w.jsxs("div", {
                              className: "relative group",
                              children: [
                                w.jsx(ob, {
                                  className:
                                    "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors",
                                }),
                                w.jsx(Gh, {
                                  placeholder: X.searchPlaceholder,
                                  value: y,
                                  onChange: (P) => S(P.target.value),
                                  className:
                                    "pl-10 border-2 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300",
                                }),
                              ],
                            }),
                            w.jsxs(yw, {
                              value: T,
                              onValueChange: C,
                              children: [
                                w.jsxs(Sw, {
                                  className:
                                    "border-2 border-gray-200 focus:border-purple-400 transition-all duration-300",
                                  children: [
                                    w.jsx(P0, {
                                      className: "h-4 w-4 mr-2 text-purple-500",
                                    }),
                                    w.jsx(bw, { placeholder: X.allCategories }),
                                  ],
                                }),
                                w.jsxs(xw, {
                                  children: [
                                    w.jsx(vv, {
                                      value: "all",
                                      children: X.allCategories,
                                    }),
                                    te.map((P) =>
                                      w.jsx(vv, { value: P, children: P }, P)
                                    ),
                                  ],
                                }),
                              ],
                            }),
                            w.jsxs("div", {
                              className:
                                "flex items-center space-x-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3",
                              children: [
                                w.jsx(eb, {
                                  className: "h-5 w-5 text-indigo-600",
                                }),
                                w.jsxs("span", {
                                  className:
                                    "text-sm font-semibold text-gray-700",
                                  children: [X.templateLanguage, ":"],
                                }),
                                w.jsxs("div", {
                                  className:
                                    "flex bg-white rounded-lg p-1 shadow-sm",
                                  children: [
                                    w.jsx("button", {
                                      onClick: () => h("fr"),
                                      className: `px-3 py-1 text-sm font-bold rounded-md transition-all duration-300 ${
                                        m === "fr"
                                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transform scale-105"
                                          : "text-gray-600 hover:bg-gray-100"
                                      }`,
                                      children: "FR",
                                    }),
                                    w.jsx("button", {
                                      onClick: () => h("en"),
                                      className: `px-3 py-1 text-sm font-bold rounded-md transition-all duration-300 ${
                                        m === "en"
                                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transform scale-105"
                                          : "text-gray-600 hover:bg-gray-100"
                                      }`,
                                      children: "EN",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        w.jsx(Jr, {
                          className: "p-0",
                          children: w.jsx(qw, {
                            className: "h-96",
                            children: w.jsx("div", {
                              className: "space-y-3 p-4",
                              children: J.map((P) =>
                                w.jsx(
                                  "div",
                                  {
                                    onClick: () => v(P),
                                    className: `p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-102 ${
                                      (g == null ? void 0 : g.id) === P.id
                                        ? "border-blue-400 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg transform scale-102"
                                        : "border-gray-200 hover:border-blue-300 bg-white"
                                    }`,
                                    children: w.jsx("div", {
                                      className:
                                        "flex items-start justify-between",
                                      children: w.jsxs("div", {
                                        className: "flex-1",
                                        children: [
                                          w.jsx("h3", {
                                            className:
                                              "font-bold text-gray-900 text-sm mb-1",
                                            children: P.title[m],
                                          }),
                                          w.jsx("p", {
                                            className:
                                              "text-xs text-gray-600 mb-2 leading-relaxed",
                                            children: P.description[m],
                                          }),
                                          w.jsx(Pb, {
                                            variant: "secondary",
                                            className:
                                              "text-xs bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-purple-200",
                                            children: P.category,
                                          }),
                                        ],
                                      }),
                                    }),
                                  },
                                  P.id
                                )
                              ),
                            }),
                          }),
                        }),
                      ],
                    }),
                  }),
                  w.jsx("div", {
                    className: "lg:col-span-2 space-y-6",
                    children: g
                      ? w.jsxs(w.Fragment, {
                          children: [
                            g.variables &&
                              g.variables.length > 0 &&
                              w.jsxs(Kr, {
                                className:
                                  "shadow-xl border-0 bg-gradient-to-br from-white to-orange-50 overflow-hidden",
                                children: [
                                  w.jsx(Gu, {
                                    className:
                                      "bg-gradient-to-r from-orange-50 to-yellow-50",
                                    children: w.jsxs(Xu, {
                                      className:
                                        "text-xl font-bold text-gray-800 flex items-center",
                                      children: [
                                        w.jsx(lb, {
                                          className:
                                            "h-6 w-6 mr-2 text-orange-600",
                                        }),
                                        X.variables,
                                      ],
                                    }),
                                  }),
                                  w.jsx(Jr, {
                                    className: "p-6",
                                    children: w.jsx("div", {
                                      className:
                                        "grid grid-cols-1 md:grid-cols-2 gap-6",
                                      children: g.variables.map((P) => {
                                        const ne = a.variables[P];
                                        return ne
                                          ? w.jsxs(
                                              "div",
                                              {
                                                className: "space-y-2",
                                                children: [
                                                  w.jsxs("label", {
                                                    className:
                                                      "text-sm font-bold text-gray-700 flex items-center",
                                                    children: [
                                                      w.jsx("span", {
                                                        className:
                                                          "w-2 h-2 bg-orange-400 rounded-full mr-2",
                                                      }),
                                                      ne.description[s],
                                                    ],
                                                  }),
                                                  w.jsx(Gh, {
                                                    value: H[P] || "",
                                                    onChange: (re) =>
                                                      Y((O) => ({
                                                        ...O,
                                                        [P]: re.target.value,
                                                      })),
                                                    placeholder: ne.example,
                                                    className:
                                                      "border-2 border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-300",
                                                  }),
                                                ],
                                              },
                                              P
                                            )
                                          : null;
                                      }),
                                    }),
                                  }),
                                ],
                              }),
                            w.jsxs(Kr, {
                              className:
                                "shadow-2xl border-0 bg-gradient-to-br from-white to-green-50 overflow-hidden",
                              children: [
                                w.jsx(Gu, {
                                  className:
                                    "bg-gradient-to-r from-green-50 to-emerald-50",
                                  children: w.jsxs(Xu, {
                                    className:
                                      "text-2xl font-bold text-gray-800 flex items-center",
                                    children: [
                                      w.jsx(Dh, {
                                        className:
                                          "h-7 w-7 mr-3 text-green-600",
                                      }),
                                      X.editableVersion,
                                    ],
                                  }),
                                }),
                                w.jsxs(Jr, {
                                  className: "p-6 space-y-6",
                                  children: [
                                    w.jsxs("div", {
                                      className: "space-y-3",
                                      children: [
                                        w.jsxs("label", {
                                          className:
                                            "text-lg font-bold text-gray-700 flex items-center",
                                          children: [
                                            w.jsx("span", {
                                              className:
                                                "w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse",
                                            }),
                                            X.subject,
                                          ],
                                        }),
                                        w.jsx(Xh, {
                                          value: D,
                                          onChange: (P) => E(P.target.value),
                                          className:
                                            "min-h-[60px] resize-none border-3 border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-lg font-medium",
                                          placeholder: X.subject,
                                        }),
                                      ],
                                    }),
                                    w.jsxs("div", {
                                      className: "space-y-3",
                                      children: [
                                        w.jsxs("label", {
                                          className:
                                            "text-lg font-bold text-gray-700 flex items-center",
                                          children: [
                                            w.jsx("span", {
                                              className:
                                                "w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse",
                                            }),
                                            X.body,
                                          ],
                                        }),
                                        w.jsx(Xh, {
                                          value: _,
                                          onChange: (P) => L(P.target.value),
                                          className:
                                            "min-h-[250px] border-3 border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-base leading-relaxed",
                                          placeholder: X.body,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            w.jsxs("div", {
                              className: "flex justify-end space-x-4",
                              children: [
                                w.jsxs(kh, {
                                  variant: "outline",
                                  onClick: me,
                                  className:
                                    "border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 font-semibold",
                                  children: [
                                    w.jsx(ib, { className: "h-4 w-4 mr-2" }),
                                    X.reset,
                                  ],
                                }),
                                w.jsxs(kh, {
                                  onClick: ge,
                                  className: `font-bold text-lg px-8 py-3 transition-all duration-300 ${
                                    K
                                      ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transform scale-105"
                                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105"
                                  } shadow-lg`,
                                  children: [
                                    w.jsx(K0, { className: "h-5 w-5 mr-2" }),
                                    K ? X.copied : X.copy,
                                  ],
                                }),
                              ],
                            }),
                          ],
                        })
                      : w.jsx(Kr, {
                          className:
                            "shadow-xl border-0 bg-gradient-to-br from-white to-gray-50",
                          children: w.jsx(Jr, {
                            className: "flex items-center justify-center h-80",
                            children: w.jsxs("div", {
                              className: "text-center",
                              children: [
                                w.jsxs("div", {
                                  className: "relative mb-6",
                                  children: [
                                    w.jsx(zh, {
                                      className:
                                        "h-16 w-16 text-gray-300 mx-auto animate-bounce",
                                    }),
                                    w.jsx(jh, {
                                      className:
                                        "h-6 w-6 text-blue-400 absolute -top-2 -right-2 animate-pulse",
                                    }),
                                  ],
                                }),
                                w.jsx("p", {
                                  className:
                                    "text-gray-500 text-lg font-medium",
                                  children: X.noTemplate,
                                }),
                              ],
                            }),
                          }),
                        }),
                  }),
                ],
              }),
            }),
          ],
        }),
  });
}
U0.createRoot(document.getElementById("root")).render(
  w.jsx(b.StrictMode, { children: w.jsx(Gw, {}) })
);
