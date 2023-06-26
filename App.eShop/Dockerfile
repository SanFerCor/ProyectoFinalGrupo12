FROM node:16.16-alpine3.15

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy all files to the work dir
COPY . .

EXPOSE 4200 49153

CMD ["npm", "start"]
