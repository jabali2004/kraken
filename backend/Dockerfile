FROM node:16.18.0-buster

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npx prisma generate
RUN npm run build

CMD [ "node", "./dist/main.js"]