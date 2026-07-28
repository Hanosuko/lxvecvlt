# lxvecvlt.com

Фан-лендинг альбома **«lxve cvlt»** артиста **huzzy b** (rage / digicore).
Одностраничный сайт: промо альбома, ссылки на стриминги и промо тура «Coven Tour 2026».

> ⚠️ **Не аффилирован с huzzy b.** Аудио альбома здесь не хостится —
> только ссылки на официальные стриминги. Обложка и баннеры тура
> подгружаются по внешним ссылкам в рантайме и не хранятся в репозитории.

## Стек

| Слой      | Технологии                                              |
|-----------|---------------------------------------------------------|
| Frontend  | Vue 3 (`<script setup>`), TypeScript, Vite, GSAP, VueUse |
| Деплой    | Docker (nginx, статика) в Dokploy                       |

## Архитектура

Полностью **статический** сайт — ни бэкенда, ни базы, ни серверного рендера.
На проде это один контейнер: nginx отдаёт собранную папку `dist/`. Всё
«динамическое» (обложка, фавикон) подтягивается в браузере клиента в рантайме.

### Карта репозитория

```
lxvecvlt/
├── docker-compose.yml         # один сервис `frontend` для Dokploy
├── scripts/
│   ├── build-stitch-atlas.py  # собирает атлас прошивки (9-slice border-image)
│   └── round-favicon.py       # генерит статичный fallback-фавикон
└── frontend/
    ├── Dockerfile             # multi-stage: node:22 (build) → nginx:alpine (serve)
    ├── nginx.conf             # SPA-fallback, gzip, immutable-кэш на /assets
    ├── index.html             # <head> с SEO/OG-мета + <noscript>-подложка
    ├── vite.config.ts
    └── src/
        ├── main.ts            # точка входа: шрифты (self-host) + style.css + mount
        ├── App.vue            # оркестратор: порядок секций + overlay-слои
        ├── style.css          # дизайн-система (CSS-переменные, reset, утилиты)
        ├── data/links.ts      # ЕДИНЫЙ источник данных: ссылки, иконки, id альбома
        ├── components/
        │   ├── sections/      # Hero, Streaming, Tour, Rating, Footer
        │   ├── AppCursor.vue     # кастомный курсор с инерцией (lerp в rAF)
        │   ├── AppScrollbar.vue  # кастомный скроллбар из прошивки
        │   ├── NoiseOverlay.vue  # тёплый animated-noise поверх страницы
        │   ├── StitchDivider.vue # разделитель-прошивка, «протягивается» в viewport
        │   └── GlowButton.vue    # общая кнопка/ссылка (variant: solid | stitch)
        ├── composables/
        │   ├── useAlbumCover.ts  # module-singleton: один fetch обложки на всех
        │   ├── useTilt.ts        # parallax-наклон Hero по useMouse
        │   ├── useReveal.ts      # reveal-по-скроллу (useIntersectionObserver)
        │   └── useMotion.ts      # гварды: reduced-motion / coarse-pointer
        └── lib/
            ├── favicon.ts        # рисует обложку в <canvas> → rounded favicon
            └── scroll.ts         # плавный scroll к секции по id
```

### Поток данных (обложка — один fetch на всё)

```
                       itunes.apple.com/lookup?id=…
                                   │  (client-side fetch, без ключей)
                                   ▼
        ┌──────────────────────────────────────────────┐
        │  useAlbumCover()  — module-level singleton     │
        │  coverUrl = ref(fallback)  →  upgrade to 1200² │
        └───────────────┬───────────────┬────────────────┘
                        │               │
              Hero <img> (parallax)     lib/favicon.ts → <canvas> → <link rel=icon>
```

- Обложка **никогда не коммитится**: старт с хардкоденного fallback-URL (виден
  мгновенно, без запроса), затем апгрейд до `1200x1200` из ответа iTunes. Один
  `ref` на модуль → Hero и фавикон делят один сетевой запрос.
- Сеть/рейт-лимит упали — тихо остаёмся на fallback, страница не ломается.

### Дизайн-система — «прошивка» (stitch)

Подпись обложки (грубый ручной шов) вынесена в переиспользуемый приём:

- **Рамки карточек** — настоящий 9-slice `border-image` (класс `.stitch`), а не
  `dashed`-бордер. Атлас `stitch-border.webp` собирается офлайн скриптом
  `scripts/build-stitch-atlas.py` из кусков `stitch-corner/straight.webp`.
- **Hover** на карточках стримингов/оценок — под курсором проявляется оранжевая
  прошивка (тот же атлас в оранжевом), едущая за указателем через радиальную маску.
- Все токены (палитра, флюидная типографика, `--stitch-w`, слои `z-*`) — в
  `:root` в [style.css](frontend/src/style.css). Палитра снята прямо с обложки.

### Принципы

- **Один источник правды** — все ссылки/иконки/id в [`data/links.ts`](frontend/src/data/links.ts); секции только рендерят.
- **Прогрессивная деградация** — без JS работает `<noscript>` (заголовок + ссылки на стриминги/тур); анимации выключаются при `prefers-reduced-motion`, pointer-эффекты — на тач-устройствах (`useMotion`).
- **Приватность** — YouTube только как facade (превью → плеер по клику, `youtube-nocookie`); никаких трекеров/аналитики.
- **Чистота репо** — чужой арт (обложка, баннеры тура, фавикон) только по URL в рантайме; в репозитории лежат лишь служебные ассеты дизайн-системы.

## Скрипты для ассетов (`scripts/`)

Офлайн-тулинг для **пересборки картинок дизайн-системы**. В сборку/деплой не
входят: их не вызывает ни `Dockerfile`, ни Vite — они лишь генерируют файлы в
`frontend/public/`, которые уже закоммичены. Нужны, только если правишь сами
ассеты прошивки или фавикон. Требуют Python 3 и Pillow (`pip install pillow`).

| Скрипт | Что делает | Вход → выход |
|--------|-----------|--------------|
| [`build-stitch-atlas.py`](scripts/build-stitch-atlas.py) | Собирает 9-slice атлас прошивки для CSS-класса `.stitch` (`border-image`) | `stitch-corner.webp` + `stitch-straight.webp` → `stitch-border.webp` |
| [`round-favicon.py`](scripts/round-favicon.py) | Скругляет углы статичного фавикона (браузер рисует иконку сам, CSS её не берёт) | `favicon.webp` → `favicon.webp` (in place) |

Запуск из корня репозитория:

```bash
pip install pillow

# атлас прошивки — чёрный (по умолчанию) и оранжевый hover-вариант
python3 scripts/build-stitch-atlas.py            # → public/stitch-border.webp
python3 scripts/build-stitch-atlas.py orange_    # → public/orange_stitch-border.webp

# скруглить фавикон (необязательный аргумент — радиус в %, по умолчанию 20)
python3 scripts/round-favicon.py 20
```

> Удалять `scripts/` не обязательно для работы сайта, но тогда потеряешь
> исходники для регенерации прошивки/фавикона (сменить цвет, толщину шва, радиус).

## Структура

```
frontend/   # Vue 3 SPA — весь лендинг (статический сайт)
docker-compose.yml
```

## Локальная разработка

Требуется Node 22+ и pnpm (`npm i -g pnpm`).

```bash
pnpm --dir frontend install
pnpm --dir frontend dev      # dev-сервер на :5173
```

Продакшн-сборка в контейнере (нужен Docker):

```bash
docker compose up --build
```

## Деплой (Dokploy)

Домен и SSL (Let's Encrypt через встроенный Traefik) настраиваются в самом
Dokploy — в коде они не захардкожены. `Dockerfile` лежит **в корне репозитория**
(контекст сборки = корень, исходники берутся из `frontend/`), поэтому работают
дефолтные поля Dokploy без возни с путями.

### Вариант A — Application + Dockerfile (рекомендуется)

Provider (GitHub): репозиторий `lxvecvlt`, ветка `main`, **Build Path = `/`**.

Build Type = **Dockerfile**:

| Поле | Значение |
|------|----------|
| Docker File | `Dockerfile` |
| Docker Context Path | `.` |
| Docker Build Stage | *(пусто — берётся финальный stage `serve`)* |

Домен приложения: **Container Port = `80`** (nginx слушает 80). Save → Deploy.

### Вариант B — Compose

Тип сервиса **Compose**, файл `docker-compose.yml` (в корне) — поднимает тот же
один сервис `frontend`. Домен вешается на сервис `frontend`, порт `80`.
