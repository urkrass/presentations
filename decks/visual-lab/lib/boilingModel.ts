export const MAX_BOIL_OBJECTS = 40

export type BoilIntensity = 'still' | 'near-boil' | 'gentle' | 'rolling'

export type Bubble = {
  active: boolean
  age: number
  attachedUntil: number
  baseRadius: number
  detaches: boolean
  kind: 'gas' | 'splash'
  lifetime: number
  phase: number
  radius: number
  sourceX: number
  sourceY: number
  stretch: number
  velocity: number
  vx: number
  vy: number
  wobble: number
  x: number
  y: number
}

export type BoilSettings = {
  activity: number
  bubbleTarget: number
  convection: number
  maxRadius: number
  spawnRate: number
  speed: number
  steam: number
  surfaceAmplitude: number
}

const EMPTY_BUBBLE = (): Bubble => ({
  active: false,
  age: 0,
  attachedUntil: 0,
  baseRadius: 0,
  detaches: true,
  kind: 'gas',
  lifetime: 1,
  phase: 0,
  radius: 0,
  sourceX: 0,
  sourceY: 0,
  stretch: 0,
  velocity: 0,
  vx: 0,
  vy: 0,
  wobble: 0,
  x: 0,
  y: 0,
})

const PRESETS: Record<BoilIntensity, BoilSettings> = {
  still: {
    activity: 0,
    bubbleTarget: 0,
    convection: 0.025,
    maxRadius: 0,
    spawnRate: 0,
    speed: 0,
    steam: 0,
    surfaceAmplitude: 0.0007,
  },
  'near-boil': {
    activity: 0.32,
    bubbleTarget: 7,
    convection: 0.38,
    maxRadius: 0.014,
    spawnRate: 0.78,
    speed: 0.072,
    steam: 0.035,
    surfaceAmplitude: 0.0048,
  },
  gentle: {
    activity: 0.68,
    bubbleTarget: 15,
    convection: 0.68,
    maxRadius: 0.025,
    spawnRate: 2.4,
    speed: 0.12,
    steam: 0.17,
    surfaceAmplitude: 0.012,
  },
  rolling: {
    activity: 1,
    bubbleTarget: 24,
    convection: 1,
    maxRadius: 0.034,
    spawnRate: 5.2,
    speed: 0.235,
    steam: 0.56,
    surfaceAmplitude: 0.024,
  },
}

export function resolveIntensity(temperature: number, intensity?: BoilIntensity): BoilIntensity {
  if (intensity) return intensity
  if (temperature < 82) return 'still'
  if (temperature < 98) return 'near-boil'
  return 'gentle'
}

export function deriveSettings(temperature: number, intensity?: BoilIntensity): BoilSettings {
  const resolved = resolveIntensity(temperature, intensity)
  const preset = PRESETS[resolved]
  if (resolved !== 'still') return { ...preset }

  const warmth = Math.max(0, Math.min(1, (temperature - 20) / 60))
  return {
    ...preset,
    convection: 0.025 + warmth * 0.22,
    surfaceAmplitude: 0.0007 + warmth * 0.0018,
  }
}

function mix(current: number, target: number, amount: number) {
  return current + (target - current) * amount
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

export class BoilingModel {
  readonly bubbles = Array.from({ length: MAX_BOIL_OBJECTS }, EMPTY_BUBBLE)
  readonly uniformData = new Float32Array(MAX_BOIL_OBJECTS * 4)
  current: BoilSettings
  coolingDissolutionCount = 0
  target: BoilSettings
  intensity: BoilIntensity
  sourceDissolutionCount = 0
  surfaceBurstCount = 0
  temperature: number
  private seed = 0x9e3779b9
  private spawnAccumulator = 0

  constructor(temperature = 100, intensity?: BoilIntensity) {
    this.temperature = temperature
    this.intensity = resolveIntensity(temperature, intensity)
    this.target = deriveSettings(temperature, intensity)
    this.current = { ...this.target }
  }

  setState(temperature: number, intensity?: BoilIntensity) {
    this.temperature = temperature
    this.intensity = resolveIntensity(temperature, intensity)
    this.target = deriveSettings(temperature, intensity)
    this.coolingDissolutionCount = 0
    this.sourceDissolutionCount = 0
    this.surfaceBurstCount = 0
  }

  reset() {
    this.seed = 0x9e3779b9
    this.spawnAccumulator = 0
    this.coolingDissolutionCount = 0
    this.sourceDissolutionCount = 0
    this.surfaceBurstCount = 0
    this.bubbles.forEach((_, index) => { this.bubbles[index] = EMPTY_BUBBLE() })
    this.current = { ...this.target }
    const openingCount = Math.min(this.target.bubbleTarget, Math.round(this.target.bubbleTarget * 0.58))
    for (let index = 0; index < openingCount; index += 1) {
      const bubble = this.spawnGas()
      if (!bubble) break
      bubble.age = bubble.lifetime * (0.1 + this.random() * 0.62)
    }
    this.writeUniforms()
  }

  step(deltaSeconds: number, elapsedSeconds: number) {
    const dt = Math.min(deltaSeconds, 0.05)
    const blend = 1 - Math.exp(-dt * 3.6)
    for (const key of Object.keys(this.current) as Array<keyof BoilSettings>) {
      this.current[key] = mix(this.current[key], this.target[key], blend)
    }

    const gasCount = this.bubbles.filter(bubble => bubble.active && bubble.kind === 'gas').length
    if (gasCount < Math.round(this.current.bubbleTarget)) {
      this.spawnAccumulator += dt * this.current.spawnRate
      while (this.spawnAccumulator >= 1) {
        this.spawnGas()
        this.spawnAccumulator -= 1
      }
    }
    else {
      this.spawnAccumulator = Math.min(this.spawnAccumulator, 0.95)
    }

    for (const bubble of this.bubbles) {
      if (!bubble.active) continue
      if (bubble.kind === 'splash') this.updateSplash(bubble, dt)
      else this.updateGas(bubble, dt, elapsedSeconds)
    }
    this.writeUniforms()
  }

  get activeCount() {
    return this.bubbles.filter(bubble => bubble.active).length
  }

  get gasCount() {
    return this.bubbles.filter(bubble => bubble.active && bubble.kind === 'gas').length
  }

  private random() {
    this.seed ^= this.seed << 13
    this.seed ^= this.seed >>> 17
    this.seed ^= this.seed << 5
    return (this.seed >>> 0) / 4294967296
  }

  private freeBubble() {
    return this.bubbles.find(bubble => !bubble.active)
  }

  private spawnGas() {
    if (this.current.maxRadius <= 0) return undefined
    const bubble = this.freeBubble()
    if (!bubble) return undefined
    const source = this.random()
    let x = 0.23 + this.random() * 0.54
    let y = 0.842 + this.random() * 0.025
    if (source < 0.17) {
      x = 0.184 + this.random() * 0.013
      y = 0.56 + this.random() * 0.27
    }
    else if (source < 0.34) {
      x = 0.803 + this.random() * 0.013
      y = 0.56 + this.random() * 0.27
    }

    const nearBoil = this.intensity === 'near-boil'
    const baseRadius = this.current.maxRadius * (0.34 + this.random() * 0.72)
    Object.assign(bubble, {
      active: true,
      age: 0,
      attachedUntil: nearBoil ? 0.54 + this.random() * 0.2 : 0.1 + this.random() * 0.12,
      baseRadius,
      detaches: !nearBoil || this.random() > 0.64,
      kind: 'gas' as const,
      lifetime: nearBoil ? 2.8 + this.random() * 2.4 : 2.7 + this.random() * 1.4,
      phase: this.random() * Math.PI * 2,
      radius: baseRadius * 0.18,
      sourceX: x,
      sourceY: y,
      stretch: 0,
      velocity: this.current.speed * (0.72 + this.random() * 0.58),
      vx: 0,
      vy: 0,
      wobble: 0.004 + this.random() * 0.013,
      x,
      y,
    })
    return bubble
  }

  private updateGas(bubble: Bubble, dt: number, elapsedSeconds: number) {
    bubble.age += dt
    const life = bubble.age / bubble.lifetime
    const attached = Math.min(0.86, bubble.attachedUntil)

    if (life < attached) {
      const growth = smoothstep(0, attached, life)
      bubble.radius = bubble.baseRadius * (0.2 + growth * 0.8)
      bubble.x = bubble.sourceX + Math.sin(elapsedSeconds * 2.1 + bubble.phase) * bubble.wobble * 0.18
      bubble.y = bubble.sourceY - growth * 0.004
      bubble.stretch = 0.08 * growth
      return
    }

    if (!bubble.detaches) {
      const remaining = (life - attached) / Math.max(0.01, 1 - attached)
      bubble.radius = bubble.baseRadius * (1 - smoothstep(0.18, 1, remaining))
      if (life >= 1) {
        bubble.active = false
        this.sourceDissolutionCount += 1
      }
      return
    }

    const rise = Math.max(0, (life - attached) / Math.max(0.01, 1 - attached))
    const riseProgress = Math.min(1, rise)
    const buoyantFloor = 0.045 + bubble.baseRadius * 1.8
    bubble.velocity = Math.max(bubble.velocity, buoyantFloor)
    bubble.velocity += this.current.speed * dt * (0.34 + riseProgress * 0.8)
    bubble.y -= bubble.velocity * dt
    bubble.x = bubble.sourceX + Math.sin(elapsedSeconds * (1.65 + bubble.wobble * 90) + bubble.phase) * bubble.wobble * (0.45 + riseProgress)

    const coolingDissolution = this.target.activity === 0 && this.current.activity < 0.12
    if (coolingDissolution) {
      bubble.radius *= Math.exp(-dt * 0.72)
      bubble.stretch = Math.max(0.04, bubble.stretch * Math.exp(-dt * 0.8))
      if (bubble.radius <= 0.0011) {
        bubble.active = false
        this.coolingDissolutionCount += 1
        return
      }
    }
    else {
      bubble.radius = bubble.baseRadius * (0.92 + riseProgress * 0.34)
      bubble.stretch = Math.min(0.85, 0.16 + riseProgress * 0.48 + bubble.velocity * 1.8)
    }

    const surface = 0.292
    if (bubble.y - bubble.radius * 0.35 <= surface) {
      const x = bubble.x
      const radius = bubble.radius
      bubble.active = false
      this.surfaceBurstCount += 1
      this.spawnSplash(x, surface, radius)
    }
  }

  private spawnSplash(x: number, surface: number, sourceRadius: number) {
    const requested = this.intensity === 'rolling' ? 4 : this.intensity === 'gentle' ? 3 : 1
    const maximum = this.intensity === 'rolling' ? 12 : this.intensity === 'gentle' ? 7 : 3
    const existing = this.bubbles.filter(bubble => bubble.active && bubble.kind === 'splash').length
    const count = Math.min(requested, Math.max(0, maximum - existing))
    const source = Math.max(0.205, Math.min(0.795, x))
    for (let index = 0; index < count; index += 1) {
      const splash = this.freeBubble()
      if (!splash) return
      const side = index === 0 ? -1 : index === 1 ? 1 : (this.random() - 0.5) * 0.4
      const radius = Math.max(0.0042, sourceRadius * (0.24 + this.random() * 0.22))
      Object.assign(splash, {
        active: true,
        age: 0,
        attachedUntil: 0,
        baseRadius: radius,
        detaches: true,
        kind: 'splash' as const,
        lifetime: 0.55 + this.random() * 0.24,
        phase: this.random() * Math.PI * 2,
        radius,
        sourceX: source,
        sourceY: surface,
        stretch: 0.44,
        velocity: 0,
        vx: side * (0.038 + this.random() * 0.072),
        vy: -(0.12 + this.random() * 0.105 + this.current.activity * 0.045),
        wobble: 0,
        x: source + side * sourceRadius * 0.18,
        y: surface - radius * 0.4,
      })
    }
  }

  private updateSplash(bubble: Bubble, dt: number) {
    bubble.age += dt
    const life = bubble.age / bubble.lifetime
    bubble.x += bubble.vx * dt
    if (bubble.x < 0.19 || bubble.x > 0.81) {
      bubble.x = Math.max(0.19, Math.min(0.81, bubble.x))
      bubble.vx *= -0.22
    }
    bubble.y += bubble.vy * dt
    bubble.vy += 0.46 * dt
    bubble.radius = bubble.baseRadius * Math.sin(Math.min(1, life) * Math.PI)
    bubble.stretch = Math.max(0.12, 0.62 - life * 0.24)
    if (life >= 1 || bubble.y > 0.308) bubble.active = false
  }

  private writeUniforms() {
    this.uniformData.fill(0)
    this.bubbles.forEach((bubble, index) => {
      if (!bubble.active) return
      const offset = index * 4
      this.uniformData[offset] = bubble.x
      this.uniformData[offset + 1] = bubble.y
      this.uniformData[offset + 2] = bubble.radius
      this.uniformData[offset + 3] = bubble.kind === 'splash' ? -Math.max(0.1, bubble.stretch) : Math.max(0.05, bubble.stretch)
    })
  }
}
