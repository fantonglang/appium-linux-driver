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
    let times = 5;
    let wids = [];

    while (times > 0) {
      wids = await this.getWindowHandles();

      if (wids.length > 0) {
        break;
      }

      await (0, _utils.wait4sec)(0.5);
      times--;
    }

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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9kcml2ZXIuanMiXSwibmFtZXMiOlsiTk9fUFJPWFkiLCJBdFNwaTJEcml2ZXIiLCJCYXNlRHJpdmVyIiwiY29uc3RydWN0b3IiLCJvcHRzIiwiZGVzaXJlZENhcENvbnN0cmFpbnRzIiwibG9jYXRvclN0cmF0ZWdpZXMiLCJjbWQiLCJmbiIsIl8iLCJ0b1BhaXJzIiwiY29tbWFuZHMiLCJwcm90b3R5cGUiLCJwcm94eUFjdGl2ZSIsImdldFByb3h5QXZvaWRMaXN0IiwiY2FuUHJveHkiLCJjcmVhdGVTZXNzaW9uIiwiYXJncyIsInNlc3Npb25JZCIsImNhcHMiLCJhcHBOYW1lIiwiZXJyb3JzIiwiVW5rbm93bkVycm9yIiwibG9nIiwiaW5mbyIsImFwaXMiLCJhcHBfa2lsbCIsImxhdW5jaFJlc3VsdCIsImFwcF9sYXVuY2giLCJvayIsImVyckNvZGUiLCJfd2luIiwidGltZXMiLCJ3aWRzIiwiZ2V0V2luZG93SGFuZGxlcyIsImxlbmd0aCIsInNldFdpbmRvdyIsIm5hbWUiLCJfY2FjaGUiLCJMUlUiLCJtYXgiLCJ0dGwiLCJ1cGRhdGVBZ2VPbkdldCIsInVwZGF0ZUFnZU9uSGFzIiwiZGVsZXRlU2Vzc2lvbiIsImNsZWFyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBLE1BQU1BLFFBQVEsR0FBRyxFQUFqQjs7QUFFQSxNQUFNQyxZQUFOLFNBQTJCQyxzQkFBM0IsQ0FBc0M7QUFDcENDLEVBQUFBLFdBQVcsQ0FBRUMsSUFBSSxHQUFHLEVBQVQsRUFBYTtBQUN0QixVQUFNQSxJQUFOO0FBQ0EsU0FBS0MscUJBQUwsR0FBNkJBLGtDQUE3QjtBQUNBLFNBQUtDLGlCQUFMLEdBQXlCLENBQUMsT0FBRCxFQUFVLE1BQVYsRUFBa0IsWUFBbEIsQ0FBekI7O0FBQ0EsU0FBSyxNQUFNLENBQUNDLEdBQUQsRUFBTUMsRUFBTixDQUFYLElBQXdCQyxnQkFBRUMsT0FBRixDQUFVQyxjQUFWLENBQXhCLEVBQTZDO0FBQzNDVixNQUFBQSxZQUFZLENBQUNXLFNBQWIsQ0FBdUJMLEdBQXZCLElBQThCQyxFQUE5QjtBQUNEO0FBQ0Y7O0FBRURLLEVBQUFBLFdBQVcsR0FBSTtBQUNiLFdBQU8sS0FBUDtBQUNEOztBQUVEQyxFQUFBQSxpQkFBaUIsR0FBSTtBQUNuQixXQUFPZCxRQUFQO0FBQ0Q7O0FBRURlLEVBQUFBLFFBQVEsR0FBSTtBQUNWLFdBQU8sS0FBUDtBQUNEOztBQUVrQixRQUFiQyxhQUFhLENBQUUsR0FBR0MsSUFBTCxFQUFXO0FBQzVCLFVBQU0sQ0FBQ0MsU0FBRCxFQUFZQyxJQUFaLElBQW9CLE1BQU0sTUFBTUgsYUFBTixDQUFvQixHQUFHQyxJQUF2QixDQUFoQzs7QUFDQSxRQUFJLENBQUNFLElBQUksQ0FBQ0MsT0FBVixFQUFtQjtBQUNqQixZQUFNLElBQUlDLG1CQUFPQyxZQUFYLENBQXdCLGlDQUF4QixDQUFOO0FBQ0Q7O0FBQ0QsU0FBS0YsT0FBTCxHQUFlRCxJQUFJLENBQUNDLE9BQXBCOztBQUNBRyxvQkFBSUMsSUFBSixDQUFVLG1CQUFrQixLQUFLSixPQUFRLDBCQUF6Qzs7QUFDQUsseUJBQUtDLFFBQUwsQ0FBYyxLQUFLTixPQUFuQjs7QUFDQSxVQUFNLHFCQUFTLENBQVQsQ0FBTjs7QUFDQUcsb0JBQUlDLElBQUosQ0FBVSxnQkFBZSxLQUFLSixPQUFRLEVBQXRDOztBQUNBLFVBQU1PLFlBQVksR0FBR0YscUJBQUtHLFVBQUwsQ0FBZ0IsS0FBS1IsT0FBckIsQ0FBckI7O0FBQ0EsUUFBSSxDQUFDTyxZQUFZLENBQUNFLEVBQWxCLEVBQXNCO0FBQ3BCLGNBQVFGLFlBQVksQ0FBQ0csT0FBckI7QUFDRSxhQUFLLElBQUw7QUFDRSxnQkFBTSxJQUFJVCxtQkFBT0MsWUFBWCxDQUF3QixpREFBeEIsQ0FBTjs7QUFDRixhQUFLLElBQUw7QUFDRSxnQkFBTSxJQUFJRCxtQkFBT0MsWUFBWCxDQUF3QixnQ0FBeEIsQ0FBTjs7QUFDRixhQUFLLElBQUw7QUFDRSxnQkFBTSxJQUFJRCxtQkFBT0MsWUFBWCxDQUF3Qiw0QkFBeEIsQ0FBTjtBQU5KO0FBUUQ7O0FBQ0RDLG9CQUFJQyxJQUFKLENBQVUsT0FBTSxLQUFLSixPQUFRLHFCQUE3Qjs7QUFDQSxVQUFNLHFCQUFTLEdBQVQsQ0FBTjtBQUNBLFNBQUtXLElBQUwsR0FBWSxJQUFaO0FBQ0EsUUFBSUMsS0FBSyxHQUFHLENBQVo7QUFDQSxRQUFJQyxJQUFJLEdBQUcsRUFBWDs7QUFDQSxXQUFPRCxLQUFLLEdBQUcsQ0FBZixFQUFrQjtBQUNoQkMsTUFBQUEsSUFBSSxHQUFHLE1BQU0sS0FBS0MsZ0JBQUwsRUFBYjs7QUFDQSxVQUFJRCxJQUFJLENBQUNFLE1BQUwsR0FBYyxDQUFsQixFQUFxQjtBQUNuQjtBQUNEOztBQUNELFlBQU0scUJBQVMsR0FBVCxDQUFOO0FBQ0FILE1BQUFBLEtBQUs7QUFDTjs7QUFDRCxRQUFJQyxJQUFJLENBQUNFLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDckIsWUFBTSxJQUFJZCxtQkFBT0MsWUFBWCxDQUF5QixPQUFNLEtBQUtGLE9BQVEsZ0JBQTVDLENBQU47QUFDRCxLQUZELE1BRU8sSUFBSWEsSUFBSSxDQUFDRSxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQzVCLFlBQU0sS0FBS0MsU0FBTCxDQUFlLElBQWYsRUFBcUJILElBQUksQ0FBQyxDQUFELENBQXpCLENBQU47O0FBQ0FWLHNCQUFJQyxJQUFKLENBQVUsZ0NBQStCLEtBQUtPLElBQUwsQ0FBVU0sSUFBSyxFQUF4RDtBQUNELEtBSE0sTUFHQTtBQUNMZCxzQkFBSUMsSUFBSixDQUFVLE9BQU0sS0FBS0osT0FBUSx5QkFBN0I7O0FBQ0EsWUFBTSxLQUFLZ0IsU0FBTCxDQUFlLElBQWYsRUFBcUJILElBQUksQ0FBQyxDQUFELENBQXpCLENBQU47O0FBQ0FWLHNCQUFJQyxJQUFKLENBQVUsaUNBQWdDLEtBQUtPLElBQUwsQ0FBVU0sSUFBSyxFQUF6RDtBQUNEOztBQUNELFNBQUtDLE1BQUwsR0FBYyxJQUFJQyxpQkFBSixDQUFRO0FBQ3BCQyxNQUFBQSxHQUFHLEVBQUUsR0FEZTtBQUVwQkMsTUFBQUEsR0FBRyxFQUFFLE9BQU8sRUFBUCxHQUFZLENBRkc7QUFHcEJDLE1BQUFBLGNBQWMsRUFBRSxJQUhJO0FBSXBCQyxNQUFBQSxjQUFjLEVBQUU7QUFKSSxLQUFSLENBQWQ7QUFNQSxXQUFPLENBQUN6QixTQUFELEVBQVlDLElBQVosQ0FBUDtBQUNEOztBQUVrQixRQUFieUIsYUFBYSxHQUFJO0FBQ3JCLFFBQUksS0FBS3hCLE9BQVQsRUFBa0I7QUFDaEJHLHNCQUFJQyxJQUFKLENBQVUsT0FBTSxLQUFLSixPQUFRLG1DQUE3Qjs7QUFDQUssMkJBQUtDLFFBQUwsQ0FBYyxLQUFLTixPQUFuQjtBQUNEOztBQUNELFNBQUtrQixNQUFMLENBQVlPLEtBQVo7O0FBQ0EsVUFBTSxNQUFNRCxhQUFOLEVBQU47QUFDRDs7QUFsRm1DOztlQXFGdkIzQyxZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEJhc2VEcml2ZXIsIGVycm9ycyB9IGZyb20gJ0BhcHBpdW0vYmFzZS1kcml2ZXInO1xuaW1wb3J0IHsgZGVzaXJlZENhcENvbnN0cmFpbnRzIH0gZnJvbSAnLi9kZXNpcmVkLWNhcHMnO1xuaW1wb3J0IGNvbW1hbmRzIGZyb20gJy4vY29tbWFuZHMvaW5kZXgnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgYXBpcyBmcm9tICdAc3Rkc3BhL3N0ZHNwYWxpbnV4X3RlbXAvZGlzdC9wcml2YXRlYXBpcyc7XG5pbXBvcnQgeyB3YWl0NHNlYyB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IExSVSBmcm9tICdscnUtY2FjaGUnO1xuXG5jb25zdCBOT19QUk9YWSA9IFtdO1xuXG5jbGFzcyBBdFNwaTJEcml2ZXIgZXh0ZW5kcyBCYXNlRHJpdmVyIHtcbiAgY29uc3RydWN0b3IgKG9wdHMgPSB7fSkge1xuICAgIHN1cGVyKG9wdHMpO1xuICAgIHRoaXMuZGVzaXJlZENhcENvbnN0cmFpbnRzID0gZGVzaXJlZENhcENvbnN0cmFpbnRzO1xuICAgIHRoaXMubG9jYXRvclN0cmF0ZWdpZXMgPSBbJ3hwYXRoJywgJ25hbWUnLCAnY2xhc3MgbmFtZSddO1xuICAgIGZvciAoY29uc3QgW2NtZCwgZm5dIG9mIF8udG9QYWlycyhjb21tYW5kcykpIHtcbiAgICAgIEF0U3BpMkRyaXZlci5wcm90b3R5cGVbY21kXSA9IGZuO1xuICAgIH1cbiAgfVxuXG4gIHByb3h5QWN0aXZlICgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRQcm94eUF2b2lkTGlzdCAoKSB7XG4gICAgcmV0dXJuIE5PX1BST1hZO1xuICB9XG5cbiAgY2FuUHJveHkgKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZVNlc3Npb24gKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBbc2Vzc2lvbklkLCBjYXBzXSA9IGF3YWl0IHN1cGVyLmNyZWF0ZVNlc3Npb24oLi4uYXJncyk7XG4gICAgaWYgKCFjYXBzLmFwcE5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBlcnJvcnMuVW5rbm93bkVycm9yKCdhcHBsaWNhdGlvbiBzaG91bGQgYmUgc3BlY2lmaWVkJyk7XG4gICAgfVxuICAgIHRoaXMuYXBwTmFtZSA9IGNhcHMuYXBwTmFtZTtcbiAgICBsb2cuaW5mbyhgS2lsbGluZyB0aGUgYXBwICR7dGhpcy5hcHBOYW1lfSBpZiBpdCdzIGFscmVhZHkgcnVubmluZ2ApO1xuICAgIGFwaXMuYXBwX2tpbGwodGhpcy5hcHBOYW1lKTtcbiAgICBhd2FpdCB3YWl0NHNlYygxKTtcbiAgICBsb2cuaW5mbyhgTGF1Y2hpbmcgYXBwICR7dGhpcy5hcHBOYW1lfWApO1xuICAgIGNvbnN0IGxhdW5jaFJlc3VsdCA9IGFwaXMuYXBwX2xhdW5jaCh0aGlzLmFwcE5hbWUpO1xuICAgIGlmICghbGF1bmNoUmVzdWx0Lm9rKSB7XG4gICAgICBzd2l0Y2ggKGxhdW5jaFJlc3VsdC5lcnJDb2RlKSB7XG4gICAgICAgIGNhc2UgMTAwMDpcbiAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzLlVua25vd25FcnJvcignYXBwbGljYXRpb24gaXMgcnVubmluZyB3aGlsZSB0cnlpbmcgdG8gc3RhcnQgaXQnKTtcbiAgICAgICAgY2FzZSAxMDAxOlxuICAgICAgICAgIHRocm93IG5ldyBlcnJvcnMuVW5rbm93bkVycm9yKCd0aGUgc3BlY2lmaWVkIGFwcE5hbWUgaXMgd3JvbmcnKTtcbiAgICAgICAgY2FzZSAxMDAyOlxuICAgICAgICAgIHRocm93IG5ldyBlcnJvcnMuVW5rbm93bkVycm9yKCd0aW1lb3V0IHdoaWxlIGxhdWNoaW5nIGFwcCcpO1xuICAgICAgfVxuICAgIH1cbiAgICBsb2cuaW5mbyhgQXBwICR7dGhpcy5hcHBOYW1lfSBsYXVjaGVkIHN1Y2Nlc3NmdWxgKTtcbiAgICBhd2FpdCB3YWl0NHNlYygwLjUpO1xuICAgIHRoaXMuX3dpbiA9IG51bGw7XG4gICAgbGV0IHRpbWVzID0gNTtcbiAgICBsZXQgd2lkcyA9IFtdO1xuICAgIHdoaWxlICh0aW1lcyA+IDApIHtcbiAgICAgIHdpZHMgPSBhd2FpdCB0aGlzLmdldFdpbmRvd0hhbmRsZXMoKTtcbiAgICAgIGlmICh3aWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBhd2FpdCB3YWl0NHNlYygwLjUpO1xuICAgICAgdGltZXMtLTtcbiAgICB9XG4gICAgaWYgKHdpZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgZXJyb3JzLlVua25vd25FcnJvcihgQXBwICR7dGhpcy5hcHBOYW1lfSBoYXMgbm8gd2luZG93YCk7XG4gICAgfSBlbHNlIGlmICh3aWRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgYXdhaXQgdGhpcy5zZXRXaW5kb3cobnVsbCwgd2lkc1swXSk7XG4gICAgICBsb2cuaW5mbyhgcHJlLXNlbGVjdGVkIHRoZSBvbmx5IHdpbmRvdyAke3RoaXMuX3dpbi5uYW1lfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2cuaW5mbyhgQXBwICR7dGhpcy5hcHBOYW1lfSBoYXMgbW9yZSB0aGFuIDEgd2luZG93YCk7XG4gICAgICBhd2FpdCB0aGlzLnNldFdpbmRvdyhudWxsLCB3aWRzWzBdKTtcbiAgICAgIGxvZy5pbmZvKGBwcmUtc2VsZWN0ZWQgdGhlIGZpcnN0IHdpbmRvdyAke3RoaXMuX3dpbi5uYW1lfWApO1xuICAgIH1cbiAgICB0aGlzLl9jYWNoZSA9IG5ldyBMUlUoe1xuICAgICAgbWF4OiA1MDAsXG4gICAgICB0dGw6IDEwMDAgKiA2MCAqIDUsXG4gICAgICB1cGRhdGVBZ2VPbkdldDogdHJ1ZSxcbiAgICAgIHVwZGF0ZUFnZU9uSGFzOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIFtzZXNzaW9uSWQsIGNhcHNdO1xuICB9XG5cbiAgYXN5bmMgZGVsZXRlU2Vzc2lvbiAoKSB7XG4gICAgaWYgKHRoaXMuYXBwTmFtZSkge1xuICAgICAgbG9nLmluZm8oYEFwcCAke3RoaXMuYXBwTmFtZX0gaXMga2lsbGVkIGJlZm9yZSBjbG9zaW5nIHNlc3Npb25gKTtcbiAgICAgIGFwaXMuYXBwX2tpbGwodGhpcy5hcHBOYW1lKTtcbiAgICB9XG4gICAgdGhpcy5fY2FjaGUuY2xlYXIoKTtcbiAgICBhd2FpdCBzdXBlci5kZWxldGVTZXNzaW9uKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXRTcGkyRHJpdmVyOyJdLCJmaWxlIjoibGliL2RyaXZlci5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLiJ9
