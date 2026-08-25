import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const deck = path.join(root, 'decks', 'visual-lab')
const slidesPath = path.join(deck, 'slides.md')
const requiredFiles = [
  slidesPath,
  path.join(deck, 'global-top.vue'),
  path.join(deck, 'styles', 'index.css'),
  path.join(deck, 'components', 'MotionPreference.vue'),
  path.join(deck, 'components', 'NativeBaseline.vue'),
  path.join(deck, 'components', 'ParticleLedger.vue'),
  path.join(deck, 'components', 'ReflexTrace.vue'),
  path.join(deck, 'components', 'TemperatureSettling.vue'),
  path.join(deck, 'components', 'DiffusionCanvas.vue'),
  path.join(deck, 'components', 'ScaleJourney.vue'),
  path.join(deck, 'components', 'MoleculeGeometry.vue'),
  path.join(deck, 'components', 'MoleculeGeometryScene.vue'),
  path.join(deck, 'composables', 'useGsapSlideTimeline.ts'),
  path.join(deck, 'FINDINGS.md'),
  path.join(root, 'scripts', 'build-experiments.mjs'),
  path.join(root, 'scripts', 'serve-experiments.mjs'),
  path.join(root, 'scripts', 'export-experiments.mjs'),
  path.join(root, 'scripts', 'validate-experiments-browser.mjs'),
]

let failed = false
for (const file of requiredFiles) {
  const valid = fs.existsSync(file) && fs.statSync(file).size > 20
  if (!valid) failed = true
  console.log(`${valid ? 'PASS' : 'FAIL'} ${path.relative(root, file)}`)
}

const slides = fs.readFileSync(slidesPath, 'utf8')
for (const expected of ['<NativeBaseline', '<VSwitch', 'v-click', 'v-motion', '[Sources]']) {
  const valid = slides.includes(expected) || fs.readFileSync(path.join(deck, 'components', 'NativeBaseline.vue'), 'utf8').includes(expected)
  if (!valid) failed = true
  console.log(`${valid ? 'PASS' : 'FAIL'} native baseline contains ${expected}`)
}

const separators = (slides.match(/^---$/gm) ?? []).length
const slideCount = Math.max(0, separators - 1)
const validScaffold = slideCount >= 12 && slideCount <= 15
if (!validScaffold) failed = true
console.log(`${validScaffold ? 'PASS' : 'FAIL'} deck contains 12–15 studies (${slideCount})`)

const sourceGroups = {
  gsap: fs.readFileSync(path.join(deck, 'composables', 'useGsapSlideTimeline.ts'), 'utf8') + fs.readFileSync(path.join(deck, 'components', 'ReflexTrace.vue'), 'utf8'),
  chemistry: fs.readFileSync(path.join(deck, 'components', 'ParticleLedger.vue'), 'utf8'),
  d3: fs.readFileSync(path.join(deck, 'components', 'TemperatureSettling.vue'), 'utf8'),
  canvas: fs.readFileSync(path.join(deck, 'components', 'DiffusionCanvas.vue'), 'utf8'),
  scale: fs.readFileSync(path.join(deck, 'components', 'ScaleJourney.vue'), 'utf8'),
  three: fs.readFileSync(path.join(deck, 'components', 'MoleculeGeometry.vue'), 'utf8') + fs.readFileSync(path.join(deck, 'components', 'MoleculeGeometryScene.vue'), 'utf8'),
}

const reflexSource = fs.readFileSync(path.join(deck, 'components', 'ReflexTrace.vue'), 'utf8')
for (const forbidden of ['<svg', '<path', '<line', 'DrawSVGPlugin', 'MotionPathPlugin']) {
  const absent = !reflexSource.includes(forbidden)
  if (!absent) failed = true
  console.log(`${absent ? 'PASS' : 'FAIL'} reflex study excludes authored overlay ${forbidden}`)
}

const temperatureSource = sourceGroups.d3
for (const forbidden of ['d3-shape', 'curveMonotoneX', 'temperature-line', 'mean-line', '<path']) {
  const absent = !temperatureSource.includes(forbidden)
  if (!absent) failed = true
  console.log(`${absent ? 'PASS' : 'FAIL'} temperature studies exclude ${forbidden}`)
}

const ledgerSource = sourceGroups.chemistry
for (const forbidden of ['product-halo', 'halo-one', 'halo-two', 'atom-disc', 'MotionPathPlugin', 'gsap', '<path', '<line']) {
  const absent = !ledgerSource.includes(forbidden)
  if (!absent) failed = true
  console.log(`${absent ? 'PASS' : 'FAIL'} particle ledger excludes authored overlay ${forbidden}`)
}

for (const [label, source, tokens] of [
  ['GSAP source-path reveal', sourceGroups.gsap, ['gsap.context', 'path261', 'path257', 'path259', 'reflex-source', 'context?.revert()']],
  ['Chemistry renderer', sourceGroups.chemistry, ['smiles-drawer', 'SmiDrawer', 'reactionStages', '[H:1][H:2]', '[O:5]=[O:6]', 'equation-balancing candidates']],
  ['D3 dot studies', sourceGroups.d3, ['d3-scale', 'd3-array', 'includeAnomaly', 'temperature-dot', 'resolution 0.1 °C']],
  ['Canvas study', sourceGroups.canvas, ['requestAnimationFrame', 'cancelAnimationFrame', '2000', 'seedParticles', 'useIsSlideActive']],
  ['Scale inspector', sourceGroups.scale, ['activeIndex', 'selectLevel', 'scale-inspection-window', 'gsap.fromTo', 'organism', 'organ', 'tissue', 'cell', 'receptor']],
  ['Limited 3D study', sourceGroups.three, ["import('./MoleculeGeometryScene.vue')", 'TresCanvas', 'render-mode="on-demand"', "getContext('webgl')", 'webgl-fallback', 'type="range"', 'Reset view', 'useIsSlideActive']],
]) {
  for (const token of tokens) {
    const valid = source.includes(token)
    if (!valid) failed = true
    console.log(`${valid ? 'PASS' : 'FAIL'} ${label} contains ${token}`)
  }
}

const stagePropAbsent = !sourceGroups.scale.includes('defineProps<{ stage')
if (!stagePropAbsent) failed = true
console.log(`${stagePropAbsent ? 'PASS' : 'FAIL'} scale inspector replaces slide-bound stage props with direct controls`)

const screenshotDir = path.join(deck, 'findings', 'screenshots')
const screenshots = fs.existsSync(screenshotDir)
  ? fs.readdirSync(screenshotDir).filter(name => /^study-\d{2}\.jpg$/.test(name) && fs.statSync(path.join(screenshotDir, name)).size > 20_000)
  : []
const screenshotCoverage = screenshots.length === slideCount
if (!screenshotCoverage) failed = true
console.log(`${screenshotCoverage ? 'PASS' : 'FAIL'} one review screenshot per study (${screenshots.length}/${slideCount})`)

const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
for (const [script, token] of [
  ['dev:experiments', 'serve-experiments.mjs'],
  ['build:experiments', 'build-experiments.mjs'],
  ['export:experiments', '--with-clicks'],
  ['validate:experiments', 'validate-experiments-browser.mjs'],
]) {
  const valid = packageJson.scripts?.[script]?.includes(token)
  if (!valid) failed = true
  console.log(`${valid ? 'PASS' : 'FAIL'} npm script ${script}`)
}

const repositorySource = [
  slides,
  ...Object.values(sourceGroups),
  fs.readFileSync(path.join(root, 'scripts', 'build-site.mjs'), 'utf8'),
  fs.readFileSync(path.join(root, 'scripts', 'validate-site.mjs'), 'utf8'),
].join('\n')
for (const forbidden of ['motion/vue', 'motion-v', 'ScrollTrigger']) {
  const absent = !repositorySource.includes(forbidden)
  if (!absent) failed = true
  console.log(`${absent ? 'PASS' : 'FAIL'} experiment source excludes ${forbidden}`)
}

const menu = fs.readFileSync(path.join(root, 'site', 'index.html'), 'utf8')
const routeIsIsolated = !menu.includes('/experiments/visual-lab/')
if (!routeIsIsolated) failed = true
console.log(`${routeIsIsolated ? 'PASS' : 'FAIL'} visual laboratory remains absent from grade menu`)

if (failed) process.exit(1)
