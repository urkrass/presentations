import {escapeHtml as E} from '../rate-expressions/format.js';
import {lambdaScene,reassortmentScene} from './figures.js';
import {SIMULATION_TITLES,lambdaStages,lambdaTransition,reassortmentTransition,reassortmentResult,simulationSnapshot,simulationNotes,freshSimulations} from './models.js';

const scene=(name,s)=>name==='lambda'?lambdaScene(s):reassortmentScene(s);
export function simulationReport(name,s=freshSimulations()[name]){
 return `<div class="reading-block"><p><strong>Saved concept model: ${E(SIMULATION_TITLES[name])}</strong></p><figure class="science-figure">${scene(name,s)}<figcaption>${E(simulationSnapshot(name,s)).replaceAll('\n','<br>')}</figcaption></figure></div>`;
}
export class SimulationDialog{
 constructor({getState,getSaveStatus,onChange,onRecord}){
  Object.assign(this,{getState,getSaveStatus,onChange,onRecord});
  this.dialog=document.createElement('dialog');this.dialog.id='simulation-dialog';this.dialog.setAttribute('aria-labelledby','simulation-title');document.body.append(this.dialog);
  this.dialog.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
   if(b.dataset.action==='close'){this.dialog.close();return;}
   if(b.dataset.action==='pane'){this.pane=this.pane==='controls'?'diagram':'controls';this.render('[data-action="pane"]');return;}
   if(b.dataset.view){this.view=b.dataset.view;this.notice='';this.render('[data-view="'+this.view+'"]');return;}
   if(b.dataset.note){this.note+=Number(b.dataset.note);this.render('[data-note="'+b.dataset.note+'"]');return;}
   if(b.dataset.action==='record'){this.notice=this.onRecord(this.name,simulationSnapshot(this.name,this.getState()[this.name]));this.render('[data-action="record"]');return;}
   if(b.dataset.action){const old=this.getState()[this.name];const next=this.name==='lambda'?lambdaTransition(old,b.dataset.action):reassortmentTransition(old,b.dataset.action,Number(b.dataset.segment));this.getState()[this.name]=next;this.notice='';this.onChange();this.render(b.dataset.segment!==undefined?'[data-segment="'+b.dataset.segment+'"]':'[data-action="'+b.dataset.action+'"]');}
  });
  this.dialog.addEventListener('keydown',e=>{if(e.target.matches('[data-view]')&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();this.view=this.view==='explore'?'notes':'explore';this.render('[data-view="'+this.view+'"]');}});
  this.dialog.addEventListener('close',()=>{const target=this.launcher?.isConnected?this.launcher:document.querySelector('#reading-body [data-simulation="'+this.name+'"]')||document.querySelector('#contents-button');target?.focus();});
 }
 open(name,launcher){if(!Object.hasOwn(SIMULATION_TITLES,name))return;this.name=name;this.launcher=launcher;this.view='explore';this.pane='controls';this.note=0;this.notice='';this.render();this.dialog.showModal();this.dialog.querySelector('[data-action="close"]').focus();}
 updateSaveStatus(){const el=this.dialog.querySelector('.sim-notice');if(!el)return;const status=this.getSaveStatus(),failure=/unavailable|paused|Changed/.test(status);el.textContent=failure?status:this.notice||status;el.classList.toggle('error',failure);}
 render(focus){
  const name=this.name,s=this.getState()[name],notes=simulationNotes[name],isLambda=name==='lambda';
  const content=this.view==='notes'?`<div class="sim-notes"><div><h3>${E(notes[this.note][0])}</h3><p>${E(notes[this.note][1])}</p></div><nav aria-label="Model notes pages"><button data-note="-1" ${this.note===0?'disabled':''}>← Back</button><span>${this.note+1} / ${notes.length}</span><button data-note="1" ${this.note===notes.length-1?'disabled':''}>Next →</button></nav></div>`:
   `<div class="sim-stage"><div class="sim-picture">${scene(name,s)}</div><p class="sim-legend">${isLambda?'<span>━ Phage DNA</span><span>━ Bacterial DNA</span>':'<span>A · Parent A</span><span class="source-b">B · Parent B</span>'}</p></div><div class="sim-controls">${isLambda?this.lambdaControls(s):this.segmentControls(s)}</div>`;
  this.dialog.innerHTML=`<header class="sim-header"><h2 id="simulation-title">${E(SIMULATION_TITLES[name])}</h2><button data-action="close" aria-label="Close simulation">×</button></header><div class="sim-tab-row"><div role="tablist" aria-label="Simulation view"><button role="tab" data-view="explore" aria-selected="${this.view==='explore'}" aria-controls="sim-content">Explore</button><button role="tab" data-view="notes" aria-selected="${this.view==='notes'}" aria-controls="sim-content">Model notes</button></div><button class="sim-pane-toggle" data-action="pane" ${this.view==='notes'?'hidden':''}>${this.pane==='controls'?'Show diagram':'Show controls'}</button><span>Concept model</span></div><div data-pane="${this.pane}" id="sim-content" class="sim-content ${this.view==='notes'?'notes-view':''}" role="tabpanel">${content}</div><footer class="sim-footer"><button data-action="reset">Reset</button><p role="status" class="sim-notice">${E(this.notice||this.getSaveStatus())}</p><button class="primary" data-action="record">Save observation</button></footer>`;
  this.updateSaveStatus();
  const target=focus&&this.dialog.querySelector(focus);if(target&&!target.disabled)target.focus();else if(focus)this.dialog.querySelector('.sim-controls button:not(:disabled),[data-view="notes"]')?.focus();
 }
 lambdaControls(s){const stage=lambdaStages[s.stage];return `<div class="sim-explanation" aria-live="polite" aria-atomic="true"><p class="sim-kicker">${s.route==='undecided'?'Before the route choice':s.route==='lytic'?'Lytic route':s.route==='lysogenic'?'Lysogenic route':'Induced lytic route'} · ${s.generation} / 3 divisions</p><h3>${E(stage.title)}</h3><p>${E(stage.description)}</p>${s.stage==='lysogen'&&s.generation===3?'<p class="sim-limit">Division limit reached. Induce or reset to explore.</p>':''}</div><div class="sim-actions">${stage.actions.map(([action,label])=>`<button data-action="${action}" class="${action==='divide'?'':'primary'}" ${action==='divide'&&s.generation===3?'disabled':''}>${E(label)}</button>`).join('')}</div>`;}
 segmentControls(s){const r=reassortmentResult(s);return `<div class="sim-source" role="group" aria-label="Viruses infecting the same cell"><span>Viruses in this cell</span><div><button data-action="single" aria-pressed="${!s.coinfected}">A only</button><button data-action="coinfect" aria-pressed="${s.coinfected}">A + B</button></div></div><p class="sim-instruction">${s.coinfected?'Tap a segment to switch its source.':'Choose A + B to enable mixing.'}</p><div class="segment-grid" role="group" aria-label="Parental source of each segment">${r.sources.map((source,i)=>`<button data-action="toggle" data-segment="${i}" class="source-${source.toLowerCase()}" aria-label="Segment ${i+1}: parent ${source}. Switch source" aria-pressed="${source==='B'}" ${!s.coinfected?'disabled':''}>${i+1}<strong>${source}</strong></button>`).join('')}</div><p class="sim-result" role="status">${E(r.label)}<br><span>${r.a} A + ${r.b} B · 8 intact segments</span></p>`;}
}
