FROM node:13.8.0
WORKDIR /bloxz
COPY package* ./
RUN npm install
COPY . ./
ENTRYPOINT [ "npm","start" ]