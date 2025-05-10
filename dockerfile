FROM node:23-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm
WORKDIR /app

FROM base AS build

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY client/package.json ./client/package.json
COPY server/package.json ./server/package.json

RUN pnpm install

COPY . .

WORKDIR /app/client
RUN pnpm run build

WORKDIR /app/server
RUN pnpm run build


FROM base AS prod

COPY --from=build /app/client/dist ./client/dist
COPY --from=build /app/server/dist ./server/dist
COPY --from=build /app/server/package.json ./server/package.json
COPY --from=build /app/pnpm-workspace.yaml ./server/pnpm-workspace.yaml

WORKDIR /app/server
RUN pnpm install --production

EXPOSE 5000

CMD ["pnpm", "run", "start"]
