import{j as r}from"./main-Cw-LF5Po.js";import{B as m}from"./button-BNQ0grnT.js";import{c}from"./createLucideIcon-aoolMLwC.js";/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]],f=c("arrow-down",p);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],h=c("arrow-up",w),j=({accessorKey:n,header:e,size:d,minSize:i,maxSize:l,enableSorting:g=!0,cell:o,isHidden:u=!1})=>{const s={accessorKey:n,filterFn:"includesString",enableResizing:!0,enableSorting:g,meta:{label:e,hidden:u},size:d,minSize:i,maxSize:l,enableHiding:!0,header:e===null?()=>null:({column:t})=>{const a=t.getIsSorted();return r.jsxs(m,{className:"w-full text-left rounded-none justify-between",variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),children:[e??String(n),a==="asc"&&r.jsx(h,{className:"h-4 w-4 bg-secondary dark:bg-secondary"}),a==="desc"&&r.jsx(f,{className:"h-4 w-4 bg-secondary dark:bg-secondary"})]})}};return o&&(s.cell=o),s};export{j as c};
