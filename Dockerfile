FROM node:10.15

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY *.js ./

#EXPOSE 8080
#CMD ["/bin/sh"]
CMD ["npm", "start"]
