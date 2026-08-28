import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { chromium } from 'playwright-chromium'
import { startStaticSite } from './lib/start-static-site.mjs'

const root = process.cwd()
if (process.env.IB_CHEM_SKIP_BUILD !== '1') execFileSync(process.execPath, [path.join(root, 'scripts', 'build-ib-chem-kinetics.mjs')], { cwd: root, stdio: 'inherit' })

const site = await startStaticSite(root, path.join('ib-dp', 'chemistry-kinetics', 'index.html'))
const base = `${site.origin}/ib-dp/chemistry-kinetics`
const slideCount = 68
const browser = await chromium.launch({ headless: true })
const failures = []
const check = (condition, message) => { console.log(`${condition ? 'PASS' : 'FAIL'} ${message}`); if (!condition) failures.push(message) }
const watchErrors = (page, scope) => {
  page.on('pageerror', error => { if (!error.message.includes('Wake Lock permission request denied')) failures.push(`${scope} page error: ${error.message}`) })
  page.on('console', message => { if (message.type() === 'error' && !message.text().includes('Wake Lock permission request denied')) failures.push(`${scope} console error: ${message.text()}`) })
}

try {
  for (const viewport of [{ width: 1366, height: 768 }, { width: 1920, height: 1080 }]) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1 })
    await page.addInitScript(() => localStorage.setItem('ib-chem-kinetics-motion-reduced', 'true'))
    watchErrors(page, `${viewport.width}x${viewport.height}`)
    const bad = []
    for (let slide = 1; slide <= slideCount; slide += 1) {
      await page.goto(`${base}/${slide}`, { waitUntil: 'domcontentloaded' })
      const current = page.locator(`.slidev-page-${slide}`)
      await current.waitFor({ state: 'visible', timeout: 30000 })
      await page.waitForTimeout(35)
      const result = await current.evaluate((element, size) => {
        const layout = element.querySelector('.slidev-layout')
        const box = element.getBoundingClientRect()
        const visibleText = Array.from(element.querySelectorAll('h1,h2,h3,p,li,button,figcaption,th,td,label,output'))
          .filter(node => { const style = getComputedStyle(node); const rect = node.getBoundingClientRect(); return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > .05 && rect.width > 1 && rect.height > 1 })
        return {
          viewport: box.left >= -1 && box.top >= -1 && box.right <= size.width + 1 && box.bottom <= size.height + 1,
          aspect: box.width / box.height,
          overflow: layout ? layout.scrollWidth > layout.clientWidth + 2 || layout.scrollHeight > layout.clientHeight + 2 : true,
          tiny: visibleText.filter(node => Number.parseFloat(getComputedStyle(node).fontSize) < 10).length,
          reduced: document.documentElement.classList.contains('deck-reduced-motion'),
        }
      }, viewport)
      if (!result.viewport || Math.abs(result.aspect - 16 / 9) > .02 || result.overflow || result.tiny || !result.reduced) bad.push({ slide, ...result })
    }
    check(!bad.length, `${viewport.width}x${viewport.height}: all ${slideCount} routes fit and remain projection-safe${bad.length ? ` (${JSON.stringify(bad)})` : ''}`)
    await page.close()
  }

  const page = await browser.newPage({ viewport: { width: 1366, height: 768 }, deviceScaleFactor: 1 })
  await page.addInitScript(() => localStorage.setItem('ib-chem-kinetics-motion-reduced', 'false'))
  watchErrors(page, 'interactions')

  await page.goto(`${base}/8`, { waitUntil: 'domcontentloaded' })
  const rate = page.locator('.slidev-page-8 .rate-explorer')
  const rateBox = await rate.boundingBox()
  const rateSlider = rate.getByRole('slider')
  const before = Number(await rateSlider.inputValue())
  await rateSlider.focus(); await page.keyboard.press('ArrowRight')
  check(Number(await rateSlider.inputValue()) > before, 'rate graph preserves native keyboard slider control')
  await rate.getByRole('button', { name: 'Instantaneous' }).click()
  check((await rate.locator('output').innerText()).toLowerCase().includes('tangent slope'), 'rate graph changes from average to instantaneous analysis')
  const rateBoxAfter = await rate.boundingBox()
  check(Boolean(rateBox && rateBoxAfter && Math.abs(rateBox.height - rateBoxAfter.height) < 1), 'rate graph state changes without moving the composition')

  await page.goto(`${base}/21`, { waitUntil: 'domcontentloaded' })
  const chamber = page.locator('.slidev-page-21 .collision-lab')
  check(await chamber.getAttribute('data-animation-state') === 'running', 'collision model runs only while its slide is active')
  const pixelsA = await chamber.locator('canvas').screenshot()
  await page.waitForTimeout(180)
  const pixelsB = await chamber.locator('canvas').screenshot()
  check(!pixelsA.equals(pixelsB), 'collision particles visibly change position')
  await page.keyboard.press('ArrowRight'); await page.locator('.slidev-page-22').waitFor({ state: 'visible' })
  check(await chamber.getAttribute('data-animation-state') === 'paused', 'collision model pauses off-slide')

  await page.goto(`${base}/33`, { waitUntil: 'domcontentloaded' })
  const flip = page.locator('.slidev-page-33 .flip-card').first()
  await flip.focus(); await page.keyboard.press('Enter')
  check(await flip.getAttribute('aria-pressed') === 'true', 'catalyst flip card operates from the keyboard')
  check((await flip.locator('.flip-inner').evaluate(element => getComputedStyle(element).transform)) !== 'none', 'catalyst card uses CSS 3D transformation')

  await page.goto(`${base}/50`, { waitUntil: 'domcontentloaded' })
  const trace = page.locator('.slidev-page-50 .evidence-spoiler article').first()
  const traceBox = await trace.boundingBox()
  check((await trace.locator('.trace').evaluate(element => getComputedStyle(element).filter)) !== 'none', 'mechanism evidence opens blurred')
  await trace.getByRole('button').click(); await page.waitForTimeout(550)
  check((await trace.locator('.trace').evaluate(element => getComputedStyle(element).filter)) === 'none', 'mechanism evidence reveals independently')
  const traceBoxAfter = await trace.boundingBox()
  check(Boolean(traceBox && traceBoxAfter && Math.abs(traceBox.height - traceBoxAfter.height) < 1), 'mechanism reveal does not shift surrounding rows')

  await page.goto(`${base}/54`, { waitUntil: 'domcontentloaded' })
  const lab = page.locator('.slidev-page-54 .rates-lab')
  await lab.getByRole('button', { name: 'A', exact: true }).click(); await lab.getByRole('button', { name: 'Reveal deduction' }).click(); await page.waitForTimeout(550)
  check((await lab.locator('.deduction').innerText()).includes('rate = k[A]²[B]'), 'initial-rates lab reveals the evidence-based rate law')

  await page.emulateMedia({ media: 'print', reducedMotion: 'reduce' })
  await page.goto(`${base}/50`, { waitUntil: 'domcontentloaded' })
  check((await page.locator('.slidev-page-50 .trace').first().evaluate(element => getComputedStyle(element).filter)) === 'none', 'print mode renders blurred evidence as readable text')
  await page.close()
}
finally {
  await browser.close()
  await site.close()
}

check(!failures.length, 'no unexpected console or page errors were detected')
if (failures.length) { console.error(failures.join('\n')); process.exit(1) }
