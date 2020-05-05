FROM node:10.17-alpine as build

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY packages/api ./packages/api

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /app/packages/api
RUN yarn build

FROM node:10.17-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

COPY --from=build /app/packages/api/package.json /app/packages/api/package.json
COPY --from=build /app/packages/api/dist /app/packages/api/dist

ENV NODE_ENV production

RUN yarn install --pure-lockfile --non-interactive --production

WORKDIR /app/packages/api

EXPOSE 4000

CMD ["yarn", "shop-serve"]
