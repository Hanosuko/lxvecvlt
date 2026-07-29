export interface ServiceLink {
  label: string
  url: string
  icon: string
}

const ICONS = {
  yandex:
    'M12 3v10.5A4.5 4.5 0 1 0 14 17V7.6l6-1.2V3zM10.5 15a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z',
  vk: 'M13.16 17.32c-5.09 0-8.2-3.49-8.33-9.3h2.56c.09 4.26 2 6.05 3.47 6.42V8.02h2.42v3.68c1.47-.16 3-1.85 3.53-3.68h2.4a7.06 7.06 0 0 1-3.2 4.62 7.32 7.32 0 0 1 3.75 4.68h-2.66c-.5-1.55-1.9-2.75-3.42-2.94v2.94z',
  spotify:
    'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.32-1.32 9.72-.66 13.44 1.62.36.18.54.78.3 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z',
  apple:
    'M17.05 12.54c-.03-2.76 2.25-4.08 2.35-4.15-1.28-1.87-3.28-2.13-3.99-2.16-1.7-.17-3.31 1-4.17 1-.86 0-2.19-.98-3.6-.95-1.85.03-3.56 1.08-4.51 2.73-1.92 3.34-.49 8.28 1.38 11 .91 1.33 2 2.82 3.42 2.77 1.37-.06 1.89-.89 3.55-.89 1.65 0 2.12.89 3.56.86 1.47-.02 2.4-1.35 3.3-2.69 1.04-1.54 1.47-3.03 1.5-3.11-.03-.01-2.87-1.1-2.9-4.37zM14.3 4.4c.76-.92 1.27-2.2 1.13-3.47-1.09.04-2.42.73-3.2 1.64-.7.81-1.31 2.11-1.15 3.35 1.22.1 2.46-.62 3.22-1.52z',
} as const

export const streaming: ServiceLink[] = [
  {
    label: 'Яндекс Музыка',
    url: 'https://music.yandex.ru/album/43057118?utm_source=bandlink&utm_medium=Huzzy%20Buzzy&utm_campaign=lxve%20cvlt%20&utm_term=ikbY6',
    icon: ICONS.yandex,
  },
  { label: 'VK Музыка', url: 'https://music.vk.com/link/Y8Ol5', icon: ICONS.vk },
  {
    label: 'Spotify',
    url: 'https://open.spotify.com/album/7chjypbF6f7Uc2iB0peoPn',
    icon: ICONS.spotify,
  },
  {
    label: 'Apple Music',
    url: 'https://music.apple.com/ru/album/6793850009?app=music&mt=1&at=1000lqjf&ct=bq&ls=1',
    icon: ICONS.apple,
  },
]

export const artistTelegram = 'https://t.me/thehuzzyb'

const SOCIAL_ICONS = {
  vk: 'M13.16 17.32c-5.09 0-8.2-3.49-8.33-9.3h2.56c.09 4.26 2 6.05 3.47 6.42V8.02h2.42v3.68c1.47-.16 3-1.85 3.53-3.68h2.4a7.06 7.06 0 0 1-3.2 4.62 7.32 7.32 0 0 1 3.75 4.68h-2.66c-.5-1.55-1.9-2.75-3.42-2.94v2.94z',
  youtube:
    'M23.5 6.5a3 3 0 0 0-2.1-2.13C19.5 3.86 12 3.86 12 3.86s-7.5 0-9.4.51A3 3 0 0 0 .5 6.5C0 8.42 0 12 0 12s0 3.58.5 5.5a3 3 0 0 0 2.1 2.13c1.9.51 9.4.51 9.4.51s7.5 0 9.4-.51a3 3 0 0 0 2.1-2.13C24 15.58 24 12 24 12s0-3.58-.5-5.5zM9.6 15.6V8.4l6.24 3.6z',
  telegram:
    'M23.9 3.3 20.3 20.4c-.27 1.2-.98 1.5-2 .93l-5.5-4.06-2.65 2.56c-.3.3-.54.54-1.1.54l.4-5.6L19.6 5.6c.44-.4-.1-.62-.68-.22L6.32 13.3l-5.44-1.7c-1.18-.37-1.2-1.18.25-1.75L22.38 1.6c.98-.37 1.84.22 1.52 1.7z',
  github:
    'M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z',
} as const

export interface SocialLink {
  label: string
  url: string
  icon: string
}

export const socials: SocialLink[] = [
  { label: 'VK', url: 'https://vk.ru/huzzybieber', icon: SOCIAL_ICONS.vk },
  {
    label: 'YouTube',
    url: 'https://www.youtube.com/channel/UCNEFXa5HceDsObh6scyE4oA',
    icon: SOCIAL_ICONS.youtube,
  },
  { label: 'Telegram', url: 'https://t.me/thehuzzyb', icon: SOCIAL_ICONS.telegram },
]

export const author = {
  name: 'Hanosuko',
  github: 'https://github.com/Hanosuko',
  githubIcon: SOCIAL_ICONS.github,
}

export const tour = {
  url: 'https://coven-tour.ru/',
  telegram: 'https://t.me/huzzybcoven',
  banner:
    'https://optim.tildacdn.com/tild3930-3861-4934-a262-633065386235/-/format/webp/photo.png.webp',
  poster:
    'https://optim.tildacdn.com/tild6233-6639-4532-a362-396139383939/-/format/webp/photo.png.webp',
}

export const rating = {
  reviewer: 'рисазатворчество',
  youtubeId: 'EgbwuMTNwKA',
  site: 'https://risazatvorchestvo.com/album/lxve-cvlt',
}

export const site = {
  url: 'https://lxvecvlt.com',
}

export const album = {
  itunesId: '6793850009',
  releaseDate: '24.07.2026',
  title: 'lxve cvlt',
  artist: 'huzzy b',
  fallbackCover:
    'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/cc/da/17/ccda17ee-cd9e-1e35-8abd-9933dc009db2/cover.jpg/632x632bb.webp',
}
