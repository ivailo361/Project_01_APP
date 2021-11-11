FROM node:16.13.0-alpine3.14 AS build
WORKDIR /app
COPY package* yarn.lock ./
RUN apk add git && yarn install
COPY public ./public
COPY src ./src
#CMD ["npm", "start"]
#RUN sh -c "tail -F anything"
RUN yarn run build
#RUN npm start
#CMD ["node", "src/index.js"]

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# FROM node:16.13.0-alpine3.14 AS build
# WORKDIR /app
# COPY package* yarn.lock ./
# RUN apk add git && yarn install
# COPY public ./public
# COPY src ./src
# RUN sh -c "tail -F anything"