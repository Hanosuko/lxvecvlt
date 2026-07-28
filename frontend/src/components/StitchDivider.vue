<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '@/composables/useReveal'

const lineEl = ref<HTMLElement | null>(null)
const revealed = useReveal(lineEl)
</script>

<template>
  <div class="divider" role="separator" aria-hidden="true">
    <span ref="lineEl" class="divider__line" :class="{ 'is-revealed': revealed }" />
  </div>
</template>

<style scoped>
.divider {
  padding-inline: var(--gutter);
}

.divider__line {
  display: block;
  width: 100%;
  max-width: var(--container);
  height: 18px;
  margin-inline: auto;
  background: url(/stitch-straight.webp) repeat-x left center / auto 100%;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.8s var(--ease-out);
}

.divider__line.is-revealed {
  transform: scaleX(1);
}
</style>
