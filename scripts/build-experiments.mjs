import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const slidev = path.join(root, 'node_modules', '@slidev', 'cli', 'bin', 'slidev.mjs')
const output = path.join(root, 'dist', 'experiments', 'visual-lab')

fs.rmSync(output, { recursive: true, force: true })
fs.mkdirSync(path.dirname(output), { recursive: true })
execFileSync(process.execPath, [
  slidev,
  'build',
  'decks/visual-lab/slides.md',
  '--base',
  '/experiments/visual-lab/',
  '--out',
  output,
], {
  cwd: root,
  stdio: 'inherit',
})
