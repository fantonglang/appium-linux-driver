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

var _privateapis = _interopRequireDefault(require("./privateapis"));

var _utils = require("./utils");

const NO_PROXY = [];

class AtSpi2Driver extends _baseDriver.BaseDriver {
  constructor(opts = {}) {
    super(opts);
    this.desiredCapConstraints = _desiredCaps.desiredCapConstraints;
    this.locatorStrategies = ['xpath'];

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

    this._windowId = null;
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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9kcml2ZXIuanMiXSwibmFtZXMiOlsiTk9fUFJPWFkiLCJBdFNwaTJEcml2ZXIiLCJCYXNlRHJpdmVyIiwiY29uc3RydWN0b3IiLCJvcHRzIiwiZGVzaXJlZENhcENvbnN0cmFpbnRzIiwibG9jYXRvclN0cmF0ZWdpZXMiLCJjbWQiLCJmbiIsIl8iLCJ0b1BhaXJzIiwiY29tbWFuZHMiLCJwcm90b3R5cGUiLCJwcm94eUFjdGl2ZSIsImdldFByb3h5QXZvaWRMaXN0IiwiY2FuUHJveHkiLCJjcmVhdGVTZXNzaW9uIiwiYXJncyIsInNlc3Npb25JZCIsImNhcHMiLCJhcHBOYW1lIiwiZXJyb3JzIiwiVW5rbm93bkVycm9yIiwibG9nIiwiaW5mbyIsImFwaXMiLCJhcHBfa2lsbCIsImxhdW5jaFJlc3VsdCIsImFwcF9sYXVuY2giLCJvayIsImVyckNvZGUiLCJfd2luZG93SWQiLCJkZWxldGVTZXNzaW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUVBLE1BQU1BLFFBQVEsR0FBRyxFQUFqQjs7QUFFQSxNQUFNQyxZQUFOLFNBQTJCQyxzQkFBM0IsQ0FBc0M7QUFDcENDLEVBQUFBLFdBQVcsQ0FBRUMsSUFBSSxHQUFHLEVBQVQsRUFBYTtBQUN0QixVQUFNQSxJQUFOO0FBQ0EsU0FBS0MscUJBQUwsR0FBNkJBLGtDQUE3QjtBQUNBLFNBQUtDLGlCQUFMLEdBQXlCLENBQUMsT0FBRCxDQUF6Qjs7QUFDQSxTQUFLLE1BQU0sQ0FBQ0MsR0FBRCxFQUFNQyxFQUFOLENBQVgsSUFBd0JDLGdCQUFFQyxPQUFGLENBQVVDLGNBQVYsQ0FBeEIsRUFBNkM7QUFDM0NWLE1BQUFBLFlBQVksQ0FBQ1csU0FBYixDQUF1QkwsR0FBdkIsSUFBOEJDLEVBQTlCO0FBQ0Q7QUFDRjs7QUFFREssRUFBQUEsV0FBVyxHQUFJO0FBQ2IsV0FBTyxLQUFQO0FBQ0Q7O0FBRURDLEVBQUFBLGlCQUFpQixHQUFJO0FBQ25CLFdBQU9kLFFBQVA7QUFDRDs7QUFFRGUsRUFBQUEsUUFBUSxHQUFJO0FBQ1YsV0FBTyxLQUFQO0FBQ0Q7O0FBRWtCLFFBQWJDLGFBQWEsQ0FBRSxHQUFHQyxJQUFMLEVBQVc7QUFDNUIsVUFBTSxDQUFDQyxTQUFELEVBQVlDLElBQVosSUFBb0IsTUFBTSxNQUFNSCxhQUFOLENBQW9CLEdBQUdDLElBQXZCLENBQWhDOztBQUNBLFFBQUksQ0FBQ0UsSUFBSSxDQUFDQyxPQUFWLEVBQW1CO0FBQ2pCLFlBQU0sSUFBSUMsbUJBQU9DLFlBQVgsQ0FBd0IsaUNBQXhCLENBQU47QUFDRDs7QUFDRCxTQUFLRixPQUFMLEdBQWVELElBQUksQ0FBQ0MsT0FBcEI7O0FBQ0FHLG9CQUFJQyxJQUFKLENBQVUsbUJBQWtCLEtBQUtKLE9BQVEsMEJBQXpDOztBQUNBSyx5QkFBS0MsUUFBTCxDQUFjLEtBQUtOLE9BQW5COztBQUNBLFVBQU0scUJBQVMsQ0FBVCxDQUFOOztBQUNBRyxvQkFBSUMsSUFBSixDQUFVLGdCQUFlLEtBQUtKLE9BQVEsRUFBdEM7O0FBQ0EsVUFBTU8sWUFBWSxHQUFHRixxQkFBS0csVUFBTCxDQUFnQixLQUFLUixPQUFyQixDQUFyQjs7QUFDQSxRQUFJLENBQUNPLFlBQVksQ0FBQ0UsRUFBbEIsRUFBc0I7QUFDcEIsY0FBT0YsWUFBWSxDQUFDRyxPQUFwQjtBQUNFLGFBQUssSUFBTDtBQUNFLGdCQUFNLElBQUlULG1CQUFPQyxZQUFYLENBQXdCLGlEQUF4QixDQUFOOztBQUNGLGFBQUssSUFBTDtBQUNFLGdCQUFNLElBQUlELG1CQUFPQyxZQUFYLENBQXdCLGdDQUF4QixDQUFOOztBQUNGLGFBQUssSUFBTDtBQUNFLGdCQUFNLElBQUlELG1CQUFPQyxZQUFYLENBQXdCLDRCQUF4QixDQUFOO0FBTko7QUFRRDs7QUFDREMsb0JBQUlDLElBQUosQ0FBVSxPQUFNLEtBQUtKLE9BQVEscUJBQTdCOztBQUNBLFNBQUtXLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxXQUFPLENBQUNiLFNBQUQsRUFBWUMsSUFBWixDQUFQO0FBQ0Q7O0FBRWtCLFFBQWJhLGFBQWEsR0FBSTtBQUNyQixRQUFJLEtBQUtaLE9BQVQsRUFBa0I7QUFDaEJHLHNCQUFJQyxJQUFKLENBQVUsT0FBTSxLQUFLSixPQUFRLG1DQUE3Qjs7QUFDQUssMkJBQUtDLFFBQUwsQ0FBYyxLQUFLTixPQUFuQjtBQUNEOztBQUNELFVBQU0sTUFBTVksYUFBTixFQUFOO0FBQ0Q7O0FBdERtQzs7ZUF5RHZCL0IsWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBCYXNlRHJpdmVyIH0gZnJvbSAnQGFwcGl1bS9iYXNlLWRyaXZlcic7XG5pbXBvcnQgeyBkZXNpcmVkQ2FwQ29uc3RyYWludHMgfSBmcm9tICcuL2Rlc2lyZWQtY2Fwcyc7XG5pbXBvcnQgY29tbWFuZHMgZnJvbSAnLi9jb21tYW5kcy9pbmRleCc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCBhcGlzIGZyb20gJy4vcHJpdmF0ZWFwaXMnO1xuaW1wb3J0IHsgZXJyb3JzIH0gZnJvbSAnQGFwcGl1bS9iYXNlLWRyaXZlcic7XG5pbXBvcnQgeyB3YWl0NHNlYyB9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBOT19QUk9YWSA9IFtdO1xuXG5jbGFzcyBBdFNwaTJEcml2ZXIgZXh0ZW5kcyBCYXNlRHJpdmVyIHtcbiAgY29uc3RydWN0b3IgKG9wdHMgPSB7fSkge1xuICAgIHN1cGVyKG9wdHMpO1xuICAgIHRoaXMuZGVzaXJlZENhcENvbnN0cmFpbnRzID0gZGVzaXJlZENhcENvbnN0cmFpbnRzO1xuICAgIHRoaXMubG9jYXRvclN0cmF0ZWdpZXMgPSBbJ3hwYXRoJ107XG4gICAgZm9yIChjb25zdCBbY21kLCBmbl0gb2YgXy50b1BhaXJzKGNvbW1hbmRzKSkge1xuICAgICAgQXRTcGkyRHJpdmVyLnByb3RvdHlwZVtjbWRdID0gZm47XG4gICAgfVxuICB9XG5cbiAgcHJveHlBY3RpdmUgKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldFByb3h5QXZvaWRMaXN0ICgpIHtcbiAgICByZXR1cm4gTk9fUFJPWFk7XG4gIH1cblxuICBjYW5Qcm94eSAoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlU2Vzc2lvbiAoLi4uYXJncykge1xuICAgIGNvbnN0IFtzZXNzaW9uSWQsIGNhcHNdID0gYXdhaXQgc3VwZXIuY3JlYXRlU2Vzc2lvbiguLi5hcmdzKTtcbiAgICBpZiAoIWNhcHMuYXBwTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IGVycm9ycy5Vbmtub3duRXJyb3IoXCJhcHBsaWNhdGlvbiBzaG91bGQgYmUgc3BlY2lmaWVkXCIpO1xuICAgIH1cbiAgICB0aGlzLmFwcE5hbWUgPSBjYXBzLmFwcE5hbWU7XG4gICAgbG9nLmluZm8oYEtpbGxpbmcgdGhlIGFwcCAke3RoaXMuYXBwTmFtZX0gaWYgaXQncyBhbHJlYWR5IHJ1bm5pbmdgKTtcbiAgICBhcGlzLmFwcF9raWxsKHRoaXMuYXBwTmFtZSk7XG4gICAgYXdhaXQgd2FpdDRzZWMoMSk7XG4gICAgbG9nLmluZm8oYExhdWNoaW5nIGFwcCAke3RoaXMuYXBwTmFtZX1gKTtcbiAgICBjb25zdCBsYXVuY2hSZXN1bHQgPSBhcGlzLmFwcF9sYXVuY2godGhpcy5hcHBOYW1lKTtcbiAgICBpZiAoIWxhdW5jaFJlc3VsdC5vaykge1xuICAgICAgc3dpdGNoKGxhdW5jaFJlc3VsdC5lcnJDb2RlKSB7XG4gICAgICAgIGNhc2UgMTAwMDpcbiAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzLlVua25vd25FcnJvcihcImFwcGxpY2F0aW9uIGlzIHJ1bm5pbmcgd2hpbGUgdHJ5aW5nIHRvIHN0YXJ0IGl0XCIpO1xuICAgICAgICBjYXNlIDEwMDE6XG4gICAgICAgICAgdGhyb3cgbmV3IGVycm9ycy5Vbmtub3duRXJyb3IoXCJ0aGUgc3BlY2lmaWVkIGFwcE5hbWUgaXMgd3JvbmdcIik7XG4gICAgICAgIGNhc2UgMTAwMjpcbiAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzLlVua25vd25FcnJvcihcInRpbWVvdXQgd2hpbGUgbGF1Y2hpbmcgYXBwXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICBsb2cuaW5mbyhgQXBwICR7dGhpcy5hcHBOYW1lfSBsYXVjaGVkIHN1Y2Nlc3NmdWxgKTtcbiAgICB0aGlzLl93aW5kb3dJZCA9IG51bGw7XG4gICAgcmV0dXJuIFtzZXNzaW9uSWQsIGNhcHNdO1xuICB9XG5cbiAgYXN5bmMgZGVsZXRlU2Vzc2lvbiAoKSB7XG4gICAgaWYgKHRoaXMuYXBwTmFtZSkge1xuICAgICAgbG9nLmluZm8oYEFwcCAke3RoaXMuYXBwTmFtZX0gaXMga2lsbGVkIGJlZm9yZSBjbG9zaW5nIHNlc3Npb25gKTtcbiAgICAgIGFwaXMuYXBwX2tpbGwodGhpcy5hcHBOYW1lKTtcbiAgICB9XG4gICAgYXdhaXQgc3VwZXIuZGVsZXRlU2Vzc2lvbigpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF0U3BpMkRyaXZlcjsiXSwiZmlsZSI6ImxpYi9kcml2ZXIuanMiLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
