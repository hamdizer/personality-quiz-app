# ================================
# Stage 1: Dependencies
# ================================
FROM node:18-bullseye AS dependencies

WORKDIR /app

# Copy package files and install production deps
COPY package*.json ./
RUN npm ci --only=production

# ================================
# Stage 2: Build
# ================================
FROM node:18-bullseye AS build

WORKDIR /app

# Install all dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Set DATABASE_URL for Prisma generate
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# ================================
# Stage 3: Production
# ================================
FROM node:18-bullseye AS production

WORKDIR /app

# Create non-root user
RUN addgroup --gid 1001 nodejs && \
    adduser --uid 1001 --ingroup nodejs nestjs

# Copy compiled app and necessary files
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

# Fix permissions
RUN chown -R nestjs:nodejs /app
USER nestjs

EXPOSE 5000

# ✅ Run migrations → seed → start server
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node dist/src/main.js"]
