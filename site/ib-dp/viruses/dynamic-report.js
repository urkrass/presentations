import {escapeHtml as E} from '../rate-expressions/format.js';
import {DT,MAX_TICKS,rebuildWorld,runSummary,sample} from './dynamics.js';
export function plotSvg(w){
 const rows=[...w.history];if(rows.at(-1)?.tick!==w.tick)rows.push(sample(w));
 const keys=w.name==='lambda'?['living','lysed']:['total','mixed'],labels=w.name==='lambda'?['Living hosts','Cumulative lysis']:['All progeny','Mixed genomes'];
 const max=Math.max(4,...rows.flatMap(r=>keys.map(k=>r[k]))),top=Math.ceil(max/4)*4;
 const line=k=>rows.map((r,i)=>`${i?'L':'M'}${64+r.tick/MAX_TICKS*516} ${222-r[k]/top*174}`).join(' ');
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 290" role="img" aria-label="${E(labels.join(' and '))} against arbitrary model time" style="font-family:Arial,sans-serif"><rect width="620" height="290" fill="white"/>${[0,1,2,3,4].map(i=>`<path d="M64 ${222-i*43.5}H580" stroke="#dce3e5"/><text x="51" y="${227-i*43.5}" text-anchor="end" font-size="15" fill="#57616c">${top*i/4}</text>`).join('')}<text x="64" y="26" font-size="17">Count</text>${keys.map((k,i)=>`<path d="${line(k)}" fill="none" stroke="${i?'#c4085e':'#346d61'}" stroke-width="3"/>`).join('')}<path d="M64 48V222H580" fill="none" stroke="#65717c"/>${[0,30,60,90].map(t=>`<text x="${64+t/90*516}" y="245" text-anchor="middle" font-size="15">${t}</text>`).join('')}<text x="322" y="276" text-anchor="middle" font-size="16">Model time · arbitrary units</text><text x="192" y="25" fill="#346d61" font-size="16">${labels[0]}</text><text x="397" y="25" fill="#c4085e" font-size="16">${labels[1]}</text></svg>`;
}
export function dynamicReport(name,record){const w=rebuildWorld(name,record);return `<div class="reading-block"><p><strong>Dynamic experiment record</strong></p><figure class="science-figure">${plotSvg(w)}<figcaption>${E(runSummary(name,record,w)).replaceAll('\n','<br>')}</figcaption></figure></div>`;}
export const dynamicNotes={
 lambda:[
  ['Try a controlled comparison','Press Play. With receptors available, moving phages can attach to cells. Observe DNA entry, synthesis, assembly and lysis. Pause whenever you want; Save observation records the counts and conditions.'],
  ['Change the experiment','Choose lytic or lysogenic infection and available or blocked receptors. Restart with settings begins a fresh run with the same seed. Reset repeats the current conditions. New trial changes the seed.'],
  ['Follow inheritance and induction','In the lysogenic condition, infected cells keep a prophage and pass it to both daughters during division. Pulse stress moves all current lysogens into the lytic sequence. Cells infected later still follow your chosen route.'],
  ['Model rules and limits','This is a qualitative culture model. Motion is a random walk; receptor contact permits entry. Entry, synthesis and assembly take 1.5, 7 and 4 arbitrary time units. Lysis releases 12 model phages. These timings and numbers are invented, not measurements.'],
  ['What is left out','Cell division pauses at 32 living cells; runs end at 90 model time units or 512 free particles. Real regulation, nutrient depletion, immunity to superinfection, phage decay and stress-response probabilities are omitted. All eligible model lysogens respond to the stress pulse.'],
  ['Reading the output','Results plots living hosts and cumulative lysis; the counter also tracks free phages and lysogens. A seed repeats the same model trial. Frame rate and playback speed do not alter its rules. Runs save paused and resume from the same model tick.']
 ],
 reassortment:[
  ['Watch assembly happen','Press Play. RNA–protein segments move within one model cell. Packaging sites recruit one of each of the eight segment types. After eight arrive, a complete particle buds from the membrane. Click a particle, or choose Inspect latest, to read its segment sources.'],
  ['Compare two infections','Run A only, then restart with A + B in the same cell. Mixed genomes can appear only when both parental sources are available. Save an observation from each condition and compare the cumulative outputs under Results.'],
  ['A rule, not a movie','Sources are sampled from the available segment pool using a saved random seed. The positions and assembly time evolve as recruited segments travel to a packaging site. Every completed genome contains exactly one of each numbered type; whole segments retain their source.'],
  ['Model rules and limits','Equal A/B availability is assumed during coinfection. Segment recruitment, transport, replication and budding are highly simplified. Timings, locations, particle counts and lengths are illustrative. Packaging compatibility, viability, fitness and immunity are not predicted.'],
  ['Keep the distinction clear','Reassortment mixes intact segments. No nucleotide mutation is modelled here. A mixed particle is not automatically viable or an antigenic shift. The display retains the 36 most recent particles; cumulative counts include all completed model particles.']
 ]
};
