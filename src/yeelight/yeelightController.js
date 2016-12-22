const YeelightSearch = require('yeelight-wifi');
const winston = require('winston');
const Promise = require('bluebird');

const arrayLightBulb = [];
function toggle(lightBulb) {
  lightBulb.toggle()
    .then(() => {
      winston.log('debug', 'toggled');
    })
    .catch((err) => {
      winston.log('error', `received some error: ${err}`);
    });
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
};
