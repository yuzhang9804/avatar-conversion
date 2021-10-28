var k=Object.defineProperty;var N=Object.getOwnPropertySymbols;var L=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var R=(o,r,c)=>r in o?k(o,r,{enumerable:!0,configurable:!0,writable:!0,value:c}):o[r]=c,y=(o,r)=>{for(var c in r||(r={}))L.call(r,c)&&R(o,c,r[c]);if(N)for(var c of N(r))j.call(r,c)&&R(o,c,r[c]);return o};import{r as i,f as w,j as v,a as l,S as E,D,R as O}from"./vendor.dca84595.js";const M=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const f of s.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&u(f)}).observe(document,{childList:!0,subtree:!0});function c(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function u(e){if(e.ep)return;e.ep=!0;const s=c(e);fetch(e.href,s)}};M();const B=o=>new Promise((r,c)=>{if(o==null?void 0:o.files){const u=o.files[0],e=new FileReader;e.addEventListener("load",function(){e.result&&r(e.result)}),e.readAsDataURL(u)}else c(Error())}),b={width:200,height:200},P=()=>{const o=i.exports.useRef(null),[r,c]=i.exports.useState(null),u=i.exports.useRef(null),e=i.exports.useRef(null),[s,f]=i.exports.useState(null),[m,g]=i.exports.useState(1),[F,x]=i.exports.useState(1);i.exports.useEffect(()=>{!u.current||(e.current=new w.fabric.Canvas(u.current,y({},b)))},[u]),i.exports.useEffect(()=>{if(!r)return;const t=document.createElement("img");t.src=r,t.addEventListener("load",()=>{var h;const n=new w.fabric.Image(t);(h=e.current)==null||h.add(n),f(n),n.on("selected",({target:p})=>{f(p),g((p==null?void 0:p.scaleX)||1)})})},[r]),i.exports.useEffect(()=>{g(1),x(1)},[s]);const a=i.exports.useMemo(()=>{const{width:t=0,height:n=0}=y({},s);return{x:-((t*m-b.width)/2),y:-((n*m-b.height)/2),right:t*m-b.width,bottom:n*m-b.height}},[s,m]),d=t=>{var n;s==null||s.set(t),(n=e.current)==null||n.requestRenderAll()},A=t=>{var n;s==null||s.scale(t),g(t),(n=e.current)==null||n.requestRenderAll()},S=t=>{var n;s==null||s.set({opacity:t}),x(t),(n=e.current)==null||n.requestRenderAll()};return v("div",{className:"w-screen h-screen py-30 flex flex-col justify-around",children:[l("input",{type:"file",ref:o,className:"hidden",accept:"image/png, image/jpeg",onChange:async()=>{c(await B(o.current)),o.current&&(o.current.value="")}}),v("div",{className:"upload-preview",children:[l("canvas",{ref:u}),l("div",{className:"btn absolute -left-20 -top-20",onClick:()=>{d({left:0,top:0})},children:"L-T"}),l("div",{className:"btn absolute x-center -top-20",onClick:()=>{d({left:a.x,top:0})},children:"M-T"}),l("div",{className:"btn absolute -right-20 -top-20",onClick:()=>{d({left:-a.right,top:0})},children:"R-T"}),l("div",{className:"btn absolute -right-20 y-center",onClick:()=>{d({left:-a.right,top:a.y})},children:"R-M"}),l("div",{className:"btn absolute -right-20 -bottom-20",onClick:()=>{d({left:-a.right,top:-a.bottom})},children:"R-B"}),l("div",{className:"btn absolute x-center -bottom-20",onClick:()=>{d({left:a.x,top:-a.bottom})},children:"M-B"}),l("div",{className:"btn absolute -left-20 -bottom-20",onClick:()=>{d({left:0,top:-a.bottom})},children:"L-B"}),l("div",{className:"btn absolute -left-20 y-center",onClick:()=>{d({left:0,top:a.y})},children:"L-M"})]}),v("div",{className:"mt-20",children:[l("span",{className:"ml-12px",children:"\u5C3A\u5BF8\uFF1A"}),l(E,{min:.01,max:2,defaultValue:1,value:m,step:.01,onChange:t=>{A(t)}}),l("span",{className:"ml-12px",children:"\u900F\u660E\u5EA6\uFF1A"}),l(E,{min:0,max:1,defaultValue:1,step:.1,value:F,onChange:t=>{S(t)}})]}),v("div",{className:"flex justify-around items-center",children:[l("div",{className:"btn",onClick:()=>{var t;(t=o.current)==null||t.click()},children:"\u4E0A\u4F20\u56FE\u7247"}),l("div",{className:"btn",onClick:()=>{var C;const t=window.devicePixelRatio||1,n=(C=e.current)==null?void 0:C.getElement(),h=n==null?void 0:n.getContext("2d");h==null||h.scale(t,t);const p=n==null?void 0:n.toDataURL("image/jpeg",1);D.alert({image:p,title:"\u957F\u6309\u4E0B\u8F7D\u56FE\u7247"})},children:"\u751F\u6210"}),l("div",{className:"btn",onClick:()=>{var t,n;(n=e.current)==null||n.remove(...(t=e.current)==null?void 0:t.getObjects()),x(1),g(1)},children:"\u91CD\u7F6E"})]})]})};O.render(l(P,{}),document.getElementById("root"));
