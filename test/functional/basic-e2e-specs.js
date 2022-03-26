import _ from 'lodash';
import { remote } from 'webdriverio';
import { startServer } from '../../lib/server';
import chaiAsPromised from 'chai-as-promised';
import chai from 'chai';
import { HOST, PORT, MOCHA_TIMEOUT, APP_NAME } from '../utils';

chai.should();
chai.use(chaiAsPromised);

const CAPS = {
  platformName: 'Linux',
  automationName: 'atspi2',
  appName: APP_NAME
};

describe('AtSpi2Driver - basic', function () {
  this.timeout(MOCHA_TIMEOUT);

  let server;
  let driver;
  before(async function () {
    server = await startServer(PORT, HOST);
  });
  after(async function () {
    if (server) {
      await server.close();
      server = null;
    }
  });
  beforeEach(async function () {
    driver = await remote({
      hostname: HOST,
      port: PORT,
      capabilities: CAPS,
    });
  });
  afterEach(async function () {
    if (driver) {
      try {
        await driver.deleteSession();
      } finally {
        driver = null;
      }
    }
  });

  it('should retrieve xml source', async function () {
    const source = await driver.getPageSource();
    _.includes(source, '<?xml version="1.0" encoding="UTF-8"?>').should.be.true;
  });

  it('should take screenshots', async function () {
    const screenshot = await driver.getScreenshot();
    _.startsWith(screenshot, 'data:image/png;base64,').should.be.true;
  });

});

