import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dist = path.join(root, 'dist')
const slidev = path.join(root, 'node_modules', '@slidev', 'cli', 'bin', 'slidev.mjs')
const siteBase = process.env.SITE_BASE
  ? `/${process.env.SITE_BASE.replace(/^\/+|\/+$/g, '')}`
  : ''

function publicPath(route) {
  return `${siteBase}${route}`
}

const deckRoutes = [
  '/grade-8/stoichiometry/',
  '/grade-7/lab-measurement/',
  '/grade-11/integration-control/',
  '/ib-dp/a2-cells-viruses/',
  '/ib-dp/chemistry-kinetics/',
  '/experiments/visual-lab/',
]

function addRouteRecovery(output) {
  const indexPath = path.join(output, 'index.html')
  const restoreScript = `<script>(()=>{const u=new URL(location.href);const target=u.searchParams.get('__slidev_redirect');if(target&&target.startsWith(location.pathname)){history.replaceState(null,'',target)}})()</script>`
  const index = fs.readFileSync(indexPath, 'utf8').replace('</head>', `${restoreScript}</head>`)
  fs.writeFileSync(indexPath, index)
}

function buildDeck(entry, base, output) {
  execFileSync(process.execPath, [slidev, 'build', entry, '--base', base, '--out', output], {
    cwd: root,
    stdio: 'inherit',
  })
}

fs.rmSync(dist, { recursive: true, force: true })
fs.mkdirSync(dist, { recursive: true })

buildDeck('slides.md', publicPath('/grade-8/stoichiometry/'), path.join(dist, 'grade-8', 'stoichiometry'))
buildDeck('decks/grade-7-lab-measurement/slides.md', publicPath('/grade-7/lab-measurement/'), path.join(dist, 'grade-7', 'lab-measurement'))
buildDeck('decks/grade-11-integration-control/slides.md', publicPath('/grade-11/integration-control/'), path.join(dist, 'grade-11', 'integration-control'))
buildDeck('decks/ib-dp-a2-cells-viruses/slides.md', publicPath('/ib-dp/a2-cells-viruses/'), path.join(dist, 'ib-dp', 'a2-cells-viruses'))
buildDeck('decks/ib-dp-chemistry-kinetics/slides.md', publicPath('/ib-dp/chemistry-kinetics/'), path.join(dist, 'ib-dp', 'chemistry-kinetics'))
buildDeck('decks/visual-lab/slides.md', publicPath('/experiments/visual-lab/'), path.join(dist, 'experiments', 'visual-lab'))

addRouteRecovery(path.join(dist, 'grade-8', 'stoichiometry'))
addRouteRecovery(path.join(dist, 'grade-7', 'lab-measurement'))
addRouteRecovery(path.join(dist, 'grade-11', 'integration-control'))
addRouteRecovery(path.join(dist, 'ib-dp', 'a2-cells-viruses'))
addRouteRecovery(path.join(dist, 'ib-dp', 'chemistry-kinetics'))
addRouteRecovery(path.join(dist, 'experiments', 'visual-lab'))

fs.cpSync(path.join(root, 'site'), dist, { recursive: true })
if (siteBase) {
  const landingPath = path.join(dist, 'index.html')
  const landing = fs.readFileSync(landingPath, 'utf8')
    .replaceAll('href="/', `href="${siteBase}/`)
    .replaceAll('src="/', `src="${siteBase}/`)
  fs.writeFileSync(landingPath, landing)
}
const publicDeckRoutes = deckRoutes.map(publicPath)
const notFound = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Opening presentation…</title></head><body><p>Opening presentation…</p><script>(()=>{const bases=${JSON.stringify(publicDeckRoutes)};const base=bases.find(item=>location.pathname.startsWith(item));if(base){const target=location.pathname+location.search+location.hash;location.replace(base+'?__slidev_redirect='+encodeURIComponent(target))}else{location.replace(${JSON.stringify(`${siteBase}/`)})}})()</script></body></html>`
fs.writeFileSync(path.join(dist, '404.html'), notFound)
fs.writeFileSync(path.join(dist, '.nojekyll'), '')
console.log('Combined presentation site built in dist/')
