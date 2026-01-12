# Dockerfile (at root)

# ================================
# BACKEND STAGES
# ================================

FROM node:18-alpine AS backend-dependencies
WORKDIR /backend
COPY backend/package*.json ./
COPY backend/prisma ./prisma/
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS backend-build
WORKDIR /backend
COPY backend/package*.json ./
COPY backend/prisma ./prisma/
RUN npm ci
COPY backend/ ./
RUN npx prisma generate && npm run build

FROM node:18-alpine AS backend-development
RUN apk add --no-cache curl wget
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/prisma ./prisma/
RUN npx prisma generate
COPY backend/ ./
EXPOSE 5000 9229
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget --no-verbose --tries=1 --spider http://localhost:5000/personalities || exit 1
CMD ["npm", "run", "start:dev"]

FROM node:18-alpine AS backend-production
RUN apk add --no-cache dumb-init curl wget
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001
COPY --from=backend-build /backend/package*.json ./
COPY --from=backend-build /backend/prisma ./prisma/
COPY --from=backend-build /backend/dist ./dist
COPY --from=backend-dependencies /backend/node_modules ./node_modules
RUN npx prisma generate
RUN mkdir -p /app/logs && chown -R nestjs:nodejs /app
USER nestjs
EXPOSE 5000
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:5000/personalities || exit 1
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]

# ================================
# FRONTEND STAGES
# ================================

FROM node:18-alpine AS frontend-dependencies
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS frontend-build
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm run build

FROM node:18-alpine AS frontend-development
RUN apk add --no-cache curl
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:3000 || exit 1
CMD ["npm", "run", "dev"]

FROM node:18-alpine AS frontend-production
RUN apk add --no-cache dumb-init curl
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
COPY --from=frontend-build /frontend/package*.json ./
COPY --from=frontend-build /frontend/.next ./.next
COPY --from=frontend-build /frontend/public ./public
COPY --from=frontend-build /frontend/next.config.* ./
COPY --from=frontend-dependencies /frontend/node_modules ./node_modules
RUN chown -R nextjs:nodejs /app
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD curl -f https://frontend-1lpt-24rarchmm-hamdi-zeramdinis-projects.vercel.app/ || exit 1
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]