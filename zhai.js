const express = require('express');
const queryLen = require('./utils');
const app = express();
const tiezi = 44235537;

queryLen(tiezi);
setInterval(() => {
  queryLen(tiezi);
}, 60000);

app.listen(6668, () => {
  console.log('开启服务，端口6668');
});
