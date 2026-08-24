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
  path.join(deck, 'composables', 'useGsapSlideTimeline.ts'),
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
const validScaffold = slideCount >= 3
if (!validScaffold) failed = true
console.log(`${validScaffold ? 'PASS' : 'FAIL'} scaffold has at least 3 studies (${slideCount})`)

const sourceGroups = {
  gsap: fs.readFileSync(path.join(deck, 'composables', 'useGsapSlideTimeline.ts'), 'utf8') + fs.readFileSync(path.join(deck, 'components', 'ParticleLedger.vue'), 'utf8') + fs.readFileSync(path.join(deck, 'components', 'ReflexTrace.vue'), 'utf8'),
  d3: fs.readFileSync(path.join(deck, 'components', 'TemperatureSettling.vue'), 'utf8'),
  canvas: fs.readFileSync(path.join(deck, 'components', 'DiffusionCanvas.vue'), 'utf8'),
}

for (const [label, source, tokens] of [
  ['GSAP lifecycle', sourceGroups.gsap, ['gsap.context', 'onSlideEnter', 'onSlideLeave', 'MotionPathPlugin', 'DrawSVGPlugin', 'timeline?.kill()']],
  ['D3 study', sourceGroups.d3, ['d3-scale', 'd3-shape', 'd3-array', 'includeAnomaly', 'resolution 0.1 °C']],
  ['Canvas study', sourceGroups.canvas, ['requestAnimationFrame', 'cancelAnimationFrame', '2000', 'seedParticles', 'useIsSlideActive']],
]) {
  for (const token of tokens) {
    const valid = source.includes(token)
    if (!valid) failed = true
    console.log(`${valid ? 'PASS' : 'FAIL'} ${label} contains ${token}`)
  }
}

if (failed) process.exit(1)
