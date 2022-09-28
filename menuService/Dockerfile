FROM node:lts-alpine
WORKDIR /usr/app 

COPY ./package*.json npm-shrinkwrap.json* ./ 

RUN npm install
COPY . .

EXPOSE 3003

RUN chown -R node /usr/app

CMD ["npm", "start"]