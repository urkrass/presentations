import fs from 'node:fs'

const slides = fs.readFileSync('decks/grade-11-integration-control/slides.md', 'utf8')
const css = fs.readFileSync('decks/grade-11-integration-control/styles/index.css', 'utf8')
const components = fs.readdirSync('decks/grade-11-integration-control/components').filter((file) => file.endsWith('.vue'))
const quickCheck = fs.readFileSync('decks/grade-11-integration-control/components/QuickCheck.vue', 'utf8')
const visualAssets = ['balance-beam.jpg', 'banana-ripening.jpg', 'brain-lateral.svg', 'cheetah-running.jpg', 'digestive-system.svg', 'myelin-diagram-en.svg', 'neuron-culture.jpg', 'onions-light.jpg', 'phototropism-seedlings.jpg', 'reflex-arc-en.jpg']

const checks = [
  ['at least 50 slides', slides.split(/\n---\n/g).length >= 50],
  ['source notes throughout', (slides.match(/\[Sources\]/g) ?? []).length >= 50],
  ['comparators limited to two high-value contrasts', (slides.match(/<BiologyComparator/g) ?? []).length === 2],
  ['five interleaved applied tests', (slides.match(/<QuickCheck/g) ?? []).length === 5],
  ['five distinct test silhouettes', ['centres-layout', 'route-track', 'evidence-test', 'pressure-test', 'ratio-test'].every((pattern) => quickCheck.includes(pattern))],
  ['flip cards used', (slides.match(/<ConceptFlipCards/g) ?? []).length >= 2],
  ['reflex builder used', slides.includes('<ReflexArcBuilder />')],
  ['auxin lab used', slides.includes('<AuxinLightLab />')],
  ['feedback lab used', slides.includes('<FeedbackLab />')],
  ['nine interactive and visual components', components.length >= 9],
  ['temporal mechanisms use dedicated traces', ['<JetLagShift />', '<ExerciseTrace />', '<StandingTrace />'].every((component) => slides.includes(component))],
  ['repeated case-card sequences removed', !/(route-map|exercise-chain|ratio-field|synthesis-map)/.test(slides)],
  ['sourced visuals replace homemade figures', ['cheetah-running.jpg', 'brain-lateral.svg', 'neuron-culture.jpg', 'myelin-diagram-en.svg', 'balance-beam.jpg', 'digestive-system.svg', 'banana-ripening.jpg'].every((asset) => slides.includes(asset))],
  ['all sourced visual files present', visualAssets.every((asset) => fs.existsSync(`decks/grade-11-integration-control/public/images/${asset}`))],
  ['no handmade figurative slide classes', !/(cheetah-figure|brain-shape|balance-figure|runner-field|gut-visual|plant-visual|banana-stages|onion-visual)/.test(slides)],
  ['HL content marked', slides.includes('higher level') && slides.includes('class="hl-tag"')],
  ['historical figure included', slides.includes('Charles and Francis Darwin')],
  ['real cases included', ['Jet lag', 'Exercise', 'standing up', 'ripening is both biology and logistics'].every((term) => slides.includes(term))],
  ['no HTML horizontal rules', !/<hr\b/i.test(slides)],
  ['no decorative CSS borders', !/border-(?:top|bottom)\s*:\s*(?!0(?:\s*;|\s*$))/im.test(css)],
  ['fixed classroom canvas', slides.includes('canvasWidth: 1280')],
]

let failed = false
for (const [label, valid] of checks) {
  if (!valid) failed = true
  console.log(`${valid ? 'PASS' : 'FAIL'} ${label}`)
}

if (failed) process.exit(1)
