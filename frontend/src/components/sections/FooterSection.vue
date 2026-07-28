<script setup lang="ts">
import { computed } from 'vue'
import { socials, author } from '@/data/links'

const year = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="footer section">
    <div class="container footer__inner">
      <div class="footer__text">
        <p class="footer__slogan">LOVE U PAiNHUB</p>

        <p class="footer__note">
          сайт не аффилирован с huzzy b
        </p>

        <p class="footer__credit">
          create by
          <a
            class="footer__author"
            :href="author.github"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path :d="author.githubIcon" fill="currentColor" />
            </svg>
            <span class="footer__author-name">{{ author.name }}</span>
          </a>
        </p>
      </div>

      <nav class="footer__socials" aria-label="Соцсети huzzy b">
        <a
          v-for="s in socials"
          :key="s.label"
          class="footer__social"
          :href="s.url"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="s.label"
          data-cursor="hover"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path :d="s.icon" fill="currentColor" />
          </svg>
        </a>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-block: clamp(3rem, 8vw, 6rem);
}

.footer__inner {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: clamp(1.5rem, 4vw, 2.5rem);
}

.footer__text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer__slogan {
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: var(--muted);
  opacity: 0.75;
}

.footer__note {
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: var(--muted);
  opacity: 0.75;
}

.footer__credit {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: var(--muted);
}

.footer__author {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--fg);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer__author svg {
  width: 0.95rem;
  height: 0.95rem;
}

.footer__author-name {
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.footer__author:hover {
  color: var(--accent);
}

.footer__author:hover .footer__author-name {
  border-color: var(--accent);
}

.footer__socials {
  display: flex;
  gap: clamp(0.5rem, 2vw, 0.75rem);
}

.footer__social {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  color: var(--fg);
  border: 1px solid color-mix(in srgb, var(--fg) 22%, transparent);
  transition:
    color 0.25s ease,
    background-color 0.25s ease,
    border-color 0.25s ease;
}

.footer__social svg {
  width: 1.3rem;
  height: 1.3rem;
}

.footer__social:hover {
  color: var(--bg);
  background-color: var(--fg);
  border-color: var(--fg);
}

@media (max-width: 560px) {
  .footer__inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer__socials {
    align-self: flex-start;
  }
}
</style>
