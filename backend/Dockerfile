FROM node:22.12.0-alpine

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY src /app/src

COPY .env /app

EXPOSE 5000

CMD ["npm", "run", "dev"]
