import { onSlideEnter, onSlideLeave, useIsSlideActive, useNav, useSlideContext } from '@slidev/client'
import { gsap } from 'gsap'
import { nextTick, onMounted, onUnmounted, type Ref, watch } from 'vue'

interface GsapSlideTimelineOptions {
  root: Ref<HTMLElement | null>
  steps: number
  build: () => gsap.core.Timeline
}

export function useGsapSlideTimeline({ root, steps, build }: GsapSlideTimelineOptions) {
  const { $clicks } = useSlideContext()
  const { isPrintMode } = useNav()
  const isActive = useIsSlideActive()
  let context: gsap.Context | undefined
  let timeline: gsap.core.Timeline | undefined
  let reduced = false

  function targetLabel() {
    const click = Math.max(0, Math.min(steps, Number($clicks.value) || 0))
    return `step-${click}`
  }

  function sync(animate = true) {
    if (!timeline) return
    const label = targetLabel()
    const destination = timeline.labels[label]
    if (destination === undefined) return

    timeline.pause()
    if (!animate || reduced || isPrintMode.value || !isActive.value) {
      timeline.seek(destination, false)
      return
    }

    gsap.to(timeline, {
      time: destination,
      duration: 0.46,
      ease: 'power2.out',
      overwrite: true,
      onComplete: () => timeline?.pause(),
    })
  }

  function onMotionPreference(event: Event) {
    reduced = Boolean((event as CustomEvent<{ reduced?: boolean }>).detail?.reduced)
    sync(false)
  }

  onMounted(async () => {
    await nextTick()
    if (!root.value || timeline) return
    reduced = document.documentElement.classList.contains('lab-reduced-motion')
    context = gsap.context(() => {
      timeline = build().pause()
    }, root.value)
    window.addEventListener('visual-lab-motion-change', onMotionPreference)
    sync(false)
  })

  watch($clicks, () => sync(true), { flush: 'post' })
  watch(isActive, active => active ? sync(false) : timeline?.pause())
  onSlideEnter(() => sync(false))
  onSlideLeave(() => timeline?.pause())

  onUnmounted(() => {
    window.removeEventListener('visual-lab-motion-change', onMotionPreference)
    timeline?.kill()
    context?.revert()
    timeline = undefined
    context = undefined
  })

  return { sync }
}
