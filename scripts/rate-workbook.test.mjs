import test from 'node:test';
import assert from 'node:assert/strict';
import {freshState,validateState,progress,readStored,STORAGE_KEY} from '../site/ib-dp/rate-expressions/state.js';
import {sections,allAnswerIds,allCellIds,graphBlocks} from '../site/ib-dp/rate-expressions/content.js';
import {drawingSvg} from '../site/ib-dp/rate-expressions/drawing.js';

test('a saved student submission restores text, equations, chemistry, cells and drawings together',()=>{
 const work=freshState();work.student={name:'Марсель Test',className:'11A',date:'2026-09-18'};
 work.answers['G1-a']={text:'Orders from experiments, not stoichiometry.',math:'r=k[X]^2[Y]',chem:'SO4^2-',drawing:[{tool:'line',color:'#15161a',width:3,points:[[100,500],[900,100]]}]};
 work.cells['G8-c1']='0.00160';work.graphs['G8-graph']={settings:{xLabel:'[A]² / mol² dm⁻⁶',yLabel:'Rate',xMax:0.045,yMax:0.00045},strokes:[{tool:'point',color:'#c4085e',width:3,points:[[200,400]]}]};work.lastSection='graphical';
 const json=JSON.stringify(work);assert.deepEqual(validateState(JSON.parse(json)),work);
 assert.deepEqual(readStored({getItem:key=>key===STORAGE_KEY?json:null}),work);
 assert.equal(progress(work).done,3);
});
test('malformed or foreign backups fail before replacing any current work',()=>{
 const current=freshState();current.student.name='Keep me';const before=structuredClone(current);
 for(const invalid of [null,[],{}, {...freshState(),worksheetId:'other'},{...freshState(),version:99},{...freshState(),answers:{'missing-question':{}}},{...freshState(),graphs:{'G8-graph':{settings:{xMax:-1,yMax:1},strokes:[]}}}])assert.throws(()=>validateState(invalid));
 assert.deepEqual(current,before);
});
test('drawing labels remain text in the standalone export',()=>{
 const svg=drawingSvg([{tool:'label',color:'#15161a',width:3,points:[[160,100]],text:'<script>alert(1)</script>'}]);
 assert.ok(svg.includes('&lt;script&gt;'));assert.ok(!svg.includes('<script>'));
});
test('all original exercise families and both separate graph responses are present',()=>{
 const ids=sections.flatMap(s=>s.blocks.filter(b=>b.type==='task').map(b=>b.id));
 for(const id of ['G1','G2','G3','G4','G5','G6A','G6B','G7','G8','P1','P2','P3A','P3B','P4','P5'])assert.ok(ids.includes(id),id);
 assert.equal(new Set(allAnswerIds).size,allAnswerIds.length);assert.equal(new Set(allCellIds).size,allCellIds.length);
 assert.deepEqual(graphBlocks.map(b=>b.id),['G8-graph','P4-graph']);assert.equal(sections.reduce((n,s)=>n+(s.marks||0),0),58);
});
