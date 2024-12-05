FROM node:alpine
WORKDIR /usr/scr/app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
RUN npm i -g sequelize-cli
COPY ./config ./config
COPY ./controllers ./controllers
COPY ./helpers ./helpers
COPY ./middleware ./middleware
COPY ./migrations ./migrations
COPY ./models ./models
COPY ./routes ./routes
COPY ./seeders ./seeders
COPY ./uploads ./uploads
COPY ./.env ./
COPY ./App.js ./App.js
COPY ./server.js ./server.js
COPY ./nodemon.json ./nodemon.json
CMD ["npm", "start"]