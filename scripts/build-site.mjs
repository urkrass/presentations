import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dist = path.join(root, 'dist')
const slidev = path.join(root, 'node_modules', '@slidev', 'cli', 'bin', 'slidev.mjs')

function buildDeck(entry, base, output) {
  execFileSync(process.execPath, [slidev, 'build', entry, '--base', base, '--out', output], {
    cwd: root,
    stdio: 'inherit',
  })
}

fs.rmSync(dist, { recursive: true, force: true })
fs.mkdirSync(dist, { recursive: true })

buildDeck('slides.md', '/grade-8/stoichiometry/', path.join(dist, 'grade-8', 'stoichiometry'))
buildDeck('decks/grade-7-lab-measurement/slides.md', '/grade-7/lab-measurement/', path.join(dist, 'grade-7', 'lab-measurement'))
buildDeck('decks/grade-11-integration-control/slides.md', '/grade-11/integration-control/', path.join(dist, 'grade-11', 'integration-control'))
buildDeck('decks/ib-dp-a2-cells-viruses/slides.md', '/ib-dp/a2-cells-viruses/', path.join(dist, 'ib-dp', 'a2-cells-viruses'))
buildDeck('decks/visual-lab/slides.md', '/experiments/visual-lab/', path.join(dist, 'experiments', 'visual-lab'))

fs.cpSync(path.join(root, 'site'), dist, { recursive: true })
console.log('Combined presentation site built in dist/')
