#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const args = parseArgs(process.argv.slice(2))
const cwd = process.cwd()
const slidesPath = path.resolve(cwd, args.slides ?? 'slides.md')
const cssPath = path.resolve(cwd, args.css ?? 'styles/index.css')
const componentsDir = path.resolve(cwd, args.components ?? 'components')
const maxWordsPerSlide = Number(args['max-words-per-slide'] ?? 120)

const checks = []
const warnings = []

function check(name, pass, detail = '') {
  checks.push({ name, pass, detail })
}

const slides = read(slidesPath)
const css = read(cssPath)
const componentFiles = listFiles(componentsDir, '.vue')
const componentText = componentFiles.map(read).join('\n')

check('slides.md exists', Boolean(slides), slidesPath)
check('styles/index.css exists', Boolean(css), cssPath)
check('interactive components exist', componentFiles.length >= 5, `${componentFiles.length} found`)

const requiredTokens = {
  '--paper': '#fbfaf6',
  '--paper-deep': '#f3efe7',
  '--paper-warm': '#f7f3eb',
  '--ink': '#171717',
  '--charcoal': '#2f302d',
  '--muted': '#706d66',
  '--quiet': '#8a867d',
  '--accent': '#8d3f2e',
  '--accent-2': '#496b5a',
  '--accent-3': '#315b7d',
  '--field-radius': '6px',
}

for (const [token, value] of Object.entries(requiredTokens)) {
  check(
    `palette token ${token}`,
    new RegExp(`${escapeRegExp(token)}\\s*:\\s*${escapeRegExp(value)}\\s*;`, 'i').test(css),
    `${token}: ${value}`,
  )
}

check('paper background', /\.slidev-layout\s*{[^}]*background:\s*var\(--paper\)/s.test(css))
check('serif slide titles', /\.slidev-layout h1\s*{[^}]*font-family:\s*Georgia/s.test(css))
check('stable 1280 canvas', /canvasWidth:\s*1280/.test(slides))
check('no markdown tables', !/^\s*\|.+\|\s*$/m.test(stripInvisible(slides)))
check('no HTML tables', !/<\/?table\b/i.test(stripInvisible(slides)))
check('no visible flip/back labels', !/>\s*(flip|back|flip back)\s*</i.test(stripScriptsAndStyles(`${slides}\n${componentText}`)))
check('speaker notes present', (slides.match(/Presenter notes:/g) ?? []).length >= 20)
check('source blocks present', (slides.match(/\[Sources\]/g) ?? []).length >= 6)
check('mole path is explicit', /mass A[\s\S]*moles A[\s\S]*moles B[\s\S]*mass B/i.test(slides))

for (const file of componentFiles) {
  const source = read(file)
  if (!source.includes('<button')) continue
  check(`button types in ${path.basename(file)}`, !/<button(?![^>]*type=)/s.test(source))
  check(`focus style in ${path.basename(file)}`, /focus-visible/.test(source))
}

const chunks = slides.split(/\n---\n/g)
chunks.forEach((slide, index) => {
  const words = countWords(slide)
  if (words > maxWordsPerSlide) warnings.push(`slide ${index + 1} has ${words} visible words`)
})

for (const result of checks) {
  console.log(`${result.pass ? 'PASS' : 'FAIL'} ${result.name}${result.detail ? ` - ${result.detail}` : ''}`)
}
for (const warning of warnings) console.warn(`WARN text economy: ${warning}`)

process.exit(checks.every(({ pass }) => pass) ? 0 : 1)

function parseArgs(argv) {
  const parsed = {}
  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index]
    if (!item.startsWith('--')) continue
    const key = item.slice(2)
    const next = argv[index + 1]
    if (!next || next.startsWith('--')) parsed[key] = true
    else {
      parsed[key] = next
      index += 1
    }
  }
  return parsed
}

function read(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : ''
}

function listFiles(dir, extension) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const resolved = path.join(dir, entry.name)
    return entry.isDirectory() ? listFiles(resolved, extension) : path.extname(entry.name) === extension ? [resolved] : []
  })
}

function stripInvisible(source) {
  return source.replace(/<!--[\s\S]*?-->/g, '').replace(/```[\s\S]*?```/g, '')
}

function stripScriptsAndStyles(source) {
  return stripInvisible(source).replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '')
}

function countWords(slide) {
  const visible = stripScriptsAndStyles(slide)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .replace(/[{}()[\]="'/:.,;!?→×÷=+−]/g, ' ')
  return (visible.match(/[A-Za-z0-9][A-Za-z0-9'’-]*/g) ?? []).length
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
