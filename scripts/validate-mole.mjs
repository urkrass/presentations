import assert from 'node:assert/strict'
import fs from 'node:fs'
import { molarMass, massToAmount, amountToMass, predictProduct, reactions } from '../decks/ib-dp-mole-history/lib/stoichiometry.ts'

const dir = 'decks/ib-dp-mole-history'
const slides = fs.readFileSync(`${dir}/slides.md`, 'utf8')
const notes = [...slides.matchAll(/<!--([\s\S]*?)-->/g)].map(match => match[1])
assert.equal(notes.length, 56, 'every slide has teacher notes')
for (const lesson of ['L1', 'L2', 'L3', 'L4']) {
  const times = notes.filter(n => n.trim().startsWith(lesson)).map(n => Number(n.match(/· (\d+) min/)[1]))
  assert.equal(times.length, 14)
  assert.equal(times.reduce((a,b)=>a+b,0),45,`${lesson} totals45minutes`)
}
const visible = slides.replace(/<!--[\s\S]*?-->/g, '')
assert(!visible.includes('https://'), 'source URLs stay in notes')
for (let i = 1; i <= 5; i++) assert(visible.includes(`Exercise ${i}`), `mandatory exercise${i}`)
assert(visible.includes('6.022\\,140\\,76\\times10^{23}'))
assert(!visible.includes('6,022'), 'grouping spaces not comma separators')
assert(slides.includes('Avogadro did not') || slides.includes('did not measure'))
assert(slides.includes('Historical logic · before 20 May 2019'))
assert(slides.includes('3.0\\times10^{23}'), 'sensible rounding in9.0gexample')
for (const asset of ['analytical-balance.jpg','lavoisier.jpg','dalton.jpg','avogadro.jpg','silicon-sphere.png']) assert(fs.statSync(`${dir}/public/images/${asset}`).size > 1000)
assert(visible.includes('IB DP Year 1'), 'correct audience on cover and metadata')
assert(!visible.includes('Grade 8'), 'no Grade 8 audience label')
assert(!fs.existsSync(`${dir}/public/images/counting-balance.png`), 'generated artwork removed')
assert(!slides.includes('counting-balance.png'), 'no generated artwork references')
const credits = fs.readFileSync(`${dir}/public/image-credits.html`, 'utf8')
for (const term of ['Sarcyn','CC BY-SA 3.0','creativecommons.org/licenses/by-sa/3.0/','NIST','public domain']) assert(credits.includes(term), `published credit ${term}`)
assert(!visible.includes('<hr'), 'no decorative horizontal rules')
for (let i=6;i<=12;i++) assert(visible.includes('Exercise '+i), 'new exercise '+i)
for (const asset of ['magnesium-burning.jpg','limestone-quarry.jpg']) assert(fs.statSync(dir+'/public/images/'+asset).size>1000)
for (const credit of ['Capt. John Yossarian','Richard Webb','CC BY-SA 2.0']) assert(credits.includes(credit))
const near = (a,b) => assert(Math.abs(a-b)<1e-10, a+' expected '+b)
near(molarMass({Ca:1,C:1,O:3}),100.09)
near(molarMass({Ca:1,O:2,H:2}),74.10)
near(massToAmount(2.431,24.31),.1)
near(amountToMass(.125,44.01),5.50125)
near(amountToMass(.150,65.38),9.807)
near(massToAmount(.2500,24.31),.01028383381324558)
const fixtures = [
  [2.431,24.31,2,2,40.31,4.031],
  [4,32,1,2,40.31,10.0775],
  [10,100.09,1,1,56.08,5.602957338395444],
  [20,100.09,1,1,56.08,11.20591467679089],
  [6.538,65.38,1,1,2.02,.202],
  [8.40,84.01,2,1,44.01,2.200238066896798],
]
for (const [m,M,a,b,P,expected] of fixtures) near(predictProduct(m,M,a,b,P).productMass,expected)
near(Math.min(.100,.120/2)*2.02,.1212)
assert.equal((3.63/4.031*100).toPrecision(3),'90.1')
for (const r of reactions) {
  const result = predictProduct(5,r.reactantM,r.a,r.b,r.productM)
  near(predictProduct(10,r.reactantM,r.a,r.b,r.productM).productMass,2*result.productMass)
  near(amountToMass(result.reactantAmount,r.reactantM),5)
  assert(r.assumption.length>25)
}
for (const bad of [0,-1,NaN,Infinity]) {
  assert.throws(()=>massToAmount(bad,24.31),RangeError)
  assert.throws(()=>amountToMass(bad,24.31),RangeError)
  assert.throws(()=>predictProduct(1,24.31,bad,2,40.31),RangeError)
}
// Independently count atoms in the four distinct reactions used in lessons 3–4.
const balances = [
  [[{Mg:1},2],[{O:2},1],[{Mg:1,O:1},-2]],
  [[{Ca:1,C:1,O:3},1],[{Ca:1,O:1},-1],[{C:1,O:2},-1]],
  [[{Zn:1},1],[{H:1,Cl:1},2],[{Zn:1,Cl:2},-1],[{H:2},-1]],
  [[{Na:1,H:1,C:1,O:3},2],[{Na:2,C:1,O:3},-1],[{C:1,O:2},-1],[{H:2,O:1},-1]],
]
for (const equation of balances) {
  const totals={}
  for (const [atoms,coefficient] of equation) for (const [atom,count] of Object.entries(atoms)) totals[atom]=(totals[atom]||0)+coefficient*count
  assert(Object.values(totals).every(value=>value===0),'balanced atom inventory')
}
console.log('PASS 56 slides; four 45-minute lessons; 12 numbered exercises; balanced reactions, conversions, yields, licences and precision')
