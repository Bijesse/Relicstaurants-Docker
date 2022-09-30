FROM node:lts-alpine
WORKDIR /usr/app 

COPY ./package*.json npm-shrinkwrap.json* ./ 

RUN npm install
COPY . .

EXPOSE 3002

CMD ["npm", "start"]