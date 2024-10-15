FROM node:21

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/frontend/my-app
RUN npm i
RUN npm run build

WORKDIR /usr/src/app/backend
RUN npm i


EXPOSE 3001

CMD ["node", "app.js"]
