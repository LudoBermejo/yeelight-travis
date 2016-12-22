const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const winston = require('winston');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = { hello: () => 'Hello world!' };

const app = express();

function errorHandler(err) {
  winston.log('error', err);
}

function connect() {
  app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  }));
  app.listen(4000, () => winston.log('info', 'Now browse to localhost:4000/graphql'));
}

app.use(errorHandler);

module.exports = {
  connect,
};
