<script setup lang="ts">
import { watch } from 'vue'
import { useAlbumCover } from './composables/useAlbumCover'
import { setRoundedFavicon } from './lib/favicon'
import AppCursor from './components/AppCursor.vue'
import AppScrollbar from './components/AppScrollbar.vue'
import NoiseOverlay from './components/NoiseOverlay.vue'
import StitchDivider from './components/StitchDivider.vue'
import HeroSection from './components/sections/HeroSection.vue'
import StreamingSection from './components/sections/StreamingSection.vue'
import TourSection from './components/sections/TourSection.vue'
import RatingSection from './components/sections/RatingSection.vue'
import FooterSection from './components/sections/FooterSection.vue'

const { coverUrl } = useAlbumCover()
watch(coverUrl, (url) => setRoundedFavicon(url), { immediate: true })
</script>

<template>
  <AppCursor />
  <AppScrollbar />
  <NoiseOverlay />

  <HeroSection />
  <StitchDivider />
  <StreamingSection />
  <StitchDivider />
  <TourSection />
  <StitchDivider />
  <RatingSection />
  <StitchDivider />
  <FooterSection />
</template>
