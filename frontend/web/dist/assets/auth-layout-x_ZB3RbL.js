import{a as h,ae as x,j as e,w as n}from"./main-Bs3Kwuia.js";import{B as u}from"./button-D8qt724e.js";import{c as s}from"./createLucideIcon-Bq6apdP2.js";/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],p=s("monitor",y);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],k=s("moon",g);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],v=s("sun",f),b=()=>{const t=h.useContext(x);if(t===void 0)throw new Error("useTheme must be used within a ThemeProvider");return t},j=({className:t="",...a})=>{const{theme:c,setTheme:i}=b(),l=[{value:"light",icon:v,label:"Light"},{value:"dark",icon:k,label:"Dark"},{value:"system",icon:p,label:"System"}];return e.jsx("div",{className:n("inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800",t),...a,children:l.map(({value:o,icon:d,label:m})=>{const r=c===o;return e.jsxs(u,{onClick:()=>i(o),variant:r?"default":"ghost",className:n("flex items-center rounded-md transition-colors",r?"bg-primary text-primary-foreground shadow":"text-muted-foreground hover:bg-accent hover:text-foreground"),children:[e.jsx(d,{className:"-m-1 h-4 w-4"}),e.jsx("span",{className:"ml-1.5 text-sm",children:m})]},o)})})},T=({children:t})=>e.jsxs("main",{className:"bg-background dark:bg-background h-screen flex flex-col overflow-x-hidden",children:[e.jsx("div",{className:"absolute top-4 right-4",children:e.jsx(j,{})}),e.jsx("div",{className:"flex-1 flex flex-col justify-center items-center",children:t}),e.jsxs("footer",{className:"py-6 text-sm text-muted-foreground text-center",children:["© ",new Date().getFullYear()," Your Company. All rights reserved."]})]});export{T as default};
