FROM node:alpine
WORKDIR /app
#COPY package.json ./
#COPY package-lock.json ./
#COPY ./ ./
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules
#RUN npm i
#CMD ["npm", "run", "start"]