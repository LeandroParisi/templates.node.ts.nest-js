FROM node:alpine As openfinance

RUN apk update && apk upgrade
RUN apk add python3 g++ make

RUN apk add msmtp
RUN ln -sf /usr/bin/msmtp /usr/sbin/sendmail

RUN mkdir -p /usr/src/app/node_modules
RUN chown -R node:node /usr/src/app

WORKDIR /usr/src/app

USER node

COPY --chown=node:node package*.json ./
RUN yarn

COPY --chown=node:node . .

EXPOSE 3500