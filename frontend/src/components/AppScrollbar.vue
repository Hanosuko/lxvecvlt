<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEventListener, useResizeObserver } from '@vueuse/core'

const MIN_THUMB = 44
const IDLE_MS = 1000

const hasOverflow = ref(false)
const visible = ref(false)
const thumbHeight = ref(0)
const thumbY = ref(0)

let idleTimer: ReturnType<typeof setTimeout> | undefined
let dragging = false
let dragStartY = 0
let dragStartScroll = 0

function measure() {
  const winH = window.innerHeight
  const docH = document.documentElement.scrollHeight
  hasOverflow.value = docH > winH + 1
  if (!hasOverflow.value) return

  const trackH = winH
  const th = Math.max(MIN_THUMB, (winH / docH) * trackH)
  const maxScroll = docH - winH
  const maxThumbY = trackH - th

  thumbHeight.value = th
  thumbY.value = maxScroll > 0 ? (window.scrollY / maxScroll) * maxThumbY : 0
}

function reveal() {
  measure()
  if (!hasOverflow.value) {
    visible.value = false
    return
  }
  visible.value = true
  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = setTimeout(() => {
    if (!dragging) visible.value = false
  }, IDLE_MS)
}

function onDown(e: PointerEvent) {
  dragging = true
  dragStartY = e.clientY
  dragStartScroll = window.scrollY
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  e.preventDefault()
}

function onMove(e: PointerEvent) {
  if (!dragging) return
  const winH = window.innerHeight
  const docH = document.documentElement.scrollHeight
  const maxThumbY = winH - thumbHeight.value
  const maxScroll = docH - winH
  const delta = maxThumbY > 0 ? ((e.clientY - dragStartY) / maxThumbY) * maxScroll : 0
  window.scrollTo({ top: dragStartScroll + delta })
  reveal()
}

function onUp(e: PointerEvent) {
  if (!dragging) return
  dragging = false
  ;(e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId)
  reveal()
}

onMounted(measure)
useEventListener(window, 'scroll', reveal, { passive: true })
useEventListener(window, 'wheel', reveal, { passive: true })
useEventListener(window, 'resize', reveal)
useResizeObserver(document.body, () => measure())
</script>

<template>
  <div
    v-show="hasOverflow"
    class="scrollbar"
    :class="{ 'is-visible': visible }"
    aria-hidden="true"
  >
    <div
      class="scrollbar__thumb"
      :style="{ height: `${thumbHeight}px`, transform: `translateY(${thumbY}px)` }"
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="onUp"
      @pointercancel="onUp"
    />
  </div>
</template>

<style scoped>
.scrollbar {
  position: fixed;
  top: 0;
  right: 0;
  width: 16px;
  height: 100vh;
  height: 100svh;
  z-index: 9500;
  background: #ede9df;
  opacity: 0;
  transition: opacity 0.35s var(--ease-out);
  pointer-events: none;
}

.scrollbar.is-visible {
  opacity: 1;
}

.scrollbar.is-visible .scrollbar__thumb {
  pointer-events: auto;
}

.scrollbar__thumb {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  background: url(/stitch-thumb.webp) repeat-y center / auto 42px;
  cursor: grab;
  will-change: transform;
  touch-action: none;
  /* Не кликабелен, пока полоса скрыта (чтобы невидимый ползунок не перехватывал
     клики вдоль правого края). */
  pointer-events: none;
}

.scrollbar__thumb:active {
  cursor: grabbing;
}
</style>
