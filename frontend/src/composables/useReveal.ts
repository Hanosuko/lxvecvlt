import { ref } from 'vue'
import type { Ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export function useReveal(target: Ref<HTMLElement | null>, threshold = 0) {
  const revealed = ref(false)

  const { stop } = useIntersectionObserver(
    target,
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        revealed.value = true
        stop()
      }
    },
    { threshold },
  )

  return revealed
}
