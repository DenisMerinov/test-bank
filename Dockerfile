# Build stage
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/test-bank/package.json apps/test-bank/package.json
RUN npm ci --legacy-peer-deps

COPY . .
ENV NX_DAEMON=false NX_NO_CLOUD=true
RUN npx nx build test-bank --skip-nx-cache

# Runtime stage
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/test-bank/dist /usr/share/nginx/html
EXPOSE 80
