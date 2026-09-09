import { execFileSync } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'
const root = process.cwd()
const base = process.env.SITE_BASE ? `/${process.env.SITE_BASE.replace(/^\/+|\/+$/g, '')}` : ''
execFileSync(process.execPath, [path.join(root,'node_modules/@slidev/cli/bin/slidev.mjs'),'build','decks/grade-8-empirical-formula/slides.md','--base',`${base}/grade-8/empirical-formula/`,'--out',path.join(root,'dist/grade-8/empirical-formula')], {cwd:root,stdio:'inherit'})
const index = path.join(root,'dist/grade-8/empirical-formula/index.html')
const restore = `<script>(()=>{const u=new URL(location.href);const target=u.searchParams.get('__slidev_redirect');if(target&&target.startsWith(location.pathname)){history.replaceState(null,'',target)}})()</script>`
fs.writeFileSync(index,fs.readFileSync(index,'utf8').replace('</head>',`${restore}</head>`))
