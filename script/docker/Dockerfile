FROM node:8

EXPOSE 23256
EXPOSE 23257

ENV NODE_ENV production
ENV DEBUG trpg:*

RUN mkdir -p /home/TRPG
WORKDIR /home/TRPG

COPY ./.tmp/ ./

RUN ls
COPY foreach.sh ./
RUN bash foreach.sh "npm install"
CMD cd ./DevTool && node script/server.js
