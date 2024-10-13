FROM node:16.15.0-alpine3.15

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build && npm install -g serve

CMD ["yarn", "preview"]
