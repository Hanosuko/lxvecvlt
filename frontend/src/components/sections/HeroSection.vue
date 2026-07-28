<script setup lang="ts">
import { ref } from 'vue'
import { album, artistTelegram, site } from '@/data/links'
import { useAlbumCover } from '@/composables/useAlbumCover'
import { useTilt } from '@/composables/useTilt'
import { scrollToId } from '@/lib/scroll'

const { coverUrl } = useAlbumCover()

const coverEl = ref<HTMLElement | null>(null)
useTilt(coverEl)

const copied = ref(false)

async function copyLink() {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(site.url)
    } else {
      const ta = document.createElement('textarea')
      ta.value = site.url
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
  }
}

function openTelegram() {
  window.open(artistTelegram, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <header class="hero section">
    <div class="hero__inner container">
      <div class="hero__cover">
        <img
          ref="coverEl"
          class="hero__cover-img stitch"
          :src="coverUrl"
          width="1200"
          height="1200"
          alt="Обложка альбома lxve cvlt — huzzy b"
          fetchpriority="high"
        />
      </div>

      <div class="hero__copy">
        <h1 class="hero__title">lxve cvlt</h1>

        <button class="hero__artist" data-cursor="hover" @click="openTelegram">
          huzzy b
        </button>

        <p class="hero__date">{{ album.releaseDate }}</p>

        <div class="hero__actions">
          <button
            type="button"
            class="hero__action hero__listen action-btn"
            data-cursor="hover"
            @click="scrollToId('streaming')"
          >
            Слушать
          </button>

          <button
            type="button"
            class="hero__action hero__share action-btn"
            data-cursor="hover"
            aria-label="Скопировать ссылку на страницу"
            @click="copyLink"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"
                fill="currentColor"
              />
            </svg>
          </button>

          <span class="hero__copied" :class="{ 'is-shown': copied }" aria-live="polite">
            ссылка скопирована
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100svh;
  padding-block: clamp(3rem, 8vh, 6rem);
}

.hero__inner {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  align-items: center;
  gap: clamp(2rem, 6vw, 5rem);
  flex: 1;
}

.hero__cover {
  perspective: 900px;
}

.hero__cover-img {
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  background: var(--surface);
  will-change: transform;
}

.hero__copy {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  align-items: flex-start;
}

.hero__title {
  font-size: clamp(2.4rem, 13vw, 7rem);
  font-weight: 900;
  text-transform: lowercase;
  white-space: nowrap;
  line-height: 1;
}

.hero__artist {
  font-family: var(--font-head);
  font-weight: 700;
  font-size: var(--step-1);
  color: var(--fg);
  position: relative;
  padding: 0;
}

/* Подчёркивание-подсказка, что ник кликабелен (ведёт в Telegram артиста). */
.hero__artist::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 100%;
  height: 10px;
  background: url(/stitch-straight.webp) repeat-x left center / auto 100%;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s var(--ease-out);
}

.hero__artist:hover::after,
.hero__artist:focus-visible::after {
  transform: scaleX(1);
}

.hero__date {
  color: var(--muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: var(--step--1);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.9rem;
  margin-top: 0.9rem;
}

/* «Слушать» и «Поделиться» одной высоты; «Поделиться» — квадрат 1:1. */
.hero__action {
  height: 3.5rem;
}

.hero__listen {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding-inline: 2.4rem;
  font-family: var(--font-head);
  font-weight: 700;
  font-size: var(--step-0);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.hero__share {
  display: inline-grid;
  place-items: center;
  width: 3.5rem; /* == высоте → квадрат */
}

.hero__share svg {
  width: 1.35rem;
  height: 1.35rem;
}

.hero__copied {
  font-size: var(--step--1);
  color: var(--muted);
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.25s var(--ease-out), transform 0.25s var(--ease-out);
  pointer-events: none;
}

.hero__copied.is-shown {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 720px) {
  .hero__inner {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }

  .hero__cover {
    max-width: 20rem;
    margin-inline: auto;
  }

  .hero__copy {
    align-items: center;
  }

  .hero__actions {
    justify-content: center;
    width: 100%;
  }

  /* Крупнее зоны нажатия на телефонах; «Слушать» тянется, «Поделиться» — квадрат. */
  .hero__action {
    height: 3.9rem;
  }

  .hero__listen {
    flex: 1;
  }

  .hero__share {
    width: 3.9rem;
  }

  .hero__copied {
    flex-basis: 100%;
    text-align: center;
  }
}
</style>
