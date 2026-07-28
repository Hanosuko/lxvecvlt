<script setup lang="ts">
import GlowButton from '@/components/GlowButton.vue'
import { tour } from '@/data/links'
</script>

<template>
  <section class="section container" aria-label="Тур">
    <div class="tour">
      <img
        class="tour__banner"
        :src="tour.banner"
        alt="Coven Tour 2026"
        loading="lazy"
        decoding="async"
      />

      <img
        class="tour__poster"
        :src="tour.poster"
        alt="Афиша Coven Tour 2026 — города и даты"
        loading="lazy"
        decoding="async"
      />

      <GlowButton
        class="tour__cta"
        :href="tour.url"
        data-cursor="hover"
      >
        Билеты на тур
      </GlowButton>
    </div>
  </section>
</template>

<style scoped>
.tour {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1.5rem, 4vw, 2.5rem);
}

.tour__banner {
  width: 100%;
  max-width: 40rem; /* == .tour__poster / .tour__cta — одинаковая ширина */
  height: auto;
}

.tour__poster {
  width: 100%;
  max-width: 40rem;
  height: auto;
  /* цвет-заглушка, пока грузится картинка. */
  background: var(--surface);
}

/* Единственная намеренно красная кнопка на странице (CTA «билеты на тур»).
   Растянута под ширину постера. */
.tour__cta {
  width: 100%;
  max-width: 40rem; /* == .tour__poster */
  padding: 1rem 2.5rem;
  font-family: var(--font-head);
  font-weight: 700;
  font-size: var(--step-0);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-align: center;
  background: var(--accent);
  color: var(--bg);
  /* на hover рамка светится кремовым по красному */
  --glow: var(--bg);
  transition: background-color 0.3s var(--ease-out);
}

.tour__cta:hover {
  background: #97302a; /* чуть более тёмный красный */
}
</style>
