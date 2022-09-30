FROM node:lts-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --only=production

RUN npm start

USER node

CMD [ "npm", "start" ]

EXPOSE 3000