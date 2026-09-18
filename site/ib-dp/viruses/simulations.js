import {escapeHtml as E} from '../rate-expressions/format.js';
import {lambdaScene,reassortmentScene} from './figures.js';
import {simulationSnapshot,freshSimulations} from './models.js';
import {DT,MAX_TICKS,freshRun,rebuildWorld,FixedClock,sample,stressPulse,runSummary} from './dynamics.js';
import {dynamicReport,plotSvg,dynamicNotes} from './dynamic-report.js';
const titles={lambda:'Lambda · live culture',reassortment:'Influenza · genome packaging'};
export function simulationReport(name,record=freshRun(name),legacy){
 const previous=legacy&&JSON.stringify(legacy)!==JSON.stringify(freshSimulations()[name])?`<div class="reading-block"><p>Earlier stage-explorer record</p><figure class="science-figure">${name==='lambda'?lambdaScene(legacy):reassortmentScene(legacy)}<figcaption>${E(simulationSnapshot(name,legacy)).replaceAll('\n','<br>')}</figcaption></figure></div>`:'';
 return dynamicReport(name,record)+previous;
}
let engineImport;
const loadEngine=()=>engineImport??=(import('./runtime/engine-v1.js?v=phaser2').catch(error=>{engineImport=null;throw error;}));
export class SimulationDialog{
 constructor({getState,getSaveStatus,onChange,onRecord}){
  Object.assign(this,{getState,getSaveStatus,onChange,onRecord,ticket:0});this.clock=new FixedClock();
  this.dialog=document.createElement('dialog');this.dialog.id='simulation-dialog';this.dialog.className='dynamic-dialog';this.dialog.setAttribute('aria-labelledby','simulation-title');document.body.append(this.dialog);
  this.dialog.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.view){this.switchView(b.dataset.view);return;}if(b.dataset.note){this.note+=Number(b.dataset.note);this.updateNotes();return;}const action=b.dataset.action;
   if(action==='close')this.dialog.close();
   else if(action==='play'){this.running=!this.running;this.inspectText='';this.notice='';this.clock.reset();if(!this.running)this.checkpoint();this.refresh();}
   else if(action==='reset')this.restart(false,false);
   else if(action==='trial')this.restart(true,false);
   else if(action==='apply')this.restart(false,true);
   else if(action==='stress'){if(stressPulse(this.world,this.record)){this.notice='Stress pulse applied.';this.checkpoint();this.refresh();}}
   else if(action==='latest'){const p=this.world.offspring.at(-1);if(p)this.inspect('virion:'+p.id);}
   else if(action==='record'){this.running=false;this.checkpoint();this.notice=this.onRecord(this.name,runSummary(this.name,this.record,this.world));this.refresh();}
  });
  this.dialog.addEventListener('change',e=>{if(e.target.matches('[data-speed]')){this.speed=Number(e.target.value);this.clock.reset();}});
  this.dialog.addEventListener('close',()=>{this.ticket++;this.running=false;this.checkpoint();this.engine?.destroy();this.engine=null;clearTimeout(this.loadTimer);document.removeEventListener('visibilitychange',this.visibility,true);const target=this.launcher?.isConnected?this.launcher:document.querySelector('#reading-body [data-simulation="'+this.name+'"]')||document.querySelector('#contents-button');target?.focus();});
  window.addEventListener('beforeunload',()=>{if(this.dialog.open)this.checkpoint();});
  this.dialog.addEventListener('keydown',e=>{if(e.target.matches('[data-view]')&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();const views=['live','results','notes'],i=views.indexOf(this.view);this.switchView(views[(i+(e.key==='ArrowRight'?1:2))%3]);this.el('[data-view="'+this.view+'"]').focus();}});
 }
 el(selector){return this.dialog.querySelector(selector);}
 async open(name,launcher){
  if(!Object.hasOwn(titles,name))return;const ticket=++this.ticket;this.name=name;this.launcher=launcher;this.record=this.getState()[name];this.world=rebuildWorld(name,this.record);this.running=false;this.speed=1;this.view='live';this.note=0;this.notice='';this.inspectText='';this.ready=false;this.frameTime=0;this.saveTime=0;this.clock.reset();this.renderShell();this.dialog.showModal();this.el('[data-action="close"]').focus();
  this.visibility=()=>{if(document.hidden){this.running=false;this.clock.reset();this.checkpoint();this.refresh();}};document.addEventListener('visibilitychange',this.visibility,true);
  this.loadTimer=setTimeout(()=>{if(ticket===this.ticket&&!this.ready)this.engineError('The renderer is taking too long. Close and reopen to retry.');},12000);
  try{const {createEngine}=await loadEngine();if(ticket!==this.ticket||!this.dialog.open)return;
   this.engine=createEngine(this.el('.world-host'),{getWorld:()=>this.world,onFrame:delta=>this.frame(delta),onInspect:key=>this.inspect(key),onReady:()=>{if(ticket!==this.ticket)return;clearTimeout(this.loadTimer);this.ready=true;this.el('.engine-loading').hidden=true;this.refresh();},onError:message=>this.engineError(message)});
  }catch{if(ticket===this.ticket)this.engineError('The game engine could not load. Close and reopen to retry; your answers are safe.');}
 }
 engineError(message){this.running=false;this.ready=false;this.notice=message;this.checkpoint();this.el('.engine-loading').hidden=false;this.el('.engine-loading').textContent=message;this.refresh();}
 frame(delta){if(!this.dialog.open)return;if(this.running&&this.ready&&this.view==='live'){this.clock.advance(this.world,delta,this.speed);if(this.world.tick>=MAX_TICKS||this.world.capacity){this.running=false;this.notice=this.world.capacity?this.world.message:'Run complete. Save an observation or reset.';this.checkpoint();}}
  this.frameTime+=delta;this.saveTime+=delta;if(this.frameTime>=200){this.frameTime=0;this.refresh();}if(this.saveTime>=1000&&this.running){this.saveTime=0;this.checkpoint();}
 }
 checkpoint(){if(!this.record||!this.world)return;this.record.tick=this.world.tick;this.onChange();}
 restart(newSeed,apply){this.running=false;const seed=newSeed?(this.record.seed%2147483646)+1:this.record.seed,next=freshRun(this.name,seed);next.config=apply?this.name==='lambda'?{route:this.el('[data-route]').value,receptors:this.el('[data-receptors]').value==='available'}:{coinfected:this.el('[data-sources]').value==='both'}:{...this.record.config};this.getState()[this.name]=next;this.record=next;this.world=rebuildWorld(this.name,next);this.clock.reset();this.notice=newSeed?'New seeded trial ready.':'Run reset. Saved observations are kept.';this.inspectText='';this.checkpoint();this.syncSettings();this.refresh();}
 inspect(key){const [kind,idText]=key.split(':'),id=Number(idText);let text='';if(kind==='cell'){const c=this.world.cells.find(c=>c.id===id);if(c)text=`Cell ${id}: ${({healthy:'uninfected host',entry:'DNA entry',infected:'DNA copying and protein synthesis',assembly:'phage assembly',lysogen:'integrated prophage'})[c.status]}.`;}
  if(kind==='virion'){const p=this.world.offspring.find(p=>p.id===id);if(p)text=`Genome ${id}: ${p.sources.map((s,i)=>`${i+1}${s}`).join(' · ')}.`;}
  if(kind==='rna'){const p=this.world.segments.find(p=>p.id===id);if(p)text=`Segment type ${p.type+1}, parent ${p.source}${p.target>=0?' · being recruited to a packaging site':''}.`;}
  if(text){this.inspectText=text;this.running=false;this.clock.reset();this.checkpoint();this.refresh();}
 }
 switchView(view){this.running=false;this.checkpoint();this.view=view;for(const button of this.dialog.querySelectorAll('[data-view]'))button.setAttribute('aria-selected',String(button.dataset.view===view));for(const pane of this.dialog.querySelectorAll('[data-pane]'))pane.hidden=pane.dataset.pane!==view;if(view==='results')this.el('.history-plot').innerHTML=plotSvg(this.world);if(view==='notes')this.updateNotes();this.engine?.resize();this.refresh();}
 syncSettings(){if(this.name==='lambda'){this.el('[data-route]').value=this.record.config.route;this.el('[data-receptors]').value=this.record.config.receptors?'available':'blocked';}else this.el('[data-sources]').value=this.record.config.coinfected?'both':'single';}
 updateSaveStatus(){const el=this.el('.sim-notice');if(!el)return;const status=this.getSaveStatus(),failure=/unavailable|paused|Changed/.test(status);el.textContent=failure?status:this.notice||status;el.classList.toggle('error',failure);}
 refresh(){if(!this.world||!this.dialog.open)return;const s=sample(this.world);this.el('.run-time').textContent=`${(this.world.tick*DT).toFixed(1)} / 90 · ${this.running?'Running':'Paused'}`;this.el('[data-action="play"]').textContent=this.running?'Pause':'Play';this.el('[data-action="play"]').disabled=!this.ready||this.view!=='live'||this.world.tick>=MAX_TICKS||this.world.capacity;this.el('.run-seed').textContent='Seed '+this.record.seed;
  const metrics=this.name==='lambda'?[['Hosts',s.living],['Lysogens',s.lysogens],['Free phages',s.free],['Lysed',s.lysed]]:[['Assembled',s.total],['Mixed',s.mixed],['Segments',8],['Sites',3]];
  this.el('.run-metrics').innerHTML=metrics.map(([l,n])=>`<div><strong>${n}</strong><span>${l}</span></div>`).join('');
  this.el('.run-event').textContent=this.inspectText||this.world.message;
  this.el('.run-result-text').textContent=this.name==='lambda'?`${s.living} hosts alive; ${s.infected} in entry or the lytic sequence; ${s.lysogens} lysogens; ${s.lysed} cells lysed.`:`${s.mixed} of ${s.total} completed genomes contain segments from both parents.`;
  const stress=this.el('[data-action="stress"]');if(stress)stress.disabled=!this.ready||s.lysogens===0||this.record.events.length>=20||this.record.events.some(e=>e.tick===this.world.tick);
  const latest=this.el('[data-action="latest"]');if(latest)latest.disabled=!this.world.offspring.length;
  this.updateSaveStatus();
 }
 updateNotes(){const notes=dynamicNotes[this.name];this.el('.note-copy').innerHTML=`<h3>${E(notes[this.note][0])}</h3><p>${E(notes[this.note][1])}</p>`;this.el('.note-count').textContent=`${this.note+1} / ${notes.length}`;this.el('[data-note="-1"]').disabled=this.note===0;this.el('[data-note="1"]').disabled=this.note===notes.length-1;}
 renderShell(){
  const controls=this.name==='lambda'?`<label>Infection route<select data-route><option value="lytic">Lytic</option><option value="lysogenic">Lysogenic</option></select></label><label>Host receptors<select data-receptors><option value="available">Available</option><option value="blocked">Blocked</option></select></label>`:`<label>Sources in this cell<select data-sources><option value="both">A + B · coinfection</option><option value="single">A only</option></select></label>`;
  this.dialog.innerHTML=`<header class="sim-header"><h2 id="simulation-title">${titles[this.name]}</h2><button data-action="close" aria-label="Close simulation">×</button></header><div class="sim-tab-row"><div role="tablist" aria-label="Simulation view"><button role="tab" data-view="live" aria-selected="true">Live</button><button role="tab" data-view="results" aria-selected="false">Results</button><button role="tab" data-view="notes" aria-selected="false">Model notes</button></div><span class="run-time"></span></div>
  <div class="dynamic-content"><div data-pane="live" class="live-pane"><div class="world-frame"><div class="world-host"></div><p class="engine-loading" role="status">Loading the game engine…</p><div class="world-legend">${this.name==='lambda'?'<span>Green · host</span><span class="legend-a">Pink · infection</span><span class="legend-a">Magenta DNA · prophage</span>':'<span class="legend-a">Magenta · parent A</span><span class="legend-b">Blue · parent B</span><span>Rim · packaging sites</span>'}</div></div><div class="run-controls"><div class="run-metrics" aria-label="Live model counts"></div><div class="experiment-settings">${controls}<button data-action="apply">Restart with settings</button></div><div class="experiment-actions">${this.name==='lambda'?'<button data-action="stress">Pulse stress</button>':'<button data-action="latest">Inspect latest</button>'}<button data-action="trial">New trial</button><span class="run-seed"></span></div><p class="run-event" role="status"></p><p class="model-limit">Illustrative biology · arbitrary time units</p></div></div>
  <div data-pane="results" class="results-pane" hidden><h3>${this.name==='lambda'?'Host outcomes over time':'Progeny assembled over time'}</h3><div class="history-plot"></div><p class="run-result-text"></p><p>Save observation records the current counts and conditions. Your submission includes this plot.</p></div>
  <div data-pane="notes" class="sim-notes" hidden><div class="note-copy"></div><nav aria-label="Model notes pages"><button data-note="-1">← Back</button><span class="note-count"></span><button data-note="1">Next →</button></nav></div></div>
  <footer class="dynamic-footer"><div class="playback"><button data-action="play" class="primary" disabled>Play</button><label class="sr-only" for="run-speed">Playback speed</label><select id="run-speed" data-speed aria-label="Playback speed"><option value="1">1×</option><option value="2">2×</option><option value="4">4×</option></select><button data-action="reset">Reset</button></div><p class="sim-notice" role="status"></p><button data-action="record">Save observation</button></footer>`;
  this.syncSettings();this.updateNotes();
 }
}
