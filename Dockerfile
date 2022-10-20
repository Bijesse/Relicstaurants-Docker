FROM node:lts-alpine

WORKDIR /usr/app 

COPY ./package*.json npm-shrinkwrap.json* ./ 

RUN npm install --production --silent && mv node_modules ../ 

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
