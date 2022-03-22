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

    if (caps.appName) {
      this.appName = caps.appName;

      try {} catch (e) {
        _logger.default.error(e.message);
      }

      console.log(`app name is present: ${caps.appName}`);
    }

    return [sessionId, caps];
  }

  async deleteSession() {
    if (this.appName) {
      console.log(`session stop: ${this.appName} close`);
    }

    await super.deleteSession();
  }

}

var _default = AtSpi2Driver;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9kcml2ZXIuanMiXSwibmFtZXMiOlsiTk9fUFJPWFkiLCJBdFNwaTJEcml2ZXIiLCJCYXNlRHJpdmVyIiwiY29uc3RydWN0b3IiLCJvcHRzIiwiZGVzaXJlZENhcENvbnN0cmFpbnRzIiwibG9jYXRvclN0cmF0ZWdpZXMiLCJjbWQiLCJmbiIsIl8iLCJ0b1BhaXJzIiwiY29tbWFuZHMiLCJwcm90b3R5cGUiLCJwcm94eUFjdGl2ZSIsImdldFByb3h5QXZvaWRMaXN0IiwiY2FuUHJveHkiLCJjcmVhdGVTZXNzaW9uIiwiYXJncyIsInNlc3Npb25JZCIsImNhcHMiLCJhcHBOYW1lIiwiZSIsImxvZyIsImVycm9yIiwibWVzc2FnZSIsImNvbnNvbGUiLCJkZWxldGVTZXNzaW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBLE1BQU1BLFFBQVEsR0FBRyxFQUFqQjs7QUFFQSxNQUFNQyxZQUFOLFNBQTJCQyxzQkFBM0IsQ0FBc0M7QUFDcENDLEVBQUFBLFdBQVcsQ0FBRUMsSUFBSSxHQUFHLEVBQVQsRUFBYTtBQUN0QixVQUFNQSxJQUFOO0FBQ0EsU0FBS0MscUJBQUwsR0FBNkJBLGtDQUE3QjtBQUNBLFNBQUtDLGlCQUFMLEdBQXlCLENBQUMsT0FBRCxDQUF6Qjs7QUFDQSxTQUFLLE1BQU0sQ0FBQ0MsR0FBRCxFQUFNQyxFQUFOLENBQVgsSUFBd0JDLGdCQUFFQyxPQUFGLENBQVVDLGNBQVYsQ0FBeEIsRUFBNkM7QUFDM0NWLE1BQUFBLFlBQVksQ0FBQ1csU0FBYixDQUF1QkwsR0FBdkIsSUFBOEJDLEVBQTlCO0FBQ0Q7QUFDRjs7QUFFREssRUFBQUEsV0FBVyxHQUFJO0FBQ2IsV0FBTyxLQUFQO0FBQ0Q7O0FBRURDLEVBQUFBLGlCQUFpQixHQUFJO0FBQ25CLFdBQU9kLFFBQVA7QUFDRDs7QUFFRGUsRUFBQUEsUUFBUSxHQUFJO0FBQ1YsV0FBTyxLQUFQO0FBQ0Q7O0FBRWtCLFFBQWJDLGFBQWEsQ0FBRSxHQUFHQyxJQUFMLEVBQVc7QUFDNUIsVUFBTSxDQUFDQyxTQUFELEVBQVlDLElBQVosSUFBb0IsTUFBTSxNQUFNSCxhQUFOLENBQW9CLEdBQUdDLElBQXZCLENBQWhDOztBQUNBLFFBQUlFLElBQUksQ0FBQ0MsT0FBVCxFQUFrQjtBQUNoQixXQUFLQSxPQUFMLEdBQWVELElBQUksQ0FBQ0MsT0FBcEI7O0FBRUEsVUFBSSxDQUVILENBRkQsQ0FFRSxPQUFPQyxDQUFQLEVBQVU7QUFDVkMsd0JBQUlDLEtBQUosQ0FBVUYsQ0FBQyxDQUFDRyxPQUFaO0FBQ0Q7O0FBQ0RDLE1BQUFBLE9BQU8sQ0FBQ0gsR0FBUixDQUFhLHdCQUF1QkgsSUFBSSxDQUFDQyxPQUFRLEVBQWpEO0FBQ0Q7O0FBQ0QsV0FBTyxDQUFDRixTQUFELEVBQVlDLElBQVosQ0FBUDtBQUNEOztBQUVrQixRQUFiTyxhQUFhLEdBQUk7QUFDckIsUUFBSSxLQUFLTixPQUFULEVBQWtCO0FBRWhCSyxNQUFBQSxPQUFPLENBQUNILEdBQVIsQ0FBYSxpQkFBZ0IsS0FBS0YsT0FBUSxRQUExQztBQUNEOztBQUNELFVBQU0sTUFBTU0sYUFBTixFQUFOO0FBQ0Q7O0FBM0NtQzs7ZUE4Q3ZCekIsWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBCYXNlRHJpdmVyIH0gZnJvbSAnQGFwcGl1bS9iYXNlLWRyaXZlcic7XG5pbXBvcnQgeyBkZXNpcmVkQ2FwQ29uc3RyYWludHMgfSBmcm9tICcuL2Rlc2lyZWQtY2Fwcyc7XG5pbXBvcnQgY29tbWFuZHMgZnJvbSAnLi9jb21tYW5kcy9pbmRleCc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcblxuY29uc3QgTk9fUFJPWFkgPSBbXTtcblxuY2xhc3MgQXRTcGkyRHJpdmVyIGV4dGVuZHMgQmFzZURyaXZlciB7XG4gIGNvbnN0cnVjdG9yIChvcHRzID0ge30pIHtcbiAgICBzdXBlcihvcHRzKTtcbiAgICB0aGlzLmRlc2lyZWRDYXBDb25zdHJhaW50cyA9IGRlc2lyZWRDYXBDb25zdHJhaW50cztcbiAgICB0aGlzLmxvY2F0b3JTdHJhdGVnaWVzID0gWyd4cGF0aCddO1xuICAgIGZvciAoY29uc3QgW2NtZCwgZm5dIG9mIF8udG9QYWlycyhjb21tYW5kcykpIHtcbiAgICAgIEF0U3BpMkRyaXZlci5wcm90b3R5cGVbY21kXSA9IGZuO1xuICAgIH1cbiAgfVxuXG4gIHByb3h5QWN0aXZlICgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRQcm94eUF2b2lkTGlzdCAoKSB7XG4gICAgcmV0dXJuIE5PX1BST1hZO1xuICB9XG5cbiAgY2FuUHJveHkgKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZVNlc3Npb24gKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBbc2Vzc2lvbklkLCBjYXBzXSA9IGF3YWl0IHN1cGVyLmNyZWF0ZVNlc3Npb24oLi4uYXJncyk7XG4gICAgaWYgKGNhcHMuYXBwTmFtZSkge1xuICAgICAgdGhpcy5hcHBOYW1lID0gY2Fwcy5hcHBOYW1lO1xuICAgICAgLy8gYXdhaXQga2lsbEFwcChjYXBzLmFwcE5hbWUpXG4gICAgICB0cnkge1xuICAgICAgICAvLyBhd2FpdCBzdGFydEFwcChjYXBzLmFwcE5hbWUpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGxvZy5lcnJvcihlLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coYGFwcCBuYW1lIGlzIHByZXNlbnQ6ICR7Y2Fwcy5hcHBOYW1lfWApO1xuICAgIH1cbiAgICByZXR1cm4gW3Nlc3Npb25JZCwgY2Fwc107XG4gIH1cblxuICBhc3luYyBkZWxldGVTZXNzaW9uICgpIHtcbiAgICBpZiAodGhpcy5hcHBOYW1lKSB7XG4gICAgICAvLyBhd2FpdCBraWxsQXBwKGNhcHMuYXBwTmFtZSlcbiAgICAgIGNvbnNvbGUubG9nKGBzZXNzaW9uIHN0b3A6ICR7dGhpcy5hcHBOYW1lfSBjbG9zZWApO1xuICAgIH1cbiAgICBhd2FpdCBzdXBlci5kZWxldGVTZXNzaW9uKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXRTcGkyRHJpdmVyOyJdLCJmaWxlIjoibGliL2RyaXZlci5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLiJ9
