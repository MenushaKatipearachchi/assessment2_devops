FROM node:alpine AS cleaner

RUN apk add --no-cache libc6-compat
RUN apk update

ARG service

WORKDIR /app

RUN yarn global add turbo pnpm

COPY . .

RUN turbo prune --scope=$service --docker
 
FROM node:alpine AS builder

RUN apk add --no-cache libc6-compat
RUN apk update

ARG service


WORKDIR /app

RUN yarn global add pnpm turbo

COPY .gitignore .gitignore
COPY --from=cleaner /app/out/json/ .
COPY --from=cleaner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=cleaner /app/workspace-scripts ./workspace-scripts
COPY --from=cleaner /app/out/full/ .

RUN pnpm i --shamefully-hoist

COPY --from=cleaner /app/out/full/ ./packages
 

RUN  pnpm turbo run build --filter=$service


EXPOSE 4002

# RUN export dir=$service

ENV directory=$service

RUN echo $service
CMD ["sh", "-c",  "node services/$directory/dist/server.js --enable-source-maps"]
