function x(){}const v=t=>t;function k(t,n){for(const e in n)t[e]=n[e];return t}function A(t){return!!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function w(t){return t()}function D(){return Object.create(null)}function j(t){t.forEach(w)}function F(t){return typeof t=="function"}function P(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function S(t){return Object.keys(t).length===0}function E(t,...n){if(t==null){for(const o of n)o(void 0);return x}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function U(t,n,e){t.$$.on_destroy.push(E(n,e))}function B(t,n,e,o){if(t){const r=y(t,n,e,o);return t[0](r)}}function y(t,n,e,o){return t[1]&&o?k(e.ctx.slice(),t[1](o(n))):e.ctx}function C(t,n,e,o){if(t[2]&&o){const r=t[2](o(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const a=[],l=Math.max(n.dirty.length,r.length);for(let u=0;u<l;u+=1)a[u]=n.dirty[u]|r[u];return a}return n.dirty|r}return n.dirty}function G(t,n,e,o,r,a){if(r){const l=y(n,e,o,a);t.p(l,r)}}function H(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let o=0;o<e;o++)n[o]=-1;return n}return-1}let f;function d(t){f=t}function p(){if(!f)throw new Error("Function called outside component initialization");return f}function I(t){p().$$.on_mount.push(t)}function J(t){p().$$.after_update.push(t)}function K(t){p().$$.on_destroy.push(t)}const i=[],b=[];let s=[];const g=[],m=Promise.resolve();let h=!1;function O(){h||(h=!0,m.then(z))}function L(){return O(),m}function q(t){s.push(t)}const _=new Set;let c=0;function z(){if(c!==0)return;const t=f;do{try{for(;c<i.length;){const n=i[c];c++,d(n),M(n.$$)}}catch(n){throw i.length=0,c=0,n}for(d(null),i.length=0,c=0;b.length;)b.pop()();for(let n=0;n<s.length;n+=1){const e=s[n];_.has(e)||(_.add(e),e())}s.length=0}while(i.length);for(;g.length;)g.pop()();h=!1,_.clear(),d(t)}function M(t){if(t.fragment!==null){t.update(),j(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(q)}}function N(t){const n=[],e=[];s.forEach(o=>t.indexOf(o)===-1?n.push(o):e.push(o)),e.forEach(o=>o()),s=n}export{O as A,J as a,b,B as c,C as d,U as e,p as f,H as g,d as h,A as i,z as j,q as k,K as l,F as m,x as n,I as o,v as p,D as q,j as r,P as s,L as t,G as u,S as v,N as w,f as x,w as y,i as z};
