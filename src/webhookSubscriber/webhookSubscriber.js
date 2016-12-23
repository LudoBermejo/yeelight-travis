const faye = require('faye');
const yeelightController = require('./../yeelight/yeelightController');

const client = new faye.Client('http://ludobermejo.es:9100/faye');

function subscribe() {
  const subscription = client.subscribe('/webhookDispatched', (message) => {
    console.log(message);
    yeelightController.toggle();
  });
  console.log(subscription);
}
function init() {
  yeelightController.connect()
    .then(subscribe());
}

module.exports = {
  init,
};
