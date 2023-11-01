function __vite_legacy_guard() {
  import.meta.url;
  import("_").catch(() => 1);
  async function* g() {
  }
  ;
}
;
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el2) => {
  const i = arr.indexOf(el2);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction$1 = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction$1(val.then) && isFunction$1(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const cacheStringFunction = (fn2) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn2(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction(
  (str) => str.charAt(0).toUpperCase() + str.slice(1)
);
const toHandlerKey = cacheStringFunction(
  (str) => str ? `on${capitalize(str)}` : ``
);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
const toNumber = (val) => {
  const n = isString(val) ? Number(val) : NaN;
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction$1(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn2) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn2();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("");
const MAP_KEY_ITERATE_KEY = Symbol("");
class ReactiveEffect {
  constructor(fn2, scheduler = null, scope) {
    this.fn = fn2;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect2) {
  const { deps } = effect2;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect2);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    trackEffects(dep);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects));
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray(dep) ? dep : [...dep];
  for (const effect2 of effects) {
    if (effect2.computed) {
      triggerEffect(effect2);
    }
  }
  for (const effect2 of effects) {
    if (!effect2.computed) {
      triggerEffect(effect2);
    }
  }
}
function triggerEffect(effect2, debuggerEventExtraInfo) {
  if (effect2 !== activeEffect || effect2.allowRecurse) {
    if (effect2.scheduler) {
      effect2.scheduler();
    } else {
      effect2.run();
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const get$1 = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow) {
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function has$1(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get: get$1,
  set: set$1,
  deleteProperty,
  has: has$1,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    return true;
  },
  deleteProperty(target, key) {
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend(
  {},
  mutableHandlers,
  {
    get: shallowGet,
    set: shallowSet
  }
);
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(
      method,
      false,
      false
    );
    readonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      false
    );
    shallowInstrumentations2[method] = createIterableMethod(
      method,
      false,
      true
    );
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()));
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    {
      triggerEffects(dep);
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction$1(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  return cRef;
}
function warn(msg, ...args) {
  return;
}
function callWithErrorHandling(fn2, instance, type, args) {
  let res;
  try {
    res = args ? fn2(...args) : fn2();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn2, instance, type, args) {
  if (isFunction$1(fn2)) {
    const res = callWithErrorHandling(fn2, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn2.length; i++) {
    values.push(callWithAsyncErrorHandling(fn2[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    console.error(err);
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
function nextTick(fn2) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn2 ? p2.then(this ? fn2.bind(this) : fn2) : p2;
}
function findInsertionIndex(id2) {
  let start2 = flushIndex + 1;
  let end = queue.length;
  while (start2 < end) {
    const middle = start2 + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id2 ? start2 = middle + 1 : end = middle;
  }
  return start2;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(seen, i = isFlushing ? flushIndex + 1 : 0) {
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.pre) {
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff = getId(a) - getId(b);
  if (diff === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  queue.sort(comparator);
  const check = NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (false)
          ;
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs();
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs();
    }
  }
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn2, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn2;
  if (fn2._n) {
    return fn2;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn2(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    props,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render: render2,
    renderCache,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(
        render2.call(
          proxyToUse,
          proxyToUse,
          renderCache,
          props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render22 = Component;
      if (false)
        ;
      result = normalizeVNode(
        render22.length > 1 ? render22(
          props,
          false ? {
            get attrs() {
              markAttrsAccessed();
              return attrs;
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }
        ) : render22(
          props,
          null
          /* we know it doesn't need it */
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs);
      }
    }
  }
  if (vnode.dirs) {
    root = cloneVNode(root);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    root.transition = vnode.transition;
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el2) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el2;
    parent = parent.parent;
  }
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn2, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn2)) {
      suspense.effects.push(...fn2);
    } else {
      suspense.effects.push(fn2);
    }
  } else {
    queuePostFlushCb(fn2);
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  var _a2;
  const instance = getCurrentScope() === ((_a2 = currentInstance) == null ? void 0 : _a2.scope) ? currentInstance : null;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction$1(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else
        ;
    });
  } else if (isFunction$1(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn2) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn2, instance, 4);
    };
  };
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else {
      return NOOP;
    }
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some(
        (v, i) => hasChanged(v, oldValue[i])
      ) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(
      effect.run.bind(effect),
      instance && instance.suspense
    );
  } else {
    effect.run();
  }
  const unwatch = () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
  if (ssrCleanup)
    ssrCleanup.push(unwatch);
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction$1(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
function withDirectives(vnode, directives) {
  const internalInstance = currentRenderingInstance;
  if (internalInstance === null) {
    return vnode;
  }
  const instance = getExposeProxy(internalInstance) || internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (dir) {
      if (isFunction$1(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionPropsValidators = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: TransitionHookValidator,
  onEnter: TransitionHookValidator,
  onAfterEnter: TransitionHookValidator,
  onEnterCancelled: TransitionHookValidator,
  // leave
  onBeforeLeave: TransitionHookValidator,
  onLeave: TransitionHookValidator,
  onAfterLeave: TransitionHookValidator,
  onLeaveCancelled: TransitionHookValidator,
  // appear
  onBeforeAppear: TransitionHookValidator,
  onAppear: TransitionHookValidator,
  onAfterAppear: TransitionHookValidator,
  onAppearCancelled: TransitionHookValidator
};
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: BaseTransitionPropsValidators,
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      let child = children[0];
      if (children.length > 1) {
        for (const c of children) {
          if (c.type !== Comment) {
            child = c;
            break;
          }
        }
      }
      const rawProps = toRaw(props);
      const { mode } = rawProps;
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(
        innerChild,
        rawProps,
        state,
        instance
      );
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(
          oldInnerChild,
          rawProps,
          state,
          instance
        );
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            if (instance.update.active !== false) {
              instance.update();
            }
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el2, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(
              state,
              oldInnerChild
            );
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el2._leaveCb = () => {
              earlyRemove();
              el2._leaveCb = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance) {
  const {
    appear,
    mode,
    persisted = false,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    onLeaveCancelled,
    onBeforeAppear,
    onAppear,
    onAfterAppear,
    onAppearCancelled
  } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(
      hook,
      instance,
      9,
      args
    );
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook2(hook, args);
    if (isArray(hook)) {
      if (hook.every((hook2) => hook2.length <= 1))
        done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el2) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el2._leaveCb) {
        el2._leaveCb(
          true
          /* cancelled */
        );
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        leavingVNode.el._leaveCb();
      }
      callHook2(hook, [el2]);
    },
    enter(el2) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el2._enterCb = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el2]);
        } else {
          callHook2(afterHook, [el2]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el2._enterCb = void 0;
      };
      if (hook) {
        callAsyncHook(hook, [el2, done]);
      } else {
        done();
      }
    },
    leave(el2, remove2) {
      const key2 = String(vnode.key);
      if (el2._enterCb) {
        el2._enterCb(
          true
          /* cancelled */
        );
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el2]);
      let called = false;
      const done = el2._leaveCb = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el2]);
        } else {
          callHook2(onAfterLeave, [el2]);
        }
        el2._leaveCb = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el2, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props, state, instance);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(
        getTransitionRawChildren(child.children, keepComment, key)
      );
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
function defineComponent(options, extraOptions) {
  return isFunction$1(options) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook(
  "rtg"
);
const onRenderTracked = createHook(
  "rtc"
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
function resolveDynamicComponent(component) {
  if (isString(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component,
        false
        /* do not include inferred name to avoid breaking existing code */
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component;
    }
    return res;
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
function renderList(source, renderItem, cache, index2) {
  let ret;
  const cached = cache && cache[index2];
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
    }
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(
        source,
        (item, i) => renderItem(item, i, void 0, cached && cached[i])
      );
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index2] = ret;
  }
  return ret;
}
function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
    if (name !== "default")
      props.name = name;
    return createVNode("slot", props, fallback && fallback());
  }
  let slot = slots[name];
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const rendered = createBlock(
    Fragment,
    {
      key: props.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      validSlotContent && validSlotContent.key || `_${name}`
    },
    validSlotContent || (fallback ? fallback() : []),
    validSlotContent && slots._ === 1 ? 64 : -2
  );
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child))
      return true;
    if (child.type === Comment)
      return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
function toHandlers(obj, preserveCaseIfNecessary) {
  const ret = {};
  for (const key in obj) {
    ret[preserveCaseIfNecessary && /[A-Z]/.test(key) ? `on:${key}` : toHandlerKey(key)] = obj[key];
  }
  return ret;
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => i.props,
    $attrs: (i) => i.attrs,
    $slots: (i) => i.slots,
    $refs: (i) => i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => instanceWatch.bind(i)
  })
);
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else
      ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
function normalizePropsOrEmits(props) {
  return isArray(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render: render2,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction$1(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject(data))
      ;
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction$1(opt) ? opt.bind(publicThis, publicThis) : isFunction$1(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set2 = !isFunction$1(opt) && isFunction$1(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction$1(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook$1(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render2 && instance.render === NOOP) {
    instance.render = render2;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
          /* treat default function as factory */
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction$1(handler)) {
      watch(getter, handler);
    }
  } else if (isFunction$1(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction$1(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction$1(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else
    ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to2, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to2, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions(to2, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose")
      ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to2[key] = strat ? strat(to2[key], from[key]) : from[key];
    }
  }
  return to2;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to2, from) {
  if (!from) {
    return to2;
  }
  if (!to2) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction$1(to2) ? to2.call(this, this) : to2,
      isFunction$1(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to2, from) {
  return mergeObjectOptions(normalizeInject(to2), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to2, from) {
  return to2 ? [...new Set([].concat(to2, from))] : from;
}
function mergeObjectOptions(to2, from) {
  return to2 ? extend(/* @__PURE__ */ Object.create(null), to2, from) : from;
}
function mergeEmitsOrPropsOptions(to2, from) {
  if (to2) {
    if (isArray(to2) && isArray(from)) {
      return [.../* @__PURE__ */ new Set([...to2, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to2),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to2, from) {
  if (!to2)
    return from;
  if (!from)
    return to2;
  const merged = extend(/* @__PURE__ */ Object.create(null), to2);
  for (const key in from) {
    merged[key] = mergeAsArray(to2[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render2, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction$1(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    let isMounted = false;
    const app2 = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin))
          ;
        else if (plugin && isFunction$1(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app2, ...options);
        } else if (isFunction$1(plugin)) {
          installedPlugins.add(plugin);
          plugin(app2, ...options);
        } else
          ;
        return app2;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app2;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app2;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app2;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          const vnode = createVNode(
            rootComponent,
            rootProps
          );
          vnode.appContext = context;
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render2(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app2._container = rootContainer;
          rootContainer.__vue_app__ = app2;
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        }
      },
      unmount() {
        if (isMounted) {
          render2(null, app2._container);
          delete app2._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app2;
      },
      runWithContext(fn2) {
        currentApp$1 = app2;
        try {
          return fn2();
        } finally {
          currentApp$1 = null;
        }
      }
    };
    return app2;
  };
}
let currentApp$1 = null;
function provide(key, value) {
  if (!currentInstance)
    ;
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp$1) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp$1._context.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction$1(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else
      ;
  }
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
              /* isAbsent */
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
              /* isAbsent */
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction$1(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction$1(opt) ? { type: opt } : extend({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
  return match ? match[2] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if (isFunction$1(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false)
      ;
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction$1(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(
        children,
        instance.slots = {}
      );
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray(rawRef)) {
    rawRef.forEach(
      (r, i) => setRef(
        r,
        oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction$1(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString(ref2);
    const _isRef = isRef(ref2);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? hasOwn(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray(existing) && remove(existing, refValue);
          } else {
            if (!isArray(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
                if (hasOwn(setupState, ref2)) {
                  setupState[ref2] = refs[ref2];
                }
              } else {
                ref2.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value;
          if (hasOwn(setupState, ref2)) {
            setupState[ref2] = value;
          }
        } else if (_isRef) {
          ref2.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else
          ;
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    }
  }
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized,
            internals
          );
        } else
          ;
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el2 = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el2, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      isSVG,
      n2.el,
      n2.anchor
    );
  };
  const moveStaticNode = ({ el: el2, anchor }, container, nextSibling) => {
    let next;
    while (el2 && el2 !== anchor) {
      next = hostNextSibling(el2);
      hostInsert(el2, container, nextSibling);
      el2 = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el: el2, anchor }) => {
    let next;
    while (el2 && el2 !== anchor) {
      next = hostNextSibling(el2);
      hostRemove(el2);
      el2 = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    } else {
      patchElement(
        n1,
        n2,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el2;
    let vnodeHook;
    const { type, props, shapeFlag, transition, dirs } = vnode;
    el2 = vnode.el = hostCreateElement(
      vnode.type,
      isSVG,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el2, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el2,
        null,
        parentComponent,
        parentSuspense,
        isSVG && type !== "foreignObject",
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el2, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(
            el2,
            key,
            null,
            props[key],
            isSVG,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in props) {
        hostPatchProp(el2, "value", null, props.value);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el2);
    }
    hostInsert(el2, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el2);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el2, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el2, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el2, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el2,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start2 = 0) => {
    for (let i = start2; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el2 = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el2,
        parentComponent,
        parentSuspense,
        areChildrenSVG,
        slotScopeIds
      );
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el2,
        null,
        parentComponent,
        parentSuspense,
        areChildrenSVG,
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(
          el2,
          n2,
          oldProps,
          newProps,
          parentComponent,
          parentSuspense,
          isSVG
        );
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el2, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el2, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(
                el2,
                key,
                prev,
                next,
                isSVG,
                n1.children,
                parentComponent,
                parentSuspense,
                unmountChildren
              );
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el2, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(
        el2,
        n2,
        oldProps,
        newProps,
        parentComponent,
        parentSuspense,
        isSVG
      );
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el2, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el2,
              key,
              oldProps[key],
              null,
              isSVG,
              vnode.children,
              parentComponent,
              parentSuspense,
              unmountChildren
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(
            el2,
            key,
            prev,
            next,
            isSVG,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el2, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        n2.children,
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds
        );
        if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          isSVG,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    );
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(
      instance,
      initialVNode,
      container,
      anchor,
      parentSuspense,
      isSVG,
      optimized
    );
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el: el2, props } = initialVNode;
        const { bm: bm2, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm2) {
          invokeArrayFns(bm2);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el2 && hydrateNode) {
          const hydrateSubTree = () => {
            instance.subTree = renderComponentRoot(instance);
            hydrateNode(
              el2,
              instance.subTree,
              instance,
              parentSuspense,
              null
            );
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
              // note: we are moving the render call into an async callback,
              // which means it won't track dependencies - but it's ok because
              // a server-rendered async wrapper is already in resolved state
              // and it will never need to change.
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            isSVG
          );
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu: bu2, u, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu2) {
          invokeArrayFns(bu2);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          isSVG
        );
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
      }
    };
    const effect = instance.effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(update),
      instance.scope
      // track it in component's effect scope
    );
    const update = instance.update = () => effect.run();
    update.id = instance.uid;
    toggleRecurse(instance, true);
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs();
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el: el2, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el2, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el2);
        hostInsert(el2, container, anchor);
        queuePostRenderEffect(() => transition.enter(el2), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => hostInsert(el2, container, anchor);
        const performLeave = () => {
          leave(el2, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el2, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el2, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref: ref2,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs
    } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          optimized,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el: el2, anchor, transition } = vnode;
    if (type === Fragment) {
      {
        removeFragment(el2, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el2);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el2, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, update, subTree, um: um2 } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um2) {
      queuePostRenderEffect(um2, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start2 = 0) => {
    for (let i = start2; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render2 = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPreFlushCbs();
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(
      internals
    );
  }
  return {
    render: render2,
    hydrate,
    createApp: createAppAPI(render2, hydrate)
  };
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray(ch1) && isArray(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
const isTeleport = (type) => type.__isTeleport;
const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
      /* isBlock */
    )
  );
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      true
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref: ref2,
  ref_key,
  ref_for
}) => {
  if (typeof ref2 === "number") {
    ref2 = "" + ref2;
  }
  return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction$1(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction$1(type) ? 2 : 0;
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref2 ? isArray(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction$1(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let globalCurrentInstanceSetters;
let settersKey = "__VUE_INSTANCE_SETTERS__";
{
  if (!(globalCurrentInstanceSetters = getGlobalThis()[settersKey])) {
    globalCurrentInstanceSetters = getGlobalThis()[settersKey] = [];
  }
  globalCurrentInstanceSetters.push((i) => currentInstance = i);
  internalSetCurrentInstance = (instance) => {
    if (globalCurrentInstanceSetters.length > 1) {
      globalCurrentInstanceSetters.forEach((s) => s(instance));
    } else {
      globalCurrentInstanceSetters[0](instance);
    }
  };
}
const setCurrentInstance = (instance) => {
  internalSetCurrentInstance(instance);
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [instance.props, setupContext]
    );
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction$1(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else
    ;
  finishComponentSetup(instance, isSSR);
}
let compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(
          extend(
            {
              isCustomElement,
              delimiters
            },
            compilerOptions
          ),
          componentCompilerOptions
        );
        Component.render = compile(template, finalCompilerOptions);
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
}
function getAttrsProxy(instance) {
  return instance.attrsProxy || (instance.attrsProxy = new Proxy(
    instance.attrs,
    {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      }
    }
  ));
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  {
    return {
      get attrs() {
        return getAttrsProxy(instance);
      },
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
function getComponentName(Component, includeInferred = true) {
  return isFunction$1(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function isClassComponent(value) {
  return isFunction$1(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
function h(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
const ssrContextKey = Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    return ctx;
  }
};
const version = "3.3.4";
const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is2, props) => {
    const el2 = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is2 ? { is: is2 } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el2.setAttribute("multiple", props.multiple);
    }
    return el2;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el2, text) => {
    el2.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el2, id2) {
    el2.setAttribute(id2, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, isSVG, start2, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start2 && (start2 === end || start2.nextSibling)) {
      while (true) {
        parent.insertBefore(start2.cloneNode(true), anchor);
        if (start2 === end || !(start2 = start2.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      const template = templateContainer.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function patchClass(el2, value, isSVG) {
  const transitionClasses = el2._vtc;
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el2.removeAttribute("class");
  } else if (isSVG) {
    el2.setAttribute("class", value);
  } else {
    el2.className = value;
  }
}
function patchStyle(el2, prev, next) {
  const style = el2.style;
  const isCssString = isString(next);
  if (next && !isCssString) {
    if (prev && !isString(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el2.removeAttribute("style");
    }
    if ("_vod" in el2) {
      style.display = currentDisplay;
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null)
      val = "";
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el2, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el2.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el2.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean = isSpecialBooleanAttr(key);
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el2.removeAttribute(key);
    } else {
      el2.setAttribute(key, isBoolean ? "" : value);
    }
  }
}
function patchDOMProp(el2, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el2[key] = value == null ? "" : value;
    return;
  }
  const tag = el2.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    el2._value = value;
    const oldValue = tag === "OPTION" ? el2.getAttribute("value") : el2.value;
    const newValue = value == null ? "" : value;
    if (oldValue !== newValue) {
      el2.value = newValue;
    }
    if (value == null) {
      el2.removeAttribute(key);
    }
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el2[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el2[key] = value;
  } catch (e) {
  }
  needRemove && el2.removeAttribute(key);
}
function addEventListener(el2, event, handler, options) {
  el2.addEventListener(event, handler, options);
}
function removeEventListener(el2, event, handler, options) {
  el2.removeEventListener(event, handler, options);
}
function patchEvent(el2, rawName, prevValue, nextValue, instance = null) {
  const invokers = el2._vei || (el2._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el2, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el2, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e, invoker.value),
      instance,
      5,
      [e]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map((fn2) => (e2) => !e2._stopped && fn2 && fn2(e2));
  } else {
    return value;
  }
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (el2, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el2, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el2, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el2, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el2, key, nextValue, isSVG)) {
    patchDOMProp(
      el2,
      key,
      nextValue,
      prevChildren,
      parentComponent,
      parentSuspense,
      unmountChildren
    );
  } else {
    if (key === "true-value") {
      el2._trueValue = nextValue;
    } else if (key === "false-value") {
      el2._falseValue = nextValue;
    }
    patchAttr(el2, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el2, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el2 && nativeOnRE.test(key) && isFunction$1(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el2.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el2.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString(value)) {
    return false;
  }
  return key in el2;
}
const TRANSITION = "transition";
const ANIMATION = "animation";
const Transition = (props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots);
Transition.displayName = "Transition";
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
Transition.props = /* @__PURE__ */ extend(
  {},
  BaseTransitionPropsValidators,
  DOMTransitionPropsValidators
);
const callHook = (hook, args = []) => {
  if (isArray(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook ? isArray(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const {
    name = "v",
    type,
    duration,
    enterFromClass = `${name}-enter-from`,
    enterActiveClass = `${name}-enter-active`,
    enterToClass = `${name}-enter-to`,
    appearFromClass = enterFromClass,
    appearActiveClass = enterActiveClass,
    appearToClass = enterToClass,
    leaveFromClass = `${name}-leave-from`,
    leaveActiveClass = `${name}-leave-active`,
    leaveToClass = `${name}-leave-to`
  } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const {
    onBeforeEnter,
    onEnter,
    onEnterCancelled,
    onLeave,
    onLeaveCancelled,
    onBeforeAppear = onBeforeEnter,
    onAppear = onEnter,
    onAppearCancelled = onEnterCancelled
  } = baseProps;
  const finishEnter = (el2, isAppear, done) => {
    removeTransitionClass(el2, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el2, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el2, done) => {
    el2._isLeaving = false;
    removeTransitionClass(el2, leaveFromClass);
    removeTransitionClass(el2, leaveToClass);
    removeTransitionClass(el2, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el2, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve2 = () => finishEnter(el2, isAppear, done);
      callHook(hook, [el2, resolve2]);
      nextFrame(() => {
        removeTransitionClass(el2, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el2, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el2, type, enterDuration, resolve2);
        }
      });
    };
  };
  return extend(baseProps, {
    onBeforeEnter(el2) {
      callHook(onBeforeEnter, [el2]);
      addTransitionClass(el2, enterFromClass);
      addTransitionClass(el2, enterActiveClass);
    },
    onBeforeAppear(el2) {
      callHook(onBeforeAppear, [el2]);
      addTransitionClass(el2, appearFromClass);
      addTransitionClass(el2, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el2, done) {
      el2._isLeaving = true;
      const resolve2 = () => finishLeave(el2, done);
      addTransitionClass(el2, leaveFromClass);
      forceReflow();
      addTransitionClass(el2, leaveActiveClass);
      nextFrame(() => {
        if (!el2._isLeaving) {
          return;
        }
        removeTransitionClass(el2, leaveFromClass);
        addTransitionClass(el2, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el2, type, leaveDuration, resolve2);
        }
      });
      callHook(onLeave, [el2, resolve2]);
    },
    onEnterCancelled(el2) {
      finishEnter(el2, false);
      callHook(onEnterCancelled, [el2]);
    },
    onAppearCancelled(el2) {
      finishEnter(el2, true);
      callHook(onAppearCancelled, [el2]);
    },
    onLeaveCancelled(el2) {
      finishLeave(el2);
      callHook(onLeaveCancelled, [el2]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n = NumberOf(duration);
    return [n, n];
  }
}
function NumberOf(val) {
  const res = toNumber(val);
  return res;
}
function addTransitionClass(el2, cls) {
  cls.split(/\s+/).forEach((c) => c && el2.classList.add(c));
  (el2._vtc || (el2._vtc = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el2, cls) {
  cls.split(/\s+/).forEach((c) => c && el2.classList.remove(c));
  const { _vtc } = el2;
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el2._vtc = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el2, expectedType, explicitTimeout, resolve2) {
  const id2 = el2._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id2 === el2._endId) {
      resolve2();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el2, expectedType);
  if (!type) {
    return resolve2();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el2.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e) => {
    if (e.target === el2 && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el2.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el2, expectedType) {
  const styles = window.getComputedStyle(el2);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
  const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
  const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(
    getStyleProperties(`${TRANSITION}Property`).toString()
  );
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}
const systemModifiers = ["ctrl", "shift", "alt", "meta"];
const modifierGuards = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
};
const withModifiers = (fn2, modifiers) => {
  return (event, ...args) => {
    for (let i = 0; i < modifiers.length; i++) {
      const guard = modifierGuards[modifiers[i]];
      if (guard && guard(event, modifiers))
        return;
    }
    return fn2(event, ...args);
  };
};
const keyNames = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
};
const withKeys = (fn2, modifiers) => {
  return (event) => {
    if (!("key" in event)) {
      return;
    }
    const eventKey = hyphenate(event.key);
    if (modifiers.some((k) => k === eventKey || keyNames[k] === eventKey)) {
      return fn2(event);
    }
  };
};
const vShow = {
  beforeMount(el2, { value }, { transition }) {
    el2._vod = el2.style.display === "none" ? "" : el2.style.display;
    if (transition && value) {
      transition.beforeEnter(el2);
    } else {
      setDisplay(el2, value);
    }
  },
  mounted(el2, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el2);
    }
  },
  updated(el2, { value, oldValue }, { transition }) {
    if (!value === !oldValue)
      return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el2);
        setDisplay(el2, true);
        transition.enter(el2);
      } else {
        transition.leave(el2, () => {
          setDisplay(el2, false);
        });
      }
    } else {
      setDisplay(el2, value);
    }
  },
  beforeUnmount(el2, { value }) {
    setDisplay(el2, value);
  }
};
function setDisplay(el2, value) {
  el2.style.display = value ? el2._vod : "none";
}
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const render = (...args) => {
  ensureRenderer().render(...args);
};
const createApp = (...args) => {
  const app2 = ensureRenderer().createApp(...args);
  const { mount } = app2;
  app2.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app2._component;
    if (!isFunction$1(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, container instanceof SVGElement);
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app2;
};
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
const w = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, Pt = defineComponent({
  name: "xmvLayout",
  props: {
    mode: {
      type: String,
      default: "t_lr"
      //  l_tr  t_lr
    },
    headHval: {
      type: String,
      default: "100px"
    },
    footHval: {
      type: String,
      default: "auto"
    },
    lWval: {
      type: String,
      default: "100px"
    },
    responsive: false
  },
  setup(e, t) {
    const n = reactive({}), s = reactive({}), a = ref(""), o = ref("");
    e.mode == "l_tr" ? (n.width = e.lWval, s.height = e.headHval, a.value = "left", o.value = "top") : (s.width = e.lWval, n.height = e.headHval, a.value = "top", o.value = "left");
    const l = computed(() => ({ height: e.footHval }));
    return {
      lOrTop1Style: n,
      lOrTop2Style: s,
      lOrTop1SlotName: a,
      lOrTop2SlotName: o,
      computeFootStyle: l
    };
  }
}), Ot = { class: "xmv-layout" }, Ht = { class: "xmv-layout-right" };
function Wt(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("div", Ot, [
    createBaseVNode("div", {
      class: normalizeClass(["xmv-layout-main", [e.mode == "l_tr" ? "row" : "column"]])
    }, [
      createBaseVNode("div", {
        class: normalizeClass([e.mode == "l_tr" ? "xmv-layout-left" : "xmv-layout-top"]),
        style: normalizeStyle(e.lOrTop1Style)
      }, [
        renderSlot(e.$slots, e.lOrTop1SlotName)
      ], 6),
      createBaseVNode("div", {
        class: normalizeClass(["xmv-layout-content", [e.mode == "l_tr" ? "column" : "row"]])
      }, [
        createBaseVNode("div", {
          class: normalizeClass([e.mode == "l_tr" ? "xmv-layout-top" : "xmv-layout-left"]),
          style: normalizeStyle(e.lOrTop2Style)
        }, [
          renderSlot(e.$slots, e.lOrTop2SlotName)
        ], 6),
        createBaseVNode("div", Ht, [
          renderSlot(e.$slots, "right")
        ])
      ], 2)
    ], 2),
    createBaseVNode("div", {
      class: "xmv-layout-foot",
      style: normalizeStyle(e.computeFootStyle)
    }, [
      renderSlot(e.$slots, "foot")
    ], 4)
  ]);
}
const jt = /* @__PURE__ */ w(Pt, [["render", Wt]]);
function F(e, t = false) {
  if (e == null)
    return true;
  if (typeof e == "string")
    return !e;
  if (typeof e == "object")
    return e instanceof Array ? e.length == 0 : !e;
  if (typeof e == "number")
    return t ? e == 0 : false;
}
function qe(e, t) {
  let n = null;
  for (let s = 0; s < e.length; s++) {
    let a = e[s];
    if (t(a)) {
      n = a;
      break;
    }
  }
  return n;
}
function Fe(e, t) {
  return e.filter((n) => t(n));
}
function dt(e, t, n = "value") {
  for (let s of e) {
    if (s[n] === t)
      return s;
    if (s.children && s.children.length > 0) {
      let a = dt(s.children, t, n);
      if (a)
        return a;
    }
  }
  return null;
}
function tt(e = "value", t, n, s) {
  for (let a = 0; a < s.length; a++)
    if (s[a][e] === t) {
      s.splice(a, 0, n), s[a].children && tt(e, t, n, s[a].children);
      break;
    } else
      s[a].children && tt(e, t, n, s[a].children);
  return s;
}
function nt(e, t, n, s) {
  for (let a = 0; a < s.length; a++)
    if (s[a][e] === t) {
      s.splice(a + 1, 0, n), s[a].children && nt(e, t, n, s[a].children);
      break;
    } else
      s[a].children && nt(e, t, n, s[a].children);
  return s;
}
function je(e = "value", t, n) {
  for (let s = 0; s < n.length; s++) {
    if (n[s][e] === t) {
      n.splice(s, 1);
      break;
    }
    n[s].children && (je(e, t, n[s].children), n[s].children.length === 0 && delete n[s].children);
  }
  return n;
}
function Ge(e, t, n = [], s = "value") {
  for (let a of e) {
    if (a[s] === t)
      return n;
    if (a.children && a.children.length > 0) {
      let o = n.concat(a), l = Ge(a.children, t, o);
      if (l)
        return l;
    }
  }
  return null;
}
let Yt = 0;
function Ft() {
  return Yt++;
}
const Xt = defineComponent({
  name: "xmvButton",
  emits: ["click"],
  props: {
    type: String,
    size: String,
    icon: String,
    iconPosition: { type: String, default: "right" },
    loading: Boolean,
    loadingButton: Boolean,
    disabled: Boolean
  },
  setup(e, t) {
    const n = () => {
      t.emit("click");
    }, s = computed(() => e.loadingButton ? e.loading : !F(e.icon) && e.iconPosition == "right"), a = computed(() => t.slots.default != null), o = computed(() => {
      let l = [];
      e.type && l.push("xmv-button--" + e.type), e.size && l.push("xmv-button--" + e.size), e.disabled && l.push("is-disabled");
      let i = t.attrs;
      return i.plain != null ? l.push("is-plain") : i.round != null ? l.push("is-round") : i.circle != null ? l.push("is-circle") : i.text != null ? l.push("is-text") : i.link != null && l.push("is-link"), l;
    });
    return {
      handleClick: n,
      classList: o,
      textShow: a,
      iconRightShow: s
    };
  }
});
function Ut(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon");
  return openBlock(), createElementBlock("button", {
    class: normalizeClass(["xmv-button", e.classList]),
    type: "button",
    onClick: t[0] || (t[0] = withModifiers((...i) => e.handleClick && e.handleClick(...i), ["stop"]))
  }, [
    createBaseVNode("span", null, [
      e.iconPosition == "left" ? (openBlock(), createBlock(l, {
        key: 0,
        name: e.icon,
        class: normalizeClass({ "xmv-icon--left": e.textShow })
      }, null, 8, ["name", "class"])) : createCommentVNode("", true),
      renderSlot(e.$slots, "default"),
      e.iconRightShow ? (openBlock(), createBlock(l, {
        key: 1,
        name: e.icon,
        class: normalizeClass({ "xmv-icon--right": e.textShow, "is-loading": e.loading })
      }, null, 8, ["name", "class"])) : createCommentVNode("", true)
    ])
  ], 2);
}
const xt = /* @__PURE__ */ w(Xt, [["render", Ut]]), qt = defineComponent({
  name: "xmvButtonGroup",
  setup(e, t) {
    return {};
  }
}), Gt = { class: "xmv-button-group" };
function Zt(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("div", Gt, [
    renderSlot(e.$slots, "default")
  ]);
}
const Qt = /* @__PURE__ */ w(qt, [["render", Zt]]);
function Oe(e, t) {
  return e.className.indexOf(t) >= 0;
}
function Le(e, t) {
  e.className.indexOf(t) < 0 && (e.className += " " + t);
}
function xe(e, t) {
  e.className = e.className.replace(t, "").trim();
}
function Me(e, t, n) {
  e.style.setProperty(t, n);
}
function ut(e) {
  let t = e.style.cssText;
  e.style.cssText = t + ";display:block;position:absolute;z-index:-1000";
  let n = e.scrollWidth, s = e.scrollHeight;
  return e.style.cssText = t, { domWidth: n, domHeight: s };
}
function yt(e, t, n, s = false) {
  let a = e.getBoundingClientRect(), o = document.documentElement.scrollLeft, l = document.documentElement.scrollTop, i = 5, r = 0, u = a.top + l, c = a.left + o, v = e.offsetWidth, y = e.offsetHeight, _ = ut(n), f = _.domWidth, g = _.domHeight, $ = document.documentElement.clientWidth, k = document.documentElement.clientHeight;
  s && (r = (v - f) / 2), t == "top" && a.top < g ? t = "bottom" : t == "bottom" && k - a.bottom < g ? t = "top" : t == "left" && a.left < f ? t = "right" : t == "right" && $ - a.right < f && (t = "left");
  let x = false, b = 0;
  if (t == "top" || t == "bottom") {
    let R = (a.left + a.width / 2) * 2;
    x = f > R;
    let L = document.documentElement.clientWidth - a.left;
    f > L && (b = f - L + 10);
  }
  switch (t) {
    case "left":
      return { left: c - i - f, top: u, type: t };
    case "right":
      return { left: c + i + v, top: u, type: t };
    case "top":
      return { left: x ? 0 : c + r - b, top: u - i - g, type: t };
    case "bottom":
      return { left: x ? 0 : c + r - b, top: u + i + y, type: t };
    case "center":
      return { left: c, top: u, type: t };
    default:
      return { left: c, top: u, type: t };
  }
}
function Ne(e) {
  requestAnimationFrame(function() {
    requestAnimationFrame(e);
  });
}
function ht(e) {
  let t = e.style.transform;
  return t ? t.substring(7, t.length - 1).split(",") : [1, 0, 0, 1, 0, 0];
}
function pt(e, t) {
  e.style.transform = `matrix(${t[0]}, ${t[1]}, ${t[2]}, ${t[3]}, ${t[4]}, ${t[5]})`;
}
function Kt() {
  window.getSelection().removeAllRanges();
}
const Pe = 300, Jt = window.navigator.userAgent.indexOf("Firefox") > 0;
function en() {
  var e = navigator.userAgent, t = new Object();
  if (e.indexOf("Firefox") > -1) {
    var n = e.match(/Firefox\/([0-9\.]+)/)[1];
    t.name = "Firefox", t.version = n;
  } else if (e.indexOf("Chrome") > -1 || e.indexOf("CriOS") > -1) {
    var n = e.match(/(Chrome|CriOS)\/([0-9\.]+)/)[2];
    t.name = "Chrome", t.version = n;
  } else
    console.log("This is not Firefox or Chrome.");
  return t;
}
function tn(e, t) {
  const n = e.split("."), s = t.split("."), a = Math.max(n.length, s.length);
  for (let o = 0; o < a; o++) {
    const l = parseInt(n[o]) || 0, i = parseInt(s[o]) || 0;
    if (l > i)
      return 1;
    if (l < i)
      return -1;
  }
  return n.length - s.length;
}
const nn = (e) => {
  let t = en();
  return t.name == "Firefox" && tn(e, t.version) > 0;
};
function sn(e, t) {
  var n = e.style.cssText;
  return e.style.cssText = n + `
                        transition:opacity var(--xmv-transition-duration)`, Ne(() => {
    e.style.opacity = 1;
  }), setTimeout(() => {
    e.style.cssText = n + `opacity:${e.style.opacity}`, t();
  }, Pe);
}
function an(e, t) {
  var n = e.style.cssText;
  return e.style.cssText = n + `
                        transition:opacity var(--xmv-transition-duration)`, Ne(() => {
    e.style.opacity = 0;
  }), setTimeout(() => {
    e.style.cssText = n + `opacity:${e.style.opacity}`, t();
  }, Pe);
}
function on(e, t, n, s) {
  var a = e.style.cssText;
  e.style.cssText = a + `
                        ;display:block;
                        overflow:hidden;
                        width:${t};
                        transition:width var(--xmv-transition-duration);`, Ne(() => {
    e.style.width = n;
  }), setTimeout(() => {
    e.style.cssText = a, s();
  }, Pe);
}
function ln(e, t, n, s) {
  var a = e.style.cssText;
  e.style.cssText = a + `
                        ;display:block;
                        overflow:hidden;
                        width:${n};
                        transition:width var(--xmv-transition-duration);`, Ne(() => {
    e.style.width = t;
  }), setTimeout(() => {
    e.style.cssText = a, s();
  }, Pe);
}
function rn(e, t, n, s) {
  var a = e.style.cssText;
  e.style.cssText = a + `
                        ;height:${t};
                        overflow:hidden;
                        transition:height var(--xmv-transition-duration)`, Ne(() => {
    e.style.height = n;
  }), setTimeout(() => {
    e.style.cssText = a, s();
  }, Pe);
}
function dn(e, t, n, s) {
  var a = e.style.cssText;
  e.style.cssText = a + `
                        ;display:block;
                        height:${n};
                        overflow:hidden;
                        transition:height var(--xmv-transition-duration);`, Ne(() => {
    e.style.height = t;
  }), setTimeout(() => {
    e.style.cssText = a, s();
  }, Pe);
}
const Ct = {
  top: { origin: "center bottom", inVal: "1,1", outVal: "1,0" },
  bottom: { origin: "center top", inVal: "1,1", outVal: "1,0" },
  left: { origin: "right top", inVal: "1", outVal: "0" },
  right: { origin: "left top", inVal: "1", outVal: "0" }
};
function un(e, t, n) {
  let s = Ct[n.placement];
  if (e.style.opacity == "1")
    return t(), false;
  var a = e.style.cssText;
  return e.style.cssText = a + `;transform-origin:${s.origin};transform:scale(${s.outVal});opacity:0;
                        transition:transform var(--xmv-transition-duration) ,opacity var(--xmv-transition-duration)`, Ne(() => {
    e.style.display = "", Ne(() => {
      e.style.transform = `scale(${s.inVal})`, e.style.opacity = 1;
    });
  }), setTimeout(() => {
    a = a.replace("none", ""), e.style.cssText = a + ";transform:scale(1);opacity:1;", t();
  }, Pe);
}
function cn(e, t, n) {
  let s = Ct[n.placement];
  var a = e.style.cssText;
  return e.style.cssText = a + `;transform-origin:${s.origin};transform:scale(${s.inVal});opacity:1;
                    transition:transform var(--xmv-transition-duration) ,opacity var(--xmv-transition-duration)`, Ne(() => {
    e.style.transform = `scale(${s.outVal})`, e.style.opacity = 0;
  }), setTimeout(() => {
    e.style.cssText = a + ";transform:scale(0);opacity:0", t();
  }, Pe);
}
class Ke {
  constructor(t = {}) {
    this.el, this.animateType, this.delayRunTimeout, this.animateTimeOutMap = {}, this.isAnimating = false, this.placement;
  }
  setEl(t) {
    this.el = t;
  }
  reset() {
    this.animateType = "", this.isAnimating = false;
  }
  opacityIn(t) {
    if (this.animateType == "opacityIn" && this.isAnimating)
      return false;
    this.animateType = "opacityIn", this.isAnimating = true, t && t();
    const n = () => {
      this.isAnimating = false;
    };
    clearTimeout(this.animateTimeOutMap.opacityOut), clearTimeout(this.delayRunTimeout), sn(this.el, n);
  }
  opacityOut(t) {
    if (this.animateType == "opacityOut")
      return false;
    this.animateType = "opacityOut";
    const n = () => {
      t && t();
    };
    this.delayRunTimeout = setTimeout(() => {
      this.animateTimeOutMap.opacityOut = an(this.el, n);
    }, 200);
  }
  scaleIn(t, n) {
    if (this.animateType == "scaleIn" && this.isAnimating)
      return false;
    this.animateType = "scaleIn", this.isAnimating = true, t && t();
    const s = () => {
      this.isAnimating = false, n && n();
    };
    clearTimeout(this.animateTimeOutMap.scaleOut), clearTimeout(this.delayRunTimeout), un(this.el, s, {
      placement: this.placement
    });
  }
  scaleOut(t) {
    if (this.animateType == "scaleOut")
      return false;
    this.animateType = "scaleOut";
    const n = () => {
      t && t();
    };
    this.delayRunTimeout = setTimeout(() => {
      this.animateTimeOutMap.scaleOut = cn(this.el, n, {
        placement: this.placement
      });
    }, 200);
  }
  widthCollapse(t, n, s, a) {
    if (this.isAnimating)
      return false;
    let o = () => {
      this.isAnimating = false, a && a();
    };
    this.isAnimating = true, on(t, n, s, o);
  }
  widthExpand(t, n, s, a) {
    if (this.isAnimating)
      return false;
    let o = () => {
      this.isAnimating = false, a && a();
    };
    this.isAnimating = true, ln(t, n, s, o);
  }
  heightCollapse(t, n, s, a) {
    if (this.isAnimating)
      return false;
    let o = () => {
      this.isAnimating = false, a && a();
    };
    this.isAnimating = true, rn(t, n, s, o);
  }
  heightExpand(t, n, s, a) {
    if (this.isAnimating)
      return false;
    let o = () => {
      this.isAnimating = false, a && a();
    };
    this.isAnimating = true, dn(t, n, s, o);
  }
}
class mn {
  constructor(t) {
    this.rctMenu = reactive({
      data: [],
      isCollapse: false
    }), this.ctx = t, this.isVertical, this.isDark, this.menuElRef = null, this.curSelNode = null, this.transition = new Ke(), this.$on = null, this.$emit = null;
  }
  init() {
  }
  loadData(t) {
    this.rctMenu.data = t;
  }
  collapse() {
    if (this.rctMenu.isCollapse)
      return false;
    let t = this.__getExpandWidth();
    this.transition.widthCollapse(
      this.menuElRef.value,
      t,
      "calc(var(--xmv-menu-icon-width) + var(--xmv-menu-base-level-padding) * 2)",
      () => {
        this.rctMenu.isCollapse = true, this.rctMenu.data.forEach((n) => {
          n.childrenVisible = false;
        });
      }
    );
  }
  expand() {
    if (!this.rctMenu.isCollapse)
      return false;
    let t = this.__getExpandWidth();
    this.transition.widthExpand(
      this.menuElRef.value,
      t,
      "calc(var(--xmv-menu-icon-width) + var(--xmv-menu-base-level-padding) * 2)",
      () => {
        this.rctMenu.isCollapse = false;
      }
    );
  }
  activeNode(t, n = "value", s = false) {
    let a = dt(this.rctMenu.data, t);
    this.curSelNode = a, a.active = true;
    let o = Ge(this.rctMenu.data, t, [], n);
    if (!F(o)) {
      if (o.length > 1)
        for (let l = 1; l < o.length; l++)
          o[l].isExpand = true, o[l].childrenVisible = true;
      s && nextTick(() => {
        this.$emit("triggerSubClick", { tmp: o[0], type: n });
      });
    }
    if (!this.isVertical)
      for (let l = 0; l < o.length; l++)
        o[l].active = true;
  }
  itemClick(t) {
    if (this.curSelNode && (this.curSelNode.active = false, !this.isVertical)) {
      let n = Ge(this.rctMenu.data, this.curSelNode.value, [], "value");
      for (let s = 0; s < n.length; s++)
        n[s].active = false;
    }
    this.curSelNode = t, this.activeNode(t.value), this.ctx.emit("nodeClick", t);
  }
  subClick(t, n) {
    return new Promise((s, a) => {
      if (this.rctMenu.isCollapse)
        return false;
      let { domHeight: o } = ut(n);
      const l = () => {
        t.childrenVisible = !t.childrenVisible;
      };
      t.childrenVisible ? this.transition.heightCollapse(n, o + "px", 0, l) : this.transition.heightExpand(n, o + "px", 0, l), t.isExpand = !t.isExpand;
    });
  }
  onMounted() {
  }
  __getExpandWidth() {
    let t;
    return Oe(this.menuElRef.value, "xmv-menu--collapse") ? (xe(this.menuElRef.value, "xmv-menu--collapse"), t = this.menuElRef.value.scrollWidth, Le(this.menuElRef.value, "xmv-menu--collapse")) : t = this.menuElRef.value.scrollWidth, t + "px";
  }
}
function ct(e, t) {
  window.ResizeObserver ? new ResizeObserver(() => {
    t();
  }).observe(e) : new MutationObserver((s) => {
    t();
  }).observe(e, {
    attributes: true,
    // 监测元素属性变化
    childList: true,
    // 监测子元素变化
    subtree: true
    // 监测所有后代节点的变化
  });
}
function be(e) {
  return { $on: (a, o) => {
    e.listeners[a] || (e.listeners[a] = []), e.listeners[a].push(o);
  }, $emit: (a, ...o) => {
    e.listeners[a] && e.listeners[a].forEach((l) => l(...o));
  }, $remove: (a, o) => {
    if (e.listeners[a]) {
      let l = e.listeners[a].indexOf(o);
      e.listeners[a].splice(l, 1);
    }
  } };
}
function hn(e, t) {
  let n;
  return function(...s) {
    clearTimeout(n), n = setTimeout(() => {
      e.apply(this, s);
    }, t);
  };
}
const pn = defineComponent({
  name: "xmvMenu",
  emits: ["nodeClick"],
  props: {
    isVertical: {
      type: Boolean,
      default: true
    },
    data: Array,
    isDark: Boolean
  },
  setup(e, t) {
    const n = ref(null), s = new mn(t);
    s.isVertical = e.isVertical, s.isDark = e.isDark;
    const a = reactive({
      listeners: {}
    }), { $on: o, $emit: l } = be(a);
    s.$on = o, s.$emit = l;
    const i = (v) => {
      s.loadData(v);
    }, r = () => {
      s.collapse();
    }, u = () => {
      s.expand();
    }, c = (v) => {
      s.activeNode(v, "value", true);
    };
    return onMounted(() => {
      s.menuElRef = n, s.onMounted();
    }), provide("MenuMode", s), provide("Level", 0), provide("IsVertical", e.isVertical), provide("EventBus", { $on: o, $emit: l }), watch(() => e.data, (v) => {
      i(v);
    }), onMounted(() => {
      F(e.data) || i(e.data);
    }), {
      loadData: i,
      activeNode: c,
      collapse: r,
      expand: u,
      menuMode: s,
      menuElRef: n
    };
  }
});
function fn(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-menu-core"), i = resolveComponent("xmv-menu-core-collapse"), r = resolveComponent("xmv-menu-core-horizontal");
  return openBlock(), createElementBlock("ul", {
    class: normalizeClass(["xmv-menu", {
      "xmv-menu--collapse": e.menuMode.rctMenu.isCollapse,
      "xmv-menu--vertical": e.isVertical,
      "xmv-menu--horizontal": !e.isVertical,
      "is-dark": e.isDark
    }]),
    ref: "menuElRef",
    style: { "--xmv-menu-level": "0" }
  }, [
    !e.menuMode.rctMenu.isCollapse && e.isVertical ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(e.menuMode.rctMenu.data, (u) => (openBlock(), createBlock(l, { node: u }, null, 8, ["node"]))), 256)) : createCommentVNode("", true),
    e.menuMode.rctMenu.isCollapse ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(e.menuMode.rctMenu.data, (u) => (openBlock(), createBlock(i, { node: u }, null, 8, ["node"]))), 256)) : createCommentVNode("", true),
    e.isVertical ? createCommentVNode("", true) : (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList(e.menuMode.rctMenu.data, (u) => (openBlock(), createBlock(r, { node: u }, null, 8, ["node"]))), 256))
  ], 2);
}
const vn = /* @__PURE__ */ w(pn, [["render", fn]]), gn = defineComponent({
  name: "",
  props: {
    node: Object
  },
  setup(e, t) {
    const n = inject("MenuMode"), s = inject("Level"), a = (o) => {
      n.itemClick(e.node);
    };
    return onMounted(() => {
      e.node.active && (n.curSelNode = e.node);
    }), {
      handleClick: a,
      menuMode: n,
      level: s
    };
  }
});
function _n(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon");
  return openBlock(), createElementBlock("li", {
    class: normalizeClass(["xmv-menu-item", { "is-active": e.node.active }]),
    onClick: t[0] || (t[0] = withModifiers((...i) => e.handleClick && e.handleClick(...i), ["stop"]))
  }, [
    e.level == 1 && e.node.icon ? (openBlock(), createBlock(l, {
      key: 0,
      name: e.node.icon
    }, null, 8, ["name"])) : createCommentVNode("", true),
    createBaseVNode("span", null, toDisplayString(e.node.name), 1)
  ], 2);
}
const $n = /* @__PURE__ */ w(gn, [["render", _n]]), bn = defineComponent({
  name: "",
  props: {
    node: Object
  },
  setup(e, t) {
    const n = inject("Level"), s = inject("MenuMode"), { $on: a, $emit: o } = inject("EventBus"), l = ref(null), i = () => {
      s.subClick(e.node, l.value);
    };
    return a("triggerSubClick", ({ tmp: r, type: u }) => {
      r[u] === e.node[u] && i();
    }), onMounted(() => {
      e.node.subXmvMenuRef = l;
    }), {
      handleClick: i,
      subXmvMenuRef: l,
      level: n,
      menuMode: s
    };
  }
}), xn = { class: "xmv-sub-menu__title" };
function yn(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon"), i = resolveComponent("xmv-menu-core");
  return openBlock(), createElementBlock("li", {
    class: "xmv-sub-menu",
    onClick: t[0] || (t[0] = withModifiers((...r) => e.handleClick && e.handleClick(...r), ["stop"]))
  }, [
    createBaseVNode("div", xn, [
      e.level == 1 && e.node.icon ? (openBlock(), createBlock(l, {
        key: 0,
        name: e.node.icon
      }, null, 8, ["name"])) : createCommentVNode("", true),
      createBaseVNode("span", null, toDisplayString(e.node.name), 1),
      createVNode(l, {
        name: "arrowRight",
        class: normalizeClass(["xmv-sub-menu__icon-arrow", { active: e.node.isExpand }])
      }, null, 8, ["class"])
    ]),
    withDirectives(createBaseVNode("ul", {
      class: normalizeClass(["xmv-menu", { "is-dark": e.menuMode.isDark }]),
      ref: "subXmvMenuRef",
      style: normalizeStyle({ "--xmv-menu-level": e.level })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(e.node.children, (r) => (openBlock(), createBlock(i, { node: r }, null, 8, ["node"]))), 256))
    ], 6), [
      [vShow, e.node.childrenVisible]
    ])
  ]);
}
const Cn = /* @__PURE__ */ w(bn, [["render", yn]]), wn = defineComponent({
  name: "xmvMenuCore",
  components: { xmvMenuItem: $n, xmvSubMenu: Cn },
  props: {
    node: Object
  },
  setup(e, t) {
    return provide("Level", inject("Level") + 1), {
      isLeaf: computed(() => F(e.node.children))
    };
  }
});
function kn(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-menu-item"), i = resolveComponent("xmv-sub-menu");
  return e.isLeaf ? (openBlock(), createBlock(l, {
    key: 0,
    node: e.node
  }, null, 8, ["node"])) : (openBlock(), createBlock(i, {
    key: 1,
    node: e.node
  }, null, 8, ["node"]));
}
const Mn = /* @__PURE__ */ w(wn, [["render", kn]]), Sn = defineComponent({
  name: "",
  props: {
    node: Object
  },
  setup(e, t) {
    const n = inject("MenuMode"), s = inject("Level"), a = (o) => {
      n.itemClick(e.node);
    };
    return onMounted(() => {
      e.node.active && (n.curSelNode = e.node);
    }), {
      handleClick: a,
      menuMode: n,
      level: s
    };
  }
}), Dn = { class: "xmv-menu-tooltip__trigger xmv-tooltip__trigger" }, Rn = { key: 1 };
function Ln(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon"), i = resolveComponent("xmv-tooltip");
  return openBlock(), createElementBlock("li", {
    class: normalizeClass(["xmv-menu-item", { "is-active": e.node.active }]),
    onClick: t[0] || (t[0] = withModifiers((...r) => e.handleClick && e.handleClick(...r), ["stop"]))
  }, [
    e.level == 1 ? (openBlock(), createBlock(i, {
      key: 0,
      content: e.node.name,
      placement: "right",
      isAlignCenter: true
    }, {
      default: withCtx(() => [
        createBaseVNode("div", Dn, [
          e.level == 1 ? (openBlock(), createBlock(l, {
            key: 0,
            name: "plus"
          })) : createCommentVNode("", true)
        ])
      ]),
      _: 1
    }, 8, ["content"])) : createCommentVNode("", true),
    e.level > 1 ? (openBlock(), createElementBlock("span", Rn, toDisplayString(e.node.name), 1)) : createCommentVNode("", true)
  ], 2);
}
const Tn = /* @__PURE__ */ w(Sn, [["render", Ln]]), En = defineComponent({
  name: "",
  props: {
    node: Object
  },
  setup(e, t) {
    const n = inject("Level"), s = inject("MenuMode"), a = ref(null), o = ref(null);
    return {
      subXmvMenuRef: a,
      level: n,
      menuMode: s,
      popoverRef: o,
      handleMouseover: (r) => {
        o.value.show();
      },
      handleMouseleave: (r) => {
        o.value.hide();
      }
    };
  }
}), An = { class: "xmv-sub-menu__title" };
function Vn(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon"), i = resolveComponent("xmv-menu-core-collapse"), r = resolveComponent("xmv-popover");
  return openBlock(), createElementBlock("li", {
    class: "xmv-sub-menu",
    onMouseover: t[0] || (t[0] = (...u) => e.handleMouseover && e.handleMouseover(...u)),
    onMouseleave: t[1] || (t[1] = (...u) => e.handleMouseleave && e.handleMouseleave(...u))
  }, [
    createVNode(r, {
      beStripped: e.level == 1,
      trigger: "mouse",
      ref: "popoverRef",
      placement: "right"
    }, {
      trigger: withCtx(() => [
        createBaseVNode("div", An, [
          e.level == 1 ? (openBlock(), createBlock(l, {
            key: 0,
            name: e.node.icon
          }, null, 8, ["name"])) : createCommentVNode("", true),
          createBaseVNode("span", null, toDisplayString(e.node.name), 1)
        ])
      ]),
      default: withCtx(() => [
        createBaseVNode("ul", {
          class: normalizeClass(["xmv-menu is-collapse", { "is-dark": e.menuMode.isDark }]),
          ref: "subXmvMenuRef",
          style: normalizeStyle({ "--xmv-menu-level": e.level })
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(e.node.children, (u) => (openBlock(), createBlock(i, { node: u }, null, 8, ["node"]))), 256))
        ], 6)
      ]),
      _: 1
    }, 8, ["beStripped"])
  ], 32);
}
const Bn = /* @__PURE__ */ w(En, [["render", Vn]]), In = defineComponent({
  name: "xmvMenuCoreCollapse",
  components: { xmvMenuItemCollapse: Tn, xmvSubMenuCollapse: Bn },
  props: {
    node: Object
  },
  setup(e, t) {
    return provide("Level", inject("Level") + 1), {
      isLeaf: computed(() => F(e.node.children))
    };
  }
});
function Nn(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-menu-item-collapse"), i = resolveComponent("xmv-sub-menu-collapse");
  return e.isLeaf ? (openBlock(), createBlock(l, {
    key: 0,
    node: e.node
  }, null, 8, ["node"])) : (openBlock(), createBlock(i, {
    key: 1,
    node: e.node
  }, null, 8, ["node"]));
}
const zn = /* @__PURE__ */ w(In, [["render", Nn]]), Pn = defineComponent({
  name: "",
  props: {
    node: Object
  },
  setup(e, t) {
    const n = inject("MenuMode"), s = inject("Level"), a = (o) => {
      n.itemClick(e.node);
    };
    return onMounted(() => {
      e.node.active && (n.curSelNode = e.node);
    }), {
      handleClick: a,
      menuMode: n,
      level: s
    };
  }
});
function On(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("li", {
    class: normalizeClass(["xmv-menu-item", { "is-active": e.node.active }]),
    onClick: t[0] || (t[0] = withModifiers((...l) => e.handleClick && e.handleClick(...l), ["stop"]))
  }, [
    createBaseVNode("span", null, toDisplayString(e.node.name), 1)
  ], 2);
}
const Hn = /* @__PURE__ */ w(Pn, [["render", On]]), Wn = defineComponent({
  name: "",
  props: {
    node: Object
  },
  setup(e, t) {
    const n = inject("Level"), s = inject("MenuMode"), a = ref(null), o = ref(null), l = ref(false);
    return {
      subXmvMenuRef: a,
      level: n,
      menuMode: s,
      popoverRef: o,
      handleMouseover: (v) => {
        o.value.show();
      },
      handleMouseleave: (v) => {
        o.value.hide();
      },
      handlePopML: () => {
        l.value = false;
      },
      handlePopMO: () => {
        l.value = true;
      },
      isActive: l
    };
  }
}), jn = { class: "xmv-sub-menu__title" };
function Yn(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon"), i = resolveComponent("xmv-menu-core-horizontal"), r = resolveComponent("xmv-popover");
  return openBlock(), createElementBlock("li", {
    class: normalizeClass(["xmv-sub-menu", { "is-active": e.node.active }]),
    onMouseover: t[0] || (t[0] = (...u) => e.handleMouseover && e.handleMouseover(...u)),
    onMouseleave: t[1] || (t[1] = (...u) => e.handleMouseleave && e.handleMouseleave(...u))
  }, [
    createVNode(r, {
      placement: e.level == 1 ? "bottom" : "right",
      beStripped: e.level == 1,
      ref: "popoverRef",
      trigger: "hover",
      onMouseleave: e.handlePopML,
      onMouseover: e.handlePopMO
    }, {
      trigger: withCtx(() => [
        createBaseVNode("div", jn, [
          createBaseVNode("span", null, toDisplayString(e.node.name), 1),
          createVNode(l, {
            class: normalizeClass(["xmv-sub-menu__icon-arrow", { active: e.isActive }]),
            name: "arrowRight"
          }, null, 8, ["class"])
        ])
      ]),
      default: withCtx(() => [
        createBaseVNode("ul", {
          class: normalizeClass(["xmv-menu xmv-menu--popup is-horizontal", { "is-dark": e.menuMode.isDark }]),
          ref: "subXmvMenuRef",
          style: normalizeStyle({ "--xmv-menu-level": e.level })
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(e.node.children, (u) => (openBlock(), createBlock(i, { node: u }, null, 8, ["node"]))), 256))
        ], 6)
      ]),
      _: 1
    }, 8, ["placement", "beStripped", "onMouseleave", "onMouseover"])
  ], 34);
}
const Fn = /* @__PURE__ */ w(Wn, [["render", Yn]]), Xn = defineComponent({
  name: "xmvMenuCoreCollapse",
  components: { xmvMenuItemHorizontal: Hn, xmvSubMenuHorizontal: Fn },
  props: {
    node: Object
  },
  setup(e, t) {
    return provide("Level", inject("Level") + 1), {
      isLeaf: computed(() => F(e.node.children))
    };
  }
});
function Un(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-menu-item-horizontal"), i = resolveComponent("xmv-sub-menu-horizontal");
  return e.isLeaf ? (openBlock(), createBlock(l, {
    key: 0,
    node: e.node
  }, null, 8, ["node"])) : (openBlock(), createBlock(i, {
    key: 1,
    node: e.node
  }, null, 8, ["node"]));
}
const qn = /* @__PURE__ */ w(Xn, [["render", Un]]), Gn = defineComponent({
  name: "xmvPopover",
  emits: ["mouseover", "mouseleave", "mouseclick", "show", "hide"],
  props: {
    trigger: {
      type: String,
      default: "click"
    },
    placement: {
      type: String,
      default: "bottom"
    },
    beStripped: { type: Boolean, default: true },
    popClass: { type: String },
    isAlignCenter: Boolean
  },
  setup(e, { slots: t, attrs: n, emit: s }) {
    const a = ref(true), o = ref(null), l = new Ke({}), i = inject("Xmv-Bubbling");
    var r = inject("Xmv-Dom-PopperContainer"), u, c, v, y;
    const _ = ref(false), f = () => {
      if (c)
        return false;
      c = document.createElement("div"), Le(c, "xmv-popper is-light is-pure"), e.popClass != null && Le(c, e.popClass);
      let ne = `z-index:2080;position:absolute;display:none;
                            left:0px;top:0px;margin:0;right:auto;bottom:auto;`;
      c.style.cssText = ne;
    }, g = () => {
      let ne = 0, oe = 0, { left: G, top: he, type: ge } = yt(u, e.placement, c, e.isAlignCenter);
      l.placement = ge, e.beStripped || (e.placement == "bottom" ? (G = 0, he = u.offsetTop + u.clientHeight + 5) : e.placement == "right" && (G = u.offsetWidth + 5, he = u.offsetTop - 1)), e.placement == "top" || e.placement == "bottom" ? G += ne : he += oe, c.style.left = G + "px", c.style.top = he + "px";
    }, $ = (ne) => {
      if (y == "mouseover")
        return false;
      _.value = true, y = "mouseover", l.scaleIn(() => {
      }, () => {
        s("show");
      }), s("mouseover");
    }, k = (ne = true) => {
      y = "mouseleave", _.value = false, l.scaleOut(() => {
        c.style.display = "none";
      }), ne && (s("mouseleave"), s("hide"));
    }, x = () => {
      if (!a.value)
        return false;
      _.value ? (_.value = false, k()) : (_.value = true, $());
    };
    inject("Xmv-Event-On")("mouseup", (ne) => {
      if (!i.status)
        return false;
      ne.target.closest(".xmv-popper") || _.value && L(true);
    });
    const R = () => {
      _.value = true, $();
    }, L = (ne = false) => {
      if (_.value == false)
        return false;
      _.value = false, k(ne);
    }, z = () => {
      a.value = true;
    }, j = () => {
      a.value = false;
    };
    return onUnmounted(() => {
      c && c.remove();
    }), onMounted(() => {
      u = o.value.nextElementSibling, v = u.nextElementSibling, o.value.remove(), e.beStripped || (r = v.parentNode), f(), c.appendChild(v), r.appendChild(c), l.setEl(c), e.trigger == "click" ? u.addEventListener("click", () => {
        x();
      }) : (u.addEventListener("mouseover", () => {
        $();
      }), u.addEventListener("mouseleave", () => {
        k();
      }), c.addEventListener("mouseover", () => {
        $();
      }), c.addEventListener("mouseleave", () => {
        k();
      })), ct(u, () => {
        g();
      });
    }), { enableRef: a, placeSpan: o, isShow: _, show: R, hide: L, enable: z, disabled: j, setPosition: g };
  }
}), Zn = {
  ref: "placeSpan",
  class: "xmv-place-span"
};
function Qn(e, t, n, s, a, o) {
  return openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("span", Zn, null, 512),
    renderSlot(e.$slots, "trigger"),
    renderSlot(e.$slots, "default")
  ], 64);
}
const Kn = /* @__PURE__ */ w(Gn, [["render", Qn]]), Jn = defineComponent({
  name: "xmvTooltip",
  props: {
    content: String | Number,
    placement: { type: String, default: "top" },
    width: { type: String, default: "auto" },
    isAlignCenter: { type: Boolean, default: false },
    effect: { type: String, default: "dark" },
    disabled: Boolean
  },
  setup(e, { slots: t, attrs: n }) {
    const s = ref(null), a = new Ke();
    var o = inject("Xmv-Dom-PopperContainer"), l, i;
    const r = ref(false);
    let u = "";
    const c = () => {
      if (i)
        return false;
      i = document.createElement("div"), t.content ? render(h(() => t.content()), i) : i.innerHTML = e.content, Le(i, "xmv-popper is-" + e.effect);
      let g = `z-index:2002;width:${e.width};position:absolute;opacity:0;
                            left:0px;top:0px;margin:0;right:auto;bottom:auto;transform: translate(0px,0px)`;
      i.style.cssText = g;
    }, v = () => {
      let g = 0, $ = 0, { placement: k } = e;
      Me(i, "max-width", document.documentElement.clientWidth + "px");
      let { left: x, top: b } = yt(l, e.placement, i, e.isAlignCenter);
      k == "top" || k == "bottom" ? x += g : b += $, i.style.transform = `translate(${x}px,${b}px)`;
    }, y = () => {
      if (u == "mouseover" || r.value || (u = "mouseover", e.disabled))
        return false;
      a.opacityIn(() => {
        o.appendChild(i), v();
      });
    }, _ = () => {
      u = "mouseleave", r.value || a.opacityOut(() => {
        o.removeChild(i);
      });
    }, f = () => {
      a.opacityOut(() => {
        o.removeChild(i);
      });
    };
    return watch(() => e.content, (g) => {
      i.innerHTML = g, setTimeout(() => {
        v();
      }, 10);
    }), watch(() => e.disabled, (g) => {
      g && _();
    }), onMounted(() => {
      l = s.value.nextElementSibling, s.value.remove(), c(), a.setEl(i), l.addEventListener("mouseover", (g) => {
        y();
      }), l.addEventListener("mouseleave", () => {
        _();
      }), i.addEventListener("mouseover", () => {
        y();
      }), i.addEventListener("mouseleave", () => {
        _();
      });
    }), onUnmounted(() => {
      i && (i.remove(), i = null);
    }), { placeSpan: s, keepShow: r, hide: f };
  }
}), es = {
  ref: "placeSpan",
  class: "xmv-place-span"
};
function ts(e, t, n, s, a, o) {
  return openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("span", es, null, 512),
    renderSlot(e.$slots, "default")
  ], 64);
}
const wt = /* @__PURE__ */ w(Jn, [["render", ts]]), ns = defineComponent({
  name: "xmvScrollbar",
  props: {
    explicit: { type: Boolean, default: false },
    maxHeightFlag: { type: Boolean, default: false },
    maxHeight: { type: Number, default: 274 },
    height: { type: Number }
  },
  emits: ["scroll"],
  setup(e, t) {
    const n = ref(null), s = ref(null), a = ref(null), o = ref(null), l = ref(null), i = nn("64.0.0"), r = ref(false), u = inject("Xmv-Bubbling");
    var c, v, y, _, f, g = null, $ = null, k = false, x = false, b = false, R, L, z, j, ne;
    const oe = computed(() => {
      let de = {};
      return e.height != null && (de.height = e.height + "px"), de;
    }), G = () => {
      if (!n.value)
        return false;
      z = ye(n.value), j = ye(a.value), _ = (z.w / j.sw).toFixed(3), f = (z.h / j.h).toFixed(3), ue(), U(), pe();
    }, he = () => {
      if (y == "mouseover")
        return false;
      y = "mouseover", G();
    }, ge = () => {
      if (k && x || k && b)
        return false;
      P();
    }, H = () => {
      b = true;
    }, N = () => {
      b = false;
    }, B = (de, _e) => {
      u.status = false, ne = de, Kt(), k = true, x = true, z = ye(n.value), j = ye(a.value), _ = (z.w / j.sw).toFixed(3), f = (z.h / j.h).toFixed(3), g = _e.pageX, $ = _e.pageY, R = ht(l.value), L = ht(o.value), window.addEventListener("mouseup", I), window.addEventListener("mousemove", Y);
    }, Y = (de) => {
      de.preventDefault();
      let { pageX: _e, pageY: Se } = de, fe = Se - $, Ce = _e - g, we = (parseFloat(R[5]) + parseFloat(fe)).toFixed(1), O = (parseFloat(L[4]) + parseFloat(Ce)).toFixed(1);
      we < 0 && (we = 0), O < 0 && (O = 0);
      let le = we / f, ve = O / _;
      le > j.h - z.h && (le = j.h - z.h, we = le * f), ve > j.sw - z.w && (ve = j.sw - z.w, O = ve * _), ne == "ver" ? (pt(l.value, [1, 0, 0, 1, 0, we]), s.value.scrollTop = le) : ne == "hor" && (pt(o.value, [1, 0, 0, 1, O, 0]), s.value.scrollLeft = ve);
    }, I = () => {
      u.status = true, x = false, P(), window.removeEventListener("mouseup", I), window.removeEventListener("mousemove", Y);
    }, X = () => {
      k = true, pe(), t.emit("scroll", {
        hor: s.value.scrollLeft,
        ver: s.value.scrollTop
      });
    }, P = () => {
      y = "", _ = null, f = null, g = null, $ = null, k = false, R = null, L = null, z = null, j = null, c.style.display = "none", v.style.display = "none", ne = "";
    }, se = (de, _e = "ver") => {
      _e == "ver" && (s.value.scrollTop = de);
    }, ue = () => {
      c.style.display = j.sw > z.w ? "" : "none", v.style.display = j.h > z.h ? "" : "none";
    }, U = () => {
      o.value.style.width = z.w * _ + "px", l.value.style.height = z.h * f + "px";
    }, pe = () => {
      let de = s.value.scrollTop, _e = s.value.scrollLeft;
      l.value.style.transform = `matrix(1, 0, 0, 1, 0, ${de * f})`, o.value.style.transform = `matrix(1, 0, 0, 1, ${_e * _} ,0)`;
    }, ye = (de, _e = { ver: 0, hor: 0 }) => ({ w: de.clientWidth, h: de.clientHeight + _e.ver, sw: de.scrollWidth }), ke = computed(() => {
      let de = new Object();
      return i && (de["margin-right"] = "-17px", de["margin-bottom"] = "0px"), e.maxHeightFlag && (de["max-height"] = e.maxHeight + "px"), de;
    });
    return onMounted(() => {
      c = o.value.parentNode, v = l.value.parentNode, ct(a.value, () => {
        P();
      }), e.explicit && i && (a.value.style.width = n.value.scrollWidth - 17 + "px");
    }), {
      handleMouseover: he,
      handleMouseleave: ge,
      hanleScroll: X,
      handleMousedown: B,
      handleWrapMousedown: H,
      handleWrapMouseup: N,
      scroll: se,
      computedScrollbarStyle: oe,
      scrollbarRef: n,
      viewRef: a,
      horThumbRef: o,
      verThumRef: l,
      scrollbarWrapRef: s,
      isPolyfill: i,
      isMargin: r,
      scrollbarWrapStyle: ke
    };
  }
}), ss = {
  class: "xmv-scrollbar__view",
  ref: "viewRef"
}, as = { class: "xmv-scrollbar__bar is-vertical" };
function os(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("div", {
    class: "xmv-scrollbar",
    style: normalizeStyle(e.computedScrollbarStyle),
    onMouseover: t[5] || (t[5] = (...l) => e.handleMouseover && e.handleMouseover(...l)),
    onMouseleave: t[6] || (t[6] = (...l) => e.handleMouseleave && e.handleMouseleave(...l)),
    ref: "scrollbarRef"
  }, [
    createBaseVNode("div", {
      class: "xmv-scrollbar__wrap xmv-scrollbar__wrap--hidden-default",
      onMousedown: t[0] || (t[0] = (...l) => e.handleWrapMousedown && e.handleWrapMousedown(...l)),
      onMouseup: t[1] || (t[1] = (...l) => e.handleWrapMouseup && e.handleWrapMouseup(...l)),
      onScroll: t[2] || (t[2] = (...l) => e.hanleScroll && e.hanleScroll(...l)),
      style: normalizeStyle(e.scrollbarWrapStyle),
      ref: "scrollbarWrapRef"
    }, [
      createBaseVNode("div", ss, [
        renderSlot(e.$slots, "default")
      ], 512)
    ], 36),
    createBaseVNode("div", {
      class: "xmv-scrollbar__bar is-horizontal",
      style: normalizeStyle({ opacity: e.isPolyfill ? "0" : "", height: e.isPolyfill ? "0" : "" })
    }, [
      createBaseVNode("div", {
        class: "xmv-scrollbar__thumb",
        ref: "horThumbRef",
        onMousedown: t[3] || (t[3] = withModifiers((l) => e.handleMousedown("hor", l), ["stop"]))
      }, null, 544)
    ], 4),
    createBaseVNode("div", as, [
      createBaseVNode("div", {
        class: "xmv-scrollbar__thumb",
        ref: "verThumRef",
        onMousedown: t[4] || (t[4] = withModifiers((l) => e.handleMousedown("ver", l), ["stop"]))
      }, null, 544)
    ])
  ], 36);
}
const ls = /* @__PURE__ */ w(ns, [["render", os]]);
class is {
  constructor(t) {
    this.rctData = reactive({
      header: [],
      data: [],
      tableWidth: ""
    }), this.checkboxHeader, this.option = t, this.automatic, this.parentEl, this.tableRef, this.$on, this.$emit, this.hasChildren = ref(false);
  }
  init() {
    this.checkboxHeader = qe(this.rctData.header, (t) => t.type == "checkbox"), this.__setAutomatic(), this.layout();
  }
  layout() {
    let t = this;
    this.automatic ? (this.parentEl = this.tableRef.value.parentNode, this.__handleAutomatic(), ct(t.parentEl, () => {
      t.__handleAutomatic();
    })) : this.__handleFixed();
  }
  checkAll(t) {
    this.rctData.data.forEach((n) => {
      n.checked = t;
    });
  }
  checkSingle() {
    let t = Fe(this.rctData.data, (n) => !n.checked);
    this.checkboxHeader.checked = F(t);
  }
  insertData(t, n) {
    this.rctData.data.splice(t, 0, n);
  }
  deleteData(t) {
    this.rctData.data.splice(t, 1);
  }
  createIndex(t, n = 0, s = 0) {
    let a = 0, o = 0;
    t.forEach((l) => {
      n == 0 ? (l.xmvIndex = a, l.xmvSortIndex = o) : l.xmvChildrenIndex = s + "-" + o, l.xmvDepth = n, l.xmvExpandData || a++, o++, F(l.children) || this.createIndex(l.children, n + 1, l.xmvChildrenIndex ? l.xmvChildrenIndex : o - 1);
    });
  }
  __setAutomatic() {
    const t = this.rctData.header;
    let n = false;
    t.forEach((s) => {
      s.width || (s.automatic = true, n = true);
    }), this.automatic = n;
  }
  __handleAutomatic() {
    let t = this.parentEl.clientWidth;
    const n = this.rctData.header, s = n.filter((r) => !r.automatic), a = n.filter((r) => r.automatic);
    let o = 0;
    s.forEach((r) => {
      o += parseInt(r.width);
    });
    let i = (t - o) / a.length;
    i <= 100 && (i = 100), a.forEach((r) => {
      r.width = i;
    }), this.__handleFixed();
  }
  __handleFixed() {
    const t = this.rctData.header;
    let n = 0;
    t.forEach((s) => {
      let a;
      s.width && (a = parseInt(s.width)), n += a;
    }), this.rctData.tableWidth = n;
  }
}
const rs = defineComponent({
  name: "xmvTableTh",
  props: {
    data: Object
  },
  setup(e, t) {
    const n = inject("TableMode"), s = ref(null), a = computed(() => {
      let _ = [];
      return _.push(s.value), e.data.sortable != null && _.push("is-sortable"), e.data.fixed != null && _.push("xmv-table-fixed-column--" + (e.data.fixed == "" ? "left" : e.data.fixed)), e.data.type == "checkbox" && _.push("xmv-table-column--selection"), _;
    }), o = () => {
      if (e.data.sortable == null)
        return false;
      s.value == "ascending" ? s.value = "descending" : s.value == "descending" ? s.value = "" : s.value = "ascending", r(e.data.prop);
    }, l = () => {
      if (e.data.sortable == null)
        return false;
      s.value == "ascending" ? s.value = "" : s.value = "ascending", r(e.data.prop);
    }, i = () => {
      if (e.data.sortable == null)
        return false;
      s.value == "descending" ? s.value = "" : s.value = "descending", r(e.data.prop);
    }, r = (_) => {
      let f = v(_);
      s.value == "" && (_ = "xmvSortIndex", f = "number"), n.rctData.data.sort((g, $) => {
        if (f == "string")
          return c(g, $, _);
        if (f == "number")
          return u(g, $, _);
      }), s.value == "descending" && n.rctData.data.reverse();
    }, u = (_, f, g) => _[g] < f[g] ? -1 : _[g] > f[g] ? 1 : 0, c = (_, f, g) => _[g].localeCompare(f[g]), v = (_) => n.rctData.data.length != 0 ? typeof n.rctData.data[0][_] : "string";
    return { computeThClass: a, handleThClick: o, handleAscClick: l, handleDescClick: i, handleCheck: (_) => {
      n.checkAll(_);
    }, sortAD: s };
  }
}), ds = { class: "cell" }, us = {
  key: 0,
  class: "caret-wrapper"
};
function cs(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-checkbox");
  return openBlock(), createElementBlock("th", {
    class: normalizeClass(["xmv-table__cell", e.computeThClass]),
    onClick: t[3] || (t[3] = (...i) => e.handleThClick && e.handleThClick(...i))
  }, [
    createBaseVNode("div", ds, [
      createTextVNode(toDisplayString(e.data.label) + " ", 1),
      e.data.sortable != null ? (openBlock(), createElementBlock("span", us, [
        createBaseVNode("i", {
          class: "sort-caret ascending",
          onClick: t[0] || (t[0] = withModifiers((...i) => e.handleAscClick && e.handleAscClick(...i), ["stop"]))
        }),
        createBaseVNode("i", {
          class: "sort-caret descending",
          onClick: t[1] || (t[1] = withModifiers((...i) => e.handleDescClick && e.handleDescClick(...i), ["stop"]))
        })
      ])) : createCommentVNode("", true),
      e.data.type == "checkbox" ? (openBlock(), createBlock(l, {
        key: 1,
        onCheck: e.handleCheck,
        modelValue: e.data.checked,
        "onUpdate:modelValue": t[2] || (t[2] = (i) => e.data.checked = i)
      }, null, 8, ["onCheck", "modelValue"])) : createCommentVNode("", true)
    ])
  ], 2);
}
const ms = /* @__PURE__ */ w(rs, [["render", cs]]), hs = defineComponent({
  name: "xmvTableHeader",
  components: { xmvTableTh: ms },
  setup(e, t) {
    return { tableMode: inject("TableMode"), handleThClick: () => {
    } };
  }
}), ps = ["width"], fs = { class: "" }, vs = { class: "" };
function gs(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-table-th");
  return openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("colgroup", null, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(e.tableMode.rctData.header, (i) => (openBlock(), createElementBlock("col", {
        width: i.width
      }, null, 8, ps))), 256))
    ]),
    createBaseVNode("thead", fs, [
      createBaseVNode("tr", vs, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(e.tableMode.rctData.header, (i) => (openBlock(), createBlock(l, { data: i }, null, 8, ["data"]))), 256))
      ])
    ])
  ], 64);
}
const _s = /* @__PURE__ */ w(hs, [["render", gs]]), $s = defineComponent({
  name: "xmvCheckbox",
  emits: ["check", "update:modelValue"],
  props: {
    disabled: Boolean,
    label: String,
    checkStatus: Boolean,
    indeterminateStatus: Boolean,
    modelValue: Boolean,
    size: String
  },
  setup(e, t) {
    const n = ref(null), s = ref(false), a = ref(false), o = ref(e.disabled), { $on: l, $emit: i } = inject("EventBus", { $on: () => {
    }, $emit: () => {
    } }), r = () => {
      if (o.value)
        return false;
      s.value = !s.value, i("checkClick", { status: s.value, label: e.label }), t.emit("update:modelValue", s.value), t.emit("check", s.value);
    }, u = computed(() => e.label != null);
    return l("setVal", (c) => {
      s.value = c.includes(e.label);
    }), l("setDisabled", (c) => {
      s.value || (o.value = c);
    }), watch(s, (c) => {
      s.value ? n.value.setAttribute("checked", "") : n.value.removeAttribute("checked");
    }), watch(() => e.checkStatus, (c) => {
      s.value = c;
    }), watch(() => e.indeterminateStatus, (c) => {
      a.value = c;
    }), watch(() => e.modelValue, (c) => {
      s.value = c;
    }), onMounted(() => {
      e.modelValue != null && (s.value = e.modelValue);
    }), { isChecked: s, isIndeterminate: a, disabled: o, inputRef: n, handleClick: r, computeLabelShow: u };
  }
}), bs = ["value"], xs = /* @__PURE__ */ createBaseVNode("span", { class: "xmv-checkbox__inner" }, null, -1), ys = {
  key: 0,
  class: "xmv-checkbox__label"
};
function Cs(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["xmv-checkbox", {
      "is-checked": e.isChecked,
      "is-disabled": e.disabled,
      "xmv-checkbox--large": e.size == "large",
      "xmv-checkbox--small": e.size == "small"
    }]),
    onClick: t[0] || (t[0] = withModifiers((...l) => e.handleClick && e.handleClick(...l), ["stop"]))
  }, [
    createBaseVNode("span", {
      class: normalizeClass(["xmv-checkbox__input", {
        "is-checked": e.isChecked,
        "is-disabled": e.disabled,
        "is-indeterminate": e.isIndeterminate
      }])
    }, [
      createBaseVNode("input", {
        type: "checkbox",
        class: "xmv-checkbox__original",
        value: e.label,
        ref: "inputRef"
      }, null, 8, bs),
      xs
    ], 2),
    e.computeLabelShow ? (openBlock(), createElementBlock("span", ys, [
      renderSlot(e.$slots, "default")
    ])) : createCommentVNode("", true)
  ], 2);
}
const st = /* @__PURE__ */ w($s, [["render", Cs]]), ws = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), ks = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, Ms = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
}, null, -1), Ss = [
  Ms
];
function Ds(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", ks, Ss);
}
const Rs = /* @__PURE__ */ w(ws, [["render", Ds]]), Ls = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), Ts = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, Es = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"
}, null, -1), As = [
  Es
];
function Vs(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", Ts, As);
}
const Bs = /* @__PURE__ */ w(Ls, [["render", Vs]]), Is = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), Ns = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, zs = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
}, null, -1), Ps = [
  zs
];
function Os(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", Ns, Ps);
}
const Hs = /* @__PURE__ */ w(Is, [["render", Os]]), Ws = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), js = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, Ys = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z"
}, null, -1), Fs = [
  Ys
];
function Xs(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", js, Fs);
}
const Us = /* @__PURE__ */ w(Ws, [["render", Xs]]), qs = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), Gs = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, Zs = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
}, null, -1), Qs = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
}, null, -1), Ks = [
  Zs,
  Qs
];
function Js(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", Gs, Ks);
}
const ea = /* @__PURE__ */ w(qs, [["render", Js]]), ta = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), na = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, sa = /* @__PURE__ */ createBaseVNode("path", { d: "M994.5,964.5H29.5A29.5,29.5,0,0,0,0,994v1a29.5,29.5,0,0,0,29.5,29.5h965A29.5,29.5,0,0,0,1024,995v-1a29.5,29.5,0,0,0-29.5-29.5Z" }, null, -1), aa = /* @__PURE__ */ createBaseVNode("path", { d: "M942.16,329A22.13,22.13,0,0,1,964,350.84V825.16A22.13,22.13,0,0,1,942.16,847H806.84A22.13,22.13,0,0,1,785,825.16V350.84A22.13,22.13,0,0,1,806.84,329H942.16m0-60H806.84A82.08,82.08,0,0,0,725,350.84V825.16A82.08,82.08,0,0,0,806.84,907H942.16A82.08,82.08,0,0,0,1024,825.16V350.84A82.08,82.08,0,0,0,942.16,269Z" }, null, -1), oa = /* @__PURE__ */ createBaseVNode("path", { d: "M217.16,329A22.13,22.13,0,0,1,239,350.84V825.16A22.13,22.13,0,0,1,217.16,847H81.84A22.13,22.13,0,0,1,60,825.16V350.84A22.13,22.13,0,0,1,81.84,329H217.16m0-60H81.84A82.08,82.08,0,0,0,0,350.84V825.16A82.08,82.08,0,0,0,81.84,907H217.16A82.08,82.08,0,0,0,299,825.16V350.84A82.08,82.08,0,0,0,217.16,269Z" }, null, -1), la = /* @__PURE__ */ createBaseVNode("path", { d: "M585.16,60A22.13,22.13,0,0,1,607,81.84V825.16A22.13,22.13,0,0,1,585.16,847H449.84A22.13,22.13,0,0,1,428,825.16V81.84A22.13,22.13,0,0,1,449.84,60H585.16m0-60H449.84A82.08,82.08,0,0,0,368,81.84V825.16A82.08,82.08,0,0,0,449.84,907H585.16A82.08,82.08,0,0,0,667,825.16V81.84A82.08,82.08,0,0,0,585.16,0Z" }, null, -1), ia = [
  sa,
  aa,
  oa,
  la
];
function ra(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", na, ia);
}
const da = /* @__PURE__ */ w(ta, [["render", ra]]), ua = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), ca = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, ma = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
}, null, -1), ha = [
  ma
];
function pa(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", ca, ha);
}
const fa = /* @__PURE__ */ w(ua, [["render", pa]]), va = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), ga = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, _a = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
}, null, -1), $a = [
  _a
];
function ba(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", ga, $a);
}
const xa = /* @__PURE__ */ w(va, [["render", ba]]), ya = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), Ca = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, wa = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
}, null, -1), ka = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752l265.344-265.408z"
}, null, -1), Ma = [
  wa,
  ka
];
function Sa(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", Ca, Ma);
}
const Da = /* @__PURE__ */ w(ya, [["render", Sa]]), Ra = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), La = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, Ta = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"
}, null, -1), Ea = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
}, null, -1), Aa = [
  Ta,
  Ea
];
function Va(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", La, Aa);
}
const Ba = /* @__PURE__ */ w(Ra, [["render", Va]]), Ia = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), Na = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, za = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
}, null, -1), Pa = [
  za
];
function Oa(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", Na, Pa);
}
const Ha = /* @__PURE__ */ w(Ia, [["render", Oa]]), Wa = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), ja = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, Ya = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M128 384v512h768V192H768v32a32 32 0 1 1-64 0v-32H320v32a32 32 0 0 1-64 0v-32H128v128h768v64H128zm192-256h384V96a32 32 0 1 1 64 0v32h160a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h160V96a32 32 0 0 1 64 0v32zm-32 384h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64z"
}, null, -1), Fa = [
  Ya
];
function Xa(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", ja, Fa);
}
const Ua = /* @__PURE__ */ w(Wa, [["render", Xa]]), qa = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), Ga = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, Za = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
}, null, -1), Qa = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M480 256a32 32 0 0 1 32 32v256a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32z"
}, null, -1), Ka = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M480 512h256q32 0 32 32t-32 32H480q-32 0-32-32t32-32z"
}, null, -1), Ja = [
  Za,
  Qa,
  Ka
];
function eo(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", Ga, Ja);
}
const to = /* @__PURE__ */ w(qa, [["render", eo]]), no = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), so = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, ao = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M832 384H576V128H192v768h640V384zm-26.496-64L640 154.496V320h165.504zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm160 448h384v64H320v-64zm0-192h160v64H320v-64zm0 384h384v64H320v-64z"
}, null, -1), oo = [
  ao
];
function lo(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", so, oo);
}
const io = /* @__PURE__ */ w(no, [["render", lo]]), ro = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), uo = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, co = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M529.408 149.376a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L259.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L197.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224zm256 0a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L515.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L453.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224z"
}, null, -1), mo = [
  co
];
function ho(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", uo, mo);
}
const po = /* @__PURE__ */ w(ro, [["render", ho]]), fo = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), vo = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, go = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M452.864 149.312a29.12 29.12 0 0 1 41.728.064L826.24 489.664a32 32 0 0 1 0 44.672L494.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L764.736 512 452.864 192a30.592 30.592 0 0 1 0-42.688zm-256 0a29.12 29.12 0 0 1 41.728.064L570.24 489.664a32 32 0 0 1 0 44.672L238.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L508.736 512 196.864 192a30.592 30.592 0 0 1 0-42.688z"
}, null, -1), _o = [
  go
];
function $o(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", vo, _o);
}
const bo = /* @__PURE__ */ w(fo, [["render", $o]]), xo = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), yo = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, Co = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
}, null, -1), wo = [
  Co
];
function ko(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", yo, wo);
}
const Mo = /* @__PURE__ */ w(xo, [["render", ko]]), So = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), Do = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, Ro = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm384-253.696 236.288-236.352 45.248 45.248L508.8 704 192 387.2l45.248-45.248L480 584.704V128h64v450.304z"
}, null, -1), Lo = [
  Ro
];
function To(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", Do, Lo);
}
const Eo = /* @__PURE__ */ w(So, [["render", To]]), Ao = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), Vo = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, Bo = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640V512z"
}, null, -1), Io = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"
}, null, -1), No = [
  Bo,
  Io
];
function zo(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", Vo, No);
}
const Po = /* @__PURE__ */ w(Ao, [["render", zo]]), Oo = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), Ho = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
};
function Wo(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", Ho);
}
const jo = /* @__PURE__ */ w(Oo, [["render", Wo]]), Yo = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), Fo = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, Xo = /* @__PURE__ */ createBaseVNode("path", {
  d: "M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2L371.2 588.8ZM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z",
  fill: "currentColor"
}, null, -1), Uo = /* @__PURE__ */ createBaseVNode("path", {
  d: "M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z",
  fill: "currentColor"
}, null, -1), qo = [
  Xo,
  Uo
];
function Go(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", Fo, qo);
}
const Zo = /* @__PURE__ */ w(Yo, [["render", Go]]), Qo = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), Ko = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, Jo = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64zm67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344zM590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"
}, null, -1), el = [
  Jo
];
function tl(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", Ko, el);
}
const nl = /* @__PURE__ */ w(Qo, [["render", tl]]), sl = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), al = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, ol = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
}, null, -1), ll = [
  ol
];
function il(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", al, ll);
}
const rl = /* @__PURE__ */ w(sl, [["render", il]]), dl = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), ul = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, cl = /* @__PURE__ */ createBaseVNode("path", { d: "M977.92,931.84H92.16V46.08A46.08,46.08,0,0,0,0,46.08V977.92A46.08,46.08,0,0,0,46.08,1024H977.92a46.08,46.08,0,1,0,0-92.16Z" }, null, -1), ml = /* @__PURE__ */ createBaseVNode("path", { d: "M235.11,768.11,508.19,573.44H681a45.84,45.84,0,0,0,30.81-11.89c.26-.17.53-.31.78-.5L993.41,360.84a46.08,46.08,0,1,0-53.49-75L665.69,481.28H496.64a45.83,45.83,0,0,0-20.92,5.06,46,46,0,0,0-13.25,6.51L181.61,693.06a46.08,46.08,0,0,0,53.5,75.05Z" }, null, -1), hl = [
  cl,
  ml
];
function pl(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", ul, hl);
}
const fl = /* @__PURE__ */ w(dl, [["render", pl]]), vl = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), gl = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, _l = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M176 416a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224z"
}, null, -1), $l = [
  _l
];
function bl(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", gl, $l);
}
const xl = /* @__PURE__ */ w(vl, [["render", bl]]), yl = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), Cl = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, wl = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M128 224v512a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V224H128zm0-64h768a64 64 0 0 1 64 64v512a128 128 0 0 1-128 128H192A128 128 0 0 1 64 736V224a64 64 0 0 1 64-64z"
}, null, -1), kl = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M904 224 656.512 506.88a192 192 0 0 1-289.024 0L120 224h784zm-698.944 0 210.56 240.704a128 128 0 0 0 192.704 0L818.944 224H205.056z"
}, null, -1), Ml = [
  wl,
  kl
];
function Sl(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", Cl, Ml);
}
const Dl = /* @__PURE__ */ w(yl, [["render", Sl]]), Rl = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), Ll = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, Tl = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z"
}, null, -1), El = [
  Tl
];
function Al(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", Ll, El);
}
const Vl = /* @__PURE__ */ w(Rl, [["render", Al]]), Bl = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), Il = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, Nl = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M448 68.48v64.832A384.128 384.128 0 0 0 512 896a384.128 384.128 0 0 0 378.688-320h64.768A448.128 448.128 0 0 1 64 512 448.128 448.128 0 0 1 448 68.48z"
}, null, -1), zl = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M576 97.28V448h350.72A384.064 384.064 0 0 0 576 97.28zM512 64V33.152A448 448 0 0 1 990.848 512H512V64z"
}, null, -1), Pl = [
  Nl,
  zl
];
function Ol(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", Il, Pl);
}
const Hl = /* @__PURE__ */ w(Bl, [["render", Ol]]), Wl = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), jl = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, Yl = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
}, null, -1), Fl = [
  Yl
];
function Xl(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", jl, Fl);
}
const Ul = /* @__PURE__ */ w(Wl, [["render", Xl]]), ql = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), Gl = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, Zl = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M160 160v704h704V160H160zm-32-64h768a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H128a32 32 0 0 1-32-32V128a32 32 0 0 1 32-32z"
}, null, -1), Ql = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M384 288q64 0 64 64t-64 64q-64 0-64-64t64-64zM185.408 876.992l-50.816-38.912L350.72 556.032a96 96 0 0 1 134.592-17.856l1.856 1.472 122.88 99.136a32 32 0 0 0 44.992-4.864l216-269.888 49.92 39.936-215.808 269.824-.256.32a96 96 0 0 1-135.04 14.464l-122.88-99.072-.64-.512a32 32 0 0 0-44.8 5.952L185.408 876.992z"
}, null, -1), Kl = [
  Zl,
  Ql
];
function Jl(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", Gl, Kl);
}
const ei = /* @__PURE__ */ w(ql, [["render", Jl]]), ti = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), ni = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, si = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M771.776 794.88A384 384 0 0 1 128 512h64a320 320 0 0 0 555.712 216.448H654.72a32 32 0 1 1 0-64h149.056a32 32 0 0 1 32 32v148.928a32 32 0 1 1-64 0v-50.56zM276.288 295.616h92.992a32 32 0 0 1 0 64H220.16a32 32 0 0 1-32-32V178.56a32 32 0 0 1 64 0v50.56A384 384 0 0 1 896.128 512h-64a320 320 0 0 0-555.776-216.384z"
}, null, -1), ai = [
  si
];
function oi(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", ni, ai);
}
const li = /* @__PURE__ */ w(ti, [["render", oi]]), ii = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), ri = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, di = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M289.088 296.704h92.992a32 32 0 0 1 0 64H232.96a32 32 0 0 1-32-32V179.712a32 32 0 0 1 64 0v50.56a384 384 0 0 1 643.84 282.88 384 384 0 0 1-383.936 384 384 384 0 0 1-384-384h64a320 320 0 1 0 640 0 320 320 0 0 0-555.712-216.448z"
}, null, -1), ui = [
  di
];
function ci(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", ri, ui);
}
const mi = /* @__PURE__ */ w(ii, [["render", ci]]), hi = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), pi = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, fi = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
}, null, -1), vi = [
  fi
];
function gi(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", pi, vi);
}
const _i = /* @__PURE__ */ w(hi, [["render", gi]]), $i = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), bi = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, xi = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"
}, null, -1), yi = [
  xi
];
function Ci(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", bi, yi);
}
const wi = /* @__PURE__ */ w($i, [["render", Ci]]), ki = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), Mi = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, Si = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M384 96a32 32 0 0 1 64 0v786.752a32 32 0 0 1-54.592 22.656L95.936 608a32 32 0 0 1 0-45.312h.128a32 32 0 0 1 45.184 0L384 805.632V96zm192 45.248a32 32 0 0 1 54.592-22.592L928.064 416a32 32 0 0 1 0 45.312h-.128a32 32 0 0 1-45.184 0L640 218.496V928a32 32 0 1 1-64 0V141.248z"
}, null, -1), Di = [
  Si
];
function Ri(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", Mi, Di);
}
const Li = /* @__PURE__ */ w(ki, [["render", Ri]]), Ti = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), Ei = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, Ai = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z"
}, null, -1), Vi = [
  Ai
];
function Bi(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", Ei, Vi);
}
const Ii = /* @__PURE__ */ w(Ti, [["render", Bi]]), Ni = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), zi = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, Pi = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "m512 747.84 228.16 119.936a6.4 6.4 0 0 0 9.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 0 0-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 0 0-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 0 0-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 0 0 9.28 6.72L512 747.84zM313.6 924.48a70.4 70.4 0 0 1-102.144-74.24l37.888-220.928L88.96 472.96A70.4 70.4 0 0 1 128 352.896l221.76-32.256 99.2-200.96a70.4 70.4 0 0 1 126.208 0l99.2 200.96 221.824 32.256a70.4 70.4 0 0 1 39.04 120.064L774.72 629.376l37.888 220.928a70.4 70.4 0 0 1-102.144 74.24L512 820.096l-198.4 104.32z"
}, null, -1), Oi = [
  Pi
];
function Hi(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", zi, Oi);
}
const Wi = /* @__PURE__ */ w(Ni, [["render", Hi]]), ji = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), Yi = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, Fi = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
}, null, -1), Xi = [
  Fi
];
function Ui(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", Yi, Xi);
}
const qi = /* @__PURE__ */ w(ji, [["render", Ui]]), Gi = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), Zi = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, Qi = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm384-578.304V704h-64V247.296L237.248 490.048 192 444.8 508.8 128l316.8 316.8-45.312 45.248L544 253.696z"
}, null, -1), Ki = [
  Qi
];
function Ji(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", Zi, Ki);
}
const er = /* @__PURE__ */ w(Gi, [["render", Ji]]), tr = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), nr = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, sr = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M544 864V672h128L512 480 352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0 1 64 624c0-123.136 93.12-223.488 212.608-237.248A239.808 239.808 0 0 1 512 192a239.872 239.872 0 0 1 235.456 194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 0 1-240 240c-5.376 0-10.56-1.28-16-1.6v1.6H544z"
}, null, -1), ar = [
  sr
];
function or(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", nr, ar);
}
const lr = /* @__PURE__ */ w(tr, [["render", or]]), ir = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), rr = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, dr = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"
}, null, -1), ur = [
  dr
];
function cr(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", rr, ur);
}
const mr = /* @__PURE__ */ w(ir, [["render", cr]]), hr = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), pr = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, fr = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z"
}, null, -1), vr = [
  fr
];
function gr(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", pr, vr);
}
const _r = /* @__PURE__ */ w(hr, [["render", gr]]), $r = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), br = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, xr = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704zm-32-384v-96a32 32 0 0 1 64 0v96h96a32 32 0 0 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64h96z"
}, null, -1), yr = [
  xr
];
function Cr(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", br, yr);
}
const wr = /* @__PURE__ */ w($r, [["render", Cr]]), kr = defineComponent({
  name: "",
  setup(e, t) {
    return {};
  }
}), Mr = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-ea893728": ""
}, Sr = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704zM352 448h256a32 32 0 0 1 0 64H352a32 32 0 0 1 0-64z"
}, null, -1), Dr = [
  Sr
];
function Rr(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("svg", Mr, Dr);
}
const Lr = /* @__PURE__ */ w(kr, [["render", Rr]]), Tr = defineComponent({
  name: "xmvIcon",
  components: {
    arrowLeft: Bs,
    arrowRight: Hs,
    arrowUp: Us,
    arrowDown: Rs,
    back: ea,
    barChart: da,
    calendar: Ua,
    check: fa,
    clock: to,
    close: xa,
    circleCheck: Da,
    circleClose: Ba,
    circleCloseFilled: Ha,
    dArrowLeft: po,
    dArrowRight: bo,
    download: Eo,
    dlt: Mo,
    document: io,
    edit: Po,
    empty: jo,
    hide: Zo,
    infoFilled: nl,
    lineChart: fl,
    loading: rl,
    message: Dl,
    minus: Vl,
    moreFilled: xl,
    plus: Ul,
    pieChart: Hl,
    pic: ei,
    refresh: li,
    refreshLeft: mi,
    refreshRight: _i,
    sort: Li,
    setting: Ii,
    search: wi,
    successFilled: qi,
    star: Wi,
    upload: er,
    uploadFilled: lr,
    vew: mr,
    warningFilled: _r,
    zoomIn: wr,
    zoomOut: Lr
  },
  props: {
    name: String | Object
  },
  setup(e, t) {
    return { tRaw: (s) => toRaw(s) };
  }
}), Er = { class: "xmv-icon" };
function Ar(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("i", Er, [
    typeof e.name == "string" ? (openBlock(), createBlock(resolveDynamicComponent(e.name), { key: 0 })) : (openBlock(), createBlock(resolveDynamicComponent(e.tRaw(e.name)), { key: 1 }))
  ]);
}
const Ve = /* @__PURE__ */ w(Tr, [["render", Ar]]), Vr = defineComponent({
  name: "xmvTableTd",
  props: {
    header: Object,
    data: Object,
    index: Number
  },
  components: { xmvCheckbox: st, xmvIcon: Ve },
  setup(e, t) {
    let n = e.data;
    const s = e.header.slots || {}, a = inject("TableMode"), o = ref("arrowRight"), l = computed(() => {
      let f = [];
      return f.push("xmv-table__cell"), e.header.fixed != null && f.push("xmv-table-fixed-column--" + (e.header.fixed == "" ? "left" : e.header.fixed)), e.data.xmvExpandData && f.push("xmv-table__expanded-cell"), f;
    }), i = computed(() => {
      let f = [];
      return f.push("xmv-table__expand-icon"), e.data.xmvIsExpand && f.push("xmv-table__expand-icon--expanded"), f;
    }), r = computed(() => {
      let f = [];
      return o.value == "loading" && f.push("is-loading"), f;
    }), u = (f) => {
      n.checked = f, a.checkSingle();
    }, c = () => {
      if (e.data.xmvIsExpand = !e.data.xmvIsExpand, e.data.xmvIsExpand) {
        let f = Object.assign({}, e.data, { xmvExpandData: true });
        a.insertData(e.index + 1, f);
      } else
        a.deleteData(e.index + 1);
    }, v = () => {
      if (e.data.xmvIsExpand) {
        e.data.xmvIsExpand = false;
        return;
      }
      a.option.lazy && !e.data.xmvHasLoad ? (o.value = "loading", a.option.load().then((f) => {
        o.value = "arrowRight", e.data.xmvHasLoad = true, e.data.xmvIsExpand = true, e.data.children = f;
      })) : e.data.xmvIsExpand = !e.data.xmvIsExpand;
    }, y = (f) => {
      let g = [];
      return e.data.hasChildren && (a.hasChildren.value = true, a.rctData.header[0] === e.header && g.push(h(
        "div",
        { class: i.value },
        h(Ve, {
          name: o.value,
          onClick: v,
          class: r.value
        })
      ))), e.data.xmvDepth != 0 && a.rctData.header[0] === e.header && g.push(h("span", {
        class: "xmv-table__indent",
        style: { "padding-left": e.data.xmvDepth * 16 + "px" }
      })), a.hasChildren.value && a.rctData.header[0] === e.header && !e.data.hasChildren && g.push(h("span", { class: "xmv-table__placeholder" })), g.push(f), g;
    }, _ = () => {
      let f = [], g = s.default ? s.default({ props: e }) : null;
      if (e.data.xmvExpandData) {
        if (e.header.type == "expand" && g && g.length > 0)
          return g.forEach(($) => {
            f.push(h($));
          }), h("td", {
            class: l.value,
            colspan: a.rctData.header.length
          }, [
            h("div", { class: "cell" }, f)
          ]);
      } else {
        if (e.header.type == "expand")
          return h("td", { class: l.value }, [
            h("div", { class: "cell" }, h(Ve, {
              class: i.value,
              name: "arrowRight",
              onClick: c
            }))
          ]);
        if (g) {
          if (g && g.length > 0)
            return g.forEach(($) => {
              f.push(h($));
            }), h("td", { class: l.value }, [
              h("div", { class: "cell" }, f)
            ]);
        } else
          return e.header.type == "checkbox" ? h("td", { class: l.value }, [
            h("div", { class: "cell" }, h(st, {
              modelValue: n.checked,
              onCheck: u
            }))
          ]) : e.header.type == "index" ? h("td", { class: l.value }, [
            h("div", { class: "cell" }, e.data.xmvIndex + 1)
          ]) : e.header.showOverflowTooltip ? h(
            wt,
            { content: e.data[e.header.prop] },
            { default: () => h(
              "td",
              { class: l.value },
              h("div", { class: "cell xmv-tooltip" }, e.data[e.header.prop])
            ) }
          ) : h("td", { class: l.value }, [
            h("div", { class: "cell" }, y(e.data[e.header.prop]))
          ]);
      }
    };
    return () => _();
  }
});
function Br(e, t, n, s, a, o) {
  return null;
}
const Ir = /* @__PURE__ */ w(Vr, [["render", Br]]), Nr = defineComponent({
  name: "xmvTableTr",
  components: { XmvTableTd: Ir },
  props: {
    data: Object,
    index: Number
  },
  setup({ data: e, index: t }, n) {
    const s = inject("TableMode"), a = ref(false), o = computed(() => {
      let i = [];
      return e.xmvTrStatus && i.push(e.xmvTrStatus + "-row"), s.option.stripe != null && t % 2 != 0 && i.push("xmv-table__row--striped"), e.checked && i.push("current-row"), e.xmvDepth != 0 && i.push("xmv-table__row--level-" + e.xmvDepth), i;
    }), l = () => {
      s.option.highlightCurrentRow && s.$emit("trClick", t);
    };
    return s.$on("trClick", (i) => {
      e.checked = t == i;
    }), { tableMode: s, computeTrClass: o, handleTrClick: l, isExpandTr: a };
  }
});
function zr(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-table-td"), i = resolveComponent("xmv-table-tr");
  return openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("tr", {
      class: normalizeClass(["xmv-table__row", e.computeTrClass]),
      onClick: t[0] || (t[0] = (...r) => e.handleTrClick && e.handleTrClick(...r))
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(e.tableMode.rctData.header, (r) => (openBlock(), createBlock(l, {
        header: r,
        data: e.data,
        index: e.index
      }, null, 8, ["header", "data", "index"]))), 256))
    ], 2),
    e.data.xmvIsExpand ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(e.data.children, (r, u) => (openBlock(), createBlock(i, {
      data: r,
      key: u,
      index: u
    }, null, 8, ["data", "index"]))), 128)) : createCommentVNode("", true)
  ], 64);
}
const Pr = /* @__PURE__ */ w(Nr, [["render", zr]]), Or = defineComponent({
  name: "xmvTableBody",
  components: { XmvTableTr: Pr },
  setup(e, t) {
    return { tableMode: inject("TableMode") };
  }
}), Hr = ["width"];
function Wr(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-table-tr");
  return openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("colgroup", null, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(e.tableMode.rctData.header, (i) => (openBlock(), createElementBlock("col", {
        width: i.width
      }, null, 8, Hr))), 256))
    ]),
    createBaseVNode("tbody", null, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(e.tableMode.rctData.data, (i, r) => (openBlock(), createBlock(l, {
        data: i,
        key: r,
        index: r
      }, null, 8, ["data", "index"]))), 128))
    ])
  ], 64);
}
const jr = /* @__PURE__ */ w(Or, [["render", Wr]]), Yr = defineComponent({
  name: "xmvTable",
  components: { XmvTableHeader: _s, XmvTableBody: jr },
  props: {
    height: { type: String },
    border: String,
    stripe: String,
    maxHeight: String,
    data: Array,
    highlightCurrentRow: Boolean,
    lazy: Boolean,
    load: Function
  },
  setup(e, t) {
    const n = new is(e), s = ref(null), a = ref(null), o = ref(null), l = ref(false), i = ref(0), r = ref(""), u = reactive({
      listeners: {}
    }), { $on: c, $emit: v } = be(u);
    n.tableRef = a, provide("TableMode", n), provide("EventBus", { $on: c, $emit: v }), n.$on = c, n.$emit = v;
    const y = (x) => {
      n.rctData.data = x, n.createIndex(n.rctData.data);
    }, _ = (x) => {
      f(x), s.value.scrollLeft = x.hor;
    }, f = (x = { hor: 0 }) => {
      F(x.hor, true) ? r.value = "left" : a.value.clientWidth + x.hor == n.rctData.tableWidth ? r.value = "right" : r.value = "middle";
    }, g = computed(() => {
      let x = [];
      return e.border != null && x.push("xmv-table--border"), e.stripe != null && x.push("xmv-table--striped"), F(r.value) || x.push("is-scrolling-" + r.value), x;
    }), $ = computed(() => {
      let x = {};
      return e.maxHeight != null && (x["max-height"] = e.maxHeight + "px"), l.value = true, i.value = parseInt(e.maxHeight) - 40, x;
    }), k = computed(() => {
      let x = {};
      return x.height = e.height != null ? e.height + "px" : "auto", e.maxHeight != null && (x["max-height"] = e.maxHeight + "px"), x;
    });
    return watch(() => e.data, (x) => {
      y(x);
    }, { deep: true }), onMounted(() => {
      n.init(), F(e.data) || y(e.data), f();
    }), {
      tableHeaderWrapperRef: s,
      tableRef: a,
      tableMode: n,
      computeTableClass: g,
      computeTableStyle: $,
      computeTableInnerStyle: k,
      scrollBarRef: o,
      scrollMaxHeightFlag: l,
      scrollMaxHeight: i,
      loadData: y,
      handleScroll: _
    };
  }
}), Fr = { class: "hidden-columns" }, Xr = {
  class: "xmv-table__header-wrapper",
  ref: "tableHeaderWrapperRef"
}, Ur = ["width"], qr = { class: "xmv-table__body-wrapper" }, Gr = ["width"], Zr = /* @__PURE__ */ createBaseVNode("div", { class: "xmv-table__column-resize-proxy" }, null, -1);
function Qr(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-table-header"), i = resolveComponent("xmv-table-body"), r = resolveComponent("xmv-scrollbar");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["xmv-table", e.computeTableClass]),
    ref: "tableRef",
    style: normalizeStyle(e.computeTableStyle)
  }, [
    createBaseVNode("div", {
      class: "xmv-table__inner-wrapper",
      style: normalizeStyle(e.computeTableInnerStyle)
    }, [
      createBaseVNode("div", Fr, [
        renderSlot(e.$slots, "default")
      ]),
      createBaseVNode("div", Xr, [
        createBaseVNode("table", {
          class: "xmv-table__header",
          border: "0",
          cellpadding: "0",
          cellspacing: "0",
          width: e.tableMode.rctData.tableWidth + "px"
        }, [
          createVNode(l)
        ], 8, Ur)
      ], 512),
      createBaseVNode("div", qr, [
        createVNode(r, {
          onScroll: e.handleScroll,
          ref: "scrollBarRef",
          maxHeightFlag: e.scrollMaxHeightFlag,
          maxHeight: e.scrollMaxHeight
        }, {
          default: withCtx(() => [
            createBaseVNode("table", {
              class: "xmv-table__body",
              cellpadding: "0",
              cellspacing: "0",
              border: "0",
              width: e.tableMode.rctData.tableWidth + "px"
            }, [
              createVNode(i)
            ], 8, Gr)
          ]),
          _: 1
        }, 8, ["onScroll", "maxHeightFlag", "maxHeight"])
      ])
    ], 4),
    Zr
  ], 6);
}
const Kr = /* @__PURE__ */ w(Yr, [["render", Qr]]), Jr = defineComponent({
  name: "xmvTableColumn",
  props: {
    prop: String,
    label: String,
    width: String,
    sortable: String,
    fixed: String,
    type: String,
    showOverflowTooltip: Boolean
  },
  setup(e, t) {
    const n = inject("TableMode"), s = getCurrentInstance();
    n.rctData.header.push({
      label: e.label,
      prop: e.prop,
      width: e.width,
      sortable: e.sortable,
      slots: s.slots,
      fixed: e.fixed,
      type: e.type,
      showOverflowTooltip: e.showOverflowTooltip
    });
  }
});
function ed(e, t, n, s, a, o) {
  return null;
}
const td = /* @__PURE__ */ w(Jr, [["render", ed]]), nd = defineComponent({
  name: "xmvRow",
  props: {
    gutter: { type: Number, default: 0 },
    justify: { type: String }
  },
  setup(e, t) {
    let n = e.gutter / 2;
    provide("Gutter", n);
    const s = computed(() => n == 0 ? {} : { "margin-left": "-" + n + "px", "margin-right": "-" + n + "px" }), a = computed(() => {
      let o = [];
      return e.justify && o.push("is-justify-" + e.justify), o;
    });
    return { styleObject: s, classObject: a };
  }
});
function sd(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["xmv-row", e.classObject]),
    style: normalizeStyle(e.styleObject)
  }, [
    renderSlot(e.$slots, "default")
  ], 6);
}
const ad = /* @__PURE__ */ w(nd, [["render", sd]]), od = defineComponent({
  name: "xmvCol",
  props: {
    span: { type: Number, default: 24 },
    offset: Number
  },
  setup(e, t) {
    let n = inject("Gutter");
    const s = ["span", "offset"], a = computed(() => {
      let l = [];
      return s.forEach((i) => {
        const r = e[i];
        r && l.push(i !== "span" ? `xmv-col-${i}-${r}` : `xmv-col-${r}`);
      }), n != 0 && l.push("is-guttered"), l;
    }), o = computed(() => n == 0 ? {} : { "padding-left": n + "px", "padding-right": n + "px" });
    return { classList: a, styleObject: o };
  }
});
function ld(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["xmv-col", e.classList]),
    style: normalizeStyle(e.styleObject)
  }, [
    renderSlot(e.$slots, "default")
  ], 6);
}
const id = /* @__PURE__ */ w(od, [["render", ld]]), rd = defineComponent({
  name: "xmvInput",
  emits: ["blur", "input", "clear", "update:modelValue", "iconClick", "focus", "enter"],
  props: {
    disabled: Boolean,
    type: { type: String, default: "text" },
    placeholder: { type: String, default: "请输入" },
    showPassword: Boolean,
    prefixIcon: String | Object,
    suffixIcon: String | Object,
    clearable: Boolean,
    size: String,
    modelValue: String | Number,
    rows: Number,
    autosize: Object,
    step: Number
  },
  setup(e, t) {
    const n = ref(null), s = ref(false), a = ref(null), o = ref(false), l = ref(null), i = ref("hide"), r = ref(e.type), u = ref(false), c = ref(false), v = ref(e.suffixIcon), y = ref(1), _ = ref(null), f = ref(9999), g = computed(() => e.suffixIcon != null || e.clearable || e.showPassword), $ = computed(() => {
      let U = [];
      return e.type != "textarea" ? U.push("xmv-input") : U.push("xmv-textarea"), e.disabled && U.push("is-disabled"), e.size != null && U.push("xmv-input--" + e.size), U;
    }), k = computed(() => {
      if (e.type != "textarea" || e.autosize == null)
        return false;
      let U = {};
      return U["min-height"] = 31 + (y.value - 1) * 21 + "px", U.height = _.value + "px", U;
    }), x = computed(() => e.disabled), b = () => {
      a.value.value && e.clearable && oe(), s.value = true, t.emit("focus");
    }, R = (U) => {
      G(), s.value = false, t.emit("blur", U);
    }, L = () => {
      t.emit("enter");
    }, z = () => {
      a.value.value && e.clearable && oe();
    }, j = () => {
      s.value || G();
    }, ne = () => {
      e.type == "number" && (/^-?\d+(?:\.\d+)?$/.test(a.value.value) || (a.value.value = "", t.emit("input", ""))), (e.clearable || e.showPassword) && (a.value.value ? (e.showPassword && (u.value = true), e.clearable && s.value && oe()) : (u.value = false, G())), e.modelValue != null && (e.type == "textarea" && e.autosize != null && ue(), t.emit("update:modelValue", a.value.value)), t.emit("input", a.value.value);
    }, oe = () => {
      v.value = "circleClose";
    }, G = () => {
      e.suffixIcon != null ? v.value = e.suffixIcon : v.value = "empty";
    }, he = () => {
      a.value.focus();
    }, ge = () => {
      a.value.focus();
    }, H = () => {
      i.value == "hide" ? (i.value = "vew", r.value = "text") : (i.value = "hide", r.value = "password");
    }, N = () => {
      a.value.value = "", ne(), t.emit("clear"), I();
    }, B = () => {
      e.clearable ? N() : t.emit("iconClick", a.value.value);
    }, Y = () => {
      e.prefixIcon != null && (o.value = true);
    }, I = () => {
      a.value.focus();
    }, X = (U) => {
      a.value.value = U, ne();
    }, P = () => a.value.value, se = (U) => {
      a.value.style.width = U + "px";
    };
    Y();
    const ue = () => {
      a.value.style.height = "auto";
      let U = a.value.scrollHeight;
      U >= f.value && (U = f.value), _.value = U;
    };
    return watch(() => e.modelValue, (U) => {
      e.type == "textarea" && e.autosize != null && ue();
    }), watch(() => e.disabled, (U) => {
      U ? a.value.setAttribute("disabled", "") : a.value.removeAttribute("disabled");
    }), onMounted(() => {
      if (Jt && e.prefixIcon != null && e.suffixIcon != null && (a.value.style.width = "1px"), e.type == "textarea" && e.autosize != null) {
        if (typeof e.autosize == "object") {
          let { minRows: U, maxRows: pe } = e.autosize;
          y.value = U, f.value = 31 + (pe - 1) * 21;
        }
        ue();
      }
      e.disabled && a.value.setAttribute("disabled", ""), G();
    }), {
      isFocus: s,
      xmvInputRef: n,
      inputRef: a,
      isShowPrefix: o,
      inputType: r,
      pwdIconName: i,
      pwdShow: u,
      clearShow: c,
      computeClass: $,
      suffixiconRef: l,
      computeDisable: x,
      computeTextareaStyle: k,
      minRowsRef: y,
      textareaHeightRef: _,
      computeShowSuffix: g,
      rightIconName: v,
      handleInputFocus: b,
      handleInputBlur: R,
      handlePrefixClick: he,
      handleSuffixClick: ge,
      handleInputInput: ne,
      handleMouseover: z,
      handleIconPwdClick: H,
      handleIconClearClick: N,
      focus: I,
      val: X,
      setInputWidth: se,
      getVal: P,
      handleRightIconClick: B,
      handleMouseleave: j,
      handleKeyupEnter: L
    };
  }
}), dd = { class: "xmv-input__prefix-inner" }, ud = ["type", "step", "disabled", "placeholder", "value"], cd = ["type", "step", "placeholder"], md = { class: "xmv-input__suffix-inner" }, hd = ["placeholder", "rows", "value"];
function pd(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(e.computeClass),
    ref: "xmvInputRef"
  }, [
    e.type != "textarea" ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(["xmv-input__wrapper", { "is-focus": e.isFocus }]),
      onMouseover: t[9] || (t[9] = (...i) => e.handleMouseover && e.handleMouseover(...i)),
      onMouseleave: t[10] || (t[10] = (...i) => e.handleMouseleave && e.handleMouseleave(...i))
    }, [
      e.isShowPrefix ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: "xmv-input__prefix",
        onClick: t[0] || (t[0] = (...i) => e.handlePrefixClick && e.handlePrefixClick(...i))
      }, [
        createBaseVNode("span", dd, [
          createVNode(l, {
            name: e.prefixIcon,
            class: "xmv-input__icon"
          }, null, 8, ["name"])
        ])
      ])) : createCommentVNode("", true),
      e.modelValue != null ? (openBlock(), createElementBlock("input", {
        key: 1,
        class: "xmv-input__inner",
        type: e.inputType,
        step: e.step,
        autocomplete: "off",
        ref: "inputRef",
        disabled: e.computeDisable,
        placeholder: e.placeholder,
        onFocus: t[1] || (t[1] = (...i) => e.handleInputFocus && e.handleInputFocus(...i)),
        onBlur: t[2] || (t[2] = (...i) => e.handleInputBlur && e.handleInputBlur(...i)),
        onKeyup: t[3] || (t[3] = withKeys((...i) => e.handleKeyupEnter && e.handleKeyupEnter(...i), ["enter"])),
        onInput: t[4] || (t[4] = (...i) => e.handleInputInput && e.handleInputInput(...i)),
        value: e.modelValue
      }, null, 40, ud)) : (openBlock(), createElementBlock("input", {
        key: 2,
        class: "xmv-input__inner",
        type: e.inputType,
        step: e.step,
        autocomplete: "off",
        ref: "inputRef",
        placeholder: e.placeholder,
        onFocus: t[5] || (t[5] = (...i) => e.handleInputFocus && e.handleInputFocus(...i)),
        onBlur: t[6] || (t[6] = (...i) => e.handleInputBlur && e.handleInputBlur(...i)),
        onInput: t[7] || (t[7] = (...i) => e.handleInputInput && e.handleInputInput(...i))
      }, null, 40, cd)),
      e.computeShowSuffix ? (openBlock(), createElementBlock("span", {
        key: 3,
        class: "xmv-input__suffix",
        onClick: t[8] || (t[8] = (...i) => e.handleSuffixClick && e.handleSuffixClick(...i))
      }, [
        createBaseVNode("span", md, [
          e.pwdShow ? (openBlock(), createBlock(l, {
            key: 0,
            name: e.pwdIconName,
            class: "xmv-input__icon",
            onMouseup: e.handleIconPwdClick
          }, null, 8, ["name", "onMouseup"])) : createCommentVNode("", true),
          e.suffixIcon != null || e.clearable ? (openBlock(), createBlock(l, {
            key: 1,
            name: e.rightIconName,
            class: "xmv-input__icon",
            ref: "suffixiconRef",
            onMouseup: e.handleRightIconClick
          }, null, 8, ["name", "onMouseup"])) : createCommentVNode("", true)
        ])
      ])) : createCommentVNode("", true)
    ], 34)) : (openBlock(), createElementBlock("textarea", {
      key: 1,
      class: "xmv-textarea__inner",
      placeholder: e.placeholder,
      rows: e.rows,
      style: normalizeStyle(e.computeTextareaStyle),
      value: e.modelValue,
      ref: "inputRef",
      onInput: t[11] || (t[11] = (...i) => e.handleInputInput && e.handleInputInput(...i))
    }, null, 44, hd))
  ], 2);
}
const kt = /* @__PURE__ */ w(rd, [["render", pd]]), fd = defineComponent({
  name: "xmvInputNumber",
  emits: ["inputChange", "update:modelValue"],
  props: {
    modelValue: [Number, String],
    step: { type: Number, default: 1 },
    stepStrictly: { type: Boolean, default: false },
    min: { type: Number },
    max: { type: Number },
    precision: { type: Number, default: 0 },
    controlsPosition: String,
    size: String,
    disabled: { type: Boolean, default: false }
  },
  setup(e, t) {
    const n = ref(1 / Math.pow(10, e.precision)), s = ref(null), a = ref(false), o = ref(false), l = ref(e.disabled), i = computed(() => {
      let f = [];
      return e.size != null && f.push("xmv-input-number--" + e.size), e.controlsPosition != null && f.push("is-controls-" + e.controlsPosition), l.value && f.push("is-disabled"), f;
    }), r = () => {
      if (l.value)
        return false;
      s.value.val(e.modelValue - e.step);
    }, u = () => {
      if (l.value)
        return false;
      s.value.val(e.modelValue + e.step);
    }, c = () => {
      if (e.stepStrictly) {
        let f = s.value.getVal();
        f % e.step != 0 && (f = Math.floor(f / e.step) * e.step, s.value.val(f), t.emit("update:modelValue", f), t.emit("inputChange", f));
      }
    }, v = (f) => {
      if (F(f))
        return t.emit("update:modelValue", ""), false;
      f = parseFloat(parseFloat(f).toFixed(e.precision)), (f < e.min || f > e.max) && (F(e.modelValue) ? f = e.min : f = e.modelValue, s.value.val(f)), t.emit("update:modelValue", f), t.emit("inputChange", f);
    }, y = (f) => {
      a.value = f <= e.min, o.value = f >= e.max;
    };
    watch(() => e.modelValue, (f) => {
      _(f);
    }), watch(() => e.disabled, (f) => {
      l.value = f;
    });
    const _ = (f) => {
      s.value.val(f), y(f);
    };
    return onMounted(() => {
      _(e.modelValue);
    }), {
      inputRef: s,
      inputStep: n,
      decreaseDisabled: a,
      increaseDisabled: o,
      computeClass: i,
      isDisabled: l,
      handleDecrease: r,
      handleIncrease: u,
      handleInput: v,
      handleBlur: c
    };
  }
});
function vd(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon"), i = resolveComponent("xmv-input");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["xmv-input-number", e.computeClass])
  }, [
    createBaseVNode("span", {
      class: normalizeClass(["xmv-input-number__decrease", { "is-disabled": e.decreaseDisabled }]),
      onClick: t[0] || (t[0] = (...r) => e.handleDecrease && e.handleDecrease(...r))
    }, [
      createVNode(l, { name: "minus" })
    ], 2),
    createBaseVNode("span", {
      class: normalizeClass(["xmv-input-number__increase", { "is-disabled": e.increaseDisabled }]),
      onClick: t[1] || (t[1] = (...r) => e.handleIncrease && e.handleIncrease(...r))
    }, [
      createVNode(l, { name: "plus" })
    ], 2),
    createVNode(i, {
      ref: "inputRef",
      type: "number",
      step: e.inputStep,
      onBlur: e.handleBlur,
      onInput: e.handleInput,
      size: e.size,
      disabled: e.isDisabled
    }, null, 8, ["step", "onBlur", "onInput", "size", "disabled"])
  ], 2);
}
const gd = /* @__PURE__ */ w(fd, [["render", vd]]);
class _d {
  constructor(t) {
    this.rctData = reactive({
      options: [],
      sData: [],
      dropdownWidth: 0
    }), this.selectRef = ref(null), this.isFocus = ref(false), this.inputRef = ref(null), this.popoverRef = ref(null), this.treeRef = ref(null), this.isEmpty = ref(false), this.tagsRef, this.type = t.type, this.multiple = ref(t.multiple != null), this.collapseTags = ref(t.collapseTags), this.filterable = ref(t.filterable);
  }
  adjustWH() {
    let t = this.tagsRef.value.clientHeight;
    this.inputRef.value.inputRef.style.height = t + "px";
  }
  getSelectedValList() {
    let t = [];
    return this.rctData.sData.forEach((n) => {
      t.push(n.value);
    }), t;
  }
  filter(t) {
    if (this.type == "select") {
      let n = true;
      this.rctData.options.forEach((s) => {
        s.hide = !s.label.includes(t), s.hide || (n = false);
      }), this.isEmpty.value = n;
    } else
      this.treeRef.value.filter(t);
    nextTick(() => {
    });
  }
  showAll() {
    this.rctData.options.forEach((t) => {
      t.hide = false;
    });
  }
}
const $d = defineComponent({
  name: "",
  props: {
    data: Object
  },
  setup(e, t) {
    const n = inject("SelectMode"), { $on: s, $emit: a } = inject("EventBus"), o = ref(false), l = ref(false);
    return s("itemClick", () => {
      let u = qe(n.rctData.sData, (c) => c.value == e.data.value);
      l.value = u != null;
    }), s("setVal", () => {
      let u = qe(n.rctData.sData, (c) => c.value == e.data.value);
      l.value = u != null;
    }), { handleMouseover: () => {
    }, handleClick: () => {
      if (e.data.disabled)
        return false;
      if (n.multiple.value) {
        let u = e.data, c = qe(n.rctData.sData, (v) => v.value == u.value);
        c ? n.rctData.sData = Fe(n.rctData.sData, (v) => v.value != c.value) : n.rctData.sData.push(e.data);
      } else
        n.rctData.sData = [], n.rctData.sData.push(e.data);
      a("itemClick");
    }, isHover: o, isSelect: l };
  }
});
function bd(e, t, n, s, a, o) {
  return withDirectives((openBlock(), createElementBlock("li", {
    class: normalizeClass(["xmv-select-dropdown__item", { hover: e.isHover, selected: e.isSelect, disabled: e.data.disabled }]),
    onMouseover: t[0] || (t[0] = (...l) => e.handleMouseover && e.handleMouseover(...l)),
    onClick: t[1] || (t[1] = (...l) => e.handleClick && e.handleClick(...l))
  }, [
    createBaseVNode("span", null, toDisplayString(e.data.label), 1)
  ], 34)), [
    [vShow, !e.data.hide]
  ]);
}
const ft = /* @__PURE__ */ w($d, [["render", bd]]), xd = defineComponent({
  name: "xmvSelect",
  components: { xmvSelectItem: ft },
  emits: ["nodeClick", "nodeCheck", "update:modelValue", "change"],
  props: {
    disabled: Boolean,
    clearable: Boolean,
    multiple: String,
    size: String,
    collapseTags: Boolean,
    maxcollapseTags: Number,
    filterable: Boolean,
    type: { type: String, default: "select" },
    notAssociated: String,
    onlyChildNode: Boolean,
    modelValue: [String, Number, Array],
    filterNodeMethod: Function,
    lazy: Boolean,
    load: Function,
    placeholder: { type: String, default: "请选择" }
  },
  components: { xmvSelectItem: ft },
  setup(e, t) {
    const n = new _d(e), s = e.placeholder, a = reactive({
      listeners: {}
    }), { $on: o, $emit: l } = be(a), i = ref(s), r = computed(() => {
      let R = [];
      return e.disabled && R.push("xmv-select--disabled"), n.multiple.value && R.push("is-multiple"), e.size != null && R.push("xmv-select--" + e.size), n.isFocus.value && R.push("is-focus"), R;
    });
    provide("SelectMode", n), provide("EventBus", { $on: o, $emit: l }), o("itemClick", (R) => {
      if (n.inputRef.value.focus(), n.multiple.value)
        nextTick(() => {
          n.adjustWH();
        }), e.modelValue != null && t.emit("update:modelValue", n.getSelectedValList()), t.emit("nodeCheck", n.rctData.sData);
      else {
        let L = n.rctData.sData[0];
        n.inputRef.value.val(L.label), n.popoverRef.value.hide(true), t.emit("update:modelValue", L.value), t.emit("change", L.value);
      }
    }), o("itemClose", (R) => {
      e.type == "tree" && (R.isChecked = false, n.treeRef.value.checkNode(R));
    });
    const u = () => {
      if (n.isFocus.value = true, n.isEmpty.value = false, n.rctData.dropdownWidth = n.selectRef.value.clientWidth - 2, e.disabled || (n.inputRef.value.focus(), n.popoverRef.value.setPosition(), n.popoverRef.value.enable()), n.filterable.value) {
        n.showAll();
        let R = n.rctData.sData;
        if (n.inputRef.value.inputRef.value = "", F(R))
          i.value = s;
        else {
          let L = R[0].label;
          i.value = L;
        }
        n.type == "tree" && n.treeRef.value.filter("");
      }
    }, c = (R) => {
      n.treeRef.value.loadData(R);
    }, v = (R) => {
      n.inputRef.value.val(R.label), n.popoverRef.value.hide(true), t.emit("nodeClick", R);
    }, y = (R) => {
      n.rctData.sData = R, nextTick(() => {
        n.adjustWH();
      }), F(R) ? i.value = s : i.value = "", t.emit("nodeCheck", R);
    }, _ = (R) => {
      n.treeRef.value.setMultipleValue(R, (L) => {
        n.rctData.sData = L, i.value = F(n.rctData.sData) ? s : "";
      });
    }, f = (R) => {
      let L = n.treeRef.value.setValue(R);
      n.rctData.sData = [L];
    }, g = () => {
      n.filterable.value && n.filter(n.inputRef.value.getVal());
    }, $ = () => {
      i.value = s, t.emit("update:modelValue", "");
    }, k = () => {
      if (n.isFocus.value = false, n.filterable.value) {
        let R = n.rctData.sData;
        if (F(R))
          n.inputRef.value.inputRef.value = "", i.value = s;
        else {
          let L = R[0].label;
          n.inputRef.value.inputRef.value = L;
        }
      }
    }, x = computed(() => e.modelValue);
    watch(x, (R) => {
      b(R);
    });
    const b = (R) => {
      if (e.multiple != null) {
        let L = R;
        n.rctData.sData = [], L.forEach((z) => {
          let j = Fe(n.rctData.options, (ne) => ne.value == z);
          F(j) || n.rctData.sData.push(j[0]);
        }), i.value = F(n.rctData.sData) ? s : "";
      } else
        n.rctData.sData = Fe(n.rctData.options, (L) => L.value == R), F(n.rctData.sData) ? n.inputRef.value.val("") : n.inputRef.value.val(n.rctData.sData[0].label);
      nextTick(() => {
        l("setVal");
      });
    };
    return onMounted(() => {
      n.rctData.dropdownWidth = n.selectRef.value.clientWidth - 2, e.disabled && n.popoverRef.value.disabled(), n.multiple.value && (n.inputRef.value.inputRef.style["min-height"] = "30px"), n.filterable.value || n.inputRef.value.inputRef.setAttribute("readonly", ""), F(e.modelValue) || b(e.modelValue);
    }), {
      selectMode: n,
      computeClass: r,
      inputPlaceholder: i,
      loadTreeData: c,
      handleActive: u,
      handleNodeClick: v,
      handleNodeCheck: y,
      setTreeValue: f,
      setTreeMultipleValue: _,
      handleInputClear: $,
      handleInputInput: g,
      handlePopoverHide: k
    };
  }
}), yd = { class: "select-trigger" }, Cd = { class: "xmv-select-dropdown__list" }, wd = {
  key: 2,
  class: "xmv-select-empty"
};
function kd(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-select-tags"), i = resolveComponent("xmv-input"), r = resolveComponent("xmv-select-item"), u = resolveComponent("xmv-tree"), c = resolveComponent("xmv-scrollbar"), v = resolveComponent("xmv-popover");
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(v, {
      ref: e.selectMode.popoverRef,
      onHide: e.handlePopoverHide
    }, {
      trigger: withCtx(() => [
        createBaseVNode("div", {
          class: normalizeClass(["xmv-select", e.computeClass]),
          ref: e.selectMode.selectRef,
          onClick: t[0] || (t[0] = (...y) => e.handleActive && e.handleActive(...y))
        }, [
          createBaseVNode("div", yd, [
            e.selectMode.multiple.value ? (openBlock(), createBlock(l, { key: 0 })) : createCommentVNode("", true),
            createVNode(i, {
              size: e.size,
              placeholder: e.inputPlaceholder,
              "suffix-icon": "arrowDown",
              ref: e.selectMode.inputRef,
              disabled: e.disabled,
              clearable: e.clearable,
              onInput: e.handleInputInput,
              onClear: e.handleInputClear
            }, null, 8, ["size", "placeholder", "disabled", "clearable", "onInput", "onClear"])
          ])
        ], 2)
      ]),
      default: withCtx(() => [
        createBaseVNode("div", {
          class: normalizeClass(["xmv-select-dropdown", e.computeClass]),
          style: normalizeStyle({ "min-width": e.selectMode.rctData.dropdownWidth + "px" })
        }, [
          createVNode(c, { maxHeightFlag: true }, {
            default: withCtx(() => [
              createBaseVNode("ul", Cd, [
                e.type == "select" ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(e.selectMode.rctData.options, (y) => (openBlock(), createBlock(r, { data: y }, null, 8, ["data"]))), 256)) : createCommentVNode("", true),
                e.type == "tree" ? (openBlock(), createBlock(u, {
                  key: 1,
                  ref: e.selectMode.treeRef,
                  showCheckbox: e.multiple,
                  notAssociated: e.notAssociated,
                  onlyChildNode: e.onlyChildNode,
                  onNodeClick: e.handleNodeClick,
                  onNodeCheck: e.handleNodeCheck,
                  filterNodeMethod: e.filterNodeMethod,
                  lazy: e.lazy,
                  load: e.load
                }, null, 8, ["showCheckbox", "notAssociated", "onlyChildNode", "onNodeClick", "onNodeCheck", "filterNodeMethod", "lazy", "load"])) : createCommentVNode("", true),
                e.selectMode.isEmpty.value ? (openBlock(), createElementBlock("div", wd, "没有查找到相关数据")) : createCommentVNode("", true)
              ])
            ]),
            _: 1
          })
        ], 6)
      ]),
      _: 1
    }, 8, ["onHide"]),
    renderSlot(e.$slots, "default")
  ], 64);
}
const Md = /* @__PURE__ */ w(xd, [["render", kd]]), Sd = defineComponent({
  name: "xmvOption",
  props: {
    label: String,
    value: String | Number,
    disabled: { type: Boolean, default: false },
    hide: { type: Boolean, default: false }
  },
  setup({ label: e, value: t, disabled: n, hide: s }, a) {
    return inject("SelectMode").rctData.options.push({ label: e, value: t, disabled: n, hide: s }), {};
  }
});
function Dd(e, t, n, s, a, o) {
  return null;
}
const Rd = /* @__PURE__ */ w(Sd, [["render", Dd]]), Ld = defineComponent({
  name: "",
  setup(e, t) {
    const n = ref(null), s = inject("SelectMode"), { $on: a, $emit: o } = inject("EventBus");
    s.tagsRef = n;
    const l = reactive({
      data: null,
      residue: null
    }), i = (r) => {
      s.popoverRef.value.disabled(), s.rctData.sData = Fe(s.rctData.sData, (u) => u.value != r.value), o("itemClose", r), o("itemClick", r);
    };
    return watch(s.rctData, (r, u) => {
      l.data = r.sData[0];
      let c = r.sData.length;
      c > 1 ? l.residue = c - 1 : l.residue = null;
    }), { selectMode: s, tagsRef: n, collapData: l, handleClose: i };
  }
}), Td = {
  class: "xmv-select__tags",
  ref: "tagsRef"
}, Ed = {
  key: 0,
  class: "xmv-select-tags-wrapper has-prefix"
}, Ad = {
  key: 1,
  class: "xmv-select-tags-wrapper has-prefix"
};
function Vd(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-tag");
  return openBlock(), createElementBlock("div", Td, [
    e.selectMode.collapseTags.value ? (openBlock(), createElementBlock("span", Ed, [
      e.collapData.data ? (openBlock(), createBlock(l, {
        key: 0,
        closable: "",
        onClose: t[0] || (t[0] = () => e.handleClose(e.collapData.data))
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(e.collapData.data.label), 1)
        ]),
        _: 1
      })) : createCommentVNode("", true),
      e.collapData.residue ? (openBlock(), createBlock(l, { key: 1 }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(e.collapData.residue), 1)
        ]),
        _: 1
      })) : createCommentVNode("", true)
    ])) : (openBlock(), createElementBlock("span", Ad, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(e.selectMode.rctData.sData, (i) => (openBlock(), createBlock(l, {
        key: i.value,
        closable: "",
        onClose: () => e.handleClose(i)
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(i.label), 1)
        ]),
        _: 2
      }, 1032, ["onClose"]))), 128))
    ]))
  ], 512);
}
const Bd = /* @__PURE__ */ w(Ld, [["render", Vd]]), Id = defineComponent({
  name: "xmvTag",
  props: {
    closable: String,
    type: { type: String, default: "light" },
    size: String,
    effect: String,
    round: Boolean
  },
  emits: ["close"],
  setup(e, t) {
    const n = ref(null), s = () => {
      t.emit("close");
    }, a = computed(() => {
      let o = [];
      return o.push("xmv-tag--" + e.type), e.size != null && o.push("xmv-tag--" + e.size), e.effect != null && o.push("xmv-tag--" + e.effect), e.round && o.push("is-round"), o;
    });
    return { tagRef: n, computeTagClass: a, handleCloseClick: s };
  }
}), Nd = { class: "xmv-tag__content" };
function zd(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon");
  return openBlock(), createElementBlock("span", {
    class: normalizeClass(["xmv-tag", e.computeTagClass]),
    ref: "tagRef"
  }, [
    createBaseVNode("span", Nd, [
      renderSlot(e.$slots, "default")
    ]),
    e.closable != null ? (openBlock(), createBlock(l, {
      key: 0,
      name: "close",
      class: "xmv-tag__close",
      onClick: withModifiers(e.handleCloseClick, ["stop"]),
      onMouseup: t[0] || (t[0] = withModifiers(() => {
      }, ["stop"]))
    }, null, 8, ["onClick"])) : createCommentVNode("", true)
  ], 2);
}
const Pd = /* @__PURE__ */ w(Id, [["render", zd]]), Od = defineComponent({
  name: "xmvRadioGroup",
  props: {
    size: String,
    disabled: String,
    modelValue: String
  },
  setup(e, t) {
    const n = reactive({
      listeners: {}
    }), s = Ft(), { $on: a, $emit: o } = be(n);
    provide("EventBus", { $on: a, $emit: o }), provide("Name", "xmv-" + s), a("radioClick", (r) => {
      t.emit("update:modelValue", r);
    });
    const l = computed(() => e.modelValue);
    watch(l, (r) => {
      i(r);
    });
    const i = (r) => {
      o("setVal", r);
    };
    return onMounted(() => {
      F(e.modelValue) || i(e.modelValue);
    }), {};
  }
}), Hd = { class: "xmv-radio-group" };
function Wd(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("div", Hd, [
    renderSlot(e.$slots, "default")
  ]);
}
const jd = /* @__PURE__ */ w(Od, [["render", Wd]]), Yd = defineComponent({
  name: "xmvRadio",
  props: {
    label: String,
    size: String,
    disabled: Boolean,
    border: { type: Boolean, default: false }
  },
  setup(e, t) {
    const { $on: n, $emit: s } = inject("EventBus"), a = inject("Name"), o = ref(false), l = ref(null), i = (r) => {
      if (e.disabled)
        return false;
      o.value || (o.value = true, s("radioClick", e.label));
    };
    return n("radioClick", (r) => {
      e.label != r && (o.value = false);
    }), n("setVal", (r) => {
      o.value = e.label == r;
    }), watch(() => e.disabled, (r, u) => {
      r ? l.value.setAttribute("disabled", "disabled") : l.value.removeAttribute("disabled");
    }), onMounted(() => {
      e.disabled && l.value.setAttribute("disabled", "disabled");
    }), { isChecked: o, inputRef: l, name: a, handleClick: i };
  }
}), Fd = ["value", "name"], Xd = /* @__PURE__ */ createBaseVNode("span", { class: "xmv-radio__inner" }, null, -1), Ud = { class: "xmv-radio__label" };
function qd(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("label", {
    class: normalizeClass(["xmv-radio", {
      "xmv-radio--large": e.size == "large",
      "xmv-radio--small": e.size == "small",
      "is-checked": e.isChecked,
      "is-disabled": e.disabled,
      "is-bordered": e.border
    }]),
    onClick: t[0] || (t[0] = (...l) => e.handleClick && e.handleClick(...l))
  }, [
    createBaseVNode("span", {
      class: normalizeClass(["xmv-radio__input", { "is-checked": e.isChecked, "is-disabled": e.disabled }])
    }, [
      createBaseVNode("input", {
        type: "radio",
        class: "xmv-radio__original",
        value: e.label,
        name: e.name,
        ref: "inputRef"
      }, null, 8, Fd),
      Xd
    ], 2),
    createBaseVNode("span", Ud, [
      renderSlot(e.$slots, "default")
    ])
  ], 2);
}
const Gd = /* @__PURE__ */ w(Yd, [["render", qd]]), Zd = defineComponent({
  name: "xmvRadioButton",
  props: {
    label: String,
    size: String,
    disabled: Boolean
  },
  setup(e, t) {
    const { $on: n, $emit: s } = inject("EventBus"), a = inject("Name"), o = ref(false), l = ref(null), i = () => {
      if (e.disabled)
        return false;
      o.value || (o.value = true, s("radioClick", e.label));
    };
    return n("setVal", (r) => {
      o.value = e.label == r, o.value ? l.value.setAttribute("checked", "") : l.value.removeAttribute("checked");
    }), watch(() => e.disabled, (r, u) => {
      r ? l.value.setAttribute("disabled", "disabled") : l.value.removeAttribute("disabled");
    }), onMounted(() => {
      e.disabled && l.value.setAttribute("disabled", "disabled");
    }), { name: a, inputRef: l, handleClick: i };
  }
}), Qd = ["value", "name"], Kd = { class: "xmv-radio-button__inner" };
function Jd(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("label", {
    class: normalizeClass(["xmv-radio-button", {
      "is-disabled": e.disabled,
      "xmv-radio-button--small": e.size == "small"
    }]),
    onClick: t[0] || (t[0] = (...l) => e.handleClick && e.handleClick(...l))
  }, [
    createBaseVNode("input", {
      type: "radio",
      class: "xmv-radio-button__original-radio",
      value: e.label,
      name: e.name,
      ref: "inputRef"
    }, null, 8, Qd),
    createBaseVNode("span", Kd, [
      renderSlot(e.$slots, "default")
    ])
  ], 2);
}
const eu = /* @__PURE__ */ w(Zd, [["render", Jd]]), tu = defineComponent({
  name: "xmvCheckGroup",
  props: {
    modelValue: Array,
    max: Number
  },
  setup(e, t) {
    let n = [];
    const s = reactive({
      listeners: {}
    }), { $on: a, $emit: o } = be(s);
    provide("EventBus", { $on: a, $emit: o });
    const l = computed(() => e.modelValue);
    watch(l, (u) => {
      i(u);
    });
    const i = (u) => {
      let c = u;
      n = c, o("setVal", c), r();
    };
    a("checkClick", (u) => {
      u.status ? n.push(u.label) : n = n.filter((c) => c != u.label), t.emit("update:modelValue", n), r();
    });
    const r = () => {
      if (e.max == null)
        return false;
      let u = n.length, c = false;
      u >= e.max && (c = true), o("setDisabled", c);
    };
    return onMounted(() => {
      F(e.modelValue) || i(e.modelValue);
    }), {};
  }
}), nu = { class: "xmv-checkbox-group" };
function su(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("div", nu, [
    renderSlot(e.$slots, "default")
  ]);
}
const au = /* @__PURE__ */ w(tu, [["render", su]]), ou = defineComponent({
  name: "xmvCheckboxButton",
  props: {
    disabled: String,
    label: String,
    size: String
  },
  setup(e, t) {
    const n = ref(null), s = ref(false), a = ref(e.disabled != null), { $on: o, $emit: l } = inject("EventBus"), i = () => {
      if (a.value)
        return false;
      s.value = !s.value, s.value ? n.value.setAttribute("checked", "") : n.value.removeAttribute("checked"), l("checkClick", { status: s.value, label: e.label });
    };
    return o("setVal", (r) => {
      s.value = r.includes(e.label);
    }), watch(s, (r) => {
      s.value ? n.value.setAttribute("checked", "") : n.value.removeAttribute("checked");
    }), { isChecked: s, disabled: a, inputRef: n, handleClick: i };
  }
}), lu = ["value"], iu = { class: "xmv-checkbox-button__inner" };
function ru(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["xmv-checkbox-button", {
      "is-checked": e.isChecked,
      "is-disabled": e.disabled,
      "xmv-checkbox-button--small": e.size == "small",
      "xmv-checkbox-button--large": e.size == "large"
    }]),
    onClick: t[0] || (t[0] = withModifiers((...l) => e.handleClick && e.handleClick(...l), ["stop"]))
  }, [
    createBaseVNode("input", {
      class: "xmv-checkbox-button__original",
      type: "checkbox",
      value: e.label,
      ref: "inputRef"
    }, null, 8, lu),
    createBaseVNode("span", iu, [
      renderSlot(e.$slots, "default")
    ])
  ], 2);
}
const du = /* @__PURE__ */ w(ou, [["render", ru]]);
var Mt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, $e = {}, uu = {
  get exports() {
    return $e;
  },
  set exports(e) {
    $e = e;
  }
};
(function(e, t) {
  (function(n, s) {
    e.exports = s();
  })(Mt, function() {
    var n = 1e3, s = 6e4, a = 36e5, o = "millisecond", l = "second", i = "minute", r = "hour", u = "day", c = "week", v = "month", y = "quarter", _ = "year", f = "date", g = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, k = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, x = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(H) {
      var N = ["th", "st", "nd", "rd"], B = H % 100;
      return "[" + H + (N[(B - 20) % 10] || N[B] || N[0]) + "]";
    } }, b = function(H, N, B) {
      var Y = String(H);
      return !Y || Y.length >= N ? H : "" + Array(N + 1 - Y.length).join(B) + H;
    }, R = { s: b, z: function(H) {
      var N = -H.utcOffset(), B = Math.abs(N), Y = Math.floor(B / 60), I = B % 60;
      return (N <= 0 ? "+" : "-") + b(Y, 2, "0") + ":" + b(I, 2, "0");
    }, m: function H(N, B) {
      if (N.date() < B.date())
        return -H(B, N);
      var Y = 12 * (B.year() - N.year()) + (B.month() - N.month()), I = N.clone().add(Y, v), X = B - I < 0, P = N.clone().add(Y + (X ? -1 : 1), v);
      return +(-(Y + (B - I) / (X ? I - P : P - I)) || 0);
    }, a: function(H) {
      return H < 0 ? Math.ceil(H) || 0 : Math.floor(H);
    }, p: function(H) {
      return { M: v, y: _, w: c, d: u, D: f, h: r, m: i, s: l, ms: o, Q: y }[H] || String(H || "").toLowerCase().replace(/s$/, "");
    }, u: function(H) {
      return H === void 0;
    } }, L = "en", z = {};
    z[L] = x;
    var j = function(H) {
      return H instanceof he;
    }, ne = function H(N, B, Y) {
      var I;
      if (!N)
        return L;
      if (typeof N == "string") {
        var X = N.toLowerCase();
        z[X] && (I = X), B && (z[X] = B, I = X);
        var P = N.split("-");
        if (!I && P.length > 1)
          return H(P[0]);
      } else {
        var se = N.name;
        z[se] = N, I = se;
      }
      return !Y && I && (L = I), I || !Y && L;
    }, oe = function(H, N) {
      if (j(H))
        return H.clone();
      var B = typeof N == "object" ? N : {};
      return B.date = H, B.args = arguments, new he(B);
    }, G = R;
    G.l = ne, G.i = j, G.w = function(H, N) {
      return oe(H, { locale: N.$L, utc: N.$u, x: N.$x, $offset: N.$offset });
    };
    var he = function() {
      function H(B) {
        this.$L = ne(B.locale, null, true), this.parse(B);
      }
      var N = H.prototype;
      return N.parse = function(B) {
        this.$d = function(Y) {
          var I = Y.date, X = Y.utc;
          if (I === null)
            return /* @__PURE__ */ new Date(NaN);
          if (G.u(I))
            return /* @__PURE__ */ new Date();
          if (I instanceof Date)
            return new Date(I);
          if (typeof I == "string" && !/Z$/i.test(I)) {
            var P = I.match($);
            if (P) {
              var se = P[2] - 1 || 0, ue = (P[7] || "0").substring(0, 3);
              return X ? new Date(Date.UTC(P[1], se, P[3] || 1, P[4] || 0, P[5] || 0, P[6] || 0, ue)) : new Date(P[1], se, P[3] || 1, P[4] || 0, P[5] || 0, P[6] || 0, ue);
            }
          }
          return new Date(I);
        }(B), this.$x = B.x || {}, this.init();
      }, N.init = function() {
        var B = this.$d;
        this.$y = B.getFullYear(), this.$M = B.getMonth(), this.$D = B.getDate(), this.$W = B.getDay(), this.$H = B.getHours(), this.$m = B.getMinutes(), this.$s = B.getSeconds(), this.$ms = B.getMilliseconds();
      }, N.$utils = function() {
        return G;
      }, N.isValid = function() {
        return this.$d.toString() !== g;
      }, N.isSame = function(B, Y) {
        var I = oe(B);
        return this.startOf(Y) <= I && I <= this.endOf(Y);
      }, N.isAfter = function(B, Y) {
        return oe(B) < this.startOf(Y);
      }, N.isBefore = function(B, Y) {
        return this.endOf(Y) < oe(B);
      }, N.$g = function(B, Y, I) {
        return G.u(B) ? this[Y] : this.set(I, B);
      }, N.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, N.valueOf = function() {
        return this.$d.getTime();
      }, N.startOf = function(B, Y) {
        var I = this, X = !!G.u(Y) || Y, P = G.p(B), se = function(Se, fe) {
          var Ce = G.w(I.$u ? Date.UTC(I.$y, fe, Se) : new Date(I.$y, fe, Se), I);
          return X ? Ce : Ce.endOf(u);
        }, ue = function(Se, fe) {
          return G.w(I.toDate()[Se].apply(I.toDate("s"), (X ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(fe)), I);
        }, U = this.$W, pe = this.$M, ye = this.$D, ke = "set" + (this.$u ? "UTC" : "");
        switch (P) {
          case _:
            return X ? se(1, 0) : se(31, 11);
          case v:
            return X ? se(1, pe) : se(0, pe + 1);
          case c:
            var de = this.$locale().weekStart || 0, _e = (U < de ? U + 7 : U) - de;
            return se(X ? ye - _e : ye + (6 - _e), pe);
          case u:
          case f:
            return ue(ke + "Hours", 0);
          case r:
            return ue(ke + "Minutes", 1);
          case i:
            return ue(ke + "Seconds", 2);
          case l:
            return ue(ke + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, N.endOf = function(B) {
        return this.startOf(B, false);
      }, N.$set = function(B, Y) {
        var I, X = G.p(B), P = "set" + (this.$u ? "UTC" : ""), se = (I = {}, I[u] = P + "Date", I[f] = P + "Date", I[v] = P + "Month", I[_] = P + "FullYear", I[r] = P + "Hours", I[i] = P + "Minutes", I[l] = P + "Seconds", I[o] = P + "Milliseconds", I)[X], ue = X === u ? this.$D + (Y - this.$W) : Y;
        if (X === v || X === _) {
          var U = this.clone().set(f, 1);
          U.$d[se](ue), U.init(), this.$d = U.set(f, Math.min(this.$D, U.daysInMonth())).$d;
        } else
          se && this.$d[se](ue);
        return this.init(), this;
      }, N.set = function(B, Y) {
        return this.clone().$set(B, Y);
      }, N.get = function(B) {
        return this[G.p(B)]();
      }, N.add = function(B, Y) {
        var I, X = this;
        B = Number(B);
        var P = G.p(Y), se = function(pe) {
          var ye = oe(X);
          return G.w(ye.date(ye.date() + Math.round(pe * B)), X);
        };
        if (P === v)
          return this.set(v, this.$M + B);
        if (P === _)
          return this.set(_, this.$y + B);
        if (P === u)
          return se(1);
        if (P === c)
          return se(7);
        var ue = (I = {}, I[i] = s, I[r] = a, I[l] = n, I)[P] || 1, U = this.$d.getTime() + B * ue;
        return G.w(U, this);
      }, N.subtract = function(B, Y) {
        return this.add(-1 * B, Y);
      }, N.format = function(B) {
        var Y = this, I = this.$locale();
        if (!this.isValid())
          return I.invalidDate || g;
        var X = B || "YYYY-MM-DDTHH:mm:ssZ", P = G.z(this), se = this.$H, ue = this.$m, U = this.$M, pe = I.weekdays, ye = I.months, ke = function(fe, Ce, we, O) {
          return fe && (fe[Ce] || fe(Y, X)) || we[Ce].slice(0, O);
        }, de = function(fe) {
          return G.s(se % 12 || 12, fe, "0");
        }, _e = I.meridiem || function(fe, Ce, we) {
          var O = fe < 12 ? "AM" : "PM";
          return we ? O.toLowerCase() : O;
        }, Se = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: U + 1, MM: G.s(U + 1, 2, "0"), MMM: ke(I.monthsShort, U, ye, 3), MMMM: ke(ye, U), D: this.$D, DD: G.s(this.$D, 2, "0"), d: String(this.$W), dd: ke(I.weekdaysMin, this.$W, pe, 2), ddd: ke(I.weekdaysShort, this.$W, pe, 3), dddd: pe[this.$W], H: String(se), HH: G.s(se, 2, "0"), h: de(1), hh: de(2), a: _e(se, ue, true), A: _e(se, ue, false), m: String(ue), mm: G.s(ue, 2, "0"), s: String(this.$s), ss: G.s(this.$s, 2, "0"), SSS: G.s(this.$ms, 3, "0"), Z: P };
        return X.replace(k, function(fe, Ce) {
          return Ce || Se[fe] || P.replace(":", "");
        });
      }, N.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, N.diff = function(B, Y, I) {
        var X, P = G.p(Y), se = oe(B), ue = (se.utcOffset() - this.utcOffset()) * s, U = this - se, pe = G.m(this, se);
        return pe = (X = {}, X[_] = pe / 12, X[v] = pe, X[y] = pe / 3, X[c] = (U - ue) / 6048e5, X[u] = (U - ue) / 864e5, X[r] = U / a, X[i] = U / s, X[l] = U / n, X)[P] || U, I ? pe : G.a(pe);
      }, N.daysInMonth = function() {
        return this.endOf(v).$D;
      }, N.$locale = function() {
        return z[this.$L];
      }, N.locale = function(B, Y) {
        if (!B)
          return this.$L;
        var I = this.clone(), X = ne(B, Y, true);
        return X && (I.$L = X), I;
      }, N.clone = function() {
        return G.w(this.$d, this);
      }, N.toDate = function() {
        return new Date(this.valueOf());
      }, N.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, N.toISOString = function() {
        return this.$d.toISOString();
      }, N.toString = function() {
        return this.$d.toUTCString();
      }, H;
    }(), ge = he.prototype;
    return oe.prototype = ge, [["$ms", o], ["$s", l], ["$m", i], ["$H", r], ["$W", u], ["$M", v], ["$y", _], ["$D", f]].forEach(function(H) {
      ge[H[1]] = function(N) {
        return this.$g(N, H[0], H[1]);
      };
    }), oe.extend = function(H, N) {
      return H.$i || (H(N, he, oe), H.$i = true), oe;
    }, oe.locale = ne, oe.isDayjs = j, oe.unix = function(H) {
      return oe(1e3 * H);
    }, oe.en = z[L], oe.Ls = z, oe.p = {}, oe;
  });
})(uu);
class vt {
  constructor(t) {
    this.dateObj = $e(), this.rctData = reactive({
      dayList: [],
      year: "",
      month: "",
      dateObj: $e()
    }), this.weekHeader = ["一", "二", "三", "四", "五", "六", "日"], this.inputRef, this.inputEl, this.pos = "left", this.format = "YYYY-MM-DD", this.storeMode, this.timeModel, this.todayObj = $e(), this.type = ref(t.type), this.withTime = t.withTime != null, this.popoverRef = ref(null), this.initMode();
  }
  initMode() {
    switch (this.type.value) {
      case "date":
        this.format = "YYYY-MM-DD", this.initDayMode();
        break;
      case "daterange":
        this.format = "YYYY-MM-DD", this.initDayMode();
        break;
      case "month":
        this.format = "YYYY-MM", this.initMonthMode();
        break;
      case "monthrange":
        this.format = "YYYY-MM", this.initMonthMode();
        break;
    }
  }
  setMode(t) {
    switch (this.type.value) {
      case "date":
        this.setDayMode(t);
        break;
      case "daterange":
        this.setDayMode(t);
        break;
      case "month":
        this.setMonthMode(t);
      case "monthrange":
        this.setMonthMode(t);
    }
  }
  setDayMode(t) {
    this.dateObj = $e(t), this.initDayMode();
  }
  setMonthMode(t) {
    this.dateObj = $e(t), this.initMonthMode();
  }
  initDayMode() {
    let t = this.dateObj;
    this.rctData.year = t.format("YYYY"), this.rctData.month = t.format("MM") + "月", this.rctData.dayList = [];
    let n = 0, s = t.daysInMonth(), a = t.startOf("month").day();
    a = a == 0 ? 7 : a, n = 8 - a;
    let o = a - 1, l = [], i = t.subtract(1, "month").endOf("month"), r = t.endOf("month");
    for (let f = o - 1; f >= 0; f--) {
      let $ = i.subtract(f, "day").format("DD");
      l.push({ value: $, prevMonth: true, pos: this.pos });
    }
    for (let f = 1; f <= n; f++)
      l.push({ value: f, available: true, pos: this.pos });
    this.rctData.dayList.push(l);
    let u = [];
    for (let f = 1; f <= 7; f++)
      n++, u.push({ value: n, available: true, pos: this.pos });
    this.rctData.dayList.push(u);
    let c = [];
    for (let f = 1; f <= 7; f++)
      n++, c.push({ value: n, available: true, pos: this.pos });
    this.rctData.dayList.push(c);
    let v = [];
    for (let f = 1; f <= 7; f++)
      n++, v.push({ value: n, available: true, pos: this.pos });
    this.rctData.dayList.push(v);
    let y = [];
    for (let f = 1; f <= 7; f++)
      n++, n <= s ? y.push({
        value: n,
        available: true,
        pos: this.pos
      }) : y.push({
        value: r.add(n - s, "day").format("D"),
        nextMonth: true,
        pos: this.pos
      });
    this.rctData.dayList.push(y);
    let _ = [];
    for (let f = 1; f <= 7; f++)
      n++, n <= s ? _.push({
        value: n,
        available: true,
        pos: this.pos
      }) : _.push({
        value: r.add(n - s, "day").format("D"),
        nextMonth: true,
        pos: this.pos
      });
    this.rctData.dayList.push(_);
  }
  initMonthMode() {
    let t = this.dateObj;
    this.rctData.year = t.format("YYYY"), this.rctData.month = t.format("MM") + "月", this.rctData.dayList = [], this.rctData.dayList.push([
      { value: "一月", num: 0 },
      { value: "二月", num: 1 },
      { value: "三月", num: 2 },
      { value: "四月", num: 3 }
    ]), this.rctData.dayList.push([
      { value: "五月", num: 4 },
      { value: "六月", num: 5 },
      { value: "七月", num: 6 },
      { value: "八月", num: 7 }
    ]), this.rctData.dayList.push([
      { value: "九月", num: 8 },
      { value: "十月", num: 9 },
      { value: "十一月", num: 10 },
      { value: "十二月", num: 11 }
    ]);
  }
  initYearMode() {
  }
  getVal() {
    let t = "", n = this.pos == "left" ? this.storeMode.dateObj.left : this.storeMode.dateObj.right;
    return n && (t = n.format(this.format) + (this.withTime ? " " + this.timeModel.value : "")), t;
  }
  setInput() {
    let t = this.pos == "left" ? this.storeMode.dateObj.left : this.storeMode.dateObj.right;
    t && (this.inputEl.value = t.format(this.format) + (this.withTime ? " " + this.timeModel.value : "")), this.inputRef && this.inputRef.value.handleInputInput();
  }
}
class cu {
  constructor() {
    this.leftDMode = null, this.rightDMode = null, this.dateObj = new Object(), this.dateList = [];
  }
  handleList(t) {
    this.dateList.length == 2 ? (this.dateList = [], this.dateList.push(t)) : this.dateList.push(t);
  }
}
const mu = defineComponent({
  name: "",
  props: {
    data: Object,
    dMode: Object
  },
  setup({ dMode: e, data: t }, n) {
    const s = inject("StoreMode"), a = ref(false), o = ref(false), l = ref(null), i = ref(null), { $on: r, $emit: u } = inject("CalendarEventBus"), { $on: c, $emit: v } = inject("EventBus"), y = () => {
      let $ = _();
      e.type.value == "date" || e.type.value == "month" ? s.dateObj[e.pos] = $ : (e.type.value == "daterange" || e.type.value == "monthrange") && s.handleList($), u("tdClick", $), v("tdClick", $);
    }, _ = () => {
      let $ = e.dateObj;
      return (e.type.value == "date" || e.type.value == "daterange") && (Oe(l.value, "prev-month") ? $ = e.dateObj.subtract(1, "month") : Oe(l.value, "next-month") && ($ = e.dateObj.add(1, "month"))), e.type.value == "month" || e.type.value == "monthrange" ? $.month(i.value.getAttribute("num")) : $.date(i.value.innerHTML);
    };
    c("tdClick", ($) => {
      nextTick(() => {
        g();
      });
    }), r("change", () => {
      nextTick(() => {
        f(), g();
      });
    }), c("change", () => {
      nextTick(() => {
        f(), g();
      });
    }), c("removeCurrent", () => {
      a.value = false;
    });
    const f = () => {
      let $ = _();
      e.type.value == "date" ? o.value = $.isSame(e.todayObj, "day") : e.type.value == "month" && (o.value = $.isSame(e.todayObj, "month"));
    }, g = () => {
      a.value = false;
      let $ = _();
      e.type.value == "date" ? a.value = $.isSame(s.dateObj[e.pos]) : e.type.value == "month" ? a.value = $.isSame(s.dateObj[e.pos], "month") : e.type.value == "daterange" ? s.dateList.forEach((k) => {
        k.format("YYYY-MM-DD") == $.format("YYYY-MM-DD") && (s.rightDMode.dateObj.diff(s.leftDMode.dateObj, "month") == 1 ? (e.pos == "left" && !Oe(l.value, "next-month") || e.pos == "right" && !Oe(l.value, "prev-month")) && (a.value = true) : a.value = true);
      }) : e.type.value == "monthrange" && s.dateList.forEach((k) => {
        k.format("YYYY-MM") == $.format("YYYY-MM") && (s.rightDMode.dateObj.diff(s.leftDMode.dateObj, "year") == 0 ? e.pos == "left" && (a.value = true) : a.value = true);
      });
    };
    return onMounted(() => {
    }), { isCurrent: a, isToday: o, spanRef: i, tdRef: l, handleMouseUp: y };
  }
}), hu = { class: "xmv-date-table-cell" }, pu = ["num"];
function fu(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("td", {
    onMouseup: t[0] || (t[0] = withModifiers((...l) => e.handleMouseUp && e.handleMouseUp(...l), ["stop"])),
    ref: "tdRef",
    class: normalizeClass({
      "prev-month": e.data.prevMonth,
      "next-month": e.data.nextMonth,
      available: e.data.available,
      current: e.isCurrent,
      today: e.isToday
    })
  }, [
    createBaseVNode("div", hu, [
      createBaseVNode("span", {
        class: "xmv-date-table-cell__text",
        ref: "spanRef",
        num: e.data.num
      }, toDisplayString(e.data.value), 9, pu)
    ])
  ], 34);
}
const vu = /* @__PURE__ */ w(mu, [["render", fu]]), gu = defineComponent({
  name: "",
  props: {
    dMode: Object
  },
  components: { xmvCalendarTd: vu },
  setup({ dMode: e }, t) {
    const n = ref("00:00:00"), s = inject("StoreMode"), a = ref(true), o = ref(true), l = ref(true), i = ref(true), { $on: r, $emit: u } = inject("EventBus"), c = reactive({
      listeners: {}
    }), { $on: v, $emit: y } = be(c);
    provide("CalendarEventBus", { $on: v, $emit: y });
    const _ = () => {
      e.dateObj = e.dateObj.subtract(1, "year"), e.initMode(), y("change"), u("change");
    }, f = () => {
      e.dateObj = e.dateObj.subtract(1, "month"), e.initMode(), y("change"), u("change");
    }, g = () => {
      e.dateObj = e.dateObj.add(1, "year"), e.initMode(), y("change"), u("change");
    }, $ = () => {
      e.dateObj = e.dateObj.add(1, "month"), e.initMode(), y("change"), u("change");
    };
    r("change", () => {
      k();
    });
    const k = () => {
      if (e.type.value == "date")
        return false;
      if (e.type.value == "month")
        return o.value = false, l.value = false, false;
      let b = s.leftDMode, R = s.rightDMode, L = R.dateObj.diff(b.dateObj, "month"), z = R.dateObj.diff(b.dateObj, "year");
      L > 1 ? (o.value = true, l.value = true) : e.pos == "left" ? (o.value = true, l.value = false) : (o.value = false, l.value = true), z > 0 ? (a.value = true, i.value = true) : e.pos == "left" ? (a.value = true, i.value = false) : (a.value = false, i.value = true), e.type.value == "monthrange" && (o.value = false, l.value = false);
    }, x = computed(() => {
      let b = [];
      return e.type.value == "daterange" || e.type.value == "monthrange" ? b.push("xmv-date-range-picker__header") : (e.type.value == "date" || e.type.value == "month") && b.push("xmv-date-picker__header"), b;
    });
    return watch(n, (b) => {
      e.setInput();
    }), onMounted(() => {
      e.timeModel = n;
    }), {
      handleDArrowLeft: _,
      handleArrowLeft: f,
      handleDArrowRight: g,
      handleArrowRight: $,
      judgeButtonShow: k,
      computeHeaderClass: x,
      leftSideButton: o,
      rightSideButton: l,
      leftSideDButton: a,
      rightSideDButton: i,
      timeMode: n
    };
  }
}), _u = { class: "xmv-picker-calendar" }, $u = {
  key: 0,
  class: "xmv-date-picker__time-header"
}, bu = { class: "xmv-date-picker__prev-btn" }, xu = {
  key: 0,
  class: "xmv-date-picker__header-label"
}, yu = {
  key: 1,
  class: "xmv-date-picker__header-label"
}, Cu = { class: "xmv-date-picker__next-btn" }, wu = { key: 2 }, ku = { key: 3 }, Mu = { class: "xmv-picker-panel__content" }, Su = {
  key: 0,
  class: "xmv-date-table"
}, Du = { class: "xmv-date-table__row" }, Ru = {
  key: 1,
  class: "xmv-month-table"
};
function Lu(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-time-picker"), i = resolveComponent("xmv-icon"), r = resolveComponent("xmv-calendar-td");
  return openBlock(), createElementBlock("div", _u, [
    e.dMode.withTime ? (openBlock(), createElementBlock("div", $u, [
      createVNode(l, {
        modelValue: e.timeMode,
        "onUpdate:modelValue": t[0] || (t[0] = (u) => e.timeMode = u)
      }, null, 8, ["modelValue"])
    ])) : createCommentVNode("", true),
    createBaseVNode("div", {
      class: normalizeClass(e.computeHeaderClass)
    }, [
      createBaseVNode("span", bu, [
        e.leftSideDButton ? (openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          class: "d-arrow-left xmv-picker-panel__icon-btn",
          onMouseup: t[1] || (t[1] = withModifiers((...u) => e.handleDArrowLeft && e.handleDArrowLeft(...u), ["stop"]))
        }, [
          createVNode(i, { name: "dArrowLeft" })
        ], 32)) : createCommentVNode("", true),
        e.leftSideButton ? (openBlock(), createElementBlock("button", {
          key: 1,
          type: "button",
          class: "xmv-picker-panel__icon-btn arrow-left",
          onMouseup: t[2] || (t[2] = withModifiers((...u) => e.handleArrowLeft && e.handleArrowLeft(...u), ["stop"]))
        }, [
          createVNode(i, { name: "arrowLeft" })
        ], 32)) : createCommentVNode("", true)
      ]),
      e.dMode.type.value == "date" || e.dMode.type.value == "month" ? (openBlock(), createElementBlock("span", xu, toDisplayString(e.dMode.rctData.year), 1)) : createCommentVNode("", true),
      e.dMode.type.value == "date" ? (openBlock(), createElementBlock("span", yu, toDisplayString(e.dMode.rctData.month), 1)) : createCommentVNode("", true),
      createBaseVNode("span", Cu, [
        e.rightSideButton ? (openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          class: "xmv-picker-panel__icon-btn arrow-right",
          onMouseup: t[3] || (t[3] = withModifiers((...u) => e.handleArrowRight && e.handleArrowRight(...u), ["stop"]))
        }, [
          createVNode(i, { name: "arrowRight" })
        ], 32)) : createCommentVNode("", true),
        e.rightSideDButton ? (openBlock(), createElementBlock("button", {
          key: 1,
          type: "button",
          class: "xmv-picker-panel__icon-btn d-arrow-right",
          onMouseup: t[4] || (t[4] = withModifiers((...u) => e.handleDArrowRight && e.handleDArrowRight(...u), ["stop"]))
        }, [
          createVNode(i, { name: "dArrowRight" })
        ], 32)) : createCommentVNode("", true)
      ]),
      e.dMode.type.value == "daterange" ? (openBlock(), createElementBlock("div", wu, toDisplayString(e.dMode.rctData.year) + " " + toDisplayString(e.dMode.rctData.month), 1)) : createCommentVNode("", true),
      e.dMode.type.value == "monthrange" ? (openBlock(), createElementBlock("div", ku, toDisplayString(e.dMode.rctData.year), 1)) : createCommentVNode("", true)
    ], 2),
    createBaseVNode("div", Mu, [
      e.dMode.type.value == "date" || e.dMode.type.value == "daterange" ? (openBlock(), createElementBlock("table", Su, [
        createBaseVNode("tbody", null, [
          createBaseVNode("tr", null, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(e.dMode.weekHeader, (u) => (openBlock(), createElementBlock("th", null, toDisplayString(u), 1))), 256))
          ]),
          (openBlock(true), createElementBlock(Fragment, null, renderList(e.dMode.rctData.dayList, (u) => (openBlock(), createElementBlock("tr", Du, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(u, (c) => (openBlock(), createBlock(r, {
              data: c,
              dMode: e.dMode
            }, null, 8, ["data", "dMode"]))), 256))
          ]))), 256))
        ])
      ])) : createCommentVNode("", true),
      e.dMode.type.value == "month" || e.dMode.type.value == "monthrange" ? (openBlock(), createElementBlock("table", Ru, [
        createBaseVNode("tbody", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(e.dMode.rctData.dayList, (u) => (openBlock(), createElementBlock("tr", null, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(u, (c) => (openBlock(), createBlock(r, {
              data: c,
              dMode: e.dMode
            }, null, 8, ["data", "dMode"]))), 256))
          ]))), 256))
        ])
      ])) : createCommentVNode("", true)
    ])
  ]);
}
const Tu = /* @__PURE__ */ w(gu, [["render", Lu]]), Eu = defineComponent({
  name: "xmvDatePicker",
  components: { xmvCalendar: Tu },
  props: {
    type: { type: String, default: "date" },
    //daterange
    format: { type: String, default: "YYYY-MM-DD" },
    modelValue: String | Array,
    withTime: String,
    size: String,
    style: String | Object
  },
  setup(e, t) {
    const n = new cu(), s = new vt(e), a = new vt(e);
    a.dateObj = a.dateObj.add(1, "month"), a.initMode(), a.pos = "right", n.leftDMode = s, n.rightDMode = a, s.storeMode = n, a.storeMode = n;
    const o = ref(null), l = ref(null), i = ref(null), r = ref(null), u = ref(false);
    inject("Xmv-Event-On")("mouseup", (b) => {
      u.value = false;
    });
    const v = reactive({
      listeners: {}
    }), { $on: y, $emit: _ } = be(v);
    provide("DatePickerMode", s), provide("DatePickerRightMode", a), provide("StoreMode", n), provide("EventBus", { $on: y, $emit: _ });
    const f = computed(() => {
      let b = [];
      return s.type.value == "date" || s.type.value == "month" ? b.push("xmv-date-picker") : (s.type.value == "daterange" || s.type.value == "monthrange") && b.push("xmv-date-range-picker"), b;
    });
    y("tdClick", (b) => {
      if (s.type.value == "date" || s.type.value == "month")
        t.emit("update:modelValue", s.getVal()), s.popoverRef.value.hide();
      else if (s.type.value == "daterange" || s.type.value == "monthrange") {
        if (n.dateList.length != 2)
          return false;
        let R = n.dateList.sort((L, z) => L.isBefore(z) ? -1 : L.isAfter(z) ? 1 : 0);
        n.dateObj.left = R[0], n.dateObj.right = R[1], t.emit("update:modelValue", [s.getVal(), a.getVal()]), s.popoverRef.value.hide();
      }
    });
    const g = () => {
      u.value = true;
    }, $ = () => {
      l.value.value = "", i.value.value = "", n.dateList = [], _("removeCurrent"), t.emit("update:modelValue", []);
    }, k = () => {
      o.value.val(""), n.dateObj.left = new Object(), _("removeCurrent"), t.emit("update:modelValue", "");
    };
    watch(() => e.modelValue, (b) => {
      x(b);
    });
    const x = (b) => {
      if (F(b))
        return false;
      e.type == "date" || e.type == "month" ? (s.setMode(b), n.dateObj.left = $e(b), s.setInput()) : e.type == "daterange" ? (n.dateObj.left = $e(b[0]), n.dateObj.right = $e(b[1]), n.handleList($e(b[0])), n.handleList($e(b[1])), n.dateObj.left.diff(n.dateObj.right, "month") == 0 ? (s.setMode(b[0]), a.setMode(n.dateObj.left.add(1, "month").format(s.format))) : (s.setMode(b[0]), a.setMode(b[1])), s.setInput(), a.setInput()) : e.type == "monthrange" && (n.dateObj.left = $e(b[0]), n.dateObj.right = $e(b[1]), n.handleList($e(b[0])), n.handleList($e(b[1])), s.setMode(b[0]), a.setMode(b[1]), s.setInput(), a.setInput()), _("change");
    };
    return onMounted(() => {
      e.type == "date" || e.type == "month" ? (o.value.setInputWidth(1), s.inputRef = o, s.inputEl = o.value.inputRef) : (e.type == "daterange" || e.type == "monthrange") && (s.inputEl = l.value, a.inputEl = i.value), F(e.modelValue) || x(e.modelValue), _("change");
    }), {
      datePickerMode: s,
      datePickerRightMode: a,
      computePanelClass: f,
      inputRef: o,
      leftInputRef: l,
      rightInputRef: i,
      daterangeRef: r,
      isActive: u,
      handleDateRangeMouseup: g,
      handleDateRangeClose: $,
      handleDateClear: k
    };
  }
}), Au = {
  type: "text",
  class: "xmv-range-input",
  ref: "leftInputRef"
}, Vu = /* @__PURE__ */ createBaseVNode("span", { class: "xmv-range-separator" }, "到", -1), Bu = {
  type: "text",
  class: "xmv-range-input",
  ref: "rightInputRef"
}, Iu = { class: "xmv-picker-panel__body-wrapper" }, Nu = { class: "xmv-picker-panel__body" }, zu = /* @__PURE__ */ createBaseVNode("div", { class: "xmv-picker-panel__footer" }, null, -1);
function Pu(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-input"), i = resolveComponent("xmv-icon"), r = resolveComponent("xmv-popover"), u = resolveComponent("xmv-calendar");
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(r, {
      placement: "bottom",
      ref: e.datePickerMode.popoverRef
    }, {
      trigger: withCtx(() => [
        e.type != "daterange" && e.type != "monthrange" ? (openBlock(), createBlock(l, {
          key: 0,
          class: "xmv-date-editor xmv-date-editor xmv-date-editor--date",
          size: e.size,
          style: normalizeStyle(e.style),
          "prefix-icon": "calendar",
          clearable: "",
          ref: "inputRef",
          onClear: e.handleDateClear
        }, null, 8, ["size", "style", "onClear"])) : createCommentVNode("", true),
        e.type == "daterange" || e.type == "monthrange" ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["xmv-date-editor xmv-date-editor--daterange xmv-input__wrapper xmv-range-editor xmv-range-editor--default", { "is-active": e.isActive, "xmv-date-time-range-picker": e.withTime != null }]),
          onClick: t[0] || (t[0] = (...c) => e.handleDateRangeMouseup && e.handleDateRangeMouseup(...c)),
          ref: "daterangeRef"
        }, [
          createVNode(i, {
            name: "calendar",
            class: "xmv-input__icon xmv-range__icon"
          }),
          createBaseVNode("input", Au, null, 512),
          Vu,
          createBaseVNode("input", Bu, null, 512),
          createVNode(i, {
            name: "circleClose",
            onClick: withModifiers(e.handleDateRangeClose, ["stop"]),
            class: "xmv-input__icon xmv-range__close-icon"
          }, null, 8, ["onClick"])
        ], 2)) : createCommentVNode("", true)
      ]),
      _: 1
    }, 512),
    createBaseVNode("div", {
      class: normalizeClass(["xmv-picker-panel", e.computePanelClass])
    }, [
      createBaseVNode("div", Iu, [
        createBaseVNode("div", Nu, [
          createVNode(u, { dMode: e.datePickerMode }, null, 8, ["dMode"]),
          e.type == "daterange" || e.type == "monthrange" ? (openBlock(), createBlock(u, {
            key: 0,
            dMode: e.datePickerRightMode
          }, null, 8, ["dMode"])) : createCommentVNode("", true)
        ])
      ]),
      zu
    ], 2)
  ], 64);
}
const Ou = /* @__PURE__ */ w(Eu, [["render", Pu]]);
var at = {}, Hu = {
  get exports() {
    return at;
  },
  set exports(e) {
    at = e;
  }
};
(function(e, t) {
  (function(n, s) {
    e.exports = s();
  })(Mt, function() {
    var n = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, s = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, a = /\d\d/, o = /\d\d?/, l = /\d*[^-_:/,()\s\d]+/, i = {}, r = function(g) {
      return (g = +g) + (g > 68 ? 1900 : 2e3);
    }, u = function(g) {
      return function($) {
        this[g] = +$;
      };
    }, c = [/[+-]\d\d:?(\d\d)?|Z/, function(g) {
      (this.zone || (this.zone = {})).offset = function($) {
        if (!$ || $ === "Z")
          return 0;
        var k = $.match(/([+-]|\d\d)/g), x = 60 * k[1] + (+k[2] || 0);
        return x === 0 ? 0 : k[0] === "+" ? -x : x;
      }(g);
    }], v = function(g) {
      var $ = i[g];
      return $ && ($.indexOf ? $ : $.s.concat($.f));
    }, y = function(g, $) {
      var k, x = i.meridiem;
      if (x) {
        for (var b = 1; b <= 24; b += 1)
          if (g.indexOf(x(b, 0, $)) > -1) {
            k = b > 12;
            break;
          }
      } else
        k = g === ($ ? "pm" : "PM");
      return k;
    }, _ = { A: [l, function(g) {
      this.afternoon = y(g, false);
    }], a: [l, function(g) {
      this.afternoon = y(g, true);
    }], S: [/\d/, function(g) {
      this.milliseconds = 100 * +g;
    }], SS: [a, function(g) {
      this.milliseconds = 10 * +g;
    }], SSS: [/\d{3}/, function(g) {
      this.milliseconds = +g;
    }], s: [o, u("seconds")], ss: [o, u("seconds")], m: [o, u("minutes")], mm: [o, u("minutes")], H: [o, u("hours")], h: [o, u("hours")], HH: [o, u("hours")], hh: [o, u("hours")], D: [o, u("day")], DD: [a, u("day")], Do: [l, function(g) {
      var $ = i.ordinal, k = g.match(/\d+/);
      if (this.day = k[0], $)
        for (var x = 1; x <= 31; x += 1)
          $(x).replace(/\[|\]/g, "") === g && (this.day = x);
    }], M: [o, u("month")], MM: [a, u("month")], MMM: [l, function(g) {
      var $ = v("months"), k = (v("monthsShort") || $.map(function(x) {
        return x.slice(0, 3);
      })).indexOf(g) + 1;
      if (k < 1)
        throw new Error();
      this.month = k % 12 || k;
    }], MMMM: [l, function(g) {
      var $ = v("months").indexOf(g) + 1;
      if ($ < 1)
        throw new Error();
      this.month = $ % 12 || $;
    }], Y: [/[+-]?\d+/, u("year")], YY: [a, function(g) {
      this.year = r(g);
    }], YYYY: [/\d{4}/, u("year")], Z: c, ZZ: c };
    function f(g) {
      var $, k;
      $ = g, k = i && i.formats;
      for (var x = (g = $.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(oe, G, he) {
        var ge = he && he.toUpperCase();
        return G || k[he] || n[he] || k[ge].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(H, N, B) {
          return N || B.slice(1);
        });
      })).match(s), b = x.length, R = 0; R < b; R += 1) {
        var L = x[R], z = _[L], j = z && z[0], ne = z && z[1];
        x[R] = ne ? { regex: j, parser: ne } : L.replace(/^\[|\]$/g, "");
      }
      return function(oe) {
        for (var G = {}, he = 0, ge = 0; he < b; he += 1) {
          var H = x[he];
          if (typeof H == "string")
            ge += H.length;
          else {
            var N = H.regex, B = H.parser, Y = oe.slice(ge), I = N.exec(Y)[0];
            B.call(G, I), oe = oe.replace(I, "");
          }
        }
        return function(X) {
          var P = X.afternoon;
          if (P !== void 0) {
            var se = X.hours;
            P ? se < 12 && (X.hours += 12) : se === 12 && (X.hours = 0), delete X.afternoon;
          }
        }(G), G;
      };
    }
    return function(g, $, k) {
      k.p.customParseFormat = true, g && g.parseTwoDigitYear && (r = g.parseTwoDigitYear);
      var x = $.prototype, b = x.parse;
      x.parse = function(R) {
        var L = R.date, z = R.utc, j = R.args;
        this.$u = z;
        var ne = j[1];
        if (typeof ne == "string") {
          var oe = j[2] === true, G = j[3] === true, he = oe || G, ge = j[2];
          G && (ge = j[2]), i = this.$locale(), !oe && ge && (i = k.Ls[ge]), this.$d = function(Y, I, X) {
            try {
              if (["x", "X"].indexOf(I) > -1)
                return new Date((I === "X" ? 1e3 : 1) * Y);
              var P = f(I)(Y), se = P.year, ue = P.month, U = P.day, pe = P.hours, ye = P.minutes, ke = P.seconds, de = P.milliseconds, _e = P.zone, Se = /* @__PURE__ */ new Date(), fe = U || (se || ue ? 1 : Se.getDate()), Ce = se || Se.getFullYear(), we = 0;
              se && !ue || (we = ue > 0 ? ue - 1 : Se.getMonth());
              var O = pe || 0, le = ye || 0, ve = ke || 0, De = de || 0;
              return _e ? new Date(Date.UTC(Ce, we, fe, O, le, ve, De + 60 * _e.offset * 1e3)) : X ? new Date(Date.UTC(Ce, we, fe, O, le, ve, De)) : new Date(Ce, we, fe, O, le, ve, De);
            } catch (e2) {
              return /* @__PURE__ */ new Date("");
            }
          }(L, ne, z), this.init(), ge && ge !== true && (this.$L = this.locale(ge).$L), he && L != this.format(ne) && (this.$d = /* @__PURE__ */ new Date("")), i = {};
        } else if (ne instanceof Array)
          for (var H = ne.length, N = 1; N <= H; N += 1) {
            j[1] = ne[N - 1];
            var B = k.apply(this, j);
            if (B.isValid()) {
              this.$d = B.$d, this.$L = B.$L, this.init();
              break;
            }
            N === H && (this.$d = /* @__PURE__ */ new Date(""));
          }
        else
          b.call(this, R);
      };
    };
  });
})(Hu);
const Wu = at;
class gt {
  constructor() {
    this.inputEl = null;
  }
}
function He(e) {
  return e < 10 ? "0" + parseInt(e) : e;
}
function ju(e, t) {
  const n = [];
  for (let a = 0; a < e.length; a++) {
    const o = Math.abs(a - t);
    n.push({ index: a, distance: o });
  }
  return n.sort((a, o) => a.distance - o.distance), n.map((a) => a.index);
}
const Yu = defineComponent({
  name: "",
  emits: ["scrollNum"],
  props: {
    list: { type: Array },
    type: String,
    pos: String
  },
  setup(e, t) {
    const n = ref(null), s = ref(null), a = inject("IsRange");
    inject("EventBus");
    const l = hn((c) => {
      let v = u(c.ver);
      n.value.scroll(v), r({ num: v / 32, needEmit: true });
    }, 200), i = (c) => {
      let v = parseInt(c.target.getAttribute("val"));
      n.value.scroll(v * 32), r({ num: v, needEmit: true });
    }, r = ({ num: c, needEmit: v }) => {
      c = parseInt(c), s.value.querySelectorAll("li").forEach((f) => {
        xe(f, "is-active");
      });
      let _ = s.value.querySelector('[val="' + c + '"]');
      if (a) {
        if (Oe(_, "is-disabled"))
          if (e.pos == "left") {
            let f = s.value.querySelectorAll("li:not(.is-disabled)");
            _ = f[f.length - 1], c = parseInt(_.getAttribute("val"));
          } else
            _ = s.value.querySelector("li:not(.is-disabled)"), c = parseInt(_.getAttribute("val"));
      } else if (Oe(_, "is-disabled")) {
        let f = ju(e.list, c);
        for (let g = 0; g < f.length; g++) {
          let $ = f[g];
          if (!e.list[$].isDisabled) {
            _ = s.value.querySelector('li[val="' + e.list[$].value + '"]'), c = e.list[$].value;
            break;
          }
        }
      }
      Le(_, "is-active"), n.value.scroll(c * 32), v && t.emit("scrollNum", c);
    }, u = (c) => {
      const y = Math.floor(c / 32), _ = c % 32;
      let f;
      return _ >= 32 / 2 ? f = (y + 1) * 32 : f = y * 32, f;
    };
    return { scrollbarRef: n, ulRef: s, handleScroll: l, handleClick: i, setActive: r };
  }
}), Fu = {
  class: "xmv-time-spinner__list",
  ref: "ulRef"
}, Xu = ["val"];
function Uu(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-scrollbar");
  return openBlock(), createBlock(l, {
    class: "xmv-time-spinner__wrapper",
    ref: "scrollbarRef",
    onScroll: e.handleScroll
  }, {
    default: withCtx(() => [
      createBaseVNode("ul", Fu, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(e.list, (i) => (openBlock(), createElementBlock("li", {
          class: normalizeClass(["xmv-time-spinner__item", { "is-disabled": i.isDisabled }]),
          val: i.value,
          onClick: t[0] || (t[0] = (...r) => e.handleClick && e.handleClick(...r))
        }, toDisplayString(i.label), 11, Xu))), 256))
      ], 512)
    ]),
    _: 1
  }, 8, ["onScroll"]);
}
const mt = /* @__PURE__ */ w(Yu, [["render", Uu]]), qu = defineComponent({
  name: "",
  emits: ["val"],
  components: { xmvTimeScroll: mt },
  props: {
    pos: String
  },
  setup(e, t) {
    const { $on: n, $emit: s } = inject("EventBus"), a = ref(null), o = ref([]), l = [];
    for (let c = 0; c < 24; c++)
      l.push({ label: He(c), value: c });
    o.value = l;
    const i = inject("Hour"), r = (c) => {
      i.value = c, t.emit("val", c);
    }, u = (c) => {
      i.value = c, a.value.setActive({ num: c, needEmit: false });
    };
    return n("range", (c) => {
      if (c.type == "hour") {
        if (c.pos == "left" && e.pos == "right") {
          let v = parseInt(c.val);
          o.value.forEach((y) => {
            y.isDisabled = y.value < v;
          });
        } else if (c.pos == "right" && e.pos == "left") {
          let v = parseInt(c.val);
          o.value.forEach((y) => {
            y.isDisabled = y.value > v;
          });
        }
      }
    }), n("disabled", (c) => {
      o.value.forEach((v) => {
        v.isDisabled = c.flag;
      });
    }), n("setDisabledHour", (c) => {
      if (!c)
        return false;
      o.value.forEach((v) => {
        v.isDisabled = c.includes(v.value);
      });
    }), { list: o, handleNum: r, setVal: u, scrollRef: a };
  }
});
function Gu(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-time-scroll");
  return openBlock(), createBlock(l, {
    list: e.list,
    onScrollNum: e.handleNum,
    ref: "scrollRef",
    type: "hour",
    pos: e.pos
  }, null, 8, ["list", "onScrollNum", "pos"]);
}
const St = /* @__PURE__ */ w(qu, [["render", Gu]]), Zu = defineComponent({
  name: "",
  components: { xmvTimeScroll: mt },
  props: {
    pos: String
  },
  setup(e, t) {
    const n = ref(null), { $on: s, $emit: a } = inject("EventBus"), o = ref([]), l = [];
    for (let c = 0; c < 60; c++)
      l.push({ label: He(c), value: c });
    o.value = l;
    const i = inject("Minute"), r = (c) => {
      i.value = c, t.emit("val", c);
    }, u = (c) => {
      i.value = c, n.value.setActive({ num: c, needEmit: false });
    };
    return s("range", (c) => {
      if (c.type == "minute") {
        if (c.pos == "left" && e.pos == "right") {
          let v = parseInt(c.val);
          o.value.forEach((y) => {
            y.isDisabled = y.value < v;
          });
        } else if (c.pos == "right" && e.pos == "left") {
          let v = parseInt(c.val);
          o.value.forEach((y) => {
            y.isDisabled = y.value > v;
          });
        }
      }
    }), s("disabled", (c) => {
      o.value.forEach((v) => {
        v.isDisabled = c.flag;
      });
    }), s("setDisabledMinute", (c) => {
      if (!c)
        return false;
      o.value.forEach((v) => {
        v.isDisabled = c.includes(v.value);
      });
    }), { list: o, handleNum: r, scrollRef: n, setVal: u };
  }
});
function Qu(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-time-scroll");
  return openBlock(), createBlock(l, {
    list: e.list,
    onScrollNum: e.handleNum,
    ref: "scrollRef",
    type: "minute",
    pos: e.pos
  }, null, 8, ["list", "onScrollNum", "pos"]);
}
const Dt = /* @__PURE__ */ w(Zu, [["render", Qu]]), Ku = defineComponent({
  name: "",
  components: { xmvTimeScroll: mt },
  props: {
    pos: String
  },
  setup(e, t) {
    const n = ref(null), { $on: s, $emit: a } = inject("EventBus"), o = ref([]), l = [];
    for (let c = 0; c < 60; c++)
      l.push({ label: He(c), value: c });
    o.value = l;
    const i = inject("Second"), r = (c) => {
      i.value = c, t.emit("val", c);
    }, u = (c) => {
      i.value = c, n.value.setActive({ num: c, needEmit: false });
    };
    return s("range", (c) => {
      if (c.type == "second") {
        if (c.pos == "left" && e.pos == "right") {
          let v = parseInt(c.val);
          o.value.forEach((y) => {
            y.isDisabled = y.value < v;
          });
        } else if (c.pos == "right" && e.pos == "left") {
          let v = parseInt(c.val);
          o.value.forEach((y) => {
            y.isDisabled = y.value > v;
          });
        }
      }
    }), s("disabled", (c) => {
      o.value.forEach((v) => {
        v.isDisabled = c.flag;
      });
    }), s("setDisabledSecond", (c) => {
      if (!c)
        return false;
      o.value.forEach((v) => {
        v.isDisabled = c.includes(v.value);
      });
    }), { list: o, handleNum: r, scrollRef: n, setVal: u };
  }
});
function Ju(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-time-scroll");
  return openBlock(), createBlock(l, {
    list: e.list,
    onScrollNum: e.handleNum,
    ref: "scrollRef",
    type: "second",
    pos: e.pos
  }, null, 8, ["list", "onScrollNum", "pos"]);
}
const Rt = /* @__PURE__ */ w(Ku, [["render", Ju]]), ec = defineComponent({
  name: "",
  emits: ["val"],
  props: {
    tMode: Object,
    pos: String
  },
  components: { xmvTimeHour: St, xmvTimeMinute: Dt, xmvTimeSecond: Rt },
  setup({ tMode: e, pos: t }, n) {
    inject("EventBus");
    const s = ref(null), a = ref(null), o = ref(null), l = ref("0"), i = ref("0"), r = ref("0");
    return provide("Hour", l), provide("Minute", i), provide("Second", r), {
      timeHourRef: s,
      timeMinuteRef: a,
      timeSecondRef: o,
      handleVal: () => {
        let v = He(l.value) + ":" + He(i.value) + ":" + He(r.value);
        e.inputEl.value = v, n.emit("val", { pos: t, value: v });
      },
      dispatchVal: (v) => {
        let y = v.split(":");
        s.value.setVal(y[0]), a.value.setVal(y[1]), o.value.setVal(y[2]), e.inputEl.value = v;
      }
    };
  }
}), tc = { class: "xmv-time-panel__content has-seconds" }, nc = { class: "xmv-time-spinner has-seconds" };
function sc(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-time-hour"), i = resolveComponent("xmv-time-minute"), r = resolveComponent("xmv-time-second");
  return openBlock(), createElementBlock("div", tc, [
    createBaseVNode("div", nc, [
      createVNode(l, {
        onVal: e.handleVal,
        ref: "timeHourRef",
        pos: e.pos
      }, null, 8, ["onVal", "pos"]),
      createVNode(i, {
        onVal: e.handleVal,
        ref: "timeMinuteRef",
        pos: e.pos
      }, null, 8, ["onVal", "pos"]),
      createVNode(r, {
        onVal: e.handleVal,
        ref: "timeSecondRef",
        pos: e.pos
      }, null, 8, ["onVal", "pos"])
    ])
  ]);
}
const ac = /* @__PURE__ */ w(ec, [["render", sc]]), oc = defineComponent({
  name: "xmvTimePicker",
  props: {
    modelValue: String | Array,
    isRange: String,
    splitSymbol: { type: String, default: ":" },
    size: String,
    style: String | Object,
    disabledHours: Array,
    disabledMinutes: Array,
    disabledSeconds: Array
  },
  components: { xmvTimePanel: ac, xmvTimeHour: St, xmvTimeMinute: Dt, xmvTimeSecond: Rt },
  setup(e, t) {
    $e.extend(Wu);
    const n = ref(null), s = ref(null), a = ref(null), o = ref(null), l = ref(null), i = new gt(), r = new gt(), u = inject("Xmv-Event-On"), c = ref(false), v = reactive({
      listeners: {}
    }), { $on: y, $emit: _ } = be(v);
    provide("EventBus", { $on: y, $emit: _ }), provide("IsRange", e.isRange != null), u("mouseup", (L) => {
      c.value = false;
    });
    const f = () => {
      t.emit("update:modelValue", "");
    };
    watch(() => e.modelValue, (L) => {
      g(L);
    });
    const g = (L) => {
      if (F(L))
        return false;
      if (e.isRange != null) {
        if (L[0] && n.value.dispatchVal(L[0]), L[1] && s.value.dispatchVal(L[1]), _("disabled", { flag: false }), L[0] && !L[1] || !L[0] && L[1]) {
          let z = L[0].split(":"), j = L[1].split(":");
          _("range", { pos: "left", val: z[0], type: "hour" }), _("range", { pos: "right", val: j[0], type: "hour" });
        } else if (L[0] && L[1]) {
          let z = L[0].split(":"), j = L[1].split(":");
          _("range", { pos: "left", val: z[0], type: "hour" }), _("range", { pos: "right", val: j[0], type: "hour" }), z[0] == j[0] && (_("range", { pos: "left", val: z[1], type: "minute" }), _("range", { pos: "right", val: j[1], type: "minute" }), z[1] == j[1] && (_("range", { pos: "left", val: z[2], type: "second" }), _("range", { pos: "right", val: j[2], type: "second" })));
        }
      } else
        n.value.dispatchVal(L);
    }, $ = (L) => {
      e.isRange != null ? t.emit("update:modelValue", [
        i.inputEl.value,
        r.inputEl.value
      ]) : t.emit("update:modelValue", L.value);
    }, k = () => {
      g(e.modelValue);
    }, x = () => {
      if (e.isRange != null) {
        let L = i.inputEl.value, z = r.inputEl.value, j = $e(L, "HH:mm:ss", true).isValid(), ne = $e(z, "HH:mm:ss", true).isValid();
        j || F(L) || (i.inputEl.value = e.modelValue[0] ? e.modelValue[0] : ""), ne || F(z) || (r.inputEl.value = e.modelValue[1] ? e.modelValue[1] : ""), t.emit("update:modelValue", [
          i.inputEl.value,
          r.inputEl.value
        ]);
      } else {
        let L = a.value.getVal();
        $e(L, "HH:mm:ss", true).isValid() || F(L) ? L != e.modelValue && t.emit("update:modelValue", L) : a.value.val(e.modelValue);
      }
    }, b = () => {
      c.value = true;
    }, R = () => {
      o.value.value = "", l.value.value = "", _("disabled", { flag: false }), t.emit("update:modelValue", []);
    };
    return onMounted(() => {
      e.isRange != null ? (i.inputEl = o.value, r.inputEl = l.value) : i.inputEl = a.value.inputRef, a.value && a.value.setInputWidth(1), g(e.modelValue), _("setDisabledHour", e.disabledHours), _("setDisabledMinute", e.disabledMinutes), _("setDisabledSecond", e.disabledSeconds);
    }), {
      panelRef: n,
      panleRightRef: s,
      inputRef: a,
      timePickerMode: i,
      timePickerRightMode: r,
      isActive: c,
      leftInputRef: o,
      rightInputRef: l,
      handlePopoverShow: k,
      handleClear: f,
      handleVal: $,
      handleTimeRangeMouseup: b,
      handleTimeRangeClose: R,
      handlePopoverHide: x
    };
  }
}), lc = {
  type: "text",
  class: "xmv-range-input",
  ref: "leftInputRef",
  placeholder: "请输入"
}, ic = /* @__PURE__ */ createBaseVNode("span", { class: "xmv-range-separator" }, "到", -1), rc = {
  type: "text",
  class: "xmv-range-input",
  ref: "rightInputRef",
  placeholder: "请输入"
}, dc = { class: "cell" }, uc = { class: "cell" }, cc = /* @__PURE__ */ createBaseVNode("div", { class: "xmv-time-panel__footer" }, null, -1);
function mc(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-input"), i = resolveComponent("xmv-icon"), r = resolveComponent("xmv-popover"), u = resolveComponent("xmv-time-panel");
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(r, {
      beStripped: true,
      onShow: e.handlePopoverShow,
      onHide: e.handlePopoverHide
    }, {
      trigger: withCtx(() => [
        e.isRange == null ? (openBlock(), createBlock(l, {
          key: 0,
          class: "xmv-date-editor xmv-date-editor--time",
          style: normalizeStyle(e.style),
          size: e.size,
          "prefix-icon": "clock",
          clearable: "",
          ref: "inputRef",
          onClear: e.handleClear
        }, null, 8, ["style", "size", "onClear"])) : (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["xmv-date-editor xmv-date-editor--daterange xmv-input__wrapper xmv-range-editor xmv-range-editor--default", { "is-active": e.isActive }]),
          onClick: t[0] || (t[0] = (...c) => e.handleTimeRangeMouseup && e.handleTimeRangeMouseup(...c)),
          ref: "daterangeRef"
        }, [
          createVNode(i, {
            name: "clock",
            class: "xmv-input__icon xmv-range__icon"
          }),
          createBaseVNode("input", lc, null, 512),
          ic,
          createBaseVNode("input", rc, null, 512),
          createVNode(i, {
            name: "circleClose",
            onClick: withModifiers(e.handleTimeRangeClose, ["stop"]),
            class: "xmv-input__icon xmv-range__close-icon"
          }, null, 8, ["onClick"])
        ], 2))
      ]),
      _: 1
    }, 8, ["onShow", "onHide"]),
    createBaseVNode("div", {
      class: normalizeClass(["xmv-time-panel", { "xmv-time-panel-range": e.isRange != null }])
    }, [
      createBaseVNode("div", dc, [
        createVNode(u, {
          onVal: e.handleVal,
          tMode: e.timePickerMode,
          ref: "panelRef",
          pos: "left"
        }, null, 8, ["onVal", "tMode"])
      ]),
      createBaseVNode("div", uc, [
        e.isRange != null ? (openBlock(), createBlock(u, {
          key: 0,
          onVal: e.handleVal,
          ref: "panleRightRef",
          tMode: e.timePickerRightMode,
          pos: "right"
        }, null, 8, ["onVal", "tMode"])) : createCommentVNode("", true)
      ]),
      cc
    ], 2)
  ], 64);
}
const hc = /* @__PURE__ */ w(oc, [["render", mc]]);
class pc {
  constructor(t) {
    this.rctData = reactive({
      data: [],
      sData: []
    }), this.treeRef = null, this.transition = new Ke(), this.filterNodeMethod = this.__createFilterMethod(t.filterNodeMethod), this.showCheckbox = t.showCheckbox, this.notAssociated = t.notAssociated, this.lazy, this.load, this.onlyChildNode, this.$on = null, this.$emit = null, this.dropIndicatorTop = ref(0), this.dropIndicatorLeft = ref(0), this.dropIndicatorDisplay = ref(false), this.currentDragNode = null, this.currentDropEnterNode = null, this.tmpTreeBoundInfo;
  }
  loadData(t) {
    this.rctData.data = t;
  }
  filter(t) {
    let n = this;
    this.rctData.data.forEach((o) => {
      s(o, t);
    });
    function s(o, l) {
      a(o, l), F(o.children) || o.children.forEach((i) => {
        s(i, l);
      });
    }
    function a(o, l) {
      if (n.filterNodeMethod(o, l))
        for (; o; )
          o.isHidden = false, o = o.parent;
      else
        o.isHidden = true;
    }
  }
  handleNodeClick(t) {
    if (this.onlyChildNode && !F(t.children) || t.disabled || this.showCheckbox != null)
      return false;
    this.$emit("nodeClick", t);
  }
  handleExpandIconClick(t, n) {
    const s = () => {
      if (!F(t.children)) {
        let a = n.value.childrenDivRef, { domHeight: o } = ut(a);
        t.iconExpanded = !t.iconExpanded;
        const l = () => {
          t.isExpanded = !t.isExpanded;
        };
        t.isExpanded ? this.transition.heightCollapse(a, o + "px", 0, l) : this.transition.heightExpand(a, o + "px", 0, l);
      }
    };
    this.lazy && !t.isLoaded ? (t.isLoading = true, this.load(t).then((a) => {
      t.isLoading = false, t.children = a, t.isLoaded = true, nextTick(() => {
        s();
      });
    })) : s();
  }
  handleNodeCheck(t) {
    this.notAssociated != null || (F(t.children) || this.__handleChildrenNodeCheck(t, t.isChecked), this.__handleParentNodeCheck(t)), this.$emit("nodeCheck", this.getCheckedNode());
  }
  getCheckedNode() {
    var t = this;
    this.rctData.sData = [], this.rctData.data.forEach((s) => {
      n(s);
    });
    function n(s) {
      if (s.isChecked && t.rctData.sData.push(s), F(s.children))
        return false;
      s.children.forEach((a) => {
        n(a);
      });
    }
    return this.rctData.sData;
  }
  findNodeByParam(t, n, s = "value") {
    for (let a of t) {
      if (a[s] === n)
        return a;
      if (a.children && a.children.length > 0) {
        let o = this.findNodeByParam(a.children, n, s);
        if (o)
          return o;
      }
    }
    return null;
  }
  findParents(t, n, s = [], a = "value") {
    for (let o of t) {
      if (o[a] === n)
        return s;
      if (o.children && o.children.length > 0) {
        let l = s.concat(o), i = this.findParents(o.children, n, l);
        if (i)
          return i;
      }
    }
    return null;
  }
  __handleParentNodeCheck(t) {
    if (!t.parent)
      return false;
    let n = t.parent;
    this.__calcNodeStatus(n), this.__handleParentNodeCheck(n);
  }
  __handleChildrenNodeCheck(t, n) {
    if (t.isChecked = n, F(t.children))
      return false;
    t.children.forEach((s) => {
      this.__handleChildrenNodeCheck(s, n);
    });
  }
  __calcNodeStatus(t) {
    let n = false, s = false;
    function a(o) {
      if (F(o.children))
        return false;
      o.children.forEach((l) => {
        l.isChecked ? n = true : s = true, a(l);
      });
    }
    a(t), n && !s ? (t.isChecked = true, t.isIndeterminate = false) : n && s ? (t.isChecked = false, t.isIndeterminate = true) : !n && s && (t.isChecked = false, t.isIndeterminate = false);
  }
  __createFilterMethod(t) {
    return t ? (n, s) => t(n, s) : (n, s) => n.label.includes(s);
  }
  insertNode(t) {
    je("value", this.currentDragNode.value, this.rctData.data), t.children || (t.children = []), t.children.push(this.currentDragNode);
  }
  beforeNode(t) {
    je("value", this.currentDragNode.value, this.rctData.data), tt("value", t.value, this.currentDragNode, this.rctData.data);
  }
  afterNode(t) {
    je("value", this.currentDragNode.value, this.rctData.data), nt("value", t.value, this.currentDragNode, this.rctData.data);
  }
  activeNode(t, n) {
    let s = dt(this.rctData.data, t);
    s.isCurrent = true, this.$emit("nodeActive", { node: s, type: n });
    let a = Ge(this.rctData.data, t, [], n);
    if (!F(a)) {
      if (a.length > 1)
        for (let o = 1; o < a.length; o++)
          a[o].isExpanded = true;
      nextTick(() => {
        this.$emit("triggerExpandClick", { tmp: a[0], type: n });
      });
    }
  }
}
const fc = defineComponent({
  name: "xmvTree",
  emits: [
    "nodeClick",
    "nodeCheck",
    "node-drag-start",
    "node-drag-over",
    "node-drag-enter",
    "node-drag-leave",
    "node-drop",
    "node-drag-end"
  ],
  props: {
    showCheckbox: String,
    filterNodeMethod: {
      type: Function
    },
    notAssociated: String,
    // 父子节点是否相关联,
    draggable: String,
    lazy: Boolean,
    load: Function,
    data: Array,
    onlyChildNode: Boolean
  },
  setup(e, t) {
    const n = new pc(e), s = ref(null), a = reactive({
      listeners: {}
    }), { $on: o, $emit: l } = be(a);
    n.$on = o, n.$emit = l, n.treeRef = s, n.draggable = e.draggable != null, n.lazy = e.lazy, n.load = e.load, n.onlyChildNode = e.onlyChildNode, provide("Level", 0), provide("TreeMode", n), provide("Slots", t.slots), provide("EventBus", { $on: o, $emit: l });
    const i = computed(() => {
      let g = {
        left: n.dropIndicatorLeft.value + "px",
        top: n.dropIndicatorTop.value + "px"
      };
      return n.dropIndicatorDisplay.value || (g.display = "none"), g;
    });
    o("nodeClick", (g) => {
      t.emit("nodeClick", g);
    }), o("nodeCheck", (g) => {
      t.emit("nodeCheck", g);
    }), o("node-drag-start", (g) => {
      n.currentDragNode = g, t.emit("node-drag-start", g);
    }), o("node-drag-over", (g) => {
      t.emit("node-drag-over", g);
    }), o("node-drag-enter", (g) => {
      t.emit("node-drag-enter", g);
    }), o("node-drag-leave", (g) => {
      t.emit("node-drag-leave", g);
    }), o("node-drop", ({ node: g, pos: $ }) => {
      n.currentDragNode !== g && (t.emit("node-drop", g), $ == "center" ? n.insertNode(g) : $ == "bottom" ? n.afterNode(g) : n.beforeNode(g));
    }), o("node-drag-end", () => {
      t.emit("node-drag-end");
    });
    const r = (g) => {
      n.loadData(g);
    }, u = (g) => {
      n.filter(g);
    }, c = (g, $) => {
      n.rctData.sData = [];
      let k = g;
      nextTick(() => {
        k.forEach((x) => {
          let b = n.findNodeByParam(n.rctData.data, x);
          F(b) || (b.isChecked = true, n.rctData.sData.push(b));
        }), $(n.rctData.sData), e.notAssociated == null && nextTick(() => {
          n.rctData.sData.forEach((x) => {
            n.__handleParentNodeCheck(x);
          });
        });
      });
    }, v = (g) => {
      let $ = n.findNodeByParam(n.rctData.data, g);
      return n.findParents(n.rctData.data, g).forEach((x) => {
        x.isExpanded = true;
      }), nextTick(() => {
        n.handleNodeClick($);
      }), $;
    }, y = (g, $ = "value") => {
      n.activeNode(g, $);
    }, _ = (g) => {
      nextTick(() => {
        l("expandNodeByLevel", g);
      });
    }, f = (g) => {
      n.$emit("checkNode", g);
    };
    return watch(() => e.data, (g) => {
      r(g);
    }), onMounted(() => {
      F(e.data) || r(e.data);
    }), {
      treeMode: n,
      computeDropIndicatorStyle: i,
      treeRef: s,
      loadData: r,
      filter: u,
      setValue: v,
      setMultipleValue: c,
      activeNode: y,
      expandNodeByLevel: _,
      checkNode: f
    };
  }
}), vc = {
  class: "xmv-tree",
  ref: "treeRef"
};
function gc(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-tree-node");
  return openBlock(), createElementBlock("div", vc, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(e.treeMode.rctData.data, (i) => (openBlock(), createBlock(l, {
      node: i,
      key: i.value
    }, null, 8, ["node"]))), 128)),
    e.draggable != null ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "xmv-tree__drop-indicator",
      style: normalizeStyle(e.computeDropIndicatorStyle)
    }, null, 4)) : createCommentVNode("", true)
  ], 512);
}
const _c = /* @__PURE__ */ w(fc, [["render", gc]]), $c = defineComponent({
  name: "",
  props: {
    node: Object
  },
  setup(e, t) {
    const n = inject("Slots");
    return () => {
      let s = e.node;
      return n.default ? n.default.call(n, { node: s }) : h("span", { class: "xmv-tree-node__label" }, s.label);
    };
  }
});
function bc(e, t, n, s, a, o) {
  return null;
}
const xc = /* @__PURE__ */ w($c, [["render", bc]]), yc = defineComponent({
  name: "",
  emits: ["expandIconClick"],
  props: {
    node: Object
  },
  components: { xmvTreeLabel: xc },
  setup(e, t) {
    const n = inject("Level"), s = inject("TreeMode"), a = computed(() => {
      let r = [];
      return e.node.iconExpanded && r.push("expanded"), s.lazy ? e.node.isLoaded && F(e.node.children) && r.push("is-leaf") : F(e.node.children) && r.push("is-leaf"), r;
    }), o = computed(() => ({ "padding-left": n * 18 + "px" })), l = (r) => {
      e.node.isChecked = r, e.node.isIndeterminate = false, s.handleNodeCheck(e.node, r);
    }, i = () => {
      t.emit("expandIconClick");
    };
    return s.$on("checkNode", (r) => {
      r.value == e.node.value && l(r.isChecked);
    }), { treeMode: s, computeStyle: o, computeIconClass: a, handleCheck: l, handleExpandIconClick: i };
  }
});
function Cc(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon"), i = resolveComponent("xmv-checkbox"), r = resolveComponent("xmv-tree-label");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["xmv-tree-node__content", { "is-disabled": e.node.disabled }]),
    style: normalizeStyle(e.computeStyle)
  }, [
    createVNode(l, {
      name: "arrowRight",
      class: normalizeClass(["xmv-tree-node__expand-icon", e.computeIconClass]),
      onClick: withModifiers(e.handleExpandIconClick, ["stop"])
    }, null, 8, ["class", "onClick"]),
    e.treeMode.showCheckbox != null ? (openBlock(), createBlock(i, {
      key: 0,
      onCheck: e.handleCheck,
      checkStatus: e.node.isChecked,
      disabled: e.node.disabled,
      indeterminateStatus: e.node.isIndeterminate
    }, null, 8, ["onCheck", "checkStatus", "disabled", "indeterminateStatus"])) : createCommentVNode("", true),
    e.node.isLoading ? (openBlock(), createBlock(l, {
      key: 1,
      name: "loading",
      class: "xmv-tree-node__loading-icon is-loading"
    })) : createCommentVNode("", true),
    createVNode(r, { node: e.node }, null, 8, ["node"])
  ], 6);
}
const wc = /* @__PURE__ */ w(yc, [["render", Cc]]), kc = defineComponent({
  name: "",
  props: {
    node: Object
  },
  setup(e, t) {
    const n = ref(null);
    return provide("Level", inject("Level") + 1), onMounted(() => {
    }), { childrenDivRef: n };
  }
}), Mc = {
  class: "xmv-tree-node__children",
  ref: "childrenDivRef"
};
function Sc(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-tree-node");
  return openBlock(), createElementBlock("div", Mc, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(e.node.children, (i) => (openBlock(), createBlock(l, {
      node: i,
      parent: e.node,
      key: i.value
    }, null, 8, ["node", "parent"]))), 128))
  ], 512);
}
const Dc = /* @__PURE__ */ w(kc, [["render", Sc]]), Rc = defineComponent({
  name: "xmvTreeNode",
  components: { treeContent: wc, treeSub: Dc },
  props: {
    node: Object,
    parent: Object
  },
  setup(e, t) {
    const n = inject("TreeMode"), s = ref(null), a = ref(null), o = ref(false), l = inject("Level");
    let i, r, u;
    const c = () => {
      n.handleNodeClick(e.node);
    }, v = () => {
      n.handleExpandIconClick(e.node, s);
    };
    n.$on("nodeClick", (x) => {
      e.node.isCurrent = e.node === x;
    }), n.$on("nodeActive", ({ node: x, type: b }) => {
      x[b] != e.node[b] && (e.node.isCurrent = false);
    }), n.$on("triggerExpandClick", ({ tmp: x, type: b }) => {
      x[b] === e.node[b] && (e.node.isExpanded || v());
    }), n.$on("expandNodeByLevel", (x) => {
      x >= l && (e.node.isExpanded = true);
    });
    const y = (x) => {
      n.$emit("node-drag-start", e.node);
    }, _ = (x) => {
      x.preventDefault(), n.currentDropEnterNode === e.node || (n.currentDropEnterNode = e.node, n.tmpTreeBoundInfo = n.treeRef.value.getBoundingClientRect(), n.$emit("node-drag-enter", e.node), i = a.value.querySelector(".xmv-tree-node__label").offsetLeft, r = a.value.querySelector(".xmv-tree-node__content").clientHeight);
    }, f = (x) => {
      if (x.preventDefault(), n.currentDragNode === e.node)
        return false;
      let b = r, R = a.value.offsetTop + b / 2, z = x.clientY - n.tmpTreeBoundInfo.top - R;
      z > 5 ? (u = "bottom", n.dropIndicatorDisplay.value = true, n.dropIndicatorLeft.value = i, n.dropIndicatorTop.value = R + b / 2, o.value = false) : z < -5 ? (u = "top", n.dropIndicatorDisplay.value = true, n.dropIndicatorLeft.value = i, n.dropIndicatorTop.value = R - b / 2, o.value = false) : (u = "center", n.dropIndicatorDisplay.value = false, o.value = true), n.$emit("node-drag-over", e.node);
    }, g = (x) => {
      x.preventDefault(), o.value = false, n.dropIndicatorDisplay.value = false, n.currentDropEnterNode !== e.node && n.$emit("node-drag-leave", e.node);
    }, $ = (x) => {
      x.preventDefault(), o.value = false, n.dropIndicatorDisplay.value = false, n.$emit("node-drop", { node: e.node, pos: u });
    }, k = (x) => {
      x.preventDefault(), o.value = false, n.dropIndicatorDisplay.value = false, n.$emit("node-drag-end");
    };
    return onMounted(() => {
      e.parent != null && (e.node.parent = e.parent), n.draggable != null;
    }), {
      treeMode: n,
      subRef: s,
      nodeRef: a,
      isDropInner: o,
      handleClick: c,
      handleExpandIconClick: v,
      handleDragStart: y,
      handleDragOver: f,
      handleDragEnter: _,
      handleDragLeave: g,
      handleDrop: $,
      handleDragEnd: k
    };
  }
}), Lc = ["draggable"];
function Tc(e, t, n, s, a, o) {
  const l = resolveComponent("tree-content"), i = resolveComponent("tree-sub");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["xmv-tree-node", {
      "is-expanded": e.node.isExpanded,
      "is-current": e.node.isCurrent,
      "is-focusable": e.node.isFocusable,
      "is-hidden": e.node.isHidden,
      "is-drop-inner": e.isDropInner
    }]),
    ref: "nodeRef",
    draggable: e.treeMode.draggable,
    onDragstart: t[0] || (t[0] = withModifiers((...r) => e.handleDragStart && e.handleDragStart(...r), ["stop"])),
    onDragenter: t[1] || (t[1] = withModifiers((...r) => e.handleDragEnter && e.handleDragEnter(...r), ["stop"])),
    onDragleave: t[2] || (t[2] = withModifiers((...r) => e.handleDragLeave && e.handleDragLeave(...r), ["stop"])),
    onDragover: t[3] || (t[3] = withModifiers((...r) => e.handleDragOver && e.handleDragOver(...r), ["stop"])),
    onDragend: t[4] || (t[4] = withModifiers((...r) => e.handleDragEnd && e.handleDragEnd(...r), ["stop"])),
    onDrop: t[5] || (t[5] = withModifiers((...r) => e.handleDrop && e.handleDrop(...r), ["stop"])),
    onClick: t[6] || (t[6] = withModifiers((...r) => e.handleClick && e.handleClick(...r), ["stop"]))
  }, [
    createVNode(l, {
      node: e.node,
      onExpandIconClick: e.handleExpandIconClick
    }, null, 8, ["node", "onExpandIconClick"]),
    withDirectives(createVNode(i, {
      node: e.node,
      ref: "subRef"
    }, null, 8, ["node"]), [
      [vShow, e.node.isExpanded]
    ])
  ], 42, Lc);
}
const Ec = /* @__PURE__ */ w(Rc, [["render", Tc]]), Ac = defineComponent({
  name: "",
  props: {
    multiple: String,
    notAssociated: String,
    data: Array,
    modelValue: String | Array,
    onlyChildNode: Boolean,
    filterable: Boolean,
    filterNodeMethod: Function,
    lazy: Boolean,
    load: Function,
    collapseTags: Boolean
  },
  setup(e, t) {
    const n = ref(null), s = (i) => {
      n.value.loadTreeData(i);
    }, a = (i) => {
      t.emit("update:modelValue", i.value);
    }, o = (i) => {
      let r = [];
      i.forEach((u) => {
        r.push(u.value);
      }), t.emit("update:modelValue", r);
    };
    watch(() => e.data, (i) => {
      n.value.loadTreeData(i);
    }), watch(() => e.modelValue, (i) => {
      l(i);
    });
    const l = (i) => {
      e.multiple != null ? n.value.setTreeMultipleValue(i) : n.value.setTreeValue(i);
    };
    return onMounted(() => {
      F(e.data) || n.value.loadTreeData(e.data), F(e.modelValue) || l(e.modelValue);
    }), { xmvSelectRef: n, loadData: s, handleNodeClick: a, handleNodeCheck: o };
  }
});
function Vc(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-select");
  return openBlock(), createBlock(l, {
    type: "tree",
    ref: "xmvSelectRef",
    multiple: e.multiple,
    notAssociated: e.notAssociated,
    onlyChildNode: e.onlyChildNode,
    filterable: e.filterable,
    onNodeClick: e.handleNodeClick,
    onNodeCheck: e.handleNodeCheck,
    filterNodeMethod: e.filterNodeMethod,
    lazy: e.lazy,
    load: e.load,
    collapseTags: e.collapseTags
  }, null, 8, ["multiple", "notAssociated", "onlyChildNode", "filterable", "onNodeClick", "onNodeCheck", "filterNodeMethod", "lazy", "load", "collapseTags"]);
}
const Bc = /* @__PURE__ */ w(Ac, [["render", Vc]]), Ic = defineComponent({
  name: "",
  props: {
    title: { type: String, default: "" },
    width: String,
    modelValue: Boolean,
    beforeClose: Function,
    center: Boolean,
    alignCenter: Boolean,
    draggable: Boolean
  },
  setup(e, t) {
    const n = ref(true), s = ref(null), a = ref(0), o = ref(0);
    var l = null, i = null, r = 0, u = 0;
    let c, v, y;
    const _ = computed(() => {
      let b = {};
      return e.width != null && (b["--xmv-dialog-width"] = e.width), e.draggable && (b.transform = `translate(${a.value}px, ${o.value}px)`), b;
    }), f = computed(() => {
      let b = {};
      return e.alignCenter && (b.display = "flex"), b;
    }), g = () => {
      e.beforeClose != null ? e.beforeClose(() => {
        t.emit("update:modelValue", false);
      }) : t.emit("update:modelValue", false);
    }, $ = (b) => {
      if (!e.draggable)
        return false;
      c = s.value.getBoundingClientRect(), l = b.pageX, i = b.pageY, v = document.documentElement.clientWidth, y = document.documentElement.clientHeight, window.addEventListener("mouseup", x), window.addEventListener("mousemove", k);
    }, k = (b) => {
      b.preventDefault();
      let { pageX: R, pageY: L } = b, z = R - l, j = L - i;
      z + c.left + c.width >= v && (z = v - c.width - c.left), z + c.left <= 0 && (z = 0 - c.left), j + c.top <= 0 && (j = 0 - c.top), j + c.top + c.height >= y && (j = y - c.height - c.top), a.value = z + r, o.value = j + u;
    }, x = (b) => {
      window.removeEventListener("mouseup", x), window.removeEventListener("mousemove", k), r = a.value, u = o.value;
    };
    return { dialogRef: s, isShow: n, computeStyle: _, computeOverlayStyle: f, handleCloseClick: g, handleMousedown: $ };
  }
}), Nc = { class: "xmv-overlay" }, zc = { class: "xmv-dialog__title" }, Pc = { class: "xmv-dialog__body" }, Oc = { class: "xmv-dialog__footer" };
function Hc(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon");
  return openBlock(), createBlock(Transition, { name: "xmv-dialog" }, {
    default: withCtx(() => [
      withDirectives(createBaseVNode("div", Nc, [
        createBaseVNode("div", {
          class: "xmv-overlay-dialog",
          style: normalizeStyle(e.computeOverlayStyle)
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["xmv-dialog", {
              "is-align-center": e.alignCenter,
              "xmv-dialog--center": e.center,
              "is-draggable": e.draggable
            }]),
            style: normalizeStyle(e.computeStyle),
            ref: "dialogRef"
          }, [
            createBaseVNode("header", {
              class: "xmv-dialog__header",
              onMousedown: t[1] || (t[1] = withModifiers((i) => e.handleMousedown(i), ["stop"]))
            }, [
              createBaseVNode("span", zc, toDisplayString(e.title), 1),
              createBaseVNode("button", {
                class: "xmv-dialog__headerbtn",
                onClick: t[0] || (t[0] = (...i) => e.handleCloseClick && e.handleCloseClick(...i))
              }, [
                createVNode(l, {
                  name: "close",
                  class: "xmv-dialog__close"
                })
              ])
            ], 32),
            createBaseVNode("div", Pc, [
              renderSlot(e.$slots, "default")
            ]),
            createBaseVNode("footer", Oc, [
              renderSlot(e.$slots, "footer")
            ])
          ], 6)
        ], 4)
      ], 512), [
        [vShow, e.modelValue]
      ])
    ]),
    _: 3
  });
}
const Wc = /* @__PURE__ */ w(Ic, [["render", Hc]]), jc = defineComponent({
  name: "xmvForm",
  props: {
    mode: Object,
    rules: Object,
    labelWidth: String,
    labelPosition: { type: String, default: "right" },
    inline: { type: Boolean, default: false }
  },
  setup(e, t) {
    const n = [];
    provide("Props", e), provide("Collector", n);
    const s = reactive({
      listeners: {}
    }), { $on: a, $emit: o } = be(s);
    return provide("EventBus", { $on: a, $emit: o }), { computeFormClass: computed(() => {
      let r = [];
      return r.push("xmv-form--label-" + e.labelPosition), e.inline && r.push("xmv-form--inline"), r;
    }), validate: () => {
      let r = [];
      return n.forEach((u) => {
        r.push(u.proxy.validateByRules());
      }), Promise.all(r);
    } };
  }
});
function Yc(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("form", {
    class: normalizeClass(["xmv-form xmv-form--default", e.computeFormClass])
  }, [
    renderSlot(e.$slots, "default")
  ], 2);
}
const Fc = /* @__PURE__ */ w(jc, [["render", Yc]]), Xc = {
  required: { vMethod: Gc, message: "不能为空" }
};
function Uc(e, t) {
  let n = "";
  return F(t) || t.forEach((s) => {
    n == "" && (n = qc(e, s));
  }), n;
}
function qc(e, t) {
  let n = "", s = true, a = Object.keys(t);
  for (let o = 0; o < a.length; o++) {
    let l = a[o], i = Xc[l];
    if (i && (s = i.vMethod(e), !s)) {
      n = t.message || i.message;
      break;
    }
  }
  return n;
}
function Gc(e) {
  return !F(e);
}
const Zc = defineComponent({
  name: "xmvFormItem",
  props: {
    label: { type: String, default: "" },
    prop: String,
    required: Boolean,
    rules: Array
  },
  setup({ label: e, prop: t, required: n, rules: s }, a) {
    const o = inject("Props"), l = inject("Collector"), i = o.mode, r = o.rules || {}, u = ref(false), c = ref(""), v = ref(false);
    l.push(getCurrentInstance());
    const y = computed(() => {
      if (o.labelWidth != null)
        return { width: o.labelWidth };
    }), _ = computed(() => t.split(".").reduce((x, b) => x[b], i));
    t != null && watch(_, (k) => {
      f().then(() => {
      }).catch(() => {
      });
    });
    const f = () => new Promise((k, x) => {
      if (t == null)
        return k(), false;
      let b = t.split(".").reduce((z, j) => z[j], i);
      i[t];
      let R = r[t] || s, L = Uc(b, R);
      if (L ? (u.value = true, c.value = L) : (u.value = false, c.value = ""), u.value)
        x(t + ":" + L);
      else {
        let z = g();
        z ? z(b).then(() => {
          u.value = false, c.value = "", k();
        }).catch((j) => {
          u.value = true, c.value = j, x();
        }) : k();
      }
    }), g = () => {
      let k = null;
      return r[t].forEach((b) => {
        Object.keys(b).forEach((L) => {
          L == "validator" && (k = b[L]);
        });
      }), k;
    }, $ = computed(() => {
      if (n)
        return true;
      if (t == null)
        return false;
      let k = r[t] || s;
      if (!k)
        return false;
      let x = false;
      return k.forEach((b) => {
        Object.keys(b).forEach((L) => {
          L == "required" && (x = true);
        });
      }), x;
    });
    return { isError: u, errorInfo: c, isRequired: v, computeLabelStyle: y, computeRequired: $, validateByRules: f };
  }
}), Qc = { class: "xmv-form-item__content" }, Kc = {
  key: 0,
  class: "xmv-form-item__error"
};
function Jc(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["xmv-form-item", { "is-error": e.isError, "is-required": e.computeRequired }])
  }, [
    e.label != "" ? (openBlock(), createElementBlock("label", {
      key: 0,
      class: "xmv-form-item__label",
      style: normalizeStyle(e.computeLabelStyle)
    }, toDisplayString(e.label), 5)) : createCommentVNode("", true),
    createBaseVNode("div", Qc, [
      renderSlot(e.$slots, "default"),
      createVNode(Transition, { name: "form" }, {
        default: withCtx(() => [
          e.isError ? (openBlock(), createElementBlock("div", Kc, toDisplayString(e.errorInfo), 1)) : createCommentVNode("", true)
        ]),
        _: 1
      })
    ])
  ], 2);
}
const em = /* @__PURE__ */ w(Zc, [["render", Jc]]), tm = defineComponent({
  name: "",
  setup(e, t) {
    const n = ref(null);
    let s;
    const { $on: a, $emit: o } = inject("EventBus"), l = ref(1), i = ref("");
    a("colorVal", ($) => {
      i.value = $;
    });
    function r($) {
      const k = $.match(/\d+(\.\d+)?/g);
      if (k && k.length === 4) {
        const [x, b, R] = k;
        return `rgb(${x}, ${b}, ${R})`;
      } else
        return null;
    }
    const u = computed(() => {
      let $ = {}, k = i.value;
      if (k.indexOf("rgba") >= 0 && (k = r(k)), !F(k)) {
        let b = k.split(")")[0].replace("rgb", "rgba") + ",0)";
        $.background = `linear-gradient(to right, ${b} 0%, ${k} 100%)`;
      }
      return $;
    }), c = computed(() => ({ left: l.value * 100 + "%" })), v = ($) => {
      $.preventDefault(), window.addEventListener("mouseup", y), window.addEventListener("mousemove", _);
    }, y = () => {
      window.removeEventListener("mouseup", y), window.removeEventListener("mousemove", _);
    }, _ = ($) => {
      let k = parseInt($.clientX) - s.left, x = parseInt(k / s.width * 100);
      x <= 0 && (x = 0), x >= 100 && (x = 100), l.value = x / 100, o("alphaChange", l.value);
    };
    return {
      computeBarStyle: u,
      computeThumbStyle: c,
      thumbLeft: l,
      sliderRef: n,
      handleThumbMousedown: v,
      calcSliderBound: () => {
        s = n.value.getBoundingClientRect();
      },
      handleSliderClick: ($) => {
        let k = parseInt($.clientX) - s.left, x = parseInt(k / s.width * 100);
        x <= 0 && (x = 0), x >= 100 && (x = 100), l.value = x / 100, o("alphaChange", l.value);
      }
    };
  }
}), nm = {
  class: "xmv-color-alpha-slider",
  ref: "sliderRef"
};
function sm(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("div", nm, [
    createBaseVNode("div", {
      class: "xmv-color-alpha-slider__bar",
      style: normalizeStyle(e.computeBarStyle),
      onClick: t[0] || (t[0] = withModifiers((...l) => e.handleSliderClick && e.handleSliderClick(...l), ["stop"]))
    }, null, 4),
    createBaseVNode("div", {
      class: "xmv-color-alpha-slider__thumb",
      style: normalizeStyle(e.computeThumbStyle),
      onMousedown: t[1] || (t[1] = withModifiers((...l) => e.handleThumbMousedown && e.handleThumbMousedown(...l), ["stop"]))
    }, null, 36)
  ], 512);
}
const am = /* @__PURE__ */ w(tm, [["render", sm]]), om = defineComponent({
  name: "xmvColorPicker",
  components: { xmvAlphaSlider: am },
  props: {
    modelValue: String,
    showAlpha: String,
    size: String
  },
  setup(e, t) {
    const n = ref(0), s = ref("rgb(255,0,0)"), a = ref(""), o = ref(0), l = ref(0), i = ref(null), r = ref(null), u = 280, c = 180, v = ref(null);
    let y, _, f = 0, g = 0, $, k = 0, x = 0, b = 0, R = "", L = "rgb(255,0,0)", z = 8.6932;
    const j = reactive({
      listeners: {}
    }), { $on: ne, $emit: oe } = be(j);
    provide("EventBus", { $on: ne, $emit: oe });
    const G = inject("Xmv-Bubbling");
    ne("alphaChange", () => {
      de(fe());
    });
    const he = computed(() => {
      let O = [];
      return e.size != null && O.push("xmv-color-picker--" + e.size), O;
    }), ge = (O) => {
      G.status = false, _ = O.pageY, $ = n.value, window.addEventListener("mouseup", N), window.addEventListener("mousemove", H);
    }, H = (O) => {
      let { pageY: le } = O, ve = le - _ + $;
      ve <= 0 ? n.value = 0 : ve >= 176 ? n.value = 176 : n.value = ve, X(Math.floor(n.value * z)), P(f / u, g / c);
    }, N = (O) => {
      G.status = true, window.removeEventListener("mouseup", N), window.removeEventListener("mousemove", H);
    }, B = (O) => {
      G.status = false, y = O.pageX, _ = O.pageY, f = o.value, g = l.value, window.addEventListener("mouseup", I), window.addEventListener("mousemove", Y);
    }, Y = (O) => {
      let { pageX: le, pageY: ve } = O, De = le - y + f, Re = ve - _ + g;
      De <= 0 && (De = 0), De >= u && (De = u), Re <= 0 && (Re = 0), Re >= c && (Re = c), o.value = De, l.value = Re, P(o.value / u, l.value / c);
    }, I = (O) => {
      G.status = true, f = o.value, g = l.value, O.stopPropagation(), window.removeEventListener("mouseup", I), window.removeEventListener("mousemove", Y);
    }, X = (O) => {
      let le = Math.floor(O / 255), ve = O % 255;
      le == 6 && (s.value = "rgb(255,0,0)"), le == 0 ? s.value = "rgb(255 ," + ve + " ,0)" : le == 1 ? s.value = `rgb(${255 - ve},255,0)` : le == 2 ? s.value = `rgb(0,255,${ve})` : le == 3 ? s.value = `rgb(0,${255 - ve},255)` : le == 4 ? s.value = `rgb(${ve},0,255)` : le == 5 && (s.value = `rgb(255,0,${255 - ve})`), P();
    }, P = (O, le) => {
      const ve = [255, 255, 255], De = s.value.slice(4, -1).split(",").map(Number), Re = [0, 0, 0];
      let Tt = (1 - le) * ((1 - O) * ve[0] + O * De[0]) + le * ((1 - O) * Re[0] + O * Re[0]), Et = (1 - le) * ((1 - O) * ve[1] + O * De[1]) + le * ((1 - O) * Re[1] + O * Re[1]), At = (1 - le) * ((1 - O) * ve[2] + O * De[2]) + le * ((1 - O) * Re[2] + O * Re[2]);
      a.value = `rgb(${Math.floor(Tt)} ,${Math.floor(Et)} ,${Math.floor(At)})`, de(fe());
    }, se = () => {
      r.value.hide(), de(""), a.value = "", t.emit("update:modelValue", "");
    }, ue = () => {
      ye(), t.emit("update:modelValue", fe()), r.value.hide();
    }, U = () => {
      e.showAlpha != null && v.value.calcSliderBound();
    }, pe = () => {
      ke();
    }, ye = () => {
      k = o.value, x = l.value, b = n.value, R = a.value, L = s.value;
    }, ke = () => {
      o.value = k, l.value = x, n.value = b, a.value = R, s.value = L, de(fe());
    }, de = (O) => {
      oe("colorVal", O), i.value.val(O);
    };
    function _e(O, le) {
      return O.startsWith("rgba") ? O.replace(/[\d.]+\)$/, le + ")") : O.startsWith("rgb") ? O.replace("rgb", "rgba").replace(")", `, ${le})`) : O;
    }
    function Se(O) {
      const le = O.match(/\d+(\.\d+)?/g);
      return le && le.length === 4 ? parseFloat(le[3]) : null;
    }
    const fe = () => e.showAlpha != null && !F(a.value) ? _e(a.value, v.value.thumbLeft) : a.value;
    watch(() => e.modelValue, (O) => {
      Ce(O);
    });
    const Ce = (O) => {
      if (e.showAlpha != null) {
        let le = Se(O);
        le && (v.value.thumbLeft = le);
      }
      a.value = O, R = O, de(fe());
    }, we = computed(() => e.showAlpha != null && !F(a.value) ? _e(a.value, v.value.thumbLeft) : a.value);
    return onMounted(() => {
      e.modelValue != null && Ce(e.modelValue);
    }), {
      sliderRGB: s,
      selectedRGB: a,
      sliderTop: n,
      cursorX: o,
      cursorY: l,
      inputRef: i,
      popoverRef: r,
      alphaSliderRef: v,
      computeSelectedRGB: we,
      computeColorPickerClass: he,
      handleSliderMousedown: ge,
      handleCursorMousedown: B,
      handleClear: se,
      handleEnter: ue,
      handlePopoverHide: pe,
      handlePopoverShow: U
    };
  }
}), lm = { class: "xmv-color-picker__trigger" }, im = { class: "xmv-color-picker__color" }, rm = { style: { width: "320px", padding: "10px 10px 0 10px" } }, dm = { class: "xmv-color-dropdown__main-wrapper" }, um = { class: "xmv-color-hue-slider is-vertical hue-slider" }, cm = /* @__PURE__ */ createBaseVNode("div", { class: "xmv-color-hue-slider__bar" }, null, -1), mm = /* @__PURE__ */ createBaseVNode("div", { class: "xmv-color-svpanel__white" }, null, -1), hm = /* @__PURE__ */ createBaseVNode("div", { class: "xmv-color-svpanel__black" }, null, -1), pm = /* @__PURE__ */ createBaseVNode("div", null, null, -1), fm = [
  pm
], vm = { class: "xmv-color-dropdown__btns" }, gm = { class: "xmv-color-dropdown__value" };
function _m(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon"), i = resolveComponent("xmv-popover"), r = resolveComponent("xmv-alpha-slider"), u = resolveComponent("xmv-input"), c = resolveComponent("xmv-button");
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(i, {
      ref: "popoverRef",
      onHide: e.handlePopoverHide,
      onShow: e.handlePopoverShow
    }, {
      trigger: withCtx(() => [
        createBaseVNode("div", {
          class: normalizeClass(["xmv-color-picker xmv-tooltip__trigger", e.computeColorPickerClass])
        }, [
          createBaseVNode("div", lm, [
            createBaseVNode("span", im, [
              createBaseVNode("span", {
                class: "xmv-color-picker__color-inner",
                style: normalizeStyle({ "background-color": e.computeSelectedRGB })
              }, [
                createVNode(l, {
                  name: "arrowDown",
                  class: "xmv-color-picker__icon"
                })
              ], 4)
            ])
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["onHide", "onShow"]),
    createBaseVNode("div", rm, [
      createBaseVNode("div", dm, [
        createBaseVNode("div", um, [
          cm,
          createBaseVNode("div", {
            class: "xmv-color-hue-slider__thumb",
            style: normalizeStyle({ left: "0px", top: e.sliderTop + "px" }),
            onMousedown: t[0] || (t[0] = withModifiers((...v) => e.handleSliderMousedown && e.handleSliderMousedown(...v), ["stop"]))
          }, null, 36)
        ]),
        createBaseVNode("div", {
          class: "xmv-color-svpanel",
          style: normalizeStyle({ "background-color": e.sliderRGB })
        }, [
          mm,
          hm,
          createBaseVNode("div", {
            class: "xmv-color-svpanel__cursor",
            style: normalizeStyle({ left: e.cursorX + "px", top: e.cursorY + "px" }),
            onMousedown: t[1] || (t[1] = withModifiers((...v) => e.handleCursorMousedown && e.handleCursorMousedown(...v), ["stop"]))
          }, fm, 36)
        ], 4)
      ]),
      e.showAlpha != null ? (openBlock(), createBlock(r, {
        key: 0,
        ref: "alphaSliderRef"
      }, null, 512)) : createCommentVNode("", true),
      createBaseVNode("div", vm, [
        createBaseVNode("span", gm, [
          createVNode(u, {
            size: "small",
            ref: "inputRef"
          }, null, 512)
        ]),
        createVNode(c, {
          size: "small",
          text: "",
          onClick: e.handleClear
        }, {
          default: withCtx(() => [
            createTextVNode("清除")
          ]),
          _: 1
        }, 8, ["onClick"]),
        createVNode(c, {
          size: "small",
          plain: "",
          onClick: e.handleEnter
        }, {
          default: withCtx(() => [
            createTextVNode("确认")
          ]),
          _: 1
        }, 8, ["onClick"])
      ])
    ])
  ], 64);
}
const $m = /* @__PURE__ */ w(om, [["render", _m]]), bm = defineComponent({
  name: "xmvDrawer",
  props: {
    title: { type: String, default: "" },
    size: { type: String, default: "30%" },
    direction: {
      type: String,
      default: "rtl"
    },
    beforeClose: Function,
    withHeader: { type: Boolean, default: true },
    modelValue: Boolean
  },
  setup(e, t) {
    const n = ref(false), s = computed(() => {
      let i = [];
      return n.value && i.push("open"), i.push(e.direction), i;
    }), a = computed(() => {
      let i = {}, r = e.direction;
      return r == "rtl" || r == "ltr" ? i.width = e.size : i.height = e.size, i;
    }), o = () => {
      e.beforeClose != null ? e.beforeClose(() => {
        t.emit("update:modelValue", false);
      }) : t.emit("update:modelValue", false);
    };
    return {
      isOpenRef: n,
      computeClass: s,
      computeDrawerStyle: a,
      handleCloseClick: o,
      handleOverlayClick: () => {
        e.modelValue && o();
      }
    };
  }
}), xm = {
  key: 0,
  class: "xmv-drawer__header"
}, ym = { class: "xmv-drawer__title" }, Cm = { class: "xmv-drawer__body" }, wm = { class: "xmv-drawer__footer" };
function km(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon");
  return openBlock(), createBlock(Transition, { name: "xmv-drawer" }, {
    default: withCtx(() => [
      withDirectives(createBaseVNode("div", {
        class: "xmv-overlay",
        onClick: t[2] || (t[2] = (...i) => e.handleOverlayClick && e.handleOverlayClick(...i))
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["xmv-drawer", e.computeClass]),
          style: normalizeStyle(e.computeDrawerStyle),
          onClick: t[1] || (t[1] = withModifiers(() => {
          }, ["stop"]))
        }, [
          e.withHeader ? (openBlock(), createElementBlock("header", xm, [
            createBaseVNode("span", ym, toDisplayString(e.title), 1),
            createBaseVNode("button", {
              class: "xmv-drawer__close-btn",
              onClick: t[0] || (t[0] = (...i) => e.handleCloseClick && e.handleCloseClick(...i))
            }, [
              createVNode(l, {
                name: "close",
                class: "xmv-drawer__close"
              })
            ])
          ])) : createCommentVNode("", true),
          createBaseVNode("div", Cm, [
            renderSlot(e.$slots, "default")
          ]),
          createBaseVNode("div", wm, [
            renderSlot(e.$slots, "footer")
          ])
        ], 6)
      ], 512), [
        [vShow, e.modelValue]
      ])
    ]),
    _: 3
  });
}
const Mm = /* @__PURE__ */ w(bm, [["render", km]]);
class Sm {
  constructor(t) {
    this.rctData = reactive({
      itemList: []
    }), this.ctx, this.$on, this.$emit, this.$remove, this.tabPosition = t.tabPosition, this.editable = t.editable, this.barRef = ref(null), this.tabsNavRef = ref(null), this.tabsNavScrollRef = ref(null), this.tabsNavScrollX = ref(0), this.isScrollable = ref(false), this.barTranslateX = ref(0), this.barTranslateY = ref(0), this.barWidth = ref(0), this.barHeight = ref(0), this.currentOffsetLeft = 0;
  }
  remove(t) {
    let n;
    if (this.rctData.itemList.forEach((s, a) => {
      s.name == t.name && (n = a);
    }), this.rctData.itemList = this.rctData.itemList.filter((s) => s.name != t.name), t.isActive) {
      n >= this.rctData.itemList.length && (n = this.rctData.itemList.length - 1);
      let s = this.rctData.itemList[n];
      this.$emit("itemClick", s.name);
    }
  }
}
const Dm = defineComponent({
  name: "",
  props: {
    data: Object,
    index: Number
  },
  components: { xmvIcon: Ve },
  setup(e, t) {
    const n = ref(null), s = inject("TabsMode"), a = computed(() => {
      let u = ["xmv-tabs__item"];
      return u.push("is-" + s.tabPosition), e.data.isActive && u.push("is-active"), s.editable && u.push("is-closable"), u;
    }), o = (u) => {
      e.data.isActive = u == e.data.name, e.data.isActive && (s.tabPosition == "top" || s.tabPosition == "bottom" ? (s.barWidth.value = n.value.clientWidth - 20, s.barTranslateX.value = n.value.offsetLeft == 0 ? 0 : n.value.offsetLeft + 20) : (s.barHeight.value = n.value.clientHeight, s.barTranslateY.value = n.value.offsetTop));
    }, l = () => {
      e.data.isActive = true, s.$emit("itemClick", e.data.name);
    }, i = (u) => {
      u.stopPropagation(), s.remove(e.data), s.ctx.emit("remove", e.data.name);
    };
    s.$on("itemClick", o);
    const r = () => {
      let u = [];
      return e.data.slots.label ? (u.push(h(e.data.slots.label)), s.editable && u.push(h(Ve, {
        name: "close",
        class: "is-icon-close",
        onClick: i
      })), u) : (u.push(e.data.label), s.editable && u.push(h(Ve, {
        name: "close",
        class: "is-icon-close",
        onClick: i
      })), u);
    };
    return onUnmounted(() => {
      s.$remove("itemClick", o);
    }), () => h("div", {
      class: a.value,
      onClick: l,
      ref: n
    }, r());
  }
});
function Rm(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(e.computeClass),
    onClick: t[0] || (t[0] = (...l) => e.handleClick && e.handleClick(...l)),
    ref: "itemRef"
  }, toDisplayString(e.data.label), 3);
}
const Lm = /* @__PURE__ */ w(Dm, [["render", Rm]]), Tm = defineComponent({
  name: "",
  props: {
    data: Object
  },
  setup(e, t) {
    let n = e.data.slots;
    return () => {
      let s = n.default == null ? void 0 : n.default.call(n);
      return h("div", { class: "xmv-tab-pane", style: e.data.isActive ? 'display: ""' : "display: none" }, s);
    };
  }
});
function Em(e, t, n, s, a, o) {
  return null;
}
const Am = /* @__PURE__ */ w(Tm, [["render", Em]]), Vm = defineComponent({
  name: "xmvTabs",
  props: {
    tabPosition: { type: String, default: "top" },
    type: String,
    modelValue: String | Number,
    editable: Boolean
  },
  emits: ["buildDone", "remove", "add"],
  components: { xmvTabsItem: Lm, xmvTabsContent: Am },
  setup(e, t) {
    const n = new Sm(e), s = reactive({
      listeners: {}
    }), { $on: a, $emit: o, $remove: l } = be(s);
    n.$on = a, n.$emit = o, n.$remove = l, n.ctx = t;
    const i = computed(() => {
      let $ = [];
      return $.push("xmv-tabs--" + e.tabPosition), e.type != null && $.push("xmv-tabs--" + e.type), $;
    }), r = computed(() => {
      let $ = {};
      return e.tabPosition == "top" || e.tabPosition == "bottom" ? ($.width = n.barWidth.value + "px", $.transform = "translateX(" + n.barTranslateX.value + "px)") : ($.height = n.barHeight.value + "px", $.transform = "translateY(" + n.barTranslateY.value + "px)"), $;
    }), u = computed(() => {
      let $ = [];
      return $.push("is-" + e.tabPosition), n.isScrollable.value && n.editable && $.push("is-scrollable"), $;
    }), c = computed(() => ["is-" + e.tabPosition]), v = () => {
      let $ = n.tabsNavScrollRef.value.clientWidth;
      n.tabsNavScrollX.value < $ ? n.tabsNavScrollX.value = 0 : n.tabsNavScrollX.value = n.tabsNavScrollX.value - $;
    }, y = () => {
      let $ = n.tabsNavRef.value.scrollWidth, k = n.tabsNavScrollRef.value.clientWidth, x = $ - n.tabsNavScrollX.value - k;
      x > k ? n.tabsNavScrollX.value = k + n.tabsNavScrollX.value : n.tabsNavScrollX.value = x + n.tabsNavScrollX.value;
    }, _ = () => {
      t.emit("add"), nextTick(() => {
        let $ = n.tabsNavRef.value.scrollWidth, k = n.tabsNavScrollRef.value.clientWidth, x = n.rctData.itemList.length;
        $ > k && (n.tabsNavScrollX.value = $ - k);
        let b = n.rctData.itemList[x - 1];
        n.$emit("itemClick", b.name);
      });
    };
    provide("TabsMode", n), watch(() => e.modelValue, ($) => {
      f($);
    });
    const f = ($) => {
      n.$emit("itemClick", $);
    }, g = () => {
      nextTick(() => {
        n.isScrollable.value = n.tabsNavRef.value.scrollWidth > n.tabsNavScrollRef.value.clientWidth;
      });
    };
    return onMounted(() => {
      nextTick(() => {
        t.emit("buildDone"), F(e.modelValue) || f(e.modelValue);
      }), watch(n.rctData, ($) => {
        g();
      });
    }), {
      tabsMode: n,
      computeTabsClass: i,
      computePositionClass: c,
      handleLeft: v,
      handleRight: y,
      handlePlusClick: _,
      computeActiveBarStyle: r,
      computeNavWrapClass: u
    };
  }
}), Bm = { class: "xmv-tabs__content" };
function Im(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon"), i = resolveComponent("xmv-tabs-item"), r = resolveComponent("xmv-tabs-content");
  return openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", {
      class: normalizeClass(["xmv-tabs", e.computeTabsClass])
    }, [
      createBaseVNode("div", {
        class: normalizeClass(["xmv-tabs__header", e.computePositionClass])
      }, [
        e.tabsMode.editable ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: "xmv-tabs__new-tab",
          onClick: t[0] || (t[0] = (...u) => e.handlePlusClick && e.handlePlusClick(...u))
        }, [
          createVNode(l, {
            name: "plus",
            class: "is-icon-plus"
          })
        ])) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: normalizeClass(["xmv-tabs__nav-wrap", e.computeNavWrapClass])
        }, [
          e.tabsMode.isScrollable.value && e.tabsMode.editable ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: "xmv-tabs__nav-prev",
            onClick: t[1] || (t[1] = (...u) => e.handleLeft && e.handleLeft(...u))
          }, [
            createVNode(l, { name: "arrowLeft" })
          ])) : createCommentVNode("", true),
          e.tabsMode.isScrollable.value && e.tabsMode.editable ? (openBlock(), createElementBlock("span", {
            key: 1,
            class: "xmv-tabs__nav-next",
            onClick: t[2] || (t[2] = (...u) => e.handleRight && e.handleRight(...u))
          }, [
            createVNode(l, { name: "arrowRight" })
          ])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: "xmv-tabs__nav-scroll",
            ref: e.tabsMode.tabsNavScrollRef
          }, [
            createBaseVNode("div", {
              class: normalizeClass(["xmv-tabs__nav", e.computePositionClass]),
              style: normalizeStyle({ transform: "translateX(-" + e.tabsMode.tabsNavScrollX.value + "px)" }),
              ref: e.tabsMode.tabsNavRef
            }, [
              e.type ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(["xmv-tabs__active-bar", e.computePositionClass]),
                ref: e.tabsMode.barRef,
                style: normalizeStyle(e.computeActiveBarStyle)
              }, null, 6)),
              (openBlock(true), createElementBlock(Fragment, null, renderList(e.tabsMode.rctData.itemList, (u, c) => (openBlock(), createBlock(i, {
                data: u,
                index: c,
                key: u.name
              }, null, 8, ["data", "index"]))), 128))
            ], 6)
          ], 512)
        ], 2)
      ], 2),
      createBaseVNode("div", Bm, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(e.tabsMode.rctData.itemList, (u) => (openBlock(), createBlock(r, {
          data: u,
          key: u.name
        }, null, 8, ["data"]))), 128))
      ])
    ], 2),
    renderSlot(e.$slots, "default")
  ], 64);
}
const Nm = /* @__PURE__ */ w(Vm, [["render", Im]]), zm = defineComponent({
  name: "xmvTabPanel",
  props: {
    label: String,
    name: String
  },
  setup(e, t) {
    const n = getCurrentInstance();
    inject("TabsMode").rctData.itemList.push({
      label: e.label,
      name: e.name,
      slots: n.slots,
      isActive: false
    });
  }
});
function Pm(e, t, n, s, a, o) {
  return null;
}
const Om = /* @__PURE__ */ w(zm, [["render", Pm]]);
class Hm {
  constructor(t, n) {
    this.ctx = n, this.$emit = null, this.$on = null, this.quickprevShow = ref(false), this.maxPageCount = ref(1), this.currentPage = ref(1), this.quicknextShow = ref(false), this.list = ref([]), this.props = t, this.prevButtonDisabled = ref(false), this.nextButtonDisabled = ref(false), this.gotoMode = ref(0), this.sizeMode = ref(0);
  }
  set() {
    let t, n, s;
    t = Math.ceil(this.props.total / this.props.pageSize), this.maxPageCount.value = t, n = (3 + this.props.pageCount) / 2, this.quickprevShow.value = this.currentPage.value >= n, s = Math.ceil((this.props.pageCount - 2) / 2), this.quicknextShow.value = t - this.currentPage.value > s, t <= this.props.pageCount && (this.quicknextShow.value = false);
    for (let a = 2; a < t; a++)
      this.list.value.push(a);
    this.generateArray(this.currentPage.value, Math.ceil((this.props.pageCount - 4) / 2), t), this.prevButtonDisabled.value = this.currentPage.value == 1, this.nextButtonDisabled.value = this.currentPage.value == t;
  }
  emitChangeNumber() {
    this.$emit("changeNum", this.currentPage.value), this.ctx.emit("changeNumber");
  }
  generateArray(t, n, s) {
    let a = [], o = [], l = [];
    for (let i = t - n; i < t; i++)
      i >= 2 && a.push(i);
    for (let i = t + 1; i <= t + n; i++)
      i <= s - 1 && o.push(i);
    if (a.length < n) {
      let i = n - a.length;
      t == 1 && (i = i + 1);
      for (let r = 0; r < i; r++)
        o.length >= 2 && o[o.length - 1] < s - 1 && o.push(o[o.length - 1] + 1);
    }
    if (o.length < n) {
      let i = n - o.length;
      t == s && (i = i + 1);
      for (let r = 0; r < i; r++)
        a.length > 0 && a[0] > 2 && a.unshift(a[0] - 1);
    }
    return t != 1 && t != s && a.push(t), a.length > 0 && a[0] == 2 && (this.quickprevShow.value = false), l = a.concat(o), this.list.value = l, l;
  }
}
const Wm = defineComponent({
  name: "",
  setup(e, t) {
    const n = inject("PaginationMode");
    return { paginationMode: n, handlePrevClick: () => {
      if (n.currentPage.value == 1 || n.maxPageCount.value == 0)
        return false;
      n.currentPage.value = n.currentPage.value - 1, n.set(), nextTick(() => {
        n.emitChangeNumber();
      });
    } };
  }
}), jm = ["disabled"];
function Ym(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon");
  return openBlock(), createElementBlock("button", {
    type: "button",
    class: "btn-prev",
    onClick: t[0] || (t[0] = (...i) => e.handlePrevClick && e.handlePrevClick(...i)),
    disabled: e.paginationMode.prevButtonDisabled.value
  }, [
    createVNode(l, { name: "arrowLeft" })
  ], 8, jm);
}
const Fm = /* @__PURE__ */ w(Wm, [["render", Ym]]), Xm = defineComponent({
  name: "",
  setup(e, t) {
    const n = inject("PaginationMode");
    return { paginationMode: n, handleNextClick: () => {
      if (n.currentPage.value == n.maxPageCount.value || n.maxPageCount.value == 0)
        return false;
      n.currentPage.value = n.currentPage.value + 1, n.set(), nextTick(() => {
        n.emitChangeNumber();
      });
    } };
  }
}), Um = ["disabled"];
function qm(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon");
  return openBlock(), createElementBlock("button", {
    type: "button",
    class: "btn-next",
    onClick: t[0] || (t[0] = (...i) => e.handleNextClick && e.handleNextClick(...i)),
    disabled: e.paginationMode.nextButtonDisabled.value
  }, [
    createVNode(l, { name: "arrowRight" })
  ], 8, Um);
}
const Gm = /* @__PURE__ */ w(Xm, [["render", qm]]), Zm = defineComponent({
  name: "",
  props: {
    data: Number
  },
  setup(e, t) {
    const { $on: n, $emit: s } = inject("EventBus"), a = ref(false), o = () => {
      t.emit("changeNum", e.data);
    };
    return n("changeNum", (l) => {
      nextTick(() => {
        a.value = e.data == l;
      });
    }), { isActive: a, handleClick: o };
  }
});
function Qm(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("li", {
    onClick: t[0] || (t[0] = (...l) => e.handleClick && e.handleClick(...l)),
    class: normalizeClass({ "is-active": e.isActive })
  }, toDisplayString(e.data), 3);
}
const Km = /* @__PURE__ */ w(Zm, [["render", Qm]]), Jm = defineComponent({
  name: "",
  components: { xmvPaginationItem: Km },
  setup(e, t) {
    const n = inject("PaginationMode");
    return {
      paginationMode: n,
      handleChangeNum: (i) => {
        n.currentPage.value = i, n.set(), nextTick(() => {
          n.emitChangeNumber();
        });
      },
      handleNumClick: (i) => {
        n.currentPage.value = i, n.set(), n.emitChangeNumber();
      },
      handleQuickPrevClick: () => {
        let i = n.currentPage.value - n.props.pageCount + 2;
        i < 1 && (i = 1), n.currentPage.value = i, n.set(), nextTick(() => {
          n.emitChangeNumber();
        });
      },
      handleQuickNextClick: () => {
        let i = n.currentPage.value + n.props.pageCount - 2;
        i > n.maxPageCount.value && (i = n.maxPageCount.value), n.currentPage.value = i, n.set(), nextTick(() => {
          n.emitChangeNumber();
        });
      }
    };
  }
}), eh = { class: "xmv-pager" };
function th(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon"), i = resolveComponent("xmv-pagination-item");
  return openBlock(), createElementBlock("ul", eh, [
    createBaseVNode("li", {
      class: normalizeClass(["number", { "is-active": e.paginationMode.currentPage.value == 1 }]),
      onClick: t[0] || (t[0] = () => e.handleNumClick(1))
    }, " 1 ", 2),
    e.paginationMode.quickprevShow.value ? (openBlock(), createElementBlock("li", {
      key: 0,
      class: "more btn-quickprev xmv-icon",
      onClick: t[1] || (t[1] = (...r) => e.handleQuickPrevClick && e.handleQuickPrevClick(...r))
    }, [
      createVNode(l, { name: "moreFilled" })
    ])) : createCommentVNode("", true),
    (openBlock(true), createElementBlock(Fragment, null, renderList(e.paginationMode.list.value, (r, u) => (openBlock(), createBlock(i, {
      data: r,
      key: u,
      onChangeNum: e.handleChangeNum
    }, null, 8, ["data", "onChangeNum"]))), 128)),
    e.paginationMode.quicknextShow.value ? (openBlock(), createElementBlock("li", {
      key: 1,
      class: "more btn-quicknext xmv-icon",
      onClick: t[2] || (t[2] = (...r) => e.handleQuickNextClick && e.handleQuickNextClick(...r))
    }, [
      createVNode(l, { name: "moreFilled" })
    ])) : createCommentVNode("", true),
    e.paginationMode.maxPageCount.value != 0 && e.paginationMode.maxPageCount.value != 1 ? (openBlock(), createElementBlock("li", {
      key: 2,
      class: normalizeClass(["number", { "is-active": e.paginationMode.currentPage.value == e.paginationMode.maxPageCount.value }]),
      onClick: t[3] || (t[3] = () => e.handleNumClick(e.paginationMode.maxPageCount.value))
    }, toDisplayString(e.paginationMode.maxPageCount), 3)) : createCommentVNode("", true)
  ]);
}
const nh = /* @__PURE__ */ w(Jm, [["render", th]]), sh = defineComponent({
  name: "",
  setup(e, t) {
    const n = inject("PaginationMode"), s = () => {
      let a = parseInt(n.gotoMode.value);
      if (!Number.isInteger(a))
        return n.gotoMode.value = n.currentPage.value, false;
      if (a == n.currentPage.value)
        return false;
      a > n.maxPageCount.value && (a = n.maxPageCount.value, n.gotoMode.value = a), a < 1 && (a = 1, n.gotoMode.value = a), n.currentPage.value = a, n.set(), n.emitChangeNumber();
    };
    return n.$on("changeNum", () => {
      n.gotoMode.value = n.currentPage.value;
    }), onMounted(() => {
      n.gotoMode.value = n.currentPage.value;
    }), { paginationMode: n, handleInputBlur: s };
  }
}), ah = { class: "xmv-pagination__jump" }, oh = /* @__PURE__ */ createBaseVNode("span", { class: "xmv-pagination__goto" }, "跳转", -1), lh = /* @__PURE__ */ createBaseVNode("span", { class: "xmv-pagination__classifier" }, null, -1);
function ih(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-input");
  return openBlock(), createElementBlock("span", ah, [
    oh,
    createVNode(l, {
      class: "xmv-pagination__editor is-in-pagination",
      placeholder: "页数",
      type: "number",
      modelValue: e.paginationMode.gotoMode.value,
      "onUpdate:modelValue": t[0] || (t[0] = (i) => e.paginationMode.gotoMode.value = i),
      onBlur: e.handleInputBlur,
      onEnter: e.handleInputBlur
    }, null, 8, ["modelValue", "onBlur", "onEnter"]),
    lh
  ]);
}
const rh = /* @__PURE__ */ w(sh, [["render", ih]]), dh = defineComponent({
  name: "",
  setup(e, t) {
    const n = inject("PaginationMode"), s = (a) => {
      n.ctx.emit("update:pageSize", a);
    };
    return onMounted(() => {
      n.sizeMode.value = n.props.pageSize;
    }), { paginationMode: n, handleSelectChange: s };
  }
}), uh = { class: "xmv-pagination__sizes" };
function ch(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-option"), i = resolveComponent("xmv-select");
  return openBlock(), createElementBlock("span", uh, [
    createVNode(i, {
      modelValue: e.paginationMode.sizeMode.value,
      "onUpdate:modelValue": t[0] || (t[0] = (r) => e.paginationMode.sizeMode.value = r),
      onChange: e.handleSelectChange
    }, {
      default: withCtx(() => [
        createVNode(l, {
          label: "10条/页",
          value: 10
        }),
        createVNode(l, {
          label: "50条/页",
          value: 50
        }),
        createVNode(l, {
          label: "100条/页",
          value: 100
        })
      ]),
      _: 1
    }, 8, ["modelValue", "onChange"])
  ]);
}
const mh = /* @__PURE__ */ w(dh, [["render", ch]]), hh = defineComponent({
  name: "",
  setup(e, t) {
    return { paginationMode: inject("PaginationMode") };
  }
}), ph = { class: "xmv-pagination__total" };
function fh(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("span", ph, " 共 " + toDisplayString(e.paginationMode.props.total) + " 条 ", 1);
}
const vh = /* @__PURE__ */ w(hh, [["render", fh]]), gh = defineComponent({
  name: "xmvPagination",
  components: {
    xmvPaginationPrev: Fm,
    xmvPaginationNext: Gm,
    xmvPaginationTotal: vh,
    xmvPaginationPager: nh,
    xmvPaginationGoto: rh,
    xmvPaginationSize: mh
  },
  emits: ["changeNumber", "update:pageSize"],
  props: {
    total: { type: Number, default: 0 },
    pageSize: { type: Number, default: 10 },
    pageCount: { type: Number, default: 7 },
    background: String,
    small: String,
    layout: { type: String, default: "prev,pager,next" }
  },
  setup(e, t) {
    const n = reactive({
      listeners: {}
    }), s = e.layout.split(","), { $on: a, $emit: o } = be(n), l = new Hm(e, t);
    l.$emit = o, l.$on = a, provide("PaginationMode", l), provide("EventBus", { $on: a, $emit: o });
    const i = () => ({
      pageNum: l.currentPage.value,
      pageSize: e.pageSize
    }), r = () => {
      l.currentPage.value = 1, o("changeNum", 1), l.set();
    };
    return watch(() => e.total, (u) => {
      l.currentPage.value = 1, l.set(), l.emitChangeNumber();
    }), watch(() => e.pageSize, (u) => {
      l.currentPage.value = 1, l.gotoMode.value = 1, l.set(), l.emitChangeNumber();
    }), onMounted(() => {
      l.set();
    }), { paginationMode: l, layoutArr: s, getPageInfo: i, reset: r };
  }
});
function _h(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["xmv-pagination", {
      "is-background": e.background != null,
      "xmv-pagination--small": e.small != null
    }])
  }, [
    (openBlock(), createBlock(resolveDynamicComponent("xmv-pagination-" + e.layoutArr[0]), { class: "is-first" })),
    (openBlock(), createBlock(resolveDynamicComponent("xmv-pagination-" + e.layoutArr[1]))),
    (openBlock(), createBlock(resolveDynamicComponent("xmv-pagination-" + e.layoutArr[2]))),
    (openBlock(), createBlock(resolveDynamicComponent("xmv-pagination-" + e.layoutArr[3]))),
    (openBlock(), createBlock(resolveDynamicComponent("xmv-pagination-" + e.layoutArr[4]))),
    (openBlock(), createBlock(resolveDynamicComponent("xmv-pagination-" + e.layoutArr[5])))
  ], 2);
}
const $h = /* @__PURE__ */ w(gh, [["render", _h]]), bh = defineComponent({
  name: "xmvDivider",
  props: {
    direction: { type: String, default: "horizontal" },
    borderStyle: { type: String, default: "solid" },
    contentPosition: { type: String, default: "center" }
  },
  setup({ direction: e, contentPosition: t }, n) {
    const s = computed(() => ["xmv-divider--" + e]);
    return { computePosition: computed(() => ["is-" + t]), computeDirection: s };
  }
});
function xh(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["xmv-divider", e.computeDirection]),
    style: normalizeStyle({ "--xmv-border-style": e.borderStyle })
  }, [
    createBaseVNode("div", {
      class: normalizeClass(["xmv-divider__text", e.computePosition])
    }, [
      renderSlot(e.$slots, "default")
    ], 2)
  ], 6);
}
const yh = /* @__PURE__ */ w(bh, [["render", xh]]), Ch = defineComponent({
  name: "",
  props: {
    shadow: { type: String, default: "always" }
  },
  setup(e, { slots: t }) {
    const n = ref(t.header != null);
    return { computeCardClass: computed(() => ["is-" + e.shadow + "-shadow"]), headerShow: n };
  }
}), wh = {
  key: 0,
  class: "xmv-card__header"
}, kh = { class: "xmv-card__body" };
function Mh(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["xmv-card", e.computeCardClass])
  }, [
    e.headerShow ? (openBlock(), createElementBlock("div", wh, [
      renderSlot(e.$slots, "header")
    ])) : createCommentVNode("", true),
    createBaseVNode("div", kh, [
      renderSlot(e.$slots, "default")
    ])
  ], 2);
}
const Sh = /* @__PURE__ */ w(Ch, [["render", Mh]]), Dh = defineComponent({
  name: "xmvSpace",
  props: {
    size: { type: [Number, String], default: 8 },
    fill: { type: Boolean, default: false },
    wrap: { type: Boolean, default: true },
    direction: { type: String, default: "horizontal" },
    //vertical
    alignment: { type: String, default: "start" }
    //stretch ,center ,start ,end
  },
  setup(e, { slots: t }) {
    const n = computed(() => {
      let o = [];
      return o.push("xmv-space"), e.direction == "vertical" && o.push("xmv-space--vertical"), o;
    }), s = computed(() => {
      let o = {}, l = e.size;
      return e.size == "small" ? l = 8 : e.size == "default" ? l = 12 : e.size == "large" && (l = 16), o["padding-bottom"] = l + "px", o["margin-right"] = l + "px", o["min-width"] = e.fill ? "100%" : "", o;
    }), a = computed(() => {
      let o = {}, l = e.size;
      return e.size == "small" ? l = 8 : e.size == "default" ? l = 12 : e.size == "large" && (l = 16), e.fill && (o.width = "100%"), o["flex-wrap"] = e.wrap ? "wrap" : "", o["margin-bottom"] = "-" + l + "px", o["align-items"] = e.alignment, o;
    });
    return () => {
      let o = [], l = t.default == null ? void 0 : t.default.call(t);
      const i = (r) => {
        r.children ? r.children instanceof Array ? r.children.forEach((u) => {
          i(u);
        }) : o.push(h("div", { class: "xmv-space__item", style: s.value }, r)) : o.push(h("div", { class: "xmv-space__item", style: s.value }, r));
      };
      return l.forEach((r) => {
        i(r);
      }), h("div", { class: n.value, style: a.value }, o);
    };
  }
});
function Rh(e, t, n, s, a, o) {
  return null;
}
const Lh = /* @__PURE__ */ w(Dh, [["render", Rh]]), Th = defineComponent({
  name: "xmvSwitch",
  props: {
    size: String,
    inlinePrompt: Boolean,
    activeText: { type: String },
    inactiveText: { type: String },
    modelValue: Boolean,
    width: String,
    disabled: Boolean,
    loading: Boolean
  },
  setup(e, t) {
    const n = ref(false), s = ref(true), a = ref(""), o = computed(() => {
      let c = [];
      return n.value && c.push("is-checked"), e.size != null && c.push("xmv-switch--" + e.size), e.disabled && c.push("is-disabled"), c;
    }), l = computed(() => {
      let c = {};
      return e.width != null && (c.width = e.width), c;
    }), i = computed(() => e.loading && s.value), r = () => {
      if (e.disabled)
        return false;
      n.value = !n.value, t.emit("update:modelValue", n.value);
    };
    watch(() => e.modelValue, (c) => {
      u(c);
    });
    const u = (c) => {
      n.value = c, e.inlinePrompt && (a.value = n.value ? e.activeText : e.inactiveText);
    };
    return onMounted(() => {
      e.modelValue != null && u(e.modelValue);
    }), {
      isActive: n,
      innerText: a,
      computeClass: o,
      computeCoreStyle: l,
      isLoading: s,
      computeLoading: i,
      handleClick: r
    };
  }
}), Eh = /* @__PURE__ */ createBaseVNode("input", {
  class: "xmv-switch__input",
  type: "checkbox"
}, null, -1), Ah = {
  key: 0,
  class: "xmv-switch__inner"
}, Vh = { class: "is-text" }, Bh = { class: "xmv-switch__action" };
function Ih(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["xmv-switch", e.computeClass]),
    onClick: t[0] || (t[0] = (...i) => e.handleClick && e.handleClick(...i))
  }, [
    Eh,
    !e.inlinePrompt && e.inactiveText != null ? (openBlock(), createElementBlock("span", {
      key: 0,
      class: normalizeClass(["xmv-switch__label xmv-switch__label--left", { "is-active": !e.isActive }])
    }, [
      createBaseVNode("span", null, toDisplayString(e.inactiveText), 1)
    ], 2)) : createCommentVNode("", true),
    createBaseVNode("span", {
      class: "xmv-switch__core",
      style: normalizeStyle(e.computeCoreStyle)
    }, [
      e.inlinePrompt ? (openBlock(), createElementBlock("div", Ah, [
        createBaseVNode("span", Vh, toDisplayString(e.innerText), 1)
      ])) : createCommentVNode("", true),
      createBaseVNode("div", Bh, [
        e.computeLoading ? (openBlock(), createBlock(l, {
          key: 0,
          name: "loading",
          class: normalizeClass({ "is-loading": e.isLoading })
        }, null, 8, ["class"])) : createCommentVNode("", true)
      ])
    ], 4),
    !e.inlinePrompt && e.activeText != null ? (openBlock(), createElementBlock("span", {
      key: 1,
      class: normalizeClass(["xmv-switch__label xmv-switch__label--right", { "is-active": e.isActive }])
    }, [
      createBaseVNode("span", null, toDisplayString(e.activeText), 1)
    ], 2)) : createCommentVNode("", true)
  ], 2);
}
const Nh = /* @__PURE__ */ w(Th, [["render", Ih]]);
const zh = defineComponent({
  name: "xmvEmpty",
  props: {
    description: { type: String, default: "暂无数据" },
    imageSize: { type: Number, default: 100 },
    image: String
  },
  setup(e, { slots: t }) {
    return { slots: t };
  }
}), Ph = { class: "xmv-empty" }, Oh = {
  key: 0,
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  x: "0px",
  y: "0px",
  viewBox: "0 0 200 200",
  style: { "enable-background": "new 0 0 200 200" },
  "xml:space": "preserve"
}, Hh = /* @__PURE__ */ createStaticVNode('<path class="st0" d="M179.1,71.3L89.5,59.4v47.3l89.6,9.4V71.3z" data-v-d0464d40></path><path class="st1" d="M17.9,74.9l71.6-15.5v53.7l-71.6,15.5C17.9,128.6,17.9,74.9,17.9,74.9z" data-v-d0464d40></path><path class="st2" d="M101.5,92.8l77.6-21.5v101.5l-77.6,21.5C101.5,194.3,101.5,92.8,101.5,92.8z" data-v-d0464d40></path><path class="st3" d="M17.9,74.9l83.6,17.9v101l-83.6-20.4C17.9,173.4,17.9,74.9,17.9,74.9z" data-v-d0464d40></path><path class="st4" d="M101.5,92.7L17.9,74.9L0,110.7L86.6,131L101.5,92.7z" data-v-d0464d40></path><path class="st1" d="M101.5,92.8l77.6-21.5l20.9,35.8l-74.6,24.4L101.5,92.8z" data-v-d0464d40></path>', 6), Wh = [
  Hh
], jh = ["src"], Yh = { class: "xmv-empty__description" }, Fh = {
  key: 0,
  class: "xmv-empty__bottom"
};
function Xh(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("div", Ph, [
    createBaseVNode("div", {
      class: "xmv-empty__image",
      style: normalizeStyle({ width: e.imageSize + "px" })
    }, [
      e.image == null ? (openBlock(), createElementBlock("svg", Oh, Wh)) : createCommentVNode("", true),
      createBaseVNode("img", { src: e.image }, null, 8, jh)
    ], 4),
    createBaseVNode("div", Yh, [
      createBaseVNode("p", null, toDisplayString(e.description), 1)
    ]),
    e.slots.default ? (openBlock(), createElementBlock("div", Fh, [
      renderSlot(e.$slots, "default", {}, void 0, true)
    ])) : createCommentVNode("", true)
  ]);
}
const Uh = /* @__PURE__ */ w(zh, [["render", Xh], ["__scopeId", "data-v-d0464d40"]]), qh = defineComponent({
  name: "",
  props: {
    data: Object,
    listType: { type: String, default: "text" }
  },
  setup({ data: e, listType: t }, n) {
    const s = getCurrentInstance(), a = ref("check"), { $on: o, $emit: l } = inject("EventBus"), i = inject("FileList"), r = () => {
      e.isShow = false;
    };
    return o("after-leave", () => {
      if (s.isUnmounted)
        return false;
      e.isShow || je("name", e.name, i);
    }), onUnmounted(() => {
    }), onMounted(() => {
      e.isShow = true, t == "text" && (a.value = "circleCheck");
    }), { checkType: a, handleClose: r };
  }
}), Gh = { class: "xmv-upload-list__item is-success" }, Zh = ["src"], Qh = {
  key: 1,
  class: "xmv-upload-list__item-info"
}, Kh = { class: "xmv-upload-list__item-name" }, Jh = { class: "xmv-upload-list__item-file-name" }, ep = { class: "xmv-upload-list__item-status-label" }, tp = {
  key: 3,
  class: "xmv-upload-list__item-actions"
}, np = { class: "xmv-upload-list__item-preview" }, sp = { class: "xmv-upload-list__item-delete" };
function ap(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon");
  return withDirectives((openBlock(), createElementBlock("li", Gh, [
    e.listType == "picture-card" || e.listType == "picture" ? (openBlock(), createElementBlock("img", {
      key: 0,
      class: "xmv-upload-list__item-thumbnail",
      src: e.data.imgSrc,
      alt: ""
    }, null, 8, Zh)) : createCommentVNode("", true),
    e.listType == "text" || e.listType == "picture" ? (openBlock(), createElementBlock("div", Qh, [
      createBaseVNode("a", Kh, [
        e.listType == "text" ? (openBlock(), createBlock(l, {
          key: 0,
          name: "document"
        })) : createCommentVNode("", true),
        createBaseVNode("span", Jh, toDisplayString(e.data.name), 1)
      ])
    ])) : createCommentVNode("", true),
    createBaseVNode("label", ep, [
      createVNode(l, {
        class: "xmv-icon--upload-success xmv-icon--check",
        name: e.checkType
      }, null, 8, ["name"])
    ]),
    e.listType == "text" || e.listType == "picture" ? (openBlock(), createBlock(l, {
      key: 2,
      name: "close",
      class: "xmv-icon--close",
      onClick: e.handleClose
    }, null, 8, ["onClick"])) : createCommentVNode("", true),
    e.listType == "picture-card" ? (openBlock(), createElementBlock("span", tp, [
      createBaseVNode("span", np, [
        createVNode(l, {
          name: "zoomIn",
          class: "xmv-icon--zoom-in"
        })
      ]),
      createBaseVNode("span", sp, [
        createVNode(l, {
          name: "dlt",
          class: "xmv-icon--delete",
          onClick: e.handleClose
        }, null, 8, ["onClick"])
      ])
    ])) : createCommentVNode("", true)
  ], 512)), [
    [vShow, e.data.isShow]
  ]);
}
const op = /* @__PURE__ */ w(qh, [["render", ap]]), lp = defineComponent({
  name: "",
  components: { xmvUploadItem: op },
  props: {
    class: String,
    fileList: Array,
    limit: Number,
    listType: { type: String, default: "text" },
    drag: Boolean,
    beforeUpload: Function
  },
  setup(e, { slots: t }) {
    const n = ref(null), s = reactive({
      listeners: {}
    }), { $on: a, $emit: o } = be(s);
    provide("EventBus", { $on: a, $emit: o });
    const l = () => {
      n.value.click();
    };
    provide("FileList", e.fileList);
    const i = (_, f) => {
      let g = { name: _.name, imgSrc: f }, $ = e.limit;
      $ == null || e.fileList.length < $ ? e.fileList.push(g) : (e.fileList[0].isShow = false, setTimeout(() => {
        e.fileList.push(g);
      }, 300));
    }, r = () => {
      o("after-leave");
    }, u = (_) => {
      _.preventDefault();
    }, c = (_) => {
      _.preventDefault();
      let f = _.dataTransfer.files[0];
      v(f);
    }, v = (_) => {
      if (e.beforeUpload != null) {
        let f = e.beforeUpload(_);
        f instanceof Promise ? f.then((g) => {
          y(_);
        }) : f && y(_);
      } else
        y(_);
    }, y = (_) => {
      const f = new FileReader();
      f.addEventListener("load", (g) => {
        i(_, g.target.result);
      }), f.readAsDataURL(_);
    };
    return onMounted(() => {
      n.value.addEventListener("change", (_) => {
        let f = _.target.files[0];
        v(f);
      });
    }), { uploadInpRef: n, handleUploadClick: l, handleAfterLeave: r, handleDrop: c, handleDragover: u };
  }
}), ip = {
  class: "xmv-upload__input",
  name: "file",
  multiple: "",
  accept: "",
  type: "file",
  ref: "uploadInpRef"
}, rp = {
  class: "xmv-upload__input",
  name: "file",
  multiple: "",
  accept: "",
  type: "file",
  ref: "uploadInpRef"
};
function dp(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-upload-item"), i = resolveComponent("xmv-transition-group");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(e.class)
  }, [
    e.listType == "text" || e.listType == "picture" ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(["xmv-upload xmv-upload--text", { "is-drag": e.drag }]),
      onMouseup: t[2] || (t[2] = (...r) => e.handleUploadClick && e.handleUploadClick(...r))
    }, [
      createBaseVNode("div", {
        class: normalizeClass({ "xmv-upload-dragger": e.drag }),
        onDragover: t[0] || (t[0] = withModifiers((...r) => e.handleDragover && e.handleDragover(...r), ["stop"])),
        onDrop: t[1] || (t[1] = withModifiers((...r) => e.handleDrop && e.handleDrop(...r), ["stop"]))
      }, [
        renderSlot(e.$slots, "default"),
        createBaseVNode("input", ip, null, 512)
      ], 34)
    ], 34)) : createCommentVNode("", true),
    e.listType == "text" ? renderSlot(e.$slots, "tip", { key: 1 }) : createCommentVNode("", true),
    createVNode(i, {
      name: "xmv-list",
      class: normalizeClass(["xmv-upload-list", ["xmv-upload-list--" + e.listType]]),
      onAfterLeave: e.handleAfterLeave
    }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList(e.fileList, (r) => (openBlock(), createBlock(l, {
          key: r.name,
          data: r,
          listType: e.listType
        }, null, 8, ["data", "listType"]))), 128)),
        e.listType == "picture-card" ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "xmv-upload xmv-upload--picture-card xmv-filter",
          onMouseup: t[3] || (t[3] = (...r) => e.handleUploadClick && e.handleUploadClick(...r))
        }, [
          renderSlot(e.$slots, "default"),
          createBaseVNode("input", rp, null, 512)
        ], 32)) : createCommentVNode("", true)
      ]),
      _: 3
    }, 8, ["class", "onAfterLeave"])
  ], 2);
}
const up = /* @__PURE__ */ w(lp, [["render", dp]]), cp = defineComponent({
  name: "xmvTransitionGroup",
  props: {
    tag: { type: String, default: "ul" },
    name: { type: String, default: "xmv" }
  },
  emits: ["after-leave"],
  setup({ name: e, tag: t }, { slots: n, emit: s }) {
    const a = ref(null);
    let o = 0;
    const l = () => {
      let c = document.createElement("div");
      document.body.appendChild(c), c.setAttribute("class", e + "-enter-active");
      let v = window.getComputedStyle(c);
      o = parseFloat(v.transitionDuration) * 1e3, c.remove();
    }, i = (c) => {
      if (!c)
        return false;
      nextTick(() => {
        c.classList.add(e + "-enter-active", e + "-enter-from"), setTimeout(() => {
          xe(c, e + "-enter-active"), xe(c, e + "-enter-from");
        }, 10);
      });
    }, r = (c, v) => {
      let y = v.offsetLeft - c.offsetLeft, _ = v.offsetTop - c.offsetTop;
      v.style.transition = "none", v.style.transform = `translate(${y}px ,${_}px)`;
    }, u = (c) => {
      let v, y = c.children;
      for (let _ = y.length - 1; _ >= 0; _--) {
        let f = y[_];
        if (!f.classList.contains("xmv-filter")) {
          v = f;
          break;
        }
      }
      return v;
    };
    return onMounted(() => {
      l(), new MutationObserver((y) => {
        let _ = y[0];
        if (_.target.localName == t) {
          let f = u(_.target);
          i(f);
        }
        if (_.attributeName == "style" && _.target.style.display == "none" && _.target.localName != t && _.type == "attributes") {
          _.target.style.display = "";
          let f = _.target, g = [];
          for (; f.nextElementSibling; )
            g.push(f.nextElementSibling), r(f, f.nextElementSibling), f = f.nextElementSibling;
          _.target.style.left = _.target.offsetLeft + "px", _.target.style.top = _.target.offsetTop + "px", _.target.classList.add(e + "-leave-active", e + "-leave-to"), setTimeout(() => {
            g.forEach(($) => {
              $.style.removeProperty("transition"), $.style.transform = "translate(0px ,0px)";
            }), nextTick(() => {
              g.forEach(($) => {
                $.removeAttribute("style");
              });
            });
          }, 10), setTimeout(() => {
            _.target.remove(), s("after-leave");
          }, o);
        }
      }).observe(a.value, { subtree: true, childList: true, attributes: true });
      const v = a.value.children;
      for (let y = 0; y < v.length; y++)
        v[y].classList.add(e + "-enter-active", e + "-enter-from");
      nextTick(() => {
        for (let y = 0; y < v.length; y++)
          xe(v[y], e + "-enter-active"), xe(v[y], e + "-enter-from");
      });
    }), () => {
      let c = [], v = n.default ? n.default() : null;
      return v && v && v.length > 0 && v.forEach((y) => {
        c.push(h(y, {}));
      }), h(t, { ref: a }, c);
    };
  }
});
function mp(e, t, n, s, a, o) {
  return null;
}
const hp = /* @__PURE__ */ w(cp, [["render", mp]]), pp = defineComponent({
  name: "xmvCollapse",
  props: {
    modelValue: [String, Array],
    accordion: String
  },
  setup(e, t) {
    const n = reactive({
      listeners: {}
    }), { $on: s, $emit: a } = be(n);
    provide("EventBus", { $on: s, $emit: a }), provide("Accordion", e.accordion);
    const o = (l) => {
      Array.isArray(l) ? l.forEach((i) => {
        a("setVal", i);
      }) : a("setVal", l);
    };
    return watch(() => e.modelValue, (l) => {
      o(l);
    }), onMounted(() => {
      e.modelValue != null && o(e.modelValue);
    }), { handleWatch: o };
  }
}), fp = { class: "xmv-collapse" };
function vp(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("div", fp, [
    renderSlot(e.$slots, "default")
  ]);
}
const gp = /* @__PURE__ */ w(pp, [["render", vp]]), _p = defineComponent({
  name: "xmvCollapseItem",
  props: {
    title: String,
    name: String
  },
  setup(e, t) {
    const n = ref(false), { $on: s, $emit: a } = inject("EventBus"), o = inject("Accordion");
    return s("setVal", (r) => {
      o != null ? n.value = e.name == r : e.name == r && (n.value = true);
    }), { isActive: n, on: {
      beforeEnter(r) {
        r.dataset || (r.dataset = {}), r.dataset.oldPaddingTop = r.style.paddingTop, r.dataset.oldPaddingBottom = r.style.paddingBottom, r.style.maxHeight = 0, r.style.paddingTop = 0, r.style.paddingBottom = 0;
      },
      enter(r) {
        r.dataset.oldOverflow = r.style.overflow, r.scrollHeight !== 0 ? (r.style.maxHeight = `${r.scrollHeight}px`, r.style.paddingTop = r.dataset.oldPaddingTop, r.style.paddingBottom = r.dataset.oldPaddingBottom) : (r.style.maxHeight = 0, r.style.paddingTop = r.dataset.oldPaddingTop, r.style.paddingBottom = r.dataset.oldPaddingBottom), r.style.overflow = "hidden";
      },
      afterEnter(r) {
        r.style.maxHeight = "", r.style.overflow = r.dataset.oldOverflow;
      },
      beforeLeave(r) {
        r.dataset || (r.dataset = {}), r.dataset.oldPaddingTop = r.style.paddingTop, r.dataset.oldPaddingBottom = r.style.paddingBottom, r.dataset.oldOverflow = r.style.overflow, r.style.maxHeight = `${r.scrollHeight}px`, r.style.overflow = "hidden";
      },
      leave(r) {
        r.scrollHeight !== 0 && (r.style.maxHeight = 0, r.style.paddingTop = 0, r.style.paddingBottom = 0);
      },
      afterLeave(r) {
        r.style.maxHeight = "", r.style.overflow = r.dataset.oldOverflow, r.style.paddingTop = r.dataset.oldPaddingTop, r.style.paddingBottom = r.dataset.oldPaddingBottom;
      }
    }, handleCollapse: () => {
      n.value = !n.value, o != null && a("setVal", e.name);
    } };
  }
}), $p = { class: "xmv-collapse-item__wrap" }, bp = { class: "xmv-collapse-item__content" };
function xp(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["xmv-collapse-item", { "is-active": e.isActive }])
  }, [
    createBaseVNode("div", {
      onClick: t[0] || (t[0] = (...i) => e.handleCollapse && e.handleCollapse(...i))
    }, [
      createBaseVNode("div", {
        class: normalizeClass(["xmv-collapse-item__header", { "is-active": e.isActive }])
      }, [
        renderSlot(e.$slots, "title"),
        createTextVNode(" " + toDisplayString(e.title) + " ", 1),
        createVNode(l, {
          name: "arrowRight",
          class: normalizeClass(["xmv-collapse-item__arrow", { "is-active": e.isActive }])
        }, null, 8, ["class"])
      ], 2)
    ]),
    createVNode(Transition, mergeProps({ name: "xmv-collapse" }, toHandlers(e.on)), {
      default: withCtx(() => [
        withDirectives(createBaseVNode("div", $p, [
          createBaseVNode("div", bp, [
            renderSlot(e.$slots, "default")
          ])
        ], 512), [
          [vShow, e.isActive]
        ])
      ]),
      _: 3
    }, 16)
  ], 2);
}
const yp = /* @__PURE__ */ w(_p, [["render", xp]]);
class Cp {
  constructor({ wrapperRef: t, indicatorUlRef: n, type: s, direction: a }) {
    this.rctData = reactive({
      itemList: []
    }), this.type = s, this.clientWidth, this.clientHeight, this.itemLength, this.indexArray, this.wrapperRef = t, this.indicatorUlRef = n, this.direction = a, this.translateStr = this.direction == "vertical" ? "translateY" : "translateX", this.currentAnimateIndex = 0, this.position = "right", this.interval, this.cache = [], this.isExcute = false;
  }
  reset() {
    this.startIndex = 0, this.itemLength = this.rctData.itemList.length, this.clientWidth = this.wrapperRef.value.clientWidth, this.clientHeight = this.wrapperRef.value.clientHeight, this.beforeAnimate(), nextTick(() => {
      this.setActiveClass(0);
    });
  }
  beforeAnimate() {
    this.type == "card" ? this.__beforeCardAnimate() : this.__beforeAnimate();
  }
  __beforeAnimate() {
    let t = this.position == "right" ? "" : "-", n = this.direction == "vertical" ? this.clientHeight : this.clientWidth;
    this.indexArray = Ue(this.itemLength, this.currentAnimateIndex, this.position), this.rctData.itemList.forEach((s, a) => {
      let o = s.proxy.itemRef;
      Me(o, "transform", `${this.translateStr}(${t + n * this.indexArray.indexOf(a)}px)`);
    });
  }
  __beforeCardAnimate() {
    this.indexArray = Ue(this.itemLength, this.currentAnimateIndex, this.position);
    let t = this.rctData.itemList.length;
    this.__beCenter(this.rctData.itemList[0].proxy.itemRef), this.__nearRight(this.rctData.itemList[1].proxy.itemRef), this.__nearLeft(this.rctData.itemList[t - 1].proxy.itemRef), this.rctData.itemList.forEach((n, s) => {
      let a = n.proxy.itemRef;
      s != this.indexArray[0] && s != this.indexArray[1] && s != this.indexArray[t - 1] && this.__nearRightOut(a);
    });
  }
  animateOnce() {
    this.type == "card" ? this.__animateCardOnce() : this.__animateOnce(), this.position == "right" ? (this.currentAnimateIndex++, this.currentAnimateIndex == this.itemLength && (this.currentAnimateIndex = 0)) : (this.currentAnimateIndex--, this.currentAnimateIndex == -1 && (this.currentAnimateIndex = this.itemLength - 1)), this.setActiveClass(this.currentAnimateIndex), setTimeout(() => {
      this.afterAnimate();
    }, 450);
  }
  __animateOnce() {
    let t = this.position == "right" ? "-" : "", n = this.direction == "vertical" ? this.clientHeight : this.clientWidth;
    this.rctData.itemList.forEach((s, a) => {
      let o = s.proxy.itemRef;
      a == this.indexArray[0] || a == this.indexArray[1] ? Le(o, "is-animating") : xe(o, "is-animating");
    }), this.rctData.itemList.forEach((s, a) => {
      let o = s.proxy.itemRef;
      a == this.indexArray[0] && Me(o, "transform", `${this.translateStr}(${t + n}px)`), a == this.indexArray[1] && Me(o, "transform", `${this.translateStr}(0px)`);
    });
  }
  __animateCardOnce() {
    this.rctData.itemList.forEach((t, n) => {
      let s = t.proxy.itemRef;
      this.position == "right" ? (n == this.indexArray[0] && (xe(s, "is-active"), this.__nearLeft(s)), n == this.indexArray[1] && (Le(s, "is-active"), this.__beCenter(s)), n == this.indexArray[this.itemLength - 1] && (xe(s, "is-active"), this.__nearLeftOut(s)), n == this.indexArray[2] && (xe(s, "is-active"), this.__nearRight(s))) : (n == this.indexArray[0] && (xe(s, "is-active"), this.__nearRight(s)), n == this.indexArray[1] && (Le(s, "is-active"), this.__beCenter(s)), n == this.indexArray[2] && (xe(s, "is-active"), this.__nearLeft(s)), n == this.indexArray[this.itemLength - 1] && (xe(s, "is-active"), this.__nearRightOut(s)));
    });
  }
  afterAnimate() {
    this.rctData.itemList.forEach((t, n) => {
      let s = t.proxy.itemRef;
      xe(s, "is-animating");
    });
  }
  run() {
    this.beforeAnimate(), setTimeout(() => {
      this.animateOnce();
    }, 10);
  }
  animate() {
    clearInterval(this.interval), this.interval = setInterval(() => {
      this.position = "right", this.run();
    }, 5e3);
  }
  excuteCache() {
    this.cache[0] && (this.position = this.cache[0], this.run()), setTimeout(() => {
      this.cache.shift(), this.cache[0] != null ? this.excuteCache() : this.isExcute = false;
    }, 500);
  }
  stop() {
    this.cache = [], this.isExcute = false, clearInterval(this.interval);
  }
  left() {
    this.cache.push("left"), this.isExcute || (this.isExcute = true, this.excuteCache());
  }
  right() {
    this.cache.push("right"), this.isExcute || (this.isExcute = true, this.excuteCache());
  }
  setActiveClass(t) {
    if (!this.indicatorUlRef.value)
      return false;
    var n = this.indicatorUlRef.value.querySelectorAll("li");
    n.forEach(function(s) {
      xe(s, "is-active");
    }), Le(n[t], "is-active");
  }
  goTo(t) {
    this.type == "card" ? this.__cardGoTo(t) : this.__goTo(t);
  }
  __goTo(t) {
    this.currentAnimateIndex = t;
    let n = this.position == "right" ? "" : "-", s = this.direction == "vertical" ? this.clientHeight : this.clientWidth;
    this.indexArray = Ue(this.itemLength, this.currentAnimateIndex, this.position), this.rctData.itemList.forEach((a, o) => {
      let l = a.proxy.itemRef;
      Me(l, "transform", `${this.translateStr}(${n + s * (this.indexArray.indexOf(o) + 1)}px)`);
    }), setTimeout(() => {
      this.rctData.itemList.forEach((a, o) => {
        let l = a.proxy.itemRef;
        o == this.indexArray[0] || o == this.indexArray[1] ? Le(l, "is-animating") : xe(l, "is-animating");
      }), this.rctData.itemList.forEach((a, o) => {
        let l = a.proxy.itemRef;
        o == this.indexArray[0] && Me(l, "transform", `${this.translateStr}(0px)`);
      }), setTimeout(() => {
        this.afterAnimate();
      }, 450);
    }, 10);
  }
  __cardGoTo(t) {
    this.currentAnimateIndex = t, this.indexArray = Ue(this.itemLength, this.currentAnimateIndex, this.position), this.rctData.itemList.forEach((n, s) => {
      let a = n.proxy.itemRef;
      s == this.indexArray[0] ? (Le(a, "is-active"), this.__beCenter(a)) : s == this.indexArray[this.itemLength - 1] ? (xe(a, "is-active"), this.__nearLeft(a)) : s == this.indexArray[1] ? (xe(a, "is-active"), this.__nearRight(a)) : (xe(a, "is-active"), this.__nearRightOut(a));
    });
  }
  __nearLeft(t) {
    let n;
    this.direction == "vertical" ? n = t.clientHeight * 0.075 : n = t.clientWidth * 0.075, Me(t, "transform", `${this.translateStr}(-${n}px) scale(0.85)`);
  }
  __nearRight(t) {
    let n;
    this.direction == "vertical" ? n = this.clientHeight - t.clientHeight + t.clientHeight * 0.075 : n = this.clientWidth - t.clientWidth + t.clientWidth * 0.075, Me(t, "transform", `${this.translateStr}(${n}px) scale(0.85)`);
  }
  __nearRightOut(t) {
    let n;
    this.direction == "vertical" ? n = this.clientHeight - t.clientHeight * 0.075 : n = this.clientWidth - t.clientWidth * 0.075, Me(t, "transform", `${this.translateStr}(${n}px) scale(0.85)`);
  }
  __nearLeftOut(t) {
    let n;
    this.direction == "vertical" ? n = t.clientHeight - t.clientHeight * 0.075 : n = t.clientWidth - t.clientWidth * 0.075, Me(t, "transform", `${this.translateStr}(-${n}px) scale(0.85)`);
  }
  __beCenter(t) {
    let n;
    this.direction == "vertical" ? n = (this.clientHeight - t.clientHeight) / 2 : n = (this.clientWidth - t.clientWidth) / 2, Me(t, "transform", `${this.translateStr}(${n}px) scale(1)`), Le(t, "is-active");
  }
}
function Ue(e, t, n) {
  const s = [];
  for (let a = 0; a < e; a++)
    s.push(a);
  if (n == "right")
    return [...s.slice(t), ...s.slice(0, t)];
  {
    let a = [];
    for (let o = 0; o < s.length; o++)
      t >= 0 ? a.push(s[t]) : a.push(s[s.length + t]), t--;
    return a;
  }
}
const wp = defineComponent({
  name: "xmvCarousel",
  props: {
    type: String,
    indicatorPosition: { type: String },
    //outside
    direction: String
  },
  setup(e, t) {
    const n = ref(null), s = ref(null), a = new Cp({
      wrapperRef: n,
      indicatorUlRef: s,
      type: e.type,
      direction: e.direction
    }), o = ref(false), l = { num: 0 };
    provide("CarouselMode", a), provide("CarouselCount", l);
    const i = () => {
      a.left();
    }, r = () => {
      a.right();
    }, u = () => {
      o.value = true, a.stop();
    }, c = () => {
      o.value = false, a.animate();
    }, v = (y) => {
      a.setActiveClass(y), a.goTo(y);
    };
    return onMounted(() => {
      a.reset(), a.animate();
    }), {
      containerRef: n,
      indicatorUlRef: s,
      leftRightButtonShow: o,
      carouselMode: a,
      handleLeft: i,
      handleRight: r,
      handleMouseover: u,
      handleMouseleave: c,
      handleIndicatorClick: v
    };
  }
}), kp = {
  class: "xmv-carousel__container",
  ref: "containerRef"
}, Mp = ["onClick"], Sp = /* @__PURE__ */ createBaseVNode("button", { class: "xmv-carousel__button" }, null, -1), Dp = [
  Sp
];
function Rp(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["xmv-carousel", {
      "xmv-carousel--horizontal": e.direction != "vertical",
      "xmv-carousel--vertical": e.direction == "vertical"
    }]),
    onMouseover: t[2] || (t[2] = (...i) => e.handleMouseover && e.handleMouseover(...i)),
    onMouseleave: t[3] || (t[3] = (...i) => e.handleMouseleave && e.handleMouseleave(...i))
  }, [
    createBaseVNode("div", kp, [
      e.direction != "vertical" ? (openBlock(), createBlock(Transition, {
        key: 0,
        name: "xmv-fade-in"
      }, {
        default: withCtx(() => [
          withDirectives(createBaseVNode("button", {
            type: "button",
            class: "xmv-carousel__arrow xmv-carousel__arrow--left",
            onClick: t[0] || (t[0] = (...i) => e.handleLeft && e.handleLeft(...i))
          }, [
            createVNode(l, { name: "arrowLeft" })
          ], 512), [
            [vShow, e.leftRightButtonShow]
          ])
        ]),
        _: 1
      })) : createCommentVNode("", true),
      e.direction != "vertical" ? (openBlock(), createBlock(Transition, {
        key: 1,
        name: "xmv-fade-in"
      }, {
        default: withCtx(() => [
          withDirectives(createBaseVNode("button", {
            type: "button",
            class: "xmv-carousel__arrow xmv-carousel__arrow--right",
            onClick: t[1] || (t[1] = (...i) => e.handleRight && e.handleRight(...i))
          }, [
            createVNode(l, { name: "arrowRight" })
          ], 512), [
            [vShow, e.leftRightButtonShow]
          ])
        ]),
        _: 1
      })) : createCommentVNode("", true),
      renderSlot(e.$slots, "default")
    ], 512),
    e.indicatorPosition != "none" ? (openBlock(), createElementBlock("ul", {
      key: 0,
      class: normalizeClass(["xmv-carousel__indicators", {
        "xmv-carousel__indicators--outside": e.indicatorPosition == "outside",
        "xmv-carousel__indicators--horizontal": e.direction != "vertical",
        "xmv-carousel__indicators--vertical": e.direction == "vertical",
        "xmv-carousel__indicators--right": e.direction == "vertical"
      }]),
      ref: "indicatorUlRef"
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(e.carouselMode.rctData.itemList, (i, r) => (openBlock(), createElementBlock("li", {
        class: normalizeClass(["xmv-carousel__indicator", {
          "xmv-carousel__indicator--horizontal": e.direction != "vertical",
          "xmv-carousel__indicator--vertical": e.direction == "vertical"
        }]),
        onClick: (u) => e.handleIndicatorClick(r)
      }, Dp, 10, Mp))), 256))
    ], 2)) : createCommentVNode("", true)
  ], 34);
}
const Lp = /* @__PURE__ */ w(wp, [["render", Rp]]), Tp = defineComponent({
  name: "xmvCarouselItem",
  setup(e, t) {
    const n = ref(null), s = getCurrentInstance(), a = inject("CarouselMode");
    let o = inject("CarouselCount"), l = o.num;
    o.num++;
    const i = computed(() => {
      let u = [];
      return a.type == "card" && u.push("xmv-carousel__item--card"), a.type == "card" && a.direction == "vertical" && u.push("xmv-carousel__item--card-vertical"), u;
    }), r = () => {
      a.goTo(l);
    };
    return a.rctData.itemList.push(s), { itemRef: n, carouselMode: a, computeClass: i, handleClick: r };
  }
});
function Ep(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["xmv-carousel__item", e.computeClass]),
    ref: "itemRef",
    onClick: t[0] || (t[0] = (...l) => e.handleClick && e.handleClick(...l))
  }, [
    renderSlot(e.$slots, "default")
  ], 2);
}
const Ap = /* @__PURE__ */ w(Tp, [["render", Ep]]), Vp = defineComponent({
  name: "",
  props: {
    offset: Number,
    position: { type: String, default: "top" },
    zIndex: { type: Number, default: 100 },
    target: String
  },
  setup({ offset: e, position: t, zIndex: n, target: s }, a) {
    const o = ref(null), l = ref(null), i = ref(false), r = inject("Xmv-Event-On"), u = ref(0), c = computed(() => {
      let b = {};
      return i.value && (b.width = y + "px", b.height = _ + "px"), b;
    }), v = computed(() => {
      let b = {};
      return i.value && (b.width = y + "px", b.height = _ + "px", b[t] = e + "px", b["z-index"] = n, u.value != 0 && (b.transform = "translateY(" + u.value + "px)")), b;
    });
    let y, _, f, g, $ = false, k;
    r("scroll", (b) => {
      x();
    });
    const x = () => {
      let b = document.documentElement.scrollTop;
      if (s != null) {
        if (document.documentElement.clientHeight + b - k <= 0)
          return i.value = false, u.value = 0, false;
        {
          let L = _ + e - (k - b);
          L > 0 ? u.value = 0 - L : u.value = 0;
        }
      }
      if (t == "top") {
        let R = f - b;
        i.value = R < e;
      } else {
        let z = document.documentElement.clientHeight + b - g;
        z > 0 && ($ = true), z < e && $ ? i.value = true : i.value = false;
      }
    };
    return onMounted(() => {
      let b = document.documentElement.scrollTop;
      if (s != null) {
        let z = document.querySelector(s).getBoundingClientRect();
        z.top + b, k = z.top + b + z.height;
      }
      let R = o.value.getBoundingClientRect();
      y = R.width, _ = R.height, f = R.top + b, g = R.top + b + R.height, x();
    }), { affixRef: o, fixDivRef: l, isFixed: i, computedAffixStyle: c, computedFixedStyle: v };
  }
});
function Bp(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("div", {
    class: "xmv-affix",
    ref: "affixRef",
    style: normalizeStyle(e.computedAffixStyle)
  }, [
    createBaseVNode("div", {
      class: normalizeClass({ "xmv-affix--fixed": e.isFixed }),
      style: normalizeStyle(e.computedFixedStyle),
      ref: "fixDivRef"
    }, [
      renderSlot(e.$slots, "default")
    ], 6)
  ], 4);
}
const Ip = /* @__PURE__ */ w(Vp, [["render", Bp]]), Np = defineComponent({
  name: "",
  props: {
    srcStr: String,
    index: Number
  },
  setup(e, t) {
    const { $on: n, $emit: s } = inject("EventBus"), a = ref(1), o = ref(0), l = ref(0), i = ref(0), r = ref(100), u = ref(100), c = ref(false), v = computed(() => {
      let y = {};
      return y.transform = `scale(${a.value}) rotate(${o.value}deg) translate(${l.value}px, ${i.value}px)`, y["max-height"] = `${r}%`, y["max-width"] = `${u}%`, y.transition = "transform 0.3s ease 0s", y.display = c.value ? "" : "none", y;
    });
    return n("setVal", (y) => {
      c.value = e.index == y.index, a.value = y.scale, o.value = y.rotate;
    }), { computeStyle: v, scaleRef: a, rotateRef: o, translateXRef: l, translateYRef: i, maxHeightRef: r, maxWidthRef: u, displayRef: c };
  }
}), zp = ["src"];
function Pp(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("img", {
    src: e.srcStr,
    style: normalizeStyle(e.computeStyle)
  }, null, 12, zp);
}
const Op = /* @__PURE__ */ w(Np, [["render", Pp]]), Hp = defineComponent({
  name: "xmvImage",
  components: { xmvImageItem: Op },
  props: {
    src: String,
    fit: { type: String, default: "none" },
    //'fill', 'contain', 'cover', 'none', 'scale-down'
    previewSrcList: Array
  },
  setup(e, t) {
    const n = ref(false);
    ref(0);
    const s = {
      index: 0,
      scale: 1,
      rotate: 0,
      translateX: 0,
      translateY: 0,
      maxHeight: 100,
      maxWidth: 100
    }, a = reactive({
      listeners: {}
    }), { $on: o, $emit: l } = be(a);
    provide("EventBus", { $on: o, $emit: l });
    const i = computed(() => !F(e.src)), r = computed(() => {
      let x = new Object();
      return e.fit != null && (x["object-fit"] = e.fit), x;
    }), u = () => {
      k(), n.value = true, nextTick(() => {
        l("setVal", s);
      });
    }, c = () => {
      n.value = false;
    }, v = () => {
      k(), s.index = s.index - 1, s.index < 0 && (s.index = e.previewSrcList.length - 1), l("setVal", s);
    }, y = () => {
      k(), s.index = s.index + 1, s.index == e.previewSrcList.length && (s.index = 0), l("setVal", s);
    }, _ = () => {
      s.scale = s.scale - 0.2, l("setVal", s);
    }, f = () => {
      s.scale = s.scale + 0.2, l("setVal", s);
    }, g = () => {
      s.rotate = s.rotate - 90, l("setVal", s);
    }, $ = () => {
      s.rotate = s.rotate + 90, l("setVal", s);
    }, k = () => {
      s.scale = 1, s.rotate = 0, s.translateX = 0, s.translateY = 0, s.maxHeight = 100, s.maxWidth = 100;
    };
    return {
      computeImgStyle: r,
      computeImage: i,
      context: t,
      imageViewerIf: n,
      handleImageClick: u,
      handleCloseClick: c,
      handlePrevClick: v,
      handleNextClick: y,
      handleZoomOutClick: _,
      handleZoomInClick: f,
      handleRefreshLeftClick: g,
      handleRefreshRightClick: $
    };
  }
}), Wp = { class: "xmv-image" }, jp = ["src"], Yp = {
  key: 1,
  class: "xmv-image__error"
}, Fp = {
  key: 0,
  class: "xmv-image-viewer__wrapper"
}, Xp = /* @__PURE__ */ createBaseVNode("div", { class: "xmv-image-viewer__mask" }, null, -1), Up = { class: "xmv-image-viewer__btn xmv-image-viewer__actions" }, qp = { class: "xmv-image-viewer__actions__inner" }, Gp = { class: "xmv-image-viewer__canvas" };
function Zp(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon"), i = resolveComponent("xmv-image-item");
  return openBlock(), createElementBlock("div", Wp, [
    e.computeImage ? (openBlock(), createElementBlock("img", {
      key: 0,
      class: normalizeClass(["xmv-image__inner", { "xmv-image__preview": e.previewSrcList != null }]),
      src: e.src,
      style: normalizeStyle(e.computeImgStyle),
      onClick: t[0] || (t[0] = (...r) => e.handleImageClick && e.handleImageClick(...r))
    }, null, 14, jp)) : createCommentVNode("", true),
    !e.computeImage && e.context.slots.error == null ? (openBlock(), createElementBlock("div", Yp, "图片加载失败")) : createCommentVNode("", true),
    e.computeImage ? createCommentVNode("", true) : renderSlot(e.$slots, "error", { key: 2 }),
    createVNode(Transition, { name: "xmv-dialog" }, {
      default: withCtx(() => [
        e.imageViewerIf ? (openBlock(), createElementBlock("div", Fp, [
          Xp,
          createBaseVNode("span", {
            class: "xmv-image-viewer__btn xmv-image-viewer__close",
            onClick: t[1] || (t[1] = (...r) => e.handleCloseClick && e.handleCloseClick(...r))
          }, [
            createVNode(l, { name: "close" })
          ]),
          createBaseVNode("span", {
            class: "xmv-image-viewer__btn xmv-image-viewer__prev",
            onClick: t[2] || (t[2] = (...r) => e.handlePrevClick && e.handlePrevClick(...r))
          }, [
            createVNode(l, { name: "arrowLeft" })
          ]),
          createBaseVNode("span", {
            class: "xmv-image-viewer__btn xmv-image-viewer__next",
            onClick: t[3] || (t[3] = (...r) => e.handleNextClick && e.handleNextClick(...r))
          }, [
            createVNode(l, { name: "arrowRight" })
          ]),
          createBaseVNode("div", Up, [
            createBaseVNode("div", qp, [
              createVNode(l, {
                name: "zoomOut",
                onClick: e.handleZoomOutClick
              }, null, 8, ["onClick"]),
              createVNode(l, {
                name: "zoomIn",
                onClick: e.handleZoomInClick
              }, null, 8, ["onClick"]),
              createVNode(l, {
                name: "refreshLeft",
                onClick: e.handleRefreshLeftClick
              }, null, 8, ["onClick"]),
              createVNode(l, {
                name: "refreshRight",
                onClick: e.handleRefreshRightClick
              }, null, 8, ["onClick"])
            ])
          ]),
          createBaseVNode("div", Gp, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(e.previewSrcList, (r, u) => (openBlock(), createBlock(i, {
              srcStr: r,
              index: u
            }, null, 8, ["srcStr", "index"]))), 256))
          ])
        ])) : createCommentVNode("", true)
      ]),
      _: 1
    })
  ]);
}
const Qp = /* @__PURE__ */ w(Hp, [["render", Zp]]), Kp = defineComponent({
  name: "xmvBreadcrumb",
  props: {
    separator: { type: String, default: "/" },
    separatorIcon: { type: String, default: "" }
  },
  emits: ["route"],
  setup(e, t) {
    const n = reactive({
      listeners: {}
    }), { $on: s, $emit: a } = be(n);
    return provide("EventBus", { $on: s, $emit: a }), provide("Separator", e.separator), provide("SeparatorIcon", e.separatorIcon), s("route", (o) => {
      t.emit("route", o);
    }), {};
  }
}), Jp = { class: "xmv-breadcrumb" };
function ef(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("div", Jp, [
    renderSlot(e.$slots, "default")
  ]);
}
const tf = /* @__PURE__ */ w(Kp, [["render", ef]]), nf = defineComponent({
  name: "xmvBreadcrumbItem",
  props: {
    separator: { type: String, default: "/" },
    to: Object
  },
  setup({ to: e }, t) {
    const { $on: n, $emit: s } = inject("EventBus"), a = ref(""), o = ref(""), l = inject("Separator"), i = inject("SeparatorIcon");
    return a.value = l, o.value = i, { separatorRef: a, separatorIconRef: o, handleClick: () => {
      e != null && s("route", e);
    } };
  }
}), sf = { class: "xmv-breadcrumb__item" }, af = {
  key: 1,
  class: "xmv-breadcrumb__separator"
};
function of(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon");
  return openBlock(), createElementBlock("span", sf, [
    createBaseVNode("span", {
      class: normalizeClass(["xmv-breadcrumb__inner", { "is-link": e.to != null }]),
      onClick: t[0] || (t[0] = (...i) => e.handleClick && e.handleClick(...i))
    }, [
      renderSlot(e.$slots, "default")
    ], 2),
    e.separatorIconRef != "" ? (openBlock(), createBlock(l, {
      key: 0,
      name: e.separatorIconRef,
      class: "xmv-breadcrumb__separator"
    }, null, 8, ["name"])) : (openBlock(), createElementBlock("span", af, toDisplayString(e.separatorRef), 1))
  ]);
}
const lf = /* @__PURE__ */ w(nf, [["render", of]]), rf = defineComponent({
  name: "xmvBacktop",
  props: {
    right: { type: Number, default: 40 },
    bottom: { type: Number, default: 40 },
    visibilityHeight: { type: Number, default: 200 }
  },
  setup({ right: e, bottom: t, visibilityHeight: n }, s) {
    const a = ref(false), o = computed(() => s.slots.default == null);
    inject("Xmv-Event-On")("scroll", (c) => {
      i();
    });
    const i = () => {
      let c = document.documentElement.scrollTop;
      a.value = c > n;
    }, r = computed(() => ({ right: e + "px", bottom: t + "px" }));
    return { isShow: a, computeStyle: r, computeIfIcon: o, handleClick: () => {
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    } };
  }
});
function df(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon");
  return openBlock(), createBlock(Transition, { name: "xmv-fade-in" }, {
    default: withCtx(() => [
      e.isShow ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "xmv-backtop",
        style: normalizeStyle(e.computeStyle),
        onClick: t[0] || (t[0] = (...i) => e.handleClick && e.handleClick(...i))
      }, [
        e.computeIfIcon ? (openBlock(), createBlock(l, {
          key: 0,
          name: "arrowRight",
          class: "xmv-backtop__icon"
        })) : createCommentVNode("", true),
        renderSlot(e.$slots, "default")
      ], 4)) : createCommentVNode("", true)
    ]),
    _: 3
  });
}
const uf = /* @__PURE__ */ w(rf, [["render", df]]), cf = defineComponent({
  name: "",
  props: {
    node: Object,
    index: Number
  },
  setup({ node: e, index: t }, n) {
    const s = inject("CascaderMode"), { $on: a, $emit: o } = inject("EventBus"), l = ref(false), i = computed(() => {
      let v = [];
      return l.value && (e.children != null ? v.push("in-active-path") : v.push("is-active")), v;
    }), { $on: r, $emit: u } = inject("MenuEventBus"), c = () => {
      s.rctData.menuComps.splice(t + 1);
      let v = s.rctData.menuComps.length - 1;
      s.selectedLabel.splice(v), s.selectedValue.splice(v), s.selectedLabel.push(e.label), s.selectedValue.push(e.value), u("itemClick", e), e.children != null ? nextTick(() => {
        s.rctData.menuComps.push({ list: e.children });
      }) : o("emitModelValue");
    };
    return r("itemClick", (v) => {
      l.value = e.value == v.value;
    }), a("setVal", (v) => {
      v.value == e.value && v.index == t && c();
    }), { computeClass: i, handleClick: c };
  }
}), mf = { class: "xmv-cascader-node__label" };
function hf(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon");
  return openBlock(), createElementBlock("li", {
    class: normalizeClass(["xmv-cascader-node", e.computeClass]),
    onClick: t[0] || (t[0] = (...i) => e.handleClick && e.handleClick(...i))
  }, [
    createBaseVNode("span", mf, toDisplayString(e.node.label), 1),
    e.node.children != null ? (openBlock(), createBlock(l, {
      key: 0,
      name: "arrowRight",
      class: "xmv-cascader-node__postfix"
    })) : createCommentVNode("", true)
  ], 2);
}
const pf = /* @__PURE__ */ w(cf, [["render", hf]]), ff = defineComponent({
  name: "",
  props: {
    list: Array,
    index: Number
  },
  components: { xmvCascaderItem: pf },
  setup({ index: e }, t) {
    const n = reactive({
      listeners: {}
    }), { $on: s, $emit: a } = be(n);
    return provide("MenuEventBus", { $on: s, $emit: a }), {};
  }
}), vf = { class: "xmv-cascader-menu__list" };
function gf(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-cascader-item"), i = resolveComponent("xmv-scrollbar");
  return openBlock(), createBlock(i, null, {
    default: withCtx(() => [
      createBaseVNode("ul", vf, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(e.list, (r, u) => (openBlock(), createBlock(l, {
          node: r,
          index: e.index,
          key: u
        }, null, 8, ["node", "index"]))), 128))
      ])
    ]),
    _: 1
  });
}
const _f = /* @__PURE__ */ w(ff, [["render", gf]]);
class $f {
  constructor() {
    this.rctData = reactive({
      options: new Object(),
      menuComps: []
    }), this.selectedValue = [], this.selectedLabel = [];
  }
  init() {
    this.rctData.menuComps = [], this.selected = [], this.rctData.menuComps.push({ list: this.rctData.options.children });
  }
}
const bf = defineComponent({
  name: "xmvCascader",
  components: { xmvCascaderMenu: _f },
  props: {
    options: Array,
    modelValue: String
  },
  setup(e, t) {
    const n = new $f(), s = ref(false), a = ref(false), o = reactive({
      listeners: {}
    }), { $on: l, $emit: i } = be(o);
    provide("EventBus", { $on: l, $emit: i }), provide("CascaderMode", n), watch(() => e.options, (u) => {
      n.rctData.options = { children: e.options }, nextTick(() => {
        n.init();
      });
    }), watch(() => e.modelValue, (u) => {
      r(u);
    });
    const r = (u) => {
      u.split(",").forEach((v, y) => {
        setTimeout(() => {
          i("setVal", { value: v, index: y });
        }, 10);
      });
    };
    return l("emitModelValue", () => {
      s.value.hide(), a.value.val(n.selectedLabel.join(" / ")), t.emit("update:modelValue", n.selectedValue.join(","));
    }), onMounted(() => {
      n.rctData.options = { children: e.options }, n.init();
    }), { cascaderMode: n, popoverRef: s, inputRef: a };
  }
}), xf = { class: "xmv-cascader" }, yf = { class: "xmv-cascader-panel" };
function Cf(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-input"), i = resolveComponent("xmv-cascader-menu"), r = resolveComponent("xmv-popover");
  return openBlock(), createBlock(r, { ref: "popoverRef" }, {
    trigger: withCtx(() => [
      createBaseVNode("div", xf, [
        createVNode(l, {
          "suffix-icon": "arrowDown",
          ref: "inputRef"
        }, null, 512)
      ])
    ]),
    default: withCtx(() => [
      createBaseVNode("div", yf, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(e.cascaderMode.rctData.menuComps, (u, c) => (openBlock(), createBlock(i, {
          list: u.list,
          index: c
        }, null, 8, ["list", "index"]))), 256))
      ])
    ]),
    _: 1
  }, 512);
}
const wf = /* @__PURE__ */ w(bf, [["render", Cf]]);
class _t {
  constructor(t) {
    this.props = t, this.sliderVal = ref(0), this.toolTipContent = ref(0), this.tooltipRef = ref(null), this.isDragging, this.sliderBound = null, this.ctx, this.trigger, this.handleWindowMouseupFn = this.handleWindowMouseup.bind(this), this.handleWindowMousemoveFn = this.handleWindowMousemove.bind(this);
  }
  handleSliderButtonMousedown() {
    if (this.props.disabled)
      return false;
    this.isDragging.value = true, this.tooltipRef.value.keepShow = true, window.addEventListener("mouseup", this.handleWindowMouseupFn), window.addEventListener("mousemove", this.handleWindowMousemoveFn);
  }
  handleWindowMouseup() {
    this.isDragging.value = false, this.tooltipRef.value.keepShow = false, this.tooltipRef.value.hide(), window.removeEventListener("mouseup", this.handleWindowMouseupFn), window.removeEventListener("mousemove", this.handleWindowMousemoveFn);
  }
  handleWindowMousemove(t) {
    let n = parseInt(t.clientX) - this.sliderBound.left, s = parseInt(n / this.sliderBound.width * 100);
    s <= 0 && (s = 0), s >= 100 && (s = 100), this.sliderVal.value = this.__nearestStep(s, this.props.step), this.trigger();
  }
  __nearestStep(t, n) {
    return Math.round(t / n) * n;
  }
}
const kf = defineComponent({
  name: "xmvSlider",
  props: {
    modelValue: Number | Array,
    formatTooltip: Function,
    step: { type: Number, default: 1 },
    showStep: { type: String },
    showInput: { type: String },
    size: { type: String },
    disabled: { type: Boolean, default: false },
    range: { type: Boolean, default: false }
  },
  setup(e, t) {
    const n = new _t(e), s = new _t(e), a = ref(null), o = ref(false), l = ref([]), i = ref(0), r = ref(0);
    n.ctx = t, s.ctx = t, n.isDragging = o, s.isDragging = o;
    let u;
    const c = computed(() => {
      let k = [];
      return o.value && k.push("dragging"), e.showInput != null && k.push("xmv-slider--with-input"), e.size != null && k.push("xmv-slider--" + e.size), k;
    }), v = (k) => {
      if (e.disabled)
        return false;
      let x = parseInt(k.clientX) - u.left, b = parseInt(x / u.width * 100);
      if (b <= 0 && (b = 0), b >= 100 && (b = 100), !e.range)
        t.emit("update:modelValue", b);
      else {
        let R = Math.abs(b - n.sliderVal.value), L = Math.abs(b - s.sliderVal.value);
        R <= L ? n.sliderVal.value = b : s.sliderVal.value = b, g();
      }
    }, y = (k, x) => Math.round(k / x) * x, _ = (k) => {
      t.emit("update:modelValue", k);
    }, f = (k) => {
      if (e.range) {
        let x = y(k[0], e.step);
        n.sliderVal.value = x, n.toolTipContent.value = $(x);
        let b = y(k[1], e.step);
        s.sliderVal.value = b, s.toolTipContent.value = $(b);
        let R = x, L = b;
        b < x && (R = b, L = x), r.value = R, i.value = L - R;
      } else {
        let x = y(k, e.step);
        n.sliderVal.value = x, n.toolTipContent.value = $(x), i.value = x;
      }
    }, g = () => {
      e.range ? t.emit("update:modelValue", [n.sliderVal.value, s.sliderVal.value]) : t.emit("update:modelValue", n.sliderVal.value);
    };
    watch(() => e.modelValue, (k) => {
      f(k);
    });
    const $ = (k) => e.formatTooltip != null ? e.formatTooltip(k) : k;
    return onMounted(() => {
      if (u = a.value.getBoundingClientRect(), n.sliderBound = u, s.sliderBound = u, n.trigger = g, s.trigger = g, F(e.modelValue) || f(e.modelValue), e.showStep != null) {
        let k = 100 / e.step;
        for (let x = 1; x < k; x++)
          l.value.push(x * e.step);
      }
    }), {
      sliderRef: a,
      computeSliderClass: c,
      stepList: l,
      sliderMode: n,
      sliderRightMode: s,
      sliderBarWidth: i,
      sliderBarLeft: r,
      handleSliderClick: v,
      handleInputChange: _
    };
  }
}), Mf = { key: 1 };
function Sf(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-tooltip"), i = resolveComponent("xmv-input-number");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["xmv-slider", e.computeSliderClass])
  }, [
    createBaseVNode("div", {
      class: normalizeClass(["xmv-slider__runway", { "is-disabled": e.disabled }]),
      onClick: t[2] || (t[2] = withModifiers((...r) => e.handleSliderClick && e.handleSliderClick(...r), ["stop"])),
      ref: "sliderRef"
    }, [
      createBaseVNode("div", {
        class: "xmv-slider__bar",
        style: normalizeStyle({ width: e.sliderBarWidth + "%", left: e.sliderBarLeft + "%" })
      }, null, 4),
      createBaseVNode("div", {
        class: "xmv-slider__button-wrapper",
        style: normalizeStyle({ left: e.sliderMode.sliderVal.value + "%" })
      }, [
        createVNode(l, {
          content: e.sliderMode.toolTipContent.value,
          isAlignCenter: true,
          ref: e.sliderMode.tooltipRef
        }, {
          default: withCtx(() => [
            createBaseVNode("div", {
              class: "xmv-slider__button",
              onMousedown: t[0] || (t[0] = withModifiers((...r) => e.sliderMode.handleSliderButtonMousedown && e.sliderMode.handleSliderButtonMousedown(...r), ["stop"]))
            }, null, 32)
          ]),
          _: 1
        }, 8, ["content"])
      ], 4),
      e.range ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "xmv-slider__button-wrapper",
        style: normalizeStyle({ left: e.sliderRightMode.sliderVal.value + "%" })
      }, [
        createVNode(l, {
          content: e.sliderRightMode.toolTipContent.value,
          isAlignCenter: true,
          ref: e.sliderRightMode.tooltipRef
        }, {
          default: withCtx(() => [
            createBaseVNode("div", {
              class: "xmv-slider__button",
              onMousedown: t[1] || (t[1] = withModifiers((...r) => e.sliderRightMode.handleSliderButtonMousedown && e.sliderRightMode.handleSliderButtonMousedown(...r), ["stop"]))
            }, null, 32)
          ]),
          _: 1
        }, 8, ["content"])
      ], 4)) : createCommentVNode("", true),
      e.showStep != null ? (openBlock(), createElementBlock("div", Mf, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(e.stepList, (r) => (openBlock(), createElementBlock("div", {
          class: "xmv-slider__stop",
          style: normalizeStyle({ left: r + "%" })
        }, null, 4))), 256))
      ])) : createCommentVNode("", true)
    ], 2),
    e.showInput != null ? (openBlock(), createBlock(i, {
      key: 0,
      class: "xmv-slider__input",
      modelValue: e.sliderMode.sliderVal.value,
      "onUpdate:modelValue": t[3] || (t[3] = (r) => e.sliderMode.sliderVal.value = r),
      step: e.step,
      size: e.size,
      min: 0,
      max: 100,
      onInputChange: e.handleInputChange
    }, null, 8, ["modelValue", "step", "size", "onInputChange"])) : createCommentVNode("", true)
  ], 2);
}
const Df = /* @__PURE__ */ w(kf, [["render", Sf]]), Rf = defineComponent({
  name: "xmvBadge",
  props: {
    type: { type: String, default: "danger" },
    max: Number,
    value: Number | String,
    isDot: Boolean
  },
  setup(e, t) {
    const n = computed(() => {
      let a = [];
      return e.type != null && a.push("xmv-badge__content--" + e.type), t.slots.default && a.push("is-fixed"), F(e.value, true) && a.push("is-empty"), e.isDot && a.push("is-dot"), a;
    }), s = computed(() => e.isDot ? "" : typeof e.value == "string" || e.max == null || e.value <= e.max ? e.value : e.max + "+");
    return { computeClass: n, computeValue: s };
  }
}), Lf = { class: "xmv-badge" };
function Tf(e, t, n, s, a, o) {
  return openBlock(), createElementBlock("div", Lf, [
    renderSlot(e.$slots, "default"),
    createBaseVNode("sup", {
      class: normalizeClass(["xmv-badge__content", e.computeClass])
    }, toDisplayString(e.computeValue), 3)
  ]);
}
const Lt = /* @__PURE__ */ w(Rf, [["render", Tf]]), Ef = defineComponent({
  name: "",
  props: {
    data: Object,
    line: Number,
    column: Number
  },
  setup({ data: e, line: t, column: n }, s) {
    const a = inject("DMode"), o = () => a.direction == "vertical" ? t % 2 == 0 : n % 2 == 0, l = computed(() => {
      let u = [], c = o();
      return u.push("xmv-descriptions__cell"), c ? u.push("xmv-descriptions__label") : u.push("xmv-descriptions__content"), a.border && (c ? u.push("is-bordered-label") : u.push("is-bordered-content")), a.direction == "vertical" && (c ? u.push("is-vertical-label") : u.push("is-vertical-content")), u;
    }), i = () => {
      let u = e.context.slots;
      return o() ? u.title ? u.title() : e.props.label : u.default ? u.default() : null;
    }, r = () => {
      let u = 1, c = a.trList.value[t];
      return c[c.length - 1] === e && (a.direction == "vertical" ? n + 1 != a.column && (u = a.column - n) : o() || n + 1 != a.column * 2 && (u = a.column * 2 - n)), u;
    };
    return () => h("td", { class: l.value, colspan: r() }, i());
  }
});
function Af(e, t, n, s, a, o) {
  return null;
}
const Vf = /* @__PURE__ */ w(Ef, [["render", Af]]);
class Bf {
  constructor({ column: t, direction: n, border: s }) {
    this.trList = ref([]), this.column = t, this.direction = n, this.border = s, this.itemList = [];
  }
  init() {
    let t = If(this.itemList, this.column, this.direction);
    this.trList.value = t;
  }
}
function If(e, t, n) {
  let s = t;
  n != "vertical" && (s = s * 2);
  for (var a = [], o = [], l = 0; l < e.length; l++)
    o.push(e[l]), n != "vertical" && o.push(e[l]), o.length === s && (a.push(o), n == "vertical" && a.push(o), o = []);
  return o.length > 0 && (a.push(o), n == "vertical" && a.push(o)), a;
}
const Nf = defineComponent({
  name: "xmvDescriptions",
  props: {
    title: String,
    column: { type: Number, default: 3 },
    size: String,
    direction: String,
    // 垂直向为vertical
    border: Boolean
  },
  components: { descriptionsTd: Vf },
  setup(e, t) {
    const n = new Bf(e);
    return provide("DMode", n), onMounted(() => {
      n.init();
    }), { dMode: n };
  }
}), zf = { class: "xmv-descriptions__header" }, Pf = { class: "xmv-descriptions__title" }, Of = /* @__PURE__ */ createBaseVNode("div", { class: "xmv-descriptions__extra" }, null, -1), Hf = { class: "xmv-descriptions__body" };
function Wf(e, t, n, s, a, o) {
  const l = resolveComponent("descriptions-td");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["xmv-descriptions", {
      "xmv-descriptions--small": e.size == "small",
      "xmv-descriptions--large": e.size == "large"
    }])
  }, [
    createBaseVNode("div", zf, [
      createBaseVNode("div", Pf, toDisplayString(e.title), 1),
      Of
    ]),
    createBaseVNode("div", Hf, [
      createBaseVNode("table", {
        class: normalizeClass(["xmv-descriptions__table", { "is-bordered": e.border }])
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(e.dMode.trList.value, (i, r) => (openBlock(), createElementBlock("tr", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(i, (u, c) => (openBlock(), createBlock(l, {
            data: u,
            line: r,
            column: c
          }, null, 8, ["data", "line", "column"]))), 256))
        ]))), 256))
      ], 2)
    ]),
    renderSlot(e.$slots, "default")
  ], 2);
}
const jf = /* @__PURE__ */ w(Nf, [["render", Wf]]), Yf = defineComponent({
  name: "xmvDescriptionsItem",
  props: {
    label: String
  },
  setup(e, t) {
    return inject("DMode").itemList.push({ props: e, context: t }), {};
  }
});
function Ff(e, t, n, s, a, o) {
  return null;
}
const Xf = /* @__PURE__ */ w(Yf, [["render", Ff]]), Uf = defineComponent({
  name: "xmvDropdown",
  emits: ["itemClick"],
  props: {
    trigger: { type: String, default: "hover" },
    splitButton: { type: Boolean, default: false },
    type: { type: String, default: "primary" },
    size: { type: String }
  },
  setup(e, t) {
    const n = ref(null);
    return provide("Context", t), provide("PopoverRef", n), provide("Size", e.size), { popoverRef: n };
  }
}), qf = {
  key: 0,
  class: "xmv-dropdown"
}, Gf = { class: "xmv-dropdown" };
function Zf(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-button"), i = resolveComponent("xmv-icon"), r = resolveComponent("xmv-popover"), u = resolveComponent("xmv-button-group");
  return openBlock(), createElementBlock(Fragment, null, [
    e.splitButton ? (openBlock(), createElementBlock("div", qf, [
      createVNode(u, null, {
        default: withCtx(() => [
          createVNode(l, {
            type: e.type,
            size: e.size
          }, {
            default: withCtx(() => [
              renderSlot(e.$slots, "default")
            ]),
            _: 3
          }, 8, ["type", "size"]),
          createVNode(r, {
            trigger: e.trigger,
            "pop-class": "xmv-dropdown__popper",
            ref: "popoverRef",
            "is-align-center": ""
          }, {
            trigger: withCtx(() => [
              createVNode(l, {
                type: e.type,
                size: e.size
              }, {
                default: withCtx(() => [
                  createVNode(i, { name: "arrowDown" })
                ]),
                _: 1
              }, 8, ["type", "size"])
            ]),
            default: withCtx(() => [
              renderSlot(e.$slots, "dropdown")
            ]),
            _: 3
          }, 8, ["trigger"])
        ]),
        _: 3
      })
    ])) : createCommentVNode("", true),
    e.splitButton ? createCommentVNode("", true) : (openBlock(), createBlock(r, {
      key: 1,
      trigger: e.trigger,
      "pop-class": "xmv-dropdown__popper",
      ref: "popoverRef",
      "is-align-center": ""
    }, {
      trigger: withCtx(() => [
        createBaseVNode("div", Gf, [
          renderSlot(e.$slots, "default")
        ])
      ]),
      default: withCtx(() => [
        renderSlot(e.$slots, "dropdown")
      ]),
      _: 3
    }, 8, ["trigger"]))
  ], 64);
}
const Qf = /* @__PURE__ */ w(Uf, [["render", Zf]]), Kf = defineComponent({
  name: "xmvDropdownMenu",
  setup(e, t) {
    const n = inject("Size");
    return { computeClass: computed(() => {
      let a = [];
      return n != null && a.push("xmv-dropdown-menu--" + n), a;
    }) };
  }
});
function Jf(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-scrollbar");
  return openBlock(), createBlock(l, { maxHeightFlag: true }, {
    default: withCtx(() => [
      createBaseVNode("ul", {
        class: normalizeClass(["xmv-dropdown-menu", e.computeClass])
      }, [
        renderSlot(e.$slots, "default")
      ], 2)
    ]),
    _: 3
  });
}
const ev = /* @__PURE__ */ w(Kf, [["render", Jf]]), tv = defineComponent({
  name: "xmvDropdownItem",
  props: {
    icon: String | Object,
    disabled: Boolean,
    divided: Boolean
  },
  setup(e, t) {
    const n = inject("Context"), s = inject("PopoverRef");
    return { handleClick: () => {
      if (e.disabled)
        return false;
      n.emit("itemClick"), s.value.hide();
    } };
  }
}), nv = {
  key: 0,
  class: "xmv-dropdown-menu__item--divided"
};
function sv(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon");
  return openBlock(), createElementBlock(Fragment, null, [
    e.divided ? (openBlock(), createElementBlock("li", nv)) : createCommentVNode("", true),
    createBaseVNode("li", {
      class: normalizeClass(["xmv-dropdown-menu__item", { "is-disabled": e.disabled }]),
      onClick: t[0] || (t[0] = (...i) => e.handleClick && e.handleClick(...i))
    }, [
      e.icon != null ? (openBlock(), createBlock(l, {
        key: 0,
        name: e.icon
      }, null, 8, ["name"])) : createCommentVNode("", true),
      renderSlot(e.$slots, "default")
    ], 2)
  ], 64);
}
const av = /* @__PURE__ */ w(tv, [["render", sv]]), ov = defineComponent({
  name: "xmvPageHeader",
  emits: ["back"],
  props: {
    icon: String | Object
  },
  setup(e, t) {
    const n = computed(() => {
      let a = [];
      return t.slots.default != null && a.push("is-contentful"), t.slots.breadcrumb != null && a.push("xmv-page-header--has-breadcrumb"), t.slots.extra != null && a.push("xmv-page-header--has-extra"), a;
    });
    return { handleBackClick: () => {
      t.emit("back");
    }, computeClass: n };
  }
}), lv = { class: "xmv-page-header__breadcrumb" }, iv = { class: "xmv-page-header__header" }, rv = { class: "xmv-page-header__left" }, dv = { class: "xmv-page-header__icon" }, uv = /* @__PURE__ */ createBaseVNode("div", { class: "xmv-page-header__title" }, " Back ", -1), cv = { class: "xmv-page-header__content" }, mv = { class: "xmv-page-header__extra" }, hv = { class: "xmv-page-header__main" };
function pv(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon"), i = resolveComponent("xmv-divider");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["xmv-page-header", e.computeClass])
  }, [
    createBaseVNode("div", lv, [
      renderSlot(e.$slots, "breadcrumb")
    ]),
    createBaseVNode("div", iv, [
      createBaseVNode("div", rv, [
        createBaseVNode("div", {
          class: "xmv-page-header__back",
          onClick: t[0] || (t[0] = (...r) => e.handleBackClick && e.handleBackClick(...r))
        }, [
          createBaseVNode("div", dv, [
            e.icon != null ? (openBlock(), createBlock(l, {
              key: 0,
              name: e.icon
            }, null, 8, ["name"])) : (openBlock(), createBlock(l, {
              key: 1,
              name: "back"
            }))
          ]),
          uv
        ]),
        createVNode(i, { direction: "vertical" }),
        createBaseVNode("div", cv, [
          renderSlot(e.$slots, "content")
        ])
      ]),
      createBaseVNode("div", mv, [
        renderSlot(e.$slots, "extra")
      ])
    ]),
    createBaseVNode("div", hv, [
      renderSlot(e.$slots, "default")
    ])
  ], 2);
}
const fv = /* @__PURE__ */ w(ov, [["render", pv]]), vv = defineComponent({
  name: "xmvAlert",
  emits: ["close"],
  props: {
    type: { type: String, default: "success" },
    effect: { type: String, default: "light" },
    title: String,
    description: String,
    showIcon: Boolean,
    center: Boolean,
    closable: { type: Boolean, default: true }
  },
  setup(e, t) {
    const n = ref(true);
    return { computeClass: computed(() => {
      let o = [];
      return o.push("xmv-alert--" + e.type), o.push("is-" + e.effect), e.center && o.push("is-center"), o;
    }), isShow: n, handleCloseClick: () => {
      n.value = false, t.emit("close");
    } };
  }
}), gv = { class: "xmv-alert__content" }, _v = {
  key: 0,
  class: "xmv-alert__description"
};
function $v(e, t, n, s, a, o) {
  const l = resolveComponent("xmv-icon");
  return openBlock(), createBlock(Transition, { name: "xmv-fade-in" }, {
    default: withCtx(() => [
      e.isShow ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["xmv-alert xmv-alert--success is-light", e.computeClass])
      }, [
        e.showIcon ? (openBlock(), createBlock(l, {
          key: 0,
          class: normalizeClass(["xmv-alert__icon", { "is-big": e.description != null }]),
          name: (e.type == "error" ? "circleClose" : e.type) + "Filled"
        }, null, 8, ["class", "name"])) : createCommentVNode("", true),
        createBaseVNode("div", gv, [
          createBaseVNode("span", {
            class: normalizeClass(["xmv-alert__title", { "is-bold": e.description != null }])
          }, toDisplayString(e.title), 3),
          e.description != null ? (openBlock(), createElementBlock("p", _v, toDisplayString(e.description), 1)) : createCommentVNode("", true),
          e.closable ? (openBlock(), createBlock(l, {
            key: 1,
            name: "close",
            class: "xmv-alert__close-btn",
            onClick: e.handleCloseClick
          }, null, 8, ["onClick"])) : createCommentVNode("", true)
        ])
      ], 2)) : createCommentVNode("", true)
    ]),
    _: 1
  });
}
const bv = /* @__PURE__ */ w(vv, [["render", $v]]), xv = {
  mounted(e, t) {
    const n = document.createElement("div");
    n.className = "xmv-loading-mask", e.getAttribute("xmv-loading-background") && Me(n, "background-color", e.getAttribute("xmv-loading-background"));
    const s = document.createElement("div");
    s.className = "xmv-loading-spinner", n.appendChild(s);
    const a = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    a.setAttribute("class", "circular"), e.getAttribute("xmv-loading-svg-view-box") ? a.setAttribute("viewBox", e.getAttribute("xmv-loading-svg-view-box")) : a.setAttribute("viewBox", "0 0 50 50");
    const o = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    if (o.setAttribute("class", "path"), o.setAttribute("cx", "25"), o.setAttribute("cy", "25"), o.setAttribute("r", "20"), o.setAttribute("fill", "none"), e.getAttribute("xmv-loading-svg") ? a.innerHTML = e.getAttribute("xmv-loading-svg") : a.appendChild(o), s.appendChild(a), e.getAttribute("xmv-loading-text")) {
      const l = document.createElement("p");
      l.className = "xmv-loading-text", l.innerHTML = e.getAttribute("xmv-loading-text"), s.appendChild(l);
    }
    t.modifiers.fullscreen ? (Me(n, "position", "fixed"), document.body.appendChild(n)) : e.appendChild(n), e._loadingContainer = n, t.value ? e._loadingContainer.style.display = "block" : e._loadingContainer.style.display = "none";
  },
  updated(e, t) {
    t.value ? e._loadingContainer.style.display = "block" : e._loadingContainer.style.display = "none";
  },
  unmounted(e) {
    e._loadingContainer && e._loadingContainer.remove();
  }
}, yv = {
  mounted(e, t) {
    const n = (s) => {
      !e.contains(s.target) && e !== s.target && t.value();
    };
    document.addEventListener("click", n), e._clickoutside = n;
  },
  unmounted(e) {
    document.removeEventListener("click", e._clickoutside), delete e._clickoutside;
  }
};
const Be = reactive([]);
watch(Be, () => {
  Be.forEach((e, t) => {
    e.topRef = 20 + t * 64;
  });
}, { deep: false });
const ot = reactive([]), lt = reactive([]), it = reactive([]), rt = reactive([]);
watch(ot, () => {
  ot.forEach((e, t) => {
    e.topRef = 20 + t * 100;
  });
}, { deep: false });
watch(it, () => {
  it.forEach((e, t) => {
    e.topRef = 20 + t * 100;
  });
}, { deep: false });
watch(lt, () => {
  lt.forEach((e, t) => {
    e.bottomRef = 20 + t * 100;
  });
}, { deep: false });
watch(rt, () => {
  rt.forEach((e, t) => {
    e.bottomRef = 20 + t * 100;
  });
}, { deep: false });
const e0 = (e) => {
  const { provide: t } = e, n = reactive({
    listeners: {}
  }), { $on: s, $emit: a } = be(n), o = document.createElement("div");
  o.id = "xmv-popper-container", document.body.appendChild(o), t("Xmv-Dom-PopperContainer", o), t("Xmv-Event-On", s), t("Xmv-Bubbling", { status: true }), window.addEventListener("mouseup", (l) => {
    a("mouseup", l);
  }), window.addEventListener("scroll", (l) => {
    a("scroll", l);
  }), e.component("xmvLayout", jt), e.component("xmvButton", xt), e.component("xmvButtonGroup", Qt), e.component("xmvMenu", vn), e.component("xmvMenuCore", Mn), e.component("xmvMenuCoreCollapse", zn), e.component("xmvMenuCoreHorizontal", qn), e.component("xmvPopover", Kn), e.component("xmvTooltip", wt), e.component("xmvScrollbar", ls), e.component("xmvTable", Kr), e.component("xmvTableColumn", td), e.component("xmvIcon", Ve), e.component("xmvRow", ad), e.component("xmvCol", id), e.component("xmvInput", kt), e.component("xmvInputNumber", gd), e.component("xmvSelect", Md), e.component("xmvOption", Rd), e.component("xmvSelectTags", Bd), e.component("xmvTag", Pd), e.component("xmvRadioGroup", jd), e.component("xmvRadio", Gd), e.component("xmvRadioButton", eu), e.component("xmvCheckbox", st), e.component("xmvCheckboxGroup", au), e.component("xmvCheckboxButton", du), e.component("xmvDatePicker", Ou), e.component("xmvTimePicker", hc), e.component("xmvTree", _c), e.component("xmvTreeNode", Ec), e.component("xmvTreeSelect", Bc), e.component("xmvDialog", Wc), e.component("xmvForm", Fc), e.component("xmvFormItem", em), e.component("xmvColorPicker", $m), e.component("xmvDrawer", Mm), e.component("xmvTabs", Nm), e.component("xmvTabPanel", Om), e.component("xmvPagination", $h), e.component("xmvDivider", yh), e.component("xmvCard", Sh), e.component("xmvSpace", Lh), e.component("xmvSwitch", Nh), e.component("xmvEmpty", Uh), e.component("xmvUpload", up), e.component("xmvTransitionGroup", hp), e.component("xmvCollapse", gp), e.component("xmvCollapseItem", yp), e.component("xmvCarousel", Lp), e.component("xmvCarouselItem", Ap), e.component("xmvAffix", Ip), e.component("xmvImage", Qp), e.component("xmvBreadcrumb", tf), e.component("xmvBreadcrumbItem", lf), e.component("xmvBacktop", uf), e.component("xmvCascader", wf), e.component("xmvSlider", Df), e.component("xmvBadge", Lt), e.component("xmvDescriptions", jf), e.component("xmvDescriptionsItem", Xf), e.component("xmvDropdown", Qf), e.component("xmvDropdownMenu", ev), e.component("xmvDropdownItem", av), e.component("xmvPageHeader", fv), e.component("xmvAlert", bv), e.directive("loading", xv), e.directive("clickoutside", yv);
};
const xmvUi = "";
const index = "";
const AppStatus = {
  MOUNTED: "mounted",
  BEFORE_BOOTSTRAP: "before_bootstrap",
  BOOTSTRAPPED: "bootstrapped",
  UNMOUNTED: "unmounted"
};
const originalDocumentAddEventListener = window.document.addEventListener;
const originalDocumentRemoveEventListener = window.document.removeEventListener;
const globalAppEventMap = /* @__PURE__ */ new Map();
function overwriteDocumentEvent() {
  window.document.addEventListener = (type, listener, options) => {
    let currentApp2 = getCurrentApp();
    if (!globalAppEventMap.get(currentApp2.name)) {
      globalAppEventMap.set(currentApp2.name, /* @__PURE__ */ new Map());
    }
    let eventMap = globalAppEventMap.get(currentApp2.name);
    if (!eventMap.get(type)) {
      eventMap.set(type, []);
    }
    eventMap.get(type).push({ listener, options });
    const result = originalDocumentAddEventListener.call(window.document, type, listener, options);
    return result;
  };
  window.document.removeEventListener = (type, __listener, options) => {
    let currentApp2 = getCurrentApp();
    let eventMap = globalAppEventMap.get(currentApp2.name);
    let handleList = eventMap.get(type);
    let indexToRemove = 0;
    handleList.forEach(({ listener, options: options2 }, i) => {
      if (listener === __listener)
        indexToRemove = i;
    });
    handleList.splice(indexToRemove, 1);
    const result = originalDocumentRemoveEventListener.call(window.document, type, __listener, options);
    return result;
  };
}
function recoverDocumentEvent(appName) {
  let eventMap = globalAppEventMap.get(appName);
  if (!eventMap) {
    return false;
  }
  eventMap.forEach((handleList, key) => {
    handleList.forEach(({ listener, options }) => {
      originalDocumentAddEventListener.call(window.document, key, listener, options);
    });
  });
}
function clearDocumentEvent(appName) {
  let eventMap = globalAppEventMap.get(appName);
  if (!eventMap) {
    return false;
  }
  eventMap.forEach((handleList, key) => {
    handleList.forEach(({ listener, options }) => {
      originalDocumentRemoveEventListener.call(window.document, key, listener, options);
    });
  });
}
function overwriteEventsAndHistory() {
  window.addEventListener("hashchange", () => {
    loadApps();
  }, true);
}
function parseHTML(app2) {
  return new Promise(async (resolve2, reject) => {
    const pageEntry = app2.pageEntry;
    const html = await loadSourceText(pageEntry);
    const domparser = new DOMParser();
    const doc2 = domparser.parseFromString(html, "text/html");
    resolve2(doc2);
  });
}
function loadSources(doc2, app2, proxyWindow) {
  let isStylesDone = false, isScriptsDone = false;
  return new Promise((resolve2, reject) => {
    const { scripts, styles } = extractScriptsAndStyles(doc2, app2.pageEntry);
    document.getElementById(app2.container).innerHTML = doc2.body.innerHTML;
    Promise.all(loadStyles(styles, app2.pageEntry)).then((data) => {
      isStylesDone = true;
      app2.styles = data;
      if (isScriptsDone && isStylesDone)
        resolve2();
    });
    Promise.all(loadScripts(scripts, app2.pageEntry)).then((data) => {
      isScriptsDone = true;
      executeScripts(data, proxyWindow);
      if (isScriptsDone && isStylesDone)
        resolve2();
    });
  });
}
function loadSourceText(url) {
  return new Promise((resolve2, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = (res) => {
      resolve2(res.target.response);
    };
    xhr.onerror = reject;
    xhr.onabort = reject;
    xhr.open("get", url);
    xhr.send();
  });
}
function extractScriptsAndStyles(doc2) {
  const parsedDocument = doc2.documentElement;
  const scriptElements = parsedDocument.querySelectorAll("script");
  const styleElements = parsedDocument.querySelectorAll("link");
  return { scripts: scriptElements, styles: styleElements };
}
function loadScripts(scriptElements, url) {
  let promiseArray = [];
  scriptElements.forEach((script) => {
    let scriptSrc = script.getAttribute("src");
    if (scriptSrc.indexOf("http") >= 0) {
      promiseArray.push(loadSourceText(scriptSrc));
    } else {
      promiseArray.push(loadSourceText(url + "/" + scriptSrc));
    }
  });
  return promiseArray;
}
function executeScripts(scripts, proxyWindow) {
  try {
    scripts.forEach((code) => {
      const warpCode = `
                ;(function(proxyWindow){
                    with (proxyWindow) {
                        (function(window){${code}
}).call(proxyWindow, proxyWindow)
                    }
                })(this);
            `;
      new Function(warpCode).call(proxyWindow, proxyWindow);
    });
  } catch (error) {
    console.log(error);
  }
}
function loadStyles(styles, url) {
  let promiseArray = [];
  styles.forEach((style) => {
    if (style.getAttribute("rel") == "stylesheet") {
      promiseArray.push(new Promise((resolve2, reject) => {
        resolve2(style);
      }));
    }
  });
  return promiseArray;
}
function addStyles(styles, url, appName) {
  styles.forEach((item) => {
    if (typeof item === "string") {
      const node = document.createElement("style", {
        type: "text/css"
      });
      node.innerHTML = item;
      node.setAttribute("xm-airplane" + appName, "");
      document.head.appendChild(node);
    } else {
      const linkEl = document.createElement("link");
      linkEl.rel = "stylesheet";
      linkEl.href = url + "/" + item.getAttribute("href");
      linkEl.setAttribute("xm-airplane-" + appName, "");
      document.head.appendChild(linkEl);
    }
  });
}
function removeStyles(appName) {
  const links = document.querySelectorAll(`link[xm-airplane-${appName}]`);
  links.forEach((linkNode) => {
    linkNode.remove();
  });
}
function wrapEventListener(eventMap, oriEventListener, scope) {
  return (type, listener, options) => {
    if (!eventMap.get(type)) {
      eventMap.set(type, []);
    }
    eventMap.get(type).push({ listener, options });
    return oriEventListener.call(scope, type, listener, options);
  };
}
function wrapRemoveEventListener(eventMap, oriEventListener, scope) {
  return (type, listener, options) => {
    if (eventMap.get(type)) {
      let handleList = eventMap.get(type);
      let indexToRemove = handleList.indexOf(listener);
      handleList.splice(indexToRemove, 1);
    }
    return oriEventListener.call(scope, type, listener, options);
  };
}
function clearWrapEventListener(eventMap, oriRemoveEventListener, scope) {
  for (let [type, arr] of eventMap) {
    for (let item of arr) {
      oriRemoveEventListener.call(scope, type, item.listener, item.options);
    }
  }
}
function wrapSetTimeout(app2) {
  return (callback, timeout, ...args) => {
    const fn2 = () => {
      let currentApp2 = getCurrentApp();
      if (currentApp2.name == app2.name) {
        callback && callback();
      }
    };
    const timer = window.setTimeout(fn2, timeout, ...args);
    return timer;
  };
}
function wrapSetInterval(app2) {
  return (callback, interval, ...args) => {
    const fn2 = () => {
      let currentApp2 = getCurrentApp();
      if (currentApp2.name == app2.name) {
        callback && callback();
      }
    };
    const intervaler = window.setInterval(fn2, interval, ...args);
    return intervaler;
  };
}
let originalWindowAddEventListener = window.addEventListener;
let originalWindowRemoveEventListener = window.removeEventListener;
class Sandbox {
  constructor(application) {
    this.proxyWindow = null;
    this.app = application;
    this.injectKeyMap = /* @__PURE__ */ new Map();
    this.windowEventMap = /* @__PURE__ */ new Map();
    this.init();
  }
  init() {
    this.proxyWindow = createWindowProxy(this.injectKeyMap, this.proxyDocument);
    this.proxyWindow.addEventListener = wrapEventListener(this.windowEventMap, originalWindowAddEventListener, window);
    this.proxyWindow.removeEventListener = wrapRemoveEventListener(this.windowEventMap, originalWindowRemoveEventListener, window);
    this.proxyWindow.setInterval = wrapSetInterval(this.app);
    this.proxyWindow.setTimeout = wrapSetTimeout(this.app);
  }
  recover() {
    this.windowEventMap.forEach((handleList, eventName) => {
      handleList.forEach(({ listener, options }) => {
        window.addEventListener(eventName, listener, options);
      });
    });
    addStyles(this.app.styles, this.app.pageEntry, this.app.name);
  }
  unmount() {
    clearWrapEventListener(this.windowEventMap, originalWindowRemoveEventListener, window);
    removeStyles(this.app.name);
  }
}
function createWindowProxy(injectKeyMap, proxyDocument) {
  return new Proxy({}, {
    get(target, key) {
      if (Reflect.has(target, key)) {
        return Reflect.get(target, key);
      }
      const result = window[key];
      if (isFunction(result) && needToBindOriginalWindow(result, window)) {
        return result.bind(window);
      } else {
        return result;
      }
    },
    set(target, key, value) {
      injectKeyMap.set(key, value);
      return Reflect.set(target, key, value);
    }
  });
}
function isFunction(variable) {
  return typeof variable === "function";
}
function needToBindOriginalWindow(variable, scope) {
  return scope.hasOwnProperty(variable.name);
}
const appsMapping = {};
window.xmAirplaneGetCurrentApp = () => {
  return currentApp;
};
let currentApp = null;
function getCurrentApp() {
  return currentApp;
}
async function loadApps() {
  const toUnMountApp = getAppsWithStatus(AppStatus.MOUNTED);
  let tmpApp;
  toUnMountApp.forEach((app2) => {
    if (app2.activeRule(window.location)) {
      tmpApp = app2;
    }
  });
  if (currentApp && tmpApp && tmpApp.name == currentApp.name) {
    return false;
  }
  await Promise.all(toUnMountApp.map(unMountApp));
  const toLoadApp = getAppsWithStatus(AppStatus.BEFORE_BOOTSTRAP);
  await Promise.all(toLoadApp.map(bootstrapApp));
  const toMountApp = [
    ...getAppsWithStatus(AppStatus.BOOTSTRAPPED),
    ...getAppsWithStatus(AppStatus.UNMOUNTED)
  ];
  await Promise.all(toMountApp.map(mountApp));
}
function registerApplication(application) {
  let sandbox = new Sandbox(application);
  appsMapping[application.name] = {
    application,
    status: AppStatus.BEFORE_BOOTSTRAP,
    doc: null,
    sandbox
  };
}
function getAppsWithStatus(appStatus) {
  let res = [];
  let keys = Object.keys(appsMapping);
  keys.forEach((key) => {
    if (appsMapping[key].status == appStatus) {
      res.push(appsMapping[key].application);
    }
  });
  return res;
}
function start() {
  overwriteDocumentEvent();
  overwriteEventsAndHistory();
  loadApps();
}
function bootstrapApp(app2) {
  return new Promise((resolve2, reject) => {
    if (appsMapping[app2.name].application.activeRule(window.location)) {
      currentApp = app2;
      parseHTML(app2).then((doc2) => {
        let proxyWindow = appsMapping[app2.name].sandbox.proxyWindow;
        appsMapping[app2.name].doc = doc2;
        appsMapping[app2.name].status = AppStatus.BOOTSTRAPPED;
        loadSources(appsMapping[app2.name].doc, app2, proxyWindow).then(() => {
          clearDocumentEvent(app2.name);
          resolve2();
        });
      });
    } else {
      resolve2();
    }
  });
}
function mountApp(app2) {
  return new Promise((resolve2, reject) => {
    if (appsMapping[app2.name].application.activeRule(window.location)) {
      let proxyWindow = appsMapping[app2.name].sandbox.proxyWindow;
      appsMapping[app2.name].status = AppStatus.MOUNTED;
      appsMapping[app2.name].sandbox.recover();
      setTimeout(() => {
        proxyWindow["xm-airplane-" + app2.name].mount();
        recoverDocumentEvent(app2.name);
      }, 100);
      currentApp = app2;
    }
    resolve2();
  });
}
function unMountApp(app2) {
  return new Promise((resolve2, reject) => {
    let proxyWindow = appsMapping[app2.name].sandbox.proxyWindow;
    proxyWindow["xm-airplane-" + app2.name].unmount();
    appsMapping[app2.name].sandbox.unmount();
    clearDocumentEvent(app2.name);
    appsMapping[app2.name].status = AppStatus.UNMOUNTED;
    resolve2();
  });
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$1 = defineComponent({
  name: "",
  setup(props, context) {
    const menuRef = ref(null);
    const menuData = ref([
      { name: "首页", route: "", value: "" },
      { name: "应用一", route: "app1", value: "app1", children: [
        { name: "用户管理", route: "app1/user", value: "app1/user", appName: "app1" },
        { name: "角色管理", route: "app1/role", value: "app1/role", appName: "app1" }
      ] },
      {
        name: "应用二",
        route: "app2",
        value: "app2",
        children: [
          { name: "用户管理", route: "app2/user", value: "app2/user", appName: "app2" },
          { name: "角色管理", route: "app2/role", value: "app2/role", appName: "app2" }
        ]
      }
    ]);
    const handleNodeClick = (node) => {
      let currentApp2 = getCurrentApp();
      if (currentApp2 && currentApp2.name == node.appName)
        ;
      else {
        if (currentApp2) {
          unMountApp(currentApp2);
        }
      }
      window.location.href = "/#/" + node.route;
    };
    onMounted(() => {
      let hash = window.location.hash.slice(2);
      menuRef.value.activeNode(hash);
    });
    return { menuData, handleNodeClick, menuRef };
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_xmv_menu = resolveComponent("xmv-menu");
  return openBlock(), createBlock(_component_xmv_menu, {
    data: _ctx.menuData,
    onNodeClick: _ctx.handleNodeClick,
    ref: "menuRef"
  }, null, 8, ["data", "onNodeClick"]);
}
const LeftMenu = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = defineComponent({
  name: "",
  components: { LeftMenu },
  setup(props, context) {
    onMounted(() => {
      registerApplication({
        name: "app1",
        pageEntry: "http://localhost:4000",
        activeRule: (location) => location.hash.indexOf("#/app1") >= 0,
        container: "xm-airplane-container"
      });
      registerApplication({
        name: "app2",
        pageEntry: "http://localhost:5000",
        activeRule: (location) => location.hash.indexOf("#/app2") >= 0,
        container: "xm-airplane-container"
      });
      start();
    });
    return {};
  }
});
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "airplane-center" }, "这是一个微前端框架哦", -1);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { id: "xm-airplane-container" }, null, -1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_left_menu = resolveComponent("left-menu");
  const _component_xmv_layout = resolveComponent("xmv-layout");
  return openBlock(), createBlock(_component_xmv_layout, {
    headHval: "100px",
    lWval: "200px"
  }, {
    top: withCtx(() => [
      _hoisted_1
    ]),
    left: withCtx(() => [
      createVNode(_component_left_menu)
    ]),
    right: withCtx(() => [
      _hoisted_2
    ]),
    _: 1
  });
}
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const app = createApp(App);
app.use(e0);
app.mount("#xm-airplane");
export {
  __vite_legacy_guard
};
