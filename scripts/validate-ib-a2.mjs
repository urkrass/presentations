import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const deck = path.join(root, 'decks', 'ib-dp-a2-cells-viruses')
const slides = fs.readFileSync(path.join(deck, 'slides.md'), 'utf8')
const css = fs.readFileSync(path.join(deck, 'styles', 'index.css'), 'utf8')
const components = fs.readdirSync(path.join(deck, 'components')).filter((file) => file.endsWith('.vue'))
const checks = []
const check = (name, pass, detail = '') => checks.push({ name, pass, detail })

const sourceBlocks = (slides.match(/\[Sources\]/g) || []).length
const quickChecks = (slides.match(/<QuickCheck/g) || []).length
const notes = (slides.match(/\[Teacher prompt\]/g) || []).length
const sections = ['A2.1', 'A2.2', 'A2.3']
const cases = ['Bennu', 'Miller', 'Hooke', 'Lederberg', 'smallpox', 'Patterson']

check('all syllabus sections present', sections.every((term) => slides.includes(term)), sections.join(', '))
check('scene-led components present', components.length >= 6, `${components.length} components`)
check('tests distributed through unit', quickChecks >= 3, `${quickChecks} quick checks`)
check('source notes are extensive', sourceBlocks >= 35, `${sourceBlocks} source blocks`)
check('teacher prompts are extensive', notes >= 35, `${notes} prompts`)
check('historical and real cases present', cases.every((term) => slides.toLowerCase().includes(term.toLowerCase())), cases.join(', '))
check('TOK and NOS present', slides.includes('TOK') && slides.includes('NOS'))
check('no decorative horizontal rules', !/<hr\b/i.test(slides) && !/border-(?:top|bottom)\s*:\s*(?!0)/i.test(css))
check('no authored SVG paths', !/<(?:svg|path|line|polyline)\b/i.test(slides + '\n' + components.map((file) => fs.readFileSync(path.join(deck, 'components', file), 'utf8')).join('\n')))
check('no missing local images', [...slides.matchAll(/(?:src=|image:)'?\"?images\/([^'\"\s)]+)/g)].every((match) => fs.existsSync(path.join(deck, 'public', 'images', match[1]))))

for (const result of checks) console.log(`${result.pass ? 'PASS' : 'FAIL'} ${result.name}${result.detail ? ` - ${result.detail}` : ''}`)
process.exit(checks.every(({ pass }) => pass) ? 0 : 1)
