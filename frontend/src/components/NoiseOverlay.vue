<script setup lang="ts">

</script>

<template>
  <div class="noise" aria-hidden="true" />
</template>

<style scoped>
.noise {
  position: fixed;
  inset: -25%;
  z-index: var(--z-noise);
  pointer-events: none;
  opacity: 0.055;
  mix-blend-mode: multiply;
  background-repeat: repeat;
  background-size: 140px 140px;
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='140'%20height='140'%3E%3Cfilter%20id='n'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.85'%20numOctaves='2'%20stitchTiles='stitch'/%3E%3CfeColorMatrix%20type='saturate'%20values='0'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23n)'/%3E%3C/svg%3E");
  animation: noise-shift 0.6s steps(6) infinite;
  will-change: transform;
}

@keyframes noise-shift {
  0% {
    transform: translate(0, 0);
  }
  20% {
    transform: translate(-5px, 3px);
  }
  40% {
    transform: translate(4px, -6px);
  }
  60% {
    transform: translate(-6px, -3px);
  }
  80% {
    transform: translate(5px, 5px);
  }
  100% {
    transform: translate(-3px, 4px);
  }
}
</style>
