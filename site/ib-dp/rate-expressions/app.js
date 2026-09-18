import {sections,allAnswerIds,allCellIds} from './content.js';
import {freshState,readStored,validateState,hasAnswer,progress,STORAGE_KEY} from './state.js';
import {escapeHtml as E,renderMath,formulaLines} from './format.js';
import {DrawingPad} from './drawing.js';
import {downloadBackup,downloadSubmission,printSubmission} from './export.js';

const $=s=>document.querySelector(s);
let state,paused=false,persisted=true,timer,toastTimer,pads=[];
try{state=readStored(localStorage);}catch(e){state=freshState();paused=true;persisted=false;}
const saveStatus=$('#save-status');
function toast(text){$('#toast').textContent=text;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),6500);}
function saveNow(){
  clearTimeout(timer);
  if(paused){persisted=false;saveStatus.textContent='Autosave paused — export a backup';saveStatus.classList.add('save-error');return;}
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));persisted=true;saveStatus.textContent='Saved on this device';saveStatus.classList.remove('save-error');}
  catch{persisted=false;saveStatus.textContent='Not saved — download a backup';saveStatus.classList.add('save-error');}
}
function changed(){state.updatedAt=new Date().toISOString();persisted=false;saveStatus.textContent=paused?'Autosave paused — export a backup':'Saving…';clearTimeout(timer);timer=setTimeout(saveNow,250);updateProgress();}
function updateProgress(){const {done,total}=progress(state);$('#progress').max=total;$('#progress').value=done;$('#progress-label').textContent=`${done} of ${total} response areas started`;for(const s of sections){const ids=s.blocks.flatMap(b=>b.parts?.map(p=>p.id)||[]);const any=ids.some(id=>hasAnswer(state.answers[id]));const el=document.querySelector(`[data-section="${s.id}"] .nav-status`);if(el){el.textContent=any?'•':'';el.setAttribute('aria-label',any?'Contains work':'Not started');}}}
function answer(id){return state.answers[id]||(state.answers[id]={text:'',math:'',chem:'',drawing:[]});}
function editorHTML(id){return `<div class="answer-editor" data-editor="${id}"><div class="editor-toolbar"><div class="editor-tabs" role="tablist" aria-label="Response modes for ${E(id)}">${[['text','Text'],['math','Equation'],['chem','Chemistry'],['sketch','Sketch']].map(([v,l])=>`<button role="tab" id="${id}-tab-${v}" data-mode="${v}" aria-controls="${id}-panel-${v}" aria-selected="${v==='text'}">${l}</button>`).join('')}</div><button class="help-button" aria-label="Help with equations and chemical formulae">?</button></div><div class="editor-pane"></div><div class="editor-summary"></div></div>`;}
function bindEditor(host,id){let mode='text',pad=null;const a=answer(id);const pane=host.querySelector('.editor-pane');const summary=host.querySelector('.editor-summary');
  function summaryUpdate(){const entries=[a.text&&'text',a.math&&'equations',a.chem&&'chemistry',a.drawing?.length&&'drawing'].filter(Boolean);summary.textContent=entries.length?'Included in submission: '+entries.join(' + '):'Your work in every tab is saved together.';}
  function show(next){
    if(pad){pad.destroy();pad=null;}mode=next;
    host.querySelectorAll('[data-mode]').forEach(b=>{b.setAttribute('aria-selected',String(b.dataset.mode===mode));b.tabIndex=b.dataset.mode===mode?0:-1;});
    pane.id=`${id}-panel-${mode}`;pane.setAttribute('role','tabpanel');pane.setAttribute('aria-labelledby',`${id}-tab-${mode}`);
    if(mode==='sketch'){pane.innerHTML='<div class="sketch-host"></div>';pad=new DrawingPad(pane.firstChild,{strokes:a.drawing,name:id+' sketch',onChange:strokes=>{a.drawing=strokes;changed();summaryUpdate();}});pads.push(pad);summaryUpdate();return;}
    const field=mode;const isText=mode==='text';
    const tools=isText?[['²','²',''],['₂','₂',''],['×',' × ',''],['→',' → ',''],['Δ','Δ',''],['mol dm⁻³',' mol dm⁻³ ','']]:mode==='chem'?[['H₂O','H2O',''],['charge','^{','}'],['→',' -> ',''],['⇌',' <=> ',''],['(aq)','(aq)','']]:[['xⁿ','^{','}'],['xₙ','_{','}'],['a/b','\\frac{','}{}'],['√','\\sqrt{','}'],['×10ⁿ',' \\times 10^{','}'],['→',' \\rightarrow ',''],['units','\\mathrm{','}']];
    pane.innerHTML=`<div class="symbol-bar" role="toolbar" aria-label="Insert symbols">${tools.map((t,i)=>`<button data-symbol="${i}" title="Insert ${E(t[0])}" aria-label="Insert ${E(t[0])}">${t[0]}</button>`).join('')}</div><div class="${isText?'text-input':'formula-input'}"><textarea id="answer-${id}-${mode}" aria-label="${E(id)} ${isText?'written answer':mode==='chem'?'chemical formulae':'equations'}" spellcheck="${isText}" maxlength="20000" placeholder="${isText?'Write your reasoning and working here…':mode==='chem'?'e.g. H2SO4 or 2H2 + O2 -> 2H2O':'e.g. k = \\frac{r}{[A]^2}'}">${E(a[field])}</textarea>${isText?'':`<div class="formula-preview"><span>Preview as you type</span><div class="preview-content"></div></div>`}</div>`;
    const textarea=pane.querySelector('textarea');
    const update=()=>{a[field]=textarea.value;changed();if(!isText)pane.querySelector('.preview-content').innerHTML=formulaLines(textarea.value,mode==='chem');summaryUpdate();};
    textarea.addEventListener('input',update);
    pane.querySelectorAll('[data-symbol]').forEach(b=>b.addEventListener('click',()=>{const [,before,after]=tools[Number(b.dataset.symbol)];const start=textarea.selectionStart,end=textarea.selectionEnd,selection=textarea.value.slice(start,end);textarea.setRangeText(before+selection+after,start,end,'end');textarea.focus();textarea.setSelectionRange(start+before.length+selection.length,start+before.length+selection.length);update();}));
    if(!isText)pane.querySelector('.preview-content').innerHTML=formulaLines(a[field],mode==='chem');summaryUpdate();
  }
  host.querySelectorAll('[data-mode]').forEach(b=>{b.onclick=()=>show(b.dataset.mode);b.onkeydown=e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();const modes=['text','math','chem','sketch'];const i=(modes.indexOf(mode)+(e.key==='ArrowRight'?1:3))%4;show(modes[i]);host.querySelector(`[data-mode="${modes[i]}"]`).focus();}};});
  host.querySelector('.help-button').onclick=()=>$('#help-dialog').showModal();show('text');
}
function taskHTML(b){return `<section class="task" aria-labelledby="task-${b.id}"><h3 id="task-${b.id}" class="task-title"><span>${E(b.id)} · ${E(b.title)}</span>${b.marks?`<span class="marks">${b.marks} marks</span>`:''}</h3>${b.html}${b.parts.map(p=>`<div class="question-part"><p class="part-prompt">${p.label?`<strong class="part-label">${p.label}</strong>`:''}<span>${p.prompt}</span>${p.marks?`<span class="marks">${p.marks} marks</span>`:''}</p>${editorHTML(p.id)}</div>`).join('')}</section>`;}
function render(id,{focus=false}={}){
  const s=sections.find(s=>s.id===id)||sections[0];const i=sections.indexOf(s);pads.forEach(p=>p.destroy());pads=[];state.lastSection=s.id;
  $('#section-content').innerHTML=`<div class="section-title"><h2>${E(s.title)}</h2>${s.marks?`<span class="marks">${s.marks} marks</span>`:''}</div>${s.blocks.map(b=>b.type==='html'?b.html:b.type==='task'?taskHTML(b):`<section class="graph-task"><h3>${E(b.title)}</h3><p>${E(b.config.instruction)}</p><div data-graph="${b.id}"></div></section>`).join('')}`;
  renderMath($('#section-content'));
  $('#section-content').querySelectorAll('[data-editor]').forEach(el=>bindEditor(el,el.dataset.editor));
  $('#section-content').querySelectorAll('[data-cell]').forEach(el=>{el.value=state.cells[el.dataset.cell]||'';el.addEventListener('input',()=>{state.cells[el.dataset.cell]=el.value;changed();});});
  s.blocks.filter(b=>b.type==='graph').forEach(b=>{
    const g=state.graphs[b.id]||(state.graphs[b.id]={strokes:[],settings:{xLabel:b.config.xLabel,yLabel:b.config.yLabel,xMax:b.config.xMax,yMax:b.config.yMax}});
    const pad=new DrawingPad(document.querySelector(`[data-graph="${b.id}"]`),{strokes:g.strokes,settings:g.settings,name:b.title,onChange:strokes=>{g.strokes=strokes;changed();},onSettings:c=>{g.settings=c;changed();}});pads.push(pad);
  });
  document.querySelectorAll('[data-section]').forEach(b=>{b.setAttribute('aria-current',b.dataset.section===s.id?'page':'false');});
  $('#previous').disabled=i===0;$('#next').textContent=i===sections.length-1?'Export work ↗':'Next section →';$('#section-count').textContent=`${i+1} / ${sections.length}`;
  document.title=s.title+' · Chemistry workbook';updateProgress();
  $('#sidebar').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');
  if(focus){window.scrollTo(0,0);$('#main').focus({preventScroll:true});}
}
function go(id){saveNow();$('#sidebar').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');location.hash=id;}
$('#section-nav').innerHTML=['Learn & practise','Independent practice'].map(group=>`<div class="nav-group"><p>${group}${group==='Independent practice'?' · 58 marks':''}</p>${sections.filter(s=>s.group===group).map((s,i)=>`<button data-section="${s.id}"><span class="nav-number">${group==='Learn & practise'?String(i+1).padStart(2,'0'):'P'+(i+1)}</span><span>${E(s.title.replace(/^P\d · /,''))}</span><span class="nav-status" aria-hidden="true"></span></button>`).join('')}</div>`).join('');
document.querySelectorAll('[data-section]').forEach(b=>b.onclick=()=>go(b.dataset.section));
$('#previous').onclick=()=>go(sections[Math.max(0,sections.findIndex(s=>s.id===state.lastSection)-1)].id);
$('#next').onclick=()=>{const i=sections.findIndex(s=>s.id===state.lastSection);if(i===sections.length-1)$('#export-dialog').showModal();else go(sections[i+1].id);};
window.addEventListener('hashchange',()=>{render(location.hash.slice(1),{focus:true});changed();});
function bindIdentity(){for(const [selector,key] of [['#student-name','name'],['#student-class','className'],['#work-date','date']]){$(selector).value=state.student[key];$(selector).oninput=e=>{state.student[key]=e.target.value;changed();};}}
bindIdentity();
$('#export-work').onclick=()=>{saveNow();$('#export-message').textContent='';$('#export-dialog').showModal();};
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>b.closest('dialog').close());
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
$('#menu-toggle').onclick=()=>{$('#menu-toggle').setAttribute('aria-expanded',String($('#sidebar').classList.toggle('open')));};
$('#download-backup').onclick=()=>{saveNow();downloadBackup(state);$('#export-message').textContent='Backup downloaded. Keep it to resume or restore your work.';};
async function exportAction(button,action,success){button.disabled=true;$('#export-message').textContent='Preparing your work…';try{saveNow();await action(structuredClone(state));$('#export-message').textContent=success;}catch(e){$('#export-message').textContent='Export failed: '+e.message;}finally{button.disabled=false;}}
$('#download-submission').onclick=e=>exportAction(e.target,downloadSubmission,'Submission downloaded. Open it in a browser to read, print or save as PDF.');
$('#print-submission').onclick=e=>exportAction(e.target,printSubmission,'Choose “Save as PDF” in the print dialog. Graphs use their own landscape pages.');
$('#open-backup').onclick=()=>$('#backup-file').click();
$('#backup-file').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{
  if(file.size>5*1024*1024)throw new Error('This file is larger than the 5 MB backup limit.');
  const incoming=validateState(JSON.parse(await file.text()));const done=progress(state).done;
  if((done||state.student.name)&&!confirm('Open this backup and replace the work currently shown? Download a backup first if you want to keep both copies.'))return;
  clearTimeout(timer);state=incoming;paused=false;bindIdentity();history.replaceState(null,'','#'+state.lastSection);render(state.lastSection,{focus:true});changed();saveNow();toast('Backup opened. Your answers and drawings are restored.');
}catch(err){toast('Could not open this backup: '+err.message);}finally{e.target.value='';}};
const reset=document.createElement('button');reset.className='new-workbook';reset.textContent='Start a new workbook';reset.onclick=()=>{if(!confirm('Start a blank workbook on this browser? Download your submission or backup first.'))return;clearTimeout(timer);state=freshState();paused=false;bindIdentity();history.replaceState(null,'','#model');render('model',{focus:true});changed();saveNow();toast('A new workbook is ready.');};$('.student-details').append(reset);
window.addEventListener('pagehide',saveNow);
window.addEventListener('beforeunload',e=>{saveNow();if(!persisted&&progress(state).done){e.preventDefault();e.returnValue='';}});
window.addEventListener('storage',e=>{if(e.key===STORAGE_KEY&&e.newValue){paused=true;clearTimeout(timer);saveStatus.textContent='Changed in another tab — export or reload';saveStatus.classList.add('save-error');toast('This workbook changed in another tab. Export this tab’s work or reload to use the latest saved copy. Autosave is paused to protect both copies.');}});
render(sections.some(s=>s.id===location.hash.slice(1))?location.hash.slice(1):state.lastSection);
if(paused){saveNow();toast('Your saved copy could not be read. It has not been overwritten. Open a backup or start a new workbook.');}else saveStatus.textContent=state.updatedAt?'Saved on this device':'Ready to begin';
