
FROM node:8.0.0-alpine as build-env

WORKDIR /swift-snail

COPY package.json .
RUN npm install --registry https://registry.npm.taobao.org

COPY . .
RUN npm run build_stg


FROM nginx:alpine

COPY --from=build-env /swift-snail/build /usr/share/nginx/html/

COPY conf /etc/nginx

EXPOSE 80
