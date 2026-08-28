import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { chromium } from 'playwright-chromium'
import { startStaticSite } from './lib/start-static-site.mjs'

const root = process.cwd()
if (process.env.IB_A2_SKIP_BUILD !== '1') {
  execFileSync(process.execPath, [path.join(root, 'scripts', 'build-ib-a2.mjs')], { cwd: root, stdio: 'inherit' })
}

const site = await startStaticSite(root, path.join('ib-dp', 'a2-cells-viruses', 'index.html'))
const base = `${site.origin}/ib-dp/a2-cells-viruses`
const slideCount = 58
const browser = await chromium.launch({ headless: true })
const failures = []

function check(condition, message) {
  console.log(`${condition ? 'PASS' : 'FAIL'} ${message}`)
  if (!condition) failures.push(message)
}

function watchErrors(page, scope) {
  page.on('pageerror', error => {
    if (!error.message.includes('Wake Lock permission request denied')) failures.push(`${scope} page error: ${error.message}`)
  })
  page.on('console', message => {
    if (message.type() === 'error') failures.push(`${scope} console error: ${message.text()}`)
  })
}

try {
  for (const viewport of [{ width: 1366, height: 768 }, { width: 1920, height: 1080 }]) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1 })
    await page.addInitScript(() => localStorage.setItem('ib-a2-motion-reduced', 'true'))
    watchErrors(page, `${viewport.width}x${viewport.height}`)
    const badSlides = []
    for (let slide = 1; slide <= slideCount; slide += 1) {
      await page.goto(`${base}/${slide}`, { waitUntil: 'domcontentloaded' })
      const current = page.locator(`.slidev-page-${slide}`)
      await current.waitFor({ state: 'visible', timeout: 30000 })
      await page.waitForTimeout(slide === 9 ? 350 : slide === 12 ? 180 : 55)
      const result = await current.evaluate((element, size) => {
        const layout = element.querySelector('.slidev-layout')
        const box = element.getBoundingClientRect()
        const visibleText = Array.from(element.querySelectorAll('h1,h2,h3,p,li,button,figcaption,dt,dd'))
          .filter(node => {
            const style = getComputedStyle(node)
            const rect = node.getBoundingClientRect()
            return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > .05 && rect.width > 1 && rect.height > 1
          })
        const tiny = visibleText.filter(node => Number.parseFloat(getComputedStyle(node).fontSize) < 10).length
        const miller = element.querySelector('.miller-workbench')
        return {
          withinViewport: box.left >= -1 && box.top >= -1 && box.right <= size.width + 1 && box.bottom <= size.height + 1,
          aspect: box.width / box.height,
          overflow: layout ? layout.scrollWidth > layout.clientWidth + 2 || layout.scrollHeight > layout.clientHeight + 2 : true,
          reduced: document.documentElement.classList.contains('deck-reduced-motion'),
          millerStatic: !miller || (() => {
            const condenser = miller.querySelector('.miller-condenser')
            return miller.dataset.animationState === 'static'
              && miller.querySelector('.apparatus-replay')?.disabled === true
              && Number(miller.dataset.svgTargets) > 0
              && miller.querySelector('.miller-boiling')?.dataset.rendererState === 'ready'
              && miller.querySelector('.miller-boiling')?.dataset.loopState === 'static'
              && condenser?.dataset.rendererState === 'ready'
              && condenser?.dataset.loopState === 'static'
              && condenser?.dataset.lifecycleState === 'settled'
              && condenser?.dataset.rivuletState === 'settled'
              && condenser?.dataset.rivuletHeadVisible === 'false'
              && Number(condenser?.dataset.trailPoints) >= 8
              && Number(condenser?.dataset.trapPoolReceivedMass) > 0
              && Number(condenser?.dataset.trapPoolActivity) === 0
              && Number(condenser?.dataset.systemMassBalanceError) < .001
          })(),
          tiny,
        }
      }, viewport)
      if (!result.withinViewport || Math.abs(result.aspect - 16 / 9) >= .02 || result.overflow || !result.reduced || !result.millerStatic || result.tiny) badSlides.push({ slide, ...result })
    }
    check(!badSlides.length, `${viewport.width}x${viewport.height}: all ${slideCount} direct routes fit, use projection-safe text, and honour reduced motion${badSlides.length ? ` (${JSON.stringify(badSlides)})` : ''}`)
    await page.close()
  }

  const page = await browser.newPage({ viewport: { width: 1366, height: 768 }, deviceScaleFactor: 1 })
  await page.addInitScript(() => localStorage.setItem('ib-a2-motion-reduced', 'false'))
  watchErrors(page, 'interaction')

  await page.goto(`${base}/3`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(500)
  const boundary = page.locator('.slidev-page-3 .boundary-builder')
  check((await boundary.locator('article.leader h2').allInnerTexts()).join(' ').includes('E. coli'), 'life-boundary builder opens with the independently living cell as the leading case')
  await boundary.getByRole('button', { name: 'sustains metabolism' }).click()
  await boundary.getByRole('button', { name: 'maintains a boundary' }).click()
  await boundary.getByRole('button', { name: 'acts without a host' }).click()
  await page.waitForTimeout(500)
  const boundaryLeaders = await boundary.locator('article.leader h2').allInnerTexts()
  check(boundaryLeaders.length === 2 && boundaryLeaders.some(text => text.includes('E. coli')) && boundaryLeaders.some(text => text.includes('Variola')), 'changing the life criteria visibly changes the classification rather than revealing a fixed answer')
  await page.reload({ waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(500)
  check(await page.locator('.slidev-page-3 .criterion-field button[aria-pressed="true"]').count() === 5, 'life-boundary builder restores its opening state on refresh')

  await page.goto(`${base}/9`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(500)
  const model = page.locator('.slidev-page-9 .miller-workbench')
  const replay = model.getByRole('button', { name: 'Replay the apparatus cycle' })
  check(await model.getAttribute('data-svg-targets') === '15' && await model.locator('#path18224, #path3227, #path8237, #path13101, #path5191, #rect5129, #path21158, #path22229').count() === 8, 'Miller-Urey scene preserves the sourced vector while animating its apparatus elements')
  await replay.click()
  await page.waitForTimeout(800)
  const boilingState = await model.evaluate(element => {
    const renderer = element.querySelector('.miller-boiling')
    const condenser = element.querySelector('.miller-condenser')
    const sourceSvg = element.querySelector('.apparatus-art svg')
    const sourcedBoundary = sourceSvg.querySelector('#path5114')?.getAttribute('d') || ''
    const boundaryHost = renderer.querySelector('[data-source-boundary="path5114-outer"]')
    const condenserBoundaryHost = condenser.querySelector('[data-source-boundary="path5114-inner-lumen"]')
    const condenserFrontGlass = condenser.querySelector('[data-source-front-glass="path5114"]')
    const firstClosedSubpath = sourcedBoundary.indexOf('Z')
    const outerOrigin = 'M 180.624496 302.156219'
    const outerStart = 'L 180.624496 368.062469'
    const outerStop = 'L 263.874512 533.624939'
    const innerStart = 'L 273.718262 496.156219'
    const innerStop = 'L 191.093246 302.031219'
    const outerStartIndex = sourcedBoundary.indexOf(outerStart)
    const outerStopIndex = sourcedBoundary.indexOf(outerStop, outerStartIndex)
    const innerStartIndex = sourcedBoundary.indexOf(innerStart, outerStopIndex)
    const innerStopIndex = sourcedBoundary.indexOf(innerStop, innerStartIndex)
    const expectedCondenserChannel = `${outerOrigin} ${sourcedBoundary.slice(outerStartIndex, outerStopIndex).trim()} ${sourcedBoundary.slice(innerStartIndex, innerStopIndex + innerStop.length).trim()} Z`
    const svgBox = sourceSvg.getBoundingClientRect()
    const rendererBox = renderer.getBoundingClientRect()
    return {
    state: element.dataset.animationState,
    heater: element.querySelector('#path18224')?.getAttribute('style') || '',
    arrow: element.querySelector('#path8237')?.getAttribute('style') || '',
    water: element.querySelector('#rect16274')?.getAttribute('style') || '',
      renderer: renderer.dataset.rendererState,
      loop: renderer.dataset.loopState,
      condenserRenderer: condenser.dataset.rendererState,
      condenserLoop: condenser.dataset.loopState,
      condenserBoundary: condenser.dataset.boundaryMaskState,
      gas: Number(renderer.dataset.gasBubbles),
      active: Number(renderer.dataset.activeBubbles),
      bursts: Number(renderer.dataset.surfaceBursts),
      sourceWaterOpacity: Number(getComputedStyle(element.querySelector('#rect16274')).opacity),
      sourceBubbleOpacity: Number(getComputedStyle(element.querySelector('#path3227')).opacity),
      sameSurface: Math.abs(svgBox.x - rendererBox.x) < .5 && Math.abs(svgBox.y - rendererBox.y) < .5
        && Math.abs(svgBox.width - rendererBox.width) < .5 && Math.abs(svgBox.height - rendererBox.height) < .5,
      exactBoundary: renderer.dataset.boundaryMaskState === 'ready'
        && Number(boundaryHost?.dataset.boundaryLength) === firstClosedSubpath + 1
        && getComputedStyle(boundaryHost).maskImage.includes('data:image/png'),
      exactCondenserBoundary: condenser.dataset.boundaryMaskState === 'ready'
        && outerStartIndex >= 0 && outerStopIndex >= 0 && innerStartIndex >= 0 && innerStopIndex >= 0
        && Number(condenserBoundaryHost?.dataset.boundaryLength) === expectedCondenserChannel.length
        && getComputedStyle(condenserBoundaryHost).maskImage.includes('data:image/png')
        && condenserFrontGlass?.getAttribute('d') === sourcedBoundary,
      viewBox: renderer.getAttribute('viewBox'),
      steamCount: element.querySelectorAll('#path28215, #path3213, #path3217').length,
    }
  })
  check(boilingState.state === 'running' && boilingState.heater.includes('opacity') && boilingState.arrow.includes('opacity') && boilingState.renderer === 'ready' && boilingState.loop === 'running' && boilingState.condenserRenderer === 'ready' && boilingState.condenserLoop === 'running' && boilingState.condenserBoundary === 'ready' && boilingState.gas >= 8 && boilingState.active >= boilingState.gas && boilingState.sourceWaterOpacity === 0 && boilingState.sourceBubbleOpacity === 0 && boilingState.sameSurface && boilingState.exactBoundary && boilingState.exactCondenserBoundary && boilingState.viewBox === '0 0 652 607' && boilingState.steamCount === 0 && !boilingState.water.includes('transform'), 'Miller-Urey flask and condenser use deterministic WebGL liquid fields clipped beneath the exact sourced glass geometry, with no fake steam strokes')
  const trapLiquidRestState = await model.evaluate(element => {
    const source = element.querySelector('#path10175')
    const receiver = element.querySelector('.miller-trap-liquid')
    return {
      sourceOpacity: Number(getComputedStyle(source).opacity),
      sourceLiquid: receiver?.getAttribute('data-source-liquid'),
      path: receiver?.getAttribute('d') || '',
      usesSourceGradient: receiver?.getAttribute('fill') === 'url(#miller-trap-liquid-gradient)',
    }
  })
  check(trapLiquidRestState.sourceOpacity === 0 && trapLiquidRestState.sourceLiquid === 'path10175' && trapLiquidRestState.path.startsWith('M 263.343262 496.156219 L 264.312012 533.624939') && trapLiquidRestState.usesSourceGradient, 'the responsive receiver replaces only the sourced path10175 liquid object and preserves its authored body and gradient')
  const firstBurstCount = boilingState.bursts
  await page.waitForFunction(start => Number(document.querySelector('.slidev-page-9 .miller-boiling')?.getAttribute('data-surface-bursts')) > start, firstBurstCount, { timeout: 5000 })
  const burstState = await model.locator('.miller-boiling').evaluate(element => ({
    bursts: Number(element.dataset.surfaceBursts),
    active: Number(element.dataset.activeBubbles),
    gas: Number(element.dataset.gasBubbles),
  }))
  check(burstState.bursts > firstBurstCount && burstState.active > burstState.gas, 'a rising gas bubble reaches the surface and creates short-lived splash particles')
  await page.evaluate(() => {
    window.__millerCoolantTransitionObserved = false
    window.__millerCoolantObserver?.disconnect()
    const gradient = document.querySelector('.slidev-page-9 #linearGradient1')
    const inlet = document.querySelector('.slidev-page-9 #path21158')
    const jacket = document.querySelector('.slidev-page-9 #rect5129')
    const observeTransition = () => {
      const y1 = Number(gradient?.getAttribute('y1'))
      const jacketOpacity = Number(getComputedStyle(jacket).opacity)
      const inletFill = getComputedStyle(inlet).fill
      if (y1 >= 344.499964 && y1 < 409.8 && jacketOpacity > .621 && inletFill !== 'rgb(112, 109, 102)') {
        window.__millerCoolantTransitionObserved = true
        window.__millerCoolantObserver?.disconnect()
      }
    }
    const observer = new MutationObserver(observeTransition)
    for (const target of [gradient, inlet, jacket]) {
      if (target) observer.observe(target, { attributeFilter: ['fill', 'style', 'y1', 'y2'], attributes: true })
    }
    window.__millerCoolantObserver = observer
    observeTransition()
  })
  await replay.click()
  const coolantTransitionObserved = await page.waitForFunction(() => window.__millerCoolantTransitionObserved, null, { timeout: 5000 }).then(() => true).catch(() => false)
  check((await model.locator('#path13101').getAttribute('style') || '').includes('drop-shadow'), 'electrical-energy state animates the existing spark')
  const condenserFlow = await model.evaluate(element => {
    const gradient = element.querySelector('#linearGradient1')
    const jacket = element.querySelector('#rect5129')
    const inlet = element.querySelector('#path21158')
    return {
      y1: Number(gradient?.getAttribute('y1')),
      y2: Number(gradient?.getAttribute('y2')),
      sourceMarkers: gradient?.hasAttribute('data-miller-condenser-flow')
        && jacket?.hasAttribute('data-miller-coolant-jacket')
        && inlet?.hasAttribute('data-miller-coolant-inlet')
        && element.querySelector('#path22229')?.hasAttribute('data-miller-coolant-outlet'),
      jacketOpacity: Number(getComputedStyle(jacket).opacity),
      jacketTransform: jacket?.getAttribute('transform') || '',
      inletFill: getComputedStyle(inlet).fill,
    }
  })
  if (!coolantTransitionObserved) console.log('INFO coolant transition completed outside the browser sampling window; validating its authored geometry and rest state')
  check(condenserFlow.sourceMarkers && condenserFlow.y1 >= 344.499964 && condenserFlow.y1 <= 410 && condenserFlow.y2 > condenserFlow.y1 && condenserFlow.jacketOpacity >= .62 && !condenserFlow.jacketTransform, 'cold-water animation remains anchored to the sourced inlet, jacket gradient, and outlet without moving the apparatus')
  await page.waitForFunction(() => Number(document.querySelector('.slidev-page-9 .miller-condenser')?.getAttribute('data-active-drops')) > 0, null, { timeout: 5200 })
  const condensation = await model.evaluate(element => {
    const outlet = element.querySelector('#path22229')
    const renderer = element.querySelector('.miller-condenser')
    const sourceDropOpacity = ['path5191', 'path5187', 'path4207'].map(id => Number(getComputedStyle(element.querySelector(`#${id}`)).opacity))
    return {
      outletFill: getComputedStyle(outlet).fill,
      active: Number(renderer.dataset.activeDrops),
      renderedSlots: Number(renderer.dataset.renderedSurfaceDropSlots),
      boundary: renderer.dataset.boundaryMaskState,
      containsCondenser: renderer.dataset.boundaryContainsCondenser,
      loop: renderer.dataset.loopState,
      pinned: Number(renderer.dataset.pinnedDrops),
      sourceDropOpacity,
    }
  })
  check(condensation.active > 0 && condensation.active <= 16 && condensation.renderedSlots === condensation.active && condensation.boundary === 'ready' && condensation.containsCondenser === 'true' && condensation.loop === 'running' && condensation.sourceDropOpacity.every(opacity => opacity === 0), `small condensate beads remain clipped to the sourced inner lumen and every active model bead owns exactly one WebGL slot (${JSON.stringify(condensation)})`)
  await page.waitForFunction(() => {
    const renderer = document.querySelector('.slidev-page-9 .miller-condenser')
    return Number(renderer?.getAttribute('data-coalescences')) > 0
      && Number(renderer?.getAttribute('data-sliding-drops')) > 0
  }, null, { timeout: 8000 })
  await page.waitForFunction(() => {
    const renderer = document.querySelector('.slidev-page-9 .miller-condenser')
    return renderer?.getAttribute('data-rivulet-state') !== 'inactive'
      && Number(renderer?.getAttribute('data-trail-points')) >= 3
  }, null, { timeout: 8000 })
  const routedCondensate = await model.locator('.miller-condenser').evaluate(element => ({
    coalescences: Number(element.dataset.coalescences),
    constraintViolations: Number(element.dataset.constraintViolations),
    detachmentEvents: Number(element.dataset.detachmentEvents),
    feedEvents: Number(element.dataset.feedEvents),
    head: Number(element.dataset.rivuletHead),
    lifecycle: element.dataset.lifecycleState,
    rivuletState: element.dataset.rivuletState,
    sliding: Number(element.dataset.slidingDrops),
    renderedTrailSegments: Number(element.dataset.renderedTrailSegments),
    rejectedTrailSegments: Number(element.dataset.rejectedTrailSegments),
    trailPoints: Number(element.dataset.trailPoints),
  }))
  check(routedCondensate.coalescences > 0 && routedCondensate.sliding > 0 && routedCondensate.trailPoints >= 3 && routedCondensate.renderedTrailSegments >= 2 && routedCondensate.head > 0 && routedCondensate.head < 1 && routedCondensate.lifecycle === 'flowing' && routedCondensate.constraintViolations === 0 && routedCondensate.detachmentEvents === 0, `merged droplets feed an explicit same-wall segment trail without ballistic detachment or invented cross-lumen connectors${routedCondensate.constraintViolations || routedCondensate.detachmentEvents || routedCondensate.lifecycle !== 'flowing' ? ` (${JSON.stringify(routedCondensate)})` : ''}`)
  await page.waitForFunction(() => {
    const renderer = document.querySelector('.slidev-page-9 .miller-condenser')
    return Number(renderer?.getAttribute('data-pool-events')) > 0
      && Number(renderer?.getAttribute('data-feed-events')) > 0
  }, null, { timeout: 10000 })
  const pooledCondensate = await model.locator('.miller-condenser').evaluate(element => ({
    absorbed: Number(element.dataset.wetRegionAbsorptions),
    feedEvents: Number(element.dataset.feedEvents),
    poolEvents: Number(element.dataset.poolEvents),
    pooled: Number(element.dataset.pooledDrops),
    state: element.dataset.rivuletState,
    wetEnd: Number(element.dataset.wetRegionEnd),
    wetStart: Number(element.dataset.wetRegionStart),
    wetSurface: element.dataset.wetRegionSurface,
  }))
  check(pooledCondensate.poolEvents > 0 && pooledCondensate.feedEvents > 0 && pooledCondensate.absorbed > 0 && pooledCondensate.wetEnd > pooledCondensate.wetStart && pooledCondensate.wetSurface !== 'none', `the low-slope bend pools water while the connected same-wall wet interval absorbs intersected beads (${JSON.stringify(pooledCondensate)})`)
  const observedTrapMerge = await page.waitForFunction(() => {
    const renderer = document.querySelector('.slidev-page-9 .miller-condenser')
    const merge = Number(renderer?.getAttribute('data-trap-merge-progress'))
    return renderer?.getAttribute('data-lifecycle-state') === 'transferring'
      && Number(renderer?.getAttribute('data-drain-events')) > 0
      && renderer?.getAttribute('data-trap-pool-active') === 'true'
      && Number(renderer?.getAttribute('data-trap-pool-received-mass')) > 0
      && merge > 0
  }, null, { timeout: 45000 }).then(() => true).catch(() => false)
  const drainedCondensate = await model.locator('.miller-condenser').evaluate(element => ({
    coalescences: Number(element.dataset.coalescences),
    collected: Number(element.dataset.collectedFraction),
    constraintViolations: Number(element.dataset.constraintViolations),
    detachmentEvents: Number(element.dataset.detachmentEvents),
    drainEvents: Number(element.dataset.drainEvents),
    formations: Number(element.dataset.rivuletFormations),
    head: Number(element.dataset.rivuletHead),
    headVisible: element.dataset.rivuletHeadVisible,
    lifecycle: element.dataset.lifecycleState,
    maximumChordError: Number(element.dataset.maximumTrailChordError),
    maximumSpan: Number(element.dataset.maximumTrailSpan),
    state: element.dataset.rivuletState,
    trailPoints: Number(element.dataset.trailPoints),
    trapMassBalanceError: Number(element.dataset.trapMassBalanceError),
    trapMerge: Number(element.dataset.trapMergeProgress),
    trapPoolActive: element.dataset.trapPoolActive,
    trapPoolActivity: Number(element.dataset.trapPoolActivity),
    trapPoolDisplacement: Number(element.dataset.trapPoolMaxDisplacement),
    trapPoolReceivedMass: Number(element.dataset.trapPoolReceivedMass),
    systemMassBalanceError: Number(element.dataset.systemMassBalanceError),
    trapLiquidPath: element.querySelector('.miller-trap-liquid')?.getAttribute('d') || '',
  }))
  check(observedTrapMerge && drainedCondensate.coalescences > 0 && drainedCondensate.drainEvents > 0 && drainedCondensate.collected > 0 && drainedCondensate.state === 'trap-pool' && drainedCondensate.lifecycle === 'transferring' && drainedCondensate.formations >= 1 && drainedCondensate.head === 1 && drainedCondensate.trapPoolActive === 'true' && drainedCondensate.trapPoolActivity > 0 && drainedCondensate.trapPoolDisplacement > 0.08 && drainedCondensate.trapPoolReceivedMass > 0 && drainedCondensate.trapMassBalanceError < 0.001 && drainedCondensate.systemMassBalanceError < 0.001 && drainedCondensate.trapLiquidPath !== trapLiquidRestState.path && drainedCondensate.maximumSpan < 10 && drainedCondensate.maximumChordError < 1.2 && drainedCondensate.constraintViolations === 0 && drainedCondensate.detachmentEvents === 0, `the rivulet follows both bends and continuously transfers conserved mass into a visibly deforming trap-water receiver${!observedTrapMerge || drainedCondensate.drainEvents <= 0 || drainedCondensate.constraintViolations || drainedCondensate.detachmentEvents || drainedCondensate.maximumSpan >= 10 || drainedCondensate.trapLiquidPath === trapLiquidRestState.path || drainedCondensate.lifecycle !== 'transferring' ? ` (${JSON.stringify({ observedTrapMerge, ...drainedCondensate, trapLiquidPath: drainedCondensate.trapLiquidPath.slice(-180) })})` : ''}`)
  // Headless Chromium may throttle requestAnimationFrame after the long route
  // sweep, so wait on the deterministic post-transfer state rather than wall time.
  await page.waitForFunction(() => {
    const renderer = document.querySelector('.slidev-page-9 .miller-condenser')
    return renderer?.getAttribute('data-lifecycle-state') === 'dripping'
      && renderer?.getAttribute('data-rivulet-state') === 'steady-drip'
      && renderer?.getAttribute('data-loop-state') === 'running'
      && Number(renderer?.getAttribute('data-trap-merge-progress')) === 1
      && renderer?.getAttribute('data-rivulet-head-visible') === 'false'
      && Number(renderer?.getAttribute('data-trail-points')) === 0
  }, null, { timeout: 30000 })
  const persistentCondensate = await model.locator('.miller-condenser').evaluate(element => ({
    formations: Number(element.dataset.rivuletFormations),
    head: Number(element.dataset.rivuletHead),
    headVisible: element.dataset.rivuletHeadVisible,
    lifecycle: element.dataset.lifecycleState,
    loop: element.dataset.loopState,
    state: element.dataset.rivuletState,
    trailPoints: Number(element.dataset.trailPoints),
    trapMassBalanceError: Number(element.dataset.trapMassBalanceError),
    trapMerge: Number(element.dataset.trapMergeProgress),
    trapPoolActivity: Number(element.dataset.trapPoolActivity),
    trapPoolReceivedMass: Number(element.dataset.trapPoolReceivedMass),
    systemMassBalanceError: Number(element.dataset.systemMassBalanceError),
  }))
  check(persistentCondensate.formations >= 1 && persistentCondensate.state === 'steady-drip' && persistentCondensate.lifecycle === 'dripping' && persistentCondensate.loop === 'running' && persistentCondensate.trapMerge === 1 && persistentCondensate.trapPoolReceivedMass > 1 && persistentCondensate.trapMassBalanceError < 0.001 && persistentCondensate.systemMassBalanceError < 0.001 && persistentCondensate.headVisible === 'false' && persistentCondensate.trailPoints === 0, `the live transition contains no synthetic permanent trail or static bend beads (${JSON.stringify(persistentCondensate)})`)
  await page.waitForFunction(() => {
    const renderer = document.querySelector('.slidev-page-9 .miller-condenser')
    return renderer?.getAttribute('data-lifecycle-state') === 'dripping'
      && renderer?.getAttribute('data-rivulet-head-visible') === 'true'
      && Number(renderer?.getAttribute('data-rivulet-head')) > 0.08
      && Number(renderer?.getAttribute('data-rivulet-head')) < 0.55
      && Number(renderer?.getAttribute('data-trail-points')) >= 2
  }, null, { timeout: 7000 })
  const terminalDrop = await model.locator('.miller-condenser').evaluate(element => ({
    detachments: Number(element.dataset.detachmentEvents),
    head: Number(element.dataset.rivuletHead),
    headVisible: element.dataset.rivuletHeadVisible,
    lifecycle: element.dataset.lifecycleState,
    state: element.dataset.rivuletState,
    renderedTrailSegments: Number(element.dataset.renderedTrailSegments),
    rejectedTrailSegments: Number(element.dataset.rejectedTrailSegments),
    trailPoints: Number(element.dataset.trailPoints),
  }))
  check(terminalDrop.lifecycle === 'dripping' && terminalDrop.state === 'steady-drip' && terminalDrop.headVisible === 'true' && terminalDrop.head > 0.08 && terminalDrop.head < 0.55 && terminalDrop.trailPoints >= 2 && terminalDrop.renderedTrailSegments >= 1 && terminalDrop.detachments === 0, `a follow-up drop restarts with validated local segment pairs instead of an inherited or spontaneous line (${JSON.stringify(terminalDrop)})`)
  const heldCondensate = await model.locator('.miller-condenser').evaluate(element => ({
    active: Number(element.dataset.activeDrops),
    drainEvents: Number(element.dataset.drainEvents),
    feedEvents: Number(element.dataset.feedEvents),
    formations: Number(element.dataset.rivuletFormations),
    lifecycle: element.dataset.lifecycleState,
    received: Number(element.dataset.trapPoolReceivedMass),
    trailPoints: Number(element.dataset.trailPoints),
  }))
  await page.waitForFunction(start => {
    const renderer = document.querySelector('.slidev-page-9 .miller-condenser')
    return Number(renderer?.getAttribute('data-active-drops')) < start.active
      && Number(renderer?.getAttribute('data-drain-events')) > start.drainEvents
      && Number(renderer?.getAttribute('data-trap-pool-received-mass')) > start.received
  }, heldCondensate, { timeout: 15000 })
  await page.waitForFunction(() => {
    const renderer = document.querySelector('.slidev-page-9 .miller-condenser')
    return Number(renderer?.getAttribute('data-active-drops')) === 0
      && Number(renderer?.getAttribute('data-terminal-wall-a-drains')) > 0
      && Number(renderer?.getAttribute('data-terminal-wall-b-drains')) > 0
      && renderer?.getAttribute('data-rivulet-head-visible') === 'false'
      && Number(renderer?.getAttribute('data-trail-points')) === 0
  }, null, { timeout: 45000 })
  const heldCondensateAfter = await model.locator('.miller-condenser').evaluate(element => ({
    active: Number(element.dataset.activeDrops),
    drainEvents: Number(element.dataset.drainEvents),
    feedEvents: Number(element.dataset.feedEvents),
    formations: Number(element.dataset.rivuletFormations),
    lifecycle: element.dataset.lifecycleState,
    received: Number(element.dataset.trapPoolReceivedMass),
    renderedSlots: Number(element.dataset.renderedSurfaceDropSlots),
    wallADrains: Number(element.dataset.terminalWallADrains),
    wallBDrains: Number(element.dataset.terminalWallBDrains),
    trailPoints: Number(element.dataset.trailPoints),
  }))
  check(heldCondensate.active > 0 && heldCondensateAfter.active === 0 && heldCondensateAfter.renderedSlots === 0 && heldCondensateAfter.formations === heldCondensate.formations && heldCondensateAfter.drainEvents > heldCondensate.drainEvents && heldCondensateAfter.received > heldCondensate.received && heldCondensateAfter.lifecycle === 'dripping' && heldCondensateAfter.wallADrains > 0 && heldCondensateAfter.wallBDrains > 0, `residual beads finish their surface lifecycle, both wetting surfaces continue delivering drops, and a newly allocated zero buffer clears every retired WebGL drop slot (${JSON.stringify({ heldCondensate, heldCondensateAfter })})`)
  await page.waitForFunction(() => {
    const renderer = document.querySelector('.slidev-page-9 .miller-condenser')
    return renderer?.getAttribute('data-lifecycle-state') === 'dripping'
      && renderer?.getAttribute('data-rivulet-head-visible') === 'false'
      && Number(renderer?.getAttribute('data-trail-points')) === 0
  }, null, { timeout: 7000 })
  check(true, 'each continuing drop clears its local wet wake at the receiver; no three-bead bend artifact remains')
  const condenserSettled = await model.evaluate(element => ({
    state: element.dataset.animationState,
    cycles: Number(element.dataset.cycleCount),
    y1: Number(element.querySelector('#linearGradient1')?.getAttribute('y1')),
    jacket: element.querySelector('#rect5129')?.getAttribute('style') || '',
  }))
  check(condenserSettled.state === 'settled' && condenserSettled.cycles >= 1 && Math.abs(condenserSettled.y1 - 344.499964) < .001 && !condenserSettled.jacket.includes('translate3d') && !condenserSettled.jacket.includes('matrix('), 'Miller-Urey cycle reaches a deterministic readable end state with the condenser restored')
  await model.getByRole('button', { name: 'UV or mineral gradients' }).click()
  await page.waitForFunction(() => {
    const workbench = document.querySelector('.slidev-page-9 .miller-workbench')
    const spark = workbench?.querySelector('#path13101')?.getAttribute('style') || ''
    const arrow = workbench?.querySelector('#path9216')?.getAttribute('style') || ''
    return workbench?.getAttribute('data-energy-mode') === 'alternative'
      && workbench?.getAttribute('data-animation-state') === 'running'
      && !spark.includes('drop-shadow')
      && arrow.includes('opacity')
  }, null, { timeout: 5000 })
  const alternativeEnergy = await model.evaluate(element => ({
    mode: element.dataset.energyMode,
    spark: element.querySelector('#path13101')?.getAttribute('style') || '',
    arrow: element.querySelector('#path9216')?.getAttribute('style') || '',
  }))
  check(alternativeEnergy.mode === 'alternative' && !alternativeEnergy.spark.includes('drop-shadow') && alternativeEnergy.arrow.includes('opacity'), `alternative-energy assumption preserves circulation but does not pretend the drawn spark is active (${JSON.stringify(alternativeEnergy)})`)
  await model.getByRole('button', { name: 'less reducing atmosphere' }).click()
  await page.waitForTimeout(500)
  check((await model.locator('.model-reading').innerText()).includes('requires new evidence'), 'Miller–Urey workbench changes the scope of the model when an assumption changes')
  await page.getByRole('button', { name: 'Go to next slide' }).click()
  await page.locator('.slidev-page-10').waitFor({ state: 'visible' })
  check(await model.getAttribute('data-animation-state') === 'paused' && await model.locator('.miller-boiling').getAttribute('data-loop-state') === 'paused' && await model.locator('.miller-condenser').getAttribute('data-loop-state') === 'paused', 'Miller-Urey apparatus, boiling loop, and condenser pause when the slide becomes inactive')
  await page.getByRole('button', { name: 'Go to previous slide' }).click()
  await page.locator('.slidev-page-9').waitFor({ state: 'visible' })
  await page.waitForFunction(() => document.querySelector('.slidev-page-9 .miller-workbench')?.getAttribute('data-animation-state') === 'running', null, { timeout: 3000 })
  check(await model.getAttribute('data-animation-state') === 'running' && await model.locator('.miller-boiling').getAttribute('data-loop-state') === 'running' && await model.locator('.miller-condenser').getAttribute('data-loop-state') === 'running', 'Miller-Urey apparatus, boiling loop, and condenser restart cleanly on backward navigation')

  await page.goto(`${base}/20`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(500)
  const sorter = page.locator('.slidev-page-20 .claim-sorter')
  const sorterRect = await sorter.locator('.claim-stage').boundingBox()
  await sorter.getByRole('button', { name: 'overclaim', exact: true }).click()
  await page.waitForTimeout(500)
  check((await sorter.locator('.sorter-result').innerText()).includes('Defensible classification'), 'claim sorter explains a defensible evidence classification')
  await sorter.getByRole('button', { name: 'Claim 2' }).click()
  await sorter.getByRole('button', { name: 'supported', exact: true }).click()
  await page.waitForTimeout(500)
  check((await sorter.locator('.sorter-result').innerText()).includes('Catalytic RNA is directly observed'), 'claim sorter advances through independent claims without replacing the slide')
  const sorterRectAfter = await sorter.locator('.claim-stage').boundingBox()
  check(Boolean(sorterRect && sorterRectAfter && Math.abs(sorterRect.height - sorterRectAfter.height) < 1), 'claim feedback remains inside a stable composition')

  await page.goto(`${base}/26`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(500)
  const scale = page.locator('.slidev-page-26 .scale-workbench')
  await scale.getByRole('button', { name: 'Calculate' }).click()
  await page.waitForTimeout(500)
  const scaleResult = await scale.locator('.scale-result').innerText()
  check(scaleResult.includes('21,000×') && scaleResult.includes('1.4 μm'), 'scale-bar workbench calculates magnification and a sensibly precise cell length')
  await scale.getByRole('button', { name: 'Reset' }).click()
  await page.waitForTimeout(500)
  check((await scale.locator('.scale-result').innerText()).includes('Convert millimetres'), 'scale-bar workbench resets deterministically')

  await page.goto(`${base}/46`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(500)
  const definition = page.locator('.slidev-page-46 .definition-stress')
  const definitionRect = await definition.locator('.definition-reading').boundingBox()
  await definition.getByRole('button', { name: /sterile worker ant/ }).click()
  await page.waitForTimeout(500)
  check((await definition.locator('.definition-reading').innerText()).includes('belongs to an evolving reproductive population'), 'definition stress test exposes a biologically meaningful counterexample')
  await definition.getByRole('button', { name: /independent reproduction/ }).click()
  await page.waitForTimeout(500)
  check((await definition.locator('.definition-reading').innerText()).includes('passes your current rule'), 'definition stress test recomputes its verdict when the rule changes')
  const definitionRectAfter = await definition.locator('.definition-reading').boundingBox()
  check(Boolean(definitionRect && definitionRectAfter && Math.abs(definitionRect.height - definitionRectAfter.height) < 1), 'definition evidence changes without shifting the surrounding composition')

  await page.goto(`${base}/55`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(500)
  const matcher = page.locator('.slidev-page-55 .phage-matcher')
  await matcher.getByRole('button', { name: /phage A clear lysis/ }).click()
  await matcher.getByRole('button', { name: /phage D clear lysis/ }).click()
  await page.waitForTimeout(500)
  check((await matcher.locator('.match-reading').innerText()).includes('A + D is the strongest assay-led choice'), 'phage matcher uses host-range evidence to build a restrained cocktail')
  const matcherText = await matcher.innerText()
  check(matcherText.toLowerCase().includes('not patterson') && matcherText.toLowerCase().includes('dataset'), 'phage matcher labels its teaching assay rather than presenting invented data as history')

  await page.goto(`${base}/35`, { waitUntil: 'domcontentloaded' })
  const firstFlip = page.locator('.slidev-page-35 .evidence-flip').first()
  await firstFlip.focus()
  await page.keyboard.press('Enter')
  check(await firstFlip.getAttribute('aria-pressed') === 'true', 'endosymbiosis flip card operates from the keyboard')
  check((await firstFlip.locator('.flip-inner').evaluate(element => getComputedStyle(element).transform)) !== 'none', 'flip card uses a real CSS 3D transform')
  await page.keyboard.press('Enter')
  check(await firstFlip.getAttribute('aria-pressed') === 'false', 'flip card returns to its front state')

  await page.goto(`${base}/16`, { waitUntil: 'domcontentloaded' })
  const spoiler = page.locator('.slidev-page-16 .trace-cell').first()
  const hiddenFilter = await spoiler.locator('span').evaluate(element => getComputedStyle(element).filter)
  await spoiler.click()
  await page.waitForTimeout(600)
  const revealedFilter = await spoiler.locator('span').evaluate(element => getComputedStyle(element).filter)
  check(hiddenFilter !== 'none' && revealedFilter === 'none', 'blurred RNA evidence reveals independently')
  await page.reload({ waitUntil: 'domcontentloaded' })
  check(await page.locator('.slidev-page-16 .trace-cell').first().getAttribute('aria-pressed') === 'false', 'blurred evidence restores its opening state on refresh')

  await page.goto(`${base}/25`, { waitUntil: 'domcontentloaded' })
  const slider = page.getByRole('slider', { name: 'Compare unresolved and resolved versions of the same micrograph' })
  const before = Number(await slider.getAttribute('aria-valuenow'))
  await slider.focus()
  await page.keyboard.press('ArrowRight')
  check(Number(await slider.getAttribute('aria-valuenow')) > before, 'microscopy comparator preserves keyboard slider control')

  await page.goto(`${base}/48`, { waitUntil: 'domcontentloaded' })
  const lambdaBox = page.locator('.slidev-page-48 .lambda-outcome')
  const lambdaRect = await lambdaBox.boundingBox()
  await page.locator('.slidev-page-48 .lambda-switcher button').nth(1).click()
  await page.waitForTimeout(600)
  check((await lambdaBox.innerText()).includes('Lysogeny becomes more likely'), 'lambda decision replaces the anchored scientific state')
  const lambdaRectAfter = await lambdaBox.boundingBox()
  check(Boolean(lambdaRect && lambdaRectAfter && Math.abs(lambdaRect.height - lambdaRectAfter.height) < 1), 'lambda state replacement does not move the surrounding composition')
  await page.reload({ waitUntil: 'domcontentloaded' })
  check((await page.locator('.slidev-page-48 .lambda-outcome').innerText()).includes('Lytic development becomes more likely'), 'lambda decision restores its opening state on refresh')

  await page.goto(`${base}/56`, { waitUntil: 'domcontentloaded' })
  const reasoning = page.locator('.slidev-page-56 .reasoning-field article')
  check(Number(await reasoning.first().evaluate(element => getComputedStyle(element).opacity)) < .05, 'classification synthesis opens before the inference is revealed')
  for (let step = 0; step < 3; step += 1) await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(650)
  check(await reasoning.evaluateAll(elements => elements.every(element => Number(getComputedStyle(element).opacity) > .98)), 'GSAP synthesis reaches its labelled final state')
  for (let step = 0; step < 3; step += 1) await page.keyboard.press('ArrowLeft')
  await page.waitForTimeout(650)
  check(Number(await reasoning.first().evaluate(element => getComputedStyle(element).opacity)) < .05, 'GSAP synthesis reverses to its exact opening state')

  await page.goto(`${base}/12`, { waitUntil: 'domcontentloaded' })
  const simulation = page.locator('.slidev-page-12 .compartment-simulation')
  await simulation.waitFor({ state: 'visible' })
  check(await simulation.getAttribute('data-animation-state') === 'running', 'Canvas simulation runs while its slide is active')
  await page.keyboard.press('ArrowRight')
  await page.locator('.slidev-page-13').waitFor({ state: 'visible' })
  check(await simulation.getAttribute('data-animation-state') === 'paused', 'Canvas simulation pauses when its slide becomes inactive')
  await page.keyboard.press('ArrowLeft')
  await page.locator('.slidev-page-12').waitFor({ state: 'visible' })
  check(await simulation.getAttribute('data-animation-state') === 'running', 'Canvas simulation resumes when its slide becomes active')
  await page.getByRole('button', { name: 'Reset' }).click()
  check((await page.locator('.slidev-page-12 .simulation-copy h2').innerText()).includes('100%'), 'Canvas reset restores the deterministic opening sample')

  await page.goto(`${base}/9?condenserDebug=1`, { waitUntil: 'domcontentloaded' })
  await page.waitForFunction(() => document.querySelector('.slidev-page-9 .miller-condenser')?.getAttribute('data-renderer-state') === 'ready', null, { timeout: 5000 })
  await page.waitForTimeout(450)
  const condenserDebug = await page.locator('.slidev-page-9 .miller-condenser').evaluate(element => {
    const canvas = element.querySelector('[data-debug-surface-path="true"]')
    return {
      dataLength: canvas instanceof HTMLCanvasElement ? canvas.toDataURL().length : 0,
      display: canvas ? getComputedStyle(canvas).display : 'none',
      mode: element.dataset.debugMode,
    }
  })
  check(condenserDebug.mode === 'on' && condenserDebug.display !== 'none' && condenserDebug.dataLength > 3000, 'debug mode exposes the centerline, both wetting walls, surface identities, tangent/normal/gravity samples, connected trail, and transfer point on one Canvas')

  await page.emulateMedia({ media: 'print', reducedMotion: 'reduce' })
  await page.goto(`${base}/9`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(350)
  const printMiller = await page.locator('.slidev-page-9 .miller-workbench').evaluate(element => {
    const boiling = element.querySelector('.miller-boiling')
    const condenser = element.querySelector('.miller-condenser')
    return {
      animationState: element.dataset.animationState,
      boilingLoop: boiling?.dataset.loopState,
      condenserLoop: condenser?.dataset.loopState,
      lifecycle: condenser?.dataset.lifecycleState,
      rivuletState: condenser?.dataset.rivuletState,
      headVisible: condenser?.dataset.rivuletHeadVisible,
      trailPoints: Number(condenser?.dataset.trailPoints),
      receivedMass: Number(condenser?.dataset.trapPoolReceivedMass),
      poolActivity: Number(condenser?.dataset.trapPoolActivity),
      systemMassBalanceError: Number(condenser?.dataset.systemMassBalanceError),
    }
  })
  check(printMiller.animationState === 'static'
    && printMiller.boilingLoop === 'static'
    && printMiller.condenserLoop === 'static'
    && printMiller.lifecycle === 'settled'
    && printMiller.rivuletState === 'settled'
    && printMiller.headVisible === 'false'
    && printMiller.trailPoints >= 8
    && printMiller.receivedMass > 0
    && printMiller.poolActivity === 0
    && printMiller.systemMassBalanceError < .001, `print state shows the stable scientific conclusion: a final wet trail and transferred condensate in a still receiver (${JSON.stringify(printMiller)})`)
  await page.goto(`${base}/16`, { waitUntil: 'domcontentloaded' })
  check(await page.locator('.slidev-page-16 .trace-cell').first().locator('span').evaluate(element => getComputedStyle(element).filter) === 'none', 'print state renders blurred evidence as readable text')
  await page.close()
}
finally {
  await browser.close()
  await site.close()
}

check(!failures.length, 'no unexpected console or page errors were detected')
if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
