import{u as h,j as t,K as f,M as g}from"./main-DKkfExXF.js";import{B as l}from"./button-BTmt6wGY.js";import{u}from"./useAppSelector-BB6KD_6y.js";import{C as j}from"./chevron-right-CFCVJHMf.js";import{c as d}from"./createLucideIcon-DLdpCBe9.js";/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],y=d("file-text",N);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}]],k=d("folder",U);function v({node:e,level:a=0}){const i=h(),r=a*8,{selectedNode:p,expandedNodes:m}=u(s=>s.treeView),n=m.includes(e.UUID),o=p?.UUID===e.UUID,c=s=>{i(f(s))},x=s=>{i(g(s))};return e.isFolder?t.jsxs("div",{children:[t.jsxs(l,{variant:"ghost",onClick:()=>{x(e.UUID),c(e)},className:`w-full flex items-center justify-start gap-1 ${o?"bg-accent":""}`,style:{paddingLeft:`${r}px`},children:[t.jsx(j,{className:`h-4 w-4 transform transition-transform duration-300 ${n?"rotate-90":""}`}),t.jsx(k,{size:16}),t.jsx("span",{className:"text-sm",children:e.title})]}),n&&e.apiTests?.map(s=>t.jsx(v,{node:s,level:a+1},s.UUID))]}):t.jsxs("div",{className:"flex items-center gap-1",style:{paddingLeft:`${r+8}px`},children:[t.jsx(y,{size:16}),t.jsx(l,{variant:"ghost",onClick:()=>c(e),className:`w-full flex items-center justify-start gap-1 ${o?"bg-accent":""}`,children:e.title})]})}export{v as default};
