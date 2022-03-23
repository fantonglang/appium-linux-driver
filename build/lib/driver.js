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
      throw new _baseDriver.errors.UnknownError("application should be specified");
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
          throw new _baseDriver.errors.UnknownError("application is running while trying to start it");

        case 1001:
          throw new _baseDriver.errors.UnknownError("the specified appName is wrong");

        case 1002:
          throw new _baseDriver.errors.UnknownError("timeout while lauching app");
      }
    }

    _logger.default.info(`App ${this.appName} lauched successful`);

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

    await super.deleteSession();
  }

}

var _default = AtSpi2Driver;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9kcml2ZXIuanMiXSwibmFtZXMiOlsiTk9fUFJPWFkiLCJBdFNwaTJEcml2ZXIiLCJCYXNlRHJpdmVyIiwiY29uc3RydWN0b3IiLCJvcHRzIiwiZGVzaXJlZENhcENvbnN0cmFpbnRzIiwibG9jYXRvclN0cmF0ZWdpZXMiLCJjbWQiLCJmbiIsIl8iLCJ0b1BhaXJzIiwiY29tbWFuZHMiLCJwcm90b3R5cGUiLCJwcm94eUFjdGl2ZSIsImdldFByb3h5QXZvaWRMaXN0IiwiY2FuUHJveHkiLCJjcmVhdGVTZXNzaW9uIiwiYXJncyIsInNlc3Npb25JZCIsImNhcHMiLCJhcHBOYW1lIiwiZXJyb3JzIiwiVW5rbm93bkVycm9yIiwibG9nIiwiaW5mbyIsImFwaXMiLCJhcHBfa2lsbCIsImxhdW5jaFJlc3VsdCIsImFwcF9sYXVuY2giLCJvayIsImVyckNvZGUiLCJfd2luIiwid2lkcyIsImdldFdpbmRvd0hhbmRsZXMiLCJsZW5ndGgiLCJzZXRXaW5kb3ciLCJuYW1lIiwiX2NhY2hlIiwiTFJVIiwibWF4IiwidHRsIiwidXBkYXRlQWdlT25HZXQiLCJ1cGRhdGVBZ2VPbkhhcyIsImRlbGV0ZVNlc3Npb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBRUEsTUFBTUEsUUFBUSxHQUFHLEVBQWpCOztBQUVBLE1BQU1DLFlBQU4sU0FBMkJDLHNCQUEzQixDQUFzQztBQUNwQ0MsRUFBQUEsV0FBVyxDQUFFQyxJQUFJLEdBQUcsRUFBVCxFQUFhO0FBQ3RCLFVBQU1BLElBQU47QUFDQSxTQUFLQyxxQkFBTCxHQUE2QkEsa0NBQTdCO0FBQ0EsU0FBS0MsaUJBQUwsR0FBeUIsQ0FBQyxPQUFELEVBQVUsTUFBVixFQUFrQixZQUFsQixDQUF6Qjs7QUFDQSxTQUFLLE1BQU0sQ0FBQ0MsR0FBRCxFQUFNQyxFQUFOLENBQVgsSUFBd0JDLGdCQUFFQyxPQUFGLENBQVVDLGNBQVYsQ0FB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QVQsRUFBa0I7QUFDaEJHLHNCQUFJQyxJQUFKLENBQVUsT0FBTSxLQUFLSixPQUFRLG1DQUE3Qjs7QUFDQUssMkJBQUtDLFFBQUwsQ0FBYyxLQUFLTixPQUFuQjtBQUNEOztBQUNELFVBQU0sTUFBTXVCLGFBQU4sRUFBTjtBQUNEOztBQXZFbUM7O2VBMEV2QjFDLFkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgQmFzZURyaXZlciB9IGZyb20gJ0BhcHBpdW0vYmFzZS1kcml2ZXInO1xuaW1wb3J0IHsgZGVzaXJlZENhcENvbnN0cmFpbnRzIH0gZnJvbSAnLi9kZXNpcmVkLWNhcHMnO1xuaW1wb3J0IGNvbW1hbmRzIGZyb20gJy4vY29tbWFuZHMvaW5kZXgnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgYXBpcyBmcm9tICdAc3Rkc3BhL3N0ZHNwYWxpbnV4X3RlbXAvZGlzdC9wcml2YXRlYXBpcyc7XG5pbXBvcnQgeyBlcnJvcnMgfSBmcm9tICdAYXBwaXVtL2Jhc2UtZHJpdmVyJztcbmltcG9ydCB7IHdhaXQ0c2VjIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgTFJVIGZyb20gJ2xydS1jYWNoZSc7XG5cbmNvbnN0IE5PX1BST1hZID0gW107XG5cbmNsYXNzIEF0U3BpMkRyaXZlciBleHRlbmRzIEJhc2VEcml2ZXIge1xuICBjb25zdHJ1Y3RvciAob3B0cyA9IHt9KSB7XG4gICAgc3VwZXIob3B0cyk7XG4gICAgdGhpcy5kZXNpcmVkQ2FwQ29uc3RyYWludHMgPSBkZXNpcmVkQ2FwQ29uc3RyYWludHM7XG4gICAgdGhpcy5sb2NhdG9yU3RyYXRlZ2llcyA9IFsneHBhdGgnLCAnbmFtZScsICdjbGFzcyBuYW1lJ107XG4gICAgZm9yIChjb25zdCBbY21kLCBmbl0gb2YgXy50b1BhaXJzKGNvbW1hbmRzKSkge1xuICAgICAgQXRTcGkyRHJpdmVyLnByb3RvdHlwZVtjbWRdID0gZm47XG4gICAgfVxuICB9XG5cbiAgcHJveHlBY3RpdmUgKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldFByb3h5QXZvaWRMaXN0ICgpIHtcbiAgICByZXR1cm4gTk9fUFJPWFk7XG4gIH1cblxuICBjYW5Qcm94eSAoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlU2Vzc2lvbiAoLi4uYXJncykge1xuICAgIGNvbnN0IFtzZXNzaW9uSWQsIGNhcHNdID0gYXdhaXQgc3VwZXIuY3JlYXRlU2Vzc2lvbiguLi5hcmdzKTtcbiAgICBpZiAoIWNhcHMuYXBwTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IGVycm9ycy5Vbmtub3duRXJyb3IoXCJhcHBsaWNhdGlvbiBzaG91bGQgYmUgc3BlY2lmaWVkXCIpO1xuICAgIH1cbiAgICB0aGlzLmFwcE5hbWUgPSBjYXBzLmFwcE5hbWU7XG4gICAgbG9nLmluZm8oYEtpbGxpbmcgdGhlIGFwcCAke3RoaXMuYXBwTmFtZX0gaWYgaXQncyBhbHJlYWR5IHJ1bm5pbmdgKTtcbiAgICBhcGlzLmFwcF9raWxsKHRoaXMuYXBwTmFtZSk7XG4gICAgYXdhaXQgd2FpdDRzZWMoMSk7XG4gICAgbG9nLmluZm8oYExhdWNoaW5nIGFwcCAke3RoaXMuYXBwTmFtZX1gKTtcbiAgICBjb25zdCBsYXVuY2hSZXN1bHQgPSBhcGlzLmFwcF9sYXVuY2godGhpcy5hcHBOYW1lKTtcbiAgICBpZiAoIWxhdW5jaFJlc3VsdC5vaykge1xuICAgICAgc3dpdGNoKGxhdW5jaFJlc3VsdC5lcnJDb2RlKSB7XG4gICAgICAgIGNhc2UgMTAwMDpcbiAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzLlVua25vd25FcnJvcihcImFwcGxpY2F0aW9uIGlzIHJ1bm5pbmcgd2hpbGUgdHJ5aW5nIHRvIHN0YXJ0IGl0XCIpO1xuICAgICAgICBjYXNlIDEwMDE6XG4gICAgICAgICAgdGhyb3cgbmV3IGVycm9ycy5Vbmtub3duRXJyb3IoXCJ0aGUgc3BlY2lmaWVkIGFwcE5hbWUgaXMgd3JvbmdcIik7XG4gICAgICAgIGNhc2UgMTAwMjpcbiAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzLlVua25vd25FcnJvcihcInRpbWVvdXQgd2hpbGUgbGF1Y2hpbmcgYXBwXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICBsb2cuaW5mbyhgQXBwICR7dGhpcy5hcHBOYW1lfSBsYXVjaGVkIHN1Y2Nlc3NmdWxgKTtcbiAgICB0aGlzLl93aW4gPSBudWxsO1xuICAgIGNvbnN0IHdpZHMgPSBhd2FpdCB0aGlzLmdldFdpbmRvd0hhbmRsZXMoKTtcbiAgICBpZiAod2lkcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBlcnJvcnMuVW5rbm93bkVycm9yKGBBcHAgJHt0aGlzLmFwcE5hbWV9IGhhcyBubyB3aW5kb3dgKTtcbiAgICB9IGVsc2UgaWYgKHdpZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBhd2FpdCB0aGlzLnNldFdpbmRvdyhudWxsLCB3aWRzWzBdKTtcbiAgICAgIGxvZy5pbmZvKGBwcmUtc2VsZWN0ZWQgdGhlIG9ubHkgd2luZG93ICR7dGhpcy5fd2luLm5hbWV9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZy5pbmZvKGBBcHAgJHt0aGlzLmFwcE5hbWV9IGhhcyBtb3JlIHRoYW4gMSB3aW5kb3dgKTtcbiAgICAgIGF3YWl0IHRoaXMuc2V0V2luZG93KG51bGwsIHdpZHNbMF0pO1xuICAgICAgbG9nLmluZm8oYHByZS1zZWxlY3RlZCB0aGUgZmlyc3Qgd2luZG93ICR7dGhpcy5fd2luLm5hbWV9YCk7XG4gICAgfVxuICAgIHRoaXMuX2NhY2hlID0gbmV3IExSVSh7XG4gICAgICBtYXg6IDUwMCxcbiAgICAgIHR0bDogMTAwMCAqIDYwICogNSxcbiAgICAgIHVwZGF0ZUFnZU9uR2V0OiB0cnVlLFxuICAgICAgdXBkYXRlQWdlT25IYXM6IHRydWVcbiAgICB9KVxuICAgIHJldHVybiBbc2Vzc2lvbklkLCBjYXBzXTtcbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZVNlc3Npb24gKCkge1xuICAgIGlmICh0aGlzLmFwcE5hbWUpIHtcbiAgICAgIGxvZy5pbmZvKGBBcHAgJHt0aGlzLmFwcE5hbWV9IGlzIGtpbGxlZCBiZWZvcmUgY2xvc2luZyBzZXNzaW9uYCk7XG4gICAgICBhcGlzLmFwcF9raWxsKHRoaXMuYXBwTmFtZSk7XG4gICAgfVxuICAgIGF3YWl0IHN1cGVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBdFNwaTJEcml2ZXI7Il0sImZpbGUiOiJsaWIvZHJpdmVyLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uIn0=
