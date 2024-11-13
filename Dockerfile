FROM node:20

WORKDIR /app

COPY  package*.json /app/

RUN npm install

COPY . /app/

ENV PORT=8000

EXPOSE 8000

EXPOSE 3306

CMD [ "node", "server.js" ]