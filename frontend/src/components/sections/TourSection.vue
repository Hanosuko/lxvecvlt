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

      <div class="tour__actions">
        <GlowButton
          class="tour__cta"
          :href="tour.url"
          data-cursor="hover"
        >
          Купить билеты
        </GlowButton>

        <GlowButton
          class="tour__tg"
          :href="tour.telegram"
          data-cursor="hover"
        >
          Телеграм тура
        </GlowButton>
      </div>
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

/* Группа кнопок: билеты + телеграм стоят вплотную друг к другу (свой маленький
   зазор), отдельно от общего большого gap блока тура. */
.tour__actions {
  width: 100%;
  max-width: 40rem; /* == постер / кнопки */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

/* Вторичная кнопка «Telegram тура» под билетами: тёмная (чтобы красная CTA
   оставалась единственным красным акцентом), той же ширины и высоты, синеет на hover. */
.tour__tg {
  width: 100%;
  max-width: 40rem; /* == .tour__cta */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 1rem 2.5rem; /* == .tour__cta — одинаковая высота */
  font-family: var(--font-head);
  font-weight: 700;
  font-size: var(--step-0);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-align: center;
  background: var(--fg);
  color: var(--bg);
  --glow: var(--bg);
  transition: background-color 0.3s var(--ease-out);
}

.tour__tg:hover {
  background: #4768a2; /* синий Telegram-акцент вместо красного */
}
</style>
