"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("source-map-support/register");

var _lodash = _interopRequireDefault(require("lodash"));

var _baseDriver = require("@appium/base-driver");

var _desiredCaps = require("./desired-caps");

var _index = _interopRequireDefault(require("./commands/index"));

var _logger = _interopRequireDefault(require("./logger"));

var _privateapis = _interopRequireDefault(require("@stdspa/stdspalinux_temp/dist/privateapis"));

var _utils = require("./utils");

var _lruCache = _interopRequireDefault(require("lru-cache"));

const NO_PROXY = [];

class AtSpi2Driver extends _baseDriver.BaseDriver {
  constructor(opts = {}) {
    super(opts);
    this.desiredCapConstraints = _desiredCaps.desiredCapConstraints;
    this.locatorStrategies = ['xpath', 'name', 'class name'];

    for (const [cmd, fn] of _lodash.default.toPairs(_index.default)) {
      AtSpi2Driver.prototype[cmd] = fn;
    }
  }

  proxyActive() {
    return false;
  }

  getProxyAvoidList() {
    return NO_PROXY;
  }

  canProxy() {
    return false;
  }

  async createSession(...args) {
    const [sessionId, caps] = await super.createSession(...args);

    if (!caps.appName) {
      throw new _baseDriver.errors.UnknownError('application should be specified');
    }

    this.appName = caps.appName;

    _logger.default.info(`Killing the app ${this.appName} if it's already running`);

    _privateapis.default.app_kill(this.appName);

    await (0, _utils.wait4sec)(1);

    _logger.default.info(`Lauching app ${this.appName}`);

    const launchResult = _privateapis.default.app_launch(this.appName);

    if (!launchResult.ok) {
      switch (launchResult.errCode) {
        case 1000:
          throw new _baseDriver.errors.UnknownError('application is running while trying to start it');

        case 1001:
          throw new _baseDriver.errors.UnknownError('the specified appName is wrong');

        case 1002:
          throw new _baseDriver.errors.UnknownError('timeout while lauching app');
      }
    }

    _logger.default.info(`App ${this.appName} lauched successful`);

    await (0, _utils.wait4sec)(0.5);
    this._win = null;
    const wids = await this.getWindowHandles();

    if (wids.length === 0) {
      throw new _baseDriver.errors.UnknownError(`App ${this.appName} has no window`);
    } else if (wids.length === 1) {
      await this.setWindow(null, wids[0]);

      _logger.default.info(`pre-selected the only window ${this._win.name}`);
    } else {
      _logger.default.info(`App ${this.appName} has more than 1 window`);

      await this.setWindow(null, wids[0]);

      _logger.default.info(`pre-selected the first window ${this._win.name}`);
    }

    this._cache = new _lruCache.default({
      max: 500,
      ttl: 1000 * 60 * 5,
      updateAgeOnGet: true,
      updateAgeOnHas: true
    });
    return [sessionId, caps];
  }

  async deleteSession() {
    if (this.appName) {
      _logger.default.info(`App ${this.appName} is killed before closing session`);

      _privateapis.default.app_kill(this.appName);
    }

    this._cache.clear();

    await super.deleteSession();
  }

}

var _default = AtSpi2Driver;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9kcml2ZXIuanMiXSwibmFtZXMiOlsiTk9fUFJPWFkiLCJBdFNwaTJEcml2ZXIiLCJCYXNlRHJpdmVyIiwiY29uc3RydWN0b3IiLCJvcHRzIiwiZGVzaXJlZENhcENvbnN0cmFpbnRzIiwibG9jYXRvclN0cmF0ZWdpZXMiLCJjbWQiLCJmbiIsIl8iLCJ0b1BhaXJzIiwiY29tbWFuZHMiLCJwcm90b3R5cGUiLCJwcm94eUFjdGl2ZSIsImdldFByb3h5QXZvaWRMaXN0IiwiY2FuUHJveHkiLCJjcmVhdGVTZXNzaW9uIiwiYXJncyIsInNlc3Npb25JZCIsImNhcHMiLCJhcHBOYW1lIiwiZXJyb3JzIiwiVW5rbm93bkVycm9yIiwibG9nIiwiaW5mbyIsImFwaXMiLCJhcHBfa2lsbCIsImxhdW5jaFJlc3VsdCIsImFwcF9sYXVuY2giLCJvayIsImVyckNvZGUiLCJfd2luIiwid2lkcyIsImdldFdpbmRvd0hhbmRsZXMiLCJsZW5ndGgiLCJzZXRXaW5kb3ciLCJuYW1lIiwiX2NhY2hlIiwiTFJVIiwibWF4IiwidHRsIiwidXBkYXRlQWdlT25HZXQiLCJ1cGRhdGVBZ2VPbkhhcyIsImRlbGV0ZVNlc3Npb24iLCJjbGVhciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQSxNQUFNQSxRQUFRLEdBQUcsRUFBakI7O0FBRUEsTUFBTUMsWUFBTixTQUEyQkMsc0JBQTNCLENBQXNDO0FBQ3BDQyxFQUFBQSxXQUFXLENBQUVDLElBQUksR0FBRyxFQUFULEVBQWE7QUFDdEIsVUFBTUEsSUFBTjtBQUNBLFNBQUtDLHFCQUFMLEdBQTZCQSxrQ0FBN0I7QUFDQSxTQUFLQyxpQkFBTCxHQUF5QixDQUFDLE9BQUQsRUFBVSxNQUFWLEVBQWtCLFlBQWxCLENBQXpCOztBQUNBLFNBQUssTUFBTSxDQUFDQyxHQUFELEVBQU1DLEVBQU4sQ0FBWCxJQUF3QkMsZ0JBQUVDLE9BQUYsQ0FBVUMs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YndCLGFBQWEsR0FBSTtBQUNyQixRQUFJLEtBQUt2QixPQUFULEVBQWtCO0FBQ2hCRyxzQkFBSUMsSUFBSixDQUFVLE9BQU0sS0FBS0osT0FBUSxtQ0FBN0I7O0FBQ0FLLDJCQUFLQyxRQUFMLENBQWMsS0FBS04sT0FBbkI7QUFDRDs7QUFDRCxTQUFLaUIsTUFBTCxDQUFZTyxLQUFaOztBQUNBLFVBQU0sTUFBTUQsYUFBTixFQUFOO0FBQ0Q7O0FBekVtQzs7ZUE0RXZCMUMsWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBCYXNlRHJpdmVyLCBlcnJvcnMgfSBmcm9tICdAYXBwaXVtL2Jhc2UtZHJpdmVyJztcbmltcG9ydCB7IGRlc2lyZWRDYXBDb25zdHJhaW50cyB9IGZyb20gJy4vZGVzaXJlZC1jYXBzJztcbmltcG9ydCBjb21tYW5kcyBmcm9tICcuL2NvbW1hbmRzL2luZGV4JztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IGFwaXMgZnJvbSAnQHN0ZHNwYS9zdGRzcGFsaW51eF90ZW1wL2Rpc3QvcHJpdmF0ZWFwaXMnO1xuaW1wb3J0IHsgd2FpdDRzZWMgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBMUlUgZnJvbSAnbHJ1LWNhY2hlJztcblxuY29uc3QgTk9fUFJPWFkgPSBbXTtcblxuY2xhc3MgQXRTcGkyRHJpdmVyIGV4dGVuZHMgQmFzZURyaXZlciB7XG4gIGNvbnN0cnVjdG9yIChvcHRzID0ge30pIHtcbiAgICBzdXBlcihvcHRzKTtcbiAgICB0aGlzLmRlc2lyZWRDYXBDb25zdHJhaW50cyA9IGRlc2lyZWRDYXBDb25zdHJhaW50cztcbiAgICB0aGlzLmxvY2F0b3JTdHJhdGVnaWVzID0gWyd4cGF0aCcsICduYW1lJywgJ2NsYXNzIG5hbWUnXTtcbiAgICBmb3IgKGNvbnN0IFtjbWQsIGZuXSBvZiBfLnRvUGFpcnMoY29tbWFuZHMpKSB7XG4gICAgICBBdFNwaTJEcml2ZXIucHJvdG90eXBlW2NtZF0gPSBmbjtcbiAgICB9XG4gIH1cblxuICBwcm94eUFjdGl2ZSAoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0UHJveHlBdm9pZExpc3QgKCkge1xuICAgIHJldHVybiBOT19QUk9YWTtcbiAgfVxuXG4gIGNhblByb3h5ICgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhc3luYyBjcmVhdGVTZXNzaW9uICguLi5hcmdzKSB7XG4gICAgY29uc3QgW3Nlc3Npb25JZCwgY2Fwc10gPSBhd2FpdCBzdXBlci5jcmVhdGVTZXNzaW9uKC4uLmFyZ3MpO1xuICAgIGlmICghY2Fwcy5hcHBOYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgZXJyb3JzLlVua25vd25FcnJvcignYXBwbGljYXRpb24gc2hvdWxkIGJlIHNwZWNpZmllZCcpO1xuICAgIH1cbiAgICB0aGlzLmFwcE5hbWUgPSBjYXBzLmFwcE5hbWU7XG4gICAgbG9nLmluZm8oYEtpbGxpbmcgdGhlIGFwcCAke3RoaXMuYXBwTmFtZX0gaWYgaXQncyBhbHJlYWR5IHJ1bm5pbmdgKTtcbiAgICBhcGlzLmFwcF9raWxsKHRoaXMuYXBwTmFtZSk7XG4gICAgYXdhaXQgd2FpdDRzZWMoMSk7XG4gICAgbG9nLmluZm8oYExhdWNoaW5nIGFwcCAke3RoaXMuYXBwTmFtZX1gKTtcbiAgICBjb25zdCBsYXVuY2hSZXN1bHQgPSBhcGlzLmFwcF9sYXVuY2godGhpcy5hcHBOYW1lKTtcbiAgICBpZiAoIWxhdW5jaFJlc3VsdC5vaykge1xuICAgICAgc3dpdGNoIChsYXVuY2hSZXN1bHQuZXJyQ29kZSkge1xuICAgICAgICBjYXNlIDEwMDA6XG4gICAgICAgICAgdGhyb3cgbmV3IGVycm9ycy5Vbmtub3duRXJyb3IoJ2FwcGxpY2F0aW9uIGlzIHJ1bm5pbmcgd2hpbGUgdHJ5aW5nIHRvIHN0YXJ0IGl0Jyk7XG4gICAgICAgIGNhc2UgMTAwMTpcbiAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzLlVua25vd25FcnJvcigndGhlIHNwZWNpZmllZCBhcHBOYW1lIGlzIHdyb25nJyk7XG4gICAgICAgIGNhc2UgMTAwMjpcbiAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzLlVua25vd25FcnJvcigndGltZW91dCB3aGlsZSBsYXVjaGluZyBhcHAnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbG9nLmluZm8oYEFwcCAke3RoaXMuYXBwTmFtZX0gbGF1Y2hlZCBzdWNjZXNzZnVsYCk7XG4gICAgYXdhaXQgd2FpdDRzZWMoMC41KTtcbiAgICB0aGlzLl93aW4gPSBudWxsO1xuICAgIGNvbnN0IHdpZHMgPSBhd2FpdCB0aGlzLmdldFdpbmRvd0hhbmRsZXMoKTtcbiAgICBpZiAod2lkcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBlcnJvcnMuVW5rbm93bkVycm9yKGBBcHAgJHt0aGlzLmFwcE5hbWV9IGhhcyBubyB3aW5kb3dgKTtcbiAgICB9IGVsc2UgaWYgKHdpZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBhd2FpdCB0aGlzLnNldFdpbmRvdyhudWxsLCB3aWRzWzBdKTtcbiAgICAgIGxvZy5pbmZvKGBwcmUtc2VsZWN0ZWQgdGhlIG9ubHkgd2luZG93ICR7dGhpcy5fd2luLm5hbWV9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZy5pbmZvKGBBcHAgJHt0aGlzLmFwcE5hbWV9IGhhcyBtb3JlIHRoYW4gMSB3aW5kb3dgKTtcbiAgICAgIGF3YWl0IHRoaXMuc2V0V2luZG93KG51bGwsIHdpZHNbMF0pO1xuICAgICAgbG9nLmluZm8oYHByZS1zZWxlY3RlZCB0aGUgZmlyc3Qgd2luZG93ICR7dGhpcy5fd2luLm5hbWV9YCk7XG4gICAgfVxuICAgIHRoaXMuX2NhY2hlID0gbmV3IExSVSh7XG4gICAgICBtYXg6IDUwMCxcbiAgICAgIHR0bDogMTAwMCAqIDYwICogNSxcbiAgICAgIHVwZGF0ZUFnZU9uR2V0OiB0cnVlLFxuICAgICAgdXBkYXRlQWdlT25IYXM6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gW3Nlc3Npb25JZCwgY2Fwc107XG4gIH1cblxuICBhc3luYyBkZWxldGVTZXNzaW9uICgpIHtcbiAgICBpZiAodGhpcy5hcHBOYW1lKSB7XG4gICAgICBsb2cuaW5mbyhgQXBwICR7dGhpcy5hcHBOYW1lfSBpcyBraWxsZWQgYmVmb3JlIGNsb3Npbmcgc2Vzc2lvbmApO1xuICAgICAgYXBpcy5hcHBfa2lsbCh0aGlzLmFwcE5hbWUpO1xuICAgIH1cbiAgICB0aGlzLl9jYWNoZS5jbGVhcigpO1xuICAgIGF3YWl0IHN1cGVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBdFNwaTJEcml2ZXI7Il0sImZpbGUiOiJsaWIvZHJpdmVyLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uIn0=
