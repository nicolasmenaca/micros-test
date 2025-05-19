
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN mkdir -p dist/docs && cp src/docs/swagger.yaml dist/docs/

COPY . .

EXPOSE 3002

CMD ["npm", "run", "dev"]