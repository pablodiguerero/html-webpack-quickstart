FROM node:15-slim as builder
COPY app/package.json app/package-lock.json ./

RUN npm ci && mkdir /app && mv ./node_modules ./app

WORKDIR /app
COPY /app .
RUN npm run build

FROM nginx:1.14.1-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
