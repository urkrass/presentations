// Rounded classroom atomic masses, not exact constants. Keep guard digits internally.
export const atomicMass = { H: 1.01, C: 12.01, O: 16.00, Na: 22.99, Mg: 24.31, Cl: 35.45, Ca: 40.08, Zn: 65.38 } as const
export type Composition = Partial<Record<keyof typeof atomicMass, number>>
export function molarMass(atoms: Composition): number {
  return Object.entries(atoms).reduce((sum, [element, count]) => sum + atomicMass[element as keyof typeof atomicMass] * count!, 0)
}
function positive(...values: number[]) {
  if (values.some(value => !Number.isFinite(value) || value <= 0)) throw new RangeError('Use finite positive quantities.')
}
export function massToAmount(mass: number, M: number) { positive(mass, M); return mass / M }
export function amountToMass(amount: number, M: number) { positive(amount, M); return amount * M }
export function predictProduct(mass: number, reactantM: number, a: number, b: number, productM: number) {
  positive(mass, reactantM, a, b, productM)
  const reactantAmount = mass / reactantM
  const productAmount = reactantAmount * b / a
  return { reactantAmount, productAmount, productMass: productAmount * productM }
}
export const substances = [
  { name: 'Magnesium · Mg', symbol: 'Mg', atoms: { Mg: 1 } },
  { name: 'Water · H₂O', symbol: 'H_2O', atoms: { H: 2, O: 1 } },
  { name: 'Carbon dioxide · CO₂', symbol: 'CO_2', atoms: { C: 1, O: 2 } },
  { name: 'Calcium carbonate · CaCO₃', symbol: 'CaCO_3', atoms: { Ca: 1, C: 1, O: 3 } },
  { name: 'Zinc · Zn', symbol: 'Zn', atoms: { Zn: 1 } },
] satisfies { name: string; symbol: string; atoms: Composition }[]
export const reactions = [
  { name: 'Magnesium to magnesium oxide', equation: '2\\mathrm{Mg(s)}+\\mathrm{O_2(g)}\\rightarrow2\\mathrm{MgO(s)}', given: 'Mg', product: 'MgO', a: 2, b: 2, reactantM: 24.31, productM: 40.31, assumption: 'Oxygen is in excess; all the pure Mg forms MgO.' },
  { name: 'Oxygen to magnesium oxide', equation: '2\\mathrm{Mg(s)}+\\mathrm{O_2(g)}\\rightarrow2\\mathrm{MgO(s)}', given: 'O_2', product: 'MgO', a: 1, b: 2, reactantM: 32.00, productM: 40.31, assumption: 'Magnesium is in excess; all the O₂ forms MgO.' },
  { name: 'Calcium carbonate to calcium oxide', equation: '\\mathrm{CaCO_3(s)}\\xrightarrow{\\Delta}\\mathrm{CaO(s)}+\\mathrm{CO_2(g)}', given: 'CaCO_3', product: 'CaO', a: 1, b: 1, reactantM: 100.09, productM: 56.08, assumption: 'Pure CaCO₃ decomposes completely on heating.' },
  { name: 'Zinc to hydrogen', equation: '\\mathrm{Zn(s)}+2\\mathrm{HCl(aq)}\\rightarrow\\mathrm{ZnCl_2(aq)}+\\mathrm{H_2(g)}', given: 'Zn', product: 'H_2', a: 1, b: 1, reactantM: 65.38, productM: 2.02, assumption: 'Hydrochloric acid is in excess; all the pure Zn reacts.' },
]
export const formatQuantity = (value: number) => value.toPrecision(4)
