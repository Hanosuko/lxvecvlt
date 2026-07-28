<script setup lang="ts">

const props = defineProps<{ href?: string; variant?: 'glow' | 'stitch' }>()

function onClick() {
  if (props.href) window.open(props.href, '_blank', 'noopener,noreferrer')
}

function onMove(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}
</script>

<template>
  <button
    type="button"
    class="glow"
    :class="{ 'glow--stitch': variant === 'stitch' }"
    @pointermove="onMove"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<style scoped>
.glow {
  position: relative;
  isolation: isolate;
  --mx: 50%;
  --my: 50%;
}

/* Свет по рамке: оверлей с прозрачным бордером, радиальный градиент которого
   стоит под курсором и замаскирован так, что виден только контур рамки. */
.glow::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 2px solid transparent;
  background: radial-gradient(
      100px circle at var(--mx) var(--my),
      var(--glow, var(--accent)),
      transparent 45%
    )
    border-box;
  -webkit-mask:
    linear-gradient(#000 0 0) padding-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s var(--ease-out);
  pointer-events: none;
}

.glow:hover::before,
.glow:focus-visible::before {
  opacity: 1;
}

/* Вариант с прошивкой: вместо мягкого света проявляем оранжевую рамку-шов,
   лежащую пиксель-в-пиксель поверх базовой чёрной `.stitch`. Оверлей несёт
   оранжевый border-image; радиальная маска под курсором показывает только
   кусок стежков рядом с указателем — они «краснеют» под ним при движении.
   `inset: -stitch-w` растягивает ::before до border-box элемента, чтобы контур
   совпал с базовым (тот же тайл + `round` = тот же шаг). */
.glow--stitch::before {
  inset: calc(-1 * var(--stitch-w, 12px));
  border: var(--stitch-w, 12px) solid transparent;
  border-image: url(/orange_stitch-border.webp) 260 round;
  background: none;
  -webkit-mask: radial-gradient(150px circle at var(--mx) var(--my), #000 0%, transparent 68%);
  mask: radial-gradient(150px circle at var(--mx) var(--my), #000 0%, transparent 68%);
  -webkit-mask-composite: source-over;
  mask-composite: add;
}
</style>
