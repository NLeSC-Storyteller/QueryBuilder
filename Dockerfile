FROM node:latest

# cltl/StoryTeller
RUN mkdir -p /src/app
COPY . /src/app

WORKDIR /src/app
RUN npm install
RUN npm run build
RUN npm install -g pushstate-server

EXPOSE 9000
CMD ["pushstate-server", "build"]
