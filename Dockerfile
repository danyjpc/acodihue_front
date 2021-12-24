### STAGE 1: Build ###
FROM node:12.18-alpine3.9 AS compile-image
LABEL maintainer="People Apps"

ARG ENV

COPY package*.json ./

RUN npm i && mkdir /webapp && mv ./node_modules ./webapp

WORKDIR /webapp

ENV PATH="./node_modules/.bin:$PATH" 

#add entrycode
COPY . /webapp/ 

RUN if [ "$ENV" = "production" ] ; then ng build --prod  ; else ng build --prod -c dev ; fi

### STAGE 2: Setup ###

FROM nginx:1.17-alpine
## Copy our default nginx config
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

#copy app 
COPY --from=compile-image /webapp/dist/fuse /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]


