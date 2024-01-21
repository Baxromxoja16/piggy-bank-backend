FROM node:17-alpine3.14

WORKDIR /code

ENV PORT=3000

COPY package.json /code/package.json

RUN npm install

COPY . /code

CMD ["npm", "start"]