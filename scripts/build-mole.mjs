import { execFileSync } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'
import { writeMoleLegacyRedirect } from './lib/mole-route-alias.mjs'

const root = process.cwd()
const base = process.env.SITE_BASE ? `/${process.env.SITE_BASE.replace(/^\/+|\/+$/g, '')}` : ''
execFileSync(process.execPath, [
  path.join(root, 'node_modules/@slidev/cli/bin/slidev.mjs'),
  'build', 'decks/ib-dp-mole-history/slides.md',
  '--base', `${base}/ib-dp/mole-history/`,
  '--out', path.join(root, 'dist/ib-dp/mole-history'),
], { cwd: root, stdio: 'inherit' })
// Match the combined site's Pages deep-link recovery for a standalone rebuild.
const indexPath = path.join(root, 'dist/ib-dp/mole-history/index.html')
const restore = `<script>(()=>{const u=new URL(location.href);const target=u.searchParams.get('__slidev_redirect');if(target&&target.startsWith(location.pathname)){history.replaceState(null,'',target)}})()</script>`
fs.writeFileSync(indexPath, fs.readFileSync(indexPath, 'utf8').replace('</head>', `${restore}</head>`))
writeMoleLegacyRedirect(root, base)
