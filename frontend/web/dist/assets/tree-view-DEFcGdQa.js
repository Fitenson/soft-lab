import{b as n,j as e}from"./main-CXc_HcWH.js";import{B as d}from"./button-DeRc435a.js";import{C as p}from"./chevron-down-zH8gKUjQ.js";import{C as c}from"./chevron-right-ykS3DmLh.js";import{c as r}from"./createLucideIcon-BjwVCH2P.js";/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],x=r("file-text",h);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}]],m=r("folder",l);function f({node:t,level:o=0}){const[a,i]=n.useState(!1);return t.isFolder?e.jsxs("div",{children:[e.jsxs(d,{variant:"ghost",onClick:()=>i(s=>!s),children:[a?e.jsx(p,{size:16}):e.jsx(c,{size:16}),e.jsx(m,{size:16}),e.jsx("span",{children:t.testName})]}),a&&t.apiTests?.map(s=>e.jsx(f,{node:s,level:o+1},s.UUID))]}):e.jsxs("div",{children:[e.jsx(x,{}),e.jsx("span",{children:t.testName})]})}export{f as default};
