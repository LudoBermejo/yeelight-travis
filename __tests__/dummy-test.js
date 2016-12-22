// __tests__/dummy-test.js
jest.dontMock('../src/yeelight/yeelightController');
const yeelightController = require('../src/yeelight/yeelightController');

describe('dummy', () => {
  it('Just check that tests are working', () => {
    expect(yeelightController.connect).not.toBeUndefined();
  });
});
