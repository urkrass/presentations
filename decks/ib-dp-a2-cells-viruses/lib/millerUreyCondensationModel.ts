import {
  CONDENSER_OUTLET_MODE,
  CONDENSER_TRAP_SURFACE_S,
  CONDENSER_VERTICAL_END_S,
  gravityProjectionAt,
  millerUreyCondenserPath,
  sourcePointToUv,
  sourceRadiusToUv,
  surfacePositionAt,
  surfaceTangentAt,
  trapPoolSurfacePointAt,
  type CondenserSurfaceSide,
} from './millerUreyCondenserPath'
import { dot, type Vec2 } from './surfacePath'

export const MAX_CONDENSATE_DROPS = 16
export const MAX_RIVULET_TRAIL_POINTS = 48
export const MAX_RIVULET_TRAIL_SEGMENTS = MAX_RIVULET_TRAIL_POINTS - 1
export const MAX_DETACHED_DROPS = 4
export const TRAP_SURFACE_SAMPLE_COUNT = 9

export type SurfaceDropletState = 'pinned' | 'sliding' | 'pooled'
export type RivuletState = 'inactive' | 'rivulet-head' | 'pooled' | 'trap-pool' | 'steady-drip' | 'settled'
export type CondenserLifecycleState = 'condensing' | 'flowing' | 'transferring' | 'dripping' | 'settled'

export interface SurfaceDroplet {
  active: boolean
  age: number
  growthRate: number
  id: number
  mass: number
  pinningThreshold: number
  poolReleaseMass: number
  radius: number
  s: number
  speed: number
  state: SurfaceDropletState
  surface: CondenserSurfaceSide
}

export interface RivuletTrailPoint {
  age: number
  s: number
  seed: number
  surface: CondenserSurfaceSide
  wetness: number
  width: number
}

interface Rivulet {
  active: boolean
  arrivalAge: number
  arrivalMass: number
  headS: number
  mass: number
  poolReleaseMass: number
  pressureDrive: number
  speed: number
  state: RivuletState
  surface: CondenserSurfaceSide
  wetEndS: number
  wetStartS: number
}

interface TrapPool {
  active: boolean
  contactAge: number
  heights: Float32Array
  pendingImpulse: number
  receivedMass: number
  velocities: Float32Array
}

interface DetachedDroplet {
  active: boolean
  mass: number
  radius: number
  velocity: Vec2
  x: number
  y: number
}

export interface CondenserDebugDrop {
  gravityProjection: number
  id: number
  mass: number
  normal: Vec2
  position: Vec2
  radius: number
  s: number
  speed: number
  state: SurfaceDropletState
  surface: CondenserSurfaceSide
  tangent: Vec2
}

export interface CondenserDebugTrailPoint extends RivuletTrailPoint {
  position: Vec2
}

export interface CondenserDebugSnapshot {
  absorbedDropCount: number
  condensedMassInput: number
  detachmentPoint: Vec2
  detached: Array<{ position: Vec2, radius: number }>
  drops: CondenserDebugDrop[]
  outletMode: 'pool' | 'detach'
  pathLength: number
  lifecycleState: CondenserLifecycleState
  rivulet: null | {
    gravityProjection: number
    headS: number
    mass: number
    normal: Vec2
    position: Vec2
    speed: number
    state: RivuletState
    surface: CondenserSurfaceSide
    tangent: Vec2
  }
  trail: CondenserDebugTrailPoint[]
  wetRegion: null | {
    endS: number
    startS: number
    surface: CondenserSurfaceSide
  }
  trapPool: {
    active: boolean
    activity: number
    massBalanceError: number
    receivedMass: number
    samples: Array<{ displacement: number, velocity: number, x: number, y: number }>
    transferProgress: number
  }
  systemMassBalanceError: number
}

const GRAVITY: Vec2 = { x: 0, y: 1 }
const FIXED_EPSILON = 1e-7
const SLIDING_GRAVITY_SCALE = 92
const RIVULET_GRAVITY_SCALE = 118
const RIVULET_FORMATION_MASS = 1.52
const RIVULET_POOL_RELEASE_MASS = 1.88
const CONDENSATION_INTERVAL = 0.29
const TRAP_TRANSFER_RATE = 1.68
const TRAP_RETAINED_CONTACT_MASS = 0.018
const TRAP_WAVE_COUPLING = 48
const TRAP_WAVE_RESTORING = 24
const TRAP_WAVE_DAMPING = 8.4
const SETTLED_POOL_ACTIVITY = 0.018
const FINAL_TRAIL_START_OFFSET = 74
const CONTINUING_DRIP_START_S = 22
const CONTINUING_DRIP_BASE_DELAY = 0.62
const CONTINUING_DRIP_GRAVITY_SCALE = 104
const CONTINUING_DRIP_WAKE_LENGTH = 13.5

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value))
}

function emptySurfaceDrop(id: number): SurfaceDroplet {
  return {
    active: false,
    age: 0,
    growthRate: 0,
    id,
    mass: 0,
    pinningThreshold: 1,
    poolReleaseMass: 1.7,
    radius: 0,
    s: 0,
    speed: 0,
    state: 'pinned',
    surface: 'wall-a',
  }
}

function emptyDetachedDrop(): DetachedDroplet {
  return {
    active: false,
    mass: 0,
    radius: 0,
    velocity: { x: 0, y: 0 },
    x: 0,
    y: 0,
  }
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = seed + 0x6D2B79F5 | 0
    let value = Math.imul(seed ^ seed >>> 15, 1 | seed)
    value = value + Math.imul(value ^ value >>> 7, 61 | value) ^ value
    return ((value ^ value >>> 14) >>> 0) / 4294967296
  }
}

function radiusFromMass(mass: number) {
  return 0.72 + Math.sqrt(Math.max(0, mass)) * 0.91
}

function stateCode(state: SurfaceDropletState) {
  if (state === 'sliding') return 2
  if (state === 'pooled') return 3
  return 1
}

function stableTrailSeed(s: number, surface: CondenserSurfaceSide) {
  const sideSalt = surface === 'wall-a' ? 19.53 : 41.07
  const value = Math.sin(s * 12.9898 + sideSalt * 78.233) * 43758.5453
  return value - Math.floor(value)
}

export class MillerUreyCondensationModel {
  readonly detachedData = new Float32Array(MAX_DETACHED_DROPS * 4)
  readonly drops = Array.from({ length: MAX_CONDENSATE_DROPS }, (_, index) => emptySurfaceDrop(index))
  readonly headData = new Float32Array(4)
  readonly headShape = new Float32Array(4)
  readonly surfaceDropData = new Float32Array(MAX_CONDENSATE_DROPS * 4)
  readonly surfaceDropShape = new Float32Array(MAX_CONDENSATE_DROPS * 4)
  readonly trailSegmentStartData = new Float32Array(MAX_RIVULET_TRAIL_SEGMENTS * 4)
  readonly trailSegmentEndData = new Float32Array(MAX_RIVULET_TRAIL_SEGMENTS * 4)
  readonly trapPoolData = new Float32Array(4)
  readonly trapSurfaceData = new Float32Array(TRAP_SURFACE_SAMPLE_COUNT * 4)

  collectedFraction = 0
  condensedMassInput = 0
  coalescenceCount = 0
  condensationFeedCount = 0
  wetRegionAbsorptionCount = 0
  constraintViolationCount = 0
  detachmentCount = 0
  drainEventCount = 0
  terminalDrainCountWallA = 0
  terminalDrainCountWallB = 0
  poolEventCount = 0
  rivuletFormationCount = 0
  trailCount = 0
  trailSegmentCount = 0
  rejectedTrailSegmentCount = 0
  lifecycleState: CondenserLifecycleState = 'condensing'
  directCollectedMass = 0

  private condensationAccumulator = 0
  private elapsed = 0
  private random = mulberry32(1953)
  private terminalDripClock = 0
  private terminalDripDelay = CONTINUING_DRIP_BASE_DELAY
  private terminalDripIndex = 0
  private readonly detachedDrops = Array.from({ length: MAX_DETACHED_DROPS }, emptyDetachedDrop)
  private readonly outletMode: 'pool' | 'detach' = CONDENSER_OUTLET_MODE
  private readonly rivulet: Rivulet = {
    active: false,
    arrivalAge: 0,
    arrivalMass: 0,
    headS: 0,
    mass: 0,
    poolReleaseMass: RIVULET_POOL_RELEASE_MASS,
    pressureDrive: 0,
    speed: 0,
    state: 'inactive',
    surface: 'wall-a',
    wetEndS: 0,
    wetStartS: 0,
  }
  private readonly trapPool: TrapPool = {
    active: false,
    contactAge: 0,
    heights: new Float32Array(TRAP_SURFACE_SAMPLE_COUNT),
    pendingImpulse: 0,
    receivedMass: 0,
    velocities: new Float32Array(TRAP_SURFACE_SAMPLE_COUNT),
  }
  private readonly trail: RivuletTrailPoint[] = []

  constructor() {
    this.reset()
  }

  reset() {
    this.random = mulberry32(1953)
    this.elapsed = 0
    this.condensationAccumulator = 0
    this.terminalDripClock = 0
    this.terminalDripDelay = CONTINUING_DRIP_BASE_DELAY
    this.terminalDripIndex = 0
    this.collectedFraction = 0
    this.condensedMassInput = 0
    this.coalescenceCount = 0
    this.condensationFeedCount = 0
    this.wetRegionAbsorptionCount = 0
    this.constraintViolationCount = 0
    this.detachmentCount = 0
    this.drainEventCount = 0
    this.terminalDrainCountWallA = 0
    this.terminalDrainCountWallB = 0
    this.poolEventCount = 0
    this.rivuletFormationCount = 0
    this.trailCount = 0
    this.trailSegmentCount = 0
    this.rejectedTrailSegmentCount = 0
    this.lifecycleState = 'condensing'
    this.directCollectedMass = 0
    this.trail.splice(0)
    Object.assign(this.rivulet, {
      active: false,
      arrivalAge: 0,
      arrivalMass: 0,
      headS: 0,
      mass: 0,
      poolReleaseMass: RIVULET_POOL_RELEASE_MASS,
      pressureDrive: 0,
      speed: 0,
      state: 'inactive',
      surface: 'wall-a',
      wetEndS: 0,
      wetStartS: 0,
    })
    this.trapPool.active = false
    this.trapPool.contactAge = 0
    this.trapPool.heights.fill(0)
    this.trapPool.pendingImpulse = 0
    this.trapPool.receivedMass = 0
    this.trapPool.velocities.fill(0)
    this.drops.forEach((_, index) => { this.drops[index] = emptySurfaceDrop(index) })
    this.detachedDrops.forEach((_, index) => { this.detachedDrops[index] = emptyDetachedDrop() })

    const opening: Array<[number, CondenserSurfaceSide, number, number, number]> = [
      [17.0, 'wall-a', 0.24, 1.08, 0.78],
      [19.7, 'wall-a', 0.26, 1.30, 0.84],
      [44.0, 'wall-b', 0.31, 1.16, 0.82],
      [46.8, 'wall-b', 0.29, 1.38, 0.79],
      [76.0, 'wall-a', 0.72, 1.52, 0.96],
      [79.0, 'wall-a', 0.68, 1.74, 0.90],
    ]
    opening.forEach(([s, surface, mass, delay, pinning], index) => {
      this.activateDrop(this.drops[index], s, surface, mass, delay, pinning)
      this.condensedMassInput += mass
    })
    this.updateUniformData()
  }

  step(dt: number) {
    const boundedDt = clamp(dt, 0, 0.05)
    if (boundedDt <= 0) return
    if (this.lifecycleState === 'settled') return
    this.elapsed += boundedDt
    if (this.lifecycleState === 'dripping') {
      for (const drop of this.drops) this.updateSurfaceDrop(drop, boundedDt, true)
      this.mergeSurfaceNeighbours()
      this.updateTerminalDrip(boundedDt)
      this.feedDropsIntoWetRegion()
      this.updateTrapPool(boundedDt)
      this.updateUniformData()
      return
    }
    if (this.lifecycleState !== 'transferring') this.condensationAccumulator += boundedDt
    for (const drop of this.drops) this.updateSurfaceDrop(drop, boundedDt)
    this.mergeSurfaceNeighbours()
    if (this.lifecycleState !== 'transferring') this.promoteLargestDropToRivulet()
    this.updateRivulet(boundedDt)
    this.feedDropsIntoWetRegion()
    this.updateTrapPool(boundedDt)
    this.updateTrail(boundedDt)
    this.updateDetachedDrops(boundedDt)

    while (this.lifecycleState !== 'transferring' && this.elapsed > 1.15 && this.condensationAccumulator >= CONDENSATION_INTERVAL) {
      this.condensationAccumulator -= CONDENSATION_INTERVAL
      this.condensePulse()
    }
    if (
      this.lifecycleState === 'transferring'
      && this.trapMergeProgress >= 1
      && this.trapPoolActivity < SETTLED_POOL_ACTIVITY
    ) this.finalizeSettledState()
    this.updateUniformData()
  }

  createStaticFinalState() {
    this.reset()
    this.drops.forEach((drop) => {
      drop.active = false
      drop.mass = 0
      drop.radius = 0
    })
    this.trapPool.active = true
    this.trapPool.contactAge = 6
    this.trapPool.heights.fill(0)
    this.trapPool.velocities.fill(0)
    this.trapPool.pendingImpulse = 0
    this.trapPool.receivedMass = 3.2
    this.condensedMassInput = 3.2
    this.directCollectedMass = 0
    this.collectedFraction = 0.72
    this.rivulet.surface = 'wall-a'
    this.rivulet.headS = CONDENSER_TRAP_SURFACE_S
    this.rivulet.mass = 0
    this.rivulet.arrivalMass = 3.2
    this.rivulet.active = false
    this.rivulet.state = 'settled'
    this.rivulet.wetStartS = Math.max(0, CONDENSER_TRAP_SURFACE_S - FINAL_TRAIL_START_OFFSET)
    this.rivulet.wetEndS = CONDENSER_TRAP_SURFACE_S
    this.createFinalReadableTrail('wall-a')
    this.lifecycleState = 'settled'
    this.updateUniformData()
  }

  get activeCount() {
    return this.drops.filter(drop => drop.active && drop.age >= 0).length
  }

  get pinnedCount() {
    return this.drops.filter(drop => drop.active && drop.age >= 0 && drop.state === 'pinned').length
  }

  get slidingCount() {
    return this.drops.filter(drop => drop.active && drop.age >= 0 && drop.state === 'sliding').length
  }

  get pooledCount() {
    return this.drops.filter(drop => drop.active && drop.age >= 0 && drop.state === 'pooled').length
      + (this.rivulet.active && this.rivulet.state === 'pooled' ? 1 : 0)
  }

  get rivuletState() {
    return this.rivulet.state
  }

  get settled() {
    return this.lifecycleState === 'settled'
  }

  get rivuletHeadS() {
    return this.rivulet.active || this.lifecycleState === 'dripping' || this.lifecycleState === 'settled' ? this.rivulet.headS : 0
  }

  get trapMergeProgress() {
    if ((this.lifecycleState === 'dripping' || this.lifecycleState === 'settled') && this.trapPool.active) return 1
    if (!this.rivulet.active || this.rivulet.state !== 'trap-pool') return 0
    if (this.rivulet.arrivalMass <= FIXED_EPSILON) return 1
    return clamp(1 - this.rivulet.mass / this.rivulet.arrivalMass, 0, 1)
  }

  get rivuletHeadVisible() {
    return this.rivulet.active
      && (this.rivulet.state !== 'trap-pool' || this.rivulet.mass > TRAP_RETAINED_CONTACT_MASS)
  }

  get wetRegion() {
    if (!this.rivulet.active || this.rivulet.wetEndS < this.rivulet.wetStartS) return null
    return {
      endS: this.rivulet.wetEndS,
      startS: this.rivulet.wetStartS,
      surface: this.rivulet.surface,
    }
  }

  get trapPoolActive() {
    return this.trapPool.active
  }

  get trapPoolActivity() {
    let maximumHeight = 0
    let maximumVelocity = 0
    for (let index = 0; index < TRAP_SURFACE_SAMPLE_COUNT; index += 1) {
      maximumHeight = Math.max(maximumHeight, Math.abs(this.trapPool.heights[index]))
      maximumVelocity = Math.max(maximumVelocity, Math.abs(this.trapPool.velocities[index]))
    }
    const transferActivity = this.rivulet.state === 'trap-pool' && this.rivuletHeadVisible
      ? 0.24 + (1 - this.trapMergeProgress) * 0.32
      : 0
    return clamp(maximumHeight / 1.35 + maximumVelocity / 18 + transferActivity, 0, 1)
  }

  get trapPoolMaximumDisplacement() {
    return Math.max(...this.trapPool.heights.map(value => Math.abs(value)))
  }

  get trapPoolReceivedMass() {
    return this.trapPool.receivedMass
  }

  get trapMassBalanceError() {
    if (this.lifecycleState !== 'transferring' || !this.trapPool.active || this.rivulet.arrivalMass <= FIXED_EPSILON) return 0
    return Math.abs(this.rivulet.arrivalMass - this.rivulet.mass - this.trapPool.receivedMass)
  }

  get systemMassBalanceError() {
    const surfaceMass = this.drops.reduce((sum, drop) => sum + (drop.active ? drop.mass : 0), 0)
    const rivuletMass = this.rivulet.active ? this.rivulet.mass : 0
    const accountedMass = surfaceMass + rivuletMass + this.trapPool.receivedMass + this.directCollectedMass
    return Math.abs(this.condensedMassInput - accountedMass)
  }

  get pathLength() {
    return millerUreyCondenserPath.length
  }

  get maximumTrailSpan() {
    let maximum = 0
    for (let index = 1; index < this.trail.length; index += 1) {
      maximum = Math.max(maximum, this.trail[index].s - this.trail[index - 1].s)
    }
    return maximum
  }

  get maximumTrailChordError() {
    let maximum = 0
    for (let index = 1; index < this.trail.length; index += 1) {
      const start = this.trail[index - 1]
      const end = this.trail[index]
      const startPosition = surfacePositionAt(start.s, start.surface)
      const endPosition = surfacePositionAt(end.s, end.surface)
      const middleS = (start.s + end.s) * 0.5
      const expectedMiddle = surfacePositionAt(middleS, start.surface)
      const chordMiddle = {
        x: (startPosition.x + endPosition.x) * 0.5,
        y: (startPosition.y + endPosition.y) * 0.5,
      }
      maximum = Math.max(maximum, Math.hypot(
        chordMiddle.x - expectedMiddle.x,
        chordMiddle.y - expectedMiddle.y,
      ))
    }
    return maximum
  }

  getDebugSnapshot(): CondenserDebugSnapshot {
    const drops = this.drops
      .filter(drop => drop.active && drop.age >= 0)
      .map(drop => {
        const position = surfacePositionAt(drop.s, drop.surface)
        const tangent = surfaceTangentAt(drop.s, drop.surface)
        const normal = { x: -tangent.y, y: tangent.x }
        return {
          gravityProjection: dot(GRAVITY, tangent),
          id: drop.id,
          mass: drop.mass,
          normal,
          position,
          radius: drop.radius,
          s: drop.s,
          speed: drop.speed,
          state: drop.state,
          surface: drop.surface,
          tangent,
        }
      })
    const rivulet = this.rivulet.active
      ? {
          gravityProjection: gravityProjectionAt(this.rivulet.headS, this.rivulet.surface),
          headS: this.rivulet.headS,
          mass: this.rivulet.mass,
          normal: (() => {
            const tangent = surfaceTangentAt(this.rivulet.headS, this.rivulet.surface)
            return { x: -tangent.y, y: tangent.x }
          })(),
          position: surfacePositionAt(this.rivulet.headS, this.rivulet.surface),
          speed: this.rivulet.speed,
          state: this.rivulet.state,
          surface: this.rivulet.surface,
          tangent: surfaceTangentAt(this.rivulet.headS, this.rivulet.surface),
        }
      : null
    return {
      absorbedDropCount: this.wetRegionAbsorptionCount,
      condensedMassInput: this.condensedMassInput,
      detachmentPoint: surfacePositionAt(CONDENSER_TRAP_SURFACE_S, 'wall-a'),
      detached: this.detachedDrops.filter(drop => drop.active).map(drop => ({
        position: { x: drop.x, y: drop.y },
        radius: drop.radius,
      })),
      drops,
      outletMode: this.outletMode,
      pathLength: millerUreyCondenserPath.length,
      lifecycleState: this.lifecycleState,
      rivulet,
      trail: this.trail.map(point => ({
        ...point,
        position: surfacePositionAt(point.s, point.surface),
      })),
      wetRegion: this.wetRegion,
      trapPool: {
        active: this.trapPool.active,
        activity: this.trapPoolActivity,
        massBalanceError: this.trapMassBalanceError,
        receivedMass: this.trapPool.receivedMass,
        samples: Array.from({ length: TRAP_SURFACE_SAMPLE_COUNT }, (_, index) => {
          const amount = index / (TRAP_SURFACE_SAMPLE_COUNT - 1)
          const sourcePoint = trapPoolSurfacePointAt(amount)
          return {
            displacement: this.trapPool.heights[index],
            velocity: this.trapPool.velocities[index],
            x: sourcePoint.x,
            y: sourcePoint.y + this.trapPool.heights[index],
          }
        }),
        transferProgress: this.trapMergeProgress,
      },
      systemMassBalanceError: this.systemMassBalanceError,
    }
  }

  private activateDrop(drop: SurfaceDroplet, s: number, surface: CondenserSurfaceSide, mass: number, delay = 0, pinningThreshold?: number) {
    Object.assign(drop, {
      active: true,
      age: -delay,
      growthRate: 0.11 + this.random() * 0.07,
      mass,
      pinningThreshold: pinningThreshold ?? (0.72 + this.random() * 0.38),
      poolReleaseMass: Math.max(1.55, mass + 0.46 + this.random() * 0.22),
      radius: radiusFromMass(mass),
      s: clamp(s, 0, CONDENSER_VERTICAL_END_S - 2),
      speed: 0,
      state: 'pinned' as SurfaceDropletState,
      surface,
    })
  }

  private updateSurfaceDrop(drop: SurfaceDroplet, dt: number, connectedDrainage = false) {
    if (!drop.active) return
    drop.age += dt
    if (drop.age < 0) return
    const condensedMass = drop.growthRate * dt
    drop.mass += condensedMass
    this.condensedMassInput += condensedMass
    drop.radius = radiusFromMass(drop.mass)
    const tangent = surfaceTangentAt(drop.s, drop.surface)
    const gravityProjection = Math.max(0, dot(GRAVITY, tangent))

    if (drop.state === 'pinned') {
      drop.speed = 0
      if (connectedDrainage || (drop.mass >= drop.pinningThreshold && gravityProjection > 0.14)) {
        drop.state = 'sliding'
        drop.speed = connectedDrainage ? 7.2 : 1.1 + (drop.mass - drop.pinningThreshold) * 2.4
      }
      return
    }

    if (drop.state === 'pooled') {
      drop.speed = 0
      if (connectedDrainage || (drop.mass >= drop.poolReleaseMass && gravityProjection >= 0)) {
        drop.state = 'sliding'
        drop.speed = connectedDrainage ? 7.2 : 3.4 + (drop.mass - drop.poolReleaseMass) * 2.1
      }
      return
    }

    const massMobility = 0.70 + Math.min(0.38, Math.sqrt(drop.mass) * 0.18)
    drop.speed += gravityProjection * SLIDING_GRAVITY_SCALE * massMobility * dt
    if (gravityProjection < 0.09) {
      drop.speed *= Math.exp(-(connectedDrainage ? 2.2 : 7.2) * dt)
      if (connectedDrainage) drop.speed = Math.max(7.2, drop.speed)
      else if (drop.speed < 1.25) {
        drop.state = 'pooled'
        drop.speed = 0
        drop.poolReleaseMass = Math.max(drop.poolReleaseMass, drop.mass + 0.34)
        this.poolEventCount += 1
        return
      }
    }
    else drop.speed *= Math.exp(-2.85 * dt)

    drop.s = clamp(drop.s + drop.speed * dt, 0, millerUreyCondenserPath.length)
    this.checkSurfaceConstraint(drop.s, drop.surface)
    if (drop.s >= millerUreyCondenserPath.length - FIXED_EPSILON) this.arriveAtOutlet(drop)
  }

  private mergeSurfaceNeighbours() {
    for (const surface of ['wall-a', 'wall-b'] as const) {
      const active = this.drops
        .filter(drop => drop.active && drop.age >= 0 && drop.surface === surface)
        .sort((a, b) => a.s - b.s)
      for (let index = 0; index < active.length - 1; index += 1) {
        const a = active[index]
        const b = active[index + 1]
        if (!a.active || !b.active) continue
        const alongDistance = Math.abs(a.s - b.s)
        const mergeThreshold = Math.max(2.7, (a.radius + b.radius) * 1.14)
        if (alongDistance > mergeThreshold) continue

        const receiver = a.s >= b.s ? a : b
        const consumed = receiver === a ? b : a
        const totalMass = receiver.mass + consumed.mass
        receiver.s = (receiver.s * receiver.mass + consumed.s * consumed.mass) / totalMass
        receiver.speed = (receiver.speed * receiver.mass + consumed.speed * consumed.mass) / totalMass
        receiver.mass = totalMass
        receiver.radius = radiusFromMass(totalMass)
        receiver.pinningThreshold = Math.min(receiver.pinningThreshold, consumed.pinningThreshold) * 0.97
        receiver.poolReleaseMass = Math.min(receiver.poolReleaseMass, consumed.poolReleaseMass)
        if (receiver.state === 'pinned' && consumed.state !== 'pinned') receiver.state = consumed.state
        consumed.active = false
        consumed.mass = 0
        consumed.radius = 0
        this.coalescenceCount += 1
      }
    }
  }

  private promoteLargestDropToRivulet() {
    if (this.rivulet.active) return
    const candidate = this.drops
      .filter(drop => drop.active && drop.age >= 0 && drop.mass >= RIVULET_FORMATION_MASS && drop.state !== 'pinned')
      .sort((a, b) => b.mass - a.mass || b.s - a.s)[0]
    if (!candidate) return
    Object.assign(this.rivulet, {
      active: true,
      arrivalAge: 0,
      arrivalMass: 0,
      headS: candidate.s,
      mass: candidate.mass,
      poolReleaseMass: Math.max(RIVULET_POOL_RELEASE_MASS, candidate.mass + 0.30),
      pressureDrive: 0,
      speed: Math.max(2.4, candidate.speed),
      state: 'rivulet-head' as RivuletState,
      surface: candidate.surface,
      wetEndS: candidate.s,
      wetStartS: candidate.s,
    })
    candidate.active = false
    candidate.mass = 0
    candidate.radius = 0
    this.rivuletFormationCount += 1
    this.lifecycleState = 'flowing'
    this.appendTrailPoint(true)
  }

  private updateRivulet(dt: number) {
    if (!this.rivulet.active) return
    if (this.rivulet.state === 'trap-pool') {
      this.rivulet.arrivalAge += dt
      const transferableMass = Math.max(0, this.rivulet.mass - TRAP_RETAINED_CONTACT_MASS)
      let transferredMass = transferableMass * (1 - Math.exp(-TRAP_TRANSFER_RATE * dt))
      if (transferableMass < 0.006) transferredMass = this.rivulet.mass
      this.rivulet.mass = Math.max(0, this.rivulet.mass - transferredMass)
      this.trapPool.receivedMass += transferredMass
      this.trapPool.pendingImpulse += transferredMass * 7.6
      this.collectedFraction = Math.min(1, this.collectedFraction + transferredMass * 0.055)
      this.rivulet.headS = CONDENSER_TRAP_SURFACE_S
      this.rivulet.speed = 0
      return
    }

    const tangent = surfaceTangentAt(this.rivulet.headS, this.rivulet.surface)
    const gravityProjection = Math.max(0, dot(GRAVITY, tangent))
    if (this.rivulet.state === 'pooled') {
      this.rivulet.arrivalAge += dt
      this.rivulet.speed = 0
      if (this.rivulet.mass >= this.rivulet.poolReleaseMass || this.rivulet.arrivalAge >= 1.15) {
        this.rivulet.state = 'rivulet-head'
        this.rivulet.speed = 4.2
        this.rivulet.pressureDrive = 30
      }
      return
    }

    const pressureAcceleration = this.rivulet.pressureDrive > 0 ? 20 : 0
    this.rivulet.speed += (gravityProjection * RIVULET_GRAVITY_SCALE + pressureAcceleration) * dt
    this.rivulet.speed *= Math.exp(-(gravityProjection < 0.10 ? 7.8 : 2.25) * dt)
    if (gravityProjection < 0.075 && this.rivulet.pressureDrive <= 0 && this.rivulet.speed < 7.2) {
      this.rivulet.state = 'pooled'
      this.rivulet.arrivalAge = 0
      this.rivulet.speed = 0
      this.rivulet.poolReleaseMass = Math.max(this.rivulet.poolReleaseMass, this.rivulet.mass + 0.22)
      this.poolEventCount += 1
      this.thickenNearestTrail(this.rivulet.headS, 0.35)
      return
    }

    const previousS = this.rivulet.headS
    this.rivulet.headS = clamp(this.rivulet.headS + this.rivulet.speed * dt, 0, millerUreyCondenserPath.length)
    this.rivulet.wetEndS = Math.max(this.rivulet.wetEndS, this.rivulet.headS)
    const travelled = this.rivulet.headS - previousS
    this.rivulet.pressureDrive = Math.max(0, this.rivulet.pressureDrive - travelled)
    this.checkSurfaceConstraint(this.rivulet.headS, this.rivulet.surface)
    this.appendTrailPoint()
    if (this.rivulet.headS >= millerUreyCondenserPath.length - FIXED_EPSILON) this.rivuletReachedOutlet()
  }

  private appendTrailPoint(force = false) {
    if (!this.rivulet.active) return
    const last = this.trail[this.trail.length - 1]
    const distanceFromLast = last ? this.rivulet.headS - last.s : Number.POSITIVE_INFINITY
    if (!force && last && distanceFromLast >= 0 && distanceFromLast < 2.15) {
      last.wetness = Math.min(1, last.wetness + 0.04)
      last.width = Math.max(last.width, this.rivuletWidth() * 0.82)
      return
    }
    if (this.trail.length >= MAX_RIVULET_TRAIL_POINTS) this.decimateTrailLocally()
    const seed = stableTrailSeed(this.rivulet.headS, this.rivulet.surface)
    this.trail.push({
      age: 0,
      s: this.rivulet.headS,
      seed,
      surface: this.rivulet.surface,
      wetness: 1,
      width: this.rivuletWidth() * (0.61 + seed * 0.18),
    })
  }

  private decimateTrailLocally() {
    if (this.trail.length < 3) return
    const protectedHeadStart = Math.max(1, this.trail.length - 6)
    let removeIndex = 1
    let lowestScore = Number.POSITIVE_INFINITY
    for (let index = 1; index < protectedHeadStart; index += 1) {
      const before = this.trail[index - 1]
      const current = this.trail[index]
      const after = this.trail[index + 1]
      if (before.surface !== current.surface || current.surface !== after.surface) continue
      const combinedSpan = after.s - before.s
      const widthChange = Math.abs(current.width - (before.width + after.width) * 0.5)
      const wetnessChange = Math.abs(current.wetness - (before.wetness + after.wetness) * 0.5)
      const curvature = Math.abs(millerUreyCondenserPath.curvatureAt(current.s))
      const score = combinedSpan + widthChange * 4 + wetnessChange * 3 + curvature * 180
      if (score >= lowestScore) continue
      lowestScore = score
      removeIndex = index
    }
    this.trail.splice(removeIndex, 1)
  }

  private rivuletWidth() {
    return clamp(0.62 + Math.sqrt(Math.max(0, this.rivulet.mass)) * 0.42, 0.82, 1.72)
  }

  private rivuletHeadRadius() {
    const minimumRadius = this.rivulet.state === 'steady-drip' ? 2.05 : 1.65
    return clamp(1.30 + Math.sqrt(Math.max(0, this.rivulet.mass)) * 0.66, minimumRadius, 3.0)
  }

  private updateTrail(dt: number) {
    for (const point of this.trail) {
      point.age += dt
      const distanceBehindHead = this.rivulet.headS - point.s
      const trapMergeActive = this.rivulet.active
        && this.rivulet.state === 'trap-pool'
        && this.trapMergeProgress < 1
      const recentWake = this.rivulet.active
        && this.rivulet.state !== 'trap-pool'
        && distanceBehindHead >= -1
        && distanceBehindHead <= 13
      const terminalMergeWake = trapMergeActive
        && point.s >= CONDENSER_TRAP_SURFACE_S - 11

      if (terminalMergeWake) point.wetness = Math.max(0, point.wetness - dt * 0.42)
      else if (this.rivulet.state === 'trap-pool') point.wetness = Math.max(0, point.wetness - dt * 1.05)
      else if (!recentWake && point.age > 2.4) point.wetness = Math.max(0, point.wetness - dt * 0.85)
      else if (point.age > 3.4) point.wetness = Math.max(0.12, point.wetness - dt * 0.048)

      const minimumWidth = terminalMergeWake ? 0.30 : recentWake ? 0.34 : 0.18
      point.width = Math.max(minimumWidth, point.width - dt * 0.045)
    }
    while (this.trail.length && this.trail[0].wetness <= 0.02) this.trail.shift()
  }

  private updateTrapPool(dt: number) {
    if (!this.trapPool.active) return
    this.trapPool.contactAge += dt
    const nextVelocities = new Float32Array(TRAP_SURFACE_SAMPLE_COUNT)
    for (let index = 1; index < TRAP_SURFACE_SAMPLE_COUNT - 1; index += 1) {
      const height = this.trapPool.heights[index]
      const laplacian = this.trapPool.heights[index - 1] - height * 2 + this.trapPool.heights[index + 1]
      const acceleration = laplacian * TRAP_WAVE_COUPLING
        - height * TRAP_WAVE_RESTORING
        - this.trapPool.velocities[index] * TRAP_WAVE_DAMPING
      nextVelocities[index] = this.trapPool.velocities[index] + acceleration * dt
    }

    if (this.trapPool.pendingImpulse > 0) {
      const centre = Math.floor(TRAP_SURFACE_SAMPLE_COUNT / 2)
      const impulse = Math.min(8.5, this.trapPool.pendingImpulse)
      nextVelocities[centre] += impulse
      nextVelocities[centre - 1] += impulse * 0.46
      nextVelocities[centre + 1] += impulse * 0.46
      this.trapPool.pendingImpulse = 0
    }

    this.trapPool.heights[0] = 0
    this.trapPool.heights[TRAP_SURFACE_SAMPLE_COUNT - 1] = 0
    this.trapPool.velocities[0] = 0
    this.trapPool.velocities[TRAP_SURFACE_SAMPLE_COUNT - 1] = 0
    for (let index = 1; index < TRAP_SURFACE_SAMPLE_COUNT - 1; index += 1) {
      this.trapPool.velocities[index] = nextVelocities[index]
      this.trapPool.heights[index] = clamp(
        this.trapPool.heights[index] + this.trapPool.velocities[index] * dt,
        -1.35,
        1.55,
      )
    }
  }

  private feedDropsIntoWetRegion() {
    if (!this.rivulet.active) return
    const wetStart = Math.min(this.rivulet.wetStartS, this.rivulet.wetEndS)
    const wetEnd = Math.max(this.rivulet.wetStartS, this.rivulet.wetEndS)
    for (const drop of this.drops) {
      if (!drop.active || drop.age < 0 || drop.surface !== this.rivulet.surface) continue
      const contactAllowance = Math.max(0.55, drop.radius)
      if (drop.s + contactAllowance < wetStart || drop.s - contactAllowance > wetEnd) continue
      const nearest = this.nearestTrailPoint(drop.s, drop.surface)
      this.rivulet.mass += drop.mass
      if (this.rivulet.state === 'trap-pool') this.rivulet.arrivalMass += drop.mass
      if (nearest) {
        nearest.wetness = 1
        nearest.width = Math.min(1.9, nearest.width + drop.mass * 0.12)
        nearest.age = 0
      }
      drop.active = false
      drop.mass = 0
      drop.radius = 0
      this.condensationFeedCount += 1
      this.wetRegionAbsorptionCount += 1
    }
  }

  private condensePulse() {
    const s = 5 + this.random() * (CONDENSER_VERTICAL_END_S - 10)
    const surface: CondenserSurfaceSide = this.random() < 0.5 ? 'wall-a' : 'wall-b'
    const mass = 0.065 + this.random() * 0.075
    this.condensedMassInput += mass
    const nearbyDrop = this.drops
      .filter(drop => drop.active && drop.age >= 0 && drop.surface === surface)
      .sort((a, b) => Math.abs(a.s - s) - Math.abs(b.s - s))[0]
    if (nearbyDrop && Math.abs(nearbyDrop.s - s) < 9.5) {
      nearbyDrop.mass += mass
      nearbyDrop.radius = radiusFromMass(nearbyDrop.mass)
      this.condensationFeedCount += 1
      return
    }

    const nearestTrail = this.nearestTrailPoint(s, surface)
    const canFeedNearestTrail = nearestTrail
      && Math.abs(nearestTrail.s - s) < 11.5
      && (this.rivulet.state !== 'trap-pool' || nearestTrail.s >= CONDENSER_TRAP_SURFACE_S - 18)
    if (nearestTrail && canFeedNearestTrail) {
      const empty = this.drops.find(drop => !drop.active)
      const joinsFilm = !empty || this.random() < 0.38
      if (joinsFilm) {
        nearestTrail.wetness = Math.min(1, nearestTrail.wetness + 0.22)
        nearestTrail.width = Math.min(1.9, nearestTrail.width + mass * 0.16)
        nearestTrail.age = 0
        if (this.rivulet.active) {
          this.rivulet.mass += mass
          if (this.rivulet.state === 'trap-pool') this.rivulet.arrivalMass += mass
        }
        this.condensationFeedCount += 1
        return
      }
      this.activateDrop(empty, s, surface, mass, 0, 0.72 + this.random() * 0.42)
      return
    }

    const empty = this.drops.find(drop => !drop.active)
    if (empty) this.activateDrop(empty, s, surface, mass, 0, 0.72 + this.random() * 0.42)
    else this.directCollectedMass += mass
  }

  private nearestTrailPoint(s: number, surface: CondenserSurfaceSide) {
    let nearest: RivuletTrailPoint | undefined
    let nearestDistance = Number.POSITIVE_INFINITY
    for (const point of this.trail) {
      if (point.surface !== surface) continue
      const distance = Math.abs(point.s - s)
      if (distance >= nearestDistance) continue
      nearest = point
      nearestDistance = distance
    }
    return nearest
  }

  private thickenNearestTrail(s: number, amount: number) {
    const point = this.nearestTrailPoint(s, this.rivulet.surface)
    if (!point) return
    point.width = Math.min(1.95, point.width + amount * 0.32)
    point.wetness = 1
    point.age = 0
  }

  private createFinalReadableTrail(surface: CondenserSurfaceSide) {
    this.trail.splice(0)
    const start = Math.max(0, CONDENSER_TRAP_SURFACE_S - FINAL_TRAIL_START_OFFSET)
    const spacing = 5.2
    const count = Math.min(MAX_RIVULET_TRAIL_POINTS, Math.ceil((CONDENSER_TRAP_SURFACE_S - start) / spacing) + 1)
    for (let index = 0; index < count; index += 1) {
      const amount = count <= 1 ? 1 : index / (count - 1)
      const s = start + (CONDENSER_TRAP_SURFACE_S - start) * amount
      const seed = stableTrailSeed(s, surface)
      this.trail.push({
        age: 0,
        s,
        seed,
        surface,
        wetness: 0.54 + amount * 0.28,
        width: 0.66 + amount * 0.36 + (seed - 0.5) * 0.10,
      })
    }
  }

  private rebuildTerminalWake() {
    this.trail.splice(0)
    if (!this.rivulet.active || this.rivulet.state !== 'steady-drip') return
    const start = Math.max(CONTINUING_DRIP_START_S, this.rivulet.headS - CONTINUING_DRIP_WAKE_LENGTH)
    const span = this.rivulet.headS - start
    const count = span < 0.6 ? 1 : Math.min(8, Math.max(2, Math.ceil(span / 2.1) + 1))
    for (let index = 0; index < count; index += 1) {
      const amount = count <= 1 ? 1 : index / (count - 1)
      const s = start + span * amount
      const seed = stableTrailSeed(s, this.rivulet.surface)
      this.trail.push({
        age: 0,
        s,
        seed,
        surface: this.rivulet.surface,
        wetness: 0.24 + amount * 0.68,
        width: 0.30 + amount * 0.48 + (seed - 0.5) * 0.05,
      })
    }
  }

  private updateTerminalDrip(dt: number) {
    if (!this.rivulet.active) {
      this.terminalDripClock += dt
      if (this.terminalDripClock < this.terminalDripDelay) return
      const mass = 0.18 + (this.terminalDripIndex % 3) * 0.025
      const surface: CondenserSurfaceSide = this.terminalDripIndex % 2 === 0 ? 'wall-b' : 'wall-a'
      this.terminalDripClock = 0
      this.terminalDripDelay = CONTINUING_DRIP_BASE_DELAY + ((this.terminalDripIndex * 7) % 4) * 0.07
      this.terminalDripIndex += 1
      Object.assign(this.rivulet, {
        active: true,
        headS: CONTINUING_DRIP_START_S,
        mass,
        pressureDrive: 0,
        speed: 9.5,
        state: 'steady-drip' as RivuletState,
        surface,
        wetEndS: CONTINUING_DRIP_START_S,
        wetStartS: CONTINUING_DRIP_START_S,
      })
      this.condensedMassInput += mass
      this.rebuildTerminalWake()
      return
    }

    const gravityProjection = Math.max(0, gravityProjectionAt(this.rivulet.headS, this.rivulet.surface))
    this.rivulet.speed += (44 + gravityProjection * CONTINUING_DRIP_GRAVITY_SCALE) * dt
    this.rivulet.speed *= Math.exp(-1.45 * dt)
    this.rivulet.headS = clamp(this.rivulet.headS + this.rivulet.speed * dt, 0, CONDENSER_TRAP_SURFACE_S)
    this.rivulet.wetStartS = Math.max(CONTINUING_DRIP_START_S, this.rivulet.headS - CONTINUING_DRIP_WAKE_LENGTH)
    this.rivulet.wetEndS = this.rivulet.headS
    this.checkSurfaceConstraint(this.rivulet.headS, this.rivulet.surface)
    this.rebuildTerminalWake()
    if (this.rivulet.headS < CONDENSER_TRAP_SURFACE_S - FIXED_EPSILON) return

    const receivedMass = this.rivulet.mass
    this.trapPool.active = true
    this.trapPool.receivedMass += receivedMass
    this.trapPool.pendingImpulse += 0.18 + receivedMass * 3.2
    this.collectedFraction = Math.min(1, this.collectedFraction + receivedMass * 0.04)
    this.rivulet.active = false
    this.rivulet.mass = 0
    this.rivulet.speed = 0
    this.rivulet.state = 'steady-drip'
    this.trail.splice(0)
    if (this.rivulet.surface === 'wall-a') this.terminalDrainCountWallA += 1
    else this.terminalDrainCountWallB += 1
    this.drainEventCount += 1
  }

  private finalizeSettledState() {
    this.rivulet.active = false
    this.rivulet.mass = 0
    this.rivulet.speed = 0
    this.rivulet.headS = CONDENSER_TRAP_SURFACE_S
    this.rivulet.state = 'steady-drip'
    this.trapPool.pendingImpulse = 0
    this.trapPool.heights.fill(0)
    this.trapPool.velocities.fill(0)
    this.trail.splice(0)
    this.terminalDripClock = 0
    this.terminalDripDelay = CONTINUING_DRIP_BASE_DELAY
    this.lifecycleState = 'dripping'
  }

  private arriveAtOutlet(drop: SurfaceDroplet) {
    if (this.outletMode === 'detach') this.detachAtOutlet(drop.mass, drop.radius)
    else {
      this.collectedFraction = Math.min(1, this.collectedFraction + drop.mass * 0.045)
      this.directCollectedMass += drop.mass
      this.drainEventCount += 1
    }
    drop.active = false
    drop.mass = 0
    drop.radius = 0
  }

  private rivuletReachedOutlet() {
    if (this.outletMode === 'detach') {
      this.detachAtOutlet(this.rivulet.mass, this.rivuletWidth())
      this.rivulet.active = false
      this.rivulet.state = 'inactive'
      return
    }
    this.rivulet.state = 'trap-pool'
    this.lifecycleState = 'transferring'
    this.rivulet.arrivalMass = this.rivulet.mass
    this.rivulet.speed = 0
    this.rivulet.arrivalAge = 0
    this.trapPool.active = true
    this.trapPool.contactAge = 0
    this.trapPool.pendingImpulse += Math.min(4.2, 0.8 + this.rivulet.mass * 0.72)
    this.trapPool.receivedMass = 0
    this.condensationAccumulator = 0
    this.drainEventCount += 1
    this.thickenNearestTrail(CONDENSER_TRAP_SURFACE_S, 0.65)
  }

  private detachAtOutlet(mass: number, radius: number) {
    const slot = this.detachedDrops.find(drop => !drop.active)
    if (!slot) return
    const position = surfacePositionAt(CONDENSER_TRAP_SURFACE_S, this.rivulet.surface)
    Object.assign(slot, {
      active: true,
      mass,
      radius,
      velocity: { x: 0.8, y: 2.2 },
      x: position.x,
      y: position.y,
    })
    this.detachmentCount += 1
  }

  private updateDetachedDrops(dt: number) {
    for (const drop of this.detachedDrops) {
      if (!drop.active) continue
      drop.velocity.y += 82 * dt
      drop.x += drop.velocity.x * dt
      drop.y += drop.velocity.y * dt
      if (drop.y > 607 + drop.radius * 2) drop.active = false
    }
  }

  private checkSurfaceConstraint(s: number, surface: CondenserSurfaceSide) {
    if (s < -FIXED_EPSILON || s > millerUreyCondenserPath.length + FIXED_EPSILON || (surface !== 'wall-a' && surface !== 'wall-b')) {
      this.constraintViolationCount += 1
    }
  }

  private updateUniformData() {
    this.surfaceDropData.fill(0)
    this.surfaceDropShape.fill(0)
    this.trailSegmentStartData.fill(0)
    this.trailSegmentEndData.fill(0)
    this.detachedData.fill(0)
    this.headData.fill(0)
    this.headShape.fill(0)
    this.trapPoolData.fill(0)
    this.trapSurfaceData.fill(0)

    let visibleDropIndex = 0
    for (const drop of this.drops) {
      if (!drop.active || drop.age < 0 || visibleDropIndex >= MAX_CONDENSATE_DROPS) continue
      const position = sourcePointToUv(surfacePositionAt(drop.s, drop.surface))
      const tangent = surfaceTangentAt(drop.s, drop.surface)
      const offset = visibleDropIndex * 4
      this.surfaceDropData[offset] = position.x
      this.surfaceDropData[offset + 1] = position.y
      this.surfaceDropData[offset + 2] = sourceRadiusToUv(drop.radius)
      this.surfaceDropData[offset + 3] = stateCode(drop.state)
      this.surfaceDropShape[offset] = tangent.x
      this.surfaceDropShape[offset + 1] = tangent.y
      this.surfaceDropShape[offset + 2] = clamp(drop.speed / 36, 0, 1)
      this.surfaceDropShape[offset + 3] = clamp(drop.mass / 2.5, 0, 1)
      visibleDropIndex += 1
    }

    const visibleTrail = this.trail.filter(point => point.wetness > 0.02).sort((a, b) => a.s - b.s)
    const packedTrail = visibleTrail.slice(0, MAX_RIVULET_TRAIL_POINTS)
    this.trailCount = packedTrail.length
    this.trailSegmentCount = 0
    this.rejectedTrailSegmentCount = 0
    for (let index = 0; index < packedTrail.length - 1 && this.trailSegmentCount < MAX_RIVULET_TRAIL_SEGMENTS; index += 1) {
      const start = packedTrail[index]
      const end = packedTrail[index + 1]
      const pathSpan = end.s - start.s
      const startSource = surfacePositionAt(start.s, start.surface)
      const endSource = surfacePositionAt(end.s, end.surface)
      const worldSpan = Math.hypot(endSource.x - startSource.x, endSource.y - startSource.y)
      const middleS = (start.s + end.s) * 0.5
      const expectedMiddle = surfacePositionAt(middleS, start.surface)
      const chordError = Math.hypot(
        (startSource.x + endSource.x) * 0.5 - expectedMiddle.x,
        (startSource.y + endSource.y) * 0.5 - expectedMiddle.y,
      )
      // Identical samples carry no geometry and are omitted without being an
      // unsafe connector. They can occur for one frame as a fresh wake begins.
      if (pathSpan <= 0.02 || worldSpan <= 0.02) continue
      const validSegment = start.surface === end.surface
        && pathSpan <= 10.5
        && worldSpan <= 10.5
        && chordError <= 1.25
      if (!validSegment) {
        this.rejectedTrailSegmentCount += 1
        continue
      }

      const startPosition = sourcePointToUv(startSource)
      const endPosition = sourcePointToUv(endSource)
      const offset = this.trailSegmentCount * 4
      this.trailSegmentStartData[offset] = startPosition.x
      this.trailSegmentStartData[offset + 1] = startPosition.y
      this.trailSegmentStartData[offset + 2] = sourceRadiusToUv(start.width)
      this.trailSegmentStartData[offset + 3] = start.wetness
      this.trailSegmentEndData[offset] = endPosition.x
      this.trailSegmentEndData[offset + 1] = endPosition.y
      this.trailSegmentEndData[offset + 2] = sourceRadiusToUv(end.width)
      this.trailSegmentEndData[offset + 3] = end.wetness
      this.trailSegmentCount += 1
    }

    if (this.rivuletHeadVisible) {
      const mergeProgress = this.trapMergeProgress
      const sourcePosition = surfacePositionAt(this.rivulet.headS, this.rivulet.surface)
      const position = sourcePointToUv(sourcePosition)
      const tangent = surfaceTangentAt(this.rivulet.headS, this.rivulet.surface)
      this.headData[0] = position.x
      this.headData[1] = position.y
      const contactRadius = this.rivulet.state === 'trap-pool'
        ? Math.max(0.24, this.rivuletHeadRadius() * Math.sqrt(Math.max(0.012, 1 - mergeProgress)))
        : this.rivuletHeadRadius()
      this.headData[2] = sourceRadiusToUv(contactRadius)
      this.headData[3] = this.rivulet.state === 'pooled' ? 2 : this.rivulet.state === 'trap-pool' ? 3 : 1
      this.headShape[0] = tangent.x
      this.headShape[1] = tangent.y
      this.headShape[2] = clamp(this.rivulet.speed / 44, 0, 1)
      this.headShape[3] = this.rivulet.state === 'trap-pool'
        ? mergeProgress
        : clamp(this.rivulet.mass / 3.2, 0, 1)
    }

    this.trapPoolData[0] = this.trapPool.active ? 1 : 0
    this.trapPoolData[1] = this.trapMergeProgress
    this.trapPoolData[2] = this.trapPoolActivity
    this.trapPoolData[3] = clamp(this.trapPool.receivedMass / 3.2, 0, 1)
    for (let index = 0; index < TRAP_SURFACE_SAMPLE_COUNT; index += 1) {
      const offset = index * 4
      const amount = index / (TRAP_SURFACE_SAMPLE_COUNT - 1)
      const sourcePoint = trapPoolSurfacePointAt(amount)
      this.trapSurfaceData[offset] = sourcePoint.x
      this.trapSurfaceData[offset + 1] = sourcePoint.y + this.trapPool.heights[index]
      this.trapSurfaceData[offset + 2] = this.trapPool.velocities[index]
      this.trapSurfaceData[offset + 3] = 1
    }

    let detachedIndex = 0
    for (const drop of this.detachedDrops) {
      if (!drop.active || detachedIndex >= MAX_DETACHED_DROPS) continue
      const offset = detachedIndex * 4
      this.detachedData[offset] = drop.x / 652
      this.detachedData[offset + 1] = drop.y / 607
      this.detachedData[offset + 2] = sourceRadiusToUv(drop.radius)
      this.detachedData[offset + 3] = 1
      detachedIndex += 1
    }
  }
}
