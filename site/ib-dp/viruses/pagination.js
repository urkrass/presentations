import {escapeHtml as E,mathMarkup} from '../rate-expressions/format.js';
import {figureSvg} from './figures.js';
// Preserve every character. Prefer word boundaries; fall back to a character boundary.
export function splitToFit(text,fits){
 if(!text)return [''];const result=[];let rest=text;
 while(rest){if(fits(rest)){result.push(rest);break;}let lo=1,hi=rest.length;
 while(lo<hi){const m=Math.ceil((lo+hi)/2);if(fits(rest.slice(0,m)))lo=m;else hi=m-1;}
 let n=lo;const boundary=Math.max(rest.lastIndexOf(' ',n-1),rest.lastIndexOf('\n',n-1));if(boundary>n*.65)n=boundary+1;
 // Never split a surrogate pair.
 if(n>1&&/[\uD800-\uDBFF]/.test(rest[n-1]))n--;
 result.push(rest.slice(0,n));rest=rest.slice(n);
 }return result;
}
export function blockHtml(b){
 if(b.type==='p')return `<div class="reading-block"><p>${E(b.text)}</p></div>`;
 if(b.type==='math')return `<div class="reading-block math-block">${mathMarkup(b.tex)}</div>`;
 if(b.type==='figure')return `<div class="reading-block"><figure class="science-figure">${figureSvg(b.name)}<figcaption>${E(b.caption)}</figcaption></figure></div>`;
 if(b.type==='table')return `<div class="reading-block"><table class="data-table"><thead><tr>${b.head.map(t=>`<th scope="col">${E(t)}</th>`).join('')}</tr></thead><tbody>${b.rows.map(row=>`<tr>${row.map(t=>`<td>${E(t)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
 return '';
}
export class Reader{
 constructor(body,prev,next,count){Object.assign(this,{body,prev,next,count,index:0,parts:[],blocks:[]});prev.onclick=()=>this.show(this.index-1);next.onclick=()=>this.show(this.index+1);}
 set(blocks){this.blocks=blocks;this.index=0;this.layout();}
 layout(){const height=this.body.clientHeight,width=this.body.clientWidth;if(height<30||width<30)return;
 this.body.style.setProperty('--figure-h',Math.max(50,height-78)+'px');
 const probe=this.body.cloneNode(false);probe.removeAttribute('id');Object.assign(probe.style,{position:'fixed',left:'-10000px',top:'0',width:width+'px',height:height+'px',visibility:'hidden',flex:'none',font:getComputedStyle(this.body).font,lineHeight:String(parseFloat(getComputedStyle(this.body).lineHeight)/parseFloat(getComputedStyle(this.body).fontSize)),overflow:'hidden'});this.body.parentNode.append(probe);
 const fits=html=>{probe.innerHTML=html;return probe.scrollHeight<=height+1&&probe.scrollWidth<=width+1;};
 const parts=[];let current='',queue=this.blocks.map(b=>({...b}));let guard=0;
 while(queue.length&&guard++<400){const b=queue.shift(),html=blockHtml(b);if(fits(current+html)){current+=html;continue;}if(current){parts.push(current);current='';queue.unshift(b);continue;}
 if(b.type==='p'){const pieces=splitToFit(b.text,t=>fits(blockHtml({...b,text:t})));parts.push(blockHtml({...b,text:pieces.shift()}));queue.unshift(...pieces.map(text=>({...b,text})));}
 else if(b.type==='table'&&b.rows.length>1){queue.unshift(...b.rows.map(row=>({...b,rows:[row]})));}
 else {parts.push(html);}
 }
 if(current)parts.push(current);this.parts=parts.length?parts:[''];probe.remove();this.show(Math.min(this.index,this.parts.length-1));}
 show(i){this.index=Math.max(0,Math.min(i,this.parts.length-1));this.body.innerHTML=this.parts[this.index]||'';this.prev.disabled=this.index===0;this.next.disabled=this.index===this.parts.length-1;this.count.textContent=`Reading ${this.index+1} / ${this.parts.length}`;this.prev.parentNode.classList.toggle('single',this.parts.length===1);this.onChange?.();}
}
