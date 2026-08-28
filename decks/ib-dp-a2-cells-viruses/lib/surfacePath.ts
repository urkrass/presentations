export interface Vec2 {
  x: number
  y: number
}

export interface SurfacePath {
  readonly length: number
  pointAt(s: number): Vec2
  tangentAt(s: number): Vec2
  normalAt(s: number): Vec2
  curvatureAt(s: number): number
}

export interface CubicPathSegment {
  p0: Vec2
  p1: Vec2
  p2: Vec2
  p3: Vec2
}

interface ArcSample {
  distance: number
  segment: number
  t: number
}

const EPSILON = 1e-8

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value))
}

function distance(a: Vec2, b: Vec2) {
  return Math.hypot(b.x - a.x, b.y - a.y)
}

function normalize(vector: Vec2): Vec2 {
  const magnitude = Math.hypot(vector.x, vector.y)
  if (magnitude < EPSILON) return { x: 0, y: 1 }
  return { x: vector.x / magnitude, y: vector.y / magnitude }
}

function cubicPoint(segment: CubicPathSegment, t: number): Vec2 {
  const inverse = 1 - t
  const a = inverse * inverse * inverse
  const b = 3 * inverse * inverse * t
  const c = 3 * inverse * t * t
  const d = t * t * t
  return {
    x: a * segment.p0.x + b * segment.p1.x + c * segment.p2.x + d * segment.p3.x,
    y: a * segment.p0.y + b * segment.p1.y + c * segment.p2.y + d * segment.p3.y,
  }
}

function cubicDerivative(segment: CubicPathSegment, t: number): Vec2 {
  const inverse = 1 - t
  return {
    x: 3 * inverse * inverse * (segment.p1.x - segment.p0.x)
      + 6 * inverse * t * (segment.p2.x - segment.p1.x)
      + 3 * t * t * (segment.p3.x - segment.p2.x),
    y: 3 * inverse * inverse * (segment.p1.y - segment.p0.y)
      + 6 * inverse * t * (segment.p2.y - segment.p1.y)
      + 3 * t * t * (segment.p3.y - segment.p2.y),
  }
}

function cubicSecondDerivative(segment: CubicPathSegment, t: number): Vec2 {
  return {
    x: 6 * (1 - t) * (segment.p2.x - 2 * segment.p1.x + segment.p0.x)
      + 6 * t * (segment.p3.x - 2 * segment.p2.x + segment.p1.x),
    y: 6 * (1 - t) * (segment.p2.y - 2 * segment.p1.y + segment.p0.y)
      + 6 * t * (segment.p3.y - 2 * segment.p2.y + segment.p1.y),
  }
}

export class CubicSurfacePath implements SurfacePath {
  readonly length: number
  readonly segments: readonly CubicPathSegment[]
  private readonly samples: ArcSample[]
  private readonly segmentEndDistances: number[]

  constructor(segments: readonly CubicPathSegment[], samplesPerSegment = 96) {
    if (!segments.length) throw new Error('Surface path requires at least one segment')
    this.segments = segments.map(segment => ({
      p0: { ...segment.p0 },
      p1: { ...segment.p1 },
      p2: { ...segment.p2 },
      p3: { ...segment.p3 },
    }))

    const samples: ArcSample[] = [{ distance: 0, segment: 0, t: 0 }]
    const segmentEndDistances: number[] = []
    let travelled = 0
    let previous = cubicPoint(this.segments[0], 0)
    this.segments.forEach((segment, segmentIndex) => {
      for (let sample = 1; sample <= samplesPerSegment; sample += 1) {
        const t = sample / samplesPerSegment
        const point = cubicPoint(segment, t)
        travelled += distance(previous, point)
        samples.push({ distance: travelled, segment: segmentIndex, t })
        previous = point
      }
      segmentEndDistances.push(travelled)
    })
    this.samples = samples
    this.segmentEndDistances = segmentEndDistances
    this.length = travelled
  }

  pointAt(s: number) {
    const location = this.locationAt(s)
    return cubicPoint(this.segments[location.segment], location.t)
  }

  tangentAt(s: number) {
    const location = this.locationAt(s)
    return normalize(cubicDerivative(this.segments[location.segment], location.t))
  }

  normalAt(s: number) {
    const tangent = this.tangentAt(s)
    return { x: -tangent.y, y: tangent.x }
  }

  curvatureAt(s: number) {
    const location = this.locationAt(s)
    const segment = this.segments[location.segment]
    const first = cubicDerivative(segment, location.t)
    const second = cubicSecondDerivative(segment, location.t)
    const denominator = Math.pow(first.x * first.x + first.y * first.y, 1.5)
    if (denominator < EPSILON) return 0
    return (first.x * second.y - first.y * second.x) / denominator
  }

  segmentEndDistance(index: number) {
    return this.segmentEndDistances[clamp(Math.floor(index), 0, this.segmentEndDistances.length - 1)]
  }

  private locationAt(s: number): ArcSample {
    const target = clamp(s, 0, this.length)
    let low = 0
    let high = this.samples.length - 1
    while (low < high) {
      const middle = Math.floor((low + high) / 2)
      if (this.samples[middle].distance < target) low = middle + 1
      else high = middle
    }

    const upper = this.samples[low]
    const lower = this.samples[Math.max(0, low - 1)]
    if (upper.distance === lower.distance) return upper
    if (upper.segment !== lower.segment) return target >= upper.distance ? upper : lower
    const amount = (target - lower.distance) / (upper.distance - lower.distance)
    return {
      distance: target,
      segment: upper.segment,
      t: lower.t + (upper.t - lower.t) * amount,
    }
  }
}

export function addScaled(point: Vec2, direction: Vec2, scale: number): Vec2 {
  return { x: point.x + direction.x * scale, y: point.y + direction.y * scale }
}

export function dot(a: Vec2, b: Vec2) {
  return a.x * b.x + a.y * b.y
}

export function distanceBetween(a: Vec2, b: Vec2) {
  return distance(a, b)
}
