# ==============================================================================
# Multi-stage Production Dockerfile for e7na Local (React + Vite SPA)
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Build the production bundle
# ------------------------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy application source code
COPY . .

# Optional Build Arguments to embed Vite environment variables into static client build
ARG VITE_APP_NAME="e7na Local"
ARG VITE_APP_ENV="production"
ARG VITE_ADMIN_USERNAME=""
ARG VITE_ADMIN_PASSWORD=""
ARG VITE_DEFAULT_LANGUAGE=""
ARG VITE_DEFAULT_CURRENCY=""
ARG VITE_API_BASE_URL=""

ENV VITE_APP_NAME=$VITE_APP_NAME \
    VITE_APP_ENV=$VITE_APP_ENV \
    VITE_ADMIN_USERNAME=$VITE_ADMIN_USERNAME \
    VITE_ADMIN_PASSWORD=$VITE_ADMIN_PASSWORD \
    VITE_DEFAULT_LANGUAGE=$VITE_DEFAULT_LANGUAGE \
    VITE_DEFAULT_CURRENCY=$VITE_DEFAULT_CURRENCY \
    VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build client distribution assets
RUN npm run build

# ------------------------------------------------------------------------------
# Stage 2: Minimal, high-performance static server with Nginx
# ------------------------------------------------------------------------------
FROM nginx:1.27-alpine AS production

# Install curl for reliable health checks
RUN apk --no-cache add curl

# Remove default Nginx welcome site
RUN rm -rf /etc/nginx/conf.d/* /usr/share/nginx/html/*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose standard HTTP port
EXPOSE 80

# Health check probe
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:80/healthz || exit 1

# Launch Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
