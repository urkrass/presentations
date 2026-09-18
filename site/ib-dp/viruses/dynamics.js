// Biology rules are independent of rendering and wall-clock time.
// All numerical rates are illustrative. One model tick = 1/30 arbitrary time units.
export const DT=1/30,MAX_TICKS=2700,W=900,H=540,MAX_CELLS=32,MAX_PHAGES=512;
export const RUN_VERSION=1;
export const freshRun=(name,seed=20260918)=>({version:RUN_VERSION,seed,tick:0,config:name==='lambda'?{route:'lytic',receptors:true}:{coinfected:true},events:[]});
export const freshExperiments=()=>({lambda:freshRun('lambda'),reassortment:freshRun('reassortment')});
export function validateExperiments(data){
 const all=freshExperiments();if(data===undefined)return all;
 if(!data||Array.isArray(data)||typeof data!=='object'||Object.keys(data).some(k=>!Object.hasOwn(all,k)))throw Error('Invalid dynamic experiments.');
 for(const name of Object.keys(all)){
  const r=data[name];if(r===undefined)continue;
  if(!r||r.version!==RUN_VERSION||!Number.isInteger(r.seed)||r.seed<1||r.seed>2147483647||!Number.isInteger(r.tick)||r.tick<0||r.tick>MAX_TICKS||!r.config||!Array.isArray(r.events)||r.events.length>20)throw Error('Invalid simulation run.');
  const config=name==='lambda'?{route:r.config.route,receptors:r.config.receptors}:{coinfected:r.config.coinfected};
  if(name==='lambda'?(!['lytic','lysogenic'].includes(config.route)||typeof config.receptors!=='boolean'):typeof config.coinfected!=='boolean')throw Error('Invalid experiment conditions.');
  let previous=-1;const events=r.events.map(e=>{if(name!=='lambda'||!e||e.type!=='stress'||!Number.isInteger(e.tick)||e.tick<0||e.tick>r.tick||e.tick<=previous)throw Error('Invalid model event.');previous=e.tick;return {type:'stress',tick:e.tick};});
  all[name]={version:RUN_VERSION,seed:r.seed,tick:r.tick,config,events};
 }
 return all;
}
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
function random(w){w.rng=(Math.imul(w.rng,1664525)+1013904223)>>>0;return w.rng/4294967296;}
const between=(w,a,b)=>a+(b-a)*random(w);
function note(w,message){w.message=message;w.log.push({tick:w.tick,message});if(w.log.length>12)w.log.shift();}
function point(w){const a=between(w,0,Math.PI*2),r=Math.sqrt(random(w))*.91;return {x:360+Math.cos(a)*265*r,y:270+Math.sin(a)*215*r};}
function addCell(w,x,y,status='healthy'){const c={id:++w.nextId,x:clamp(x,55,845),y:clamp(y,55,485),vx:between(w,-2,2),vy:between(w,-2,2),angle:between(w,-.5,.5),status,age:0,division:between(w,0,5)};w.cells.push(c);return c;}
function addPhage(w,x,y){const a=between(w,0,Math.PI*2),v=between(w,36,65);w.phages.push({id:++w.nextId,x:clamp(x,15,885),y:clamp(y,15,525),vx:Math.cos(a)*v,vy:Math.sin(a)*v,angle:a});}
function addSegment(w,type,source){const p=point(w);w.segments.push({id:++w.nextId,...p,type,source,angle:between(w,-Math.PI,Math.PI),vx:between(w,-30,30),vy:between(w,-30,30),target:-1});}
export function newWorld(name,record=freshRun(name)){
 const w={name,config:{...record.config},seed:record.seed,rng:record.seed>>>0,tick:0,nextId:0,cells:[],phages:[],segments:[],stations:[],offspring:[],effects:[],history:[],log:[],message:'Press Play to begin.',capacity:false,lastEventTick:-1,stats:{infections:0,lysed:0,divisions:0,released:0,mixed:0,total:0},events:record.events.map(e=>({...e}))};
 if(name==='lambda'){
  for(let i=0;i<8;i++)addCell(w,145+(i%4)*200,150+Math.floor(i/4)*230);
  for(let i=0;i<18;i++)addPhage(w,between(w,35,865),between(w,35,505));
  // A nearby particle makes the first receptor-dependent contact easy to observe.
  Object.assign(w.phages[0],{x:83,y:150,vx:42,vy:0});
 }else{
  for(let i=0;i<64;i++)addSegment(w,i%8,w.config.coinfected&&i%16>=8?'B':'A');
  for(const y of [145,270,395])w.stations.push({id:++w.nextId,x:y===270?626:577,y,slots:Array(8).fill(null),collecting:null,cooldown:0});
 }
 w.history.push(sample(w));return w;
}
export function rebuildWorld(name,record){const w=newWorld(name,record);while(w.tick<record.tick&&!w.capacity)stepWorld(w);applyScheduledEvents(w);return w;}
function applyScheduledEvents(w){for(const e of w.events)if(e.tick===w.tick&&e.type==='stress'&&w.lastEventTick!==w.tick){induce(w);w.lastEventTick=w.tick;}}
function induce(w){let n=0;for(const c of w.cells)if(c.status==='lysogen'){c.status='infected';c.age=0;n++;}note(w,`Stress pulse: ${n} lysogen${n===1?'':'s'} entered the lytic route.`);}
export function stressPulse(w,record){if(w.name!=='lambda'||record.events.length>=20||record.events.some(e=>e.tick===w.tick)||!w.cells.some(c=>c.status==='lysogen'))return false;const e={tick:w.tick,type:'stress'};record.events.push({...e});w.events.push(e);applyScheduledEvents(w);return true;}
function move(w,p,speed=1){
 const kick=9*Math.sqrt(DT)*speed;p.vx+=between(w,-kick,kick);p.vy+=between(w,-kick,kick);
 const magnitude=Math.hypot(p.vx,p.vy);if(magnitude>75*speed){p.vx*=75*speed/magnitude;p.vy*=75*speed/magnitude;}
 p.x+=p.vx*DT;p.y+=p.vy*DT;
 if(p.x<15||p.x>W-15){p.x=clamp(p.x,15,W-15);p.vx*=-1;}if(p.y<15||p.y>H-15){p.y=clamp(p.y,15,H-15);p.vy*=-1;}
}
function lambdaStep(w){
 for(const p of w.phages){move(w,p);p.angle=Math.atan2(p.vy,p.vx);}
 const consumed=new Set();
 for(const c of w.cells){
  c.age+=DT;c.division+=DT;c.x=clamp(c.x+c.vx*DT,55,845);c.y=clamp(c.y+c.vy*DT,55,485);
  if(c.x===55||c.x===845)c.vx*=-1;if(c.y===55||c.y===485)c.vy*=-1;
  if(c.status==='healthy'&&w.config.receptors){const p=w.phages.find(p=>!consumed.has(p.id)&&((p.x-c.x)/45)**2+((p.y-c.y)/25)**2<1);if(p){consumed.add(p.id);c.status='entry';c.age=0;w.stats.infections++;w.effects.push({kind:'entry',x:c.x,y:c.y,life:1.4});note(w,`Phage DNA entered cell ${c.id}.`);}}
  if(c.status==='entry'&&c.age>=1.5){c.status=w.config.route==='lytic'?'infected':'lysogen';c.age=0;c.division=0;note(w,c.status==='lysogen'?`Cell ${c.id} carries an integrated prophage.`:`Cell ${c.id} is copying phage DNA and making proteins.`);}
  if(c.status==='infected'&&c.age>=7){c.status='assembly';c.age=0;note(w,`New phages are assembling in cell ${c.id}.`);}
  if(c.status==='assembly'&&c.age>=4){
   if(w.phages.length+12>MAX_PHAGES){w.capacity=true;note(w,'Particle limit reached. Save this run or reset.');break;}
   c.status='dead';w.stats.lysed++;w.stats.released+=12;w.effects.push({kind:'lysis',x:c.x,y:c.y,life:2});for(let i=0;i<12;i++)addPhage(w,c.x+between(w,-35,35),c.y+between(w,-24,24));note(w,`Cell ${c.id} lysed; 12 model phages were released.`);
  }
 }
 w.phages=w.phages.filter(p=>!consumed.has(p.id));w.cells=w.cells.filter(c=>c.status!=='dead');
 const parents=[...w.cells];for(const c of parents)if(['healthy','lysogen'].includes(c.status)&&c.division>=18&&w.cells.length<MAX_CELLS){c.division=0;c.x=clamp(c.x-23,55,845);const d=addCell(w,c.x+46,c.y+between(w,-20,20),c.status);d.division=0;w.stats.divisions++;w.effects.push({kind:'division',x:c.x+23,y:c.y,life:1.5});note(w,c.status==='lysogen'?'Host division: both daughters inherit the prophage.':'A host cell divided.');}
 // Soft spatial separation affects positions, never infection stage or inheritance.
 for(let i=0;i<w.cells.length;i++)for(let j=i+1;j<w.cells.length;j++){const a=w.cells[i],b=w.cells[j],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy);if(d>0&&d<72){const push=(72-d)*DT*1.6;a.x=clamp(a.x-dx/d*push,55,845);a.y=clamp(a.y-dy/d*push,55,485);b.x=clamp(b.x+dx/d*push,55,845);b.y=clamp(b.y+dy/d*push,55,485);}}
}
function segmentStep(w){
 for(const p of w.segments){
  if(p.target>=0){const station=w.stations[p.target],dx=station.x-p.x,dy=station.y-p.y,d=Math.hypot(dx,dy),travel=205*DT;
   if(d<travel){station.slots[p.type]=p.source;station.collecting=null;station.cooldown=.2;p.collected=true;}
   else{p.x+=dx/d*travel;p.y+=dy/d*travel;p.angle=Math.atan2(dy,dx);}
  }else{move(w,p,.65);const dx=(p.x-360)/265,dy=(p.y-270)/215,d=Math.hypot(dx,dy);if(d>.96){p.x=360+dx/d*265*.955;p.y=270+dy/d*215*.955;const dot=p.vx*dx/d+p.vy*dy/d;p.vx-=2*dot*dx/d;p.vy-=2*dot*dy/d;}p.angle+=.3*DT;}
 }
 const taken=w.segments.filter(p=>p.collected);w.segments=w.segments.filter(p=>!p.collected);for(const p of taken)addSegment(w,p.type,w.config.coinfected&&random(w)<.5?'B':'A');
 for(let i=0;i<w.stations.length;i++){
  const station=w.stations[i];station.cooldown-=DT;if(station.collecting!==null||station.cooldown>0)continue;
  const type=station.slots.findIndex(s=>s===null);
  if(type<0){const sources=[...station.slots],mixed=sources.includes('A')&&sources.includes('B');w.stats.total++;if(mixed)w.stats.mixed++;w.offspring.push({id:++w.nextId,x:station.x,y:station.y,sources,born:w.tick,mixed});if(w.offspring.length>36)w.offspring.shift();station.slots.fill(null);station.cooldown=1.1;w.effects.push({kind:'bud',x:station.x,y:station.y,life:1.3});note(w,`Particle ${w.stats.total} budded: ${sources.join('')} (${mixed?'mixed':'one parental source'}).`);}
  else{const candidates=w.segments.filter(p=>p.type===type&&p.target<0);if(candidates.length){const p=candidates[Math.floor(random(w)*candidates.length)];p.target=i;station.collecting=p.id;}}
 }
 for(const p of w.offspring){p.x=Math.min(870,p.x+28*DT);p.y=clamp(p.y+Math.sin((w.tick-p.born)/30+p.id)*4*DT,25,515);}
}
export function sample(w){return {tick:w.tick,living:w.cells.length,infected:w.cells.filter(c=>['entry','infected','assembly'].includes(c.status)).length,lysogens:w.cells.filter(c=>c.status==='lysogen').length,free:w.phages.length,lysed:w.stats.lysed,total:w.stats.total,mixed:w.stats.mixed};}
export function stepWorld(w){if(w.tick>=MAX_TICKS||w.capacity)return false;applyScheduledEvents(w);if(w.name==='lambda')lambdaStep(w);else segmentStep(w);w.effects.forEach(e=>e.life-=DT);w.effects=w.effects.filter(e=>e.life>0);w.tick++;if(w.tick%30===0)w.history.push(sample(w));return true;}
export class FixedClock{
 constructor(){this.accumulator=0;}
 advance(w,deltaMs,speed=1){if(!Number.isFinite(deltaMs)||deltaMs<0||![1,2,4].includes(speed))return 0;this.accumulator+=Math.min(deltaMs,100)*speed/1000;let steps=0;while(this.accumulator+1e-10>=DT&&steps<13){this.accumulator-=DT;if(!stepWorld(w)){this.accumulator=0;break;}steps++;}return steps;}
 reset(){this.accumulator=0;}
}
export function runSummary(name,record,world=rebuildWorld(name,record)){
 const s=sample(world),conditions=name==='lambda'?`${record.config.route}; receptors ${record.config.receptors?'available':'blocked'}`:record.config.coinfected?'A + B in one cell':'A only';
 const result=name==='lambda'?`${s.living} living hosts; ${s.infected} in the lytic/entry sequence; ${s.lysogens} lysogens; ${s.free} free phages; ${s.lysed} cells lysed.`:`${s.total} particles assembled; ${s.mixed} have mixed parental sources. Latest genome: ${world.offspring.at(-1)?.sources.map((v,i)=>`${i+1}${v}`).join(', ')||'none yet'}.`;
 return `Dynamic model observation — ${name==='lambda'?'lambda culture':'influenza packaging'}\nSeed ${record.seed}; model time ${(world.tick*DT).toFixed(1)}; ${conditions}.\n${result}\n${record.events.length?`Stress pulse times: ${record.events.map(e=>(e.tick*DT).toFixed(1)).join(', ')}.\n`:''}Illustrative model: positions, rates, time units and particle numbers are not experimental measurements. ${name==='lambda'?'All eligible lysogens respond to a model stress pulse.':'Equal source availability is assumed; compatibility and viability are not predicted.'}`;
}
