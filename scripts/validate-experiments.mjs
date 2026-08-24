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

if (failed) process.exit(1)
