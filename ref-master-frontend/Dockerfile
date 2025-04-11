FROM node:21.5 AS development

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install -g node-pre-gyp
RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "start"]