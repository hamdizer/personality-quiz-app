# ================================
# Stage 1: Dependencies
# ================================
FROM node:18-alpine AS dependencies

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# ================================
# Stage 2: Build
# ================================
FROM node:18-alpine AS build

WORKDIR /app

# Install all dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build arguments from environment
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Disable TypeScript type checking
ENV NEXT_PRIVATE_SKIP_TYPE_CHECKS=true

# Build Next.js
RUN npm run build

# ================================
# Stage 3: Development
# ================================
FROM node:18-alpine AS development

RUN apk add --no-cache curl bash

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:3000 || exit 1

CMD ["npm", "run", "dev"]

# ================================
# Stage 4: Production
# ================================
FROM node:18-alpine AS production

RUN apk add --no-cache dumb-init curl bash

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copy production node_modules
COPY --from=dependencies /app/node_modules ./node_modules

# Copy built app
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.* ./

RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:3000 || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
