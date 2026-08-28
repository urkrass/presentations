declare module '@slidev/client' {
  import type { Ref } from 'vue'

  export function useSlideContext(): { $clicks: Ref<number> }
  export function useNav(): { isPrintMode: Ref<boolean> }
  export function useIsSlideActive(): Ref<boolean>
  export function onSlideEnter(callback: (to?: number, from?: number) => void): void
  export function onSlideLeave(callback: (to?: number, from?: number) => void): void
}
