
FROM node:8.0.0-alpine as build-env

WORKDIR /swift-snail

COPY package.json .
RUN npm install --registry https://registry.npm.taobao.org

COPY . .
RUN npm run build


FROM nginx:alpine

COPY --from=build-env /build /usr/share/nginx/html/

COPY conf /etc/nginx

EXPOSE 80
