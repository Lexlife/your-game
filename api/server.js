const ws = require('ws');
const app = require('./app.js');

const port = process.env.PORT || 3100;
const httpServer = app.listen(port, () => {
  console.log('Server started at http//localhost:%s', port);
});

const wsServer = new ws.Server({
  server: httpServer,
});

module.exports = wsServer;
