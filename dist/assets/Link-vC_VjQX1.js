import{a as c,j as m}from"./index-CJfdKZfe.js";const u=({to:a,className:i,style:o,children:d,aria_current:e="page",onClick:t})=>{const n=c(),r=()=>{const s=document.getElementById("bars");s&&(s.classList.add("show"),setTimeout(()=>{n(a)},50),setTimeout(()=>{s.classList.remove("show"),s.classList.add("hide")},400),setTimeout(()=>s.classList.remove("hide"),1600))};return m.jsx("a",{style:o,className:i,onClick:s=>{r(),t&&t(s)},href:"#",aria_current:e!=="page"?e:"page",children:d})};export{u as default};
