import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const required = [
  'dist/index.html',
  'dist/404.html',
  'dist/styles.css',
  'dist/app.js',
  'dist/og.png',
  'dist/grade-7/lab-measurement/index.html',
  'dist/grade-7/lab-measurement/images/graduated-cylinders.jpg',
  'dist/grade-8/stoichiometry/index.html',
  'dist/grade-8/mole-history/index.html',
  'dist/ib-dp/mole-history/index.html',
  'dist/ib-dp/mole-history/images/analytical-balance.jpg',
  'dist/ib-dp/mole-history/images/magnesium-burning.jpg',
  'dist/ib-dp/mole-history/images/limestone-quarry.jpg',
  'dist/ib-dp/mole-history/image-credits.html',
  'dist/grade-8/stoichiometry/images/fertilizer-works.jpg',
  'dist/grade-11/integration-control/index.html',
  'dist/grade-11/integration-control/images/nervous-system.svg',
  'dist/ib-dp/a2-cells-viruses/index.html',
  'dist/ib-dp/a2-cells-viruses/images/stromatolites.jpg',
  'dist/ib-dp/chemistry-kinetics/index.html',
  'dist/ib-dp/chemistry-kinetics/images/iodine-clock.jpg',
  'dist/experiments/visual-lab/index.html',
  'dist/og-v2.png',
]

let failed = false
for (const file of required) {
  const absolute = path.join(root, file)
  const valid = fs.existsSync(absolute) && fs.statSync(absolute).size > 100
  if (!valid) failed = true
  console.log(`${valid ? 'PASS' : 'FAIL'} ${file}`)
}

const landing = fs.readFileSync(path.join(root, 'dist', 'index.html'), 'utf8')
for (const file of ['index.html', '404.html']) {
  const content = fs.readFileSync(path.join(root, 'dist', file), 'utf8')
  const valid = content.includes('/ib-dp/mole-history/')
  if (!valid) failed = true
  console.log(`${valid ? 'PASS' : 'FAIL'} ${file} includes mole route`)
}
const moleEntry = fs.readFileSync(path.join(root, 'dist/ib-dp/mole-history/index.html'), 'utf8')
if (!moleEntry.includes("searchParams.get('__slidev_redirect')")) failed = true
if (!fs.readFileSync(path.join(root, 'vercel.json'), 'utf8').includes('/ib-dp/mole-history/:path*')) failed = true
const ibMenu = landing.split('id="ib-dp-deck"')[1] || ''
if (!ibMenu.includes('Four 45-minute lessons') || !ibMenu.includes('56 slides')) failed = true
const grade8Menu = (landing.split('id="grade-8-deck"')[1] || '').split('</section>')[0]
const audienceCorrect = ibMenu.includes('IB DP Year 1') && ibMenu.includes('/ib-dp/mole-history/') && !grade8Menu.includes('mole-history')
if (!audienceCorrect) failed = true
console.log(`${audienceCorrect ? 'PASS' : 'FAIL'} mole lesson belongs to IB DP Year 1, not Grade 8`)
const legacyMole = fs.readFileSync(path.join(root, 'dist/grade-8/mole-history/index.html'), 'utf8')
const aliasValid = legacyMole.includes('/ib-dp/mole-history') && legacyMole.includes('location.search+location.hash')
if (!aliasValid) failed = true
console.log(`${aliasValid ? 'PASS' : 'FAIL'} legacy mole links preserve slide, query and hash`)
const generatedGone = !landing.includes('counting-balance.png') && !fs.existsSync(path.join(root,'dist/ib-dp/mole-history/images/counting-balance.png')) && !fs.existsSync(path.join(root,'dist/grade-8/mole-history/images/counting-balance.png'))
if (!generatedGone) failed = true
console.log(`${generatedGone ? 'PASS' : 'FAIL'} generated mole artwork absent from published site`)
for (const expected of ['Grade 7', 'Grade 8', 'Grade 11', 'IB DP', '/grade-7/lab-measurement/', '/grade-8/stoichiometry/', '/grade-11/integration-control/', '/ib-dp/a2-cells-viruses/', '/ib-dp/chemistry-kinetics/', 'https://presentations-lime.vercel.app/og-v2.png']) {
  const valid = landing.includes(expected)
  if (!valid) failed = true
  console.log(`${valid ? 'PASS' : 'FAIL'} landing contains ${expected}`)
}

const notFound = fs.readFileSync(path.join(root, 'dist', '404.html'), 'utf8')
for (const expected of ['__slidev_redirect', '/grade-7/lab-measurement/', '/ib-dp/a2-cells-viruses/', '/ib-dp/chemistry-kinetics/']) {
  const valid = notFound.includes(expected)
  if (!valid) failed = true
  console.log(`${valid ? 'PASS' : 'FAIL'} route recovery contains ${expected}`)
}

const ibDeck = fs.readFileSync(path.join(root, 'dist', 'ib-dp', 'a2-cells-viruses', 'index.html'), 'utf8')
const restoresSlideRoute = ibDeck.includes("searchParams.get('__slidev_redirect')")
if (!restoresSlideRoute) failed = true
console.log(`${restoresSlideRoute ? 'PASS' : 'FAIL'} Slidev entry restores direct slide routes`)

const chemistryDeck = fs.readFileSync(path.join(root, 'dist', 'ib-dp', 'chemistry-kinetics', 'index.html'), 'utf8')
const chemistryRestoresSlideRoute = chemistryDeck.includes("searchParams.get('__slidev_redirect')")
if (!chemistryRestoresSlideRoute) failed = true
console.log(`${chemistryRestoresSlideRoute ? 'PASS' : 'FAIL'} chemistry Slidev entry restores direct slide routes`)

const vercelConfig = fs.readFileSync(path.join(root, 'vercel.json'), 'utf8')
for (const expected of ['/grade-11', '/grade-11/integration-control/:path*', '/ib-dp', '/ib-dp/a2-cells-viruses/:path*', '/ib-dp/chemistry-kinetics/:path*', '/experiments/visual-lab/:path*']) {
  const valid = vercelConfig.includes(expected)
  if (!valid) failed = true
  console.log(`${valid ? 'PASS' : 'FAIL'} Vercel route contains ${expected}`)
}

const hiddenExperiment = !landing.includes('/experiments/visual-lab/')
if (!hiddenExperiment) failed = true
console.log(`${hiddenExperiment ? 'PASS' : 'FAIL'} experiment route stays out of public grade menu`)

if (failed) process.exit(1)
