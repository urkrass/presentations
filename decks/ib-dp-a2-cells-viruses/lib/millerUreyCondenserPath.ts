import { addScaled, CubicSurfacePath, type CubicPathSegment, type SurfacePath, type Vec2 } from './surfacePath'

export const MILLER_UREY_SOURCE_WIDTH = 652
export const MILLER_UREY_SOURCE_HEIGHT = 607

const point = (x: number, y: number): Vec2 => ({ x, y })

// These are centreline averages of the two authored path5114 glass walls.
// The first segment extends the same sourced vertical centreline upward into
// the condensation zone; the two bends are exact wall-pair averages.
export const MILLER_UREY_CONDENSER_SEGMENTS: readonly CubicPathSegment[] = [
  {
    p0: point(185.858871, 318.0),
    p1: point(185.858871, 352.510406),
    p2: point(185.858871, 387.020813),
    p3: point(185.858871, 421.531219),
  },
  {
    p0: point(185.858871, 421.531219),
    p1: point(185.858871, 442.176102),
    p2: point(202.312943, 459.203094),
    p3: point(226.999496, 459.203094),
  },
  {
    p0: point(226.999496, 459.203094),
    p1: point(251.675629, 459.203094),
    p2: point(268.311637, 475.500946),
    p3: point(268.311637, 496.156219),
  },
]

export const millerUreyCondenserPath = new CubicSurfacePath(MILLER_UREY_CONDENSER_SEGMENTS, 128)
export const CONDENSER_VERTICAL_END_S = millerUreyCondenserPath.segmentEndDistance(0)
export const CONDENSER_FIRST_BEND_END_S = millerUreyCondenserPath.segmentEndDistance(1)
export const CONDENSER_TRAP_SURFACE_S = millerUreyCondenserPath.length
export const CONDENSER_WALL_OFFSET = 3.65
export const CONDENSER_CHANNEL_HALF_WIDTH = 5.15
export const CONDENSER_OUTLET_MODE = 'pool' as const

export type CondenserSurfaceSide = 'wall-a' | 'wall-b'

export interface CondenserWettingSurface extends SurfacePath {
  readonly offset: number
  readonly side: CondenserSurfaceSide
}

function normalize(vector: Vec2): Vec2 {
  const magnitude = Math.hypot(vector.x, vector.y)
  return magnitude > 1e-8
    ? { x: vector.x / magnitude, y: vector.y / magnitude }
    : { x: 0, y: 1 }
}

class OffsetWettingSurface implements CondenserWettingSurface {
  readonly length = millerUreyCondenserPath.length
  readonly offset: number

  constructor(readonly side: CondenserSurfaceSide) {
    this.offset = side === 'wall-a' ? CONDENSER_WALL_OFFSET : -CONDENSER_WALL_OFFSET
  }

  pointAt(s: number) {
    return addScaled(
      millerUreyCondenserPath.pointAt(s),
      millerUreyCondenserPath.normalAt(s),
      this.offset,
    )
  }

  tangentAt(s: number) {
    const delta = 0.2
    const before = this.pointAt(Math.max(0, s - delta))
    const after = this.pointAt(Math.min(this.length, s + delta))
    return normalize({ x: after.x - before.x, y: after.y - before.y })
  }

  normalAt(s: number) {
    const tangent = this.tangentAt(s)
    return { x: -tangent.y, y: tangent.x }
  }

  curvatureAt(s: number) {
    return millerUreyCondenserPath.curvatureAt(s)
  }
}

export const condenserWallA = new OffsetWettingSurface('wall-a')
export const condenserWallB = new OffsetWettingSurface('wall-b')

export function wettingSurfaceFor(side: CondenserSurfaceSide) {
  return side === 'wall-a' ? condenserWallA : condenserWallB
}

// The left receiving surface is taken directly from path10175 in the sourced
// Miller-Urey SVG. Keeping these authored coordinates beside the condenser
// centreline prevents the receiver from drifting away from the drawn trap.
export const TRAP_POOL_SURFACE_LEFT = 263.343262
export const TRAP_POOL_SURFACE_RIGHT = 273.280762
export const TRAP_POOL_SURFACE_Y = 496.156219

const TRAP_POOL_SURFACE_CURVE = {
  p0: point(263.343262, 496.156219),
  p1: point(267.149719, 496.844025),
  p2: point(268.965607, 496.846527),
  p3: point(273.280762, 496.156219),
}

export function trapPoolSurfacePointAt(amount: number): Vec2 {
  const t = Math.min(1, Math.max(0, amount))
  const inverse = 1 - t
  const p = TRAP_POOL_SURFACE_CURVE
  return {
    x: inverse ** 3 * p.p0.x + 3 * inverse ** 2 * t * p.p1.x + 3 * inverse * t ** 2 * p.p2.x + t ** 3 * p.p3.x,
    y: inverse ** 3 * p.p0.y + 3 * inverse ** 2 * t * p.p1.y + 3 * inverse * t ** 2 * p.p2.y + t ** 3 * p.p3.y,
  }
}

export function sourcePointToUv(position: Vec2): Vec2 {
  return {
    x: position.x / MILLER_UREY_SOURCE_WIDTH,
    y: position.y / MILLER_UREY_SOURCE_HEIGHT,
  }
}

export function sourceRadiusToUv(radius: number) {
  return radius / MILLER_UREY_SOURCE_WIDTH
}

export function surfacePositionAt(s: number, side: CondenserSurfaceSide) {
  return wettingSurfaceFor(side).pointAt(s)
}

export function surfaceTangentAt(s: number, side: CondenserSurfaceSide) {
  return wettingSurfaceFor(side).tangentAt(s)
}

export function gravityProjectionAt(s: number, side: CondenserSurfaceSide) {
  return surfaceTangentAt(s, side).y
}
