const YeelightSearch = require('yeelight-wifi');
const winston = require('winston');
const Promise = require('bluebird');

const arrayLightBulb = [];
function toggle(lightBulb) {
  const mylightBulb = lightBulb || arrayLightBulb[0];
  mylightBulb.toggle()
    .then(() => {
      winston.log('debug', 'toggled');
    })
    .catch((err) => {
      winston.log('error', `received some error: ${err}`);
    });
}

function turnOn(lightBulb) {
  const mylightBulb = lightBulb || arrayLightBulb[0];
  mylightBulb.turnOn();
}


function start(lightBulb) {
  const mylightBulb = lightBulb || arrayLightBulb[0];
  mylightBulb.turnOn();
  mylightBulb.setRGB('#f76008');
}

function complete(lightBulb) {
  const mylightBulb = lightBulb || arrayLightBulb[0];
  mylightBulb.setRGB('#00FF00');
  setTimeout(() => mylightBulb.turnOff(), 5000);
}

function error(lightBulb) {
  const mylightBulb = lightBulb || arrayLightBulb[0];
  mylightBulb.setRGB('#FF0000');
}


function connect() {
  const yeelightSearch = new YeelightSearch();

  return new Promise((resolve, reject) => {
    const timeOut = setTimeout(() => reject(), 30000);
    yeelightSearch.on('found', (lightBulb) => {
      winston.log('info', 'Bulb found')
      arrayLightBulb.push(lightBulb);
      resolve(lightBulb);
      clearTimeout(timeOut);
    });
  });
}

module.exports = {
  connect,
  toggle,
  start,
  complete,
  error,
  turnOn,
};
