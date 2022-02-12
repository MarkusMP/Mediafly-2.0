FROM node as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node

WORKDIR /app
WORKDIR /app
COPY package*.json ./
RUN npm install --production

COPY --from=builder /app/dist ./dist

COPY ormconfig.docker.json ./ormconfig.json
COPY .env .

EXPOSE 5000
CMD node dist/index.js
