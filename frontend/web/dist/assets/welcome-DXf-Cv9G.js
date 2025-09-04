import{r as n,T as k,j as o,a as b}from"./main-B9BR8vEG.js";import{c as h,B as u,m}from"./button-D3WXcbo7.js";/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),w=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,r,a)=>a?a.toUpperCase():r.toLowerCase()),p=e=>{const t=w(e);return t.charAt(0).toUpperCase()+t.slice(1)},y=(...e)=>e.filter((t,r,a)=>!!t&&t.trim()!==""&&a.indexOf(t)===r).join(" ").trim(),j=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0};/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var C={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=n.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:r=2,absoluteStrokeWidth:a,className:i="",children:s,iconNode:d,...c},l)=>n.createElement("svg",{ref:l,...C,width:t,height:t,stroke:e,strokeWidth:a?Number(r)*24/Number(t):r,className:y("lucide",i),...!s&&!j(c)&&{"aria-hidden":"true"},...c},[...d.map(([g,f])=>n.createElement(g,f)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=(e,t)=>{const r=n.forwardRef(({className:a,...i},s)=>n.createElement(N,{ref:s,iconNode:t,className:y(`lucide-${v(p(e))}`,`lucide-${e}`,a),...i}));return r.displayName=p(e),r};/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],L=x("monitor",A);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],T=x("moon",M);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],E=x("sun",_),$=()=>{const e=n.useContext(k);if(e===void 0)throw new Error("useTheme must be used within a ThemeProvider");return e},S=({className:e="",...t})=>{const{theme:r,setTheme:a}=$(),i=[{value:"light",icon:E,label:"Light"},{value:"dark",icon:T,label:"Dark"},{value:"system",icon:L,label:"System"}];return o.jsx("div",{className:h("inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800",e),...t,children:i.map(({value:s,icon:d,label:c})=>{const l=r===s;return o.jsxs(u,{onClick:()=>a(s),variant:l?"default":"ghost",className:h("flex items-center rounded-md transition-colors",l?"bg-primary text-primary-foreground shadow":"text-muted-foreground hover:bg-accent hover:text-foreground"),children:[o.jsx(d,{className:"-m-1 h-4 w-4"}),o.jsx("span",{className:"ml-1.5 text-sm",children:c})]},s)})})},W=()=>o.jsxs("main",{className:"bg-background dark:bg-background min-h-screen flex flex-col",children:[o.jsx("div",{className:"absolute top-4 right-4",children:o.jsx(S,{})}),o.jsxs("section",{className:"flex-1 flex flex-col justify-center items-center px-6",children:[o.jsx(m.h1,{className:"text-primary dark:text-primary text-4xl md:text-5xl font-bold mb-4",initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.6},children:"Welcome to Soft Lab"}),o.jsx(m.p,{className:"text-muted-foreground dark:text-muted-foreground text-lg max-w-xl mb-8 text-center",initial:{opacity:0},animate:{opacity:1},transition:{delay:.3,duration:.6},children:"Discover powerful tools to boost your productivity. Sign up to get started, or log in if you already have an account."}),o.jsxs(m.div,{className:"flex gap-4",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.5,duration:.6},children:[o.jsx(u,{size:"lg",className:"rounded-2xl px-6",onClick:()=>b.visit("/login"),children:"Login"}),o.jsx(u,{size:"lg",variant:"outline",className:"rounded-2xl px-6",children:"Sign up"})]})]}),o.jsxs("footer",{className:"py-6 text-sm text-muted-foreground text-center",children:["© ",new Date().getFullYear()," Your Company. All rights reserved."]})]});export{W as default};
