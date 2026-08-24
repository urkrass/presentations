import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { PDFDocument } from 'pdf-lib'
import { chromium } from 'playwright-chromium'
import { startStaticSite } from './lib/start-static-site.mjs'

const root = process.cwd()
const withClicks = process.argv.includes('--with-clicks')
const outputFlag = process.argv.indexOf('--output')
const output = outputFlag >= 0
  ? path.resolve(root, process.argv[outputFlag + 1])
  : path.join(root, 'output', withClicks ? 'visual-lab-with-clicks.pdf' : 'visual-lab.pdf')
const clickStates = new Map([[1, 3], [2, 3], [4, 4], [5, 4]])

execFileSync(process.execPath, [path.join(root, 'scripts', 'build-experiments.mjs')], {
  cwd: root,
  stdio: 'inherit',
})

const site = await startStaticSite(root, path.join('experiments', 'visual-lab', 'index.html'))
const base = `${site.origin}/experiments/visual-lab`

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1366, height: 768 }, deviceScaleFactor: 1 })
await page.addInitScript(() => localStorage.setItem('visual-lab-motion-reduced', 'true'))
const pdf = await PDFDocument.create()
pdf.setTitle('Visual Experiments Laboratory')
pdf.setSubject(withClicks ? 'All deterministic Slidev click states' : 'Final state of each study')
pdf.setCreator('Slidev visual experimentation laboratory')

let exportedPages = 0
try {
  for (let slide = 1; slide <= 14; slide += 1) {
    await page.goto(`${base}/${slide}`, { waitUntil: 'domcontentloaded' })
    await page.locator(`.slidev-page-${slide}`).waitFor({ state: 'visible', timeout: 30000 })
    await page.waitForTimeout(slide === 13 ? 1100 : 260)

    const maxClicks = withClicks ? (clickStates.get(slide) ?? 0) : 0
    for (let click = 0; click <= maxClicks; click += 1) {
      if (click > 0) {
        await page.keyboard.press('ArrowRight')
        await page.waitForTimeout(180)
      }
      const visibleSlide = page.locator(`.slidev-page-${slide}`)
      const imageBytes = await visibleSlide.screenshot({ type: 'png', animations: 'disabled' })
      const image = await pdf.embedPng(imageBytes)
      const pdfPage = pdf.addPage([960, 540])
      pdfPage.drawImage(image, { x: 0, y: 0, width: 960, height: 540 })
      exportedPages += 1
    }
  }

  fs.mkdirSync(path.dirname(output), { recursive: true })
  fs.writeFileSync(output, await pdf.save())
}
finally {
  await browser.close()
  await site.close()
}

console.log(`Exported ${exportedPages} pages to ${path.relative(root, output)} (${withClicks ? 'with click states' : 'one page per study'})`)
