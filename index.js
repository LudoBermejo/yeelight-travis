const yeelightController = require('./src/yeelight/yeelight');
const graphQL = require('./src/graphQL/graphQL');
const winston = require('winston');

yeelightController.connect()
  .then(graphQL.connect())
  .catch(e => {
    winston.log('error', e);
    process.exit();
  });
