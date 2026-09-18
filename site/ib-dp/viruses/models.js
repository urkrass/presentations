// Discrete teaching models: no timers, empirical rates, or random outcomes.
export const SIMULATION_PAGES={lambda:'lambda-lab',reassortment:'segment-lab'};
export const SIMULATION_TITLES={lambda:'Lambda life cycle',reassortment:'Influenza reassortment'};
export const freshLambda=()=>({stage:'attached',generation:0,route:'undecided'});
export const freshReassortment=()=>({coinfected:false,mask:0});
export const freshSimulations=()=>({lambda:freshLambda(),reassortment:freshReassortment()});
export const lambdaStages={
 attached:{title:'Attached to the host',description:'The tail contacts a compatible receptor. The DNA is still inside the capsid.',actions:[['enter','Deliver DNA']]},
 entered:{title:'DNA has entered',description:'The capsid stays outside. Choose a route to explore; this button does not represent a real probability.',actions:[['lytic','Lytic route'],['integrate','Integrate DNA']]},
 lysogen:{title:'An integrated prophage',description:'Phage DNA is part of the chromosome. Divide the host or model induction by a stress.',actions:[['divide','Divide host'],['induce','Induce prophage']]},
 excised:{title:'Induction and excision',description:'The prophage has left the chromosome. Follow this cell into the lytic route.',actions:[['copy','Copy DNA + proteins']]},
 synthesis:{title:'Genome and protein synthesis',description:'Viral DNA is copied; host ribosomes make viral proteins. No new complete virions are shown yet.',actions:[['assemble','Assemble virions']]},
 assembled:{title:'New virions assembled',description:'Genomes have been packaged into protein capsids. The new particles are still inside the host.',actions:[['lyse','Lyse and release']]},
 released:{title:'Lysis releases the virions',description:'The host has broken open. Shown particle numbers are illustrative, not a measured burst size.',actions:[]}
};
export function lambdaTransition(s,action){
 if(action==='reset')return freshLambda();
 const transitions={attached:{enter:'entered'},entered:{lytic:'synthesis',integrate:'lysogen'},lysogen:{induce:'excised'},excised:{copy:'synthesis'},synthesis:{assemble:'assembled'},assembled:{lyse:'released'}};
 if(s.stage==='lysogen'&&action==='divide'&&s.generation<3)return {...s,generation:s.generation+1};
 const options=Object.hasOwn(transitions,s.stage)?transitions[s.stage]:{};const stage=Object.hasOwn(options,action)?options[action]:null;if(!stage)return {...s};
 const route=action==='lytic'?'lytic':action==='integrate'?'lysogenic':action==='induce'?'induced':s.route;
 return {...s,stage,route};
}
export function reassortmentTransition(s,action,segment){
 if(action==='reset'||action==='single')return freshReassortment();
 if(action==='coinfect')return {...s,coinfected:true};
 if(action==='toggle'&&s.coinfected&&Number.isInteger(segment)&&segment>=0&&segment<8)return {...s,mask:s.mask^(1<<segment)};
 return {...s};
}
export const segmentSources=s=>Array.from({length:8},(_,i)=>s.mask&(1<<i)?'B':'A');
export function reassortmentResult(s){const sources=segmentSources(s),b=sources.filter(x=>x==='B').length;return {sources,a:8-b,b,mixed:b>0&&b<8,label:b===0?'All segments from A':b===8?'All segments from B':'Mixed parental sources'};}
export function validateSimulations(value){
 const defaults=freshSimulations();if(value===undefined)return defaults;
 if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).some(k=>!Object.hasOwn(defaults,k)))throw Error('Invalid simulation data.');
 for(const key of Object.keys(defaults)){
  const s=value[key];if(s===undefined)continue;
  if(!s||typeof s!=='object'||Array.isArray(s))throw Error('Invalid simulation state.');
  if(key==='lambda'){
   if(typeof s.stage!=='string'||!['undecided','lytic','lysogenic','induced'].includes(s.route)||!Object.hasOwn(lambdaStages,s.stage)||!Number.isInteger(s.generation)||s.generation<0||s.generation>3)throw Error('Invalid lambda model.');
   const valid=['attached','entered'].includes(s.stage)?s.route==='undecided'&&s.generation===0:s.stage==='lysogen'?s.route==='lysogenic':s.stage==='excised'?s.route==='induced':s.route==='induced'||s.route==='lytic'&&s.generation===0;
   if(!valid)throw Error('Impossible lambda model state.');
   defaults.lambda={stage:s.stage,generation:s.generation,route:s.route};
  }else{
   if(typeof s.coinfected!=='boolean'||!Number.isInteger(s.mask)||s.mask<0||s.mask>255||!s.coinfected&&s.mask!==0)throw Error('Invalid segment model.');
   defaults.reassortment={coinfected:s.coinfected,mask:s.mask};
  }
 }
 return defaults;
}
export function simulationSnapshot(name,s){
 if(name==='lambda')return `Model observation — lambda\nStage: ${lambdaStages[s.stage].title}. Route: ${s.route}. Host divisions followed: ${s.generation}.\n${lambdaStages[s.stage].description}\nThis is a qualitative model of one lineage; it predicts neither timing nor particle counts.`;
 const r=reassortmentResult(s);return `Model observation — influenza reassortment\nViruses in the same cell: ${s.coinfected?'A and B':'A only'}. Segments: ${r.sources.map((v,i)=>`${i+1}${v}`).join(', ')}.\n${r.label}: ${r.a} from A, ${r.b} from B. One intact copy of each of the eight segment types.\nSegment compatibility, viability and fitness are not predicted by this model.`;
}
export const simulationNotes={
 lambda:[
  ['Try both routes','Deliver the DNA. First follow the lytic route to release. Reset, integrate the DNA, then divide the host. Induce the prophage to connect the two routes.'],
  ['Follow one lineage','Each Divide host step shows two daughter cells that inherit the prophage. Continue with one of those daughters. The model stops at three divisions; real lysogeny is not limited to three.'],
  ['What the model leaves out','Route buttons expose possible outcomes. They do not estimate their probabilities. Stress represents an induction signal; not every stress induces every cell. Molecular regulation and elapsed time are omitted.'],
  ['Keep useful evidence','Save observation appends a labelled snapshot to this activity’s text answer. Your current model also autosaves and appears in your backup and submission. Reset changes only the model; it keeps your recorded answers.']
 ],
 reassortment:[
  ['Try changing the source','Start with A only: B segments are unavailable. Choose A + B to model coinfection of the same cell. Tap a numbered segment to switch its whole parental source.'],
  ['Eight types, eight slots','The numbers identify the same segment types in both parents. Each model genome keeps exactly one of every type. A colour and a letter show its source. Bars are schematic, not actual segment lengths.'],
  ['Combinations are not probabilities','Two possible parental sources for each of eight types give 2⁸ = 256 source patterns, including two unmixed patterns. The other 254 are mixed. This count assumes every source choice is allowed; it says nothing about their likelihood.'],
  ['Biological limits','Real segment packaging, compatibility and selection restrict which combinations can emerge and persist. A mixed genome is not automatically viable, more infectious, or an antigenic shift. No nucleotide mutation is being modelled.'],
  ['Keep useful evidence','Save observation appends the numbered segment sources to your answer. The current model also autosaves and is included in exports. Reset keeps saved observations. Compare two snapshots, then write your explanation.']
 ]
};
