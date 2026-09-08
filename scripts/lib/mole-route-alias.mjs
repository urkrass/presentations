import fs from 'node:fs'
import path from 'node:path'

// Preserve published slide numbers, query/click state and hash after reclassification.
export function moleLegacyRedirectScript(siteBase = '') {
  return `const oldMole=${JSON.stringify(`${siteBase}/grade-8/mole-history`)};if(location.pathname===oldMole||location.pathname.startsWith(oldMole+'/')){location.replace(${JSON.stringify(`${siteBase}/ib-dp/mole-history`)}+location.pathname.slice(oldMole.length)+location.search+location.hash);return}`
}

export function writeMoleLegacyRedirect(root, siteBase = '') {
  const output = path.join(root, 'dist', 'grade-8', 'mole-history')
  const destination = `${siteBase}/ib-dp/mole-history/`
  fs.mkdirSync(output, { recursive: true })
  fs.writeFileSync(path.join(output, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>The mole · IB DP Year 1</title><link rel="canonical" href="${destination}"></head><body><p>This lesson is for IB DP Year 1. <a href="${destination}">Open the mole lesson</a>.</p><script>(()=>{${moleLegacyRedirectScript(siteBase)}})()</script></body></html>`)
}
