import {sections,allAnswerIds,allCellIds,graphBlocks} from './content.js';
export const STORAGE_KEY='ita:rate-expressions:v1';
export const WORKSHEET_ID='rate-expressions-2026-09';
export function freshState(){return {format:'chemistry-workbook',version:1,worksheetId:WORKSHEET_ID,student:{name:'',className:'',date:new Date().toLocaleDateString('en-CA')},answers:{},cells:{},graphs:{},lastSection:'model',updatedAt:null};}
const isObj=o=>o!==null&&typeof o==='object'&&!Array.isArray(o);
function string(v,max=20000){if(typeof v!=='string'||v.length>max)throw new Error('This backup has an invalid or oversized text field.');return v;}
function strokes(data=[]){
  if(!Array.isArray(data)||data.length>2000)throw new Error('This backup has too many drawing objects.');
  return data.map(s=>{
    if(!isObj(s)||!['pen','line','point','label'].includes(s.tool)||!['#15161a','#c4085e','#24669b'].includes(s.color))throw new Error('Invalid drawing data.');
    if(!Array.isArray(s.points)||s.points.length<1||s.points.length>8000)throw new Error('Invalid drawing points.');
    const points=s.points.map(p=>{if(!Array.isArray(p)||p.length!==2||!p.every(n=>Number.isFinite(n)&&n>=0&&n<=1100))throw new Error('Invalid drawing coordinates.');return [...p];});
    const result={tool:s.tool,color:s.color,points,width:[2,3,5].includes(s.width)?s.width:3};
    if(s.tool==='label')result.text=string(s.text,160);
    return result;
  });
}
export function validateState(data){
  if(!isObj(data)||data.format!=='chemistry-workbook'||data.version!==1||data.worksheetId!==WORKSHEET_ID)throw new Error('Choose a rate-expressions workbook backup (.json). This file belongs to another format or worksheet.');
  if(!isObj(data.student)||!isObj(data.answers)||!isObj(data.cells)||!isObj(data.graphs))throw new Error('The backup is incomplete. Your current work has not been changed.');
  const out=freshState();
  out.student={name:string(data.student.name,100),className:string(data.student.className,60),date:string(data.student.date,10)};
  for(const [id,a] of Object.entries(data.answers)){
    if(!allAnswerIds.includes(id))throw new Error('The backup contains an unknown question.');
    if(!isObj(a))throw new Error('Invalid response data.');
    out.answers[id]={text:string(a.text||''),math:string(a.math||''),chem:string(a.chem||''),drawing:strokes(a.drawing||[])};
  }
  for(const [id,v] of Object.entries(data.cells)){if(!allCellIds.includes(id))throw new Error('Unknown table cell in backup.');out.cells[id]=string(v,100);}
  for(const [id,g] of Object.entries(data.graphs)){
    if(!graphBlocks.some(b=>b.id===id)||!isObj(g)||!isObj(g.settings))throw new Error('Invalid graph in backup.');
    const c=g.settings;
    if(![c.xMax,c.yMax].every(n=>Number.isFinite(n)&&n>0&&n<=1e12))throw new Error('Invalid graph scale.');
    out.graphs[id]={strokes:strokes(g.strokes),settings:{xLabel:string(c.xLabel,100),yLabel:string(c.yLabel,100),xMax:c.xMax,yMax:c.yMax}};
  }
  out.lastSection=sections.some(s=>s.id===data.lastSection)?data.lastSection:'model';
  out.updatedAt=typeof data.updatedAt==='string'?data.updatedAt:null;
  return out;
}
export function hasAnswer(a){return !!a&&(!!a.text?.trim()||!!a.math?.trim()||!!a.chem?.trim()||!!a.drawing?.length);}
export function progress(state){const done=allAnswerIds.filter(id=>hasAnswer(state.answers[id])).length+allCellIds.filter(id=>state.cells[id]?.trim()).length+graphBlocks.filter(b=>state.graphs[b.id]?.strokes?.length).length;return {done,total:allAnswerIds.length+allCellIds.length+graphBlocks.length};}
export function readStored(storage){const raw=storage.getItem(STORAGE_KEY);return raw?validateState(JSON.parse(raw)):freshState();}
