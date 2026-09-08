import assert from 'node:assert/strict'
import fs from 'node:fs'

const dir = 'decks/ib-dp-mole-history'
const slides = fs.readFileSync(`${dir}/slides.md`, 'utf8')
const notes = [...slides.matchAll(/<!--([\s\S]*?)-->/g)].map(match => match[1])
assert.equal(notes.length, 28, 'every slide has teacher notes')
for (const lesson of ['L1', 'L2']) {
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
console.log('PASS 28 slides; 45 + 45 minutes; five mandatory exercises; source/asset and precision checks')
