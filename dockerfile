FROM node:16.13.1-alpine3.15

WORKDIR /var/www/service

COPY . .

RUN npm install pm2 -g
RUN apk add yarn
RUN yarn install

EXPOSE 80

CMD yarn run start
