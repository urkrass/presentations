import fs from 'node:fs'

const slides = fs.readFileSync('decks/grade-11-integration-control/slides.md', 'utf8')
const css = fs.readFileSync('decks/grade-11-integration-control/styles/index.css', 'utf8')
const components = fs.readdirSync('decks/grade-11-integration-control/components').filter((file) => file.endsWith('.vue'))

const checks = [
  ['at least 50 slides', slides.split(/\n---\n/g).length >= 50],
  ['source notes throughout', (slides.match(/\[Sources\]/g) ?? []).length >= 50],
  ['interactive comparator used repeatedly', (slides.match(/<BiologyComparator/g) ?? []).length >= 6],
  ['flip cards used', (slides.match(/<ConceptFlipCards/g) ?? []).length >= 2],
  ['reflex builder used', slides.includes('<ReflexArcBuilder />')],
  ['auxin lab used', slides.includes('<AuxinLightLab />')],
  ['feedback lab used', slides.includes('<FeedbackLab />')],
  ['five interactive components', components.length >= 5],
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
