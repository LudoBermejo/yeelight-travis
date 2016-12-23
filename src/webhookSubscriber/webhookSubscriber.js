const faye = require('faye');
const yeelightController = require('./../yeelight/yeelightController');

const client = new faye.Client('http://localhost:8000/faye');

function subscribe() {
  return client.subscribe('/webhookDispatched', (message) => {
    console.log(message);
  });
}
function init() {
  yeelightController.connect()
    .then(subscribe());
}

module.exports = {
  init,
};
