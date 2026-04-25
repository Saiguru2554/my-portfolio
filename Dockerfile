# Stage 1: Build
FROM node:18-alpine AS build_image
WORKDIR /app
COPY package.json package-lock.json ./
# Using npm ci is generally faster and more reliable in Docker than npm install
RUN npm ci 
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine AS production_image
COPY --from=build_image /app/dist /usr/share/nginx/html
# COPY your new custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]