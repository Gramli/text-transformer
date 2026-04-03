# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Cloud Run defaults to port 8080, but can change. Nginx template will read this ENV.
ENV PORT=8080
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
