import _ from 'lodash';
import { BaseDriver } from '@appium/base-driver';
import { desiredCapConstraints } from './desired-caps';
import commands from './commands/index';
import log from './logger';
import apis from '@stdspa/stdspalinux_temp/dist/privateapis';
import { errors } from '@appium/base-driver';
import { wait4sec } from './utils';

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
    if (!caps.appName) {
      throw new errors.UnknownError("application should be specified");
    }
    this.appName = caps.appName;
    log.info(`Killing the app ${this.appName} if it's already running`);
    apis.app_kill(this.appName);
    await wait4sec(1);
    log.info(`Lauching app ${this.appName}`);
    const launchResult = apis.app_launch(this.appName);
    if (!launchResult.ok) {
      switch(launchResult.errCode) {
        case 1000:
          throw new errors.UnknownError("application is running while trying to start it");
        case 1001:
          throw new errors.UnknownError("the specified appName is wrong");
        case 1002:
          throw new errors.UnknownError("timeout while lauching app");
      }
    }
    log.info(`App ${this.appName} lauched successful`);
    this._windowId = null;
    return [sessionId, caps];
  }

  async deleteSession () {
    if (this.appName) {
      log.info(`App ${this.appName} is killed before closing session`);
      apis.app_kill(this.appName);
    }
    await super.deleteSession();
  }
}

export default AtSpi2Driver;