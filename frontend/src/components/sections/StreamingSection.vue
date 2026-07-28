<script setup lang="ts">
import GlowButton from '@/components/GlowButton.vue'
import { streaming } from '@/data/links'
</script>

<template>
  <section id="streaming" class="section container" aria-label="Стриминги">
    <ul class="streaming__grid">
      <li v-for="s in streaming" :key="s.label">
        <GlowButton
          class="streaming__card stitch card-btn"
          :href="s.url"
          variant="stitch"
          data-cursor="hover"
        >
          <svg class="streaming__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path :d="s.icon" fill="currentColor" />
          </svg>
          <span class="streaming__label">{{ s.label }}</span>
          <span class="streaming__arrow" aria-hidden="true">↗</span>
        </GlowButton>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.streaming__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(0.75rem, 2vw, 1.25rem);
}

.streaming__card {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: clamp(1.1rem, 3vw, 1.6rem);
  text-align: left;
}

.streaming__icon {
  width: 1.75rem;
  height: 1.75rem;
  flex: none;
}

.streaming__label {
  font-family: var(--font-head);
  font-weight: 500;
  font-size: var(--step-0);
  letter-spacing: 0.01em;
}

.streaming__arrow {
  margin-left: auto;
  font-size: 1.1rem;
  opacity: 0.7;
}

@media (max-width: 560px) {
  .streaming__grid {
    grid-template-columns: 1fr;
  }
}
</style>
