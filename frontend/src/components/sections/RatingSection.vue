<script setup lang="ts">
import { ref } from 'vue'
import { rating } from '@/data/links'
import GlowButton from '@/components/GlowButton.vue'

const playing = ref(false)
const thumb = `https://i.ytimg.com/vi/${rating.youtubeId}/hqdefault.jpg`
const embed = `https://www.youtube-nocookie.com/embed/${rating.youtubeId}?autoplay=1`
</script>

<template>
  <section id="rating" class="section container" aria-label="Оценка альбома от рисазатворчество">
    <div class="rating">
      <img
        class="rating__photo"
        src="/rzt.svg"
        alt="рисазатворчество"
        width="850"
        height="227"
        loading="lazy"
        decoding="async"
      />

      <div class="rating__video">
        <button
          v-if="!playing"
          class="rating__facade"
          data-cursor="hover"
          :aria-label="`Смотреть обзор от ${rating.reviewer}`"
          @click="playing = true"
        >
          <img class="rating__thumb" :src="thumb" alt="" loading="lazy" decoding="async" />
          <span class="rating__play" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
          </span>
        </button>

        <iframe
          v-else
          class="rating__iframe"
          :src="embed"
          title="Обзор альбома lxve cvlt"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
        />
      </div>

      <GlowButton
        class="rating__cta stitch card-btn"
        :href="rating.site"
        variant="stitch"
        data-cursor="hover"
      >
        Все оценки на сайте ↗
      </GlowButton>
    </div>
  </section>
</template>

<style scoped>
.rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1.5rem, 4vw, 2.5rem);
}

.rating__photo {
  width: 100%;
  max-width: 20rem;
  height: auto;
}

.rating__video {
  position: relative;
  width: 100%;
  max-width: 44rem;
  aspect-ratio: 16 / 9;
  background: var(--surface);
  overflow: hidden;
}

.rating__facade {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  position: relative;
}

.rating__thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s var(--ease-out), filter 0.4s var(--ease-out);
  filter: grayscale(0.2);
}

.rating__facade:hover .rating__thumb {
  transform: scale(1.03);
  filter: grayscale(0);
}

.rating__play {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 4.5rem;
  height: 4.5rem;
  display: grid;
  place-items: center;
  background: var(--accent);
  color: var(--bg);
}

.rating__play svg {
  width: 2rem;
  height: 2rem;
  margin-left: 0.2rem;
}

.rating__iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}

.rating__cta {
  width: 100%;
  max-width: 44rem; /* == .rating__video */
  padding: 0.9rem 2rem;
  --stitch-w: 10px;
  /* цветом управляет .card-btn (fg в покое, bg на hover), чтобы подпись
     оставалась читаемой, когда фон инвертируется в чёрный */
  font-family: var(--font-head);
  font-weight: 700;
  font-size: var(--step--1);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-align: center;
  --glow: var(--accent);
}
</style>
