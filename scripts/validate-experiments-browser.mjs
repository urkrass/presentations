import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { chromium } from 'playwright-chromium'
import { startStaticSite } from './lib/start-static-site.mjs'

const root = process.cwd()
if (process.env.VISUAL_LAB_SKIP_BUILD !== '1') {
  execFileSync(process.execPath, [path.join(root, 'scripts', 'build-experiments.mjs')], {
    cwd: root,
    stdio: 'inherit',
  })
}

const site = await startStaticSite(root, path.join('experiments', 'visual-lab', 'index.html'))
const base = `${site.origin}/experiments/visual-lab`
const browser = await chromium.launch({ headless: true })
const errors = []

function check(condition, message) {
  if (!condition) errors.push(message)
  console.log(`${condition ? 'PASS' : 'FAIL'} ${message}`)
}

try {
  const viewports = process.env.VISUAL_LAB_INTERACTIONS_ONLY === '1'
    ? []
    : [{ width: 1366, height: 768 }, { width: 1920, height: 1080 }]
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1 })
    await page.addInitScript(() => localStorage.setItem('visual-lab-motion-reduced', 'true'))
    page.on('pageerror', error => errors.push(`${viewport.width}x${viewport.height} page error: ${error.message}`))
    page.on('console', message => {
      if (message.type() === 'error') errors.push(`${viewport.width}x${viewport.height} console error: ${message.text()}`)
    })

    for (let slide = 1; slide <= 14; slide += 1) {
      await page.goto(`${base}/${slide}`, { waitUntil: 'domcontentloaded' })
      const current = page.locator(`.slidev-page-${slide}`)
      await current.waitFor({ state: 'visible', timeout: 30000 })
      await page.waitForTimeout(slide === 13 ? 900 : 120)
      const fit = await current.evaluate((element, size) => {
        const layout = element.querySelector('.slidev-layout')
        const box = element.getBoundingClientRect()
        return {
          withinViewport: box.left >= -1 && box.top >= -1 && box.right <= size.width + 1 && box.bottom <= size.height + 1,
          aspect: box.width / box.height,
          overflow: layout ? layout.scrollWidth > layout.clientWidth + 1 || layout.scrollHeight > layout.clientHeight + 1 : true,
          motionReduced: document.documentElement.classList.contains('lab-reduced-motion'),
          layoutClient: layout ? [layout.clientWidth, layout.clientHeight] : null,
          layoutScroll: layout ? [layout.scrollWidth, layout.scrollHeight] : null,
        }
      }, viewport)
      const fits = fit.withinViewport && Math.abs(fit.aspect - (16 / 9)) < 0.02 && !fit.overflow
      check(fits, `${viewport.width}x${viewport.height} slide ${slide} fits without overflow${fits ? '' : ` (${JSON.stringify(fit)})`}`)
      check(fit.motionReduced, `${viewport.width}x${viewport.height} slide ${slide} honours persistent reduced motion`)
    }
    await page.close()
  }

  const interactionPage = await browser.newPage({ viewport: { width: 1366, height: 768 } })
  await interactionPage.addInitScript(() => localStorage.setItem('visual-lab-motion-reduced', 'true'))
  interactionPage.on('pageerror', error => errors.push(`interaction page error: ${error.message}`))
  interactionPage.on('console', message => {
    if (message.type() === 'error') errors.push(`interaction console error: ${message.text()}`)
  })

  await interactionPage.goto(`${base}/1`, { waitUntil: 'domcontentloaded' })
  await interactionPage.locator('.slidev-page-1').waitFor({ state: 'visible' })
  check(await interactionPage.locator('.slidev-page-1 .native-node.active').count() === 0, 'native sequence starts in its quiet state')
  for (let click = 0; click < 3; click += 1) await interactionPage.keyboard.press('ArrowRight')
  check(await interactionPage.locator('.slidev-page-1 .native-node.active').count() === 3, 'native sequence reaches all three causal stages')
  for (let click = 0; click < 3; click += 1) await interactionPage.keyboard.press('ArrowLeft')
  check(await interactionPage.locator('.slidev-page-1 .native-node.active').count() === 0, 'native sequence restores its opening state')

  await interactionPage.goto(`${base}/2`, { waitUntil: 'domcontentloaded' })
  await interactionPage.locator('.slidev-page-2').waitFor({ state: 'visible' })
  const visibleSwitchCopy = () => interactionPage.locator('.slidev-page-2 blockquote').evaluateAll(elements =>
    elements.find(element => element.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }))?.textContent?.trim() ?? '')
  const openingQuestion = await visibleSwitchCopy()
  for (let click = 0; click < 3; click += 1) await interactionPage.keyboard.press('ArrowRight')
  check((await visibleSwitchCopy()).includes('restore'), 'VSwitch reaches its final auditable state')
  for (let click = 0; click < 3; click += 1) await interactionPage.keyboard.press('ArrowLeft')
  check(await visibleSwitchCopy() === openingQuestion, 'VSwitch restores its opening question')

  await interactionPage.goto(`${base}/4`, { waitUntil: 'domcontentloaded' })
  await interactionPage.locator('.slidev-page-4').waitFor({ state: 'visible' })
  await interactionPage.locator('.slidev-page-4 [data-renderer-state="ready"]').waitFor()
  const renderedReaction = interactionPage.locator('.slidev-page-4 .chemistry-reaction')
  const openingMarkup = await renderedReaction.innerHTML()
  check(await renderedReaction.locator('path, line').count() > 0, 'SmilesDrawer renders the chemical structures and reaction arrow')
  for (let click = 0; click < 4; click += 1) await interactionPage.keyboard.press('ArrowRight')
  check((await interactionPage.locator('.slidev-page-4 .chemistry-reading strong').innerText()).includes('audit complete'), 'chemistry sequence reaches its conservation audit')
  check((await interactionPage.locator('.slidev-page-4 .chemistry-reading p').innerText()).includes('both elements'), 'chemistry sequence states the conserved result')
  for (let click = 0; click < 4; click += 1) await interactionPage.keyboard.press('ArrowLeft')
  check((await interactionPage.locator('.slidev-page-4 .chemistry-reading strong').innerText()).includes('read the reaction'), 'chemistry sequence restores its opening explanation')
  check(await renderedReaction.innerHTML() === openingMarkup, 'library-rendered reaction remains unchanged across explanation states')

  await interactionPage.goto(`${base}/5`, { waitUntil: 'domcontentloaded' })
  await interactionPage.locator('.slidev-page-5').waitFor({ state: 'visible' })
  const openingTrace = await interactionPage.locator('.slidev-page-5 .reflex-source').evaluate(image => getComputedStyle(image).transform)
  for (let click = 0; click < 4; click += 1) await interactionPage.keyboard.press('ArrowRight')
  check((await interactionPage.locator('.slidev-page-5 .reflex-readout strong').innerText()).includes('brain informed'), 'reflex image sequence reaches the later brain-information state')
  for (let click = 0; click < 4; click += 1) await interactionPage.keyboard.press('ArrowLeft')
  await interactionPage.waitForTimeout(120)
  const restoredTrace = await interactionPage.locator('.slidev-page-5 .reflex-source').evaluate(image => getComputedStyle(image).transform)
  check((await interactionPage.locator('.slidev-page-5 .reflex-readout strong').innerText()).includes('ready'), 'reflex image sequence restores its opening label')
  check(openingTrace === restoredTrace, 'reflex source image restores its exact opening transform')

  await interactionPage.goto(`${base}/6`, { waitUntil: 'domcontentloaded' })
  await interactionPage.locator('.slidev-page-6').waitFor({ state: 'visible' })
  for (let reading = 0; reading < 6; reading += 1) await interactionPage.getByRole('button', { name: 'Add reading' }).click()
  check((await interactionPage.locator('.slidev-page-6 .settling-verdict').innerText()).includes('plateau'), 'temperature sequence reaches a reproducible plateau')
  await interactionPage.getByRole('button', { name: 'Show range' }).click()
  check(await interactionPage.locator('.slidev-page-6 .variability-band').isVisible(), 'temperature variability can be shown and hidden')
  await interactionPage.getByRole('button', { name: 'Reset' }).click()
  check(await interactionPage.locator('.slidev-page-6 .temperature-dot').count() === 4, 'temperature reset restores the seeded opening readings')

  await interactionPage.goto(`${base}/7`, { waitUntil: 'domcontentloaded' })
  await interactionPage.locator('.slidev-page-7').waitFor({ state: 'visible' })
  const meanWithAnomaly = await interactionPage.locator('.slidev-page-7 .temperature-readout p').first().innerText()
  await interactionPage.getByRole('button', { name: 'Exclude anomaly' }).click()
  const meanWithoutAnomaly = await interactionPage.locator('.slidev-page-7 .temperature-readout p').first().innerText()
  check(meanWithAnomaly !== meanWithoutAnomaly && await interactionPage.locator('.slidev-page-7 .temperature-dot.anomaly').count() === 0, 'anomaly decision visibly changes the D3 summary')
  await interactionPage.getByRole('button', { name: 'Restore anomaly' }).click()
  check(await interactionPage.locator('.slidev-page-7 .temperature-dot.anomaly').count() === 1, 'anomaly decision is reversible')

  await interactionPage.goto(`${base}/8`, { waitUntil: 'domcontentloaded' })
  await interactionPage.locator('.slidev-page-8 canvas').waitFor({ state: 'visible' })
  await interactionPage.getByRole('button', { name: 'Pause' }).click()
  check(await interactionPage.getByRole('button', { name: 'Resume' }).isVisible(), 'Canvas simulation can pause without losing its state')
  await interactionPage.getByRole('button', { name: 'Equilibrium' }).click()
  check((await interactionPage.locator('.slidev-page-8 .diffusion-readout').innerText()).includes('equilibrium sample'), 'Canvas simulation can jump to a deterministic equilibrium')

  await interactionPage.goto(`${base}/11`, { waitUntil: 'domcontentloaded' })
  await interactionPage.locator('.slidev-page-11 .scale-journey[data-stage="3"]').waitFor({ state: 'visible' })
  await interactionPage.reload({ waitUntil: 'domcontentloaded' })
  await interactionPage.locator('.slidev-page-11 .scale-journey[data-stage="3"]').waitFor({ state: 'visible' })
  check(await interactionPage.locator('.slidev-page-11 .scale-journey[data-stage="3"]').isVisible(), 'cross-scale middle slide reconstructs after refresh')

  await interactionPage.goto(`${base}/13`, { waitUntil: 'domcontentloaded' })
  await interactionPage.locator('.slidev-page-13').waitFor({ state: 'visible' })
  await interactionPage.locator('.molecule-stage canvas').waitFor({ state: 'visible', timeout: 30000 })
  await interactionPage.getByRole('button', { name: 'CH₄' }).click()
  await interactionPage.getByRole('button', { name: 'top' }).click()
  check(await interactionPage.getByRole('button', { name: 'CH₄' }).getAttribute('class') === 'active', '3D molecule selection is interactive')
  check(await interactionPage.getByRole('button', { name: 'top' }).getAttribute('class') === 'active', '3D fixed viewpoint selection is interactive')
  await interactionPage.getByRole('slider', { name: 'Turn molecule' }).fill('90')
  check(await interactionPage.getByRole('slider', { name: 'Turn molecule' }).inputValue() === '90', '3D user rotation is keyboard accessible')
  await interactionPage.getByRole('button', { name: 'Reset view' }).click()
  check(await interactionPage.getByRole('slider', { name: 'Turn molecule' }).inputValue() === '0', '3D reset restores the labelled front view')

  await interactionPage.goto(`${base}/overview`, { waitUntil: 'domcontentloaded' })
  await interactionPage.waitForTimeout(500)
  check(await interactionPage.locator('.slidev-page').count() >= 14, 'overview route renders all experiment studies')
  await interactionPage.goto(`${base}/presenter`, { waitUntil: 'domcontentloaded' })
  await interactionPage.waitForTimeout(500)
  check((await interactionPage.title()).includes('Visual Experiments Laboratory'), 'presenter route loads the experiment deck')
  await interactionPage.close()
}
finally {
  await browser.close()
  await site.close()
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
