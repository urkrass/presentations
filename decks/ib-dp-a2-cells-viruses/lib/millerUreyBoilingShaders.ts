import { MAX_BOIL_OBJECTS } from '../../visual-lab/lib/boilingModel'

export const millerUreyBoilingVertexShader = `
precision highp float;
in vec2 aPosition;
in vec2 aUV;
out vec2 vUV;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
  vUV = aUV;
}
`

export const millerUreyBoilingFragmentShader = `
precision highp float;

in vec2 vUV;
out vec4 finalColor;

uniform float uTime;
uniform float uActivity;
uniform float uConvection;
uniform float uSurfaceAmplitude;
uniform vec4 uBubbleData[${MAX_BOIL_OBJECTS}];

const float MILLER_WATER_SURFACE = 0.402;

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

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.55;
  for (int octave = 0; octave < 4; octave++) {
    value += valueNoise(p) * amplitude;
    p = p * 2.03 + vec2(17.7, 9.2);
    amplitude *= 0.48;
  }
  return value;
}

// The renderer now shares the source SVG's own 652 × 607 coordinate system.
// The DOM clip is copied from path5114's exact inner cavity, so this shader
// only needs to place the validated Study 13 field within that source space.
vec2 svgSpace(vec2 p) {
  return p;
}

vec2 flaskSpace(vec2 p) {
  vec2 source = svgSpace(p);
  return vec2((source.x - 0.6250) / 0.2410, (source.y - 0.7047) / 0.1210);
}

// This only limits shader work to the boiling bulb. It deliberately does not
// invent a second curved boundary: the source-derived raster mask owns the
// exact round glass silhouette and therefore the real contact position.
float flaskMask(vec2 p) {
  vec2 q = flaskSpace(p);
  // path5114 also contains the attached return tube. Seal the liquid field at
  // the bulb's left tangent so the source mask cannot admit bulk water into
  // that branch; keep the right edge unchanged for its capillary shoulder.
  float leftBulbSeal = smoothstep(0.158, 0.168, q.x);
  float rightExtent = 1.0 - smoothstep(0.85, 0.865, q.x);
  float horizontal = leftBulbSeal * rightExtent;
  float vertical = smoothstep(0.045, 0.075, q.y) * (1.0 - smoothstep(0.98, 1.015, q.y));
  return horizontal * vertical;
}

float bubbleInfluence(vec2 p, vec4 bubble, vec2 warp) {
  float radius = bubble.z;
  if (radius <= 0.0001) return 0.0;
  float stretch = abs(bubble.w);
  vec2 delta = p + warp - bubble.xy;
  delta.x *= 1.0 + stretch * 0.34;
  delta.y /= 1.0 + stretch * 0.48;
  float distanceSquared = dot(delta, delta);
  float cutoff = 1.0 - smoothstep(radius * 2.5, radius * 3.15, sqrt(distanceSquared));
  return (radius * radius / (distanceSquared + 0.000002)) * cutoff;
}

float surfaceAt(float x) {
  float broad = valueNoise(vec2(x * 5.2, uTime * 0.13));
  float fine = valueNoise(vec2(x * 17.0 + 4.3, uTime * 0.23));
  float wallDistance = max(0.0, min(x - 0.164, 0.834 - x));
  float wallCalm = smoothstep(0.0, 0.068, wallDistance);
  float disturbance = (broad - 0.5) * uSurfaceAmplitude + (fine - 0.5) * uSurfaceAmplitude * 0.34;
  // Water wets clean glass: its surface rises slightly at each wall instead of
  // meeting the curved flask as a flat, high-angle cut. Keep that small
  // meniscus stable while the centre remains free to boil.
  float leftShoulder = clamp((0.232 - x) / 0.068, 0.0, 1.0);
  float rightShoulder = clamp((x - 0.766) / 0.068, 0.0, 1.0);
  float capillaryShoulder = max(leftShoulder, rightShoulder);
  float meniscus = 0.140 * pow(capillaryShoulder, 2.2);
  float surface = MILLER_WATER_SURFACE + disturbance * wallCalm - meniscus;
  float localBulge = 0.0;
  float ruptureShape = 0.0;
  for (int index = 0; index < ${MAX_BOIL_OBJECTS}; index++) {
    vec4 bubble = uBubbleData[index];
    if (bubble.z <= 0.0001) continue;
    if (bubble.w > 0.0) {
      float nearSurface = 1.0 - smoothstep(0.0, 0.115, abs(bubble.y - MILLER_WATER_SURFACE));
      float horizontal = exp(-pow((x - bubble.x) / max(0.012, bubble.z * 2.7), 2.0));
      localBulge += nearSurface * horizontal * bubble.z * (0.42 + uActivity * 0.5);
    }
    else {
      float eventLife = 1.0 - smoothstep(0.015, 0.12, abs(bubble.y - MILLER_WATER_SURFACE));
      float scale = max(0.009, bubble.z * 3.0);
      float dx = abs(x - bubble.x);
      float opening = exp(-pow(dx / (scale * 1.35), 2.0));
      float crown = exp(-pow((dx - scale * 1.8) / (scale * 0.66), 2.0));
      ruptureShape += eventLife * (opening * bubble.z * 1.6 - crown * bubble.z * 1.35);
    }
  }
  return surface + wallCalm * (-min(localBulge, 0.05) + clamp(ruptureShape, -0.024, 0.027));
}

void main() {
  vec2 p = flaskSpace(vUV);
  float vessel = flaskMask(vUV);
  float flowA = valueNoise(vec2(p.x * 7.0 + uTime * 0.08, p.y * 5.2 - uTime * 0.11));
  float flowB = valueNoise(vec2(p.x * 11.3 - uTime * 0.07, p.y * 8.1 + uTime * 0.09));
  vec2 flowWarp = vec2(flowA - 0.5, flowB - 0.5) * (0.0012 + uConvection * 0.0038);

  float gasField = 0.0;
  float splashField = 0.0;
  for (int index = 0; index < ${MAX_BOIL_OBJECTS}; index++) {
    vec4 bubble = uBubbleData[index];
    if (bubble.z <= 0.0001) continue;
    if (bubble.w < 0.0) {
      // Keep detached droplets at the validated Study 13 scale. The previous
      // flask-specific enlargement made each splash read as a large blob.
      splashField += bubbleInfluence(p, bubble, flowWarp);
    }
    else {
      gasField += bubbleInfluence(p, bubble, flowWarp);
    }
  }

  float surface = surfaceAt(p.x);
  float water = vessel * smoothstep(surface - 0.002, surface + 0.003, p.y);
  float waterDepth = clamp((p.y - surface) / 0.58, 0.0, 1.0);
  float caustic = fbm(vec2(p.x * 8.0 + flowWarp.x * 140.0, p.y * 10.0 - uTime * 0.06));
  vec3 shallow = vec3(0.61, 0.67, 0.94);
  vec3 deep = vec3(0.31, 0.38, 0.78);
  vec3 waterColor = mix(shallow, deep, waterDepth * 0.78);
  waterColor += (caustic - 0.52) * vec3(0.065, 0.07, 0.11) * (0.25 + uConvection * 0.75);

  float gasInterior = smoothstep(0.93, 1.12, gasField);
  float gasRim = smoothstep(0.56, 0.92, gasField) * (1.0 - smoothstep(1.0, 1.48, gasField));
  float refractiveShade = clamp(0.54 + (flowA - 0.5) * 0.6 + (0.5 - p.x) * 0.22, 0.0, 1.0);
  vec3 bubbleInterior = mix(waterColor, vec3(0.91, 0.93, 1.0), 0.46 + refractiveShade * 0.16);
  waterColor = mix(waterColor, bubbleInterior, gasInterior * 0.7);
  waterColor = mix(waterColor, vec3(0.96, 0.97, 1.0), gasRim * 0.88);

  float surfaceLine = water * (1.0 - smoothstep(0.0015, 0.0075, abs(p.y - surface)));
  waterColor = mix(waterColor, vec3(0.96, 0.97, 1.0), surfaceLine * 0.74);
  float waterAlpha = water * mix(0.72, 0.9, waterDepth);
  waterAlpha *= 1.0 - gasInterior * 0.55;
  waterAlpha = max(waterAlpha, gasRim * water * 0.66);

  // Splash particles are deliberately not clipped by the liquid silhouette:
  // they detach at rupture, follow gravity, then disappear only on re-entry.
  float splash = smoothstep(0.88, 1.08, splashField);
  float splashRim = smoothstep(0.5, 0.9, splashField) * (1.0 - smoothstep(1.0, 1.55, splashField));
  vec3 splashColor = mix(vec3(0.58, 0.65, 0.92), vec3(0.96, 0.97, 1.0), splashRim * 0.78);

  vec3 color = waterColor;
  float alpha = waterAlpha;
  if (splash > 0.0) {
    color = mix(color, splashColor, splash);
    alpha = max(alpha, splash * 0.86 + splashRim * 0.12);
  }

  finalColor = vec4(color * alpha, alpha);
}
`
