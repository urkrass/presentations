export const escapeHtml=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
export function mathMarkup(value,chem=false){
  if(!value.trim())return '';
  const source=chem?`\\ce{${value}}`:value;
  try{return window.katex.renderToString(source,{output:'mathml',throwOnError:true,trust:false,strict:'ignore',maxExpand:500,maxSize:15});}
  catch{return `<span class="math-error" title="Check the formula syntax">${escapeHtml(value)}</span>`;}
}
export function renderMath(root){root.querySelectorAll('[data-math]').forEach(el=>{el.innerHTML=mathMarkup(el.dataset.math);});}
export function formulaLines(text,chem=false){return text.split('\n').filter(s=>s.trim()).map(line=>`<div class="formula-line">${mathMarkup(line,chem)}</div>`).join('');}
export function downloadFile(blob,filename){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);}
export function fileStem(state){return 'Rate_expressions_'+(state.student.name||'Student').normalize('NFKC').replace(/[^\p{L}\p{N}_-]+/gu,'_').slice(0,70);}
