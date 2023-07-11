const a = {
  MOUNTED: "mounted",
  BEFORE_BOOTSTRAP: "before_bootstrap",
  BOOTSTRAPPED: "bootstrapped",
  UNMOUNTED: "unmounted"
}, u = window.history.pushState, r = window.history.replaceState;
function c() {
  window.history.pushState = (n, t, e) => {
    const s = u.call(this, n, t, e);
    return i(), s;
  }, window.history.replaceState = (n, t, e) => {
    const s = r.call(this, n, t, e);
    return i(), s;
  }, window.addEventListener("popstate", () => {
    i();
  }, !0), window.addEventListener("hashchange", () => {
    i();
  }, !0);
}
const o = {};
async function i() {
  const n = p(a.MOUNTED);
  await Promise.all(n.map(w));
  const t = p(a.BEFORE_BOOTSTRAP);
  await Promise.all(t.map(l));
  const e = [
    ...p(a.BOOTSTRAPPED),
    ...p(a.UNMOUNTED)
  ];
  await Promise.all(e.map(O));
}
function d(n) {
  o[n.name] = {
    application: n,
    status: a.BEFORE_BOOTSTRAP
  };
}
function p(n) {
  let t = [];
  return Object.keys(o).forEach((s) => {
    o[s].status == n && t.push(o[s].application.loadApp());
  }), t;
}
function E() {
  c(), i();
}
function l(n) {
  n.then((t) => {
    t.bootstrap(), o[t.name].status = a.BOOTSTRAPPED;
  });
}
function O(n) {
  n.then((t) => {
    o[t.name].application.activeRule(window.location) && (t.mount(), o[t.name].status = a.MOUNTED);
  });
}
function w(n) {
  n.then((t) => {
    o[t.name].application.activeRule(window.location) || (t.unmount(), o[t.name].status = a.UNMOUNTED);
  });
}
export {
  d as registerApplication,
  E as start
};
//# sourceMappingURL=xiaomairplane.mjs.map
