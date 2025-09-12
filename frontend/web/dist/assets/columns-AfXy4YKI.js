import{j as s}from"./main-CiaD3bPN.js";import{B as d}from"./button-BkxlbPtJ.js";import{c}from"./createLucideIcon-BYgSfF_7.js";import{U as e}from"./UserFormField-DELgqSHg.js";import"./utils-_LUnSz7l.js";/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]],m=c("arrow-down",l);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],g=c("arrow-up",i),a=({accessorKey:o,header:n})=>({accessorKey:o,filterFn:"includesString",enableResizing:!0,meta:{label:n},header:({column:r})=>{const t=r.getIsSorted();return s.jsxs(d,{className:"w-full text-left rounded-none justify-between",variant:"ghost",onClick:()=>r.toggleSorting(r.getIsSorted()==="asc"),children:[n??String(o),t==="asc"&&s.jsx(g,{className:"h-4 w-4 bg-secondary dark:bg-secondary"}),t==="desc"&&s.jsx(m,{className:"h-4 w-4 bg-secondary dark:bg-secondary"})]})}}),f=[a({accessorKey:e.fullName.name,header:e.fullName.label}),a({accessorKey:e.username.name,header:e.username.label}),a({accessorKey:e.email.name,header:e.email.label}),a({accessorKey:e.description.name,header:e.description.label}),a({accessorKey:e.address.name,header:e.address.label}),a({accessorKey:e.gender.name,header:e.gender.label})];export{f as columns};
