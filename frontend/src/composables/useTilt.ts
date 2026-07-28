import { watch } from 'vue'
import type { Ref } from 'vue'
import { useMouse, useWindowSize } from '@vueuse/core'
import { gsap } from 'gsap'
import { isCoarsePointer, prefersReducedMotion } from './useMotion'

type QuickTo = ReturnType<typeof gsap.quickTo>

export function useTilt(target: Ref<HTMLElement | null>, max = 7) {
  if (prefersReducedMotion() || isCoarsePointer()) return

  const { x, y } = useMouse({ type: 'client' })
  const { width, height } = useWindowSize()

  let rotX: QuickTo | null = null
  let rotY: QuickTo | null = null

  watch(
    target,
    (el) => {
      if (!el) return
      gsap.set(el, { transformPerspective: 900, transformStyle: 'preserve-3d' })
      rotX = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' })
      rotY = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' })
    },
    { immediate: true },
  )

  watch([x, y], () => {
    if (!rotX || !rotY || !width.value || !height.value) return
    const nx = (x.value / width.value - 0.5) * 2 // -1 .. 1
    const ny = (y.value / height.value - 0.5) * 2
    rotY(nx * max)
    rotX(-ny * max)
  })
}
