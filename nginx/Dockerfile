FROM nginx:1.15.0-alpine

WORKDIR /etc/nginx/conf.d

RUN rm ./default.conf
COPY nginx.conf .
