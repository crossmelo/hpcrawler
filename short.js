const express = require('express');
const queryLen = require('./utils');
const app = express();
const tiezi = 53992469;

queryLen(tiezi);
setInterval(() => {
  queryLen(tiezi);
}, 60000);

app.listen(6667, () => {
  console.log('开启服务，端口6667');
});
