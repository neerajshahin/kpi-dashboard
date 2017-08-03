cd web-app

npm rebuild node-sass

cd ..

npm run build:$NODE_ENV
npm run watch:$NODE_ENV

pm2-docker --env $NODE_ENV process.json
