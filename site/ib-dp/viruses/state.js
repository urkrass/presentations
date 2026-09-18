import {freshSimulations,validateSimulations} from './models.js';
import {pages,questions} from './content.js';
export const STORAGE_KEY='ita:viruses-hl:v1';
export const WORKSHEET_ID='viruses-hl-2026-09';
export const emptyAnswer=()=>({text:'',math:'',chem:'',drawing:[]});
export function freshState(){return {format:'biology-workbook',version:1,worksheetId:WORKSHEET_ID,student:{name:'',className:'',date:new Date().toLocaleDateString('en-CA')},answers:{},simulations:freshSimulations(),lastPage:'start',updatedAt:null};}
const obj=o=>o&&typeof o==='object'&&!Array.isArray(o);
function str(s,max=20000){if(typeof s!=='string'||s.length>max)throw Error('Invalid or oversized text in backup.');return s;}
function strokes(a){if(!Array.isArray(a)||a.length>2000)throw Error('Invalid drawing.');return a.map(s=>{if(!obj(s)||!['pen','line','point','label'].includes(s.tool)||!['#15161a','#c4085e','#24669b'].includes(s.color)||!Array.isArray(s.points)||!s.points.length||s.points.length>8000)throw Error('Invalid drawing object.');const points=s.points.map(p=>{if(!Array.isArray(p)||p.length!==2||!p.every(n=>Number.isFinite(n)&&n>=0&&n<=1100))throw Error('Invalid coordinates.');return [...p];});return {tool:s.tool,color:s.color,width:[2,3,5].includes(s.width)?s.width:3,points,...(s.tool==='label'?{text:str(s.text,160)}:{})};});}
export function validateState(data){if(!obj(data)||data.format!=='biology-workbook'||data.version!==1||data.worksheetId!==WORKSHEET_ID)throw Error('Choose a Viruses HL workbook backup (.json).');if(!obj(data.student)||!obj(data.answers))throw Error('This backup is incomplete.');const s=freshState();s.simulations=validateSimulations(data.simulations);s.student={name:str(data.student.name,100),className:str(data.student.className,60),date:str(data.student.date,10)};for(const [id,a] of Object.entries(data.answers)){if(!questions.some(q=>q.id===id)||!obj(a))throw Error('Unknown or invalid response.');s.answers[id]={text:str(a.text),math:str(a.math),chem:str(a.chem),drawing:strokes(a.drawing)};}s.lastPage=pages.some(p=>p.id===data.lastPage)?data.lastPage:'start';s.updatedAt=typeof data.updatedAt==='string'?data.updatedAt:null;return s;}
export const hasAnswer=a=>Boolean(a&&(a.text.trim()||a.math.trim()||a.chem.trim()||a.drawing.length));
export const progress=s=>({done:questions.filter(p=>hasAnswer(s.answers[p.id])).length,total:questions.length});
export function readStored(storage){const raw=storage.getItem(STORAGE_KEY);return raw?validateState(JSON.parse(raw)):freshState();}
