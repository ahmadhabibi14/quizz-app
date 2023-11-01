FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]

EXPOSE 3000