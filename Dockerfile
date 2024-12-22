FROM node:22.12.0-alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY backend ./backend

COPY .env .

CMD ["npm", "run", "dev"]
