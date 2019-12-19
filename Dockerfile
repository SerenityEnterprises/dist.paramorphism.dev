FROM node:11

WORKDIR /app

ADD package.json /app/package.json
RUN npm install

ADD . /app

RUN npm run build

EXPOSE 80
ENV HOST=0.0.0.0
ENV PORT=80
CMD [ "node", "build/index.js" ]
