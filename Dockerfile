FROM node:20

ENV PORT=8080

WORKDIR /home/node/app

COPY package.json ./
COPY yarn.lock ./
COPY . .


RUN yarn

EXPOSE 3000

CMD [ "yarn", "dev" ]