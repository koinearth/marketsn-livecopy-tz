FROM keymetrics/pm2:10-alpine
RUN apk add --no-cache git
ENV NODE_ENV production
WORKDIR /server

# pm2 and log4js logs setup
RUN pm2 install pm2-intercom

# Copy package.json, package-lock.json from `server`
ADD package*.json ./

# Copy code, .env from `server`
COPY src src/
COPY .env .

# Install dependencies
RUN npm install --production

# Copy pm2 config
COPY ecosystem.config.js .
EXPOSE 5000

ENTRYPOINT pm2-runtime start ecosystem.config.js
# ENTRYPOINT npm start
