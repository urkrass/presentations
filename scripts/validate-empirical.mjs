import assert from 'node:assert/strict'
import fs from 'node:fs'
import { commonFactor, calculateRatio, formulaCases } from '../decks/grade-8-empirical-formula/lib/ratios.ts'
const dir='decks/grade-8-empirical-formula'
const slides=fs.readFileSync(`${dir}/slides.md`,'utf8')
const notes=[...slides.matchAll(/<!--([\s\S]*?)-->/g)].map(m=>m[1])
assert.equal(notes.length,30)
for(const lesson of ['L1','L2']){
  const times=notes.filter(n=>n.trim().startsWith(lesson)).map(n=>Number(n.match(/· (\d+) min/)[1]))
  assert.equal(times.length,15);assert.equal(times.reduce((a,b)=>a+b,0),45)
}
for(let i=1;i<=5;i++)assert(slides.includes(`Exercise ${i}`))
assert(slides.includes('Grade 8'))
assert(!slides.includes('<hr'))
assert.equal(commonFactor([6,12,6]),6)
assert.equal(commonFactor([2,6,1]),1)
const expected=[[1,1],[1,1],[1,2,1],[2,3]]
for(const [i,sample] of formulaCases.entries()){
  for(const scale of [.5,1,2]){
    const r=calculateRatio(sample,scale)
    assert.deepEqual(r.whole,expected[i])
    r.moles.forEach((n,j)=>assert(Math.abs(n*sample.atomicMasses[j]-sample.masses[j]*scale)<1e-10))
  }
}
// Independent numeric checks for slide exercises, including percentage rounding.
const infer=(m,M)=>{const n=m.map((x,i)=>x/M[i]);return n.map(x=>x/Math.min(...n))}
const near=(a,b,tol=1e-10)=>assert(Math.abs(a-b)<tol,`${a} ≈ ${b}`)
infer([.72,.48],[24,16]).forEach(n=>near(n,1))
infer([1.2,.4],[12,1]).forEach((n,i)=>near(n,[1,4][i]))
infer([2.3,3.55],[23,35.5]).forEach(n=>near(n,1))
infer([70,30],[56,16]).forEach((n,i)=>near(n,[1,1.5][i]))
infer([40,6.7,53.3],[12,1,16]).forEach((n,i)=>near(n,[1,2,1][i],.012))
infer([52.2,13,34.8],[12,1,16]).forEach((n,i)=>near(n,[2,6,1][i],.023))
near(20.4-20.24,.16)
for(const name of ['copper-oxide.jpg','magnesium-burning.jpg'])assert(fs.statSync(`${dir}/public/images/${name}`).size>1000)
const credits=fs.readFileSync(`${dir}/public/image-credits.html`,'utf8')
for(const text of ['Adam Rędzikowski','Capt. John Yossarian','creativecommons.org/licenses/by-sa/3.0/','designed teaching data'])assert(credits.includes(text))
console.log('PASS 30 slides; two 45-minute lessons; five exercises; numerical fixtures; ratio invariance; image credits')
