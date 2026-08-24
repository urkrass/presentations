import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const required = [
  'dist/index.html',
  'dist/styles.css',
  'dist/app.js',
  'dist/og.png',
  'dist/grade-7/lab-measurement/index.html',
  'dist/grade-7/lab-measurement/images/graduated-cylinders.jpg',
  'dist/grade-8/stoichiometry/index.html',
  'dist/grade-8/stoichiometry/images/fertilizer-works.jpg',
  'dist/grade-11/integration-control/index.html',
  'dist/grade-11/integration-control/images/nervous-system.svg',
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
for (const expected of ['Grade 7', 'Grade 8', 'Grade 11', '/grade-7/lab-measurement/', '/grade-8/stoichiometry/', '/grade-11/integration-control/', 'https://presentations-lime.vercel.app/og-v2.png']) {
  const valid = landing.includes(expected)
  if (!valid) failed = true
  console.log(`${valid ? 'PASS' : 'FAIL'} landing contains ${expected}`)
}

const vercelConfig = fs.readFileSync(path.join(root, 'vercel.json'), 'utf8')
for (const expected of ['/grade-11', '/grade-11/integration-control/:path*']) {
  const valid = vercelConfig.includes(expected)
  if (!valid) failed = true
  console.log(`${valid ? 'PASS' : 'FAIL'} Vercel route contains ${expected}`)
}

if (failed) process.exit(1)
