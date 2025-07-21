# 使用 Node 建置 Angular App
FROM node:20-alpine as build

WORKDIR /app
COPY . .

# 安裝依賴
RUN npm install

# 修正這行：使用專案名來 build，而不是 production
# 假設你的 Angular 專案名為 frontend，請調整為正確的
RUN npm run build -- --configuration production --project frontend

# 用 Nginx 提供靜態檔案
FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html
EXPOSE 80