const graphQL = require('./src/graphQL/graphQL');
const winston = require('winston');

graphQL.connect()
.catch(e => {
  winston.log('error', e);
    process.exit();
});