<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { computed } from 'vue'
import { Euler, Quaternion, Vector3 } from 'three'

type MoleculeName = 'CO2' | 'H2O' | 'CH4'
type ViewName = 'front' | 'oblique' | 'top'
type Atom = { id: string, element: 'C' | 'O' | 'H', position: [number, number, number] }
type Bond = { from: number, to: number }

const props = defineProps<{ molecule: MoleculeName, view: ViewName, rotationX: number, rotationY: number }>()
const emit = defineEmits<{ error: [error: Error] }>()

const moleculeData: Record<MoleculeName, { atoms: Atom[], bonds: Bond[] }> = {
  CO2: {
    atoms: [
      { id: 'o-left', element: 'O', position: [-1.55, 0, 0] },
      { id: 'c', element: 'C', position: [0, 0, 0] },
      { id: 'o-right', element: 'O', position: [1.55, 0, 0] },
    ],
    bonds: [{ from: 0, to: 1 }, { from: 1, to: 2 }],
  },
  H2O: {
    atoms: [
      { id: 'o', element: 'O', position: [0, 0.2, 0] },
      { id: 'h-left', element: 'H', position: [-1.15, -0.7, 0] },
      { id: 'h-right', element: 'H', position: [1.15, -0.7, 0] },
    ],
    bonds: [{ from: 0, to: 1 }, { from: 0, to: 2 }],
  },
  CH4: {
    atoms: [
      { id: 'c', element: 'C', position: [0, 0, 0] },
      { id: 'h1', element: 'H', position: [1.05, 1.05, 1.05] },
      { id: 'h2', element: 'H', position: [-1.05, -1.05, 1.05] },
      { id: 'h3', element: 'H', position: [-1.05, 1.05, -1.05] },
      { id: 'h4', element: 'H', position: [1.05, -1.05, -1.05] },
    ],
    bonds: [{ from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 0, to: 4 }],
  },
}

const atoms = computed(() => moleculeData[props.molecule].atoms.map(atom => ({ ...atom, scenePosition: new Vector3(...atom.position) })))
const bonds = computed(() => moleculeData[props.molecule].bonds.map((bond, index) => {
  const from = new Vector3(...moleculeData[props.molecule].atoms[bond.from].position)
  const to = new Vector3(...moleculeData[props.molecule].atoms[bond.to].position)
  const direction = to.clone().sub(from)
  const midpoint = from.clone().add(to).multiplyScalar(0.5)
  const quaternion = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), direction.clone().normalize())
  return { id: `bond-${index}`, length: direction.length(), midpoint, quaternion }
}))

const viewRotation = computed(() => {
  const base = {
    front: [0, 0, 0],
    oblique: [-0.35, 0.58, 0.08],
    top: [-1.15, 0.18, 0],
  }[props.view]
  return new Euler(base[0] + props.rotationX * Math.PI / 180, base[1] + props.rotationY * Math.PI / 180, base[2])
})

const cameraPosition = new Vector3(0, 0, 8)
const keyLightPosition = new Vector3(4, 5, 6)
const fillLightPosition = new Vector3(-4, -2, 3)

const atomStyle = {
  C: { color: '#30312f', radius: 0.58 },
  O: { color: '#a84b39', radius: 0.64 },
  H: { color: '#f6f2e9', radius: 0.44 },
}
</script>

<template>
  <TresCanvas render-mode="on-demand" clear-color="#f2eee5" :dpr="[1, 1.5]" @error="error => emit('error', error)">
    <TresPerspectiveCamera :position="cameraPosition" />
    <TresAmbientLight :intensity="2.2" />
    <TresDirectionalLight :position="keyLightPosition" :intensity="4.5" />
    <TresDirectionalLight :position="fillLightPosition" :intensity="1.6" />
    <TresGroup :rotation="viewRotation">
      <TresMesh v-for="bond in bonds" :key="bond.id" :position="bond.midpoint" :quaternion="bond.quaternion">
        <TresCylinderGeometry :args="[0.1, 0.1, bond.length, 24]" />
        <TresMeshStandardMaterial color="#8a867d" :roughness="0.55" />
      </TresMesh>
      <TresMesh v-for="atom in atoms" :key="atom.id" :position="atom.scenePosition">
        <TresSphereGeometry :args="[atomStyle[atom.element].radius, 40, 24]" />
        <TresMeshStandardMaterial :color="atomStyle[atom.element].color" :roughness="0.38" :metalness="0.02" />
      </TresMesh>
    </TresGroup>
  </TresCanvas>
</template>
