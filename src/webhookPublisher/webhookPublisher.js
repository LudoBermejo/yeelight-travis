const http = require('http');
const faye = require('faye');
const winston = require('winston');
const qs = require('qs')

const bayeux = new faye.NodeAdapter({ mount: '/faye', timeout: 45 });

function sendMessage(message) {
  if (message.payload) {
    bayeux.getClient().publish('/webhookDispatched', {
      text: message.payload,
    }).then(() => {
      winston.log('info', 'Webhook received by server!');
    }, (error) => {
      winston.log('error', `There was a problem: ${error.message}`);
    });
  }
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', (data) => {
      body += data;
    });
    req.on('end', () => {
      sendMessage(qs.parse(body));
    });
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('received');
});


function init() {
  bayeux.attach(server);
  server.listen(9100);
}

module.exports = init;
