// import _ from 'lodash';
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

describe('AtSpi2Driver - find elements', function () {
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

  it('should find by name', async function () {
    const el = await driver.findElement('name', 'Find');
    el.should.exist;
  });

  it('should find multiple by name', async function () {
    const els = await driver.findElements('name', 'Find');
    els.length.should.eql(1);
    await driver.getElementAttribute(els[0], 'name').should.eventually.eql('Find');
  });

  it('should find by xpath', async function () {
    const el = await driver.findElement(
      'xpath',
      '//toggle-button[@name="Find"]'
    );
    el.should.exist;
  });

  it('should find multiple by xpath', async function () {
    const els = await driver.findElements(
      'xpath',
      '//toggle-button[@name="Find"]'
    );
    els.length.should.be.above(1);
    await driver.getElementAttribute(els[0], 'name').should.eventually.eql('Find');
  });

  it('should find subelements', async function () {
    const el = await driver.findElement('xpath', '//document-web');
    el.should.exist;
    const subEls = await driver.findElementsFromElement(el, 'xpath', '//image[@name="Ubuntu Logo"]');
    subEls.length.should.be.above(1);
    await driver.getElementAttribute(subEls[0], 'tag').should.eventually.eql('img');
  });

});

