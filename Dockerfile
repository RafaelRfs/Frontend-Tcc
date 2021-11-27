FROM node:14-alpine AS build
WORKDIR /app
COPY . /app

RUN npm ci --user root
RUN npm run build --silent

FROM build as publish
EXPOSE 3000
WORKDIR /webapp
COPY --from=build /app .
RUN npm install react-scripts@3.3.1 -g --silent
CMD [ "npm", "start" ]