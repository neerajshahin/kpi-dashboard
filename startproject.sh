npm run rebuild

npm run build:$NODE_ENV

# pm2-docker --env $NODE_ENV process.json
npm run start:$NODE_ENV
