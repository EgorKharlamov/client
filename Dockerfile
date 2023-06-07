FROM node:18.16.0-alpine

ENV HOST='0.0.0.0'
ENV PORT='3000'

WORKDIR /front
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
RUN npm install -g pnpm@8.5.0
COPY . .
RUN pnpm i
EXPOSE 3000
CMD [ "pnpm", "run", "preview" ]
