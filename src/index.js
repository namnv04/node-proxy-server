const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();

app.use((req, res, next) => {
  console.log(res.data);
  next();
});

app.use('/', proxy({ target: 'http://postman-echo.com', changeOrigin: true }));

app.listen(3000, () => console.log('App started at 3000...'));
