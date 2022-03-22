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

    this._win = null;
    const wids = await this.getWindowHandles();

    if (wids.length === 1) {
      await this.setWindow(null, wids[0]);

      _logger.default.info(this._win);
    } else {
      _logger.default.info(`App ${this.appName} can't select a default window, because more than 1 window exists`);
    }

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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9kcml2ZXIuanMiXSwibmFtZXMiOlsiTk9fUFJPWFkiLCJBdFNwaTJEcml2ZXIiLCJCYXNlRHJpdmVyIiwiY29uc3RydWN0b3IiLCJvcHRzIiwiZGVzaXJlZENhcENvbnN0cmFpbnRzIiwibG9jYXRvclN0cmF0ZWdpZXMiLCJjbWQiLCJmbiIsIl8iLCJ0b1BhaXJzIiwiY29tbWFuZHMiLCJwcm90b3R5cGUiLCJwcm94eUFjdGl2ZSIsImdldFByb3h5QXZvaWRMaXN0IiwiY2FuUHJveHkiLCJjcmVhdGVTZXNzaW9uIiwiYXJncyIsInNlc3Npb25JZCIsImNhcHMiLCJhcHBOYW1lIiwiZXJyb3JzIiwiVW5rbm93bkVycm9yIiwibG9nIiwiaW5mbyIsImFwaXMiLCJhcHBfa2lsbCIsImxhdW5jaFJlc3VsdCIsImFwcF9sYXVuY2giLCJvayIsImVyckNvZGUiLCJfd2luIiwid2lkcyIsImdldFdpbmRvd0hhbmRsZXMiLCJsZW5ndGgiLCJzZXRXaW5kb3ciLCJkZWxldGVTZXNzaW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUVBLE1BQU1BLFFBQVEsR0FBRyxFQUFqQjs7QUFFQSxNQUFNQyxZQUFOLFNBQTJCQyxzQkFBM0IsQ0FBc0M7QUFDcENDLEVBQUFBLFdBQVcsQ0FBRUMsSUFBSSxHQUFHLEVBQVQsRUFBYTtBQUN0QixVQUFNQSxJQUFOO0FBQ0EsU0FBS0MscUJBQUwsR0FBNkJBLGtDQUE3QjtBQUNBLFNBQUtDLGlCQUFMLEdBQXlCLENBQUMsT0FBRCxDQUF6Qjs7QUFDQSxTQUFLLE1BQU0sQ0FBQ0MsR0FBRCxFQUFNQyxFQUFOLENBQVgsSUFBd0JDLGdCQUFFQyxPQUFGLENBQVVDLGNBQVYsQ0FBeEIsRUFBNkM7QUFDM0NWLE1BQUFBLFlBQVksQ0FBQ1csU0FBYixDQUF1QkwsR0FBdkIsSUFBOEJDLEVBQTlCO0FBQ0Q7QUFDRjs7QUFFREssRUFBQUEsV0FBVyxHQUFJO0FBQ2IsV0FBTyxLQUFQO0FBQ0Q7O0FBRURDLEVBQUFBLGlCQUFpQixHQUFJO0FBQ25CLFdBQU9kLFFBQVA7QUFDRDs7QUFFRGUsRUFBQUEsUUFBUSxHQUFJO0FBQ1YsV0FBTyxLQUFQO0FBQ0Q7O0FBRWtCLFFBQWJDLGFBQWEsQ0FBRSxHQUFHQyxJQUFMLEVBQVc7QUFDNUIsVUFBTSxDQUFDQyxTQUFELEVBQVlDLElBQVosSUFBb0IsTUFBTSxNQUFNSCxhQUFOLENBQW9CLEdBQUdDLElBQXZCLENBQWhDOztBQUNBLFFBQUksQ0FBQ0UsSUFBSSxDQUFDQyxPQUFWLEVBQW1CO0FBQ2pCLFlBQU0sSUFBSUMsbUJBQU9DLFlBQVgsQ0FBd0IsaUNBQXhCLENBQU47QUFDRDs7QUFDRCxTQUFLRixPQUFMLEdBQWVELElBQUksQ0FBQ0MsT0FBcEI7O0FBQ0FHLG9CQUFJQyxJQUFKLENBQVUsbUJBQWtCLEtBQUtKLE9BQVEsMEJBQXpDOztBQUNBSyx5QkFBS0MsUUFBTCxDQUFjLEtBQUtOLE9BQW5COztBQUNBLFVBQU0scUJBQVMsQ0FBVCxDQUFOOztBQUNBRyxvQkFBSUMsSUFBSixDQUFVLGdCQUFlLEtBQUtKLE9BQVEsRUFBdEM7O0FBQ0EsVUFBTU8sWUFBWSxHQUFHRixxQkFBS0csVUFBTCxDQUFnQixLQUFLUixPQUFyQixDQUFyQjs7QUFDQSxRQUFJLENBQUNPLFlBQVksQ0FBQ0UsRUFBbEIsRUFBc0I7QUFDcEIsY0FBT0YsWUFBWSxDQUFDRyxPQUFwQjtBQUNFLGFBQUssSUFBTDtBQUNFLGdCQUFNLElBQUlULG1CQUFPQyxZQUFYLENBQXdCLGlEQUF4QixDQUFOOztBQUNGLGFBQUssSUFBTDtBQUNFLGdCQUFNLElBQUlELG1CQUFPQyxZQUFYLENBQXdCLGdDQUF4QixDQUFOOztBQUNGLGFBQUssSUFBTDtBQUNFLGdCQUFNLElBQUlELG1CQUFPQyxZQUFYLENBQXdCLDRCQUF4QixDQUFOO0FBTko7QUFRRDs7QUFDREMsb0JBQUlDLElBQUosQ0FBVSxPQUFNLEtBQUtKLE9BQVEscUJBQTdCOztBQUNBLFNBQUtXLElBQUwsR0FBWSxJQUFaO0FBQ0EsVUFBTUMsSUFBSSxHQUFHLE1BQU0sS0FBS0MsZ0JBQUwsRUFBbkI7O0FBQ0EsUUFBSUQsSUFBSSxDQUFDRSxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ3JCLFlBQU0sS0FBS0MsU0FBTCxDQUFlLElBQWYsRUFBcUJILElBQUksQ0FBQyxDQUFELENBQXpCLENBQU47O0FBQ0FULHNCQUFJQyxJQUFKLENBQVMsS0FBS08sSUFBZDtBQUNELEtBSEQsTUFHTztBQUNMUixzQkFBSUMsSUFBSixDQUFVLE9BQU0sS0FBS0osT0FBUSxtRUFBN0I7QUFDRDs7QUFDRCxXQUFPLENBQUNGLFNBQUQsRUFBWUMsSUFBWixDQUFQO0FBQ0Q7O0FBRWtCLFFBQWJpQixhQUFhLEdBQUk7QUFDckIsUUFBSSxLQUFLaEIsT0FBVCxFQUFrQjtBQUNoQkcsc0JBQUlDLElBQUosQ0FBVSxPQUFNLEtBQUtKLE9BQVEsbUNBQTdCOztBQUNBSywyQkFBS0MsUUFBTCxDQUFjLEtBQUtOLE9BQW5CO0FBQ0Q7O0FBQ0QsVUFBTSxNQUFNZ0IsYUFBTixFQUFOO0FBQ0Q7O0FBN0RtQzs7ZUFnRXZCbkMsWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBCYXNlRHJpdmVyIH0gZnJvbSAnQGFwcGl1bS9iYXNlLWRyaXZlcic7XG5pbXBvcnQgeyBkZXNpcmVkQ2FwQ29uc3RyYWludHMgfSBmcm9tICcuL2Rlc2lyZWQtY2Fwcyc7XG5pbXBvcnQgY29tbWFuZHMgZnJvbSAnLi9jb21tYW5kcy9pbmRleCc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCBhcGlzIGZyb20gJ0BzdGRzcGEvc3Rkc3BhbGludXhfdGVtcC9kaXN0L3ByaXZhdGVhcGlzJztcbmltcG9ydCB7IGVycm9ycyB9IGZyb20gJ0BhcHBpdW0vYmFzZS1kcml2ZXInO1xuaW1wb3J0IHsgd2FpdDRzZWMgfSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgTk9fUFJPWFkgPSBbXTtcblxuY2xhc3MgQXRTcGkyRHJpdmVyIGV4dGVuZHMgQmFzZURyaXZlciB7XG4gIGNvbnN0cnVjdG9yIChvcHRzID0ge30pIHtcbiAgICBzdXBlcihvcHRzKTtcbiAgICB0aGlzLmRlc2lyZWRDYXBDb25zdHJhaW50cyA9IGRlc2lyZWRDYXBDb25zdHJhaW50cztcbiAgICB0aGlzLmxvY2F0b3JTdHJhdGVnaWVzID0gWyd4cGF0aCddO1xuICAgIGZvciAoY29uc3QgW2NtZCwgZm5dIG9mIF8udG9QYWlycyhjb21tYW5kcykpIHtcbiAgICAgIEF0U3BpMkRyaXZlci5wcm90b3R5cGVbY21kXSA9IGZuO1xuICAgIH1cbiAgfVxuXG4gIHByb3h5QWN0aXZlICgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRQcm94eUF2b2lkTGlzdCAoKSB7XG4gICAgcmV0dXJuIE5PX1BST1hZO1xuICB9XG5cbiAgY2FuUHJveHkgKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZVNlc3Npb24gKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBbc2Vzc2lvbklkLCBjYXBzXSA9IGF3YWl0IHN1cGVyLmNyZWF0ZVNlc3Npb24oLi4uYXJncyk7XG4gICAgaWYgKCFjYXBzLmFwcE5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBlcnJvcnMuVW5rbm93bkVycm9yKFwiYXBwbGljYXRpb24gc2hvdWxkIGJlIHNwZWNpZmllZFwiKTtcbiAgICB9XG4gICAgdGhpcy5hcHBOYW1lID0gY2Fwcy5hcHBOYW1lO1xuICAgIGxvZy5pbmZvKGBLaWxsaW5nIHRoZSBhcHAgJHt0aGlzLmFwcE5hbWV9IGlmIGl0J3MgYWxyZWFkeSBydW5uaW5nYCk7XG4gICAgYXBpcy5hcHBfa2lsbCh0aGlzLmFwcE5hbWUpO1xuICAgIGF3YWl0IHdhaXQ0c2VjKDEpO1xuICAgIGxvZy5pbmZvKGBMYXVjaGluZyBhcHAgJHt0aGlzLmFwcE5hbWV9YCk7XG4gICAgY29uc3QgbGF1bmNoUmVzdWx0ID0gYXBpcy5hcHBfbGF1bmNoKHRoaXMuYXBwTmFtZSk7XG4gICAgaWYgKCFsYXVuY2hSZXN1bHQub2spIHtcbiAgICAgIHN3aXRjaChsYXVuY2hSZXN1bHQuZXJyQ29kZSkge1xuICAgICAgICBjYXNlIDEwMDA6XG4gICAgICAgICAgdGhyb3cgbmV3IGVycm9ycy5Vbmtub3duRXJyb3IoXCJhcHBsaWNhdGlvbiBpcyBydW5uaW5nIHdoaWxlIHRyeWluZyB0byBzdGFydCBpdFwiKTtcbiAgICAgICAgY2FzZSAxMDAxOlxuICAgICAgICAgIHRocm93IG5ldyBlcnJvcnMuVW5rbm93bkVycm9yKFwidGhlIHNwZWNpZmllZCBhcHBOYW1lIGlzIHdyb25nXCIpO1xuICAgICAgICBjYXNlIDEwMDI6XG4gICAgICAgICAgdGhyb3cgbmV3IGVycm9ycy5Vbmtub3duRXJyb3IoXCJ0aW1lb3V0IHdoaWxlIGxhdWNoaW5nIGFwcFwiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbG9nLmluZm8oYEFwcCAke3RoaXMuYXBwTmFtZX0gbGF1Y2hlZCBzdWNjZXNzZnVsYCk7XG4gICAgdGhpcy5fd2luID0gbnVsbDtcbiAgICBjb25zdCB3aWRzID0gYXdhaXQgdGhpcy5nZXRXaW5kb3dIYW5kbGVzKCk7XG4gICAgaWYgKHdpZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBhd2FpdCB0aGlzLnNldFdpbmRvdyhudWxsLCB3aWRzWzBdKTtcbiAgICAgIGxvZy5pbmZvKHRoaXMuX3dpbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZy5pbmZvKGBBcHAgJHt0aGlzLmFwcE5hbWV9IGNhbid0IHNlbGVjdCBhIGRlZmF1bHQgd2luZG93LCBiZWNhdXNlIG1vcmUgdGhhbiAxIHdpbmRvdyBleGlzdHNgKTtcbiAgICB9XG4gICAgcmV0dXJuIFtzZXNzaW9uSWQsIGNhcHNdO1xuICB9XG5cbiAgYXN5bmMgZGVsZXRlU2Vzc2lvbiAoKSB7XG4gICAgaWYgKHRoaXMuYXBwTmFtZSkge1xuICAgICAgbG9nLmluZm8oYEFwcCAke3RoaXMuYXBwTmFtZX0gaXMga2lsbGVkIGJlZm9yZSBjbG9zaW5nIHNlc3Npb25gKTtcbiAgICAgIGFwaXMuYXBwX2tpbGwodGhpcy5hcHBOYW1lKTtcbiAgICB9XG4gICAgYXdhaXQgc3VwZXIuZGVsZXRlU2Vzc2lvbigpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF0U3BpMkRyaXZlcjsiXSwiZmlsZSI6ImxpYi9kcml2ZXIuanMiLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
