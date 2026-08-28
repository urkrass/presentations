import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const deck = path.join(root, 'decks', 'ib-dp-chemistry-kinetics')
const slides = fs.readFileSync(path.join(deck, 'slides.md'), 'utf8')
const css = fs.readFileSync(path.join(deck, 'styles', 'index.css'), 'utf8')
const componentFiles = fs.readdirSync(path.join(deck, 'components')).filter(file => file.endsWith('.vue'))
const componentSource = componentFiles.map(file => fs.readFileSync(path.join(deck, 'components', file), 'utf8')).join('\n')
const checks = []
const check = (name, pass, detail = '') => checks.push({ name, pass, detail })

const syllabus = Array.from({ length: 13 }, (_, index) => `2.2.${index + 1}`)
const interactions = ['RateCurveExplorer', 'CollisionChamber', 'ActivationThreshold', 'CatalystEvidence', 'EnergyProfileLab', 'MechanismStepper', 'MolecularitySort', 'MechanismEvidence', 'InitialRatesLab', 'OrderTrace', 'ArrheniusExplorer']
const localImages = [...slides.matchAll(/images\/([^'"\s)]+)/g)].map(match => match[1])

check('all Reactivity 2.2 syllabus statements present', syllabus.every(item => slides.includes(item)), syllabus.join(', '))
check('interactive scientific scenes distributed through unit', interactions.every(name => slides.includes(`<${name}`)), `${interactions.length} required scenes`)
check('retrieval tests distributed through unit', (slides.match(/<QuickCheck/g) || []).length >= 6, `${(slides.match(/<QuickCheck/g) || []).length} checks`)
check('investigations, TOK and NOS are present', slides.includes('Investigation I') && slides.includes('Investigation II') && slides.includes('TOK') && slides.includes('NOS'))
check('teacher prompts are extensive', (slides.match(/\[Teacher prompt\]/g) || []).length >= 40, `${(slides.match(/\[Teacher prompt\]/g) || []).length} prompts`)
check('historical cases are present', ['Arrhenius', 'Haber', 'Bosch', 'Wilhelmy', 'Michaelis', 'Eyring'].every(name => slides.includes(name)))
check('no decorative horizontal rules or underline styling', !/<hr\b/i.test(slides) && !/border-(?:top|bottom)\s*:/i.test(css + componentSource) && !/text-decoration\s*:\s*underline/i.test(css + componentSource))
check('all local images exist', localImages.every(file => fs.existsSync(path.join(deck, 'public', 'images', file))), `${new Set(localImages).size} images`)
check('components use no setTimeout choreography', !/setTimeout\s*\(/.test(componentSource))
check('purposeful component set exists', componentFiles.length >= 12, `${componentFiles.length} components`)

for (const result of checks) console.log(`${result.pass ? 'PASS' : 'FAIL'} ${result.name}${result.detail ? ` - ${result.detail}` : ''}`)
process.exit(checks.every(result => result.pass) ? 0 : 1)
