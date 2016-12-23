const faye = require('faye');
const yeelightController = require('./../yeelight/yeelightController');

const client = new faye.Client('http://ludobermejo.es:9100/faye');

function subscribe() {
  client.subscribe('/webhookDispatched', (message) => {
    const data = JSON.parse(message.text);
    switch (data.state) {
      case 'started':
        yeelightController.turnOn();
        yeelightController.setRGB('#F3F781');
        break;
      case 'passed':
        yeelightController.turnOn();
        yeelightController.setRGB('#00FF00');
        setTimeout(() => yeelightController.turnOff(), 5000);
        break;
      case 'broken':
      case 'error':
        yeelightController.turnOn();
        yeelightController.setRGB('#FF0000');
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
