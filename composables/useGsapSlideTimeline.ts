import { onSlideEnter, onSlideLeave, useIsSlideActive, useNav, useSlideContext } from '@slidev/client'
import { gsap } from 'gsap'
import { nextTick, onMounted, onUnmounted, type Ref, watch } from 'vue'

interface GsapSlideTimelineOptions {
  root: Ref<HTMLElement | null>
  steps: number
  build: () => gsap.core.Timeline
  motionClass?: string
  motionEvent?: string
  duration?: number
}

/**
 * Binds a deterministic labelled GSAP timeline to Slidev's click state.
 * Timelines must expose step-0 through step-N labels. Slidev remains the
 * sequencing authority; GSAP only choreographs the visual state between them.
 */
export function useGsapSlideTimeline({
  root,
  steps,
  build,
  motionClass = 'deck-reduced-motion',
  motionEvent = 'deck-motion-change',
  duration = .52,
}: GsapSlideTimelineOptions) {
  const { $clicks } = useSlideContext()
  const { isPrintMode } = useNav()
  const isActive = useIsSlideActive()
  let context: gsap.Context | undefined
  let timeline: gsap.core.Timeline | undefined
  let reduced = false

  function destination() {
    const click = Math.max(0, Math.min(steps, Number($clicks.value) || 0))
    return timeline?.labels[`step-${click}`]
  }

  function sync(animate = true) {
    const next = destination()
    if (!timeline || next === undefined) return
    timeline.pause()
    gsap.killTweensOf(timeline)
    if (!animate || reduced || isPrintMode.value || !isActive.value) {
      timeline.seek(next, false)
      return
    }
    gsap.to(timeline, {
      time: next,
      duration,
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
    reduced = document.documentElement.classList.contains(motionClass)
    context = gsap.context(() => { timeline = build().pause() }, root.value)
    window.addEventListener(motionEvent, onMotionPreference)
    sync(false)
  })

  watch($clicks, () => sync(true), { flush: 'post' })
  watch(isActive, active => active ? sync(false) : timeline?.pause())
  onSlideEnter(() => sync(false))
  onSlideLeave(() => timeline?.pause())

  onUnmounted(() => {
    window.removeEventListener(motionEvent, onMotionPreference)
    if (timeline) gsap.killTweensOf(timeline)
    timeline?.kill()
    context?.revert()
    timeline = undefined
    context = undefined
  })

  return { sync }
}
