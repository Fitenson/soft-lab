import{j as o}from"./main-D4bI6BKa.js";import{B as m}from"./button-BKnOxFCw.js";import{c}from"./createLucideIcon-C98CFg3S.js";/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]],p=c("arrow-down",u);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],f=c("arrow-up",w),b=({accessorKey:r,header:e,size:d,minSize:i,maxSize:l,enableSorting:g=!0,cell:n})=>{const s={accessorKey:r,filterFn:"includesString",enableResizing:!0,enableSorting:g,meta:{label:e},size:d,minSize:i,maxSize:l,header:e===null?()=>null:({column:t})=>{const a=t.getIsSorted();return o.jsxs(m,{className:"w-full text-left rounded-none justify-between",variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),children:[e??String(r),a==="asc"&&o.jsx(f,{className:"h-4 w-4 bg-secondary dark:bg-secondary"}),a==="desc"&&o.jsx(p,{className:"h-4 w-4 bg-secondary dark:bg-secondary"})]})}};return n&&(s.cell=n),s};export{b as c};
