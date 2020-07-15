FROM node:14.5.0-alpine3.12

RUN npm i -g @nestjs/cli

RUN apk add --no-cache tini
 
RUN mkdir -p /usr/src/app/node_modules
 
RUN chown -R node:node /usr/src/app
 
USER node
 
WORKDIR /usr/src/app
 
COPY --chown=node:node package*.json ./

RUN npm ci --only=production
 
RUN npm cache clean --force 
 
COPY --chown=node:node . ./
 
RUN ls -l
 
EXPOSE 3000

ENTRYPOINT ["/sbin/tini", "--"]
 
CMD [ "npm", "run", "start" ]