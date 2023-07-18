FROM node:16-alpine

WORKDIR /authserver

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4001

CMD ["npm", "start"]