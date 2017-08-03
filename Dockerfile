FROM node:7.7.4

RUN npm i -g bower gulp karma-cli node-sass pm2@latest protractor rimraf typescript typings webpack webpack-dev-server
RUN npm install -g pm2@latest
RUN npm install -g typescript

RUN mkdir /oadashboard-web
RUN mkdir /oadashboard-web/web-app
ADD . /oadashboard-web
WORKDIR /oadashboard-web

RUN npm run install

EXPOSE 3000

RUN  chmod -R 775 /oadashboard-web/startproject.sh

CMD /oadashboard-web/startproject.sh
