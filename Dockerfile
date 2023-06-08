FROM node:18.16.0-alpine

ENV HOST='0.0.0.0'
ENV PORT='4060'

WORKDIR /front
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
RUN npm install -g pnpm@8.5.0
COPY . .
RUN pnpm i
EXPOSE 4060
CMD [ "pnpm", "run", "preview" ]
