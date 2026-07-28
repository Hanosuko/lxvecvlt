# Корневой Dockerfile: контекст сборки = корень репозитория, исходники берутся
# из frontend/. Так деплой в Dokploy работает на дефолтных полях
# (Docker File = Dockerfile, Context Path = .), без возни с путями.

# --- build stage -------------------------------------------------------------
# Node 22 LTS: pnpm 11 и Vite 8 требуют Node >= 22.
FROM node:22-alpine AS build
WORKDIR /app
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable

COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY frontend/ ./
RUN pnpm build

# --- serve stage -------------------------------------------------------------
FROM nginx:alpine AS serve
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
