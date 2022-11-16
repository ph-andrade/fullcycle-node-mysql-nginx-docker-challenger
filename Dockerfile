FROM node:current-alpine

WORKDIR /usr/src/app

COPY ./src .

EXPOSE 3000

ENTRYPOINT [ "node", "index.js" ]
