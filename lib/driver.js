import _ from 'lodash';
import { BaseDriver } from '@appium/base-driver';
import { desiredCapConstraints } from './desired-caps';
import commands from './commands/index';
import log from './logger';

const NO_PROXY = [];

class AtSpi2Driver extends BaseDriver {
  constructor (opts = {}) {
    super(opts);
    this.desiredCapConstraints = desiredCapConstraints;
    this.locatorStrategies = ['xpath'];
    for (const [cmd, fn] of _.toPairs(commands)) {
      AtSpi2Driver.prototype[cmd] = fn;
    }
  }

  proxyActive () {
    return false;
  }

  getProxyAvoidList () {
    return NO_PROXY;
  }

  canProxy () {
    return false;
  }

  async createSession (...args) {
    const [sessionId, caps] = await super.createSession(...args);
    if (caps.appName) {
      this.appName = caps.appName;
      // await killApp(caps.appName)
      try {
        // await startApp(caps.appName)
      } catch (e) {
        log.error(e.message);
      }
      console.log(`app name is present: ${caps.appName}`);
    }
    return [sessionId, caps];
  }

  async deleteSession () {
    if (this.appName) {
      // await killApp(caps.appName)
      console.log(`session stop: ${this.appName} close`);
    }
    await super.deleteSession();
  }
}

export default AtSpi2Driver;