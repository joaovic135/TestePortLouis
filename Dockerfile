FROM node:20.12.0-alpine

WORKDIR /usr/app

RUN npm install nodemon -g 

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

