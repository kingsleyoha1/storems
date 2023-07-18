FROM node:16-alpine

WORKDIR /productserver

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4002

CMD ["npm", "start"]
