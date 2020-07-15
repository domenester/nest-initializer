FROM node:12.16.1-alpine3.11 as development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

CMD ["npm", "run", "start"]
