import { MAX_BOIL_OBJECTS } from './boilingModel'

export const boilingVertexShader = `
precision highp float;
in vec2 aPosition;
in vec2 aUV;
out vec2 vUV;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
  vUV = aUV;
}
`

export const boilingFragmentShader = `
precision highp float;

in vec2 vUV;
out vec4 finalColor;

uniform float uTime;
uniform float uActivity;
uniform float uConvection;
uniform float uDebug;
uniform float uSteam;
uniform float uSurfaceAmplitude;
uniform vec4 uBubbleData[${MAX_BOIL_OBJECTS}];

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

float vesselBottom(float x) {
  float edge = clamp(abs((x - 0.5) / 0.325), 0.0, 1.0);
  return 0.895 - 0.045 * pow(edge, 5.0);
}

float vesselMask(vec2 p) {
  float left = smoothstep(0.166, 0.174, p.x);
  float right = 1.0 - smoothstep(0.826, 0.834, p.x);
  float belowTop = smoothstep(0.108, 0.118, p.y);
  float aboveBottom = 1.0 - smoothstep(vesselBottom(p.x) - 0.006, vesselBottom(p.x) + 0.002, p.y);
  return left * right * belowTop * aboveBottom;
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

float surfaceAt(float x, float gasFieldHint) {
  float broad = valueNoise(vec2(x * 5.2, uTime * 0.13));
  float fine = valueNoise(vec2(x * 17.0 + 4.3, uTime * 0.23));
  float surface = 0.292 + (broad - 0.5) * uSurfaceAmplitude + (fine - 0.5) * uSurfaceAmplitude * 0.34;
  float localBulge = 0.0;
  float ruptureShape = 0.0;
  for (int index = 0; index < ${MAX_BOIL_OBJECTS}; index++) {
    vec4 bubble = uBubbleData[index];
    if (bubble.z <= 0.0001) continue;
    if (bubble.w > 0.0) {
      float nearSurface = 1.0 - smoothstep(0.0, 0.115, abs(bubble.y - 0.292));
      float horizontal = exp(-pow((x - bubble.x) / max(0.012, bubble.z * 2.7), 2.0));
      localBulge += nearSurface * horizontal * bubble.z * (0.42 + uActivity * 0.5);
    }
    else {
      float eventLife = 1.0 - smoothstep(0.015, 0.12, abs(bubble.y - 0.292));
      float scale = max(0.009, bubble.z * 3.0);
      float dx = abs(x - bubble.x);
      float opening = exp(-pow(dx / (scale * 1.35), 2.0));
      float crown = exp(-pow((dx - scale * 1.8) / (scale * 0.66), 2.0));
      ruptureShape += eventLife * (opening * bubble.z * 1.6 - crown * bubble.z * 1.35);
    }
  }
  return surface - min(localBulge, 0.05) + clamp(ruptureShape, -0.024, 0.027) - gasFieldHint * 0.0;
}

void main() {
  vec2 p = vUV;
  float vessel = vesselMask(p);
  float flowA = valueNoise(vec2(p.x * 7.0 + uTime * 0.08, p.y * 5.2 - uTime * 0.11));
  float flowB = valueNoise(vec2(p.x * 11.3 - uTime * 0.07, p.y * 8.1 + uTime * 0.09));
  vec2 flowWarp = vec2(flowA - 0.5, flowB - 0.5) * (0.0012 + uConvection * 0.0038);

  float gasField = 0.0;
  float splashField = 0.0;
  float debugCenter = 0.0;
  for (int index = 0; index < ${MAX_BOIL_OBJECTS}; index++) {
    vec4 bubble = uBubbleData[index];
    if (bubble.z <= 0.0001) continue;
    float field = bubbleInfluence(p, bubble, flowWarp);
    if (bubble.w < 0.0) splashField += field;
    else gasField += field;
    debugCenter = max(debugCenter, 1.0 - smoothstep(0.0015, 0.0032, length(p - bubble.xy)));
  }

  float surface = surfaceAt(p.x, gasField);
  float water = vessel * smoothstep(surface - 0.002, surface + 0.003, p.y);
  float waterDepth = clamp((p.y - surface) / 0.58, 0.0, 1.0);
  float caustic = fbm(vec2(p.x * 8.0 + flowWarp.x * 140.0, p.y * 10.0 - uTime * 0.06));
  vec3 shallow = vec3(0.60, 0.76, 0.85);
  vec3 deep = vec3(0.19, 0.37, 0.50);
  vec3 waterColor = mix(shallow, deep, waterDepth * 0.82);
  waterColor += (caustic - 0.52) * vec3(0.055, 0.075, 0.082) * (0.25 + uConvection * 0.75);

  float gasInterior = smoothstep(0.93, 1.12, gasField);
  float gasRim = smoothstep(0.56, 0.92, gasField) * (1.0 - smoothstep(1.0, 1.48, gasField));
  float refractiveShade = clamp(0.54 + (flowA - 0.5) * 0.6 + (0.5 - p.x) * 0.22, 0.0, 1.0);
  vec3 bubbleInterior = mix(waterColor, vec3(0.87, 0.94, 0.97), 0.44 + refractiveShade * 0.18);
  waterColor = mix(waterColor, bubbleInterior, gasInterior * 0.68);
  waterColor = mix(waterColor, vec3(0.94, 0.98, 1.0), gasRim * 0.86);

  float surfaceLine = water * (1.0 - smoothstep(0.0015, 0.0075, abs(p.y - surface)));
  waterColor = mix(waterColor, vec3(0.92, 0.97, 0.98), surfaceLine * 0.72);
  float waterAlpha = water * mix(0.68, 0.84, waterDepth);
  waterAlpha *= 1.0 - gasInterior * 0.54;
  waterAlpha = max(waterAlpha, gasRim * water * 0.62);

  float splash = smoothstep(0.88, 1.08, splashField);
  float splashRim = smoothstep(0.5, 0.9, splashField) * (1.0 - smoothstep(1.0, 1.55, splashField));
  vec3 splashColor = mix(vec3(0.54, 0.72, 0.83), vec3(0.92, 0.97, 0.98), splashRim * 0.76);

  float steamNoise = fbm(vec2((p.x - 0.5) * 7.0 + uTime * 0.045, p.y * 5.0 + uTime * 0.13));
  float steamWindow = (1.0 - smoothstep(0.12, 0.285, p.y)) * smoothstep(0.045, 0.16, p.y);
  steamWindow *= 1.0 - smoothstep(0.12, 0.34, abs(p.x - 0.5));
  float steam = uSteam * steamWindow * smoothstep(0.44, 0.7, steamNoise);

  vec3 color = waterColor;
  float alpha = waterAlpha;
  if (splash > 0.0) {
    color = mix(color, splashColor, splash);
    alpha = max(alpha, splash * 0.82 + splashRim * 0.12);
  }
  color = mix(color, vec3(0.58, 0.65, 0.67), steam);
  alpha = max(alpha, steam * 0.31);

  if (uDebug > 0.5 && debugCenter > 0.0) {
    color = mix(color, vec3(0.55, 0.14, 0.10), debugCenter * 0.95);
    alpha = max(alpha, debugCenter);
  }

  finalColor = vec4(color * alpha, alpha);
}
`
