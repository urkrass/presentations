import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const slidev = path.join(root, 'node_modules', '@slidev', 'cli', 'bin', 'slidev.mjs')
const output = path.join(root, 'dist', 'ib-dp', 'chemistry-kinetics')

fs.rmSync(output, { recursive: true, force: true })
fs.mkdirSync(path.dirname(output), { recursive: true })
execFileSync(process.execPath, [
  slidev,
  'build',
  'decks/ib-dp-chemistry-kinetics/slides.md',
  '--base',
  '/ib-dp/chemistry-kinetics/',
  '--out',
  output,
], { cwd: root, stdio: 'inherit' })
