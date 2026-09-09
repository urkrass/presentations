export const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a
export const commonFactor = (values: number[]) => values.reduce(gcd)
export interface FormulaCase {
  name: string
  elements: string[]
  masses: number[]
  atomicMasses: number[]
  multiplier: number
  formula: string
}
// Rounded teaching masses; these are designed datasets, not laboratory measurements.
export const formulaCases: FormulaCase[] = [
  { name: 'Magnesium oxide', elements: ['Mg','O'], masses: [0.24,0.16], atomicMasses: [24,16], multiplier: 1, formula: 'MgO' },
  { name: 'Copper(II) oxide', elements: ['Cu','O'], masses: [6.4,1.6], atomicMasses: [64,16], multiplier: 1, formula: 'CuO' },
  { name: 'Carbon, hydrogen and oxygen', elements: ['C','H','O'], masses: [12,2,16], atomicMasses: [12,1,16], multiplier: 1, formula: 'CH₂O' },
  { name: 'Iron oxide', elements: ['Fe','O'], masses: [5.6,2.4], atomicMasses: [56,16], multiplier: 2, formula: 'Fe₂O₃' },
]
export function calculateRatio(sample: FormulaCase, scale = 1) {
  const masses = sample.masses.map(m => m * scale)
  const moles = masses.map((m,i) => m / sample.atomicMasses[i])
  const smallest = Math.min(...moles)
  const ratio = moles.map(n => n / smallest)
  const whole = ratio.map(n => Math.round(n * sample.multiplier))
  return { masses, moles, smallest, ratio, whole }
}
