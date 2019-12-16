const express = require('express');
const proxy = require('express-http-proxy');
const cors = require('cors');

const app = express();

app.use((req, res, next) => {
  console.log(res.data);
  next();
});

// Cors handler
app.use(cors({
  credentials: true
}));

app.use('/path-to-proxy', proxy({
  preserveHostHrd: true,
  proxyReqPathResolver(req) {
    return `/path-${req.url}`;
  },
  proxyReqOtpDecorator(proxyReqOtp, srcReq) {
    return new Promise((resolve, reject) => {
      const auth = `Basic ${Buffer.from('username:password').toString('base64')}`;
      proxyReqOtp.headers['Authorization'] = auth; // Optionals if baisc auth is needed
      resolve(proxyReqOtp);
    })
  }
}));

app.listen(3000, () => console.log('App started at 3000...'));
