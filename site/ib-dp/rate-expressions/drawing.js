import {escapeHtml as E} from './format.js';
const W=1100,H=650;
export const blankGraphSettings={xLabel:'',yLabel:'',xMax:1,yMax:1};
const n=v=>Number(v.toPrecision(4)).toString();
function tickStep(max){const power=10**Math.floor(Math.log10(max));const ratio=max/power;return power*(ratio<2?0.2:ratio<5?0.5:1);}
function axes(c,id){
  const left=165,right=1065,top=45,bottom=545,width=900,height=500;
  const sx=tickStep(c.xMax),sy=tickStep(c.yMax),dx=sx/c.xMax*width,dy=sy/c.yMax*height;
  let s=`<defs><pattern id="${id}" x="${left}" y="${top}" width="${dx/5}" height="${dy/5}" patternUnits="userSpaceOnUse"><path d="M ${dx/5} 0 L 0 0 0 ${dy/5}" fill="none" stroke="#e2e5e9" stroke-width="0.7"/></pattern></defs><rect x="${left}" y="${top}" width="${width}" height="${height}" fill="url(#${id})"/>`;
  for(let i=0;i<=Math.floor(c.xMax/sx+1e-9);i++){
    const x=left+i*dx;s+=`<path d="M${x} ${top}V${bottom}" fill="none" stroke="#c4c9d0" stroke-width="1"/><text x="${x}" y="573" text-anchor="middle" font-size="16">${n(i*sx)}</text>`;
  }
  for(let i=0;i<=Math.floor(c.yMax/sy+1e-9);i++){
    const y=bottom-i*dy;s+=`<path d="M${left} ${y}H${right}" fill="none" stroke="#c4c9d0" stroke-width="1"/><text x="150" y="${y+6}" text-anchor="end" font-size="16">${n(i*sy)}</text>`;
  }
  return s+`<path d="M${left} ${top}V${bottom}H${right}" stroke="#555d68" stroke-width="2" fill="none"/><text x="615" y="618" text-anchor="middle" font-size="20">${E(c.xLabel||'Add x-axis label and units')}</text><text transform="translate(27 295) rotate(-90)" text-anchor="middle" font-size="20">${E(c.yLabel||'Add y-axis label and units')}</text>`;
}
function mark(s){
  const a=s.points[0],b=s.points.at(-1),color=s.color,width=s.width||3;
  if(s.tool==='label')return `<text x="${a[0]}" y="${a[1]}" font-size="21" fill="${color}">${E(s.text)}</text>`;
  if(s.tool==='point')return `<path d="M${a[0]-5} ${a[1]-5}l10 10m-10 0l10 -10" fill="none" stroke="${color}" stroke-width="${width}"/>`;
  if(s.tool==='line')return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
  if(s.points.length===1)return `<circle cx="${a[0]}" cy="${a[1]}" r="${width/2}" fill="${color}"/>`;
  return `<path d="${s.points.map((p,i)=>(i?'L':'M')+p.join(' ')).join(' ')}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
}
export function drawingSvg(strokes=[],settings=null,id='export-grid'){
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Student ${settings?'graph':'drawing'}" style="font-family:Arial,sans-serif;background:white;color:#15161a"><rect width="1100" height="650" fill="white"/>${settings?axes(settings,id):''}<g class="marks">${strokes.map(mark).join('')}</g></svg>`;
}
export class DrawingPad{
  constructor(host,{strokes=[],settings=null,onChange=()=>{},onSettings=()=>{},name='Drawing',expanded=false}={}){
    this.host=host;this.strokes=structuredClone(strokes);this.history=[structuredClone(strokes)];this.historyIndex=0;this.settings=settings?{...settings}:null;this.onChange=onChange;this.onSettings=onSettings;this.name=name;this.tool='pen';this.color='#15161a';this.current=null;this.id='grid-'+Math.random().toString(36).slice(2);
    host.classList.add('drawing-pad');
    host.innerHTML=`<div class="drawing-tools" role="toolbar" aria-label="${E(name)} tools"><div class="tool-group">${[['pen','Pen'],['line','Line'],['point','Point'],['label','Label'],['erase','Erase']].map(([v,l])=>`<button data-tool="${v}" aria-pressed="${v==='pen'}">${l}</button>`).join('')}</div><div class="tool-group"><label class="sr-only" for="${this.id}-color">Ink colour</label><select id="${this.id}-color" aria-label="Ink colour"><option value="#15161a">Black</option><option value="#c4085e">Magenta</option><option value="#24669b">Blue</option></select><button data-action="undo" aria-label="Undo drawing">↶</button><button data-action="redo" aria-label="Redo drawing">↷</button><button data-action="clear">Clear</button><button data-action="expand">Expand ↗</button></div></div><div class="label-entry" hidden><label>Label text <input maxlength="160" placeholder="Type a label, then click on the drawing"></label></div>${settings?`<details class="axis-settings"><summary>Axis labels & scales</summary><div class="axis-fields"><label>X-axis label<input data-setting="xLabel" maxlength="100" value="${E(settings.xLabel)}" placeholder="Quantity / units"></label><label>X-axis maximum<input type="number" data-setting="xMax" min="0.000000000001" step="any" value="${settings.xMax}"></label><label>Y-axis label<input data-setting="yLabel" maxlength="100" value="${E(settings.yLabel)}" placeholder="Quantity / units"></label><label>Y-axis maximum<input type="number" data-setting="yMax" min="0.000000000001" step="any" value="${settings.yMax}"></label></div></details>`:''}<div class="draw-surface"></div><p class="drawing-help">Draw with a mouse, finger or stylus. Use Line for best-fit lines and gradient triangles; Point to place a cross. Erase removes one object at a time.</p>`;
    this.surface=host.querySelector('.draw-surface');this.refresh();
    host.querySelectorAll('[data-tool]').forEach(b=>b.addEventListener('click',()=>{this.tool=b.dataset.tool;host.querySelectorAll('[data-tool]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));host.querySelector('.label-entry').hidden=this.tool!=='label';if(this.tool==='label')host.querySelector('.label-entry input').focus();}));
    host.querySelector('select').addEventListener('change',e=>this.color=e.target.value);
    host.querySelector('[data-action="undo"]').onclick=()=>{if(this.historyIndex>0){this.strokes=structuredClone(this.history[--this.historyIndex]);this.commit(false);}};
    host.querySelector('[data-action="redo"]').onclick=()=>{if(this.historyIndex<this.history.length-1){this.strokes=structuredClone(this.history[++this.historyIndex]);this.commit(false);}};
    host.querySelector('[data-action="clear"]').onclick=()=>{if(this.strokes.length&&confirm('Clear this drawing? You can use Undo to restore it.')){this.strokes=[];this.commit();}};
    host.querySelector('[data-action="expand"]').onclick=()=>this.toggleExpanded();
    host.querySelectorAll('[data-setting]').forEach(el=>el.addEventListener('change',()=>{
      const key=el.dataset.setting;const value=key.endsWith('Max')?Number(el.value):el.value;
      if(key.endsWith('Max')&&(!Number.isFinite(value)||value<=0||value>1e12)){el.setCustomValidity('Use a positive maximum no larger than 10¹².');el.reportValidity();el.value=this.settings[key];return;}
      el.setCustomValidity('');
      if(key.endsWith('Max')&&this.strokes.length&& !confirm('Changing the scale keeps your existing marks in the same positions on the page. Continue and adjust the marks if needed?')){el.value=this.settings[key];return;}
      this.settings[key]=value;this.onSettings({...this.settings});this.refresh();
    }));
    this.keyHandler=e=>{if(e.key==='Escape'&&host.classList.contains('expanded'))this.toggleExpanded();};document.addEventListener('keydown',this.keyHandler);
    if(expanded)this.toggleExpanded();
  }
  toggleExpanded(){const yes=this.host.classList.toggle('expanded');document.body.classList.toggle('drawing-expanded',yes);this.host.querySelector('[data-action="expand"]').textContent=yes?'Close expanded view ×':'Expand ↗';}
  refresh(){
    this.surface.innerHTML=drawingSvg(this.strokes,this.settings,this.id);this.svg=this.surface.querySelector('svg');this.svg.setAttribute('tabindex','0');this.svg.setAttribute('aria-label',`${this.name}: use the drawing tools, or describe your graph in the answer field`);
    this.svg.style.touchAction='none';
    this.svg.onpointerdown=e=>this.down(e);this.svg.onpointermove=e=>this.move(e);this.svg.onpointerup=e=>this.up(e);this.svg.onpointercancel=()=>{this.current=null;this.refresh();};
    this.updateButtons();
  }
  pos(e){const p=this.svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;const q=p.matrixTransform(this.svg.getScreenCTM().inverse());return [Math.round(Math.max(0,Math.min(W,q.x))*10)/10,Math.round(Math.max(0,Math.min(H,q.y))*10)/10];}
  down(e){if(e.button!==0)return;e.preventDefault();this.svg.setPointerCapture(e.pointerId);const p=this.pos(e);
    if(this.tool==='erase'){
      let closest=-1,dist=24;
      this.strokes.forEach((s,i)=>{let d=Math.min(...s.points.map(q=>Math.hypot(q[0]-p[0],q[1]-p[1])));if(s.tool==='line'&&s.points.length>1){const a=s.points[0],b=s.points.at(-1);const dx=b[0]-a[0],dy=b[1]-a[1];const t=Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy||1)));d=Math.hypot(p[0]-a[0]-t*dx,p[1]-a[1]-t*dy);}if(d<dist){dist=d;closest=i;}});
      if(closest>=0){this.strokes.splice(closest,1);this.commit();}return;
    }
    if(this.strokes.length>=2000){alert('This drawing has reached its object limit. Export a backup, then remove unneeded marks.');return;}
    const text=this.host.querySelector('.label-entry input').value.trim();if(this.tool==='label'&&!text){this.host.querySelector('.label-entry input').focus();return;}
    this.current={tool:this.tool,color:this.color,width:3,points:[p],...(this.tool==='label'?{text}:{})};
    if(['point','label'].includes(this.tool)){this.up(e);return;}this.preview();
  }
  move(e){if(!this.current)return;const p=this.pos(e);if(this.current.tool==='line')this.current.points=[this.current.points[0],p];else if(this.current.points.length<8000)this.current.points.push(p);this.preview();}
  up(e){if(!this.current)return;if(this.current.tool==='line')this.current.points=[this.current.points[0],this.pos(e)];this.strokes.push(this.current);this.current=null;this.commit();}
  preview(){this.svg.querySelector('.marks').innerHTML=this.strokes.map(mark).join('')+(this.current?mark(this.current):'');}
  commit(record=true){if(record){this.history=this.history.slice(0,this.historyIndex+1);this.history.push(structuredClone(this.strokes));if(this.history.length>60)this.history.shift();this.historyIndex=this.history.length-1;}this.onChange(structuredClone(this.strokes));this.refresh();}
  updateButtons(){const undo=this.host.querySelector('[data-action="undo"]');if(undo){undo.disabled=this.historyIndex===0;this.host.querySelector('[data-action="redo"]').disabled=this.historyIndex===this.history.length-1;}}
  destroy(){document.removeEventListener('keydown',this.keyHandler);if(this.host.classList.contains('expanded'))document.body.classList.remove('drawing-expanded');}
}
