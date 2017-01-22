const faye = require('faye');
const yeelightController = require('./../yeelight/yeelightController');

const client = new faye.Client('http://ludobermejo.es:9100/faye');

function subscribe() {
  client.subscribe('/webhookDispatched', (message) => {
    const data = JSON.parse(message.text);
    switch (data.state) {
      case 'started':
        yeelightController.start();
        break;
      case 'passed':
        yeelightController.complete();
        break;
      case 'broken':
      case 'error':yeelightController.error();
        break;
      default:
        break;
    }
  });
}
function init() {
  yeelightController.connect()
    .then(subscribe());
}

module.exports = {
  init,
};
