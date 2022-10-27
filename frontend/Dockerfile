FROM node:16.18.0-alpine as build

RUN apk add openjdk11

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

RUN npm run openapi:generate

RUN npm run build

FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/local/app/dist/ /usr/share/nginx/html

EXPOSE 80