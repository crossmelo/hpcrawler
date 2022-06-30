const express = require('express');
const queryLen = require('./utils');
const config = require('./config');
const app = express();

queryLen(config.budaId);
setInterval(() => {
  queryLen(config.budaId);
}, 60000);

app.listen(6666, () => {
  console.log('开启服务，端口6666');
});
