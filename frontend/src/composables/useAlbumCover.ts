import { ref } from 'vue'
import { album } from '@/data/links'

const coverUrl = ref(album.fallbackCover)
let started = false

function load() {
  if (started) return
  started = true
  fetch(`https://itunes.apple.com/lookup?id=${album.itunesId}&country=ru`)
    .then((r) => r.json())
    .then((data) => {
      const art: unknown = data?.results?.[0]?.artworkUrl100
      if (typeof art === 'string' && art) {
        coverUrl.value = art.replace('100x100', '1200x1200')
      }
    })
    .catch(() => {
    })
}

export function useAlbumCover() {
  load()
  return { coverUrl }
}
