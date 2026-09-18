import test from 'node:test';
import assert from 'node:assert/strict';
import {freshLambda,freshReassortment,freshSimulations,lambdaTransition,reassortmentTransition,reassortmentResult,validateSimulations,simulationSnapshot} from '../site/ib-dp/viruses/models.js';
import {freshState,validateState,emptyAnswer} from '../site/ib-dp/viruses/state.js';
import {submissionHtml} from '../site/ib-dp/viruses/export.js';
const run=(...actions)=>actions.reduce(lambdaTransition,freshLambda());
test('lambda keeps lytic, lysogenic and induced routes distinct',()=>{
 assert.deepEqual(run('enter','lytic','assemble','lyse'),{stage:'released',generation:0,route:'lytic'});
 assert.deepEqual(run('enter','integrate','divide','divide'),{stage:'lysogen',generation:2,route:'lysogenic'});
 assert.deepEqual(run('enter','integrate','divide','induce','copy','assemble','lyse'),{stage:'released',generation:1,route:'induced'});
});
test('all reachable lambda states stay valid; forbidden transitions do nothing; reset is total',()=>{
 const actions=['enter','lytic','integrate','divide','induce','copy','assemble','lyse','bogus','constructor','toString'];
 const queue=[freshLambda()],seen=new Set();
 while(queue.length){const s=queue.shift(),key=JSON.stringify(s);if(seen.has(key))continue;seen.add(key);
  assert.deepEqual(validateSimulations({lambda:s}).lambda,s);
  assert.deepEqual(lambdaTransition(s,'reset'),freshLambda());
  for(const action of actions){const before=JSON.stringify(s),n=lambdaTransition(s,action);assert.equal(JSON.stringify(s),before,'pure transition');assert.ok(n.generation<=3);if(JSON.stringify(n)!==key)queue.push(n);}
 }
 assert.equal(seen.size,25);
 let s=run('enter','integrate');for(let i=0;i<100;i++)s=lambdaTransition(s,'divide');assert.equal(s.generation,3);assert.equal(s.stage,'lysogen');
 assert.deepEqual(lambdaTransition(freshLambda(),'lyse'),freshLambda());
 assert.deepEqual(lambdaTransition(run('enter','lytic','assemble','lyse'),'divide'),run('enter','lytic','assemble','lyse'));
});
test('every influenza source pattern preserves eight segment types; exactly 254 are mixed',()=>{
 let mixed=0;
 for(let mask=0;mask<256;mask++){
  const s={coinfected:true,mask};assert.deepEqual(validateSimulations({reassortment:s}).reassortment,s);
  const r=reassortmentResult(s);assert.equal(r.sources.length,8);assert.equal(r.a+r.b,8);if(r.mixed)mixed++;
  for(let i=0;i<8;i++){assert.equal(r.sources[i],mask&(1<<i)?'B':'A');const n=reassortmentTransition(s,'toggle',i);assert.equal(n.mask^s.mask,1<<i);assert.deepEqual(reassortmentTransition(n,'toggle',i),s);}
 }
 assert.equal(mixed,254);
});
test('mixing requires coinfection and invalid segment input cannot alter the genome',()=>{
 const s=freshReassortment();for(let i=0;i<8;i++)assert.deepEqual(reassortmentTransition(s,'toggle',i),s);
 const both={coinfected:true,mask:85};for(const i of [-1,8,100,0.5,NaN,Infinity,'1'])assert.deepEqual(reassortmentTransition(both,'toggle',i),both);
 assert.deepEqual(reassortmentTransition(both,'single'),s);assert.deepEqual(reassortmentTransition(both,'reset'),s);
});
test('old backups gain defaults; new backups retain models; impossible states fail atomically',()=>{
 const old=freshState();delete old.simulations;assert.deepEqual(validateState(old).simulations,freshSimulations());
 const current=freshState();current.simulations.lambda=run('enter','integrate','divide','induce','copy');current.simulations.reassortment={coinfected:true,mask:165};assert.deepEqual(validateState(JSON.parse(JSON.stringify(current))),current);
 for(const bad of [{lambda:{stage:'released',generation:1,route:'lytic'}},{lambda:{stage:'attached',generation:0,route:'induced'}},{lambda:{stage:['attached'],generation:0,route:'induced'}},{lambda:{stage:'lysogen',generation:4,route:'lysogenic'}},{reassortment:{coinfected:false,mask:1}},{reassortment:{coinfected:true,mask:256}},{reassortment:{coinfected:'true',mask:2}},{unknown:{}}])assert.throws(()=>validateState({...current,simulations:bad}));
 assert.equal(current.simulations.reassortment.mask,165);
});
test('submissions contain static model diagrams, observations and limits without live controls',()=>{
 const s=freshState();s.simulations.lambda=run('enter','integrate','divide');s.simulations.reassortment={coinfected:true,mask:5};s.answers['segment-lab']={...emptyAnswer(),text:'My explanation.\n'+simulationSnapshot('reassortment',s.simulations.reassortment)};
 const html=submissionHtml(s);assert.ok(html.includes('1B, 2A, 3B, 4A, 5A, 6A, 7A, 8A'));assert.ok(html.includes('Host divisions followed: 1'));assert.ok(html.includes('viability and fitness are not predicted'));assert.ok(html.includes('My explanation.'));assert.ok(!html.includes('data-simulation'));assert.ok(!html.includes('<script'));assert.ok(!html.includes('<button'));
});
