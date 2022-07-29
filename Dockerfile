FROM node:14.16.0-alpine3.13

WORKDIR /app
COPY package*.json ./
RUN npm install -g
COPY . . 

EXPOSE 3001 

CMD ["npm", "run", "dev"]