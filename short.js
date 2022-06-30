const express = require('express');
const queryLen = require('./utils');
const config = require('./config');
const app = express();

queryLen(config.shortId);
setInterval(() => {
  queryLen(config.shortId);
}, 60000);

app.listen(6667, () => {
  console.log('开启服务，端口6667');
});
