FROM node:14.17-alpine3.11

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json ./

USER node

RUN npm install --only=production;

COPY --chown=node:node src ./src

CMD ["npm", "run", "prod"]
