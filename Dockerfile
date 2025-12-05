# job-portal/Dockerfile  ← pnpm version
FROM node:20-alpine AS base

# Install dependencies + pnpm
FROM base AS deps
RUN apk add --no-cache libc6-compat
# Install pnpm
RUN npm i -g pnpm@9
WORKDIR /app

# Copy lockfile and package.json
COPY package.json pnpm-lock.yaml ./
# Install dependencies (frozen lockfile = same as pnpm install --frozen)
RUN pnpm install --frozen-lockfile

# Build the app
FROM base AS builder
RUN npm i -g pnpm@9
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_API_URL=http://backend:8080
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN pnpm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install pnpm in final image too (needed for some edge cases)
RUN npm i -g pnpm@9
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
