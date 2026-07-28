<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useEventListener, useMouse, useRafFn } from '@vueuse/core'
import { prefersReducedMotion } from '@/composables/useMotion'

const enabled = ref(false)
const visible = ref(false)
const cursorEl = ref<HTMLElement | null>(null)

const { x, y } = useMouse({ type: 'client', touch: false })
const hovering = ref(false)
const pressed = ref(false)

let cx = 0
let cy = 0
let cs = 1

const INTERACTIVE = 'a, button, [data-cursor="hover"]'

const raf = useRafFn(
  () => {
    cx += (x.value - cx) * 0.18
    cy += (y.value - cy) * 0.18
    const targetScale = (hovering.value ? 2.5 : 1) * (pressed.value ? 0.7 : 1)
    cs += (targetScale - cs) * 0.2

    const el = cursorEl.value
    if (el) el.style.transform = `translate3d(${cx}px, ${cy}px, 0) scale(${cs})`
  },
  { immediate: false },
)

useEventListener(window, 'pointermove', () => {
  if (enabled.value) visible.value = true
})

useEventListener(window, 'pointerdown', () => (pressed.value = true))
useEventListener(window, 'pointerup', () => (pressed.value = false))

useEventListener(document, 'pointerover', (e: PointerEvent) => {
  const target = e.target as Element | null
  hovering.value = !!target?.closest?.(INTERACTIVE)
})

onMounted(() => {
  if (window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion()) {
    enabled.value = true
    document.documentElement.classList.add('has-custom-cursor')
    cx = x.value
    cy = y.value
    raf.resume()
  }
})

onBeforeUnmount(() => {
  raf.pause()
  document.documentElement.classList.remove('has-custom-cursor')
})
</script>

<template>
  <div
    v-if="enabled"
    ref="cursorEl"
    class="cursor"
    :class="{ 'cursor--visible': visible }"
    aria-hidden="true"
  />
</template>

<style scoped>
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 18px;
  height: 18px;
  margin: -9px 0 0 -9px;
  border: 1.5px solid #fff;
  mix-blend-mode: difference;
  pointer-events: none;
  z-index: var(--z-cursor);
  opacity: 0;
  transition: opacity 0.3s ease;
  will-change: transform;
}

.cursor--visible {
  opacity: 1;
}
</style>
