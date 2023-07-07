var J=Object.defineProperty;var K=(t,e,n)=>e in t?J(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var R=(t,e,n)=>(K(t,typeof e!="symbol"?e+"":e,n),n);import{n as w,r as v,m as M,k as B,p as Q,q as H,j as U,v as X,w as Y,x as Z,h as L,y as tt,z as et,A as nt}from"./scheduler.037f7bd6.js";const q=typeof window<"u";let it=q?()=>window.performance.now():()=>Date.now(),P=q?t=>requestAnimationFrame(t):w;const g=new Set;function k(t){g.forEach(e=>{e.c(t)||(g.delete(e),e.f())}),g.size!==0&&P(k)}function rt(t){let e;return g.size===0&&P(k),{promise:new Promise(n=>{g.add(e={c:t,f:n})}),abort(){g.delete(e)}}}let C=!1;function st(){C=!0}function lt(){C=!1}function at(t,e,n,i){for(;t<e;){const a=t+(e-t>>1);n(a)<=i?t=a+1:e=a}return t}function ot(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const r=[];for(let o=0;o<e.length;o++){const _=e[o];_.claim_order!==void 0&&r.push(_)}e=r}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let a=0;for(let r=0;r<e.length;r++){const o=e[r].claim_order,_=(a>0&&e[n[a]].claim_order<=o?a+1:at(1,a,h=>e[n[h]].claim_order,o))-1;i[r]=n[_]+1;const c=_+1;n[c]=r,a=Math.max(c,a)}const u=[],l=[];let s=e.length-1;for(let r=n[a]+1;r!=0;r=i[r-1]){for(u.push(e[r-1]);s>=r;s--)l.push(e[s]);s--}for(;s>=0;s--)l.push(e[s]);u.reverse(),l.sort((r,o)=>r.claim_order-o.claim_order);for(let r=0,o=0;r<l.length;r++){for(;o<u.length&&l[r].claim_order>=u[o].claim_order;)o++;const _=o<u.length?u[o]:null;t.insertBefore(l[r],_)}}function ut(t,e){t.appendChild(e)}function I(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function ct(t){const e=V("style");return e.textContent="/* empty */",ft(I(t),e),e.sheet}function ft(t,e){return ut(t.head||t,e),e.sheet}function _t(t,e){if(C){for(ot(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Rt(t,e,n){C&&!n?_t(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function F(t){t.parentNode&&t.parentNode.removeChild(t)}function Tt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function V(t){return document.createElement(t)}function z(t){return document.createTextNode(t)}function Bt(){return z(" ")}function Mt(){return z("")}function Pt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function zt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Ht(t){return t.dataset.svelteH}function dt(t){return Array.from(t.childNodes)}function ht(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function W(t,e,n,i,a=!1){ht(t);const u=(()=>{for(let l=t.claim_info.last_index;l<t.length;l++){const s=t[l];if(e(s)){const r=n(s);return r===void 0?t.splice(l,1):t[l]=r,a||(t.claim_info.last_index=l),s}}for(let l=t.claim_info.last_index-1;l>=0;l--){const s=t[l];if(e(s)){const r=n(s);return r===void 0?t.splice(l,1):t[l]=r,a?r===void 0&&t.claim_info.last_index--:t.claim_info.last_index=l,s}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function mt(t,e,n,i){return W(t,a=>a.nodeName===e,a=>{const u=[];for(let l=0;l<a.attributes.length;l++){const s=a.attributes[l];n[s.name]||u.push(s.name)}u.forEach(l=>a.removeAttribute(l))},()=>i(e))}function Lt(t,e,n){return mt(t,e,n,V)}function pt(t,e){return W(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>z(e),!0)}function Ot(t){return pt(t," ")}function qt(t,e){e=""+e,t.data!==e&&(t.data=e)}function kt(t,e){t.value=e??""}function It(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function $t(t,e,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:i})}function Ft(t,e){const n=[];let i=0;for(const a of e.childNodes)if(a.nodeType===8){const u=a.textContent.trim();u===`HEAD_${t}_END`?(i-=1,n.push(a)):u===`HEAD_${t}_START`&&(i+=1,n.push(a))}else i>0&&n.push(a);return n}function Vt(t,e){return new t(e)}const A=new Map;let E=0;function yt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function gt(t,e){const n={stylesheet:ct(e),rules:{}};return A.set(t,n),n}function O(t,e,n,i,a,u,l,s=0){const r=16.666/i;let o=`{
`;for(let d=0;d<=1;d+=r){const y=e+(n-e)*u(d);o+=d*100+`%{${l(y,1-y)}}
`}const _=o+`100% {${l(n,1-n)}}
}`,c=`__svelte_${yt(_)}_${s}`,h=I(t),{stylesheet:$,rules:f}=A.get(h)||gt(h,t);f[c]||(f[c]=!0,$.insertRule(`@keyframes ${c} ${_}`,$.cssRules.length));const m=t.style.animation||"";return t.style.animation=`${m?`${m}, `:""}${c} ${i}ms linear ${a}ms 1 both`,E+=1,c}function xt(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?u=>u.indexOf(e)<0:u=>u.indexOf("__svelte")===-1),a=n.length-i.length;a&&(t.style.animation=i.join(", "),E-=a,E||wt())}function wt(){P(()=>{E||(A.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&F(e)}),A.clear())})}let x;function vt(){return x||(x=Promise.resolve(),x.then(()=>{x=null})),x}function T(t,e,n){t.dispatchEvent($t(`${e?"intro":"outro"}${n}`))}const N=new Set;let p;function Wt(){p={r:0,c:[],p}}function Gt(){p.r||v(p.c),p=p.p}function bt(t,e){t&&t.i&&(N.delete(t),t.i(e))}function Jt(t,e,n,i){if(t&&t.o){if(N.has(t))return;N.add(t),p.c.push(()=>{N.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Nt={duration:0};function Kt(t,e,n,i){let u=e(t,n,{direction:"both"}),l=i?0:1,s=null,r=null,o=null,_;function c(){o&&xt(t,o)}function h(f,m){const d=f.b-l;return m*=Math.abs(d),{a:l,b:f.b,d,duration:m,start:f.start,end:f.start+m,group:f.group}}function $(f){const{delay:m=0,duration:d=300,easing:y=Q,tick:S=w,css:D}=u||Nt,j={start:it()+m,b:f};f||(j.group=p,p.r+=1),"inert"in t&&(f?_!==void 0&&(t.inert=_):(_=t.inert,t.inert=!0)),s||r?r=j:(D&&(c(),o=O(t,l,f,d,m,y,D)),f&&S(0,1),s=h(j,d),B(()=>T(t,f,"start")),rt(b=>{if(r&&b>r.start&&(s=h(r,d),r=null,T(t,s.b,"start"),D&&(c(),o=O(t,l,s.b,s.duration,0,y,u.css))),s){if(b>=s.end)S(l=s.b,1-l),T(t,s.b,"end"),r||(s.b?c():--s.group.r||v(s.group.c)),s=null;else if(b>=s.start){const G=b-s.start;l=s.a+s.d*y(G/s.duration),S(l,1-l)}}return!!(s||r)}))}return{run(f){M(u)?vt().then(()=>{u=u({direction:f?"in":"out"}),$(f)}):$(f)},end(){c(),s=r=null}}}function Qt(t){t&&t.c()}function Ut(t,e){t&&t.l(e)}function At(t,e,n){const{fragment:i,after_update:a}=t.$$;i&&i.m(e,n),B(()=>{const u=t.$$.on_mount.map(tt).filter(M);t.$$.on_destroy?t.$$.on_destroy.push(...u):v(u),t.$$.on_mount=[]}),a.forEach(B)}function Et(t,e){const n=t.$$;n.fragment!==null&&(Y(n.after_update),v(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Ct(t,e){t.$$.dirty[0]===-1&&(et.push(t),nt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Xt(t,e,n,i,a,u,l,s=[-1]){const r=Z;L(t);const o=t.$$={fragment:null,ctx:[],props:u,update:w,not_equal:a,bound:H(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(r?r.$$.context:[])),callbacks:H(),dirty:s,skip_bound:!1,root:e.target||r.$$.root};l&&l(o.root);let _=!1;if(o.ctx=n?n(t,e.props||{},(c,h,...$)=>{const f=$.length?$[0]:h;return o.ctx&&a(o.ctx[c],o.ctx[c]=f)&&(!o.skip_bound&&o.bound[c]&&o.bound[c](f),_&&Ct(t,c)),h}):[],o.update(),_=!0,v(o.before_update),o.fragment=i?i(o.ctx):!1,e.target){if(e.hydrate){st();const c=dt(e.target);o.fragment&&o.fragment.l(c),c.forEach(F)}else o.fragment&&o.fragment.c();e.intro&&bt(t.$$.fragment),At(t,e.target,e.anchor),lt(),U()}L(r)}class Yt{constructor(){R(this,"$$");R(this,"$$set")}$destroy(){Et(this,1),this.$destroy=w}$on(e,n){if(!M(n))return w;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const a=i.indexOf(n);a!==-1&&i.splice(a,1)}}$set(e){this.$$set&&!X(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const St="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(St);export{Pt as A,Kt as B,Ft as C,kt as D,Yt as S,Rt as a,Gt as b,Ot as c,bt as d,Mt as e,F as f,V as g,Lt as h,Xt as i,dt as j,zt as k,It as l,z as m,pt as n,qt as o,Wt as p,Vt as q,Qt as r,Bt as s,Jt as t,Ut as u,At as v,Et as w,Ht as x,_t as y,Tt as z};
