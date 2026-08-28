import {
  MAX_CONDENSATE_DROPS,
  MAX_DETACHED_DROPS,
  MAX_RIVULET_TRAIL_SEGMENTS,
  TRAP_SURFACE_SAMPLE_COUNT,
} from './millerUreyCondensationModel'

export const millerUreyCondenserVertexShader = `
precision highp float;
in vec2 aPosition;
in vec2 aUV;
out vec2 vUV;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
  vUV = aUV;
}
`

export const millerUreyCondenserFragmentShader = `
precision highp float;

in vec2 vUV;
out vec4 finalColor;

uniform float uActivity;
uniform float uCollection;
uniform float uTime;
uniform float uTrailCount;
uniform vec4 uSurfaceDropData[${MAX_CONDENSATE_DROPS}];
uniform vec4 uSurfaceDropShape[${MAX_CONDENSATE_DROPS}];
uniform vec4 uTrailSegmentStartData[${MAX_RIVULET_TRAIL_SEGMENTS}];
uniform vec4 uTrailSegmentEndData[${MAX_RIVULET_TRAIL_SEGMENTS}];
uniform vec4 uHeadData;
uniform vec4 uHeadShape;
uniform vec4 uDetachedData[${MAX_DETACHED_DROPS}];
uniform vec4 uTrapPoolData;
uniform vec4 uTrapSurfaceData[${TRAP_SURFACE_SAMPLE_COUNT}];

const vec2 SOURCE_SIZE = vec2(652.0, 607.0);

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
             mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0)), f.x), f.y);
}

vec2 sourcePoint(vec2 uv) {
  return uv * SOURCE_SIZE;
}

float attachedDropInfluence(vec2 point, vec4 data, vec4 shape) {
  float radius = data.z * SOURCE_SIZE.x * 1.12;
  if (radius <= 0.05 || data.w < 0.5) return 0.0;

  vec2 tangent = normalize(shape.xy + vec2(0.00001));
  vec2 normal = vec2(-tangent.y, tangent.x);
  vec2 delta = point - sourcePoint(data.xy);
  float along = dot(delta, tangent);
  float across = dot(delta, normal);

  float sliding = step(1.5, data.w) * (1.0 - step(2.5, data.w));
  float pooled = step(2.5, data.w);
  float alongScale = mix(1.0, 1.15 + shape.z * 0.80, sliding);
  alongScale = mix(alongScale, 1.65 + shape.w * 0.42, pooled);
  float acrossScale = mix(1.0, 0.90, sliding);
  acrossScale = mix(acrossScale, 0.76, pooled);
  float distanceSquared = (along / alongScale) * (along / alongScale)
    + (across / acrossScale) * (across / acrossScale);
  float field = radius * radius / (distanceSquared + 0.42);

  // Sliding beads stay compact. The connected wet trail owns continuity;
  // an auxiliary shoulder field can become a long diagonal streak when a
  // bead reaches a bend or when the renderer samples between frames.
  return field;
}

float rivuletTrailInfluence(vec2 point) {
  float field = 0.0;
  for (int index = 0; index < ${MAX_RIVULET_TRAIL_SEGMENTS}; index++) {
    if (float(index) >= uTrailCount) continue;
    vec4 startData = uTrailSegmentStartData[index];
    vec4 endData = uTrailSegmentEndData[index];
    if (startData.w <= 0.01 || endData.w <= 0.01 || startData.z <= 0.0 || endData.z <= 0.0) continue;

    vec2 start = sourcePoint(startData.xy);
    vec2 end = sourcePoint(endData.xy);
    vec2 segment = end - start;
    float segmentLength = length(segment);
    // The CPU packs only adjacent, same-wall path segments. This second guard
    // makes an impossible long connector unrenderable even if a GPU uniform is
    // ever observed between updates.
    if (segmentLength <= 0.02 || segmentLength > 10.5) continue;
    float segmentLengthSquared = max(dot(segment, segment), 0.0001);
    float amount = clamp(dot(point - start, segment) / segmentLengthSquared, 0.0, 1.0);
    vec2 closest = start + segment * amount;
    float radius = mix(startData.z, endData.z, amount) * SOURCE_SIZE.x;
    float wetness = mix(startData.w, endData.w, amount);
    float spatialIdentity = valueNoise(closest * vec2(0.37, 0.23));
    float edgeVariation = mix(0.91, 1.08, spatialIdentity);
    float effectiveRadius = radius * edgeVariation;
    float distanceToSegment = length(point - closest);
    float ribbon = 1.0 - smoothstep(effectiveRadius * 0.42, effectiveRadius, distanceToSegment);
    field = max(field, ribbon * wetness);
  }
  return field;
}

float rivuletHeadInfluence(vec2 point) {
  if (uHeadData.w < 0.5 || uHeadData.z <= 0.0) return 0.0;
  float radius = uHeadData.z * SOURCE_SIZE.x;
  vec2 tangent = normalize(uHeadShape.xy + vec2(0.00001));
  vec2 normal = vec2(-tangent.y, tangent.x);
  vec2 delta = point - sourcePoint(uHeadData.xy);
  float along = dot(delta, tangent);
  float across = dot(delta, normal);
  float pooled = step(1.5, uHeadData.w);
  float trapPool = step(2.5, uHeadData.w);
  float mergeProgress = trapPool * clamp(uHeadShape.w, 0.0, 1.0);
  float alongScale = mix(1.28 + uHeadShape.z * 0.44, 1.92, pooled);
  alongScale = mix(alongScale, mix(1.72, 0.72, mergeProgress), trapPool);
  float acrossScale = mix(0.86, 0.74, pooled);
  acrossScale = mix(acrossScale, 0.92 + sin(mergeProgress * 3.14159265) * 0.34, trapPool);
  float distanceSquared = (along / alongScale) * (along / alongScale)
    + (across / acrossScale) * (across / acrossScale);
  return radius * radius / (distanceSquared + 0.34);
}

float trapSurfaceY(float x) {
  float surfaceY = 496.156219;
  for (int index = 0; index < ${TRAP_SURFACE_SAMPLE_COUNT - 1}; index++) {
    vec4 left = uTrapSurfaceData[index];
    vec4 right = uTrapSurfaceData[index + 1];
    float inSegment = step(left.x, x) * step(x, right.x);
    float amount = clamp((x - left.x) / max(0.0001, right.x - left.x), 0.0, 1.0);
    surfaceY = mix(surfaceY, mix(left.y, right.y, amount), inSegment);
  }
  return surfaceY;
}

float trapPoolInfluence(vec2 point) {
  if (uTrapPoolData.x < 0.5) return 0.0;
  const float surfaceLeft = 263.343262;
  const float surfaceRight = 273.280762;
  float horizontal = smoothstep(surfaceLeft, surfaceLeft + 0.72, point.x)
    * (1.0 - smoothstep(surfaceRight - 0.72, surfaceRight, point.x));
  float surfaceY = trapSurfaceY(point.x);
  float distanceToSurface = point.y - surfaceY;
  float interfaceField = exp(-distanceToSurface * distanceToSurface / 1.18) * horizontal;
  float receivingBody = smoothstep(-0.30, 1.20, distanceToSurface)
    * (1.0 - smoothstep(5.8, 8.4, distanceToSurface)) * horizontal;
  float settledPresence = smoothstep(0.04, 0.42, uTrapPoolData.w) * 0.26;
  float receiverStrength = max(uTrapPoolData.z, settledPresence);
  return (interfaceField * 1.08 + receivingBody * 0.16) * receiverStrength;
}

float detachedInfluence(vec2 point) {
  float field = 0.0;
  for (int index = 0; index < ${MAX_DETACHED_DROPS}; index++) {
    vec4 drop = uDetachedData[index];
    if (drop.w < 0.5 || drop.z <= 0.0) continue;
    float radius = drop.z * SOURCE_SIZE.x;
    vec2 delta = point - sourcePoint(drop.xy);
    field = max(field, radius * radius / (dot(delta, delta) + 0.42));
  }
  return field;
}

float condenserVapourMask(vec2 p) {
  float horizontal = smoothstep(0.2777, 0.2791, p.x) * (1.0 - smoothstep(0.2906, 0.2920, p.x));
  float vertical = smoothstep(0.500, 0.506, p.y) * (1.0 - smoothstep(0.693, 0.703, p.y));
  return horizontal * vertical;
}

void main() {
  vec2 point = sourcePoint(vUV);
  float dropField = 0.0;
  for (int index = 0; index < ${MAX_CONDENSATE_DROPS}; index++) {
    dropField = max(dropField, attachedDropInfluence(point, uSurfaceDropData[index], uSurfaceDropShape[index]));
  }

  float trailField = rivuletTrailInfluence(point);
  float headField = rivuletHeadInfluence(point);
  float trapField = trapPoolInfluence(point);
  float freeField = detachedInfluence(point);
  float receivingHead = headField + trapField * step(2.5, uHeadData.w) * 0.56;
  float beadField = max(dropField, max(receivingHead, freeField));
  float beadBody = smoothstep(0.72, 1.03, beadField);
  float beadRim = smoothstep(0.34, 0.72, beadField) * (1.0 - smoothstep(1.00, 1.42, beadField));
  float beadHighlight = smoothstep(1.16, 1.90, beadField);
  float filmBody = smoothstep(0.16, 0.72, trailField);
  float filmRim = smoothstep(0.05, 0.30, trailField) * (1.0 - smoothstep(0.70, 0.96, trailField));
  float poolBody = smoothstep(0.18, 0.74, trapField);
  float poolRim = smoothstep(0.06, 0.26, trapField) * (1.0 - smoothstep(0.70, 1.06, trapField));

  // Vapour is a low-contrast phase field in the cold vertical chamber. It is
  // not a decorative steam stroke and it never drives liquid motion.
  float hazeNoise = valueNoise(vec2(vUV.x * 510.0 + uTime * 0.055, vUV.y * 92.0 - uTime * 0.07));
  float upperFade = smoothstep(0.692, 0.528, vUV.y);
  float haze = condenserVapourMask(vUV) * upperFade * (0.006 + hazeNoise * 0.010) * uActivity;

  vec3 beadColour = mix(vec3(0.47, 0.55, 0.88), vec3(0.94, 0.96, 1.0), beadRim * 0.78 + beadHighlight * 0.18);
  vec3 filmColour = mix(vec3(0.48, 0.57, 0.84), vec3(0.88, 0.92, 0.98), filmRim * 0.46);
  float beadAlpha = beadBody * 0.82 + beadRim * 0.27;
  float filmAlpha = filmBody * 0.40 + filmRim * 0.13;
  float poolAlpha = poolBody * 0.24 + poolRim * 0.18;
  float liquidAlpha = max(poolAlpha, max(beadAlpha, filmAlpha));
  vec3 poolColour = mix(vec3(0.49, 0.57, 0.88), vec3(0.91, 0.94, 1.0), poolRim * 0.72);
  vec3 liquidColour = mix(poolColour, mix(filmColour, beadColour, smoothstep(0.04, 0.32, beadAlpha)), smoothstep(0.02, 0.24, max(beadAlpha, filmAlpha)));

  float alpha = max(haze, liquidAlpha);
  vec3 colour = mix(vec3(0.82, 0.85, 0.96), liquidColour, smoothstep(0.01, 0.14, liquidAlpha));
  finalColor = vec4(colour * alpha, alpha);
}
`
