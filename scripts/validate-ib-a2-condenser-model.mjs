import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import ts from 'typescript'

const root = new URL('../', import.meta.url)
const sourceDirectory = new URL('../decks/ib-dp-a2-cells-viruses/lib/', import.meta.url)
const temporaryDirectory = await mkdtemp(join(tmpdir(), 'ib-a2-condenser-'))
let failures = 0

function check(condition, label) {
  if (condition) console.log(`PASS ${label}`)
  else {
    failures += 1
    console.error(`FAIL ${label}`)
  }
}

async function transpile(name) {
  const source = await readFile(new URL(`${name}.ts`, sourceDirectory), 'utf8')
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: `${name}.ts`,
  }).outputText
    .replaceAll("'./surfacePath'", "'./surfacePath.mjs'")
    .replaceAll("'./millerUreyCondenserPath'", "'./millerUreyCondenserPath.mjs'")
  await writeFile(join(temporaryDirectory, `${name}.mjs`), output)
}

function independentWallPoint(path, wallOffset, s, surface) {
  const centre = path.pointAt(s)
  const normal = path.normalAt(s)
  const sign = surface === 'wall-a' ? 1 : -1
  return {
    x: centre.x + normal.x * wallOffset * sign,
    y: centre.y + normal.y * wallOffset * sign,
  }
}

function attachmentMetrics(snapshot, path, wallOffset) {
  const elements = [
    ...snapshot.drops.map(drop => ({ ...drop, kind: `drop-${drop.id}` })),
    ...snapshot.trail.map((point, index) => ({ ...point, kind: `trail-${index}` })),
    ...(snapshot.rivulet ? [{ ...snapshot.rivulet, s: snapshot.rivulet.headS, kind: 'rivulet' }] : []),
  ]
  let maximumAssignedWallError = 0
  let minimumCentreClearance = Number.POSITIVE_INFINITY
  let lumenCrossings = 0
  for (const element of elements) {
    const centre = path.pointAt(element.s)
    const normal = path.normalAt(element.s)
    const expected = independentWallPoint(path, wallOffset, element.s, element.surface)
    const assignedError = Math.hypot(element.position.x - expected.x, element.position.y - expected.y)
    const signedOffset = (element.position.x - centre.x) * normal.x + (element.position.y - centre.y) * normal.y
    const expectedSign = element.surface === 'wall-a' ? 1 : -1
    maximumAssignedWallError = Math.max(maximumAssignedWallError, assignedError)
    minimumCentreClearance = Math.min(minimumCentreClearance, Math.abs(signedOffset))
    if (assignedError > 0.08 || Math.sign(signedOffset) !== expectedSign || Math.abs(signedOffset) < wallOffset * 0.82) lumenCrossings += 1
  }
  return {
    lumenCrossings,
    maximumAssignedWallError,
    minimumCentreClearance: Number.isFinite(minimumCentreClearance) ? minimumCentreClearance : wallOffset,
  }
}

function modelSignature(model) {
  const snapshot = model.getDebugSnapshot()
  return JSON.stringify({
    activeCount: model.activeCount,
    collectedFraction: model.collectedFraction.toFixed(6),
    condensedMassInput: model.condensedMassInput.toFixed(6),
    directCollectedMass: model.directCollectedMass.toFixed(6),
    lifecycleState: model.lifecycleState,
    rivuletFormationCount: model.rivuletFormationCount,
    rivuletHeadVisible: model.rivuletHeadVisible,
    rivuletState: model.rivuletState,
    trailSegmentCount: model.trailSegmentCount,
    rejectedTrailSegmentCount: model.rejectedTrailSegmentCount,
    terminalDrainCountWallA: model.terminalDrainCountWallA,
    terminalDrainCountWallB: model.terminalDrainCountWallB,
    trapPoolActivity: model.trapPoolActivity.toFixed(6),
    trapPoolReceivedMass: model.trapPoolReceivedMass.toFixed(6),
    trail: snapshot.trail.map(point => [point.surface, point.s.toFixed(4), point.seed.toFixed(6), point.width.toFixed(4), point.wetness.toFixed(4)]),
  })
}

function validateOffsetWallGeometry(path, wallOffset) {
  let maximumWallStep = 0
  let maximumSeparationError = 0
  let lumenSideFailures = 0
  for (const surface of ['wall-a', 'wall-b']) {
    let previous = independentWallPoint(path, wallOffset, 0, surface)
    for (let s = 0.5; s <= path.length; s += 0.5) {
      const point = independentWallPoint(path, wallOffset, s, surface)
      const centre = path.pointAt(s)
      const normal = path.normalAt(s)
      const signedOffset = (point.x - centre.x) * normal.x + (point.y - centre.y) * normal.y
      const expectedSign = surface === 'wall-a' ? 1 : -1
      if (Math.sign(signedOffset) !== expectedSign || Math.abs(signedOffset) < wallOffset * 0.99) lumenSideFailures += 1
      maximumWallStep = Math.max(maximumWallStep, Math.hypot(point.x - previous.x, point.y - previous.y))
      previous = point
    }
  }
  for (let s = 0; s <= path.length; s += 0.5) {
    const wallA = independentWallPoint(path, wallOffset, s, 'wall-a')
    const wallB = independentWallPoint(path, wallOffset, s, 'wall-b')
    maximumSeparationError = Math.max(maximumSeparationError, Math.abs(Math.hypot(wallA.x - wallB.x, wallA.y - wallB.y) - wallOffset * 2))
  }
  return { lumenSideFailures, maximumSeparationError, maximumWallStep }
}

async function simulate(Model, path, wallOffset, verticalEnd, seconds = 42) {
  const model = new Model()
  const seen = {
    bend: false,
    merging: false,
    pinned: false,
    pool: false,
    rivulet: false,
    sliding: false,
    trap: false,
    trapMerge: false,
    trail: false,
    steadyDrip: false,
    terminalDryGap: false,
    terminalWake: false,
  }
  let previousActiveDropSurfaces = new Map()
  const trailSeeds = new Map()
  let rivuletSurface
  let surfaceIdentityFlips = 0
  let trailSeedChanges = 0
  let maximumAssignedWallError = 0
  let minimumCentreClearance = wallOffset
  let lumenCrossings = 0
  let maximumTrailChordError = 0
  let maximumTrailSpan = 0
  let maximumTrailPoints = 0
  let maximumTrailSegments = 0
  let maximumRejectedTrailSegments = 0
  let unsafePackedTrailSegments = 0
  const unsafeTrailSegmentExamples = []
  let maximumTrapMassBalanceError = 0
  let maximumSystemMassBalanceError = 0
  let maximumTrapPoolActivity = 0
  let maximumTrapSurfaceDisplacement = 0
  let previousHeadS = 0
  let previousHadRivulet = false
  let backwardHeadTravel = 0
  let residualStartById = new Map()
  const residualMovedIds = new Set()
  let terminalDrainCountAtEntry
  let terminalHeadMaximum = 0
  let terminalHeadMinimum = Number.POSITIVE_INFINITY
  let terminalReceivedMassAtEntry
  let terminalResidualCountAtEntry = 0
  let terminalTrailCountAtEntry
  let previousDrainCount = 0
  const terminalImpactTimes = []
  const terminalSurfaces = new Set()
  const eventTimes = {}

  for (let step = 0; step < Math.round(seconds * 60); step += 1) {
    model.step(1 / 60)
    const time = (step + 1) / 60
    const snapshot = model.getDebugSnapshot()
    const metrics = attachmentMetrics(snapshot, path, wallOffset)
    maximumAssignedWallError = Math.max(maximumAssignedWallError, metrics.maximumAssignedWallError)
    minimumCentreClearance = Math.min(minimumCentreClearance, metrics.minimumCentreClearance)
    lumenCrossings += metrics.lumenCrossings
    maximumTrailChordError = Math.max(maximumTrailChordError, model.maximumTrailChordError)
    maximumTrailSpan = Math.max(maximumTrailSpan, model.maximumTrailSpan)
    maximumTrapMassBalanceError = Math.max(maximumTrapMassBalanceError, model.trapMassBalanceError)
    maximumSystemMassBalanceError = Math.max(maximumSystemMassBalanceError, model.systemMassBalanceError)
    maximumTrapPoolActivity = Math.max(maximumTrapPoolActivity, model.trapPoolActivity)
    maximumTrapSurfaceDisplacement = Math.max(maximumTrapSurfaceDisplacement, model.trapPoolMaximumDisplacement)
    maximumTrailPoints = Math.max(maximumTrailPoints, snapshot.trail.length)
    maximumTrailSegments = Math.max(maximumTrailSegments, model.trailSegmentCount)
    maximumRejectedTrailSegments = Math.max(maximumRejectedTrailSegments, model.rejectedTrailSegmentCount)
    for (let index = 0; index < model.trailSegmentCount; index += 1) {
      const offset = index * 4
      const startX = model.trailSegmentStartData[offset] * 652
      const startY = model.trailSegmentStartData[offset + 1] * 607
      const endX = model.trailSegmentEndData[offset] * 652
      const endY = model.trailSegmentEndData[offset + 1] * 607
      const span = Math.hypot(endX - startX, endY - startY)
      if (!Number.isFinite(span) || span <= 0.02 || span > 10.51) unsafePackedTrailSegments += 1
    }
    if (model.rejectedTrailSegmentCount > 0 && unsafeTrailSegmentExamples.length < 4) {
      const visibleTrail = snapshot.trail.filter(point => point.wetness > 0.02).sort((a, b) => a.s - b.s)
      for (let index = 0; index < visibleTrail.length - 1 && unsafeTrailSegmentExamples.length < 4; index += 1) {
        const start = visibleTrail[index]
        const end = visibleTrail[index + 1]
        const startPoint = independentWallPoint(path, wallOffset, start.s, start.surface)
        const endPoint = independentWallPoint(path, wallOffset, end.s, end.surface)
        const pathSpan = end.s - start.s
        const worldSpan = Math.hypot(endPoint.x - startPoint.x, endPoint.y - startPoint.y)
        const middle = independentWallPoint(path, wallOffset, (start.s + end.s) * 0.5, start.surface)
        const chordError = Math.hypot((startPoint.x + endPoint.x) * 0.5 - middle.x, (startPoint.y + endPoint.y) * 0.5 - middle.y)
        if (pathSpan > 0.02 && (start.surface !== end.surface || pathSpan > 10.5 || worldSpan > 10.5 || chordError > 1.25)) {
          unsafeTrailSegmentExamples.push({ chordError, endS: end.s, endSurface: end.surface, pathSpan, startS: start.s, startSurface: start.surface, time, worldSpan })
        }
      }
    }

    const currentActiveDropSurfaces = new Map()
    for (const drop of snapshot.drops) {
      const previous = previousActiveDropSurfaces.get(drop.id)
      if (previous && previous !== drop.surface) surfaceIdentityFlips += 1
      currentActiveDropSurfaces.set(drop.id, drop.surface)
      if (drop.s > verticalEnd + 2) seen.bend = true
    }
    previousActiveDropSurfaces = currentActiveDropSurfaces
    for (const point of snapshot.trail) {
      const key = `${point.surface}:${point.s.toFixed(6)}`
      const previous = trailSeeds.get(key)
      if (previous !== undefined && Math.abs(previous - point.seed) > 1e-9) trailSeedChanges += 1
      trailSeeds.set(key, point.seed)
      if (point.s > verticalEnd + 2) seen.bend = true
    }

    if (model.pinnedCount > 0) seen.pinned = true
    if (model.slidingCount > 0) seen.sliding = true
    if (model.coalescenceCount > 0) seen.merging = true
    if (model.poolEventCount > 0 || model.pooledCount > 0) seen.pool = true
    if (snapshot.rivulet) {
      seen.rivulet = true
      if (previousHadRivulet && rivuletSurface && rivuletSurface !== snapshot.rivulet.surface) surfaceIdentityFlips += 1
      rivuletSurface = snapshot.rivulet.surface
      if (snapshot.rivulet.headS > verticalEnd + 2) seen.bend = true
      if (snapshot.rivulet.state === 'trap-pool') {
        seen.trap = true
        if (model.trapMergeProgress > 0 && model.trapMergeProgress < 1 && model.rivuletHeadVisible && model.trapPoolActive && model.trapPoolReceivedMass > 0) seen.trapMerge = true
      }
      if (snapshot.rivulet.state === 'pooled' && eventTimes.rivuletPool === undefined) eventTimes.rivuletPool = time
      if (eventTimes.rivuletPool !== undefined && eventTimes.rivuletPoolRelease === undefined && snapshot.rivulet.state === 'rivulet-head' && time > eventTimes.rivuletPool) eventTimes.rivuletPoolRelease = time
      if (previousHadRivulet && snapshot.rivulet.headS + 1e-7 < previousHeadS && snapshot.rivulet.state !== 'pooled') backwardHeadTravel += previousHeadS - snapshot.rivulet.headS
      previousHeadS = snapshot.rivulet.headS
    }
    else rivuletSurface = undefined
    previousHadRivulet = Boolean(snapshot.rivulet)
    if (snapshot.trail.length >= 3) seen.trail = true

    if (model.coalescenceCount > 0 && eventTimes.merge === undefined) eventTimes.merge = time
    if (model.slidingCount > 0 && eventTimes.slide === undefined) eventTimes.slide = time
    if (snapshot.rivulet && eventTimes.rivulet === undefined) eventTimes.rivulet = time
    if (model.poolEventCount > 0 && eventTimes.pool === undefined) eventTimes.pool = time
    if (model.drainEventCount > 0 && eventTimes.drain === undefined) eventTimes.drain = time
    if (model.lifecycleState === 'dripping') {
      if (eventTimes.dripping === undefined) {
        eventTimes.dripping = time
        terminalDrainCountAtEntry = model.drainEventCount
        terminalReceivedMassAtEntry = model.trapPoolReceivedMass
        terminalResidualCountAtEntry = snapshot.drops.length
        terminalTrailCountAtEntry = snapshot.trail.length
        residualStartById = new Map(snapshot.drops.map(drop => [drop.id, drop.s]))
      }
      if (snapshot.rivulet?.state === 'steady-drip') {
        seen.steadyDrip = true
        terminalSurfaces.add(snapshot.rivulet.surface)
      }
      if (!snapshot.rivulet && snapshot.trail.length === 0) seen.terminalDryGap = true
      if (snapshot.rivulet?.state === 'steady-drip' && snapshot.trail.length >= 4) seen.terminalWake = true
      if (snapshot.rivulet?.state === 'steady-drip') {
        terminalHeadMinimum = Math.min(terminalHeadMinimum, snapshot.rivulet.headS)
        terminalHeadMaximum = Math.max(terminalHeadMaximum, snapshot.rivulet.headS)
      }
      if (model.drainEventCount > previousDrainCount && eventTimes.dripping !== time) terminalImpactTimes.push(time)
      for (const drop of snapshot.drops) {
        const startS = residualStartById.get(drop.id)
        if (startS !== undefined && drop.s > startS + 0.2) residualMovedIds.add(drop.id)
      }
    }
    previousDrainCount = model.drainEventCount
  }

  return {
    backwardHeadTravel,
    eventTimes,
    lumenCrossings,
    maximumAssignedWallError,
    maximumSystemMassBalanceError,
    maximumTrailChordError,
    maximumTrailPoints,
    maximumTrailSegments,
    maximumRejectedTrailSegments,
    maximumTrailSpan,
    maximumTrapMassBalanceError,
    maximumTrapPoolActivity,
    maximumTrapSurfaceDisplacement,
    minimumCentreClearance,
    model,
    residualMovedIds,
    seen,
    terminalDrainCountAtEntry,
    terminalHeadMaximum,
    terminalHeadMinimum,
    terminalImpactTimes,
    terminalReceivedMassAtEntry,
    terminalResidualCountAtEntry,
    terminalSurfaces,
    terminalTrailCountAtEntry,
    signature: modelSignature(model),
    surfaceIdentityFlips,
    trailSeedChanges,
    unsafePackedTrailSegments,
    unsafeTrailSegmentExamples,
  }
}

function validateSweptWetRegionAbsorption(Model, path) {
  const model = new Model()
  model.drops.forEach((drop) => {
    drop.active = false
    drop.mass = 0
    drop.radius = 0
  })
  Object.assign(model.rivulet, {
    active: true,
    arrivalAge: 0,
    arrivalMass: 0,
    headS: 67,
    mass: 1,
    poolReleaseMass: 2,
    pressureDrive: 0,
    speed: 0,
    state: 'rivulet-head',
    surface: 'wall-a',
    wetEndS: 67,
    wetStartS: 55,
  })
  Object.assign(model.drops[0], {
    active: true,
    age: 0,
    growthRate: 0,
    mass: 0.4,
    pinningThreshold: 2,
    poolReleaseMass: 2,
    radius: 1.3,
    s: 61,
    speed: 0,
    state: 'pinned',
    surface: 'wall-a',
  })
  Object.assign(model.drops[1], {
    active: true,
    age: 0,
    growthRate: 0,
    mass: 0.35,
    pinningThreshold: 2,
    poolReleaseMass: 2,
    radius: 1.2,
    s: 61,
    speed: 0,
    state: 'pinned',
    surface: 'wall-b',
  })
  model.condensedMassInput = 1.75
  model.feedDropsIntoWetRegion()
  model.updateUniformData()
  const renderedSlots = Array.from({ length: model.drops.length })
    .filter((_, index) => model.surfaceDropData[index * 4 + 2] > 0).length
  return {
    massTransferred: Math.abs(model.rivulet.mass - 1.4) < 1e-9,
    oppositeWallStillRendered: model.drops[1].active && renderedSlots === 1,
    sameWallAbsorbed: !model.drops[0].active && model.wetRegionAbsorptionCount === 1,
    systemMassBalanceError: model.systemMassBalanceError,
    wetRegion: model.wetRegion,
    pathLength: path.length,
  }
}

function validateOutletDoesNotFreezeResiduals(Model, path) {
  const model = new Model()
  model.drops.forEach((drop) => {
    drop.active = false
    drop.mass = 0
    drop.radius = 0
  })
  const residual = model.drops[0]
  Object.assign(residual, {
    active: true,
    age: 0,
    growthRate: 0.12,
    mass: 0.8,
    pinningThreshold: 0,
    poolReleaseMass: 0.8,
    radius: 1.5,
    s: 92,
    speed: 3.2,
    state: 'sliding',
    surface: 'wall-b',
  })
  Object.assign(model.rivulet, {
    active: true,
    arrivalAge: 0,
    arrivalMass: 0,
    headS: path.length,
    mass: 1.5,
    poolReleaseMass: 2,
    pressureDrive: 0,
    speed: 0,
    state: 'rivulet-head',
    surface: 'wall-a',
    wetEndS: path.length,
    wetStartS: 55,
  })
  model.condensedMassInput = 2.3
  model.rivuletReachedOutlet()
  const before = { growthRate: residual.growthRate, mass: residual.mass, s: residual.s, speed: residual.speed, state: residual.state }
  model.step(1 / 60)
  return {
    continued: residual.active && residual.mass > before.mass && residual.s > before.s,
    preservedLifecycle: before.growthRate > 0 && before.speed > 0 && before.state === 'sliding',
    notAbsorbedAcrossWalls: residual.surface === 'wall-b' && residual.active,
  }
}

try {
  await transpile('surfacePath')
  await transpile('millerUreyCondenserPath')
  await transpile('millerUreyCondensationModel')
  const pathModule = await import(`${pathToFileURL(join(temporaryDirectory, 'millerUreyCondenserPath.mjs')).href}?v=${Date.now()}`)
  const modelModule = await import(`${pathToFileURL(join(temporaryDirectory, 'millerUreyCondensationModel.mjs')).href}?v=${Date.now()}`)
  const path = pathModule.millerUreyCondenserPath
  const wallOffset = pathModule.CONDENSER_WALL_OFFSET
  const verticalEnd = pathModule.CONDENSER_VERTICAL_END_S
  const Model = modelModule.MillerUreyCondensationModel
  const start = path.pointAt(0)
  const end = path.pointAt(path.length)
  const firstTangent = path.tangentAt(0)
  const sweptRegion = validateSweptWetRegionAbsorption(Model, path)
  const outletResidual = validateOutletDoesNotFreezeResiduals(Model, path)

  console.log(`INFO condenser surface path length ${path.length.toFixed(3)} px`)
  check(path.length > 225 && path.length < 231, 'surface path uses the sourced condenser centreline length')
  check(Math.hypot(start.x - 185.858871, start.y - 318) < 0.001, 'surface path begins in the vertical condensation zone')
  check(Math.hypot(end.x - 268.311637, end.y - 496.156219) < 0.001, 'surface path terminates at the trap liquid surface')
  check(Math.abs(Math.hypot(firstTangent.x, firstTangent.y) - 1) < 1e-8, 'surface path tangents are normalized')

  const wallGeometry = validateOffsetWallGeometry(path, wallOffset)
  console.log(`INFO wall geometry ${JSON.stringify(wallGeometry)}`)
  check(wallGeometry.lumenSideFailures === 0 && wallGeometry.maximumSeparationError < 1e-8 && wallGeometry.maximumWallStep < 1.2, 'independently derived wall A and wall B remain continuous and separated through both bends')

  const first = await simulate(Model, path, wallOffset, verticalEnd)
  const second = await simulate(Model, path, wallOffset, verticalEnd)
  console.log(`INFO condenser event times ${JSON.stringify(first.eventTimes)}`)
  console.log(`INFO wall error ${first.maximumAssignedWallError.toExponential(2)} px, minimum centre clearance ${first.minimumCentreClearance.toFixed(3)} px, lumen crossings ${first.lumenCrossings}`)
  console.log(`INFO maximum trail points ${first.maximumTrailPoints}, span ${first.maximumTrailSpan.toFixed(3)} px, chord error ${first.maximumTrailChordError.toFixed(3)} px`)
  console.log(`INFO maximum explicit trail segments ${first.maximumTrailSegments}, rejected render segments ${first.maximumRejectedTrailSegments}`)
  if (first.unsafeTrailSegmentExamples.length) console.log(`INFO rejected segment examples ${JSON.stringify(first.unsafeTrailSegmentExamples)}`)
  console.log(`INFO receiver peak activity ${first.maximumTrapPoolActivity.toFixed(3)}, displacement ${first.maximumTrapSurfaceDisplacement.toFixed(3)} px, trap mass error ${first.maximumTrapMassBalanceError.toExponential(2)}, system mass error ${first.maximumSystemMassBalanceError.toExponential(2)}`)
  console.log(`INFO terminal receiver impacts ${first.terminalImpactTimes.slice(0, 5).map(time => time.toFixed(2)).join(', ')} s`)

  check(first.seen.pinned, 'small condensate droplets remain pinned before sliding')
  check(first.seen.sliding, 'grown or merged droplets transition into sliding')
  check(first.seen.merging, 'neighboring droplets merge only with neighbours on the same wall')
  check(first.seen.rivulet && first.seen.trail, 'a rivulet head leaves a connected multi-point wet trail')
  check(first.seen.pool, 'low-slope regions visibly enter a pooled state')
  check(first.eventTimes.rivuletPoolRelease - first.eventTimes.rivuletPool < 2.2, 'the first rivulet pauses briefly at the low bend without appearing permanently frozen')
  check(first.seen.bend && first.backwardHeadTravel < 1e-7, 'surface-bound liquid follows the bend without backward or ballistic launch')
  check(first.lumenCrossings === 0 && first.maximumAssignedWallError < 0.08 && first.minimumCentreClearance > wallOffset * 0.82, 'every attached drop, trail point, and rivulet head remains on its independently derived wall surface')
  check(first.surfaceIdentityFlips === 0, 'drop and rivulet surface identity never silently flips through the lumen')
  check(first.seen.trap && first.model.drainEventCount > 0, 'surface flow reaches and merges into the trap pool')
  check(first.seen.trapMerge, 'the terminal head remains attached while mass enters an active receiving pool')
  check(first.maximumTrapPoolActivity > 0.35 && first.maximumTrapSurfaceDisplacement > 0.10 && first.maximumTrapSurfaceDisplacement <= 1.56, 'received mass excites a bounded damped trap-water surface')
  check(first.maximumTrapMassBalanceError < 1e-5 && first.maximumSystemMassBalanceError < 1e-5 && first.model.systemMassBalanceError < 1e-5, 'mass remains conserved from condensation through surface drops, rivulet, and receiver')
  check(first.maximumTrailSpan < 8 && first.maximumTrailChordError < 1.2, 'local trail decimation preserves bend geometry and continuous segment coverage')
  check(first.maximumTrailSegments > 1 && first.unsafePackedTrailSegments === 0, 'the renderer receives only explicit bounded segment pairs; unsafe gaps are rejected before they can become stray streams')
  check(first.trailSeedChanges === 0, 'trail irregularity retains stable spatial identity during local decimation')
  check(first.model.lifecycleState === 'dripping' && first.model.rivuletState === 'steady-drip' && first.model.trapMergeProgress === 1 && first.seen.steadyDrip && first.seen.terminalWake, 'the main transfer transitions into a restrained surface-bound terminal drip cadence with a moving local wake')
  check(first.terminalTrailCountAtEntry === 0 && first.seen.terminalDryGap, 'live playback creates no permanent synthetic trail or static bend beads between continuing drops')
  check(first.model.drainEventCount >= (first.terminalDrainCountAtEntry ?? 0) + 3 && first.model.trapPoolReceivedMass > (first.terminalReceivedMassAtEntry ?? 0) + 0.2, 'follow-up drops continue reaching and disturbing the receiver')
  check(first.terminalSurfaces.has('wall-a') && first.terminalSurfaces.has('wall-b') && first.model.terminalDrainCountWallA > 0 && first.model.terminalDrainCountWallB > 0, 'continuing condensate alternates between both wetting surfaces and both sides reach the receiver')
  const terminalImpactGaps = first.terminalImpactTimes.slice(1).map((time, index) => time - first.terminalImpactTimes[index])
  check(first.terminalHeadMinimum < 25 && first.terminalHeadMaximum > path.length * 0.9, 'each continuing drop visibly traverses the complete condenser-to-trap path')
  check(first.terminalImpactTimes.length >= 3 && Math.max(...terminalImpactGaps.slice(0, 3)) < 4.2, 'receiver impacts remain frequent enough to read as continuous dripping')
  check(sweptRegion.sameWallAbsorbed && sweptRegion.massTransferred && sweptRegion.systemMassBalanceError < 1e-9, 'a same-wall droplet swept by the connected wet interval is absorbed and transfers its mass into the film')
  check(sweptRegion.oppositeWallStillRendered, 'an opposite-wall droplet at the same path coordinate remains independent and rendered')
  check(outletResidual.preservedLifecycle && outletResidual.continued && outletResidual.notAbsorbedAcrossWalls, 'reaching the receiver does not freeze residual opposite-wall droplets; their normal lifecycle continues')
  check(first.model.detachmentCount === 0, 'closed trap geometry does not detach free projectiles')
  check(first.model.condensationFeedCount > 0 && first.model.wetRegionAbsorptionCount > 0, 'new condensation and intersected droplets feed existing same-wall wet regions before transfer')

  const staticModel = new Model()
  staticModel.createStaticFinalState()
  const staticSnapshot = staticModel.getDebugSnapshot()
  check(staticModel.lifecycleState === 'settled' && staticModel.trapPoolActive && staticModel.trapPoolReceivedMass > 0 && staticSnapshot.trail.length >= 8 && !staticModel.rivuletHeadVisible && staticModel.trapPoolActivity === 0 && staticModel.systemMassBalanceError < 1e-8, 'explicit static state shows final wet trail and received condensate without transient motion')
  check(first.signature === second.signature, 'seeded fixed-step playback and terminal drip cadence are deterministic')
}
finally {
  await rm(temporaryDirectory, { force: true, recursive: true })
}

if (failures) {
  console.error(`${failures} condenser model validation check(s) failed from ${root.pathname}`)
  process.exit(1)
}
console.log('Miller–Urey condenser surface-flow model validation passed.')
