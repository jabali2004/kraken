FROM node:16.18.0-buster

WORKDIR /usr/src/app

COPY . .

RUN cp .env.docker .env

RUN npm install
RUN npx prisma generate
RUN npm run build

RUN cp .env.docker ./dist/.env

CMD [ "node", "./dist/main.js"]