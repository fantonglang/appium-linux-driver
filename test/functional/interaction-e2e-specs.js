// import _ from 'lodash';
import { remote } from 'webdriverio';
import { startServer } from '../../lib/server';
import chaiAsPromised from 'chai-as-promised';
import chai from 'chai';
import { HOST, PORT, MOCHA_TIMEOUT, APP_NAME } from '../utils';
import { wait4sec } from '../../lib/utils';

chai.should();
chai.use(chaiAsPromised);

const CAPS = {
  platformName: 'linux',
  'appium:appName': APP_NAME
};

describe('AtSpi2Driver - elements interaction', function () {
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

  it('should set a text to a text input control', async function () {
    // 1. steps to set text
    const el = await driver.findElement('name', 'Find');
    await driver.executeScript('linux: click', [el.ELEMENT]);
    let txtEl = await driver.findElement('xpath', '(//text[@name="Search"])[1]');
    await driver.executeScript('linux: click', [txtEl.ELEMENT]);
    await driver.elementSendKeys(txtEl.ELEMENT, ['hello world']);
    await wait4sec(0.5);
    // 2. refresh the element state
    txtEl = await driver.findElement('xpath', '(//text[@name="Search"])[1]');
    await driver.getElementText(txtEl.ELEMENT).should.eventually.eql('hello world');
  });

  it('should click a button', async function () {
    // 1. click on the Find button
    const el = await driver.findElement('name', 'Find');
    await driver.executeScript('linux: click', [el.ELEMENT]);
    // 2. text input should appear after then
    const txtEls = await driver.findElements('xpath', '(//text[@name="Search"])[1]');
    txtEls.length.should.eql(1);
  });

});
