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
const slideCount = 15
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

    for (let slide = 1; slide <= slideCount; slide += 1) {
      await page.goto(`${base}/${slide}`, { waitUntil: 'domcontentloaded' })
      const current = page.locator(`.slidev-page-${slide}`)
      await current.waitFor({ state: 'visible', timeout: 30000 })
      await page.waitForTimeout(slide === 11 ? 900 : slide >= 13 ? 1300 : 120)
      if (slide >= 13) {
        await current.locator('.boiling-beaker[data-renderer-state="ready"] canvas').first().waitFor({ timeout: 30000 })
      }
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
  await interactionPage.locator('.slidev-page-4 [data-renderer-stage="0"][data-renderer-state="ready"]').waitFor()
  const renderedReaction = interactionPage.locator('.slidev-page-4 .chemistry-reaction')
  const reactionStates = [await renderedReaction.innerHTML()]
  const reactionSignature = () => renderedReaction.evaluate(svg => ({
    viewBox: svg.getAttribute('viewBox'),
    molecules: svg.querySelectorAll(':scope > svg').length,
    paths: svg.querySelectorAll('path').length,
    lines: svg.querySelectorAll('line').length,
    text: svg.textContent,
    colours: Array.from(svg.querySelectorAll('[fill], [stroke]')).map(element => [element.getAttribute('fill'), element.getAttribute('stroke')]),
  }))
  const openingSignature = await reactionSignature()
  check(await renderedReaction.locator('path, line').count() > 0, 'SmilesDrawer renders the chemical structures and reaction arrow')
  for (let click = 1; click <= 4; click += 1) {
    await interactionPage.keyboard.press('ArrowRight')
    await interactionPage.locator(`.slidev-page-4 [data-renderer-stage="${click}"][data-renderer-state="ready"]`).waitFor()
    reactionStates.push(await renderedReaction.innerHTML())
  }
  check(new Set(reactionStates).size === 5, 'every chemistry click produces a distinct SmilesDrawer rendering state')
  check((await interactionPage.locator('.slidev-page-4 .chemistry-reading strong').innerText()).includes('audit complete'), 'chemistry sequence reaches its conservation audit')
  check((await interactionPage.locator('.slidev-page-4 .chemistry-reading p').innerText()).includes('every atom'), 'chemistry sequence states the conserved result')
  for (let click = 3; click >= 0; click -= 1) {
    await interactionPage.keyboard.press('ArrowLeft')
    await interactionPage.locator(`.slidev-page-4 [data-renderer-stage="${click}"][data-renderer-state="ready"]`).waitFor()
  }
  check((await interactionPage.locator('.slidev-page-4 .chemistry-reading strong').innerText()).includes('start with a candidate'), 'chemistry sequence restores its opening explanation')
  check(JSON.stringify(await reactionSignature()) === JSON.stringify(openingSignature), 'SmilesDrawer restores the opening candidate after reversing')

  await interactionPage.goto(`${base}/5`, { waitUntil: 'domcontentloaded' })
  await interactionPage.locator('.slidev-page-5').waitFor({ state: 'visible' })
  await interactionPage.locator('.slidev-page-5 [data-source-ready="true"]').waitFor()
  const reflexPathState = () => interactionPage.locator('.slidev-page-5 .reflex-source').evaluate((source) => {
    const document = source.contentDocument
    return ['path261', 'path257', 'path259'].map(id => document?.getElementById(id)?.style.opacity ?? '')
  })
  const reflexStates = [await reflexPathState()]
  for (let click = 0; click < 4; click += 1) {
    await interactionPage.keyboard.press('ArrowRight')
    reflexStates.push(await reflexPathState())
  }
  check(new Set(reflexStates.map(state => JSON.stringify(state))).size === 5, 'reflex clicks reveal five distinct states of the source pathways')
  check((await interactionPage.locator('.slidev-page-5 .reflex-readout strong').innerText()).includes('whole reflex arc'), 'reflex image sequence reaches the complete source-path state')
  check((await reflexPathState()).every(opacity => Number(opacity) === 1), 'final reflex state shows all three original source pathways together')
  for (let click = 0; click < 4; click += 1) await interactionPage.keyboard.press('ArrowLeft')
  check((await interactionPage.locator('.slidev-page-5 .reflex-readout strong').innerText()).includes('complete anatomy'), 'reflex image sequence restores its opening label')
  check(JSON.stringify(await reflexPathState()) === JSON.stringify(reflexStates[0]), 'reflex source pathways restore their exact opening visibility')

  await interactionPage.goto(`${base}/6`, { waitUntil: 'domcontentloaded' })
  await interactionPage.locator('.slidev-page-6').waitFor({ state: 'visible' })
  for (let reading = 0; reading < 6; reading += 1) await interactionPage.getByRole('button', { name: 'Add reading' }).click()
  check((await interactionPage.locator('.slidev-page-6 .settling-verdict').innerText()).includes('plateau'), 'temperature sequence reaches a reproducible plateau')
  check(await interactionPage.locator('.slidev-page-6 .temperature-dot').count() === 10, 'temperature dot plot shows one mark per observation without a connecting trace')
  await interactionPage.getByRole('button', { name: 'Show range' }).click()
  check(await interactionPage.locator('.slidev-page-6 .variability-band').isVisible(), 'temperature variability can be shown and hidden')
  await interactionPage.getByRole('button', { name: 'Reset' }).click()
  check(await interactionPage.locator('.slidev-page-6 .temperature-dot').count() === 4, 'temperature reset restores the seeded opening readings')

  await interactionPage.goto(`${base}/7`, { waitUntil: 'domcontentloaded' })
  await interactionPage.locator('.slidev-page-7').waitFor({ state: 'visible' })
  const meanWithAnomaly = await interactionPage.locator('.slidev-page-7 .temperature-readout p').first().innerText()
  await interactionPage.getByRole('button', { name: 'Exclude anomaly' }).click()
  const meanWithoutAnomaly = await interactionPage.locator('.slidev-page-7 .temperature-readout p').first().innerText()
  check(meanWithAnomaly !== meanWithoutAnomaly && await interactionPage.locator('.slidev-page-7 .temperature-dot.anomaly.excluded').count() === 1, 'anomaly decision changes the summary while keeping the observation visible')
  await interactionPage.getByRole('button', { name: 'Restore anomaly' }).click()
  check(await interactionPage.locator('.slidev-page-7 .temperature-dot.anomaly:not(.excluded)').count() === 1, 'anomaly decision is reversible')

  await interactionPage.goto(`${base}/8`, { waitUntil: 'domcontentloaded' })
  await interactionPage.locator('.slidev-page-8 canvas').waitFor({ state: 'visible' })
  await interactionPage.getByRole('button', { name: 'Pause' }).click()
  check(await interactionPage.getByRole('button', { name: 'Resume' }).isVisible(), 'Canvas simulation can pause without losing its state')
  await interactionPage.getByRole('button', { name: 'Equilibrium' }).click()
  check((await interactionPage.locator('.slidev-page-8 .diffusion-readout').innerText()).includes('equilibrium sample'), 'Canvas simulation can jump to a deterministic equilibrium')

  await interactionPage.goto(`${base}/10`, { waitUntil: 'domcontentloaded' })
  const scaleInspector = interactionPage.locator('.slidev-page-10 .scale-inspector')
  await scaleInspector.waitFor({ state: 'visible' })
  check(await scaleInspector.getAttribute('data-level') === 'organism', 'scale inspector opens with the whole organism and no inspection window')
  const fixedContextSource = await scaleInspector.locator('.scale-base > img').getAttribute('src')
  for (const [index, level] of ['organ', 'tissue', 'cell', 'receptor'].entries()) {
    await scaleInspector.locator('.scale-controls button').nth(index + 1).click()
    await interactionPage.locator(`.slidev-page-10 .scale-inspector[data-level="${level}"][data-window-state="visible"]`).waitFor()
    await scaleInspector.locator('.scale-inspection-window').waitFor({ state: 'visible' })
    check(await scaleInspector.locator('.scale-inspection-window').isVisible(), `scale inspector shows the ${level} window without changing slides`)
    check(await scaleInspector.locator('.scale-base > img').getAttribute('src') === fixedContextSource, `${level} selection keeps the organism image fixed`)
  }
  check(await scaleInspector.locator('.receptor-question').isVisible(), 'receptor level ends with an explicit conceptual question')
  await scaleInspector.locator('.scale-controls button').first().click()
  await interactionPage.locator('.slidev-page-10 .scale-inspector[data-level="organism"][data-window-state="hidden"]').waitFor()
  await scaleInspector.locator('.scale-inspection-window').waitFor({ state: 'hidden' })
  check(!await scaleInspector.locator('.scale-inspection-window').isVisible(), 'returning to organism hides only the inspection window')
  await interactionPage.reload({ waitUntil: 'domcontentloaded' })
  await interactionPage.locator('.slidev-page-10 .scale-inspector[data-level="organism"][data-window-state="hidden"]').waitFor({ state: 'visible' })
  check(await interactionPage.locator('.slidev-page-10 .scale-inspector[data-level="organism"]').isVisible(), 'scale inspector restores its opening context after refresh')

  await interactionPage.goto(`${base}/11`, { waitUntil: 'domcontentloaded' })
  await interactionPage.locator('.slidev-page-11').waitFor({ state: 'visible' })
  await interactionPage.locator('.molecule-stage canvas').waitFor({ state: 'visible', timeout: 30000 })
  await interactionPage.getByRole('button', { name: 'CH₄' }).click()
  await interactionPage.getByRole('button', { name: 'top' }).click()
  check(await interactionPage.getByRole('button', { name: 'CH₄' }).getAttribute('class') === 'active', '3D molecule selection is interactive')
  check(await interactionPage.getByRole('button', { name: 'top' }).getAttribute('class') === 'active', '3D fixed viewpoint selection is interactive')
  await interactionPage.getByRole('slider', { name: 'Turn molecule' }).fill('90')
  check(await interactionPage.getByRole('slider', { name: 'Turn molecule' }).inputValue() === '90', '3D user rotation is keyboard accessible')
  await interactionPage.getByRole('button', { name: 'Reset view' }).click()
  check(await interactionPage.getByRole('slider', { name: 'Turn molecule' }).inputValue() === '0', '3D reset restores the labelled front view')

  await interactionPage.goto(`${base}/13`, { waitUntil: 'domcontentloaded' })
  const boiling = interactionPage.locator('.slidev-page-13 .boiling-beaker')
  await boiling.locator('canvas').waitFor({ state: 'visible', timeout: 30000 })
  await interactionPage.getByRole('button', { name: '20°C', exact: true }).click()
  check(await boiling.getAttribute('data-intensity') === 'still' && await boiling.getAttribute('data-active-bubbles') === '0', '20°C preset produces a stable bubble-free state')
  await interactionPage.getByRole('button', { name: 'rolling', exact: true }).click()
  const rollingCount = Number(await boiling.getAttribute('data-active-bubbles'))
  check(await boiling.getAttribute('data-intensity') === 'rolling' && rollingCount > 0, 'rolling preset produces a deterministic active boil')
  await interactionPage.getByRole('button', { name: '100°C gentle', exact: true }).click()
  const gentleCount = Number(await boiling.getAttribute('data-active-bubbles'))
  check(await boiling.getAttribute('data-intensity') === 'gentle' && rollingCount > gentleCount && gentleCount > 0, 'gentle and rolling presets produce immediately distinct bubble populations')
  await interactionPage.getByRole('slider', { name: 'Temperature' }).fill('90')
  check(await boiling.getAttribute('data-temperature') === '90' && await boiling.getAttribute('data-intensity') === 'near-boil', 'temperature slider selects a sensible intermediate state')
  await interactionPage.getByRole('button', { name: 'Inspect model' }).click()
  check(await boiling.getAttribute('data-debug') === 'true' && await interactionPage.locator('.slidev-page-13 .boiling-debug-readout').isVisible(), 'debug mode exposes the simulation readout on demand')

  await interactionPage.goto(`${base}/14`, { waitUntil: 'domcontentloaded' })
  await interactionPage.locator('.slidev-page-14 .boiling-beaker[data-renderer-state="ready"] canvas').waitFor({ timeout: 30000 })
  check(await interactionPage.locator('.slidev-page-14 .legacy-svg-source svg').isVisible(), 'comparison retains the sourced SVG boiling reference')
  check(await interactionPage.locator('.slidev-page-14 .boiling-comparison-side').count() === 2, 'comparison presents one SVG and one WebGL field')

  await interactionPage.goto(`${base}/15`, { waitUntil: 'domcontentloaded' })
  const debugBeaker = interactionPage.locator('.slidev-page-15 .boiling-beaker')
  await debugBeaker.locator('canvas').waitFor({ state: 'visible', timeout: 30000 })
  check(await debugBeaker.getAttribute('data-debug') === 'true' && await interactionPage.locator('.slidev-page-15 .boiling-debug-svg').isVisible(), 'dedicated debug study exposes nucleation points and clip bounds')

  const lifecyclePage = await browser.newPage({ viewport: { width: 1366, height: 768 } })
  await lifecyclePage.addInitScript(() => localStorage.setItem('visual-lab-motion-reduced', 'false'))
  lifecyclePage.on('pageerror', error => errors.push(`lifecycle page error: ${error.message}`))
  lifecyclePage.on('console', message => {
    if (message.type() === 'error') errors.push(`lifecycle console error: ${message.text()}`)
  })
  await lifecyclePage.goto(`${base}/13`, { waitUntil: 'domcontentloaded' })
  await lifecyclePage.locator('.slidev-page-13 .boiling-beaker[data-loop-state="running"]').waitFor({ timeout: 30000 })
  await lifecyclePage.keyboard.press('ArrowLeft')
  await lifecyclePage.locator('.slidev-page-12').waitFor({ state: 'visible' })
  const inactiveLoopState = await lifecyclePage.locator('.slidev-page-13 .boiling-beaker').getAttribute('data-loop-state')
  check(inactiveLoopState === 'paused', `WebGL loop pauses when its slide becomes inactive (state: ${inactiveLoopState})`)
  await lifecyclePage.keyboard.press('ArrowRight')
  await lifecyclePage.locator('.slidev-page-13 .boiling-beaker[data-loop-state="running"]').waitFor({ timeout: 30000 })
  check(await lifecyclePage.locator('.slidev-page-13 .boiling-beaker').getAttribute('data-loop-state') === 'running', 'WebGL loop resumes after repeated slide navigation')
  await lifecyclePage.close()

  await interactionPage.goto(`${base}/overview`, { waitUntil: 'domcontentloaded' })
  await interactionPage.waitForTimeout(500)
  check(await interactionPage.locator('.slidev-page').count() >= slideCount, 'overview route renders all experiment studies')
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
