const express = require('express');
const queryLen = require('./utils');
const config = require('./config');
const app = express();

queryLen(config.zhaiId);
setInterval(() => {
  queryLen(config.zhaiId);
}, 60000);

app.listen(6670, () => {
  console.log('开启服务，端口6670');
});
