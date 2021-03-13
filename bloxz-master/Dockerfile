FROM node:latest
WORKDIR /app
COPY package* ./
RUN npm install
COPY . ./
ENTRYPOINT [ "npm","start" ]
