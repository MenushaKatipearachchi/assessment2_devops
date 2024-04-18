FROM node:alpine AS cleaner

RUN apk add --no-cache libc6-compat
RUN apk update

ARG service

WORKDIR /app

RUN npm config set fetch-retry-maxtimeout 1000000

RUN npm install -g turbo pnpm

COPY . .

RUN turbo prune --scope=$service --docker
 
FROM node:alpine AS builder

RUN apk add --no-cache libc6-compat
RUN apk update

ARG service

WORKDIR /app

RUN npm install -g pnpm@9.0.2 turbo

COPY --from=cleaner /app/ .

RUN pnpm i --shamefully-hoist
RUN pnpm turbo run build --filter=$service

EXPOSE 4002

ENV directory=$service

CMD ["sh", "-c",  "node services/$directory/dist/server.js --enable-source-maps"]
