const express = require('express');
const queryLen = require('./utils');
const app = express();
const tiezi = 53990506;

queryLen(tiezi);
setInterval(() => {
  queryLen(tiezi);
}, 60000);

app.listen(6666, () => {
  console.log('开启服务，端口6666');
});
